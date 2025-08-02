"use client";

import { useSettings } from "@/hooks/useSettings";
import { VHSOverlay } from "./VHSOverlay";
import { cn } from "@/lib/utils";

interface CRTWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function CRTWrapper({ children, className }: CRTWrapperProps) {
  const { settings } = useSettings();

  return (
    <div
      className={cn("min-h-screen relative", className)}
      data-effects={settings.effectsEnabled}
      data-grain={settings.grainEnabled}
      data-flicker={settings.flickerIntensity}
      data-theme={settings.theme}
    >
      {children}
      <VHSOverlay />
    </div>
  );
}
