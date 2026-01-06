"use client";

import React from "react";
import HeroSection from "./sections/HeroSection";
import ResolutionSlotsSection from "./sections/ResolutionSlotsSection";
import PersonalMentorSection from "./sections/PersonalMentorSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import TailoredForLearnerSection from "./sections/TailoredForLearnerSection";
import PricingSection from "./sections/PricingSection";
import FeaturesSection from "./sections/FeaturesSection";
import SocialProofSection from "./sections/SocialProofSection";
import FAQSection from "./sections/FAQSection";
import CTASection from "./sections/CTASection";

export default function AskMeContent() {
    return (
        <main className="min-h-screen bg-white pt-16 sm:pt-18">
            <HeroSection />
            <ResolutionSlotsSection />
            <PersonalMentorSection />
            <HowItWorksSection />
            <TailoredForLearnerSection />
            <PricingSection />
            <FeaturesSection />
            <SocialProofSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}
