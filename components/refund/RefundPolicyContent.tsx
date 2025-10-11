"use client";

import React from "react";

const RefundPolicyContent = () => {
  return (
    <div className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-[1238px] px-4 sm:px-6">
        {/* Title */}
        <h1 className="font-montserrat font-bold text-[36px] leading-[46px] tracking-[0px] text-[#292929] mb-6">
          Refund and Cancellation Policy
        </h1>

        {/* Effective Date and Introduction */}
        <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-8">
          <strong>Effective Date:</strong> 01/12/2024 At SISYA CLASS: Live E-Learning, we prioritize transparency in our policies. This Refund and Cancellation Policy governs your purchases on our platform. By purchasing any course, you agree to the terms outlined below.
        </p>

        {/* No Refund Policy */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            No Refund Policy
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              All purchases made on SISYA CLASS: Live E-Learning are final and non-refundable. As our services involve digital educational content, refunds are not applicable once the course is purchased.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              Users are encouraged to thoroughly review course details before making a purchase to ensure it meets their requirements.
            </li>
          </ul>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Cancellation Policy
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
            Once a course is purchased, cancellations are not permitted. Access to the course materials will remain available as per the terms of use.
          </p>
        </section>

        {/* Service Delivery */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Service Delivery
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
            All purchased courses are delivered digitally via the SISYA CLASS app. Users can access the courses immediately upon successful payment.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Disclaimer
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            By purchasing a course on SISYA CLASS, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              The course content is provided 'as-is' and is non-transferable.
            </li>
            <li className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000]">
              Refunds or cancellations are not applicable due to dissatisfaction with the course or personal reasons.
            </li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="font-roboto font-bold text-[20px] leading-[31px] tracking-[0.03em] text-[#000000] mb-4">
            Contact Us
          </h2>
          <p className="font-roboto font-medium text-[18px] leading-[31px] tracking-[0.03em] text-[#000000] mb-3">
            If you have questions or require assistance, please contact us:
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
      </div>
    </div>
  );
};

export default RefundPolicyContent;
