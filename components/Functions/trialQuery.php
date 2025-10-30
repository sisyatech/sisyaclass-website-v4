<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $firstName = $_POST['name'];
    $phone = $_POST['contact'];
    $email = $_POST['email'];
    $class = $_POST['class'];
    $message = 'Trial inquiry submitted.';
    $isTrial = true;

    // API URL
    $apiUrl = 'https://sisyaclass.xyz/student/create_inq';

    // Data to be sent in the request
    $data = [
        'name' => $firstName,
        'phone' => $phone,
        'email' => $email,
        'message' => $message,
        'isTrialRequest' => $isTrial,
        'targetClass'=> $class
    ];

    // Set up the cURL request
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    // Execute the request
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        echo json_encode(['status' => 'success', 'message' => 'Inquiry submitted successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to submit inquiry. Please try again later.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
