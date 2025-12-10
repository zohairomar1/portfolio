"use client";

import { useState, useEffect } from "react";
import { BootScreen } from "./vhs/BootScreen";
import type { CompanyConfig } from "@/lib/companies";

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [showBoot, setShowBoot] = useState(true);
  const [hasBooted, setHasBooted] = useState(false);
  const [companyConfig, setCompanyConfig] = useState<CompanyConfig | null>(null);

  // Check if user has already seen boot screen this session
  useEffect(() => {
    const booted = sessionStorage.getItem("vhs-booted");
    if (booted === "true") {
      setShowBoot(false);
      setHasBooted(true);
      return;
    }

    // Check for company personalization
    const companyData = sessionStorage.getItem("vhs-company");
    if (companyData) {
      try {
        setCompanyConfig(JSON.parse(companyData));
      } catch {
        // Ignore malformed data
      }
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("vhs-booted", "true");
    // Keep vhs-company in sessionStorage so home page can read it
    setShowBoot(false);
    setHasBooted(true);
  };

  return (
    <>
      {showBoot && !hasBooted && (
        <BootScreen onComplete={handleBootComplete} company={companyConfig} />
      )}
      <div
        className={`transition-opacity duration-500 ${
          showBoot && !hasBooted ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
