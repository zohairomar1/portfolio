"use client";

import { useSettings } from "@/hooks/useSettings";

interface VHSOverlayProps {
  className?: string;
}

export function VHSOverlay({ className = "" }: VHSOverlayProps) {
  const { settings } = useSettings();

  if (!settings.effectsEnabled) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[100] ${className}`}
      aria-hidden="true"
      style={{ contain: "strict" }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
