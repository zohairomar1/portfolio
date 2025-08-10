"use client";

import { useSettings } from "@/hooks/useSettings";

interface RecordingIndicatorProps {
  label?: string;
  className?: string;
}

export function RecordingIndicator({
  label = "REC",
  className = "",
}: RecordingIndicatorProps) {
  const { settings } = useSettings();

  return (
    <div
      className={`flex items-center gap-3 font-mono text-base sm:text-lg ${className}`}
      aria-hidden="true"
    >
      <span
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50 ${
          settings.effectsEnabled ? "animate-blink" : ""
        }`}
      />
      <span className="text-red-500 font-bold tracking-wider">{label}</span>
    </div>
  );
}
