"use client";

import { DVDMenu } from "@/components/menu/DVDMenu";
import { TimeIndicator } from "@/components/vhs/TimeIndicator";
import { RecordingIndicator } from "@/components/vhs/RecordingIndicator";
import { TypeWriter } from "@/components/vhs/TypeWriter";
import { useSettings } from "@/hooks/useSettings";

export default function HomePage() {
  const { settings } = useSettings();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* VHS tape label effect at top */}
      <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-start">
        <RecordingIndicator />
        <TimeIndicator mode="countdown" />
      </div>

      {/* Main content */}
      <div className="max-w-2xl w-full text-center mb-8 animate-fadeIn">
        {/* Title */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-primary vhs-text mb-4">
          <TypeWriter text="ZOHAIR OMAR" speed={120} delay={300} />
        </h1>

        {/* Tagline */}
        <p className="font-mono text-sm sm:text-base text-muted-foreground mb-2">
          Full-Stack Developer + Data/BI
        </p>
        <p className="font-mono text-xs text-muted-foreground/70 mb-8">
          Building products backed by metrics
        </p>

        {settings.subtitlesEnabled && (
          <p className="text-xs text-muted-foreground mb-4 animate-pulse">
            Navigate with keyboard or mouse
          </p>
        )}
      </div>

      {/* DVD Menu */}
      <div className="w-full max-w-md animate-slideUp">
        <DVDMenu />
      </div>

      {/* Bottom tape info */}
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex justify-between items-end text-sm sm:text-base font-mono text-muted-foreground/60">
        <div className="space-y-1">
          <p className="tracking-wider">PORTFOLIO</p>
          <p className="text-primary/50 font-bold">VHS-001</p>
        </div>
        <div className="text-right space-y-1">
          <p className="tracking-wider">SP MODE</p>
          <p className="text-primary/50 font-bold">STEREO</p>
        </div>
      </div>
    </main>
  );
}
