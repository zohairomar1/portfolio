"use client";

import { useState, useEffect, useCallback } from "react";
import { DVDMenu } from "@/components/menu/DVDMenu";
import { TimeIndicator } from "@/components/vhs/TimeIndicator";
import { PlayIndicator } from "@/components/vhs/PlayIndicator";
import { TypeWriter } from "@/components/vhs/TypeWriter";
import { CompanyBanner } from "@/components/vhs/CompanyBanner";
import { DateStamp } from "@/components/vhs/DateStamp";
import { useSettings } from "@/hooks/useSettings";
import type { CompanyConfig } from "@/lib/companies";

export default function HomePage() {
  const { settings } = useSettings();
  const [company, setCompany] = useState<CompanyConfig | null>(null);

  // Check if this is a revisit (skip slow intro)
  const [isRevisit] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("vhs-intro-seen") === "1";
  });

  // Staggered load-in sequence
  const [showTopBar, setShowTopBar] = useState(isRevisit);
  const [showTagline, setShowTagline] = useState(isRevisit);
  const [showMenu, setShowMenu] = useState(isRevisit);
  const [showBottom, setShowBottom] = useState(isRevisit);
  const [titleNeon, setTitleNeon] = useState(isRevisit);

  useEffect(() => {
    const companyData = sessionStorage.getItem("vhs-company");
    if (companyData) {
      try {
        setCompany(JSON.parse(companyData));
      } catch {
        // Ignore malformed data
      }
    }

    if (!isRevisit) {
      // Orchestrate cinematic load-in (first visit)
      setTimeout(() => setShowTopBar(true), 100);
    }
  }, [isRevisit]);

  const handleTypewriterComplete = useCallback(() => {
    // After title finishes typing, trigger neon flicker then reveal rest
    setTitleNeon(true);
    sessionStorage.setItem("vhs-intro-seen", "1");
    setTimeout(() => setShowTagline(true), 200);
    setTimeout(() => setShowMenu(true), 500);
    setTimeout(() => setShowBottom(true), 800);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* VHS tape label effect at top */}
      <div
        className={`absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-start transition-opacity duration-500 ${
          showTopBar ? "opacity-100" : "opacity-0"
        }`}
      >
        <PlayIndicator />
        <TimeIndicator mode="countdown" />
      </div>

      {/* Main content */}
      <div className="max-w-2xl w-full text-center mb-8">
        {/* Company Banner - 8-bit stickman with banner */}
        {company && <CompanyBanner company={company} />}

        {/* Title with neon flicker after typewriter completes */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-7xl text-primary mb-4 ${
            titleNeon ? "vhs-text animate-neon-on" : ""
          }`}
        >
          <TypeWriter text="ZOHAIR OMAR" speed={isRevisit ? 0 : 80} delay={isRevisit ? 0 : 300} onComplete={handleTypewriterComplete} />
        </h1>

        {/* Tagline - slides up with chromatic reveal after title */}
        <div
          className={`transition-all duration-700 ${
            showTagline
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <p className="font-mono text-sm sm:text-base text-muted-foreground mb-2">
            Full-Stack Developer + Data/BI
          </p>
          <p className="font-mono text-xs text-muted-foreground/70 mb-8">
            Building products backed by metrics
          </p>
        </div>

        {/* Subtitle hint */}
        {settings.subtitlesEnabled && showTagline && (
          <p className="text-xs text-muted-foreground mb-4 animate-pulse">
            Navigate with keyboard or mouse
          </p>
        )}
      </div>

      {/* DVD Menu - slides up after tagline */}
      <div
        className={`w-full max-w-md transition-all duration-500 ${
          showMenu
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <DVDMenu isCompanyMode={!!company} />
      </div>

      {/* Disclaimer for custom/tailored mode - only when user arrived via /for/[company] */}
      {company && showMenu && (
        <div className="mt-6 text-center">
          <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wider">
            Independent portfolio page. Not affiliated with {company.displayName}.
          </p>
        </div>
      )}

      {/* Bottom tape info - fades in last */}
      <div
        className={`absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex justify-between items-end transition-opacity duration-700 ${
          showBottom ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="space-y-1 text-xs sm:text-base font-mono text-muted-foreground/60">
          <p className="tracking-wider">PORTFOLIO</p>
          <p className="text-primary/50 font-bold">VHS-001</p>
        </div>
        <DateStamp />
      </div>
    </main>
  );
}
