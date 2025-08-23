"use client";

import { useState, useEffect } from "react";
import { BootScreen } from "./vhs/BootScreen";

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [showBoot, setShowBoot] = useState(true);
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    const booted = sessionStorage.getItem("vhs-booted");
    if (booted === "true") {
      setShowBoot(false);
      setHasBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("vhs-booted", "true");
    setShowBoot(false);
    setHasBooted(true);
  };

  return (
    <>
      {showBoot && !hasBooted && (
        <BootScreen onComplete={handleBootComplete} />
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
