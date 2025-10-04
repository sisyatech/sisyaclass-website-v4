"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React from "react";

const ScrollEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0.05, 0.7]);
  const blur = useTransform(scrollY, [0, 50], [5, 30]);

  const springBgOpacity = useSpring(bgOpacity, { stiffness: 100, damping: 20 });
  const springBlur = useSpring(blur, { stiffness: 100, damping: 20 });

  const bgColor = useTransform(springBgOpacity, (v) => `rgba(20, 20, 25, ${v})`);
  const blurValue = useTransform(springBlur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        backgroundColor: bgColor,
        backdropFilter: blurValue,
        WebkitBackdropFilter: blurValue, // Safari
      }}
      className="sticky top-0 z-50 border-b border-white/10 shadow-sm"
    >
      {children}
    </motion.div>
  );
};

export default ScrollEffect;
