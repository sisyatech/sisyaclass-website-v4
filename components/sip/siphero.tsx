import Image from "next/image";
import Link from "next/link";
import SIPBreadcrumb from "@/components/sip/SIPBreadcrumb";

const SIPHero = () => {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-10 md:px-12 lg:px-16 lg:py-20">
        {/* Left Column */}
        <div className="w-full max-w-xl md:max-w-2xl">

          <h1 className="font-roboto text-[52px] font-bold leading-[1.05] text-[#0E90DA] md:text-[64px] lg:text-[72px]">
            <span className="bg-gradient-to-r from-[#0E90DA] to-[#074D74] bg-clip-text text-transparent">
              School
            </span>
          </h1>

          <div className="mt-2 w-full max-w-[483px]">
            <h2 className="font-roboto text-[58px] font-semibold leading-[1.05] text-black md:text-[76px] lg:text-[96px]">
              Integration
            </h2>

            <div className="mt-3 flex w-full items-center justify-between gap-4">
              <span className="hidden h-[1.5px] w-[127px] border-t border-black md:block" />
              <span className="font-roboto text-[32px] font-semibold text-black md:text-[36px] lg:text-[39px]">
                Program
              </span>
              <span className="hidden h-[1.5px] w-[127px] border-t border-black md:block" />
            </div>
          </div>

          <div className="mt-4 inline-flex w-full max-w-[560px] flex-col items-center">
            <div className="w-full bg-gradient-to-r from-[#0E90DA] to-[#074D74] px-[45px] py-[3px]">
              <div
                className="flex h-[40px] w-full items-center justify-center rounded-full font-roboto text-[15px] font-medium text-white md:text-base whitespace-nowrap"
                style={{ background: 'transparent', color: '#ffffff' }}
              >
                Become a School That Leads, with Students Who Succeed
              </div>
            </div>

            <p className="mt-6 w-full max-w-[435px] text-center font-roboto text-[16px] font-semibold leading-[22px] text-[#0E90DA] md:text-[18px]">
              Andhra Pradesh&apos;s first and only EdTech company, dedicated to shaping the future of learning.
            </p>

            <Link
              href="#get-started"
              className="mt-8 inline-flex h-[45px] w-[180px] items-center justify-center rounded-[10px] bg-gradient-to-r from-[#0E90DA] to-[#074D74] font-roboto text-lg font-semibold text-white shadow-[0px_10px_30px_rgba(14,144,218,0.35)] transition-transform hover:-translate-y-1"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-full max-w-xl">
          <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
            <div className="absolute inset-0 -right-6 -top-8 hidden h-full w-full rounded-xl border-8 border-[#0E90DA] md:block" />
            <Image
              src="/sippics/heropic.svg"
              alt="School Integration Program Hero"
              width={540}
              height={560}
              priority
              className="relative z-[2] w-full max-w-[480px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SIPHero;
