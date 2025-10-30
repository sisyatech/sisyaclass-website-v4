<?php
ob_start();
header("Content-Type: text/html");

// Capture response data
$response = $_POST;

// Extract details
$merchantTransactionId = isset($response['transactionId']) ? $response['transactionId'] : '';
$currentDateTime = date("d M Y | h:i A");
$amountPaid = isset($response['amount']) ? $response['amount'] : '0';
// $amountPaidFormatted = number_format($amountPaid / 100, 2); // If amount is in paise
$amountPaidFormatted = $amountPaid; // If amount is already in rupees

ob_end_flush();
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script>
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-PMD8KHN9');
  </script>
  <style>
    * {
      box-sizing: border-box;
    }

    html,
    body {
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
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .success-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
    }

    .success-icon-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10A4FC, #4317FB);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      animation: scaleIn 0.5s ease-out;
      box-shadow: 0 10px 20px rgba(16, 164, 252, 0.3);
    }

    .success-icon {
      font-size: 60px;
      color: white;
    }

    @keyframes scaleIn {
      0% {
        transform: scale(0);
        opacity: 0;
      }

      70% {
        transform: scale(1.1);
      }

      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .success-title {
      font-size: 24px;
      font-weight: bold;
      color: #0033FF;
      margin-bottom: 15px;
      animation: fadeIn 0.7s ease-out;
    }

    .success-message {
      font-size: 16px;
      color: #555;
      margin-bottom: 30px;
      line-height: 1.5;
      animation: fadeIn 0.9s ease-out;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
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
      0% {
        opacity: 0;
        transform: translateY(30px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
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
      color: #10A4FC;
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
      color: #0033FF;
    }

    .download-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-top: 20px;
      animation: fadeIn 1.2s ease-out;
    }

    .download-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #333;
      display: flex;
      align-items: center;
    }

    .download-title i {
      margin-right: 8px;
      color: #10A4FC;
    }

    .download-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
    }

    .download-btn {
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

    .download-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      background-color: #f0f7ff;
    }

    .download-btn i {
      font-size: 20px;
      margin-right: 8px;
    }

    .android-icon {
      color: #3DDC84;
    }

    .apple-icon {
      color: #000000;
    }

    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #f0f;
      border-radius: 50%;
      animation: confetti-fall 5s ease-out infinite;
    }

    @keyframes confetti-fall {
      0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
      }

      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
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
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7G6TX79YTK"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-7G6TX79YTK');
  </script>
</head>

<body>
  <div class="app-container">
    <!-- Toast message for notifications -->
    <div id="toastMessage" class="toast-message"></div>

    <div class="success-page">
      <div class="success-icon-container">
        <i class="fas fa-check-circle success-icon"></i>
      </div>
      <h1 class="success-title">Payment Successful!</h1>
      <p class="success-message">
        Thank you for enrolling in our 10xBooster Course.
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
          <span>Amount Paid</span>
          <span><?= htmlspecialchars($amountPaidFormatted) ?></span>
        </div>
      </div>

      <a href="https://wa.me/919100312034?text=Hi,%20I%20just%20enrolled%20in%20the%20Summer%20Camp.%20My%20transaction%20ID%20is%20<?= htmlspecialchars($merchantTransactionId) ?>" class="whatsapp-button">
        <i class="fab fa-whatsapp whatsapp-icon"></i>
        Contact Us on WhatsApp
      </a>

      <div class="download-section">
        <p class="download-title"><i class="fas fa-mobile-alt"></i> Download our app for the best learning experience</p>
        <div class="download-buttons">
          <a href="https://play.google.com/store/apps/details?id=com.sisya.sisyaclass" class="download-btn">
            <i class="fab fa-android android-icon"></i>
            Android
          </a>
          <a href="https://apps.apple.com/in/app/sisya-class-e-learning-app/id6739211295" class="download-btn">
            <i class="fab fa-apple apple-icon"></i>
            iOS
          </a>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Keep the original JavaScript for functionality
    document.addEventListener('DOMContentLoaded', function() {
      // Create confetti effect
      createConfetti();

      // Check payment status from PHP

      const transactionId = "<?= htmlspecialchars($merchantTransactionId) ?>";
      const storedNumber = localStorage.getItem('mobileNumber');
      if (transactionId !== "") {} else {
        // window.location.href="index.php"
      }
    });

    // Function to create confetti effect
    function createConfetti() {
      const colors = ['#FF577F', '#FF884B', '#FFBD9B', '#4CACBC', '#7FC7D9', '#B5F1CC', '#E3F6FF'];
      const container = document.querySelector('.app-container');

      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(confetti);
      }
    }

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

    // Function to update payment status
  </script>

  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMD8KHN9"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
</body>

</html>