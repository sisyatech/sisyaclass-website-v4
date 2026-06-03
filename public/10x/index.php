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

                <div class="form-group">
                    <label for="phoneNumber">Enter your phone number</label>
                    <div class="phone-input-container">
                        <div class="country-code">+91</div>
                        <input type="tel" id="phoneNumber" class="phone-input" placeholder="Enter your phone number">
                    </div>
                </div>

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

                <button type="button" class="reserve-btn" id="reserve-btn">Try One Class @₹19 Only</button>
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
                <h2 class="hero-subheading">IIT/NIT Educators. AI Support</h2>
                <h1 class="hero-main-heading hero-main-heading2">Just @ ₹19 to Begin</h1>
                <h2 class="hero-courses-list hero-courses-list2">Maths | Science | English | Coding | Robotics</h2>
                <h2 class="hero-courses-list-class hero-courses-list-class2">Class 1-10 Online Classes</h2>
                <ul class="hero-feature-list">
                    <li>✅ Get On 1-On-1 Instant Demo</li>
                    <li>✅ Time – Choose Between 11 AM To 6 PM</li>
                    <li>✅ CBSE, ICSE, State Boards Covered</li>
                </ul>
                <div class="hero-cta-buttons">
                    <button class="btn-get-started btn-get-started2" id="getStartedBtn">Register For Demo @₹19</button>
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


    <!-- <section class="stats-section2 stat-sec-3 stat-sec-4">
        <div class="stats-container2">
            <div class="stat-item2">
                <img src="../mainAsset/hero/1_p.svg" alt="IIT/NIT Experts" />
                <h3>1-On-1 Sessions</h3>
                <p>24/7 Personalized Support</p>
            </div>
            <div class="stat-item2">
                <img src="../mainAsset/hero/2_p.svg" alt="Students Excelled" />
                <h3>Guaranteed Results</h3>
                <p>2,000+ Students Scored 95%+</p>
            </div>
            <div class="stat-item2">
                <img src="../mainAsset/hero/3_p.svg" alt="Teaching Mastery" />
                <h3>1 Hr Live Class</h3>
                <p>For Just Rs 29</p>
            </div>
        </div>
    </section> -->

    <section class="ct-section">
        <div class="ct-wrapper">
            <!-- Title -->
            <h2 class="ct-title">Class Timings</h2>

            <!-- Card Container -->
            <div class="ct-card-container">
                <!-- Card 1 -->
                <div class="ct-card">
                    <img src="./assets/010.svg" alt="All Subjects" class="ct-icon" />
                    <h3 class="ct-card-title">All Subjects</h3>
                    <p class="ct-grade">Grade 6-10</p>
                    <p class="ct-days">Monday to Saturday</p>
                    <p class="ct-time">7:00 PM – 8:00 PM</p>
                </div>

                <!-- Card 2 -->
                <div class="ct-card">
                    <img src="./assets/011.svg" alt="Maths" class="ct-icon" />
                    <h3 class="ct-card-title">Maths</h3>
                    <p class="ct-grade">Grade 3-5</p>
                    <p class="ct-days">Monday to Saturday</p>
                    <p class="ct-time">6:00 PM – 7:00 PM</p>
                </div>

                <!-- Card 3 -->
                <div class="ct-card">
                    <img src="./assets/011.svg" alt="Maths" class="ct-icon" />
                    <h3 class="ct-card-title">Maths</h3>
                    <p class="ct-grade">Grade 6-7</p>
                    <p class="ct-days">Monday to Saturday</p>
                    <p class="ct-time">7:00 PM – 8:00 PM</p>
                </div>

                <!-- Card 4 -->
                <div class="ct-card">
                    <img src="./assets/011.svg" alt="Maths" class="ct-icon" />
                    <h3 class="ct-card-title">Maths</h3>
                    <p class="ct-grade">Grade 8-10</p>
                    <p class="ct-days">Monday to Saturday</p>
                    <p class="ct-time">8:00 PM – 9:00 PM</p>
                </div>

                <!-- Card 5 -->
                <div class="ct-card">
                    <img src="./assets/001.svg" alt="JEE" class="ct-icon" />
                    <h3 class="ct-card-title">JEE</h3>
                    <p class="ct-grade">Grade 8-10</p>
                    <p class="ct-days">Monday to Saturday</p>
                    <p class="ct-time">8:00 PM – 9:00 PM</p>
                </div>
            </div>
        </div>
    </section>

    <!-- testimonial section -->
    <section class="testimonial-section" id="testimonial-section">
        <!-- <h2>Trusted by Parents, Loved by Students</h2>
        <p class="subheading">Success Stories from Parents & Students</p> -->

        <!-- <div class="video-wrapper">
            <div class="video-container1 active">
                <div class="video-inner">
                    <iframe
                        src="https://www.youtube.com/embed/oqxw-V4ChKM?autoplay=1&mute=1&loop=1&playlist=oqxw-V4ChKM&start=21"
                        title="Video 1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
            <div class="video-container1">
                <div class="video-inner">
                    <iframe
                        src="https://www.youtube.com/embed/N4sUKE1YZuI?autoplay=1&mute=1&loop=1&playlist=N4sUKE1YZuI&t=start21"
                        title="Video 2" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="video-controls">
            <button id="prevVideo" aria-label="Previous Video">
                <img src="../mainAsset/testimonial/aaaroww.svg" alt="Previous" width="36" height="36" />
            </button>
            <button id="nextVideo" aria-label="Next Video">
                <img src="../mainAsset/testimonial/aaaroww.svg" alt="Previous" width="36" height="36" />
            </button>
        </div> -->



        <div class="testimonial-wrapper">
            <div class="testimonial-cards" id="testimonialCards">
                <!-- Card 1 -->
                <div class="testimonial-card">
                    <div class="quote-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-quote">
                            <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 
                               6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                            <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 
                               6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                        </svg>
                    </div>

                    <div class="quote-wrapper">
                        <p class="quote">
                            My daughter is much more confident now! She understands things better and gets better
                            marks
                            in school.
                        </p>
                    </div>

                    <div class="person">
                        <img src="../mainAsset/testimonial/t1.jpeg" alt="Priya Sharma" />
                        <div class="info">
                            <div class="meta">
                                <span class="name">Priya Sharma</span>
                                <span class="tag">Parent</span>

                            </div>
                            <span class="stars">⭐⭐⭐⭐⭐</span>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="testimonial-card">
                    <div class="quote-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-quote">
                            <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 
                                               6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                            <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 
                                               6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                        </svg>
                    </div>

                    <div class="quote-wrapper">
                        <p class="quote">
                            The AI learning and games keep my child interested. Learning is actually fun now!
                        </p>
                    </div>

                    <div class="person">
                        <img src="../mainAsset/testimonial/t2.jpeg" alt="harsha" />
                        <div class="info">
                            <div class="meta">
                                <span class="name">Harsha</span>
                                <span class="tag">Parent</span>

                            </div>
                            <span class="stars">⭐⭐⭐⭐⭐</span>
                        </div>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="testimonial-card">
                    <div class="quote-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-quote">
                            <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 
                                               6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                            <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 
                                               6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                        </svg>
                    </div>

                    <div class="quote-wrapper">
                        <p class="quote">
                            SISYA Class made learning easy! The teachers explain everything well, and now I
                            understand my school classes better.
                        </p>
                    </div>

                    <div class="person">
                        <img src="../mainAsset/testimonial/t3.jpeg" alt="Varshini" />
                        <div class="info">

                            <div class="meta">
                                <span class="name">Varshini</span>
                                <span class="tag">Class 9 Student</span>
                            </div>
                            <span class="stars">⭐⭐⭐⭐⭐</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- smart section -->
    <!-- <section class="smart-section">
        <div class="smart-container">
            <div class="smart-text">
                <h2>
                    <strong>
                        <span class="seven-day">Become 10X Smarter <img src="../mainAsset/hero/brain.svg" alt="Brain Icon" class="icon-inline" /></span>
                    </strong>
                </h2>

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
    </section> -->

    <!-- parent support section -->
    <section class="parent-support-section">
        <div class="parent-support-container">
            <div class="parent-support-left">
                <h2>Does This Sound Familiar?</h2>
                <ul class="concerns-list">
                    <li>
                        <img src="../mainAsset/parent support/wrong-decision 1.svg" alt="Concern Icon">
                        My child forgets what they learn in school...
                    </li>
                    <li>
                        <img src="../mainAsset/parent support/wrong-decision 1.svg" alt="Concern Icon">
                        I can't always help with doubts - I'm busy or unsure...
                    </li>
                    <li>
                        <img src="../mainAsset/parent support/wrong-decision 1.svg" alt="Concern Icon">
                        Tuition classes are either too far or too expensive.
                    </li>
                </ul>
            </div>

            <div class="parent-support-right">
                <img src="../mainAsset/parent support/Object.svg" alt="Parent Helping Child" class="support-image">
                <div class="solution-box">
                    <h3>Our Solution:</h3>
                    <p>
                        <img src="../mainAsset/parent support/verified 1.svg" alt="Check Icon">
                        A complete online learning system built to support your child - and you.
                    </p>
                </div>
            </div>
        </div>

        <div class="bottom-banner">
            <span>🔥 SISYA CLASS - Built with working parents in mind.</span>
        </div>
    </section>

    <!-- sisya compare section -->
    <section class="sisya-compare-section" id="sisya-compare-section">
        <h2>Why Settle for Less? Choose SISYA<br>Where Smart Learning Begins @ Just ₹19!</h2>

        <div class="comparison-table">
            <div class="table-header">
                <div>Features</div>
                <div>SISYA CLASS</div>
                <div>Others</div>
            </div>

            <!-- <div class="table-row">
                <div>Covers 5 Subjects in 1 Week</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div> -->
            <div class="table-row">
                <div>Includes Coding & Robotics</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div>
            <div class="table-row">
                <div>Live Sessions with IIT/NIT Mentors</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div>
            <div class="table-row">
                <div>AI Chatbot for Instant Doubt Help</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div>
            <div class="table-row">
                <div>Real-Time Feedback & Performance Tracking</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div>
            <div class="table-row">
                <div>Personalized Mentorship (Quadcore Model)</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div>
            <div class="table-row">
                <div>Practice Worksheets + Regular Homework</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div>
            <div class="table-row">
                <div>Certificate + Discounts on Future Courses</div>
                <div><img src="../mainAsset/logo/tick.svg" alt="Yes"></div>
                <div><img src="../mainAsset/logo/cross.svg" alt="No"></div>
            </div>
        </div>

        <div class="demo-btn-wrap">
            <a href="#team"> <button class="demo-btn">Checkout Our Demo Lecture</button></a>
            <img class="demo-click-img" src="../mainAsset/child_offer/click.gif" alt="Click Icon">
        </div>
    </section>

    <section class="sisya-transform-section">
        <h2>Here's How To Transform Your Child's Learning</h2>

        <!-- Desktop Image View -->
        <div class="transform-desktop desktop-view">
            <img src="../mainAsset/flowchart/flow.svg" alt="Transform flow desktop">
        </div>

        <!-- Mobile Image View -->
        <div class="transform-mobile mobile-view">
            <img src="../mainAsset/flowchart/flow-mobile.svg" alt="Transform flow mobile">
        </div>
    </section>

    <section class="educator-section" id="educator-section">
        <h2>Learn with IIT/NIT Educators</h2>
        <p>Give your child the advantage of learning from the best</p>

        <div class="educator-image-wrapper">
            <img src="./assets/updated-teacher.svg" alt="IIT/NIT Educators" />
        </div>
    </section>

    <!-- ai section -->
    <section class="ai-section">
        <h1 id="typewriter"></h1>

        <div class="images-row">
            <img src="../mainAsset/ai/102 5.svg" alt="AI Screen 1" />
            <img src="../mainAsset/ai/102 6 (1).svg" alt="AI Screen 2" />
            <img src="../mainAsset/ai/102 7.svg" alt="AI Screen 3" />
            <img src="../mainAsset/ai/102 8.svg" alt="AI Screen 4" />
        </div>

        <p class="subtext">
            Our AI helps Grades 1–10 solve academic questions via text, image, or speech, offering accurate,
            personalized
            answers based on their grade and curriculum
        </p>
    </section>

    <section class="sisya-team-section" id="team">
        <div class="ai-btn">
            <button id="AIExperience">
                Have Your Child Experience SISYA AI
            </button>
            <img src="../mainAsset/child_offer/click.gif" alt="Click Icon" />
        </div>

        <h2>Our Team</h2>

        <div class="team-img-container">
            <img src="../mainAsset/faculty/team_sisy.svg" alt="SISYA Team Group Photo" />
        </div>
    </section>

    <section class="video-slider-section" id="video-slider-section">
        <h2>Watch How Our Educators Turn Learning Into Fun!</h2>

        <div class="video-slider-wrapper">
            <div class="video-slide active">
                <div class="video-slide-inner">
                    <iframe
                        src="https://www.youtube.com/embed/IQsyJyJ2Pek?autoplay=1&mute=1&loop=1&playlist=IQsyJyJ2Pek"
                        title="Educator Video 1"
                        allow="autoplay; encrypted-media"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            <!-- <div class="video-slide">
                <div class="video-slide-inner">
                    <iframe
                        src="https://www.youtube.com/embed/N4sUKE1YZuI?autoplay=1&mute=1&loop=1&playlist=N4sUKE1YZuI"
                        title="Educator Video 2"
                        allow="autoplay; encrypted-media"
                        allowfullscreen></iframe>
                </div>
            </div> -->
        </div>

        <!-- <div class="video-slider-controls">
            <button id="prevSlide" aria-label="Previous Video">
                <img src="../mainAsset/testimonial/aaaroww.svg" alt="Previous" width="36" height="36" />
            </button>
            <button id="nextSlide" aria-label="Next Video">
                <img src="../mainAsset/testimonial/aaaroww.svg" alt="Next" width="36" height="36" />
            </button>
        </div> -->
    </section>

    <!-- <section class="child-offer-section">
        <h2 class="child-offer-title">What Your Child Gets for ₹29</h2>
        <div class="child-offer-subtitle">7 Days of</div>

        <div class="child-offer-features">
            <div class="child-offer-box">
                <img src="../mainAsset/child_offer/1.gif" alt="Live Classes Icon" />
                <p>Live classes in core subjects</p>
            </div>
            <div class="child-offer-box">
                <img src="../mainAsset/child_offer/2.gif" alt="App Access Icon" />
                <p>Access to app and dashboard</p>
            </div>
            <div class="child-offer-box">
                <img src="../mainAsset/child_offer/3.gif" alt="Doubt Solving Icon" />
                <p>Doubt-solving via AI and real tutors</p>
            </div>
            <div class="child-offer-box">
                <img src="../mainAsset/child_offer/4.gif" alt="Performance Report Icon" />
                <p>Performance report<br>+ Learning path</p>
            </div>
        </div>
    </section> -->

    <section class="promo-section">
        <div class="promo-wrapper">
            <img src="../mainAsset/child_offer/cute-indian-boy-with-mother-doing-homework-home-using-laptop-books-online-schooling-concept 1.svg" alt="Mother and Child Studying" class="promo-image" />
            <div class="cta-btn-promo" id="promoGetStartedBtn">Try Now for ₹19 - Limited Time</div>
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
                            src="./mainAsset/footer/download_play.svg" alt="" style="width:120px;"></a>

                    <a href="https://apps.apple.com/in/app/sisya-class-e-learning-app/id6739211295"><img
                            src="./mainAsset/footer/download_apple.svg" alt="" style="width:120px;"> </a>
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

    <script>
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
    </script>

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
            startTimer();
        }

        // Hide Reservation Popup
        function hideReservationPopup() {
            document.getElementById('reservationPopup').classList.remove('show');
            clearInterval(timerInterval);
        }

        function updatePaymentStatus(paymentStatus) {
            const leadID = localStorage.getItem('leadId');

            if (leadID) {
                return fetch('https://sisyaclass.xyz/student/update_reg_lead', {
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
                            //console.log("Lead status updated successfully");
                            return true;
                        } else {
                            //console.log("Failed to update lead status");
                            return false;
                        }
                    })
                    .catch(error => {
                        //console.log('Error updating lead status:', error);
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
                            //console.log('Full Payment Details:', paymentData);

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
                            //console.error('Payment error:', error);

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
                        //console.error('Payment initialization failed. Please try again.');
                    }
                })
                .catch(error => {
                    //console.error("Error:", error);
                    // Hide loader if request fails
                    document.getElementById("loader").style.display = "none";
                    //console.error('Network error. Please try again. payment issue');
                });
        }

        function newRegistrationLead() {
            const storedNumber = localStorage.getItem('mobileNumber');
            const storedClass = localStorage.getItem('selectedClass');

           

            // Show loader
            document.getElementById("loader").style.display = "flex";

            if (storedNumber) {
                fetch('https://sisyaclass.xyz/student/new_reg_lead', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: "SISYA Rank Booster - 10X Smarter Learning by IITians",
                            phone: storedNumber,
                            class: storedClass,
                            // preffredLanguage: storedLang,
                            // alternatePhone: storedAltNumber,
                            status: "initiated"
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
                            //console.error('Something went wrong. Please try again.');
                        }
                    })
                    .catch(error => {
                        //console.error('Error checking phone number:', error);
                        // Hide loader if request fails
                        document.getElementById("loader").style.display = "none";
                        //console.error('Network error. Please try again.');
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

            //console.log(`child class ${childClass}`)
            localStorage.setItem('selectedClass', childClass);
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
            document.getElementById('AIExperience').addEventListener('click', showReservationPopup);
            // Promo Get Started Button Click
            document.getElementById('promoGetStartedBtn').addEventListener('click', showReservationPopup);

            // Close Button Click
            document.getElementById('closePopup').addEventListener('click', hideReservationPopup);

            // Class Buttons Click
            document.querySelectorAll('.class-btn:not(.sold-out)').forEach(button => {
                const selectedGrade = button.getAttribute('data-grade');
                button.addEventListener('click', function() {
                    //  const selectedGrade = button.getAttribute('data-grade');
                    //console.log("selected grade is ", selectedGrade);
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

        const animatedText = "Only Edtech with AI Integrated";
        const typewriterElement = document.getElementById("typewriter");

        let currentIndex = 0;
        let typingDirection = 1;

        function runTypewriterEffect() {
            if (typingDirection === 1 && currentIndex <= animatedText.length) {
                typewriterElement.textContent = animatedText.slice(0, currentIndex++);
            } else if (typingDirection === -1 && currentIndex >= 0) {
                typewriterElement.textContent = animatedText.slice(0, currentIndex--);
            }

            if (currentIndex === animatedText.length) {
                typingDirection = -1;
                setTimeout(runTypewriterEffect, 2000);
                return;
            }

            if (currentIndex < 0) {
                typingDirection = 1;
                setTimeout(runTypewriterEffect, 500);
                return;
            }

            setTimeout(runTypewriterEffect, 100);
        }

        runTypewriterEffect();

        const aiImageRowContainer = document.querySelector(".ai-section .images-row");

        if (window.innerWidth <= 768 && aiImageRowContainer) {
            const aiImageElements = aiImageRowContainer.querySelectorAll("img");
            let currentAiImageIndex = 0;
            const totalAiImages = aiImageElements.length;
            const aiScrollDelay = 3000; // 3 seconds
            const aiImageWidth = window.innerWidth;

            setInterval(() => {
                currentAiImageIndex = (currentAiImageIndex + 1) % totalAiImages;
                aiImageRowContainer.scrollTo({
                    left: currentAiImageIndex * aiImageWidth,
                    behavior: "smooth",
                });
            }, aiScrollDelay);
        }

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
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMD8KHN9"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
</body>

</html>