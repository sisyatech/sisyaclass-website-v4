<?php
// session_start(); // Start the session

// Check if the request is POST and data is sent
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    if (isset($requestData['courseId'])) {
        $courseId = $requestData['courseId'];

        // Store the courseId in the session
      //  $_SESSION['courseId'] = $courseId;

        // Send a JSON response to the client with success status
        echo json_encode(['success' => true, 'message' => 'Course ID stored in session.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No courseId received.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
