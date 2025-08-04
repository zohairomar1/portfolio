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
    >
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />

      {/* Grain/Noise */}
      {settings.grainEnabled && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* CRT curvature effect (subtle) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Flicker effect */}
      {settings.flickerIntensity !== "low" && (
        <div
          className={`absolute inset-0 bg-white/[0.01] ${
            settings.flickerIntensity === "high"
              ? "animate-flicker"
              : "animate-flicker-slow"
          }`}
        />
      )}
    </div>
  );
}
