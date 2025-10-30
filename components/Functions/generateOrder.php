<?php
// session_start(); // Start the session to check if the user is logged in
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
// // Check if the session is active (user is logged in)
// if (!isset($_SESSION['user'])) {
//     // If the session is not active, fail the request
//    // http_response_code(401); // Send a 401 Unauthorized status code
//     echo json_encode([
//         'status' => 'error',
//         'message' => 'Login to purchase the course.',
//     ]);
//     exit; // Stop further execution
// }

// Razorpay API keys
define('RAZORPAY_API_KEY', 'rzp_test_0rD6KCrEUi8mud'); // Replace with your API Key
define('RAZORPAY_API_SECRET', 'zqND98LEpDqgHBaAm5WC9WoK'); // Replace with your API Secret

function createOrder() {
    $url = "https://api.razorpay.com/v1/orders";

    $auth = base64_encode(RAZORPAY_API_KEY . ':' . RAZORPAY_API_SECRET);
    $headers = [
        "Authorization: Basic $auth",
        "Content-Type: application/json",
    ];

    $data = [
        'amount' => $_POST['amount'],  // Amount in paise (example: 50 INR)
        'currency' => 'INR',
        'receipt' => $_POST['receipt'],
        'notes' => [
            'key1' => 'value3',
            'key2' => 'value2',
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);

    return $response;
}

$response = createOrder();
echo $response;
}
?>
