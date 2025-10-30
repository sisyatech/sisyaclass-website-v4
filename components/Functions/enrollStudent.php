<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from the AJAX request
    $purchaseData = [
        'PurchasePrice' => $_POST['PurchasePrice'],
        'basePrice' => $_POST['basePrice'],
        'cgst' => $_POST['cgst'],
        'sgst' => $_POST['sgst'],
        'discount' => $_POST['discount'],
        'endUsersId' => $_POST['endUsersId'],
        'bigCourseId' => $_POST['bigCourseId'],
        'OrderId' => $_POST['OrderId']
    ];

    // API endpoint to send data to
    $apiUrl = "https://sisyaclass.xyz/student/create_big_course_subscription_web"; // Replace with your API endpoint URL

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
        // Decode and return the API response
        echo $apiResponse;
    }

    // Close the cURL session
    curl_close($ch);
} else {
    // If the request method is not POST
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method. Use POST.'
    ]);
}
?>
