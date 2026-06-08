<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name    = $_POST['name'] ?? '';
    $email   = $_POST['email'] ?? '';
    $phone   = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';

    $body = "New Contact Form Submission\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message: $message\n";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'synorix.net';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@synorix.net';
        $mail->Password   = 'Enx3yZ<1x@%E?5Ze';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('info@synorix.net', 'Synorix Website');
        $mail->addAddress('info@synorix.net');

        if (!empty($email)) {
            $mail->addReplyTo($email, $name);
        }

        $mail->Subject = 'New Contact Form Message';
        $mail->Body    = $body;

        $mail->send();
        echo "success";

    } catch (Exception $e) {
        echo "failed: " . $mail->ErrorInfo;
    }
}
?>