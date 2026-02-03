"use client";

import { useState, useEffect } from "react";
import { DVDMenu } from "@/components/menu/DVDMenu";
import { TimeIndicator } from "@/components/vhs/TimeIndicator";
import { RecordingIndicator } from "@/components/vhs/RecordingIndicator";
import { TypeWriter } from "@/components/vhs/TypeWriter";
import { CompanyBanner } from "@/components/vhs/CompanyBanner";
import { useSettings } from "@/hooks/useSettings";
import type { CompanyConfig } from "@/lib/companies";
import directorsPickData from "@/content/directors-pick.json";

export default function HomePage() {
  const { settings } = useSettings();
  const [company, setCompany] = useState<CompanyConfig | null>(null);

  useEffect(() => {
    const companyData = sessionStorage.getItem("vhs-company");
    if (companyData) {
      try {
        setCompany(JSON.parse(companyData));
      } catch {
        // Ignore malformed data
      }
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* VHS tape label effect at top */}
      <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-start">
        <RecordingIndicator />
        <TimeIndicator mode="countdown" />
      </div>

      {/* Main content */}
      <div className="max-w-2xl w-full text-center mb-8 animate-fadeIn">
        {/* Company Banner - 8-bit stickman with banner */}
        {company && <CompanyBanner company={company} />}

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-primary vhs-text mb-4">
          <TypeWriter text="ZOHAIR OMAR" speed={80} delay={200} />
        </h1>

        {/* Tagline */}
        <p className="font-mono text-sm sm:text-base text-muted-foreground mb-2">
          Full-Stack Developer + Data/BI
        </p>
        <p className="font-mono text-xs text-muted-foreground/70 mb-8">
          Building products backed by metrics
        </p>

        {/* Subtitle hint */}
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

      {/* Disclaimer for custom/tailored mode */}
      {directorsPickData.custom && directorsPickData.targetCompany && (
        <div className="absolute bottom-14 sm:bottom-16 left-0 right-0 text-center">
          <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wider">
            Independent portfolio page. Not affiliated with {directorsPickData.targetCompany}.
          </p>
        </div>
      )}

      {/* Bottom tape info */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex justify-between items-end text-xs sm:text-base font-mono text-muted-foreground/60">
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
