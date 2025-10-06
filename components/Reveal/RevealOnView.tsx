"use client";

import React, { useEffect, useRef, useState } from "react";

type Direction = "left" | "right" | "top" | "bottom";

interface RevealOnViewProps {
  children: React.ReactNode;
  from?: Direction;
  durationMs?: number;
  delayMs?: number;
  className?: string;
}

const offsets: Record<Direction, string> = {
  left: "-translate-x-[160px]",
  right: "translate-x-[160px]",
  top: "-translate-y-[160px]",
  bottom: "translate-y-[160px]",
};

export default function RevealOnView({
  children,
  from = "bottom",
  durationMs = 1500,
  delayMs = 0,
  className = "",
}: RevealOnViewProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const base = "transition-all ease-out";
  const hidden = `opacity-0 ${offsets[from]}`;
  const shown = "opacity-100 translate-x-0 translate-y-0";
  const cls = `${base} ${inView ? shown : hidden} ${className}`;

  return (
    <div ref={ref} className={cls} style={{ transitionDuration: `${durationMs}ms`, transitionDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}


