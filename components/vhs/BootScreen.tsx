"use client";

import { useEffect, useState, useCallback } from "react";
import { useSettings } from "@/hooks/useSettings";
import type { ThemePreset } from "@/types/resume";

interface BootScreenProps {
  onComplete: () => void;
}

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

export function BootScreen({ onComplete }: BootScreenProps) {
  const { settings, updateSettings } = useSettings();
  const [phase, setPhase] = useState<
    "power-on" | "static" | "tracking" | "loading" | "ready" | "done"
  >("power-on");
  const [trackingOffset, setTrackingOffset] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemePreset>(settings.theme);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [glitchText, setGlitchText] = useState(false);
  const [scanlinePos, setScanlinePos] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showPortfolio, setShowPortfolio] = useState(false);

  // Phase transitions
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setPhase("static"), 600));
    timers.push(setTimeout(() => setPhase("tracking"), 1400));
    timers.push(setTimeout(() => setPhase("loading"), 3000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Tracking effect
  useEffect(() => {
    if (phase !== "tracking") return;
    const interval = setInterval(() => {
      setTrackingOffset((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Loading progress
  useEffect(() => {
    if (phase !== "loading" && phase !== "ready") return;
    if (phase === "ready") return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + (Math.random() * 2 + 0.5);
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * LOADING_MESSAGES.length),
          LOADING_MESSAGES.length - 1
        );
        setCurrentMessage(messageIndex);
        if (newProgress >= 100) {
          setPhase("ready");
          setShowConfig(true);
          setTimeout(() => setShowPortfolio(true), 300);
          return 100;
        }
        return newProgress;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [phase]);

  // Scanline sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePos((prev) => (prev + 2) % 120);
    }, 30);
    return () => clearInterval(interval);
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

  const handleStart = useCallback(() => {
    updateSettings({
      theme: selectedTheme,
      soundEnabled: soundEnabled,
    });
    setPhase("done");
    setTimeout(() => {
      onComplete();
      setTimeout(() => {
        const menu = document.querySelector('[data-menu="dvd-menu"]');
        if (menu) {
          menu.scrollIntoView({ behavior: "smooth", block: "center" });
          menu.classList.add("menu-highlight");
          setTimeout(() => menu.classList.remove("menu-highlight"), 2000);
        }
      }, 100);
    }, 500);
  }, [selectedTheme, soundEnabled, updateSettings, onComplete]);

  useEffect(() => {
    if (phase !== "ready" || !showConfig) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") { handleStart(); }
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
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* CRT Power-on effect */}
      {phase === "power-on" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white" style={{ width: "100%", height: "2px", animation: "crt-on 0.6s ease-out forwards" }} />
        </div>
      )}

      {/* Scanline sweep */}
      <div className="absolute left-0 right-0 h-32 pointer-events-none opacity-20"
        style={{ top: `${scanlinePos - 10}%`, background: "linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)" }}
      />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none" />

      {/* Static noise phase */}
      {phase === "static" && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, animation: "static 0.08s steps(10) infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="font-mono text-xl tracking-[0.3em] animate-pulse block text-primary">NO SIGNAL</span>
              <div className="mt-4 flex gap-1 justify-center">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking lines phase */}
      {phase === "tracking" && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 h-8"
              style={{ top: `${((trackingOffset * 1.5 + i * 14) % 140) - 20}%`, background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.15), transparent)", transform: `translateX(${Math.sin((trackingOffset + i) * 0.12) * 30}px)`, opacity: 0.6 }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center relative">
              <h1 className="font-display text-5xl sm:text-7xl mb-6 text-primary"
                style={{ textShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))", opacity: glitchText ? 0.5 : 1 }}
              >ZOHAIR OMAR</h1>
              <div className="border px-8 py-4 relative border-primary/40">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-sm tracking-[0.2em] text-primary">SYSTEM BOOT SEQUENCE</span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className="flex gap-1.5 justify-center mt-3">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full transition-all duration-200"
                        style={{ background: i <= (trackingOffset % 7) ? "hsl(var(--primary))" : "#333" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PLAY indicator */}
      {(phase === "loading" || phase === "ready") && (
        <div className="absolute top-8 left-8 flex items-center gap-3 animate-fadeIn">
          <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[22px] border-l-primary" />
          <span className="font-display text-2xl tracking-wider text-primary">PLAY</span>
        </div>
      )}

      {/* Counter display */}
      {(phase === "loading" || phase === "ready") && (
        <div className="absolute top-8 right-8 animate-fadeIn">
          <span className="font-mono text-lg tabular-nums text-primary">
            {String(Math.floor(loadingProgress / 60)).padStart(2, "0")}:
            {String(Math.floor(loadingProgress % 60)).padStart(2, "0")}:
            {String(Math.floor((loadingProgress * 30) % 100)).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Main content area */}
      {(phase === "loading" || phase === "ready") && (
        <div className="relative w-full max-w-2xl px-8">
          <div className={`text-center mb-8 transition-all duration-200 ${glitchText ? "translate-x-1" : ""}`}>
            <h1 className="font-display text-5xl sm:text-7xl mb-3 text-primary"
              style={{ textShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))" }}
            >{glitchText ? "Z0H41R 0M4R" : "ZOHAIR OMAR"}</h1>
            <div className="h-8 overflow-hidden transition-all duration-500"
              style={{ opacity: showPortfolio ? 1 : 0 }}
            >
              <p className="font-mono text-sm text-gray-400 tracking-[0.3em]">PORTFOLIO</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full transition-all duration-100 rounded-full bg-primary"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-xs">
              <span className="text-gray-500">{Math.floor(loadingProgress)}%</span>
              <span className="text-primary">{LOADING_MESSAGES[currentMessage]}</span>
              <span className="text-gray-500">100%</span>
            </div>
          </div>

          {/* Config panel */}
          {showConfig && (
            <div className="animate-slideUp space-y-5 border border-primary/30 p-6 bg-black/80">
              <div className="text-center font-mono text-xs text-gray-400 tracking-widest">CONFIGURE YOUR EXPERIENCE</div>
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-primary">Color Theme</label>
                <div className="flex gap-2">
                  {(["crt-blue", "vhs-purple", "test-card"] as ThemePreset[]).map((theme) => (
                    <button key={theme} onClick={() => setSelectedTheme(theme)}
                      className="flex-1 py-3 px-3 border transition-all font-mono text-xs"
                      style={{ borderColor: selectedTheme === theme ? "hsl(var(--primary))" : "#333", background: selectedTheme === theme ? "hsl(var(--primary) / 0.2)" : "transparent", color: selectedTheme === theme ? "hsl(var(--primary))" : "#888" }}
                    >
                      <div className="w-5 h-5 rounded-full mx-auto mb-2 bg-primary" />
                      {theme === "crt-blue" ? "CRT Blue" : theme === "vhs-purple" ? "VHS Purple" : "Test Card"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="font-mono text-xs uppercase tracking-wider text-primary">Sound Effects</label>
                <button onClick={() => setSoundEnabled(!soundEnabled)}
                  className="w-14 h-7 rounded-full relative transition-all"
                  style={{ background: soundEnabled ? "hsl(var(--primary))" : "#333" }}
                >
                  <div className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all"
                    style={{ left: soundEnabled ? "calc(100% - 24px)" : "4px" }}
                  />
                </button>
              </div>
              <button onClick={handleStart}
                className="w-full py-4 font-display text-2xl tracking-wider bg-primary text-black"
                style={{ boxShadow: "0 0 20px hsl(var(--primary))" }}
              >▶ INSERT TAPE</button>
              <p className="text-center font-mono text-xs text-gray-500">Press ENTER or SPACE to continue</p>
            </div>
          )}
        </div>
      )}

      {/* Bottom info */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between font-mono text-xs text-gray-600">
        <span>VHS-001</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>SP MODE • STEREO</span>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)" }}
      />

      <style jsx>{`
        @keyframes static {
          0%, 100% { background-position: 0 0; }
          25% { background-position: 50% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 25% 75%; }
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
      `}</style>
    </div>
  );
}
