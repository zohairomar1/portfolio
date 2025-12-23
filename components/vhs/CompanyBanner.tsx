"use client";

import { useEffect, useState } from "react";
import type { CompanyConfig } from "@/lib/companies";

interface CompanyBannerProps {
  company: CompanyConfig;
}

export function CompanyBanner({ company }: CompanyBannerProps) {
  const [frame, setFrame] = useState(0);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => { setFrame((prev) => (prev + 1) % 4); }, 166);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { setGlow((prev) => !prev); }, 1200);
    return () => clearInterval(interval);
  }, []);

  const bannerBob = [0, -2, -4, -2];
  const bobY = bannerBob[frame];
  const leftPoleX = 14, rightPoleX = 46;
  const poleBottomY = 6 + bobY;
  const shoulderY = 18, leftShoulderX = 22, rightShoulderX = 38;

  return (
    <div className="flex flex-col items-center mb-3 select-none" aria-hidden="true">
      <div style={{ transform: \`translateY(\${bobY}px)\` }} className="flex flex-col items-center">
        <div className="relative px-6 py-2 border-2 rounded-sm transition-shadow duration-700"
          style={{
            borderColor: "hsl(var(--primary))",
            backgroundColor: "hsl(var(--primary) / 0.15)",
            boxShadow: glow
              ? "0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2), inset 0 0 15px hsl(var(--primary) / 0.1)"
              : "0 0 8px hsl(var(--primary) / 0.2), inset 0 0 8px hsl(var(--primary) / 0.05)",
          }}>
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.3) 2px, hsl(var(--primary) / 0.3) 3px)" }} />
          <span className="relative font-display text-base sm:text-lg tracking-[0.25em] whitespace-nowrap"
            style={{
              color: "hsl(var(--primary))",
              textShadow: glow
                ? "0 0 10px hsl(var(--primary) / 0.6), 0 0 20px hsl(var(--primary) / 0.3)"
                : "0 0 5px hsl(var(--primary) / 0.3)",
            }}>
            {company.subtitle || "PREPARED FOR"}{" "}
            <span className="font-bold">{company.displayName}</span>
          </span>
        </div>
      </div>
      <svg width="60" height="52" viewBox="0 0 60 52" className="overflow-visible" style={{ imageRendering: "pixelated" }}>
        <defs>
          <filter id="stickman-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#stickman-glow)">
          <line x1={leftPoleX} y1={0 + bobY} x2={leftPoleX} y2={poleBottomY + 2} stroke="currentColor" strokeWidth="2" className="text-primary" opacity="0.5" />
          <line x1={rightPoleX} y1={0 + bobY} x2={rightPoleX} y2={poleBottomY + 2} stroke="currentColor" strokeWidth="2" className="text-primary" opacity="0.5" />
          <rect x={leftPoleX - 2} y={poleBottomY} width="4" height="4" rx="1" fill="currentColor" className="text-primary" />
          <rect x={rightPoleX - 2} y={poleBottomY} width="4" height="4" rx="1" fill="currentColor" className="text-primary" />
          <line x1={leftShoulderX} y1={shoulderY} x2={leftPoleX} y2={poleBottomY + 2} stroke="currentColor" strokeWidth="2" className="text-primary" />
          <line x1={rightShoulderX} y1={shoulderY} x2={rightPoleX} y2={poleBottomY + 2} stroke="currentColor" strokeWidth="2" className="text-primary" />
          <circle cx="30" cy="12" r="5" fill="currentColor" className="text-primary" />
          <line x1="30" y1="17" x2="30" y2="34" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <line x1="30" y1="34" x2="22" y2="48" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <line x1="30" y1="34" x2="38" y2="48" stroke="currentColor" strokeWidth="2" className="text-primary" />
        </g>
      </svg>
    </div>
  );
}
