"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "glitch" | "scanline" | "tape" | "flicker" | "chromatic";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "scanline",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, hasAnimated]);

  const getVariantClasses = () => {
    if (!isVisible) {
      return "opacity-0 translate-y-4";
    }

    switch (variant) {
      case "glitch":
        return "animate-glitch-reveal";
      case "scanline":
        return "animate-scanline-reveal";
      case "tape":
        return "animate-tape-reveal";
      case "flicker":
        return "animate-flicker-reveal";
      case "chromatic":
        return "animate-chromatic-reveal";
      default:
        return "opacity-100 translate-y-0";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${getVariantClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

// Section divider with VHS tape effect
export function VHSSectionDivider({ label }: { label?: string }) {
  return (
    <div className="relative py-8 my-8">
      {/* Tape lines */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Tracking distortion effect */}
      <div className="absolute inset-0 flex items-center overflow-hidden opacity-20">
        <div
          className="w-full h-4 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{ animation: "tracking-sweep 3s ease-in-out infinite" }}
        />
      </div>

      {/* Label */}
      {label && (
        <div className="relative flex justify-center">
          <span className="px-4 bg-background font-mono text-xs text-primary/60 tracking-widest uppercase">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// Animated chapter marker
export function ChapterMarker({
  number,
  title,
  timestamp
}: {
  number: number;
  title: string;
  timestamp?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex items-center gap-4 py-2 cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chapter number box */}
      <div
        className="relative w-12 h-12 border-2 border-primary/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20"
      >
        {/* Scanline effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            style={{ animation: "scanline-down 0.5s ease-out" }}
          />
        )}
        <span className="font-display text-xl text-primary relative z-10">
          {String(number).padStart(2, "0")}
        </span>
      </div>

      {/* Title with glitch effect */}
      <div className="flex-1">
        <h3
          className={`font-display text-lg transition-all duration-200 ${
            isHovered ? "text-primary vhs-text" : "text-foreground"
          }`}
        >
          {title}
        </h3>
        {timestamp && (
          <span className="font-mono text-xs text-muted-foreground">
            {timestamp}
          </span>
        )}
      </div>

      {/* Play indicator */}
      <div
        className={`w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-b-[8px] border-b-transparent transition-all duration-300 ${
          isHovered ? "border-l-primary opacity-100" : "border-l-primary/30 opacity-0"
        }`}
      />
    </div>
  );
}
