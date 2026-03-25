"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlarmClock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Trophy,
  XCircle,
} from "lucide-react";

import Navbar, {
  MobileMenu,
  MobileMenuProvider,
  useMobileMenu,
} from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { scholarshipExamData, scholarshipGrades } from "@/lib/scholarshipExamData";
import { cn } from "@/lib/utils";

const EXAM_DURATION_SECONDS = 30 * 60;

const formatTime = (s: number) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const getGrade = (param: string | null) => {
  const n = Number(param);
  return scholarshipGrades.includes(n) ? n : 1;
};

const scoreBand = (score: number) => {
  if (score >= 9)
    return {
      label: "Outstanding",
      color: "emerald",
      description:
        "Excellent scholarship readiness. Command across all subjects is commendable.",
    };
  if (score >= 7)
    return {
      label: "Promising",
      color: "sky",
      description:
        "A strong attempt. Focused revision in weaker subjects will push this into the top bracket.",
    };
  if (score >= 5)
    return {
      label: "Developing",
      color: "amber",
      description:
        "The foundation is visible. Consistent practice across all subjects is the next step.",
    };
  return {
    label: "Practice More",
    color: "rose",
    description:
      "Use this mock as a baseline and strengthen subject fundamentals before the next attempt.",
  };
};

type SubmissionState = { score: number; mode: "manual" | "timer" };

type ExamQuestion = {
  id: string;
  grade: number;
  subject: string;
  question: string;
  options: string[];
  answerIndex?: number;
};

type QuestionsApiResponse = {
  success: boolean;
  grade: number;
  totalQuestions: number;
  questions: Array<{
    id: string;
    grade: number;
    subject: string;
    questionText: string;
    options: string[];
  }>;
};

type SubmitAnswer = {
  questionId: string;
  selectedIndex: number | null;
};

type SubmitExamPayload = {
  userId: number;
  mobileNumber: string;
  grade: number;
  durationInSeconds: number;
  answers: SubmitAnswer[];
};

type SubmitExamResponse = {
  userId?: number;
  mobileNumber?: string;
  grade?: number;
  durationInSeconds?: number;
  answers?: SubmitAnswer[];
  score?: number;
};

const normalizeQuestionKey = (text: string) =>
  text
    .toLowerCase()
    .replace(/\(\s*set\s*[a-z0-9]+\s*\)$/i, "")
    .replace(/\s+/g, " ")
    .trim();

const dedupeQuestions = (items: ExamQuestion[]) => {
  const seenIds = new Set<string>();
  const seenQuestionKeys = new Set<string>();

  return items.filter((q) => {
    const normalized = normalizeQuestionKey(q.question);
    if (!q.id || seenIds.has(q.id) || seenQuestionKeys.has(normalized)) {
      return false;
    }

    seenIds.add(q.id);
    seenQuestionKeys.add(normalized);
    return true;
  });
};

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const getEligibilityErrorMessage = (reason?: string) => {
  if (reason === "already_attempted") {
    return "You have already attempted this scholarship exam.";
  }
  return "You are currently not eligible for the scholarship exam.";
};

