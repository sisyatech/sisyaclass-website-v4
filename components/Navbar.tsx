import React from "react";
import Image from "next/image";
import Logo from "@/public/nav/logo.svg";
import ScrollEffect from "@/components/navbar/ScrollEffect";
import NavLinks from "@/components/navbar/NavLinks";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <ScrollEffect>
      <nav className="flex h-16 sm:h-18 items-center px-4 sm:px-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="object-cover w-[110px] sm:w-auto h-auto" />
          </Link>
          <div className="hidden md:block">
            <NavLinks />
          </div>
        </div>

        <div className="flex-grow" />

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Contact Us Button */}
          <a
            href="tel:+917330897291"
            className="flex items-center space-x-2 rounded-full bg-orange-100 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-orange-500 transition hover:bg-orange-300 hover:text-orange-700"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Contact Us : +91 7330897291</span>
            <span className="sm:hidden">Call</span>
          </a>

          {/* Download App Button */}
          <Button
            type="button"
            className={cn(
              "group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white bg-[#02bdfe] px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:bg-[#02bdfe]/80 focus:ring-2 focus:ring-[#02bdfe] focus:ring-offset-2 focus:outline-none active:scale-95"
            )}
          >
            <span className="relative z-10">Get the App</span>
            {/* Animated diagonal overlay */}
            <div className="absolute top-0 left-[-75%] h-full w-1/2 -rotate-12 bg-white opacity-20 transition-all duration-500 ease-in-out group-hover:left-[150%]" />
          </Button>
        </div>
      </nav>
    </ScrollEffect>
  );
};

export default Navbar;
