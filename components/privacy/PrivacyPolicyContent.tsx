"use client";

import React from "react";

const PrivacyPolicyContent = () => {
  return (
    <div className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-[1238px] px-4 sm:px-6">
        {/* Title */}
        <h1 className="font-montserrat font-bold text-[36px] leading-[46px] tracking-[0px] text-[#292929] mb-6">
          SISYA CLASS Privacy Policy
        </h1>

        {/* Effective Date and Introduction */}
        <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-8">
          <strong>Effective Date:</strong> 1/12/2024 SISYA CLASS: Live E-Learning ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our app. Please read this policy carefully.
        </p>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Information We Collect
          </h2>
          <ul className="list-none space-y-3 pl-0">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              <strong>Personal Information:</strong> Name, email address, contact number, profile picture, class (grade), and educational board.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              <strong>Device Information:</strong> Device ID and related technical details.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              <strong>Payment Information:</strong> Payment details (e.g., debit card, UPI ID, or other modes of payment) are collected only at the time of course purchase and handled directly by our payment partner.
            </li>
          </ul>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mt-3">
            We do not store your payment information.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              To create and manage user accounts.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              To deliver live e-learning services and personalize the app experience.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              To process course purchases securely via apple pay or google pay.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              To analyze app performance and user behavior through tools like Firebase Analytics.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              To improve our app and provide better services.
            </li>
          </ul>
        </section>

        {/* Data Sharing with Third Parties */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Data Sharing with Third Parties
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            We may share your data with trusted third parties to facilitate app functionality:
          </p>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            <strong>Firebase Analytics:</strong> For app performance and usage analysis.
          </p>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
            These third parties are obligated to comply with privacy and security standards.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Children's Privacy
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              Our app is suitable for children aged 6 and above.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              We comply with privacy regulations such as COPPA (Children's Online Privacy Protection Act) and GDPR-K (General Data Protection Regulation for Kids).
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              Parents or guardians can contact us to access or delete their child's information.
            </li>
          </ul>
        </section>

        {/* Delete User Option */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Delete User Option
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            We provide users with the option to delete their account permanently from our app. Once the account is deleted:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-3">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              You will no longer be able to access your account or any associated data.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              All your courses, study records, and related data will be permanently removed.
            </li>
          </ul>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
            If you wish to delete your account, you can do so directly from the app or contact us via email at sisyaclass@gmail.com.
          </p>
        </section>

        {/* Security Measures */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Security Measures
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            We take data security seriously and implement the following measures:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              Encryption of sensitive data.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              Secure data storage practices.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              Regular audits to ensure the security of our systems.
            </li>
          </ul>
        </section>

        {/* Policy Updates */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Policy Updates
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
            We may update this Privacy Policy from time to time. Users will be notified of changes via email. We encourage users to review this page periodically for any updates.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            User Rights
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              <strong>Access and Update:</strong> Users can access or update their personal information within the app.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              <strong>Data Deletion:</strong> Users may request data deletion by contacting us.
            </li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Contact Us
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-2">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              <strong>Email:</strong> sisyaclass@gmail.com
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              <strong>Website Contact Form:</strong> https://sisyaclass.com/contact-us.php
            </li>
          </ul>
        </section>

        {/* Additional Information */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Additional Information
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            For any concerns regarding the privacy practices of our third-party service providers, please refer to their respective privacy policies:
          </p>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
            <strong>Firebase Analytics:</strong> Firebase Privacy Policy
          </p>
        </section>

        {/* Final Note */}
        <section className="mb-8">
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
            All other terms and conditions as applicable under the Terms and Conditions of Use sisyaclass.com will be applicable to You and will be read along with this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;

