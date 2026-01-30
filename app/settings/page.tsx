"use client";

import { useState, useEffect } from "react";
import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ThemePreset, FlickerIntensity } from "@/types/resume";
import { RotateCcw, Monitor, Volume2, Eye, Type } from "lucide-react";
import type { CompanyConfig } from "@/lib/companies";

const BASE_THEME_OPTIONS: { value: ThemePreset; label: string; color: string }[] = [
  { value: "crt-blue", label: "CRT Blue", color: "bg-vhs-blue" },
  { value: "vhs-purple", label: "VHS Purple", color: "bg-vhs-purple" },
  { value: "test-card", label: "Test Card White", color: "bg-white" },
];

const FLICKER_OPTIONS: { value: FlickerIntensity; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "med", label: "Medium" },
  { value: "high", label: "High" },
];

export default function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [company, setCompany] = useState<CompanyConfig | null>(null);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem("vhs-company");
      if (data) setCompany(JSON.parse(data));
    } catch {
      // ignore
    }
  }, []);

  const THEME_OPTIONS = [
    ...BASE_THEME_OPTIONS,
    ...(company?.brandColor
      ? [{ value: "company" as ThemePreset, label: company.displayName, color: "" }]
      : []),
  ];

  const flickerIndex = FLICKER_OPTIONS.findIndex(
    (f) => f.value === settings.flickerIntensity
  );

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Track label */}
          <div className="mb-6">
            <span className="tape-label">SETTINGS • PREFERENCES</span>
          </div>

          {/* Header */}
          <div className="mb-12 animate-fadeIn">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Customize the visual experience. All settings are saved locally.
            </p>
          </div>

          <div className="space-y-8">
            {/* Master Effects Toggle */}
            <section className="vhs-card p-6 animate-slideUp">
              <div className="flex items-center gap-4 mb-4">
                <Monitor className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl text-primary">
                  Visual Effects
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Effects Master Toggle</label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable all VHS visual effects
                    </p>
                  </div>
                  <Switch
                    checked={settings.effectsEnabled}
                    onCheckedChange={(checked) =>
                      updateSettings({ effectsEnabled: checked })
                    }
                    aria-label="Toggle visual effects"
                  />
                </div>

                <div
                  className={
                    settings.effectsEnabled ? "opacity-100" : "opacity-50"
                  }
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <label className="font-medium">Grain Effect</label>
                      <p className="text-sm text-muted-foreground">
                        Add film grain overlay
                      </p>
                    </div>
                    <Switch
                      checked={settings.grainEnabled}
                      onCheckedChange={(checked) =>
                        updateSettings({ grainEnabled: checked })
                      }
                      disabled={!settings.effectsEnabled}
                      aria-label="Toggle grain effect"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium">Flicker Intensity</label>
                      <span className="text-sm text-muted-foreground font-mono">
                        {FLICKER_OPTIONS[flickerIndex]?.label}
                      </span>
                    </div>
                    <Slider
                      value={[flickerIndex]}
                      max={2}
                      step={1}
                      onValueChange={([value]) =>
                        updateSettings({
                          flickerIntensity: FLICKER_OPTIONS[value].value,
                        })
                      }
                      disabled={!settings.effectsEnabled}
                      className="w-full"
                      aria-label="Flicker intensity"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Sound */}
            <section
              className="vhs-card p-6 animate-slideUp"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Volume2 className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl text-primary">Sound</h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Sound Effects</label>
                  <p className="text-sm text-muted-foreground">
                    Play sounds on navigation (off by default)
                  </p>
                </div>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings({ soundEnabled: checked })
                  }
                  aria-label="Toggle sound effects"
                />
              </div>
            </section>

            {/* Theme */}
            <section
              className="vhs-card p-6 animate-slideUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Eye className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl text-primary">
                  Theme Preset
                </h2>
              </div>

              <div className={`grid gap-3 ${THEME_OPTIONS.length > 3 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => updateSettings({ theme: theme.value })}
                    className={`p-4 rounded border-2 transition-all ${
                      settings.theme === theme.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    aria-pressed={settings.theme === theme.value}
                  >
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 ${theme.color}`}
                      style={
                        theme.value === "company" && company?.brandColor
                          ? { backgroundColor: company.brandColor }
                          : undefined
                      }
                    />
                    <span className="text-xs font-mono">{theme.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Accessibility */}
            <section
              className="vhs-card p-6 animate-slideUp"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Type className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl text-primary">
                  Accessibility
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Subtitles / Hints</label>
                  <p className="text-sm text-muted-foreground">
                    Show additional guidance text
                  </p>
                </div>
                <Switch
                  checked={settings.subtitlesEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings({ subtitlesEnabled: checked })
                  }
                  aria-label="Toggle subtitles"
                />
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Note: This site respects your system&apos;s{" "}
                <code className="px-1 bg-muted rounded">
                  prefers-reduced-motion
                </code>{" "}
                setting.
              </p>
            </section>

            {/* Reset */}
            <div className="text-center animate-fadeIn">
              <Button
                variant="outline"
                onClick={resetSettings}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
