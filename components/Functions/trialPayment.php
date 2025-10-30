<?php
require __DIR__ . '/razorpay-php/Razorpay.php'; // Razorpay PHP SDK
header("Content-Type: application/json");

use Razorpay\Api\Api;

$data = json_decode(file_get_contents("php://input"), true);
$response = [];

// Validate input
if (!isset($data['amount']) || !is_numeric($data['amount']) || $data['amount'] <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid amount"
    ]);
    exit;
}

try {
    // Initialize Razorpay client
    $api = new Api(
        'rzp_live_VA7aMe5xs6OpFd', // Test Key ID
        'zOvVoWMBzg3dCvy7mV1FGj4b'  // Test Key Secret
    );

    // Create order
    $order = $api->order->create([
        'amount'    => $data['amount'] * 100, // Razorpay uses paise
        'currency'  => 'INR',
        'receipt'   => 'receipt_' . time(),
        'payment_capture' => 1 // Auto-capture payment
    ]);

    // Prepare response
    $response = [
        "success" => true,
        "data" => [
            "order_id" => $order->id,
            "amount" => $order->amount,
            "currency" => $order->currency,
            "key_id" => 'rzp_live_VA7aMe5xs6OpFd',
            "name" => "Sisya Class",
            "description" => "Long Term Math Course",
            "prefill" => [
                "contact" => $data['phone'] ?? '',
            ]
        ]
    ];
} catch (Exception $e) {
    $response = [
        "success" => false,
        "message" => "Payment failed: " . $e->getMessage()
    ];
}

echo json_encode($response);

?>
