<?php
// Start session and set JSON response header
//session_start();
header('Content-Type: application/json');

$response = [];

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read and decode JSON input
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true);

    // Extract phone and OTP from the request data
    $phone = $data['phone'] ?? null;

    // Validate required fields
    if (!$phone) {
        echo json_encode([
            'success' => false,
            'message' => 'Phone Number is required.',
        ]);
        exit;
    }

    // Prepare data for API request
    $postData = [
        'phone' => $phone,
        'otp' => "1111",
    ];

    $apiUrl = "https://sisyaclass.xyz/student/complete_user_reg";

    // Initialize cURL request
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
    ]);

    $apiResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        echo json_encode([
            'success' => false,
            'message' => 'Error connecting to the API: ' . curl_error($ch),
        ]);
        exit;
    }

    // Decode API response
    $decodedResponse = json_decode($apiResponse, true);
    curl_close($ch);

    // Check API response
    if ($httpCode === 200 && isset($decodedResponse['success']) && $decodedResponse['success'] === true) {
        $_SESSION['user'] = $decodedResponse['user'];
        echo json_encode([
            'success' => true,
            'message' => 'OTP verified successfully.',
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => $decodedResponse['message'] ?? 'OTP verification failed.',
            'details' => $decodedResponse,
        ]);
    }
    exit;
}

// Handle invalid request method
echo json_encode([
    'success' => false,
    'message' => 'Invalid request method.',
]);
exit;
?>
