"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import Logo from "@/public/nav/logo.svg";
import LoginModal from "@/components/LoginModal";
import { useUser } from "@/components/UserContext";

interface AskMeNavbarProps {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
}

export default function AskMeNavbar({
    isMobileMenuOpen,
    toggleMobileMenu,
}: AskMeNavbarProps) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const { user, isLoggedIn, logout } = useUser();

    const navLinks = [
        { label: "Solutions", href: "#solutions" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
    ];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target as Node)
            ) {
                setIsUserDropdownOpen(false);
            }
        };

        if (isUserDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isUserDropdownOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 sm:h-18 items-center px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="cursor-pointer">
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={200}
                            height={53}
                            priority
                            fetchPriority="high"
                            className="object-cover w-[110px] sm:w-auto h-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/logo.png";
                            }}
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-[#02bdfe] transition-colors duration-200 font-medium text-sm lg:text-base"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                        {/* User Icon or Login Button */}
                        {isLoggedIn ? (
                            <div
                                ref={userDropdownRef}
                                className="flex items-center space-x-2 relative"
                            >
                                <div
                                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                                    onClick={() => setIsUserDropdownOpen((p) => !p)}
                                >
                                    <div className="w-8 h-8 bg-[#02bdfe] rounded-full flex items-center justify-center hover:bg-[#02bdfe]/80 transition-colors">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                </div>

                                <div
                                    className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${isUserDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                                        }`}
                                >
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                            <div className="font-medium">{user?.name}</div>
                                            <div className="text-xs text-gray-500">{user?.email}</div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsUserDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="flex items-center justify-center h-[36px] px-4 lg:px-6 rounded-lg border-2 border-[#02bdfe] bg-white text-[#02bdfe] font-medium text-sm lg:text-base hover:bg-[#02bdfe]/5 transition-colors duration-200 cursor-pointer"
                            >
                                Login
                            </button>
                        )}
                        <button
                            type="button"
                            className="group relative flex items-center justify-center overflow-hidden h-[36px] rounded-lg bg-[#02bdfe] px-4 lg:px-6 text-sm lg:text-base font-medium text-white transition-colors cursor-pointer"
                        >
                            <span className="relative z-10">Get Started</span>
                            <span className="pointer-events-none absolute top-0 left-[-80%] h-full w-[70%] -skew-x-12 bg-white/35 opacity-0 transition-all duration-700 ease-out group-hover:left-[130%] group-hover:opacity-100" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </nav>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => setShowLoginModal(false)}
            />
        </>
    );
}

