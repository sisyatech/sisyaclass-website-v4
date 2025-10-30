<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$razorpay_order_id = $data['razorpay_order_id'] ?? '';
$razorpay_payment_id = $data['razorpay_payment_id'] ?? '';
$razorpay_signature = $data['razorpay_signature'] ?? '';

$key_secret = "zOvVoWMBzg3dCvy7mV1FGj4b"; 

$expected_signature = hash_hmac(
    'sha256',
    $razorpay_order_id . "|" . $razorpay_payment_id,
    $key_secret
);

if (hash_equals($expected_signature, $razorpay_signature)) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Signature verification failed"
    ]);
}

?>