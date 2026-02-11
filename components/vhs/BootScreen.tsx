"use client";

import { useEffect, useState, useCallback } from "react";
import { useSettings } from "@/hooks/useSettings";
import type { ThemePreset } from "@/types/resume";
import type { CompanyConfig } from "@/lib/companies";

interface BootScreenProps {
  onComplete: () => void;
  company?: CompanyConfig | null;
}

// Theme color mappings for live preview
const baseThemeColors: Record<string, { primary: string; accent: string }> = {
  "crt-blue": { primary: "#00d4ff", accent: "#67e8f9" },
  "vhs-purple": { primary: "#a855f7", accent: "#ec4899" },
  "test-card": { primary: "#ffffff", accent: "#facc15" },
};

// Loading messages for sci-fi effect
const LOADING_MESSAGES = [
  "INITIALIZING SYSTEM...",
  "SCANNING TAPE HEADS...",
  "CALIBRATING TRACKING...",
  "LOADING MAGNETIC DATA...",
  "SYNCING VIDEO SIGNAL...",
  "BUFFERING FRAMES...",
  "READY",
];

export function BootScreen({ onComplete, company }: BootScreenProps) {
  const { settings, updateSettings } = useSettings();
  const [phase, setPhase] = useState<
    "power-on" | "static" | "tracking" | "unlock" | "loading" | "ready" | "done"
  >("power-on");
  const [trackingOffset, setTrackingOffset] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemePreset>(
    company?.brandColor ? "company" : settings.theme
  );
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [glitchText, setGlitchText] = useState(false);
  const [scanlinePos, setScanlinePos] = useState(0);
  const [showRewind, setShowRewind] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showCompanyThemeBtn, setShowCompanyThemeBtn] = useState(false);
  const [unlockFadingOut, setUnlockFadingOut] = useState(false);

  // Build theme colors map — add company entry if present
  const themeColors: Record<string, { primary: string; accent: string }> = {
    ...baseThemeColors,
    ...(company?.brandColor
      ? { company: { primary: company.brandColor, accent: company.brandAccent } }
      : {}),
  };

  const hasCompanyTheme = Boolean(company?.brandColor);
  const themes: ThemePreset[] = hasCompanyTheme
    ? ["crt-blue", "vhs-purple", "test-card", "company"]
    : ["crt-blue", "vhs-purple", "test-card"];

  // Get current theme colors for live preview
  const currentColors = themeColors[selectedTheme] || baseThemeColors["crt-blue"];

  // Phase transitions
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Power on (CRT warm up)
    timers.push(setTimeout(() => setPhase("static"), 400));

    // Static phase
    timers.push(setTimeout(() => setPhase("tracking"), 900));

    // Tracking phase → unlock (recruiter) or loading (normal)
    if (company) {
      timers.push(setTimeout(() => setPhase("unlock"), 1700));
      // Let text stay visible for ~1s after last text appears, then fade out
      timers.push(setTimeout(() => setUnlockFadingOut(true), 5200));
      timers.push(setTimeout(() => setPhase("loading"), 5900));
    } else {
      timers.push(setTimeout(() => setPhase("loading"), 1700));
    }

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tracking effect
  useEffect(() => {
    if (phase !== "tracking") return;

    const interval = setInterval(() => {
      setTrackingOffset((prev) => (prev + 1) % 100);
    }, 40);

    return () => clearInterval(interval);
  }, [phase]);

  // Loading progress with message cycling
  useEffect(() => {
    if (phase !== "loading" && phase !== "ready") return;
    if (phase === "ready") return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + (Math.random() * 4 + 1);

        // Update message based on progress
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * LOADING_MESSAGES.length),
          LOADING_MESSAGES.length - 1
        );
        setCurrentMessage(messageIndex);

        if (newProgress >= 100) {
          setPhase("ready");
          setShowConfig(true);
          // Show PORTFOLIO text with delay after loading complete
          setTimeout(() => setShowPortfolio(true), 300);
          // Pop in company theme button with delay
          if (company) setTimeout(() => setShowCompanyThemeBtn(true), 600);
          return 100;
        }
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [phase]);

  // Scanline sweep effect — smooth and slow like a real TV
  useEffect(() => {
    let raf: number;
    let pos = 0;
    const speed = 0.08; // very slow drift
    const step = () => {
      pos = (pos + speed) % 120;
      setScanlinePos(pos);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.92) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 80);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Rewind animation on theme change
  useEffect(() => {
    setShowRewind(true);
    const timer = setTimeout(() => setShowRewind(false), 300);
    return () => clearTimeout(timer);
  }, [selectedTheme]);

  const handleStart = useCallback(() => {
    updateSettings({
      theme: selectedTheme,
      soundEnabled: soundEnabled,
    });
    setPhase("done");
    setTimeout(() => {
      onComplete();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        const menu = document.querySelector('[data-menu="dvd-menu"]');
        if (menu) {
          menu.classList.add("menu-highlight");
          setTimeout(() => menu.classList.remove("menu-highlight"), 2000);
        }
      }, 100);
    }, 500);
  }, [selectedTheme, soundEnabled, updateSettings, onComplete]);

  // Enter/Space to start only when ready
  useEffect(() => {
    if (phase !== "ready" || !showConfig) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleStart();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, showConfig, handleStart]);

  if (phase === "done") {
    return (
      <div className="fixed inset-0 z-[9999] bg-background animate-fadeOut pointer-events-none" />
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      style={
        {
          "--boot-primary": currentColors.primary,
          "--boot-accent": currentColors.accent,
        } as React.CSSProperties
      }
    >
      {/* CRT Power-on effect */}
      {phase === "power-on" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-white"
            style={{
              width: "100%",
              height: "2px",
              animation: "crt-on 0.4s ease-out forwards",
            }}
          />
        </div>
      )}

      {/* Scanline sweep — smooth drift, pixelated look */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: `${scanlinePos - 10}%`,
          height: "6px",
          background: `var(--boot-primary)`,
          opacity: 0.12,
          boxShadow: `0 0 30px 12px var(--boot-primary)`,
          imageRendering: "pixelated",
        }}
      />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none" />

      {/* Static noise phase */}
      {phase === "static" && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              animation: "static 0.08s steps(10) infinite",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span
                className="font-mono text-xl tracking-[0.3em] animate-pulse block"
                style={{ color: "var(--boot-primary)" }}
              >
                NO SIGNAL
              </span>
              <div className="mt-4 flex gap-1 justify-center">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full animate-bounce"
                    style={{
                      background: "var(--boot-primary)",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking lines phase - SCI-FI STYLE */}
      {phase === "tracking" && (
        <div className="absolute inset-0">
          {/* Horizontal tracking bars */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-8"
              style={{
                top: `${((trackingOffset * 1.5 + i * 14) % 140) - 20}%`,
                background: `linear-gradient(to bottom, transparent, var(--boot-primary)15, var(--boot-primary)30, var(--boot-primary)15, transparent)`,
                transform: `translateX(${Math.sin((trackingOffset + i) * 0.12) * 15}px) skewX(${Math.sin((trackingOffset + i) * 0.08) * 3}deg)`,
                opacity: 0.6,
              }}
            />
          ))}

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center relative">
              {/* Main title */}
              <h1
                className="font-display text-3xl sm:text-5xl lg:text-7xl mb-6 transition-all duration-200"
                style={{
                  color: "var(--boot-primary)",
                  textShadow: `0 0 10px color-mix(in srgb, var(--boot-primary) 60%, transparent), 0 0 25px color-mix(in srgb, var(--boot-primary) 25%, transparent)`,
                  opacity: glitchText ? 0.5 : 1,
                  transform: glitchText ? "translateX(3px)" : "none",
                }}
              >
                ZOHAIR OMAR
              </h1>

              {/* Sci-fi loading box */}
              <div
                className="border px-4 sm:px-8 py-4 relative"
                style={{ borderColor: `var(--boot-primary)40` }}
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: "var(--boot-primary)" }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: "var(--boot-primary)" }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: "var(--boot-primary)" }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: "var(--boot-primary)" }} />

                {/* Status text */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 justify-center">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "var(--boot-primary)", boxShadow: `0 0 10px var(--boot-primary)` }}
                    />
                    <span
                      className="font-mono text-sm tracking-[0.2em]"
                      style={{ color: "var(--boot-primary)" }}
                    >
                      SYSTEM BOOT SEQUENCE
                    </span>
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "var(--boot-primary)", boxShadow: `0 0 10px var(--boot-primary)` }}
                    />
                  </div>

                  {/* Animated dots */}
                  <div className="flex gap-1.5 justify-center mt-3">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all duration-200"
                        style={{
                          background: i <= (trackingOffset % 7) ? "var(--boot-primary)" : "#333",
                          boxShadow: i <= (trackingOffset % 7) ? `0 0 8px var(--boot-primary)` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hexagon decorations */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-30 hidden sm:block">
                <div
                  className="w-8 h-8 rotate-45 border-2"
                  style={{ borderColor: "var(--boot-primary)", animation: "spin 4s linear infinite" }}
                />
              </div>
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-30 hidden sm:block">
                <div
                  className="w-8 h-8 rotate-45 border-2"
                  style={{ borderColor: "var(--boot-primary)", animation: "spin 4s linear infinite reverse" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter unlock phase */}
      {phase === "unlock" && company && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-fadeIn transition-all duration-500"
          style={{
            opacity: unlockFadingOut ? 0 : 1,
            transform: unlockFadingOut ? 'scale(0.95) translateY(-20px)' : 'scale(1) translateY(0)',
            filter: unlockFadingOut ? 'blur(4px)' : 'blur(0)',
          }}
        >
          <div className="text-center">
            {/* Lock icon */}
            <div className="relative mx-auto w-20 h-24 mb-6">
              {/* Expanding ring pulse — fires after shackle opens */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
                style={{
                  border: `2px solid var(--boot-primary)`,
                  opacity: 0,
                  animation: 'unlock-ring 1s ease-out 1.8s forwards',
                }}
              />
              {/* Lock body */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 rounded-sm"
                style={{
                  border: `2px solid var(--boot-primary)`,
                  background: `color-mix(in srgb, var(--boot-primary) 10%, transparent)`,
                  boxShadow: `0 0 15px var(--boot-primary), inset 0 0 8px var(--boot-primary)`,
                }}
              />
              {/* Lock shackle — opens outward to the right */}
              <div
                className="absolute top-0 w-10 h-12 rounded-t-full"
                style={{
                  left: 'calc(50% - 20px)',
                  border: `2px solid var(--boot-primary)`,
                  borderBottom: 'none',
                  transformOrigin: 'right bottom',
                  animation: 'lock-open 1.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.6s forwards',
                }}
              />
            </div>

            {/* ACCESS GRANTED */}
            <div
              className="font-mono text-base sm:text-lg tracking-[0.4em] mb-2 font-bold"
              style={{
                color: 'var(--boot-primary)',
                textShadow: '0 0 20px var(--boot-primary)',
                animation: 'access-text-in 0.7s ease-out 2.0s both',
              }}
            >
              ACCESS GRANTED
            </div>

            {/* Positive reinforcement */}
            <div
              className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-400 mb-1"
              style={{
                animation: 'access-text-in 0.6s ease-out 2.4s both',
              }}
            >
              PERSONALIZED CONTENT UNLOCKED
            </div>
            <div
              className="font-mono text-[10px] sm:text-xs tracking-wide"
              style={{
                color: 'var(--boot-accent)',
                animation: 'access-text-in 0.6s ease-out 2.8s both',
              }}
            >
              This page was built just for you.
            </div>

            {/* Decorative lines */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div
                style={{
                  height: '1px',
                  background: 'var(--boot-primary)',
                  animation: 'line-expand 1s ease-out 1.8s both',
                }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{
                  border: `1px solid var(--boot-primary)`,
                  boxShadow: `0 0 6px var(--boot-primary)`,
                  animation: 'access-text-in 0.4s ease-out 2.0s both',
                }}
              />
              <div
                style={{
                  height: '1px',
                  background: 'var(--boot-primary)',
                  animation: 'line-expand 1s ease-out 1.8s both',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* PLAY indicator */}
      {(phase === "loading" || phase === "ready") && (
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 sm:gap-3 animate-fadeIn">
          <div
            className="w-0 h-0 border-t-[8px] sm:border-t-[14px] border-t-transparent border-b-[8px] sm:border-b-[14px] border-b-transparent border-l-[13px] sm:border-l-[22px]"
            style={{ borderLeftColor: "var(--boot-primary)" }}
          />
          <span
            className="font-display text-base sm:text-2xl tracking-wider"
            style={{ color: "var(--boot-primary)" }}
          >
            PLAY
          </span>
        </div>
      )}

      {/* Rewind flash on theme change */}
      {showRewind && phase === "ready" && (
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 animate-pulse">
          <span
            className="font-mono text-xs sm:text-sm tracking-wider"
            style={{ color: "var(--boot-primary)" }}
          >
            ◀◀ REWIND
          </span>
        </div>
      )}

      {/* Counter display */}
      {(phase === "loading" || phase === "ready") && !showRewind && (
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 animate-fadeIn">
          <span
            className="font-mono text-xs sm:text-lg tabular-nums"
            style={{ color: "var(--boot-primary)" }}
          >
            {String(Math.floor(loadingProgress / 60)).padStart(2, "0")}:
            {String(Math.floor(loadingProgress % 60)).padStart(2, "0")}:
            {String(Math.floor((loadingProgress * 30) % 100)).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Main content area - Loading & Config */}
      {(phase === "loading" || phase === "ready") && (
        <div className="relative w-full max-w-2xl px-4 sm:px-8 animate-fadeIn">
          {/* VHS Label */}
          <div
            className={`text-center mb-4 sm:mb-8 transition-all duration-200 ${
              glitchText ? "translate-x-1" : ""
            }`}
            style={{
              filter: glitchText ? "hue-rotate(90deg)" : "none",
            }}
          >
            <h1
              className="font-display text-2xl sm:text-5xl lg:text-7xl mb-1 sm:mb-3 transition-colors duration-300"
              style={{
                color: "var(--boot-primary)",
                textShadow: `0 0 8px color-mix(in srgb, var(--boot-primary) 60%, transparent), 0 0 20px color-mix(in srgb, var(--boot-primary) 30%, transparent)`,
              }}
            >
              {glitchText ? "Z0H41R 0M4R" : "ZOHAIR OMAR"}
            </h1>

            {/* PORTFOLIO / Company text - only shows after loading complete */}
            <div
              className="h-8 overflow-hidden transition-all duration-500"
              style={{ opacity: showPortfolio ? 1 : 0, transform: showPortfolio ? "translateY(0)" : "translateY(-10px)" }}
            >
              {company ? (
                <p className="font-mono text-[10px] sm:text-xs text-gray-400 tracking-wide text-center">
                  Personalized portfolio for{" "}
                  <span style={{ color: "var(--boot-primary)" }}>
                    {company.subtitle || "you"}
                  </span>
                  {" "}@{" "}
                  <span style={{ color: "var(--boot-primary)" }}>
                    {company.displayName}
                  </span>
                </p>
              ) : (
                <p className="font-mono text-sm text-gray-400 tracking-[0.3em] text-center">
                  PORTFOLIO
                </p>
              )}
            </div>
          </div>

          {/* Main progress bar - gray filling with theme color */}
          <div className="mb-4 sm:mb-8">
            <div className="relative">
              {/* Progress bar container */}
              <div className="h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden relative">
                {/* Animated fill */}
                <div
                  className="h-full transition-all duration-100 rounded-full relative"
                  style={{
                    width: `${loadingProgress}%`,
                    background: `linear-gradient(90deg, var(--boot-primary), var(--boot-accent))`,
                    boxShadow: `0 0 15px var(--boot-primary), 0 0 30px var(--boot-primary)`,
                  }}
                >
                  {/* Shimmer effect on progress */}
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      animation: "shimmer 1s infinite",
                    }}
                  />
                </div>
              </div>

              {/* Progress percentage */}
              <div className="flex justify-between mt-1.5 sm:mt-2 font-mono text-[10px] sm:text-xs">
                <span className="text-gray-500">{Math.floor(loadingProgress)}%</span>
                <span style={{ color: "var(--boot-primary)" }}>
                  {LOADING_MESSAGES[currentMessage]}
                </span>
                <span className="text-gray-500">100%</span>
              </div>
            </div>
          </div>

          {/* Config panel - only shows when ready */}
          {showConfig && (
            <div
              className="animate-slideUp space-y-3 sm:space-y-5 border p-4 sm:p-6 backdrop-blur-sm"
              style={{
                borderColor: `color-mix(in srgb, ${currentColors.primary} 30%, transparent)`,
                background: "rgba(0,0,0,0.8)",
              }}
            >
              <div className="text-center font-mono text-xs text-gray-400 tracking-widest">
                CONFIGURE YOUR EXPERIENCE
              </div>

              {/* Theme selector */}
              <div className="space-y-3">
                <label
                  className="font-mono text-xs uppercase tracking-wider pl-2.5"
                  style={{ color: "#EDEDED", borderLeft: "2px solid var(--boot-primary)" }}
                >
                  Color Theme
                </label>
                <div className={`grid gap-2 ${hasCompanyTheme ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                  {themes.map((theme) => {
                    const colors = themeColors[theme];
                    const isCompany = theme === "company";
                    const isSelected = selectedTheme === theme;
                    const label =
                      theme === "crt-blue"
                        ? "CRT Blue"
                        : theme === "vhs-purple"
                        ? "VHS Purple"
                        : theme === "test-card"
                        ? "Test Card"
                        : company?.displayName || "Custom";

                    if (isCompany) {
                      return (
                        <div
                          key={theme}
                          className={`relative col-span-2 sm:col-span-1 ${
                            showCompanyThemeBtn
                              ? "animate-theme-pop-in"
                              : "opacity-0 scale-75 pointer-events-none"
                          }`}
                        >
                          {/* DIRECTOR'S PICK tape label - overlays the top border */}
                          <span
                            className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 font-mono text-[9px] tracking-wider whitespace-nowrap z-10"
                            style={{
                              background: colors.primary,
                              color: "#000",
                              boxShadow: `0 0 8px ${colors.primary}80`,
                            }}
                          >
                            ◀◀ DIRECTOR&apos;S PICK
                          </span>

                          <button
                            onClick={() => setSelectedTheme(theme)}
                            className={`relative w-full h-full py-2 sm:py-3 px-3 border-2 transition-all font-mono text-xs overflow-visible ${
                              showCompanyThemeBtn && !isSelected ? "animate-theme-attention" : ""
                            }`}
                            style={{
                              borderColor: colors.primary,
                              background: isSelected
                                ? `color-mix(in srgb, ${colors.primary} 20%, transparent)`
                                : `color-mix(in srgb, ${colors.primary} 8%, transparent)`,
                              color: colors.primary,
                              boxShadow: `0 0 12px ${colors.primary}40, inset 0 0 12px ${colors.primary}15`,
                            }}
                          >
                            {/* Scanline overlay */}
                            <div
                              className="absolute inset-0 pointer-events-none opacity-15"
                              style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${colors.primary} 2px, ${colors.primary} 3px)`,
                              }}
                            />

                            <div
                              className="w-4 sm:w-5 h-4 sm:h-5 rounded-full mx-auto mb-1.5 sm:mb-2 transition-transform relative"
                              style={{
                                background: colors.primary,
                                transform: isSelected ? "scale(1.2)" : "scale(1)",
                                boxShadow: `0 0 15px ${colors.primary}`,
                              }}
                            >
                              <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                  border: `2px solid ${colors.primary}`,
                                  animation: "company-dot-pulse 1.5s ease-in-out infinite",
                                }}
                              />
                            </div>
                            <span className="font-bold">{label}</span>
                            {!isSelected && (
                              <span
                                className="block mt-1 text-[8px] tracking-wider opacity-80"
                                style={{ color: colors.accent }}
                              >
                                CURATED FOR YOU
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={theme}
                        onClick={() => setSelectedTheme(theme)}
                        className="relative flex-1 py-2 sm:py-3 px-3 border transition-all font-mono text-xs overflow-hidden"
                        style={{
                          borderColor: isSelected
                            ? colors.primary
                            : "#333",
                          background: isSelected
                            ? `color-mix(in srgb, ${colors.primary} 20%, transparent)`
                            : "transparent",
                          color: isSelected ? colors.primary : "#888",
                        }}
                      >
                        <div
                          className="w-4 sm:w-5 h-4 sm:h-5 rounded-full mx-auto mb-1.5 sm:mb-2 transition-transform"
                          style={{
                            background: colors.primary,
                            transform: isSelected ? "scale(1.2)" : "scale(1)",
                            boxShadow: isSelected
                              ? `0 0 15px ${colors.primary}`
                              : "none",
                          }}
                        />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sound toggle */}
              <div className="flex items-center justify-between py-1 sm:py-2">
                <label
                  className="font-mono text-xs uppercase tracking-wider pl-2.5"
                  style={{ color: "#EDEDED", borderLeft: "2px solid var(--boot-primary)" }}
                >
                  Sound Effects
                </label>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="w-14 h-7 rounded-full relative transition-all"
                  style={{
                    background: soundEnabled ? "var(--boot-primary)" : "#333",
                    boxShadow: soundEnabled ? `0 0 10px var(--boot-primary)` : "none",
                  }}
                >
                  <div
                    className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all"
                    style={{ left: soundEnabled ? "calc(100% - 24px)" : "4px" }}
                  />
                </button>
              </div>

              {/* Start button - NO SKIP, only INSERT TAPE when ready */}
              <button
                onClick={handleStart}
                className="w-full py-3 sm:py-4 font-display text-xl sm:text-2xl tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                style={{
                  background: "var(--boot-primary)",
                  color: "#000",
                  boxShadow: `0 0 20px var(--boot-primary)`,
                }}
              >
                <span className="relative z-10">▶ INSERT TAPE</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, var(--boot-accent), transparent)`,
                    animation: "shimmer 1s infinite",
                  }}
                />
              </button>

              <p className="text-center font-mono text-[10px] sm:text-xs text-gray-500">
                Press ENTER or SPACE to continue
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bottom VHS info */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between font-mono text-[10px] sm:text-xs text-gray-600">
        <span>VHS-001</span>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "var(--boot-primary)" }}
          />
          <span>SP MODE • STEREO</span>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* CRT edges glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          boxShadow: `inset 0 0 100px var(--boot-primary)`,
        }}
      />

      <style jsx>{`
        @keyframes static {
          0%, 100% { background-position: 0 0; }
          25% { background-position: 50% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 25% 75%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes crt-on {
          0% { height: 2px; width: 100%; opacity: 1; }
          50% { height: 2px; width: 100%; opacity: 1; }
          100% { height: 100vh; width: 100%; opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes company-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes lock-open {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(15deg); }
          55% { transform: rotate(48deg); }
          70% { transform: rotate(38deg); }
          82% { transform: rotate(44deg); }
          92% { transform: rotate(40deg); }
          100% { transform: rotate(42deg); }
        }
@keyframes unlock-ring {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
        @keyframes access-text-in {
          0% { opacity: 0; transform: translateY(8px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes line-expand {
          0% { width: 0; }
          100% { width: 60px; }
        }
      `}</style>
    </div>
  );
}
