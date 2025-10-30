<?php
ob_start();
header("Content-Type: text/html");

// Capture response data
$response = $_POST;

// Extract necessary details
$merchantTransactionId = isset($response['transactionId']) ? $response['transactionId'] : '';
$paymentCode = isset($response['code']) ? $response['code'] : '';
$amountPaid = isset($response['amount']) ? "₹" . ($response['amount'] / 100) : "Unknown Amount";
$paymentDate = isset($response['timestamp'])
    ? date("d M Y | h:i A", $response['timestamp'] / 1000)
    : date("d M Y | h:i A");

// Determine payment status
$paymentMessage = "Payment status not determined.";
$paymentIcon = "assets/img/failure.png";
$paymentStatus = "";

if ($paymentCode === "PAYMENT_SUCCESS") {
    $paymentStatus = "success";
    $paymentMessage = "Payment successful!";
    $paymentIcon = "assets/img/success.png";
} elseif ($paymentCode === "PAYMENT_PENDING") {
    $paymentStatus = "pending";
    $paymentMessage = "Payment is still pending. Please wait...";
}

// Capture UTM parameters from URL
$utm_source = isset($_GET['utm_source']) ? $_GET['utm_source'] : '';
$utm_medium = isset($_GET['utm_medium']) ? $_GET['utm_medium'] : '';
$utm_campaign = isset($_GET['utm_campaign']) ? $_GET['utm_campaign'] : '';

