import React from "react";

const RefundPolicyContent = () => {
  return (
    <div className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="mx-auto max-w-[1238px] px-4 sm:px-6">
        {/* Title */}
        <h1 className="font-montserrat font-bold text-[14px] leading-[19px] tracking-[0.03em] text-[#1A2439] mb-3 sm:mb-4 md:mb-5">
          Refund and Cancellation Policy
        </h1>

        {/* Effective Date and Introduction */}
        <p className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-4 sm:mb-5 md:mb-6">
          <strong>Effective Date:</strong> 01/12/2024 At SISYA CLASS: Live E-Learning, we prioritize transparency in our policies. This Refund and Cancellation Policy governs your purchases on our platform. By purchasing any course, you agree to the terms outlined below.
        </p>

        {/* No Refund Policy */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3">
            No Refund Policy
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
              All purchases made on SISYA CLASS: Live E-Learning are final and non-refundable. As our services involve digital educational content, refunds are not applicable once the course is purchased.
            </li>
            <li className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
              Users are encouraged to thoroughly review course details before making a purchase to ensure it meets their requirements.
            </li>
          </ul>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3">
            Cancellation Policy
          </h2>
          <p className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
            Once a course is purchased, cancellations are not permitted. Access to the course materials will remain available as per the terms of use.
          </p>
        </section>

        {/* Service Delivery */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3">
            Service Delivery
          </h2>
          <p className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
            All purchased courses are delivered digitally via the SISYA CLASS app. Users can access the courses immediately upon successful payment.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3">
            Disclaimer
          </h2>
          <p className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-2">
            By purchasing a course on SISYA CLASS, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
              The course content is provided 'as-is' and is non-transferable.
            </li>
            <li className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
              Refunds or cancellations are not applicable due to dissatisfaction with the course or personal reasons.
            </li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="mb-5">
          <h2 className="font-roboto font-bold text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3">
            Contact Us
          </h2>
          <p className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38] mb-2">
            If you have questions or require assistance, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-2">
            <li className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
              <strong>Email:</strong> sisyaclass@gmail.com
            </li>
            <li className="font-roboto font-medium text-[12px] leading-[14px] tracking-[0.03em] text-[#161A38]">
              <strong>Website Contact Form:</strong> https://sisyaclass.com/contact
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicyContent;
