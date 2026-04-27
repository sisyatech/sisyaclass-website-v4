

import React from "react";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import SocialFab from "@/components/doubt-solving/components/SocialFab";
import WhatsAppFab from "@/components/doubt-solving/components/WhatsAppFab";

function TermsAndConditionsPageContent() {
    return (
        <Container>
            <Navbar />
            <section className="mx-auto max-w-4xl px-4 py-16 text-slate-900">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">Offer Terms</p>
                <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900">
                    "Your Child Scores 90% in Boards or Get Your Money Back!" Offer
                </h1>
                <p className="mb-10 text-lg text-slate-600">
                    This promotional offer ("Offer") is launched by SISYA CLASS to support students preparing for Board Examinations.
                    By enrolling in the eligible program(s), you agree to the following Terms &amp; Conditions:
                </p>

                <div className="space-y-12 text-base leading-relaxed text-slate-700">
                    <section>
                        <h2 className="mb-4 text-2xl font-semibold text-slate-900">1. Eligibility</h2>
                        <ul className="list-disc space-y-3 pl-6">
                            <li>This offer is applicable only to students enrolled in the following SISYA CLASS programs:</li>
                        </ul>
                        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <p className="font-medium text-slate-900">Board Excellence Program (G10 Only)</p>
                        </div>
                        <ul className="mt-4 list-disc space-y-3 pl-6">
                            <li>The student must attend a minimum of 90% of all live classes.</li>
                            <li>The student must complete at least 90% of homework, assignments, tests, and mock exams given by SISYA CLASS.</li>
                            <li>The student must 100% participate in all monthly assessments and final mock exams conducted by SISYA CLASS.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold text-slate-900">2. Conditions for Money-Back Guarantee</h2>
                        <p>SISYA CLASS guarantees student support and structured academic improvement. To be eligible for a refund, the student must:</p>
                        <ul className="mt-4 list-disc space-y-3 pl-6">
                            <li>Score below 90% aggregate despite fulfilling all conditions, <span className="font-semibold">and</span></li>
                            <li>Submit the official Board Examination marksheet issued by the respective Board (CBSE).</li>
                        </ul>
                        <p className="mt-4">
                            Refund is applicable only on the course fee paid to SISYA CLASS (excluding GST, registration fees, worksheets, materials, exam fees,
                            or any third-party charges).
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold text-slate-900">3. Not Applicable / Exclusions</h2>
                        <ul className="list-disc space-y-3 pl-6">
                            <li>If the student misses classes, tests, or does not maintain required attendance/homework completion, the offer becomes invalid.</li>
                            <li>Students enrolling after 30 days of program start date are not eligible for the Offer.</li>
                            <li>If the student submits incorrect or manipulated academic records, the request will be rejected.</li>
                            <li>Refund is not applicable for:</li>
                        </ul>
                        <ul className="mt-4 list-disc space-y-2 pl-12">
                            <li>Behavioral issues</li>
                            <li>Long breaks/absences</li>
                            <li>Personal or medical issues</li>
                            <li>Board reassessment or revaluation marks</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold text-slate-900">4. Refund Process</h2>
                        <ul className="list-disc space-y-3 pl-6">
                            <li>Refund request must be submitted within 7 days of receiving the Board Examination marksheet.</li>
                            <li>Refund will be processed within 21 working days after verification.</li>
                            <li>Refund will be paid through bank transfer only to the parent's account.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold text-slate-900">5. Company Rights</h2>
                        <ul className="list-disc space-y-3 pl-6">
                            <li>SISYA CLASS reserves the right to verify all attendance, homework, and test records before approving a refund.</li>
                            <li>SISYA CLASS may modify or withdraw this Offer at any time without prior notice.</li>
                            <li>Final decision by SISYA CLASS will be binding and non-negotiable.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold text-slate-900">6. Disclaimer</h2>
                        <ul className="list-disc space-y-3 pl-6">
                            <li>The aim of this campaign is to motivate students to achieve their best.</li>
                            <li>This Offer should not be considered as an assurance of guaranteed marks without student effort.</li>
                            <li>Academic results depend on student participation, consistency, and discipline.</li>
                        </ul>
                    </section>
                </div>
            </section>


            {/* Footer */}
            <Footer />

            {/* Study Material */}
            <StudyMaterial />

            {/* Moto */}
            <Moto />

            {/* Footer Bottom */}
            <FooterBottom />
            <MobileMenu />
            <SocialFab />
            <WhatsAppFab />
        </Container>
    );
}

export default function TermsAndConditionsPage() {
    return (
        <MobileMenuProvider>
            <TermsAndConditionsPageContent />
        </MobileMenuProvider>
    );
}

