<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Email configuration
$to = 'zemnipracepavek@gmail.com';
$subject = 'Nová poptávka - Zemní práce Pávek';

// Get POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

// Sanitize inputs
$projectType = htmlspecialchars($data['projectType'] ?? '');
$name = htmlspecialchars($data['name'] ?? '');
$contact = htmlspecialchars($data['contact'] ?? '');
$details = htmlspecialchars($data['details'] ?? '');
$timestamp = htmlspecialchars($data['timestamp'] ?? '');

// Create email message
$message = "
Nová poptávka od: $name
Kontakt: $contact
Typ projektu: $projectType

Detaily projektu:
$details

---
Odesláno: $timestamp
";

$headers = "From: noreply@zemnipracepavek.cz\r\n";
$headers .= "Reply-To: $contact\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $message, $headers)) {
    // Log to file (optional - for backup)
    $logFile = '../logs/submissions.log';
    $logData = date('Y-m-d H:i:s') . " | $name | $contact | $projectType\n";
    
    if (!file_exists('../logs')) {
        mkdir('../logs', 0755, true);
    }
    
    file_put_contents($logFile, $logData, FILE_APPEND);
    
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>