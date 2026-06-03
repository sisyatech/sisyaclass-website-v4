"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/public/nav/logo.svg";
import LoginModal from "@/components/LoginModal";
import { useUser } from "@/components/UserContext";

interface AskMeMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AskMeMobileMenu({
    isOpen,
    onClose,
}: AskMeMobileMenuProps) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { user, isLoggedIn, logout } = useUser();

    const navLinks = [
        { label: "Solutions", href: "#solutions" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
    ];

    const handleLinkClick = () => {
        onClose();
    };

    const handleLoginClick = () => {
        onClose();
        setShowLoginModal(true);
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Slide-in Menu */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transform transition-all duration-300 ease-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <Link href="/" onClick={handleLinkClick} className="cursor-pointer">
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
                        <button
                            onClick={onClose}
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Menu Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="block py-3 px-4 text-gray-700 hover:bg-[#02bdfe]/10 hover:text-[#02bdfe] rounded-lg transition-colors duration-200 font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Buttons */}
                    <div className="p-4 border-t border-gray-200 space-y-3">
                        {isLoggedIn ? (
                            <>
                                <div className="px-4 py-3 border-b border-gray-200 mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-[#02bdfe] rounded-full flex items-center justify-center">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 text-sm">{user?.name}</div>
                                            <div className="text-xs text-gray-500">{user?.email}</div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-center px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="w-full flex items-center justify-center h-[44px] px-4 rounded-lg border-2 border-[#02bdfe] bg-white text-[#02bdfe] font-medium hover:bg-[#02bdfe]/5 transition-colors duration-200"
                            >
                                Login
                            </button>
                        )}
                        <button
                            type="button"
                            className="group relative flex items-center justify-center overflow-hidden w-full h-[44px] rounded-lg bg-[#02bdfe] px-4 text-white font-medium transition-colors cursor-pointer"
                        >
                            <span className="relative z-10">Get Started</span>
                            <span className="pointer-events-none absolute top-0 left-[-80%] h-full w-[70%] -skew-x-12 bg-white/35 opacity-0 transition-all duration-700 ease-out group-hover:left-[130%] group-hover:opacity-100" />
                        </button>
                    </div>
                </div>
            </div>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => setShowLoginModal(false)}
            />
        </>
    );
}

