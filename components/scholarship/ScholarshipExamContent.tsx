"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Phone,
  ShieldAlert,
  Sparkles,
  Star,
  Tag,
  X,
} from "lucide-react";

import Navbar, {
  MobileMenu,
  MobileMenuProvider,
  useMobileMenu,
} from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { scholarshipExamData, scholarshipGrades } from "@/lib/scholarshipExamData";

const getGrade = (param: string | null) => {
  const n = Number(param);
  return scholarshipGrades.includes(n) ? n : 1;
};

const TEACHERS = [
  { img: "/sippics/teacher1.png", name: "Expert Faculty", role: "Mathematics" },
  { img: "/sippics/teacher2.png", name: "Expert Faculty", role: "Science & EVS" },
  { img: "/sippics/teacher3.png", name: "Expert Faculty", role: "English & Hindi" },
];

const SUBJECTS = [
  { icon: "/grades/math.svg", label: "Mathematics" },
  { icon: "/grades/eng.svg", label: "English" },
  { icon: "/grades/sciens.svg", label: "Science" },
];

const STATS = [
  { value: "10K+", label: "Students Benefited" },
  { value: "80%", label: "Max Discount on Score" },
  { value: "Grades 1–10", label: "All Classes Covered" },
];

function ScholarshipLandingInner() {
  const { setCurrentPage, setSelectedGrade } = useMobileMenu();
  const searchParams = useSearchParams();
  const router = useRouter();

  const grade = getGrade(searchParams.get("grade"));

  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleStartClick = () => {
    setMobile("");
    setMobileError("");
    setShowMobileModal(true);
  };

  const handleMobileSubmit = async () => {
    const trimmed = mobile.trim();
    if (!/^[6-9]\d{9}$/.test(trimmed)) {
      setMobileError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsVerifying(true);
    setMobileError("");

    let verifiedGrade = grade;

    try {
      const response = await fetch("https://staging.sisyaclass.net/student/verify-existing-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: trimmed }),
      });

      const data = await response.json();
      const canAttempt = Boolean(data?.success && data?.exists && data?.enrolledInActiveCourse);

      if (!canAttempt) {
        setMobileError("Only existing students enrolled in an active course can attempt this scholarship exam.");
        setIsVerifying(false);
        return;
      }

      const parsedGrade = Number(data?.grade);
      if (!scholarshipGrades.includes(parsedGrade)) {
        setMobileError("Your profile grade is currently not eligible for this exam.");
        setIsVerifying(false);
        return;
      }

      verifiedGrade = parsedGrade;

      try {
        sessionStorage.setItem("scholarshipUserId", String(data?.userId ?? ""));
        sessionStorage.setItem("scholarshipVerifiedGrade", String(parsedGrade));
      } catch (e) {
        // ignore storage errors
      }
    } catch (e) {
      setMobileError("Unable to verify your number right now. Please try again.");
      setIsVerifying(false);
      return;
    }

    // Save verified mobile in sessionStorage (do not expose in URL)
    try {
      sessionStorage.setItem("scholarshipMobile", trimmed);
    } catch (e) {
      // ignore storage errors
    }

    setIsVerifying(false);
    setShowMobileModal(false);
    router.push(`/scholarship-exam/exam?grade=${verifiedGrade}`);
  };

  useEffect(() => {
    setCurrentPage("scholarship-exam");
    setSelectedGrade(null);
  }, [setCurrentPage, setSelectedGrade]);

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur">
        <Navbar />
      </div>

      <main className="min-h-screen bg-white">

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#0c3a6e_55%,#0c5896_100%)]">
          {/* Subtle grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glowing orb */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full bg-sky-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[80px]" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_440px] lg:items-center">

              {/* ── LEFT ── */}
              <div className="space-y-7 text-white">
                {/* Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                  <Sparkles className="h-4 w-4" />
                  Scholarship Entrance Practice Portal
                </div>

                {/* Grade badge */}
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-sky-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                    Scholarship Exam for Grades 1 to 10
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/60">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                  SISYA Scholarship Exam
                </h1>
                <p className="max-w-lg text-base leading-7 text-white/75">
                  A scholarship exam designed for students from Grade 1 to 10 across all core subjects, with instant results and a chance to unlock up to 80% discount on premium courses.
                </p>

                {/* 🔥 Discount strip */}
                <div className="flex items-start gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400">
                    <BadgePercent className="h-6 w-6 text-amber-900" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-amber-300">
                      🎉 Limited-time offer
                    </p>
                    <p className="mt-0.5 text-white">
                      Attempt this full test &amp; score well to earn{" "}
                      <span className="font-extrabold text-amber-300">
                        up to 80% discount
                      </span>{" "}
                      on our premium courses!
                    </p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-cyan-300">{s.value}</div>
                      <div className="mt-1 text-xs leading-4 text-white/60">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Subjects covered */}
                <div>
                  <span className="inline-block rounded-xl border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                    All subjects covered
                  </span>
                </div>

                {/* Teacher row */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                    Questions curated by expert faculty
                  </p>
                  <div className="flex items-center gap-4">
                    {TEACHERS.map((t, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-cyan-400/60 shadow-lg">
                          <Image src={t.img} alt={t.name} fill className="object-cover object-top" />
                        </div>
                        <div className="hidden sm:block">
                          <p className="text-xs font-semibold text-white">{t.name}</p>
                          <p className="text-xs text-white/50">{t.role}</p>
                        </div>
                      </div>
                    ))}
                    <div className="ml-1 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70">
                      <GraduationCap className="h-3.5 w-3.5 text-cyan-300" />
                      IIT &amp; NEET qualified
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT — Instructions card ── */}
              <div className="rounded-[32px] bg-white p-7 shadow-[0_40px_100px_rgba(2,189,254,0.25)]">
                {/* Discount badge inside card */}
                <div className="mb-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-3.5 ring-1 ring-amber-200">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-semibold text-amber-800">
                      Score well → Get
                    </span>
                  </div>
                  <span className="rounded-full bg-amber-400 px-4 py-1 text-lg font-extrabold text-amber-900">
                    80% OFF
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Before you begin
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Read these instructions carefully.
                </p>

                <ol className="mt-5 space-y-3.5">
                  {[
                    "One question at a time. Use Previous &amp; Next to navigate freely.",
                    "30-minute countdown timer — auto-submits when it hits zero.",
                    "Jump to any question via the question navigator grid.",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span
                        className="text-sm leading-6 text-slate-700"
                        dangerouslySetInnerHTML={{ __html: rule }}
                      />
                    </li>
                  ))}
                </ol>

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                  <p className="text-xs leading-5 text-amber-800">
                    If you close or refresh this tab before submitting, the browser will ask for confirmation.
                  </p>
                </div>

                {/* What you unlock */}
                <div className="mt-5 space-y-2">
                  {[
                    "Performance-based scholarship discount up to 80%",
                    "Instant results with detailed question review",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      {point}
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  className="mt-6 h-14 w-full rounded-full bg-[linear-gradient(135deg,#0284c7,#0ea5e9)] text-base font-bold text-white shadow-[0_12px_40px_rgba(2,132,199,0.45)] transition-all hover:shadow-[0_16px_50px_rgba(2,132,199,0.55)] hover:-translate-y-0.5"
                  onClick={handleStartClick}
                >
                  Start Scholarship Exam
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Free · Instant results
                </p>

                {/* Exam meta pills */}
                <div className="mt-4 flex justify-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">
                    <Clock3 className="h-3.5 w-3.5 text-sky-500" />
                    30 minutes
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">
                    <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                    10 questions
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">
                    <GraduationCap className="h-3.5 w-3.5 text-sky-500" />
                    All subjects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF STRIP ──────────────────────────────────────── */}
        <section className="border-y border-slate-100 bg-slate-50 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sky-50">
                  <Image src="/grades/verify.svg" alt="Verified" width={36} height={36} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Expert-Verified</p>
                  <p className="mt-0.5 text-xs text-slate-500">Questions reviewed by IIT &amp; NEET qualified faculty</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-50">
                  <Image src="/grades/correct.svg" alt="Correct" width={36} height={36} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Curriculum Aligned</p>
                  <p className="mt-0.5 text-xs text-slate-500">Covers all subjects as per grade-level syllabus</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-amber-50">
                  <Image src="/grades/coursebaner.svg" alt="Discount" width={36} height={36} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Real Reward</p>
                  <p className="mt-0.5 text-xs text-slate-500">Score high and unlock up to 80% off on courses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW THE DISCOUNT WORKS ──────────────────────────────────── */}
        {/* ── EXPERT TEACHERS ─────────────────────────────────────────── */}
        <section className="bg-slate-950 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
                Questions curated by
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                Our Expert Faculty
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {TEACHERS.map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="relative h-28 w-28 overflow-hidden rounded-[20px] border-2 border-sky-500/50 shadow-[0_0_30px_rgba(2,189,254,0.25)]">
                    <Image src={t.img} alt={t.name} fill className="object-cover object-top" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-sky-400">{t.role}</p>
                  </div>
                </div>
              ))}
              {/* Additional teacher illustrations */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-28 w-28 overflow-hidden rounded-[20px] border-2 border-sky-500/50 bg-slate-800 shadow-[0_0_30px_rgba(2,189,254,0.25)]">
                  <Image src="/sippics/vamsisir.svg" alt="Faculty" fill className="object-contain p-2" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">Expert Faculty</p>
                  <p className="text-sm text-sky-400">Hindi & GK</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-28 w-28 overflow-hidden rounded-[20px] border-2 border-sky-500/50 bg-slate-800 shadow-[0_0_30px_rgba(2,189,254,0.25)]">
                  <Image src="/sippics/ramkisir.svg" alt="Faculty" fill className="object-contain p-2" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">Expert Faculty</p>
                  <p className="text-sm text-sky-400">Social Studies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a,#0c5896)] py-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px,transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-sm font-semibold text-amber-300">
              <BadgePercent className="h-4 w-4" /> Earn up to 80% scholarship discount
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to test your knowledge?
            </h2>
            <p className="mt-4 text-base text-white/70">
              Attempt the full scholarship exam for Grades 1 to 10 — 10 questions, 30 minutes, all subjects.
              Your score unlocks your scholarship discount automatically.
            </p>
            <Button
              type="button"
              className="mt-8 h-14 rounded-full bg-sky-500 px-10 text-base font-bold text-white shadow-[0_16px_50px_rgba(2,189,254,0.5)] hover:bg-sky-400 hover:-translate-y-0.5 transition-all"
              onClick={handleStartClick}
            >
              Start Scholarship Exam — It&apos;s Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div className="mt-4 flex justify-center gap-4 text-xs text-white/40">
              <span>✓ Instant results</span>
              <span>✓ Real discount code</span>
            </div>
          </div>
        </section>

      </main>

      <MobileMenu />

          {/* ── MOBILE NUMBER MODAL ── */}
          {showMobileModal && (
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
              onClick={(e) => { if (e.target === e.currentTarget) setShowMobileModal(false); }}
            >
              <div className="w-full max-w-sm rounded-[32px] bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
                      <Phone className="h-6 w-6 text-sky-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">Enter your mobile number</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Required to start the exam and receive your scholarship discount code.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMobileModal(false)}
                    className="-mr-2 -mt-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
                    disabled={isVerifying}
                  >
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Mobile Number
                  </label>
                  <div className="flex overflow-hidden rounded-2xl border border-slate-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200 transition-all">
                    <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value.replace(/\D/g, ""));
                        setMobileError("");
                      }}
                      onKeyDown={(e) => { if (e.key === "Enter" && !isVerifying) handleMobileSubmit(); }}
                      className="w-full bg-white px-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      autoFocus
                      disabled={isVerifying}
                    />
                  </div>
                  {mobileError && (
                    <p className="text-xs font-medium text-rose-600">{mobileError}</p>
                  )}
                </div>

                <Button
                  type="button"
                  className="mt-6 h-12 w-full rounded-full bg-[linear-gradient(135deg,#0284c7,#0ea5e9)] text-sm font-bold text-white shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.45)]"
                  onClick={handleMobileSubmit}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Start Scholarship Exam"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Your number will only be used to share your scholarship discount.
                </p>
              </div>
            </div>
          )}
    </>
  );
}

export default function ScholarshipExamContent() {
  return (
    <MobileMenuProvider>
      <ScholarshipLandingInner />
    </MobileMenuProvider>
  );
}