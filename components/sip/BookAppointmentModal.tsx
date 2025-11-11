import React from "react";

type BookAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
};

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[20px] bg-white shadow-[0px_16px_50px_rgba(9,22,39,0.22)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#1A2439]/60 transition hover:text-[#1A2439]"
        >
          ✕
        </button>

        <div className="bg-[#FFF5E4] px-6 py-5">
          <h2 className="text-left text-[22px] font-semibold text-[#111827]">
            Book a Free Appointment
          </h2>
        </div>

        <form className="flex flex-col gap-4 px-6 py-6">
          <label className="flex items-center gap-3 rounded-[10px] border border-[#C3CFDB] bg-white px-4 py-3 text-sm text-[#111827] focus-within:border-[#0595CE]">
            <span className="flex items-center gap-2">
              <span className="text-lg">🇮🇳</span>
              <svg
                className="h-4 w-4 text-[#1A2439]/50"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7L10 12L15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE]"
            />
          </label>

          <input
            type="text"
            placeholder="Name"
            className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE] focus:border-[#0595CE]"
          />

          <select className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#0595CE]">
            <option value="">Role</option>
            <option value="principal">Principal</option>
            <option value="management">Management</option>
            <option value="teacher">Teacher</option>
          </select>

          <select className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#0595CE]">
            <option value="">Institute/ School</option>
            <option value="k12">K-12 School</option>
            <option value="junior">Junior College</option>
            <option value="coaching">Coaching Centre</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE] focus:border-[#0595CE]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A2439]/40">
              ⌖
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none focus-within:border-[#0595CE]">
            <input
              type="text"
              placeholder="School Name"
              className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE]"
            />
            <span className="text-base font-semibold text-[#111827]">Board</span>
          </div>

          <p className="text-left text-xs text-[#111827]/70">
            By signing up, you agree to our{" "}
            <a href="/terms-and-conditions" className="text-[#047bb1] underline">
              T&amp;C
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-[#047bb1] underline">
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            className="h-[46px] w-full rounded-[10px] bg-[#DDE1E7] text-sm font-semibold text-[#6B7280]"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;