function ExamSessionInner() {
  const { setCurrentPage, setSelectedGrade } = useMobileMenu();
  const searchParams = useSearchParams();
  const router = useRouter();

  const grade = getGrade(searchParams.get("grade"));
  // Questions will be fetched from API; fallbackQuestions removed to ensure API-only contract.

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_DURATION_SECONDS);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [isAccessCheckComplete, setIsAccessCheckComplete] = useState(false);
  const [submission, setSubmission] = useState<SubmissionState | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQuestion = questions[currentIndex];
  const timerUrgent = remainingSeconds < 5 * 60;

  const calculateScore = () => {
    if (questions.length === 0) return 0;

    const hasCorrectAnswers = questions.some((q) => typeof q.answerIndex === "number");
    if (!hasCorrectAnswers) {
      // Backend question payload currently does not return answers.
      // Use participation score so the flow remains functional until submit-scoring API is integrated.
      return answeredCount;
    }

    return questions.reduce((t, q) => {
      if (typeof q.answerIndex !== "number") return t;
      return t + (selectedAnswers[q.id] === q.answerIndex ? 1 : 0);
    }, 0);
  };

  useEffect(() => {
    setCurrentPage("scholarship-exam");
    setSelectedGrade(null);
  }, [setCurrentPage, setSelectedGrade]);

  // Fetch grade-wise scholarship questions from backend.
  useEffect(() => {
    let cancelled = false;

    const loadQuestions = async () => {
      setQuestionsLoading(true);
      setSubmitError("");

      try {
        // Try multiple pulls to collect exactly 10 unique UUID questions.
        const collected: ExamQuestion[] = [];
        const seen = new Set<string>();

        for (let attempt = 0; attempt < 4 && collected.length < 10; attempt += 1) {
          const response = await fetch(
            `https://staging.sisyaclass.net/student/scholarship/exam/questions?grade=${grade}&_t=${Date.now()}-${attempt}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              cache: "no-store",
            }
          );

          const data: QuestionsApiResponse = await response.json();
          if (!data?.success || !Array.isArray(data.questions) || data.questions.length === 0) {
            continue;
          }

          const mapped: ExamQuestion[] = data.questions.map((q) => ({
            id: q.id,
            grade: q.grade,
            subject: q.subject,
            question: q.questionText,
            options: q.options,
          }));

          const uniqueBatch = dedupeQuestions(mapped).filter((q) => isUuid(q.id));
          for (const q of uniqueBatch) {
            const key = normalizeQuestionKey(q.question);
            if (!seen.has(key)) {
              seen.add(key);
              collected.push(q);
            }
            if (collected.length >= 10) break;
          }
        }

        if (!cancelled) {
          const prepared = collected.slice(0, 10);
          if (prepared.length === 10) {
            setQuestions(prepared);
          } else {
            // Keep API-only contract for submit endpoint requiring UUIDs.
            setQuestions(prepared);
            setSubmitError("Could not load 10 unique API questions for this grade. Please refresh and try again.");
          }
          setSelectedAnswers({});
          setCurrentIndex(0);
        }
      } catch (e) {
        if (!cancelled) {
          setQuestions([]);
          setSubmitError("Unable to load exam questions from server. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setQuestionsLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, [grade]);

  useEffect(() => {
    if (questions.length === 0) return;
    if (currentIndex >= questions.length) {
      setCurrentIndex(questions.length - 1);
    }
  }, [questions, currentIndex]);

  // On mount, check sessionStorage for verification details and generate/restore coupon code.
  useEffect(() => {
    let cancelled = false;

    const restoreVerifiedSession = async () => {
      try {
        const stored = sessionStorage.getItem("scholarshipMobile");
        const storedGrade = Number(sessionStorage.getItem("scholarshipVerifiedGrade"));
        const storedUserId = Number(sessionStorage.getItem("scholarshipUserId"));
        const hasVerifiedGrade = scholarshipGrades.includes(storedGrade);
        const hasUserId = Number.isInteger(storedUserId) && storedUserId > 0;

        if (stored && /^[6-9]\d{9}$/.test(stored) && hasVerifiedGrade && hasUserId) {
          const eligibilityResponse = await fetch(
            `https://staging.sisyaclass.net/student/scholarship/exam/eligibility?mobile=${stored}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              cache: "no-store",
            }
          );

          let eligibilityData: { success?: boolean; canAttempt?: boolean; reason?: string } | null = null;
          try {
            eligibilityData = await eligibilityResponse.json();
          } catch {
            throw new Error(`Eligibility API returned invalid response (status ${eligibilityResponse.status}).`);
          }

          const canAttemptScholarshipExam = Boolean(
            eligibilityResponse.ok && eligibilityData?.success === true && eligibilityData?.canAttempt === true
          );

          if (!canAttemptScholarshipExam) {
            sessionStorage.removeItem("scholarshipMobile");
            sessionStorage.removeItem("scholarshipUserId");
            sessionStorage.removeItem("scholarshipVerifiedGrade");
            if (!cancelled) {
              setMobile("");
              setMobileVerified(false);
              setMobileError(getEligibilityErrorMessage(eligibilityData?.reason));
              setShowMobileModal(true);
            }
            return;
          }

          if (!cancelled) {
            setMobile(stored);
            setMobileVerified(true);
            if (storedGrade !== grade) {
              router.replace(`/scholarship-exam/exam?grade=${storedGrade}`);
            }
          }
        } else if (!cancelled) {
          setShowMobileModal(true);
        }
      } catch {
        if (!cancelled) {
          setShowMobileModal(true);
        }
      } finally {
        if (!cancelled) {
          setIsAccessCheckComplete(true);
        }
      }
    };

    restoreVerifiedSession();

    // Restore or generate a unique coupon code for this session
    try {
      const existingCode = sessionStorage.getItem("scholarshipCoupon");
      if (existingCode) {
        setCouponCode(existingCode);
      } else {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const rand = Array.from(crypto.getRandomValues(new Uint8Array(7)))
          .map((b) => chars[b % chars.length])
          .join("");
        const code = `SISYA${rand}`;
        sessionStorage.setItem("scholarshipCoupon", code);
        setCouponCode(code);
      }
    } catch {
      setCouponCode("SISYASCHOLAR");
    }
    return () => {
      cancelled = true;
    };
  }, [grade, router]);

  // Countdown timer
  useEffect(() => {
    if (submission) return;
    if (!mobileVerified) return; // don't start until mobile verified

    if (remainingSeconds <= 0) {
      const score = calculateScore();
      setSubmission({ score, mode: "timer" });
      return;
    }

    const id = window.setInterval(
      () => setRemainingSeconds((s) => s - 1),
      1000
    );
    return () => window.clearInterval(id);
  }, [remainingSeconds, submission, questions, selectedAnswers, mobileVerified, answeredCount]);

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
      const isVerifiedStudent = Boolean(
        data?.success && data?.exists && data?.enrolledInActiveCourse
      );

      if (!isVerifiedStudent) {
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

      const eligibilityResponse = await fetch(
        `https://staging.sisyaclass.net/student/scholarship/exam/eligibility?mobile=${trimmed}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      let eligibilityData: { success?: boolean; canAttempt?: boolean; reason?: string } | null = null;
      try {
        eligibilityData = await eligibilityResponse.json();
      } catch {
        throw new Error(`Eligibility API returned invalid response (status ${eligibilityResponse.status}).`);
      }

      if (!eligibilityResponse.ok) {
        throw new Error(`Eligibility API failed with status ${eligibilityResponse.status}.`);
      }

      const canAttemptScholarshipExam = Boolean(
        eligibilityResponse.ok && eligibilityData?.success === true && eligibilityData?.canAttempt === true
      );

      if (!canAttemptScholarshipExam) {
        setMobileError(getEligibilityErrorMessage(eligibilityData?.reason));
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
      const message =
        e instanceof Error && e.message
          ? e.message
          : "Unable to verify your number right now. Please try again.";
      setMobileError(message);
      setIsVerifying(false);
      return;
    }

    try {
      sessionStorage.setItem("scholarshipMobile", trimmed);
    } catch (e) {}

    setIsVerifying(false);
    setMobileVerified(true);
    setShowMobileModal(false);

    if (verifiedGrade !== grade) {
      router.replace(`/scholarship-exam/exam?grade=${verifiedGrade}`);
    }
  };

  // Use ref for latest state values in navigation/unload listeners to avoid re-adding listeners every second
  const latestStateRef = useRef({ questions, selectedAnswers, remainingSeconds, mobile, submission });
  useEffect(() => {
    latestStateRef.current = { questions, selectedAnswers, remainingSeconds, mobile, submission };
  }, [questions, selectedAnswers, remainingSeconds, mobile, submission]);

  // Block accidental tab close and submit on exit
  useEffect(() => {
    if (submission || !mobileVerified) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "You are currently taking the scholarship exam. If you leave, refresh, or close this tab, your test will be submitted as-is, and you will not be able to attempt it again. Are you sure you want to leave?";
    };

    const handleUnload = () => {
      const { submission: currentSub, mobile: curMobile, questions: curQs, selectedAnswers: curAns, remainingSeconds: curSec } = latestStateRef.current;
      if (currentSub) return;
      
      const storedMobile = sessionStorage.getItem("scholarshipMobile") || curMobile;
      const storedUserId = Number(sessionStorage.getItem("scholarshipUserId"));
      const storedGrade = Number(sessionStorage.getItem("scholarshipVerifiedGrade"));

      if (storedMobile && storedUserId && scholarshipGrades.includes(storedGrade) && curQs.length > 0) {
        const payload = {
          userId: storedUserId,
          mobileNumber: storedMobile,
          grade: storedGrade,
          durationInSeconds: Math.max(0, EXAM_DURATION_SECONDS - curSec),
          answers: curQs.map((q: ExamQuestion) => ({
            questionId: q.id,
            selectedIndex: curAns[q.id] ?? null
          }))
        };

        fetch("https://staging.sisyaclass.net/student/scholarship/exam/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [submission, mobileVerified]);

  // Prevent accidental navigation via browser back button
  useEffect(() => {
    if (submission || !mobileVerified) return;

    const handlePopState = async () => {
      const msg = "You are currently taking the scholarship exam. If you leave, refresh, or close this tab, your test will be submitted as-is, and you will not be able to attempt it again. Are you sure you want to leave?";
      
      if (window.confirm(msg)) {
        try {
          // Attempt to submit before leaving
          await submitNow("manual");
        } catch (err) {
          // Continue with navigation even if submit fails
        }
        router.push("/scholarship-exam");
      } else {
        // user cancelled - push state again to keep the guard active
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Push initial dummy state to enable back button interception
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission, mobileVerified, router]); 
  // stable dependencies to avoid history push loops

  const handleAnswer = (qId: string, idx: number) => {
    if (!mobileVerified) {
      setShowMobileModal(true);
      return;
    }
    if (submission) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const submitNow = async (mode: SubmissionState["mode"]) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const storedMobile =
        typeof window !== "undefined"
          ? sessionStorage.getItem("scholarshipMobile") || mobile.trim()
          : mobile.trim();

      const storedUserIdRaw =
        typeof window !== "undefined"
          ? sessionStorage.getItem("scholarshipUserId")
          : null;
      const storedGradeRaw =
        typeof window !== "undefined"
          ? sessionStorage.getItem("scholarshipVerifiedGrade")
          : null;

      const parsedUserId = Number(storedUserIdRaw);
      const parsedVerifiedGrade = Number(storedGradeRaw);

      if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
        setSubmitError("Student verification is missing. Please verify mobile number again.");
        setShowMobileModal(true);
        return;
      }

      if (!scholarshipGrades.includes(parsedVerifiedGrade)) {
        setSubmitError("Verified grade is missing. Please verify mobile number again.");
        setShowMobileModal(true);
        return;
      }

      if (!/^[6-9]\d{9}$/.test(storedMobile)) {
        setSubmitError("Valid mobile number not found. Please verify mobile number again.");
        setShowMobileModal(true);
        return;
      }

      const validQuestionAnswers = questions
        .filter((q) => isUuid(q.id))
        .map((q) => ({
          questionId: q.id,
          selectedIndex: selectedAnswers[q.id] ?? null,
        }));

      if (validQuestionAnswers.length !== 10) {
        setSubmitError("Exactly 10 valid questions are required. Please refresh and try again.");
        return;
      }

      const payload: SubmitExamPayload = {
        userId: parsedUserId,
        mobileNumber: storedMobile,
        grade: parsedVerifiedGrade,
        durationInSeconds: Math.max(0, EXAM_DURATION_SECONDS - remainingSeconds),
        answers: validQuestionAnswers,
      };

      const response = await fetch("https://staging.sisyaclass.net/student/scholarship/exam/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `Submission failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData?.message) {
            errorMessage = String(errorData.message);
          }
          if (Array.isArray(errorData?.issues) && errorData.issues.length > 0) {
            const issueMsg = errorData.issues[0]?.message;
            if (issueMsg) {
              errorMessage = `${errorMessage}: ${issueMsg}`;
            }
          }
        } catch {}
        throw new Error(errorMessage);
      }

      const data: SubmitExamResponse = await response.json();
      const score = typeof data?.score === "number" ? data.score : calculateScore();

      setSubmission({ score, mode });
      setShowSubmitConfirm(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not submit your test right now. Please try again.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!mobileVerified) {
      setShowMobileModal(true);
      return;
    }
    if (questionsLoading || questions.length === 0) {
      setSubmitError("Questions are still loading. Please wait a moment and try again.");
      return;
    }
    if (submission) return;
    const unanswered = questions.length - answeredCount;
    if (unanswered > 0) {
      setShowSubmitConfirm(true);
      return;
    }
    submitNow("manual");
  };

  // Note: retry/reset removed by design — users cannot retry from the result screen

  if (!isAccessCheckComplete) {
    return (
      <>
        <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur">
          <Navbar />
        </div>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4 py-8">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
            Checking eligibility...
          </div>
        </div>
        <MobileMenu />
      </>
    );
  }

  // ── Result screen ────────────────────────────────────────────────────────────
  if (submission) {
    const band = scoreBand(submission.score);
    const discountPercent = submission.score >= 9 ? 80 : submission.score >= 7 ? 60 : submission.score >= 5 ? 40 : 20;

    return (
      <>
        <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur">
          <Navbar />
        </div>

        <main className="min-h-screen bg-white">

          {/* ── Dark hero ── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 pb-28 pt-12 text-center sm:px-6 lg:px-8">
            {/* Decorative rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
              <div className="absolute inset-[70px] rounded-full border border-white/[0.06]" />
              <div className="absolute inset-[140px] rounded-full border border-white/[0.08]" />
            </div>

            {/* Trophy icon */}
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_20px_48px_rgba(251,146,60,0.45)]">
              <Trophy className="h-10 w-10 text-white" />
            </div>

            {/* Subtitle */}
            <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Grade {grade}&nbsp;·&nbsp;{submission.mode === "timer" ? "Time expired" : "Scholarship Exam"}
            </p>

            {/* Headline */}
            <h1 className="relative mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {submission.score >= 9 ? "Absolutely Brilliant!"
               : submission.score >= 7 ? "Great Job!"
               : submission.score >= 5 ? "Well Done!"
               : "Keep Going!"}
            </h1>
            <p className="relative mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              {band.description}
            </p>

            {/* Score + Discount pill */}
            <div className="relative mt-8 inline-flex items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="px-8 py-5 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Your Score</div>
                <div className="mt-1 tabular-nums text-white">
                  <span className="text-5xl font-bold">{submission.score}</span>
                  <span className="text-2xl font-semibold text-slate-500">/{questions.length}</span>
                </div>
              </div>
              <div className="h-14 w-px bg-white/10" />
              <div className="px-8 py-5 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Scholarship</div>
                <div className="mt-1 text-5xl font-bold tabular-nums text-emerald-400">{discountPercent}%</div>
              </div>
            </div>

            {/* Band badge */}
            <div className="relative mt-4">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold",
                  band.color === "emerald" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
                  band.color === "sky" && "border-sky-500/30 bg-sky-500/10 text-sky-300",
                  band.color === "amber" && "border-amber-500/30 bg-amber-500/10 text-amber-300",
                  band.color === "rose" && "border-rose-500/30 bg-rose-500/10 text-rose-300",
                )}
              >
                <Trophy className="h-3.5 w-3.5" />
                {band.label}
              </span>
            </div>
          </div>

          {/* ── Content card (overlaps dark hero) ── */}
          <div className="relative z-10 mx-auto -mt-14 max-w-2xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_32px_80px_rgba(2,6,23,0.14)]">

              {/* Coupon section */}
              <div className="px-6 py-7 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Your Scholarship Award</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">You've earned a discount!</h2>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  Share the coupon code with your mentor when enrolling in a course to redeem your{" "}
                  <span className="font-semibold text-slate-900">{discountPercent}% scholarship discount</span>.
                </p>

                {/* Ticket */}
                <div className="mt-5 flex items-stretch overflow-hidden rounded-2xl border-2 border-dashed border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-sky-50">
                  <div className="flex flex-1 items-center justify-center px-6 py-5">
                    <span className="font-mono text-2xl font-bold tracking-[0.18em] text-slate-900 sm:text-3xl">
                      {couponCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(couponCode);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 2200);
                    }}
                    className="flex min-w-[76px] flex-col items-center justify-center gap-1.5 border-l-2 border-dashed border-emerald-300 bg-white px-4 transition-colors hover:bg-emerald-50 focus-visible:outline-none"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 text-sky-600" />
                        <span className="text-xs font-bold text-sky-600">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  ⏳ Valid for a limited time — connect with a mentor soon to claim it.
                </p>
              </div>

              {/* How to redeem */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100">
                {([
                  { n: "1", title: "Save code", desc: "Copy & note down your scholarship code." },
                  { n: "2", title: "Talk to mentor", desc: "Reach out to a SisyaClass mentor." },
                  { n: "3", title: "Get discount", desc: "Share code during enrolment." },
                ] as const).map((s) => (
                  <div key={s.n} className="px-4 py-5 text-center">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                      {s.n}
                    </div>
                    <p className="mt-2.5 text-xs font-semibold text-slate-800">{s.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:px-8">
                <Button
                  className="h-12 flex-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-sm font-bold text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)] transition-all hover:shadow-[0_12px_28px_rgba(16,185,129,0.45)]"
                  onClick={() => router.push('/askme')}
                >
                  Connect with a mentor
                </Button>
                <Button
                  variant="outline"
                  className="h-12 flex-1 rounded-full text-sm font-semibold"
                  onClick={() => router.push(`/scholarship-exam?grade=${grade}`)}
                >
                  Back to overview
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile collection modal (if accessed directly without mobile) */}
        {showMobileModal && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowMobileModal(false); }}
          >
            <div className="w-full max-w-sm rounded-[32px] bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
                    <svg className="h-6 w-6 text-sky-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.73 3.03a2 2 0 0 1-.45 2.11L8.91 10.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.96.36 1.98.61 3.03.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Enter your mobile number</h3>
                  <p className="mt-1 text-sm text-slate-500">Required to start the scholarship exam and receive your discount code.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMobileModal(false)}
                  className="-mr-2 -mt-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
                >
                  <XCircle className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile Number</label>
                <div className="flex overflow-hidden rounded-2xl border border-slate-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200 transition-all">
                  <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "")); setMobileError(""); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleMobileSubmit(); }}
                    className="w-full bg-white px-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    autoFocus
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
              >
                Start Scholarship Exam
              </Button>

              <p className="mt-3 text-center text-xs text-slate-400">Your number will only be used to share your scholarship discount.</p>
            </div>
          </div>
        )}

        <MobileMenu />
      </>
    );
  }

  // (submit confirmation modal is rendered inside the main active return below)

  // If mobile not verified, block with a modal immediately (prevents interaction)
  if (showMobileModal && !mobileVerified) {
    return (
      <>
        <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur">
          <Navbar />
        </div>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-sm rounded-[32px] bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
                  <svg className="h-6 w-6 text-sky-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.73 3.03a2 2 0 0 1-.45 2.11L8.91 10.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.96.36 1.98.61 3.03.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Enter your mobile number</h3>
                <p className="mt-1 text-sm text-slate-500">Required to start the scholarship exam and receive your discount code.</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile Number</label>
              <div className="flex overflow-hidden rounded-2xl border border-slate-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200 transition-all">
                <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "")); setMobileError(""); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !isVerifying) handleMobileSubmit(); }}
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
            </Button>

            <p className="mt-3 text-center text-xs text-slate-400">Your number will only be used to share your scholarship discount.</p>
          </div>
        </div>
        <MobileMenu />
      </>
    );
  }

  // ── Active exam screen ───────────────────────────────────────────────────────
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const unansweredCount = questions.length - answeredCount;

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur">
        <Navbar />
        {/* Thin progress bar directly beneath navbar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:px-8 lg:py-10">

          {/* ── Question area ── */}
          <div className="space-y-4">
            {submitError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {submitError}
              </div>
            )}
            {/* Question meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-500">
                  Question {currentIndex + 1}
                  <span className="font-normal text-slate-400"> / {questions.length}</span>
                </span>
                {currentQuestion && (
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    {currentQuestion.subject}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 tabular-nums">
                Grade {grade}
              </span>
              {questionsLoading && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Syncing questions...
                </span>
              )}
            </div>

            {/* Question card */}
            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
              {currentQuestion ? (
                <>
                  {/* Question text */}
                  <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-7">
                    <h2 className="text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="grid gap-3 p-6">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAnswer(currentQuestion.id, idx)}
                          className={cn(
                            "flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                            isSelected
                              ? "border-sky-500 bg-sky-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-sky-200 hover:bg-slate-50"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                              isSelected
                                ? "border-sky-500 bg-sky-500 text-white"
                                : "border-slate-300 bg-white text-slate-500"
                            )}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm font-medium leading-6 text-slate-800">
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
                  {questionsLoading ? (
                    <>
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
                      <p className="text-sm font-medium text-slate-500">Loading your personalized exam...</p>
                    </>
                  ) : (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <XCircle className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-rose-600">Failed to load questions. Please check your connection and refresh.</p>
                      <Button variant="outline" onClick={() => window.location.reload()} className="rounded-full">
                        Retry Refresh
                      </Button>
                    </>
                  )}
                </div>
              )}

              {/* Prev / Next navigation */}
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                  className="rounded-full gap-2 disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                {currentIndex < questions.length - 1 ? (
                  <Button
                    type="button"
                    className="rounded-full gap-2 bg-sky-500 text-white hover:bg-sky-600"
                    onClick={() => setCurrentIndex((i) => i + 1)}
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="rounded-full gap-2 bg-emerald-500 text-white hover:bg-emerald-600"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit test"}
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            {/* Timer */}
            <div
              className={cn(
                "rounded-[24px] p-5 text-white transition-colors duration-500",
                timerUrgent ? "bg-rose-600" : "bg-slate-950"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Time remaining
                  </div>
                  <div className="mt-1 text-3xl font-semibold tabular-nums">
                    {formatTime(remainingSeconds)}
                  </div>
                </div>
                <AlarmClock
                  className={cn(
                    "h-9 w-9",
                    timerUrgent ? "text-rose-200" : "text-cyan-300"
                  )}
                />
              </div>
              <p className="mt-3 text-xs leading-5 text-white/50">
                Auto-submits when time runs out
              </p>
            </div>

            {/* Answered / Remaining */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs uppercase tracking-widest text-slate-500">
                  Answered
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {answeredCount}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs uppercase tracking-widest text-slate-500">
                  Remaining
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {questions.length - answeredCount}
                </div>
              </div>
            </div>

            {/* Question navigator */}
            <div className="rounded-[20px] border border-slate-200 bg-white p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Jump to question
              </p>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, i) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = i === currentIndex;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none",
                        isCurrent
                          ? "bg-sky-500 text-white shadow"
                          : isAnswered
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "border border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full bg-sky-500" />
                  Current
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full bg-emerald-200" />
                  Answered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full border border-slate-300 bg-white" />
                  Skipped
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="button"
              className="h-12 w-full rounded-full bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit test"}
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          </aside>
        </div>
      </main>

      <MobileMenu />
      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-[240] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900">Submit test?</h3>
            <p className="mt-2 text-sm text-slate-600">
              You have <span className="font-medium text-slate-900">{unansweredCount}</span> unanswered question{unansweredCount > 1 ? "s" : ""}. Are you sure you want to submit?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSubmitConfirm(false)}>Continue test</Button>
              <Button onClick={() => submitNow("manual")} className="bg-emerald-500 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit anyway"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ScholarshipExamSession() {
  return (
    <MobileMenuProvider>
      <ExamSessionInner />
    </MobileMenuProvider>
  );
}
