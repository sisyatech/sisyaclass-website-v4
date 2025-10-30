<?php
ob_start();
header("Content-Type: text/html");

// Capture response data
$response = $_POST;

// Extract necessary details
$merchantTransactionId = isset($response['transactionId']) ? $response['transactionId'] : '';
$currentDateTime = date("d M Y | h:i A"); // Current date and time in the format: "08 Apr 2025 | 03:30 PM"

// If you still need the paymentTime to be displayed, you can format it as per the existing logic

ob_end_flush();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Failed</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PMD8KHN9');</script>
  <style>
    * {
      box-sizing: border-box;
    }
    
    html, body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: #f5f8ff !important;
    }
    
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      max-width: 450px;
      margin: 0 auto;
      background-color: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
    }
    
    .failure-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
    }
    
    .failure-icon-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FC4D4D, #FF2C2C);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      animation: scaleIn 0.5s ease-out;
      box-shadow: 0 10px 20px rgba(252, 77, 77, 0.3);
    }
    
    .failure-icon {
      font-size: 60px;
      color: white;
    }
    
    @keyframes scaleIn {
      0% { transform: scale(0); opacity: 0; }
      70% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    
    .failure-title {
      font-size: 24px;
      font-weight: bold;
      color: #D91A1A;
      margin-bottom: 15px;
      animation: fadeIn 0.7s ease-out;
    }
    
    .failure-message {
      font-size: 16px;
      color: #555;
      margin-bottom: 30px;
      line-height: 1.5;
      animation: fadeIn 0.9s ease-out;
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .payment-details {
      background-color: #f8f9ff;
      border-radius: 12px;
      padding: 20px;
      width: 100%;
      max-width: 350px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      animation: slideIn 1s ease-out;
    }
    
    @keyframes slideIn {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
    }
    
    .detail-label {
      color: #777;
      display: flex;
      align-items: center;
    }
    
    .detail-label i {
      margin-right: 8px;
      color: #FC4D4D;
    }
    
    .detail-value {
      font-weight: 500;
      color: #333;
    }
    
    .divider {
      height: 1px;
      background-color: #eee;
      margin: 15px 0;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 16px;
      color: #D91A1A;
    }
    
    .retry-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-top: 20px;
      animation: fadeIn 1.2s ease-out;
    }
    
    .retry-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #333;
      display: flex;
      align-items: center;
    }
    
    .retry-title i {
      margin-right: 8px;
      color: #FC4D4D;
    }
    
    .retry-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
    
    .retry-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9ff;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      padding: 12px 20px;
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: all 0.2s ease;
      width: 140px;
    }
    
    .retry-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      background-color: #f0f7ff;
    }
    
    .retry-btn i {
      font-size: 20px;
      margin-right: 8px;
    }
    
    .whatsapp-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #25D366;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 16px;
      font-weight: 500;
      margin-top: 20px;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }
    
    .whatsapp-button:hover {
      background-color: #128C7E;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .whatsapp-icon {
      margin-right: 8px;
      font-size: 20px;
    }
    
    .toast-message {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 5px;
      z-index: 3000;
      font-size: 14px;
      display: none;
      text-align: center;
      min-width: 250px;
    }
  </style>
</head>
<body>
  <div class="app-container">
    <!-- Toast message for notifications -->
    <div id="toastMessage" class="toast-message"></div>
    
    <div class="failure-page">
      <div class="failure-icon-container">
        <i class="fas fa-times-circle failure-icon"></i>
      </div>
      <h1 class="failure-title">Payment Failed!</h1>
      <p class="failure-message">
        Unfortunately, your payment was not processed. Please try again or contact support.
      </p>
      
      <div class="payment-details">
        <div class="detail-row">
          <span class="detail-label"><i class="fas fa-receipt"></i> Transaction ID</span>
          <span class="detail-value"><?= htmlspecialchars($merchantTransactionId) ?></span>
        </div>
        <div class="detail-row">
          <span class="detail-label"><i class="far fa-calendar-alt"></i> Date & Time</span>
          <span class="detail-value"><?= $currentDateTime ?></span>
        </div>
        <div class="divider"></div>
        <div class="total-row">
          <span>Amount Attempted</span>
          <span>Rs 19</span>
        </div>
      </div>
      
      <a href="https://wa.me/919100312034?text=Hi,%20I%20faced%20an%20issue%20while%20making%20a%20payment.%20My%20transaction%20ID%20is%20<?= htmlspecialchars($merchantTransactionId) ?>" class="whatsapp-button">
        <i class="fab fa-whatsapp whatsapp-icon"></i>
        Contact Us on WhatsApp
      </a>
      
      <div class="retry-section">
        <!-- <p class="retry-title"><i class="fas fa-arrow-circle-right"></i> Please try again</p> -->
        <!-- <div class="retry-buttons">
          <a href="payment_page.php" class="retry-btn">
            <i class="fas fa-redo"></i>
            Retry Payment
          </a>
        </div> -->
      </div>
    </div>
  </div>
  
  <script>
    // Show toast message on page load
    document.addEventListener('DOMContentLoaded', function() {
      // Check transaction status and show relevant messages
      const transactionId = "<?= htmlspecialchars($merchantTransactionId) ?>";
      if (!transactionId) {
        // window.location.href = "index.php";
      }
    });

    // Function to show toast message
    function showToast(message, duration = 3000, isError = false) {
      const toast = document.getElementById('toastMessage');
      toast.textContent = message;
      
      // Apply error styling if isError is true
      if (isError) {
        toast.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
        toast.style.color = 'white';
      } else {
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
      }
      
      toast.style.display = 'block';
      
      setTimeout(() => {
        toast.style.display = 'none';
      }, duration);
    }
  </script>
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMD8KHN9"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
</body>
</html>
