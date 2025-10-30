<?php
$data = json_decode(file_get_contents('php://input'), true);

$paymentId = $data['razorpay_payment_id'];
$key_id = 'rzp_live_VA7aMe5xs6OpFd';
$key_secret = 'zOvVoWMBzg3dCvy7mV1FGj4b';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.razorpay.com/v1/payments/" . $paymentId);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERPWD, $key_id . ":" . $key_secret);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_status === 200) {
    header('Content-Type: application/json');
    echo $response; 
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch payment details']);
}
