'use client';

import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

type BookAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
};

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  open,
  onClose,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [institute, setInstitute] = useState("");
  const [city, setCity] = useState("");
  const [board, setBoard] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location services are not supported on this device.");
      return;
    }

    setLocationError(null);
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let label = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        try {
          const geoResponse = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (geoResponse.ok) {
            const data = await geoResponse.json();
            const {
              city: fetchedCity,
              locality,
              principalSubdivision,
              countryName,
            } = data || {};
            const parts = [fetchedCity, locality, principalSubdivision, countryName]
              .filter((part: string | undefined) => Boolean(part))
              .map((part: string) => part.trim());

            if (parts.length) {
              label = [...new Set(parts)].slice(0, 3).join(", ");
            }
          }
        } catch (error) {
          console.warn("[BookAppointmentModal] reverse geocoding failed", error);
        } finally {
          setCity(label);
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn("[BookAppointmentModal] geolocation error", error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please allow access or enter your city manually.");
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Location request timed out. Please try again.");
        } else {
          setLocationError("Unable to fetch location. Please enter your city manually.");
        }
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  if (!open) return null;

  const isFormValid =
    mobileNumber.trim().length === 10 && name.trim() && role.trim() && board.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!isFormValid) {
      setSubmitError("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        mobileNumber: mobileNumber.trim(),
        name: name.trim(),
        role: role.trim(),
        institute: institute.trim(),
        location: city.trim(),
        preferredBoard: board.trim(),
      };

      const response = await fetch(`${API_BASE_URL}/student/sip_lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || "Failed to submit. Please try again.");
      }

      setShowSuccessModal(true);
      setMobileNumber("");
      setName("");
      setRole("");
      setInstitute("");
      setCity("");
      setBoard("");

      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
      }, 5000);
    } catch (error: any) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget && !showSuccessModal && !submitting) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] overflow-hidden rounded-[18px] bg-white shadow-[0px_16px_40px_rgba(9,22,39,0.24)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#1A2439]/60 transition hover:text-[#1A2439]"
        >
          ✕
        </button>

        <div className="bg-[#FFF5E4] px-4 py-4">
          <h2 className="text-left text-[18px] font-semibold text-[#111827]">
            Book a Free Appointment
          </h2>
        </div>

        <form className="flex flex-col gap-3 px-4 py-4" onSubmit={handleSubmit}>
          <label className="flex items-center gap-2 rounded-[10px] border border-[#C3CFDB] bg-white px-3 py-2 text-xs text-[#111827] focus-within:border-[#0595CE]">
            <span className="flex items-center gap-1 text-sm">
              <span>🇮🇳</span>
              <svg
                className="h-3 w-3 text-[#1A2439]/50"
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
              value={mobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
              className="w-full bg-transparent text-xs text-[#111827] outline-none placeholder:text-[#9AA3AE]"
            />
          </label>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-[10px] border border-[#C3CFDB] px-3 py-2 text-xs text-[#111827] outline-none placeholder:text-[#9AA3AE] focus:border-[#0595CE]"
          />

          <label className="flex flex-col gap-1 text-left text-xs text-[#111827]">
            <span className="font-medium text-[#1C283F]">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#0595CE]"
            >
              <option value="">Select role</option>
              <option value="Principal / Head of School">Principal / Head of School</option>
              <option value="Management / Trustee">Management / Trustee</option>
              <option value="Academic Coordinator">Academic Coordinator</option>
              <option value="Teacher">Teacher</option>
              <option value="Administrator">Administrator</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <input
            type="text"
            placeholder="Institute / School"
            value={institute}
            onChange={(event) => setInstitute(event.target.value)}
            className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE] focus:border-[#0595CE]"
          />

          <label className="relative flex items-center gap-2 rounded-[10px] border border-[#C3CFDB] bg-white px-3 py-2 text-xs text-[#111827] focus-within:border-[#0595CE]">
            <input
              type="text"
              placeholder="Select Location"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE]"
            />
            <button
              type="button"
              onClick={requestLocation}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0595CE]/10 text-[#0595CE] transition hover:bg-[#0595CE]/20 disabled:opacity-60"
              aria-label="Pick location from map"
              disabled={isLocating}
            >
              {isLocating ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2a10 10 0 1 0 10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C12 21 19 14.868 19 9.75C19 6.02208 15.866 3 12 3C8.13401 3 5 6.02208 5 9.75C5 14.868 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </label>

          {locationError && (
            <p className="text-left text-xs text-red-500">{locationError}</p>
          )}
          {submitError && (
            <p className="text-left text-xs text-red-500">{submitError}</p>
          )}

          <label className="flex flex-col gap-1 text-left text-sm text-[#111827]">
            <span className="font-medium text-[#1C283F]">Preferred Board</span>
            <select
              value={board}
              onChange={(event) => setBoard(event.target.value)}
              className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#0595CE]"
            >
              <option value="">Select board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="IB">IB</option>
              <option value="Cambridge IGCSE">Cambridge IGCSE</option>
              <option value="Other">Other</option>
            </select>
          </label>

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
            disabled={!isFormValid || submitting}
            className={`h-[46px] w-full rounded-[10px] text-sm font-semibold transition ${
              !isFormValid || submitting
                ? "bg-[#DDE1E7] text-[#6B7280] cursor-not-allowed"
                : "bg-[#0595CE] text-white hover:bg-[#047bb1]"
            }`}
          >
            {submitting ? "Registering..." : "Register Now"}
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3 className="text-xl font-semibold text-[#111827]">Thank you for submitting</h3>
            <p className="mt-3 text-sm text-[#4B5563]">Our team will contact you shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentModal;


