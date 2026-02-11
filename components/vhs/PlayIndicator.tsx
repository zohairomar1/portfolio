"use client";

import { useSettings } from "@/hooks/useSettings";

interface PlayIndicatorProps {
  className?: string;
}

export function PlayIndicator({ className = "" }: PlayIndicatorProps) {
  const { settings } = useSettings();

  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-lg ${className}`}
      aria-hidden="true"
    >
      <span
        className={`text-primary text-sm sm:text-xl leading-none ${
          settings.effectsEnabled ? "animate-play-pulse" : ""
        }`}
        style={{
          textShadow: "0 0 8px hsl(var(--primary) / 0.6)",
        }}
      >
        ▶
      </span>
      <span
        className="text-primary font-bold tracking-wider"
        style={{
          textShadow: "0 0 6px hsl(var(--primary) / 0.4)",
        }}
      >
        PLAY
      </span>
    </div>
  );
}
