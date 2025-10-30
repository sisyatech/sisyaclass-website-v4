<?php
$data = json_decode(file_get_contents("php://input"), true);

$phone = $data['phone'] ?? '';
$templateName = $data['template_name'] ?? '';
$imageUrl = $data['image_url'] ?? '';

$phone = preg_replace('/\D/', '', $phone);

if (strlen($phone) === 10) {
    $phone = '91' . $phone;
} elseif (strlen($phone) === 12 && strpos($phone, '91') === 0) {
   
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid phone number format"
    ]);
    exit;
}

if (empty($templateName) || empty($imageUrl)) {
    echo json_encode([
        "success" => false,
        "error" => "template_name and image_url are required"
    ]);
    exit;
}

$payload = [
    "integrated_number" => "918143779971",
    "content_type" => "template",
    "payload" => [
        "type" => "template",
        "template" => [
            "name" => $templateName,
            "language" => [
                "code" => "en",
                "policy" => "deterministic"
            ],
            "to_and_components" => [[
                "to" => [$phone],
                "components" => [
                    "header_1" => [
                        "type" => "image",
                        "value" => $imageUrl
                    ]
                ]
            ]]
        ],
        "messaging_product" => "whatsapp"
    ]
];


$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        "accept: application/json",
        "authkey: 428210ARKHcp5hTYi66e82652P1", 
        "content-type: application/json"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

echo json_encode([
    "success" => !$err,
    "response" => $err ?: json_decode($response, true),
    "template_name" => $templateName,
    "image_url" => $imageUrl
]);
?>