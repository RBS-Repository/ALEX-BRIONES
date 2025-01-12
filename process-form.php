<?php
// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Prevent any output before our JSON response
ob_clean();

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Function to send JSON response
function sendResponse($status, $message) {
    echo json_encode([
        'status' => $status,
        'message' => $message
    ]);
    exit;
}

// Check request method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse('error', 'Invalid request method');
}

// Get and validate form data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    sendResponse('error', 'All fields are required');
}

try {
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Use your SMTP host
    $mail->SMTPAuth = true;
    $mail->Username = 'budaquecreations@gmail.com'; // Your Gmail address
    $mail->Password = 'your-16-character-app-password'; // Your Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('budaquecreations@gmail.com', 'Contact Form');
    $mail->addAddress('budaquecreations@gmail.com', 'Admin');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false);
    $mail->Subject = "New Contact Form Submission from $name";
    $mail->Body = "Name: $name\n";
    $mail->Body .= "Email: $email\n";
    $mail->Body .= "Phone: $phone\n\n";
    $mail->Body .= "Message:\n$message";

    $mail->send();
    sendResponse('success', 'Message sent successfully');

} catch (Exception $e) {
    sendResponse('error', 'Failed to send email: ' . $mail->ErrorInfo);
}
?> 