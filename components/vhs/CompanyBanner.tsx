"use client";

import { useEffect, useState } from "react";
import type { CompanyConfig } from "@/lib/companies";

interface CompanyBannerProps {
  company: CompanyConfig;
}

export function CompanyBanner({ company }: CompanyBannerProps) {
  const [frame, setFrame] = useState(0);

  // Binary 2-frame animation — up/down only, choppy
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 2);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Frame 0 = UP (raised) + neon ON, Frame 1 = DOWN + neon OFF
  const isUp = frame === 0;
  const glow = isUp;
  const bobY = isUp ? -4 : 0;

  // Pole bottom positions (where hands grip) — fixed X, Y moves with bob
  const leftPoleX = 14;
  const rightPoleX = 46;
  const poleBottomY = 6 + bobY;

  // Shoulder position on stickman (fixed)
  const shoulderY = 18;
  const leftShoulderX = 22;
  const rightShoulderX = 38;

  // Use brand colors directly
  const brandColor = company.brandColor;
  const brandAccent = company.brandAccent;

  return (
    <div className="flex flex-col items-center mb-3 select-none" aria-hidden="true">
      {/* Banner — bobs up and down, with glow effect */}
      <div
        style={{ transform: `translateY(${bobY}px)` }}
        className="flex flex-col items-center"
      >
        <div
          className="relative px-6 py-2 border-2 rounded-sm transition-shadow duration-700"
          style={{
            borderColor: brandColor,
            backgroundColor: `${brandColor}26`,
            boxShadow: glow
              ? `0 0 20px ${brandColor}66, 0 0 40px ${brandColor}33, inset 0 0 15px ${brandColor}1a`
              : `0 0 8px ${brandColor}33, inset 0 0 8px ${brandColor}0d`,
          }}
        >
          {/* Scanline overlay on banner */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${brandColor}4d 2px, ${brandColor}4d 3px)`,
            }}
          />
          <span
            className="relative font-display text-base sm:text-lg tracking-[0.25em] whitespace-nowrap"
            style={{
              color: brandColor,
              textShadow: glow
                ? `0 0 10px ${brandColor}99, 0 0 20px ${brandColor}4d`
                : `0 0 5px ${brandColor}4d`,
            }}
          >
            {company.subtitle || "PREPARED FOR"}{" "}
            <span className="font-bold" style={{ color: brandAccent }}>
              {company.displayName}
            </span>
          </span>
        </div>
      </div>

      {/* Stickman with arms as SVG */}
      <svg
        width="60"
        height="52"
        viewBox="0 0 60 52"
        className="overflow-visible"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Stickman glow filter */}
        <defs>
          <filter id="stickman-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#stickman-glow)">
          {/* Left pole */}
          <line
            x1={leftPoleX} y1={0 + bobY}
            x2={leftPoleX} y2={poleBottomY + 2}
            stroke={brandColor} strokeWidth="2" opacity="0.5"
          />
          {/* Right pole */}
          <line
            x1={rightPoleX} y1={0 + bobY}
            x2={rightPoleX} y2={poleBottomY + 2}
            stroke={brandColor} strokeWidth="2" opacity="0.5"
          />

          {/* Left hand */}
          <rect
            x={leftPoleX - 2} y={poleBottomY}
            width="4" height="4" rx="1"
            fill={brandAccent}
          />
          {/* Right hand */}
          <rect
            x={rightPoleX - 2} y={poleBottomY}
            width="4" height="4" rx="1"
            fill={brandAccent}
          />

          {/* Left arm */}
          <line
            x1={leftShoulderX} y1={shoulderY}
            x2={leftPoleX} y2={poleBottomY + 2}
            stroke={brandColor} strokeWidth="2"
          />
          {/* Right arm */}
          <line
            x1={rightShoulderX} y1={shoulderY}
            x2={rightPoleX} y2={poleBottomY + 2}
            stroke={brandColor} strokeWidth="2"
          />

          {/* Head */}
          <circle cx="30" cy="12" r="5" fill={brandAccent} />

          {/* Body */}
          <line
            x1="30" y1="17" x2="30" y2="34"
            stroke={brandColor} strokeWidth="2"
          />

          {/* Left leg */}
          <line
            x1="30" y1="34" x2="22" y2="48"
            stroke={brandColor} strokeWidth="2"
          />
          {/* Right leg */}
          <line
            x1="30" y1="34" x2="38" y2="48"
            stroke={brandColor} strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
