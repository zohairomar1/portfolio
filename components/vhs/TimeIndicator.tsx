"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { formatTimecode } from "@/lib/utils";

interface TimeIndicatorProps {
  mode?: "countdown" | "progress";
  className?: string;
}

export function TimeIndicator({
  mode = "countdown",
  className = "",
}: TimeIndicatorProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [time, setTime] = useState(5400); // 1:30:00 fake runtime
  const [scrollProgress, setScrollProgress] = useState(0);

  // Countdown timer for home page
  useEffect(() => {
    if (!isHomePage || mode !== "countdown") return;

    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 5400));
    }, 1000);

    return () => clearInterval(interval);
  }, [isHomePage, mode]);

  // Scroll progress for inner pages
  useEffect(() => {
    if (isHomePage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  if (isHomePage) {
    return (
      <div
        className={`font-mono text-[10px] sm:text-base text-muted-foreground ${className}`}
        aria-label="Time remaining on disc"
      >
        <span className="text-primary/70 tracking-wider hidden sm:inline">TIME LEFT</span>{" "}
        <span className="text-primary font-bold text-xs sm:text-lg">{formatTimecode(time)}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-28 sm:w-32 h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <span className="font-mono text-sm sm:text-base text-muted-foreground font-bold">
        {Math.round(scrollProgress)}%
      </span>
    </div>
  );
}
