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
      <nav className="flex h-18 items-center px-6">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="object-cover" />
          </Link>
          <NavLinks />
        </div>

        <div className="flex-grow"></div>

        <div className="flex space-x-4">
          {/* Contact Us Button */}
          <a
            href="tel:+917330897291"
            className="flex items-center space-x-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-500 transition hover:bg-orange-300 hover:text-orange-700"
          >
            <Phone className="h-4 w-4" />
            <span>Contact Us : +91 7330897291</span>
          </a>

          {/* Download App Button */}
          <Button
            type="button"
            className={cn(
              "group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white bg-[#02bdfe] px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#02bdfe]/80 focus:ring-2 focus:ring-[#02bdfe] focus:ring-offset-2 focus:outline-none active:scale-95"
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