ob_end_flush();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISYA CLASS</title>
    <link rel="icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/slick.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet">

    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/slick.min.js"></script>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
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
        body {
            font-family: 'Roboto', sans-serif;
        }

        /* Reservation Popup Styles */
        .reservation-popup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            /* Increased z-index to ensure it appears on top */
            justify-content: center;
            align-items: center;
        }

        .reservation-popup.show {
            display: flex;
        }

        .reservation-content {
            background-color: white;
            border-radius: 8px;
            width: 90%;
            max-width: 380px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 10000;
            /* Even higher z-index for the content */
        }

        .reservation-content h2 {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;

        }

        .timer-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            gap: 10px;
        }

        .timer-box {
            background-color: #1B9CFF;
            color: white;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            font-weight: bold;
            font-size: 20px;
        }

        .timer-label {
            font-size: 12px;
            text-align: center;
            color: #666;
            margin-top: 5px;
        }

        .reservation-form .form-group {
            margin-bottom: 15px;
        }

        .reservation-form label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            color: #666;
        }

        .reservation-form select,
        .reservation-form input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }

        .remaining-seats {
            font-size: 14px;
            color: #666;
            margin: 10px 0;
            text-align: center;
            background-color: #eee;
            padding: 5px;
            border-radius: 5px;
        }

        .phone-input-container {
            display: flex;
            height: 45px;
        }

        .country-code {
            width: 60px;
            padding: 10px;
            height: 45px;
            border: 1px solid #ddd;
            border-radius: 5px 0 0 5px;
            background-color: #f5f5f5;
            text-align: center;
        }

        .phone-input {
            flex-grow: 1;
            height: 45px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;

        }

        .reserve-btn {
            width: 100%;
            background-color: #1B9CFF;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
        }

        .close-popup {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #666;
        }

        /* Ensure the popup appears above everything */
        .modal-backdrop {
            z-index: 9998;
        }

        @media (min-width:768px) {
            .show-in-mobile {
                display: none;
            }
        }

        .footer {
            background: #F3F4F8;
        }

        .footer-text p {
            color: #002152;
        }

        .footer-menu li a {
            color: #1B9CFF;
        }

        .coustm-fab {
            color: white;
            background: #002152;
            border-radius: 50%;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .footer-bottom .copy-right {
            color: #002152;
        }

        .footer-bottom .policy-links li a {
            color: #002152;
        }

        .footer-logo {
            width: 100% !important;
        }
    </style>
    <style>
        .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 99999;
        }

        .loader {
            width: 48px;
            height: 48px;
            border: 3px solid #002152;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
        }

        .loader::after {
            content: '';
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-bottom-color: #02bdfe;
        }

        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        /* Section wrapper */
        .ct-section {
            padding: 4rem 1rem;
            background: #f9f9f9;
            display: flex;
            justify-content: center;
        }

        .ct-wrapper {
            max-width: 72rem;
            width: 100%;
            margin: 0 auto;
            text-align: center;
        }

        /* Title */
        .ct-title {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 2rem;
        }

        /* Card container */
        .ct-card-container {
            display: flex;
            gap: 1rem;
            overflow-x: auto;
            /* scroll on mobile */
            scroll-behavior: smooth;
            padding-bottom: 1rem;
        }

        /* Individual card */
        .ct-card {
            flex: 0 0 auto;
            min-width: 220px;
            background: white;
            padding: 1.2rem;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .ct-icon {
            width: 50px;
            height: 50px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 0.75rem;
        }

        .ct-card-title {
            margin: 0.3rem 0;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .ct-grade {
            color: #555;
            font-size: 0.9rem;
        }

        .ct-days {

            margin-top: 0.5rem;
        }

        .ct-time {
            color: black;

            margin-top: 0.2rem;
        }

        /* Desktop: 5 cards visible */
        @media (min-width: 1024px) {
            .ct-card-container {
                overflow-x: hidden;
                /* disable scroll */
                justify-content: center;
                flex-wrap: nowrap;
            }

            .ct-card {
                flex: 1 1 18%;
                /* 5 cards per row */
                min-width: auto;
            }
        }

        /* Tablet & Mobile: 3 visible */
        @media (max-width: 1023px) {
            .ct-card {
                flex: 0 0 30%;
            }
        }

        /* Small mobile: 2 visible */
        @media (max-width: 600px) {
            .ct-card {
                flex: 0 0 45%;
            }
        }

        /* Extra small: 1 visible */
        @media (max-width: 400px) {
            .ct-card {
                flex: 0 0 80%;
            }
        }

        .demo-text {
            color: #01317A;
            font-weight: 600;
        }

        .demo-text p {
            margin: 4px 0;
        }

        @media (max-width: 768px) {
            .demo-text {
                text-align: center;
                font-size: 2rem;
            }

            .demo-text p {
                font-size: 1rem;
            }
        }
    </style>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SISYA</title>
    <link rel="stylesheet" href="../assets/style.css" />
    <link rel="stylesheet" href="./assets/style.css">
</head>

<body>
    <!-- nav section -->
    <section>
        <nav>
            <div class="logo">
                <a href="/" class="">
                    <img src="../mainAsset/logo/logo.png" alt="logo" />
                    <p>SISYA CLASS</p>
                </a>
            </div>
            <!-- Desktop Navigation -->
            <div class="nav-actions">
                <ul>
                    <li><a href="#testimonial-section">Reviews</a></li>
                    <li><a href="#sisya-compare-section">SISYA vs Others</a></li>
                    <li><a href="#educator-section">Meet Our Teachers</a></li>
                    <li><a href="#video-slider-section">Demo Class</a></li>
                    <!-- <li><a href="../about-us.php">About Us</a></li>
                    <li><a href=""><img src="../mainAsset/user.svg" alt="user icon" /></a></li>
                    <li class="btn-try-now"><a href="javascript:void(0)" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">TRY IT NOW</a></li>
                    <li><button class="custom-button" data-bs-toggle="modal" data-bs-target="#aiModal">
                            <span class="button-content">
                                SISYA AI
                                <img src="../mainAsset/nav-btn.svg" alt="Arrow Right" class="arrow-icon" />
                            </span>
                            <div class="button-shine"></div>
                        </button>
                    </li> -->
                </ul>
            </div>
            <!-- Mobile Hamburger Icon -->
            <div class="mobile-menu">
                <a href=""><img src="../mainAsset/user.svg" alt="user icon" /></a>
                <img src="../mainAsset/hamburger.svg" alt="hamburger icon" class="hamburger-icon" />
            </div>
        </nav>
    </section>

    <!-- trial modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content rounded-6">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <h5 class="modal-title text-drk">Book a free trial class</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <form id="trialForm">
                        <div class="mb-3 position-relative">
                            <i class="fas fa-user position-absolute top-50 start-0 translate-middle-y ms-3"
                                style="color:white; padding:7px; margin-right:50px; border-radius:50px; background-color: #007bff;"></i>
                            <input type="text" class="form-control ps-5" id="name" placeholder="Enter your name">
                        </div>
                        <div class="mb-3 position-relative">
                            <i class="fas fa-envelope position-absolute top-50 start-0 translate-middle-y ms-3"
                                style="color:white; padding:7px;  margin-right:50px; border-radius:50px; background-color: #007bff;"></i>
                            <input type="email" class="form-control ps-5" id="email" placeholder="name@example.com">
                        </div>
                        <div class="mb-3 position-relative">
                            <i class="fas fa-phone-alt position-absolute top-50 start-0 translate-middle-y ms-3"
                                style="color:white; padding:7px;  margin-right:50px; border-radius:50px; background-color: #007bff;"></i>
                            <input type="tel" class="form-control ps-5" id="contact"
                                placeholder="Enter your contact number">
                        </div>
                        <div class="mb-3">
                            <select class="form-select" id="class">
                                <option value="">Select Class</option>
                                <option value="1">Class 1</option>
                                <option value="2">Class 2</option>
                                <option value="3">Class 3</option>
                                <option value="4">Class 4</option>
                                <option value="5">Class 5</option>
                                <option value="6">Class 6</option>
                                <option value="7">Class 7</option>
                                <option value="8">Class 8</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                                <option value="11">Class 11</option>
                            </select>
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <div class="btn-group" role="group" aria-label="Board toggle">
                                <input type=" radio" class="btn-check" name="board" id="cbse" autocomplete="off" checked>
                                <label class="btn board-btn" for="cbse">CBSE</label>

                                <input type="radio" class="btn-check" name="board" id="state" autocomplete="off">
                                <label class="btn board-btn" for="state">State Board</label>

                                <input type="radio" class="btn-check" name="board" id="icse" autocomplete="off">
                                <label class="btn board-btn" for="icse">ICSE</label>
                            </div>
                        </div>
                        <div id="formMessage"></div>
                    </form>
                </div>
                <div class="modal-footer border-0 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary px-4 py-2 modal-book-now">Book Now</button>
                </div>
            </div>
        </div>
    </div>

    <!-- SISYA AI -->
    <div class="modal fade" id="aiModal" tabindex="-1" aria-labelledby="aiModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content ai-modal-content">
                <!-- Top Header with Logo -->
                <div class="ai-modal-header">
                    <img src="../mainAsset/ai_modal/Group 1116605306.svg" alt="AI Logo" class="ai-logo">
                    <button type="button" class="btn-close ai-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="ai-modal-body text-center">
                    <h4 class="ai-title">Subscribe to try Our SISYA AI</h4>
                    <p class="ai-subtitle">Enter your mobile number<br>to get started</p>

                    <div class="ai-input-wrapper">
                        <input type="text" class="form-control ai-input" placeholder="Enter Mobile Number">
                    </div>

                    <button class="btn ai-subscribe-btn">Subscribe</button>

                    <div class="ai-store-buttons">
                        <a href="#"><img src="../mainAsset/ai_modal/download_play.svg" alt="Google Play"
                                class="store-badge"></a>
                        <a href="#"><img src="../mainAsset/ai_modal/download_apple.svg" alt="App Store"
                                class="store-badge"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Reservation Popup -->
    <div class="reservation-popup" id="reservationPopup">
        <div class="reservation-content">
            <button class="close-popup" id="closePopup">&times;</button>
            <h2>See the Difference in Just One Class</h2>
            <p style="text-align:center;">Get Live Class, Recorded Sessions, Doubt-Solving & Performance Reports</p><br>
            <!-- <div class="timer-container">
                <div>
                    <div class="timer-box" id="hoursBox">00</div>
                    <div class="timer-label">Hours</div>
                </div>
                <div>
                    <div class="timer-box" id="minutesBox">00</div>
                    <div class="timer-label">Minutes</div>
                </div>
                <div>
                    <div class="timer-box" id="secondsBox">01</div>
                    <div class="timer-label">Seconds</div>
                </div>
            </div> -->
            <!-- <p class="text-center text-muted small mb-3">Remaining payment time</p> -->

            <form class="reservation-form">
                <div class="form-group">
                    <label for="childClass" style="text-align:center;">Select Grade</label>
                    <select id="childClass">
                        <option value="1" selected>Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                    </select>
                </div>

                <div class="remaining-seats">12 Remaining seats</div>

                <!-- <div class="form-group">
                    <label for="childName">Enter your child's name</label>
                    <div class="phone-input-container">
                        <input id="childName" class="phone-input" placeholder="Enter your child's name">
                    </div>
                </div> -->

                <div class="form-group">
                    <label for="phoneNumber">Enter your phone number</label>
                    <div class="phone-input-container">
                        <div class="country-code">+91</div>
                        <input type="tel" id="phoneNumber" class="phone-input" placeholder="Enter your phone number">
                    </div>
                </div>

                <!-- <div class="form-group">
                    <label for="childState">Select State</label>
                    <select id="childState">
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar">Andaman and Nicobar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                    </select>
                </div> -->

                <!-- <div class="form-group">
                    <label for="altPhoneNumber">Enter your alternate phone number</label>
                    <div class="phone-input-container">
                        <div class="country-code">+91</div>
                        <input type="tel" id="altPhoneNumber" class="phone-input" placeholder="Enter your alternate phone number">
                    </div>
                </div> -->

                <!-- <div class="form-group">
                    <label for="language">Select Prefered language</label>
                    <select id="language">
                        <option value="english" selected>English</option>
                        <option value="hindi">Hindi</option>
                        <option value="telugu">Telugu</option>
                    </select>
                </div> -->

                <button type="button" class="reserve-btn" id="reserve-btn">Get 3 days demo @₹19 Only</button>
            </form>
        </div>
    </div>

    <!-- Sidebar for Mobile Navigation -->
    <div class="sidebar">
        <ul>
            <li><a href="#testimonial-section">Reviews</a></li>
            <li><a href="#sisya-compare-section">SISYA vs Others</a></li>
            <li><a href="#educator-section">Meet Our Teachers</a></li>
            <li><a href="#video-slider-section">Demo Class</a></li>
            <!-- <li><a href="../about-us.php">About Us</a></li>
            <li><button class="try-btn">TRY IT NOW</button></li>
            <li><button class="custom-button" data-bs-toggle="modal" data-bs-target="#aiModal">
                    <span class="button-content">
                        SISYA AI
                        <img src="../mainAsset/nav-btn.svg" alt="Arrow Right" class="arrow-icon" />
                    </span>
                    <div class="button-shine"></div>
                </button>
            </li> -->
        </ul>
    </div>

    <!-- Hero Section -->
    <section class="hero-section hero-section2">
        <div class="hero-content">
            <div class="hero-offer-block">
                <h2 class="hero-subheading">IIT/NIT Educators. 24/7 AI Support</h2>
                <h1 class="hero-main-heading hero-main-heading2">Just @ ₹19 to Begin</h1>
                <h2 class="hero-courses-list hero-courses-list2">Maths | EVS | English | Physics | Chemistry</h2>
                <h2 class="hero-courses-list-class hero-courses-list-class2">Class 1-10 Online Classes</h2>
                <ul class="hero-feature-list">
                    <li>✅ Diwali Offer - Flat 50% Off On All Courses</li>
                    <li>✅ CBSE, ICSE &amp; State Boards Covered</li>
                    <li>✅ Choose Between 1 PM To 9 PM</li>
                    <li>✅ Choose between Crash Course and All-In-One Course</li>
                </ul>
                <div class="hero-cta-buttons">
                    <button class="btn-get-started btn-get-started2" id="getStartedBtn">Get 3 Days Demo @19</button>
                    <!-- <a href="#team"> <button class="btn-demo">Experience a Demo</button></a> -->
                </div>
            </div>

            <!-- <div class="hero-video hero-video--wide hero-video--wide2">
                <div class="video-inner">
                    <iframe
                        src="https://www.youtube.com/embed/oqxw-V4ChKM?autoplay=1&mute=1&loop=1&playlist=oqxw-V4ChKM&start=21"
                        title="Video"
                        allow="autoplay; encrypted-media"
                        allowfullscreen>
                    </iframe>
                </div>
            </div> -->
            <div class="hero-image hero-image-mob">
                <img src="../mainAsset/hero/girl-image.svg" alt="Hero Illustration" />
                <!-- Floating icons -->
                <img class="floating-icon book book2" src="../mainAsset/hero/book-icon.png" alt="Book Icon" />
                <img class="floating-icon flask flask2" src="../mainAsset/hero/flask-icon.png" alt="Flask Icon" />
                <img class="floating-icon hand hand2" src="../mainAsset/hero/microscope-hand.png" alt="Microscope hand Icon" />
            </div>
        </div>
    </section>

    <!-- Stats Section -->

    <section class="stats-section2 stat-sec-3 stat-sec-5">
        <div class="smart-container">
            <div class="smart-text">
                <h2>
                    <strong>
                        <span class="seven-day">Become 10X Smarter <img src="../mainAsset/hero/brain.svg" alt="Brain Icon" class="icon-inline" /></span>
                    </strong>
                </h2>

                <div class="demo-text">
                    <p>Grade 1-5 : 2 Maths & 1 EVS/English Demo</p>
                    <p>Grade 6-10 : 2 Maths & 1 Science Demo</p>
                </div>

                <div class="cta-wrapper">
                    <span class="enroll-span">
                        Choose a Class to Enroll Now
                    </span>
                    <img src="../mainAsset/hero/point.svg" alt="Pointer Icon" class="pointer-icon" />
                </div>
            </div>

            <div class="class-grid">
                <button class="class-btn" data-grade="1">Class 1</button>
                <button class="class-btn" data-grade="2">Class 2</button>
                <button class="class-btn" data-grade="3">Class 3</button>
                <button class="class-btn" data-grade="4">Class 4</button>
                <button class="class-btn" data-grade="5">Class 5</button>
                <button class="class-btn" data-grade="6">Class 6</button>
                <button class="class-btn" data-grade="7">Class 7</button>
                <button class="class-btn" data-grade="8">Class 8</button>
                <button class="class-btn" data-grade="9">Class 9</button>
                <button class="class-btn" data-grade="10">Class 10</button>
                <button class="class-btn sold-out">
                    <div>Class 11</div>
                    <span>(Sold Out)</span>
                </button>
                <button class="class-btn sold-out">
                    <div>Class 12</div>
                    <span>(Sold Out)</span>
                </button>
            </div>
        </div>
    </section>

    <section class="review-section">
        <?php
        include 'review.php';
        ?>
    </section>

    <section class="unique-course-section">
        <!-- Crash Course Card -->
        <div class="unique-course-card">
            <div class="unique-course-header">
                <div class="unique-course-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
                <h3 class="unique-course-title">CRASH COURSE</h3>
            </div>
            <div class="unique-course-content">
                <ul class="unique-course-list">
                    <li>Duration : Till March 2026</li>
                    <li>Covers Whole Syllabus By IIT Teachers</li>
                    <li>Learn Time Saving Tips For Exams</li>
                    <li>Learn 300+ Tricks To Solve Questions Easily</li>
                </ul>
            </div>
        </div>

        <!-- All-in-One Course Card -->
        <div class="unique-course-card">
            <div class="unique-course-header">
                <div class="unique-course-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                    </svg>
                </div>
                <h3 class="unique-course-title">ALL-IN-ONE COURSE</h3>
            </div>
            <div class="unique-course-content">
                <ul class="unique-course-list">
                    <li>Duration : 18 Months</li>
                    <li>Covers Everything in Crash Course</li>
                    <li>Covers Next Year's School Syllabus + Coding + Robotics</li>
                    <li>Prepare for Olympiads, SATs & Other Exams</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="stats-section23">
        <div class="stats-container23">
            <div class="stat-item23">
                <img src="./assets/bookkk.svg" alt="IIT/NIT Experts" />
                <h3>All Subjects</h3>
                <p>Grade 1-10</p>
                <h3 class="p">Monday to Saturday</h3>
                <p>Regular Class</p>
                <p>7:00 PM - 8:00 PM</p>
            </div>
            <div class="stat-item23">
                <img src="./assets/bulbbbb.svg" alt="Students Excelled" />
                <h3>JEE</h3>
                <p>Grade 8-10</p>
                <h3 class="p">Monday to Saturday</h3>
                <p>Regular Class</p>
                <p>8:00 PM - 9:00 PM</p>
            </div>
            <div class="stat-item23">
                <img src="./assets/s1.svg" alt="Students Excelled" />
                <h3>Demo</h3>
                <p>Grade 1-10</p>
                <h3 class="p">Monday to Wednesday</h3>
                <p>Batch 1</p>
                <p>1:00 PM - 9:00 PM</p>
            </div>
            <div class="stat-item23">
                <img src="./assets/s1.svg" alt="Students Excelled" />
                <h3>Demo</h3>
                <p>Grade 1-10</p>
                <h3 class="p">Thrusday to Saturday</h3>
                <p>Batch 2</p>
                <p>1:00 PM - 9:00 PM</p>
            </div>
            <!-- <div class="stat-item23">
                <img src="./assets/s1.svg" alt="Students Excelled" />
                <h3>Demo</h3>
                <p>Grade 1-10</p>
                <h3 class="p">MTW - <span>8:00 PM - 9:00 PM</span> </h3>
                <h3 class="p">TFS - <span>8:00 PM - 9:00 PM</span> </h3>
            </div> -->
        </div>
    </section>

    <section class="testimonial-reels">
        <h2 class="testimonial-title">Watch Why Students & Parents Love SISYA</h2>

        <!-- Desktop View (Original) -->
        <div class="reel-videos">
            <div class="reel-frame pink" data-video-id="OQYfmOIRp90" data-title="Student Feedback on SISYA CLASS">
                <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/OQYfmOIRp90/sddefault.jpg');">
                    <div class="video-title">Student Feedback on SISYA CLASS</div>
                </div>
            </div>

            <div class="reel-frame yellow" data-video-id="WkQGTjNfFjU" data-title="Why Learners Choose SISYA CLASS">
                <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/WkQGTjNfFjU/sddefault.jpg');">
                    <div class="video-title">Why Learners Choose SISYA CLASS</div>
                </div>
            </div>

            <div class="reel-frame blue" data-video-id="We0WuqtYA_M" data-title="Parents Share Their Thoughts on SISYA CLASS">
                <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/We0WuqtYA_M/sddefault.jpg');">
                    <div class="video-title">Parents Share Their Thoughts on SISYA CLASS</div>
                </div>
            </div>

            <div class="reel-frame green" data-video-id="23K0OGZJfjU" data-title="Kids Love SISYA CLASS | Real Testimonials">
                <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/23K0OGZJfjU/sddefault.jpg');">
                    <div class="video-title">Kids Love SISYA CLASS | Real Testimonials</div>
                </div>
            </div>
        </div>

        <!-- Mobile View (Slider) -->
        <div class="testimonial-slider-container">
            <div class="testimonial-slider-wrapper" id="testimonialSlider">
                <div class="reel-frame pink" data-video-id="OQYfmOIRp90" data-title="Student Feedback on SISYA CLASS">
                    <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/OQYfmOIRp90/sddefault.jpg');">
                        <div class="video-title">Student Feedback on SISYA CLASS</div>
                    </div>
                </div>

                <div class="reel-frame yellow" data-video-id="WkQGTjNfFjU" data-title="Why Learners Choose SISYA CLASS">
                    <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/WkQGTjNfFjU/sddefault.jpg');">
                        <div class="video-title">Why Learners Choose SISYA CLASS</div>
                    </div>
                </div>

                <div class="reel-frame blue" data-video-id="We0WuqtYA_M" data-title="Parents Share Their Thoughts on SISYA CLASS">
                    <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/We0WuqtYA_M/sddefault.jpg');">
                        <div class="video-title">Parents Share Their Thoughts on SISYA CLASS</div>
                    </div>
                </div>

                <div class="reel-frame green" data-video-id="23K0OGZJfjU" data-title="Kids Love SISYA CLASS | Real Testimonials">
                    <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/23K0OGZJfjU/sddefault.jpg');">
                        <div class="video-title">Kids Love SISYA CLASS | Real Testimonials</div>
                    </div>
                </div>
            </div>

            <div class="testimonial-slider-controls">
                <button class="testimonial-arrow-btn" onclick="prevTestimonial()">
                    <img src="../10xboostercourse-test/assets/left.svg" alt="Previous">
                </button>
                <button class="testimonial-arrow-btn" onclick="nextTestimonial()">
                    <img src="../10xboostercourse-test/assets/right.svg" alt="Next">
                </button>
            </div>
        </div>
    </section>

    <section class="how-it-works">
        <h2>How It Works?</h2>
        <div class="steps">
            <!-- Step 1 -->
            <div class="step-card step-1">
                <div class="step-icon">
                    <img src="./assets/st1.svg" alt="Step 1 Icon">
                </div>
                <div class="step-title">Step-1</div>
                <div class="step-text">Register For 3 Days Demo Class @ ₹19</div>
            </div>

            <!-- Step 2 -->
            <a href="tel:+917330897291"
                class="step-card step-2"
                style="text-decoration:none; color:inherit;">
                <div class="step-icon">
                    <img src="./assets/st2.svg" alt="Step 2 Icon">
                </div>
                <div class="step-title">Step-2</div>
                <div class="step-text">Our Mentor Will Call You To Discuss Date & Time</div>
            </a>

            <!-- Step 3 -->
            <div class="step-card step-3">
                <div class="step-icon">
                    <img src="./assets/st3.svg" alt="Step 1 Icon">
                </div>
                <div class="step-title">Step-3</div>
                <div class="step-text">IIT Teachers Will Conduct The Demo Class</div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-wrap">
                <div class="footer-logo"><a href="#"><img src="../assets/img/logo/logo.png" alt=""></a></div>
                <div class="footer-text">
                    <p>Empower your future with SISYA CLASS—where expert NIT/IIT guidance fuels smarter learning, faster
                        growth, and real success.
                    </p>
                </div>
                <ul class="footer-menu">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="our-courses.php">Our Courses</a></li>
                    <li><a href="about-us.php">About Us </a></li>
                    <li><a href="careers.php">Career </a></li>
                    <li><a href="contact-us.php">Contact Us</a></li>
                </ul>
                <div class="app-download-from">
                    <a href="https://play.google.com/store/apps/details?id=com.sisya.sisyaclass"><img
                            src="../mainAsset/footer/download_play.svg" alt="" style="width:120px;"></a>

                    <a href="https://apps.apple.com/in/app/sisya-class-e-learning-app/id6739211295"><img
                            src="../mainAsset/footer/download_apple.svg" alt="" style="width:120px;"> </a>
                </div>
                <ul class="footer-social-links">
                    <li><a href="https://www.facebook.com/profile.php?id=61569281738662"><i
                                class="fab coustm-fab fa-facebook-f"></i></a></li>
                    <li><a href="https://www.instagram.com/sisyaclass/"><i class="fab coustm-fab fa-instagram"></i></a>
                    </li>
                    <li><a href="https://www.youtube.com/@SISYACLASS" target="_blank">
                            <i class="fab coustm-fab fa-youtube"></i>
                        </a>
                    </li>
                    <li><a href="https://www.linkedin.com/company/sisyaclass/?viewAsMember=true" target="_blank"><i
                                class="fab coustm-fab fa-linkedin-in"></i></a></li>
                </ul>
                <div class="footer-bottom">
                    <div class="copy-right">Copyright © 2025 SISIYA EDTECH PVT. LTD. All rights reserved.</div>
                    <ul class="policy-links">
                        <li><a href="privacy-policy.php">Privacy Policy</a></li>
                        <li><a href="terms-condition.php">Terms & Conditions</a></li>
                        <li><a href="refund.php">Refund Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bottom Right FAB -->
    <div class="fab-container fab-right">
        <a href="https://wa.me/917393939143" target="_blank" rel="noopener noreferrer">
            <div class="fab" title="whatsapp">
                <img src="../mainAsset/fab/whatsapp.svg" alt="whatsapp">
            </div>
        </a>
    </div>
    <!-- Bottom Left FAB  -->
    <div class="fab-container fab-left">
        <!-- Pill container with an arrow on top -->
        <div class="fab-pill" id="pillContainer">
            <!-- Arrow Button -->
            <div class="fab arrow-btn" id="toggleMenu" title="Toggle Menu">
                <img id="arrowIcon" src="../mainAsset/fab/down-arrow.gif" alt="Arrow Icon">
            </div>

            <!-- Menu icons that will show when toggled -->
            <div class="fab-menu" id="fabMenu">
                <a href="https://www.instagram.com/sisyaclass" target="_blank" rel="noopener noreferrer">
                    <div class="fab" title="facebook">
                        <img src="../mainAsset/fab/facebook.svg" alt="facebook">
                    </div>
                </a>
                <a href="https://www.instagram.com/sisyaclass" target="_blank" rel="noopener noreferrer">
                    <div class="fab" title="instagram">
                        <img src="../mainAsset/fab/instagram.svg" alt="instagram">
                    </div>
                </a>
                <a href="https://in.linkedin.com/company/sisyaclass" target="_blank" rel="noopener noreferrer">
                    <div class="fab" title="linkedin">
                        <img src="../mainAsset/fab/linkedin.svg" alt="linkedin">
                    </div>
                </a>
                <a href="http://t.me/sisyaclass" target="_blank" rel="noopener noreferrer">
                    <div class="fab" title="twitter">
                        <img src="../mainAsset/fab/telegram.svg" alt="telegram">
                    </div>
                </a>
            </div>

            <!-- Bottom fixed icon  -->
            <a href="https://www.youtube.com/@SISYACLASS" target="_blank" rel="noopener noreferrer">
                <div class="fab" title="youtube">
                    <img src="../mainAsset/fab/youtube.svg" alt="youtube">
                </div>
            </a>
        </div>
    </div>

    <!-- loader -->
    <div id="loader" class="loader-container">
        <div class="loader"></div>
    </div>

    <!-- <script>
        // Video testimonial controls
        const videoContainers = document.querySelectorAll('.video-container1');
        let currentVideoIndex = 0;

        document.getElementById('prevVideo').addEventListener('click', () => {
            videoContainers[currentVideoIndex].classList.remove('active');
            currentVideoIndex = (currentVideoIndex - 1 + videoContainers.length) % videoContainers.length;
            videoContainers[currentVideoIndex].classList.add('active');
        });

        document.getElementById('nextVideo').addEventListener('click', () => {
            videoContainers[currentVideoIndex].classList.remove('active');
            currentVideoIndex = (currentVideoIndex + 1) % videoContainers.length;
            videoContainers[currentVideoIndex].classList.add('active');
        });
    </script> -->

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.theme.min.css">

    <!-- Glide.js JS -->
    <script src="https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/glide.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>

    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/custom.js"></script>
    <script src="../assets/main.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js"
        integrity="sha512-f6bQMg6nkSRw/xfHw5BCbISe/dJjXrVGfz9BSDwhZtiErHwk7ifbmBEtF9vFW8UNIQPhV2uEFVyI/UHob9r7Cw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js"
        integrity="sha512-AcqPGqrrAEtEwe+ADO5R8RbdFi7tuU7b/A2cJJH0Im0D18NRk5p5s4B3E5PMuO81KFw0ClN7J5SHVUJz7KOb0A=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/TextPlugin.min.js"
        integrity="sha512-cxH9rbrf9TrOfYMunxS2cLhFg/hIFJP9/d8SdBT1To+D5BHf6XcYN6PGtLiN9baib6ve4JDOzaPrCTRyo/8J9g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script>
        // Reservation Popup Timer Functionality
        let seconds = 15; // Changed to 1 to match the image
        let minutes = 0;
        let hours = 0;
        let timerInterval;

        function startTimer() {
            updateTimerDisplay(); // Update display immediately

            timerInterval = setInterval(function() {
                if (seconds > 0) {
                    seconds--;
                } else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        } else {
                            clearInterval(timerInterval);
                            // Timer ended
                        }
                    }
                }
                updateTimerDisplay();
            }, 1000);
        }

        function updateTimerDisplay() {
            document.getElementById('secondsBox').textContent = seconds < 10 ? '0' + seconds : seconds;
            document.getElementById('minutesBox').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('hoursBox').textContent = hours < 10 ? '0' + hours : hours;
        }

        // Show Reservation Popup
        function showReservationPopup(selectedClass) {
            document.getElementById('childClass').value = selectedClass;
            document.getElementById('reservationPopup').classList.add('show');
            // startTimer();
        }

        // Hide Reservation Popup
        function hideReservationPopup() {
            document.getElementById('reservationPopup').classList.remove('show');
            clearInterval(timerInterval);
        }

        function updatePaymentStatus(paymentStatus) {
            const leadID = localStorage.getItem('leadId');


            if (leadID) {
                return fetch('https://sisyaclass.xyz/student/update_reg_lead2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: +leadID,
                            status: paymentStatus
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log("Lead status updated successfully");
                            return true;
                        } else {
                            console.log("Failed to update lead status");
                            return false;
                        }
                    })
                    .catch(error => {
                        console.log('Error updating lead status:', error);
                        return false;
                    });
            } else {
                return Promise.resolve(false);
            }
        }

        function initiateRazorpayPayment(orderData) {
            let paymentId = null;

            const options = {
                "key": orderData.key_id,
                "amount": orderData.amount,
                "currency": orderData.currency,
                "name": "Sisya Class",
                "description": orderData.description,
                "order_id": orderData.order_id,
                "prefill": orderData.prefill,
                "handler": function(response) {
                    paymentId = response.razorpay_payment_id;

                    fetch('../Functions/verify-payment.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: orderData.order_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                return fetch('../Functions/fetch_payment_details.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        razorpay_payment_id: response.razorpay_payment_id
                                    })
                                });
                            } else {
                                throw new Error('Signature verification failed');
                            }
                        })
                        .then(res => res.json())
                        .then(paymentData => {
                            console.log('Full Payment Details:', paymentData);

                            return fetch('../Functions/send_whatsapp_message.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    phone: localStorage.getItem('mobileNumber'),
                                    template_name: '10xboostercourse',
                                    image_url: 'https://sisyaclass.xyz/student/mg_mat/49/send-whatsapp-image.jpg'
                                })
                            }).then(() => {
                                updatePaymentStatus("success").then(statusUpdated => {
                                    const form = document.createElement('form');
                                    form.method = 'POST';
                                    form.action = 'success.php';

                                    const input = document.createElement('input');
                                    input.type = 'hidden';
                                    input.name = 'transactionId';
                                    input.value = response.razorpay_payment_id;
                                    form.appendChild(input);

                                    const amount = document.createElement('input');
                                    amount.type = 'hidden';
                                    amount.name = 'amount';
                                    amount.value = paymentData.amount / 100;
                                    form.appendChild(amount);

                                    const email = document.createElement('input');
                                    email.type = 'hidden';
                                    email.name = 'email';
                                    email.value = paymentData.email || '';
                                    form.appendChild(email);

                                    document.body.appendChild(form);
                                    form.submit();
                                });
                            });
                        })
                        .catch(error => {
                            console.error('Payment error:', error);

                            const form = document.createElement('form');
                            form.method = 'POST';
                            form.action = 'failed.php';

                            const input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = 'transactionId';
                            input.value = 'ERROR_' + Date.now();
                            form.appendChild(input);

                            document.body.appendChild(form);
                            form.submit();
                        });
                },
                "modal": {
                    "ondismiss": function() {
                        updatePaymentStatus("fail").finally(() => {
                            const form = document.createElement('form');
                            form.method = 'POST';
                            form.action = 'failed.php';

                            const input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = 'transactionId';
                            input.value = 'DISMISSED_' + Date.now();
                            form.appendChild(input);

                            document.body.appendChild(form);
                            form.submit();
                        });
                    }
                }
            };

            const rzp = new Razorpay(options);
            rzp.open();
        }

        function initiatePayment() {
            const storedNumber = localStorage.getItem('mobileNumber');
            const storedClass = localStorage.getItem('selectedClass');

            const url = "https://sisyaclass.com/10xboostercourse.php";
            fetch("../Functions/trialPayment.php", {
                    method: "POST",
                    body: JSON.stringify({
                        phone: storedNumber,
                        amount: 19,
                        redirectURL: url
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        initiateRazorpayPayment(data.data);
                    } else {
                        document.getElementById("loader").style.display = "none";
                        console.error('Payment initialization failed. Please try again.');
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    // Hide loader if request fails
                    document.getElementById("loader").style.display = "none";
                    console.error('Network error. Please try again. payment issue');
                });
        }

        function newRegistrationLead() {
            const storedNumber = localStorage.getItem('mobileNumber');
            const storedClass = localStorage.getItem('selectedClass');
            // const storedChildName = localStorage.getItem('childName');
            // const childState = localStorage.getItem('childState');

            // Show loader
            document.getElementById("loader").style.display = "flex";

            if (storedNumber) {
                fetch('https://sisyaclass.xyz/student/new_reg_lead2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: "SISYA Rank Booster - 10X Smarter Learning by IITians",
                            phone: storedNumber,
                            cf_class: storedClass,
                            // courseName: storedChildName,
                            // state: childState,
                            // preffredLanguage: storedLang,
                            // alternatePhone: storedAltNumber,
                            status: "initiated",
                            source:"web",
                            medium:"web"
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            localStorage.setItem('leadId', data.lead.id);
                            initiatePayment();
                        } else {
                            // Hide loader if request fails
                            document.getElementById("loader").style.display = "none";
                            console.error('Something went wrong. Please try again.');
                        }
                    })
                    .catch(error => {
                        console.error('Error checking phone number:', error);
                        // Hide loader if request fails
                        document.getElementById("loader").style.display = "none";
                        console.error('Network error. Please try again.');
                    });
            } else {
                // Hide loader before showing bottom sheet
                document.getElementById("loader").style.display = "none";
                // showBottomSheet();
            }
        }

        function isValidMobileNumber(number) {
            const mobilePattern = /^[6-9]\d{9}$/;
            return mobilePattern.test(number);
        }

        document.getElementById('reserve-btn').addEventListener('click', function() {
            const mobileNumber = document.getElementById('phoneNumber').value;
            const childClass = document.getElementById('childClass').value;
            // const childName = document.getElementById('childName').value;
            // const childState = document.getElementById('childState').value;

            console.log(`child class ${childClass}`)
            localStorage.setItem('selectedClass', childClass);
            // localStorage.setItem('childName', childName);
            // localStorage.setItem('childState', childState);
            if (isValidMobileNumber(mobileNumber)) {
                localStorage.setItem('mobileNumber', mobileNumber);
            }


            newRegistrationLead();

            // if (phoneNumber && childClass) {
            //     initiatePayment(phoneNumber, childClass);
            // } else {
            //     alert('Please enter your phone number and select a class.');
            // }
        });

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Get Started Button Click
            document.getElementById('getStartedBtn').addEventListener('click', showReservationPopup);
            // document.getElementById('AIExperience').addEventListener('click', showReservationPopup);
            // Promo Get Started Button Click
            // document.getElementById('promoGetStartedBtn').addEventListener('click', showReservationPopup);

            // Close Button Click
            document.getElementById('closePopup').addEventListener('click', hideReservationPopup);

            // Class Buttons Click
            document.querySelectorAll('.class-btn:not(.sold-out)').forEach(button => {
                const selectedGrade = button.getAttribute('data-grade');
                button.addEventListener('click', function() {
                    //  const selectedGrade = button.getAttribute('data-grade');
                    console.log("selected grade is ", selectedGrade);
                    showReservationPopup(selectedGrade);
                });
                //  button.addEventListener('click', showReservationPopup);
            });

            // Outside Click to Close
            document.getElementById('reservationPopup').addEventListener('click', function(e) {
                if (e.target === this) {
                    hideReservationPopup();
                }
            });

            // Ensure Class 1 is selected by default
            document.getElementById('childClass').value = "1";
        });


        const videoSlides = document.querySelectorAll(".video-slide");
        let currentSlide = 0;

        function showSlide(index) {
            videoSlides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        // document.getElementById("prevSlide").addEventListener("click", () => {
        //     currentSlide = (currentSlide - 1 + videoSlides.length) % videoSlides.length;
        //     showSlide(currentSlide);
        // });

        // document.getElementById("nextSlide").addEventListener("click", () => {
        //     currentSlide = (currentSlide + 1) % videoSlides.length;
        //     showSlide(currentSlide);
        // });

        showSlide(currentSlide);

        const toggleBtn = document.getElementById("toggleMenu");
        const pillContainer = document.getElementById("pillContainer");
        const menu = document.getElementById("fabMenu");
        const fabLinks = document.querySelectorAll("#fabMenu a, .fab-pill > a");

        let expanded = false;
        let hoverTimeout;

        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (!isTouchDevice) {
            pillContainer.addEventListener("mouseenter", () => {
                clearTimeout(hoverTimeout);
                pillContainer.classList.add("expanded");
                menu.classList.add("show");
                expanded = true;
            });

            pillContainer.addEventListener("mouseleave", () => {
                hoverTimeout = setTimeout(() => {
                    pillContainer.classList.remove("expanded");
                    menu.classList.remove("show");
                    expanded = false;
                }, 150);
            });
        }

        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            expanded = !expanded;
            pillContainer.classList.toggle("expanded", expanded);
            menu.classList.toggle("show", expanded);
        });

        document.addEventListener("click", (e) => {
            if (!pillContainer.contains(e.target)) {
                pillContainer.classList.remove("expanded");
                menu.classList.remove("show");
                expanded = false;
            }
        });

        fabLinks.forEach((link) => {
            link.addEventListener("click", () => {
                pillContainer.classList.remove("expanded");
                menu.classList.remove("show");
                expanded = false;
            });
        });
    </script>
    <script>
        // Nav animation
        gsap.from(".logo", {
            y: -50,
            duration: 0.3,
            opacity: 0
        });
        gsap.from(".nav-actions ul li", {
            y: -50,
            duration: 0.3,
            opacity: 0,
            stagger: 0.1,
        });

        gsap.from(".mobile-menu", {
            y: -50,
            duration: 0.3,
            opacity: 0,
        });

        const tlSidebar = gsap.timeline({
            paused: true
        });
        tlSidebar.to(".sidebar", {
            right: 0,
            duration: 0.5,
            ease: "power2.out"
        });
        tlSidebar.from(
            ".sidebar ul li", {
                x: 150,
                duration: 0.4,
                stagger: 0.1,
                opacity: 0,
            },
            "-=0.3"
        );

        const hamburgerIcon = document.querySelector(".hamburger-icon");
        const sidebar = document.querySelector(".sidebar");
        let sidebarOpen = false;

        // opening of sidebar
        hamburgerIcon?.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebarOpen ? tlSidebar.reverse() : tlSidebar.play();
            sidebarOpen = !sidebarOpen;
        });

        // closing of sidebar
        document.addEventListener("click", (e) => {
            if (
                sidebarOpen &&
                !sidebar.contains(e.target) &&
                !hamburgerIcon.contains(e.target)
            ) {
                tlSidebar.reverse();
                sidebarOpen = false;
            }
        });
    </script>
    <script>
        let userHasInteracted = false;

        function handleUserInteraction() {
            if (userHasInteracted) return;
            userHasInteracted = true;

            window.removeEventListener("click", handleUserInteraction);
            window.removeEventListener("keydown", handleUserInteraction);
            window.removeEventListener("touchstart", handleUserInteraction);
        }

        window.addEventListener("click", handleUserInteraction);
        window.addEventListener("keydown", handleUserInteraction);
        window.addEventListener("touchstart", handleUserInteraction);

        document.querySelectorAll(".reel-frame").forEach((frame) => {
            const videoId = frame.getAttribute("data-video-id");

            frame.addEventListener("mouseenter", () => {
                if (frame.querySelector("iframe")) return;

                const iframe = document.createElement("iframe");

                const baseUrl = `https://www.youtube.com/embed/${videoId}`;
                const commonParams = `?playsinline=1&modestbranding=1&rel=0&controls=0&showinfo=0&enablejsapi=1`;

                if (userHasInteracted) {
                    iframe.src = `${baseUrl}${commonParams}&autoplay=1&mute=0`;
                } else {
                    iframe.src = `${baseUrl}${commonParams}`;
                }

                iframe.setAttribute("allowfullscreen", "");
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allow", "autoplay; fullscreen");
                iframe.className = "video-iframe";
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.style.border = "none";

                const thumbnail = frame.querySelector(".video-thumbnail");
                if (thumbnail) thumbnail.remove();

                frame.appendChild(iframe);
            });

            frame.addEventListener("mouseleave", () => {
                const iframe = frame.querySelector("iframe");
                if (iframe) iframe.remove();

                const thumbnail = document.createElement("div");
                thumbnail.className = "video-thumbnail";
                thumbnail.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/sddefault.jpg')`;

                const title = document.createElement("div");
                title.className = "video-title";
                title.textContent = frame.getAttribute("data-title");
                thumbnail.appendChild(title);

                frame.appendChild(thumbnail);
            });
        });

        let currentTestimonialIndex = 0;
        const testimonialSlides = document.querySelectorAll(
            ".testimonial-slider-wrapper .reel-frame"
        );
        const totalTestimonialSlides = testimonialSlides.length;

        // Testimonial Slider Functions
        function nextTestimonial() {
            currentTestimonialIndex =
                (currentTestimonialIndex + 1) % totalTestimonialSlides;
            updateTestimonialSlider();
        }

        function prevTestimonial() {
            currentTestimonialIndex =
                (currentTestimonialIndex - 1 + totalTestimonialSlides) %
                totalTestimonialSlides;
            updateTestimonialSlider();
        }

        function updateTestimonialSlider() {
            const slider = document.getElementById("testimonialSlider");
            const translateX = -currentTestimonialIndex * 100;
            slider.style.transform = `translateX(${translateX}%)`;
        }

        // Auto-slide for testimonials (optional)
        let testimonialAutoSlide = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds

        // Pause auto-slide on hover
        document
            .querySelector(".testimonial-slider-container")
            .addEventListener("mouseenter", () => {
                clearInterval(testimonialAutoSlide);
            });

        document
            .querySelector(".testimonial-slider-container")
            .addEventListener("mouseleave", () => {
                testimonialAutoSlide = setInterval(nextTestimonial, 5000);
            });
    </script>
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMD8KHN9"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
</body>

</html>