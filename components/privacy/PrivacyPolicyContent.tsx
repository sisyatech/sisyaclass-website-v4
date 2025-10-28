import React from "react";

const PrivacyPolicyContent = () => {
  return (
    <div className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="mx-auto max-w-[1238px] px-4 sm:px-6">
        {/* Title */}
        <h1 className="font-montserrat font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] leading-[26px] sm:leading-[30px] md:leading-[34px] lg:leading-[38px] tracking-[0px] text-[#292929] mb-3 sm:mb-4 md:mb-5">
          SISYA CLASS Privacy Policy
        </h1>

        {/* Effective Date and Introduction */}
        <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-4 sm:mb-5 md:mb-6">
          <strong>Effective Date:</strong> 1/12/2024 SISYA CLASS: Live E-Learning ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our app. Please read this policy carefully.
        </p>

        {/* Information We Collect */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Information We Collect
          </h2>
          <ul className="list-none space-y-1 sm:space-y-2 pl-0">
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              <strong>Personal Information:</strong> Name, email address, contact number, profile picture, class (grade), and educational board.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              <strong>Device Information:</strong> Device ID and related technical details.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              <strong>Payment Information:</strong> Payment details (e.g., debit card, UPI ID, or other modes of payment) are collected only at the time of course purchase and handled directly by our payment partner.
            </li>
          </ul>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mt-2">
            We do not store your payment information.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              To create and manage user accounts.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              To deliver live e-learning services and personalize the app experience.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              To process course purchases securely via apple pay or google pay.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              To analyze app performance and user behavior through tools like Firebase Analytics.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              To improve our app and provide better services.
            </li>
          </ul>
        </section>

        {/* Data Sharing with Third Parties */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Data Sharing with Third Parties
          </h2>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2">
            We may share your data with trusted third parties to facilitate app functionality:
          </p>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2">
            <strong>Firebase Analytics:</strong> For app performance and usage analysis.
          </p>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
            These third parties are obligated to comply with privacy and security standards.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Children's Privacy
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              Our app is suitable for children aged 6 and above.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              We comply with privacy regulations such as COPPA (Children's Online Privacy Protection Act) and GDPR-K (General Data Protection Regulation for Kids).
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              Parents or guardians can contact us to access or delete their child's information.
            </li>
          </ul>
        </section>

        {/* Delete User Option */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Delete User Option
          </h2>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2">
            We provide users with the option to delete their account permanently from our app. Once the account is deleted:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-2">
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              You will no longer be able to access your account or any associated data.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              All your courses, study records, and related data will be permanently removed.
            </li>
          </ul>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
            If you wish to delete your account, you can do so directly from the app or contact us via email at sisyaclass@gmail.com.
          </p>
        </section>

        {/* Security Measures */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Security Measures
          </h2>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2">
            We take data security seriously and implement the following measures:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              Encryption of sensitive data.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              Secure data storage practices.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              Regular audits to ensure the security of our systems.
            </li>
          </ul>
        </section>

        {/* Policy Updates */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Policy Updates
          </h2>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
            We may update this Privacy Policy from time to time. Users will be notified of changes via email. We encourage users to review this page periodically for any updates.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            User Rights
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              <strong>Access and Update:</strong> Users can access or update their personal information within the app.
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              <strong>Data Deletion:</strong> Users may request data deletion by contacting us.
            </li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Contact Us
          </h2>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2">
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-2">
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              <strong>Email:</strong> sisyaclass@gmail.com
            </li>
            <li className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
              <strong>Website Contact Form:</strong> https://sisyaclass.com/contact-us.php
            </li>
          </ul>
        </section>

        {/* Additional Information */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[15px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2 sm:mb-3">
            Additional Information
          </h2>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000] mb-2">
            For any concerns regarding the privacy practices of our third-party service providers, please refer to their respective privacy policies:
          </p>
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
            <strong>Firebase Analytics:</strong> Firebase Privacy Policy
          </p>
        </section>

        {/* Final Note */}
        <section className="mb-5">
          <p className="font-roboto font-medium text-[13px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[0.03em] text-[#000000]">
            All other terms and conditions as applicable under the Terms and Conditions of Use sisyaclass.com will be applicable to You and will be read along with this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;

