<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $json = file_get_contents('php://input');
    $purchaseData = json_decode($json, true); // Decode JSON into an associative array

    // Check if decoding was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid JSON format'
        ]);
        exit;
    }

    // Extract and validate data
    $purchaseData = [
        'PurchasePrice' => isset($purchaseData['PurchasePrice']) ? floatval($purchaseData['PurchasePrice']) : 0.00,
        'basePrice' => isset($purchaseData['basePrice']) ? floatval($purchaseData['basePrice']) : 0.00,
        'cgst' => isset($purchaseData['cgst']) ? floatval($purchaseData['cgst']) : 0.00,
        'sgst' => isset($purchaseData['sgst']) ? floatval($purchaseData['sgst']) : 0.00,
        'discount' => isset($purchaseData['discount']) ? floatval($purchaseData['discount']) : 0.00,
        'endUsersId' => isset($purchaseData['endUsersId']) ? intval($purchaseData['endUsersId']) : 0,
        'bigCourseId' => isset($purchaseData['bigCourseId']) ? intval($purchaseData['bigCourseId']) : 0,
        'OrderId' => $purchaseData['OrderId']
    ];

    // Log received data for debugging (remove in production)
   // file_put_contents('debug_log.txt', print_r($purchaseData, true));

    // API endpoint to send data to
    $apiUrl = "https://sisyaclass.xyz/student/create_big_course_subscription_web";

    // Initialize cURL
    $ch = curl_init($apiUrl);

    // Set cURL options
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($purchaseData)); // Send data as JSON
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Accept: application/json"
    ]);

    // Execute the cURL request
    $apiResponse = curl_exec($ch);

    // Check for errors
    if (curl_errno($ch)) {
        echo json_encode([
            'status' => 'error',
            'message' => curl_error($ch)
        ]);
    } else {
       echo $apiResponse;
    }

    // Close the cURL session
    curl_close($ch);
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method. Use POST.'
    ]);
}
?>
