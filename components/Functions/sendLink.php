<?php
header('Content-Type: application/json');

// Retrieve POST data from the frontend
$data = json_decode(file_get_contents('php://input'), true);

// Check if contact number is provided
if (!isset($data['contact']) || empty($data['contact'])) {
    echo json_encode(['success' => false, 'error' => 'Contact number is required.']);
    exit;
}

$contact = "91".$data['contact'];

// Ensure the contact number includes "91" prefix


// Prepare the API request
$apiUrl = 'https://sisyaclass.xyz/student/get_download_link';
$apiData = [
    'phone' => $contact, // Payload to send to the API
];

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($apiData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);

// Execute the API request
$response = curl_exec($ch);

// Check for errors in the cURL request
if ($response === false) {
    echo json_encode(['success' => false, 'error' => 'Failed to connect to the API.']);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Decode the API response
$apiResponse = json_decode($response, true);

// Check the API response and forward it to the frontend
if (isset($apiResponse['success']) && $apiResponse['success'] == true) {
    echo json_encode(['success' => true, 'message' => 'Link sent successfully!']);
} else {
    $errorMessage = $apiResponse['error'] ?? 'Failed to send the link.';
    echo json_encode(['success' => false, 'error' => $errorMessage]);
}
?>