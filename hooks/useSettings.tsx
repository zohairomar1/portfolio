"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  Settings,
  DEFAULT_SETTINGS,
  ThemePreset,
  FlickerIntensity,
} from "@/types/resume";

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${Math.round(l * 100)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const STORAGE_KEY = "portfolio-vhs-settings";

function getStoredSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn("Failed to load settings from localStorage:", e);
  }

  return DEFAULT_SETTINGS;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    setSettings(getStoredSettings());
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", settings.theme);
    document.documentElement.setAttribute(
      "data-effects",
      String(settings.effectsEnabled)
    );
    document.documentElement.setAttribute(
      "data-grain",
      String(settings.grainEnabled)
    );
    document.documentElement.setAttribute(
      "data-flicker",
      settings.flickerIntensity
    );

    // Apply or remove company brand color CSS overrides
    const el = document.documentElement;
    if (settings.theme === "company") {
      try {
        const companyData = sessionStorage.getItem("vhs-company");
        if (companyData) {
          const company = JSON.parse(companyData);
          if (company.brandColor && company.brandAccent) {
            el.style.setProperty("--primary", hexToHsl(company.brandColor));
            el.style.setProperty("--accent", hexToHsl(company.brandAccent));
            el.style.setProperty("--ring", hexToHsl(company.brandColor));
          }
        }
      } catch {
        // Ignore malformed data
      }
    } else {
      el.style.removeProperty("--primary");
      el.style.removeProperty("--accent");
      el.style.removeProperty("--ring");
    }
  }, [settings, mounted]);

  // Save to localStorage when settings change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to save settings to localStorage:", e);
    }
  }, [settings, mounted]);

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    // Return default settings when outside provider (SSR)
    return {
      settings: DEFAULT_SETTINGS,
      updateSettings: () => {},
      resetSettings: () => {},
    };
  }
  return context;
}
