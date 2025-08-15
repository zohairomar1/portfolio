"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSettings } from "@/hooks/useSettings";

export function StaticTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings.effectsEnabled) return;

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, settings.effectsEnabled]);

  if (!isTransitioning || !settings.effectsEnabled) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none animate-fadeIn"
      aria-hidden="true"
    >
      {/* Static noise effect */}
      <div
        className="absolute inset-0 animate-static"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(0, 0, 0, 0.1) 50%
            )
          `,
          backgroundSize: "100% 4px, 100% 4px",
        }}
      />

      {/* Color bars flash */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full flex">
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-cyan-400" />
          <div className="flex-1 bg-green-400" />
          <div className="flex-1 bg-purple-500" />
          <div className="flex-1 bg-red-500" />
          <div className="flex-1 bg-blue-500" />
        </div>
      </div>
    </div>
  );
}
