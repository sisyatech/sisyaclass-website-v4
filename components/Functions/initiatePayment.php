<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$response = [];

if (!isset($data['amount']) || !is_numeric($data['amount']) || $data['amount'] <= 0) {
    echo json_encode([
        "success" => false,
        "message" =>  $data['amount']
    ]);
    exit;
}

$merchantId = "M225S85ITT5LC"; // Test Merchant ID
$key = "f6f45ccb-0c60-4447-81ae-67dd2a157ea2"; // Test Merchant Key
$keyIndex = 1; // Test Key Index
$callbackUrl = "https://sisyaclass.com"; // Modify for localhost

$amountInPaise = (int) ($data['amount'] * 100);
$requestData = [
    "merchantId" => $merchantId,
    "merchantTransactionId" => "TXN_" . time() . "_" . rand(1000, 9999), // Unique transaction ID
    "merchantUserId" => "MUID121",
    "amount" => $data['amount'] * 100,
    "redirectUrl" => "https://sisyaclass.com/paymentstatus.php",
    "redirectMode" => "POST",
    "callbackUrl" => $callbackUrl,
    "mobileNumber" => $data['phone'],
    "paymentInstrument" => ["type" => "PAY_PAGE"]
];

$jsonData = json_encode($requestData);
$encoded = base64_encode($jsonData);
$rawString = $encoded . "/pg/v1/pay" . $key;
$sha256 = hash('sha256', $rawString);
$finalXHeader = $sha256 . '###' . $keyIndex;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.phonepe.com/apis/hermes/pg/v1/pay");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "accept: application/json",
    "X-VERIFY: $finalXHeader"
]);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["request" => $encoded]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    echo json_encode([
        "success" => false,
        "message" => "cURL Error: " . curl_error($ch)
    ]);
    exit;
}

// Debugging: Log API response
error_log("PhonePe Response: " . $response);

$final = json_decode($response, true);

if (!$final) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON response from PhonePe",
        "raw_response" => $response
    ]);
    exit;
}

echo json_encode($final);
?>