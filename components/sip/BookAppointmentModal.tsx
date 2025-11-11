'use client';

import React, { useState } from "react";

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

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-[320px] sm:max-w-[420px] overflow-hidden rounded-[16px] sm:rounded-[20px] bg-white shadow-[0px_16px_50px_rgba(9,22,39,0.22)]">
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
              value={mobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
              className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE]"
            />
          </label>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE] focus:border-[#0595CE]"
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE] focus:border-[#0595CE]"
          />

          <input
            type="text"
            placeholder="Institute / School"
            value={institute}
            onChange={(event) => setInstitute(event.target.value)}
            className="rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9AA3AE] focus:border-[#0595CE]"
          />

          <label className="relative flex items-center gap-3 rounded-[10px] border border-[#C3CFDB] bg-white px-4 py-3 text-sm text-[#111827] focus-within:border-[#0595CE]">
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

          <div className="flex items-center gap-2 rounded-[10px] border border-[#C3CFDB] px-4 py-3 text-sm text-[#111827] outline-none focus-within:border-[#0595CE]">
            <input
              type="text"
              placeholder="School Name"
              value={board}
              onChange={(event) => setBoard(event.target.value)}
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


