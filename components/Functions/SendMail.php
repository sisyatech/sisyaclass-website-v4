<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Include the PHPMailer library
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';
require '../PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['fullName'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $cv = $_FILES['cvUpload'];
    $job = $_POST['jobTitle'];

    // Validate form inputs
    if (empty($name) || empty($email) || empty($contact) || empty($cv['tmp_name'])) {
        die("All fields are required.");
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP server configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP server (e.g., smtp.gmail.com)
        $mail->SMTPAuth = true;
        $mail->Username = 'sisyaclass@gmail.com'; // Replace with your email
        $mail->Password = 'weer irhp tjqj nikx'; // Replace with your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Use the SMTP port (587 for TLS, 465 for SSL)

        // Email details
        $mail->setFrom('sisyaclass@gmail.com', 'SISYA CLASS'); // Your email and name
        $mail->addAddress('contactus@sisyaclass.com', 'Contact Us'); // Recipient's email and name

        $mail->Subject = "Job Application from $name";
        $mail->Body = "Name: $name\nEmail: $email\nContact: $contact\nJob Title:$job.\nAttached is the CV\n";

        // Attach the uploaded CV
        $mail->addAttachment($cv['tmp_name'], $cv['name']);

        // Send the email
        $mail->send();
        echo "Application submitted successfully.";
    } catch (Exception $e) {
        echo "Application could not be sent. Error: {$mail->ErrorInfo}";
    }
}
?>
