<?php
// Set response header to return JSON
header('Content-Type: application/json');

// Read and decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

$response = [];

// Check if JSON data was received
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit;
}

// Extract values safely
$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$phone = $data['phone'] ?? null;
$grade = $data['grade'] ?? null;
$board = $data['board'] ?? null;
$educationBoardId = $data['educationBoardId'] ?? null;

// Validate required fields
if (!$name || !$email || !$phone || !$grade || !$board || !$educationBoardId) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields',
        'received' => $data // Debugging: Show received data
    ]);
    exit;
}

// Prepare data for API request
$postData = [
    'type' => 'student',
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'grade' => $grade,
    'password' => '', // Optional password field
    'board' => $board,
    'imageData' => null,
    'uuid' => '',
    'educationBoardId' => (int)$educationBoardId,
];

// API Endpoint
$apiUrl = "https://sisyaclass.xyz/student/user";

// cURL request to API
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);

$apiResponse = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Handle API response
$decodedResponse = json_decode($apiResponse, true);

if ($httpCode === 200 && isset($decodedResponse['success']) && $decodedResponse['success'] === true) {
    echo json_encode([
        'success' => true,
        'message' => 'Signup successful! Please enter the OTP sent to your phone.',
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => $decodedResponse['error'] ?? 'Signup failed. Please try again.',
        'details' => $decodedResponse, // Debugging: API response
    ]);
}
?>
