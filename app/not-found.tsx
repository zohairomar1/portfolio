"use client";

import Link from "next/link";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

export default function NotFound() {
  const { settings } = useSettings();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Static noise background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Color bars at top */}
      <div className="absolute top-0 left-0 right-0 h-4 flex">
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-cyan-400" />
        <div className="flex-1 bg-green-400" />
        <div className="flex-1 bg-purple-500" />
        <div className="flex-1 bg-red-500" />
        <div className="flex-1 bg-blue-500" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div
          className={`font-display text-6xl sm:text-8xl text-primary mb-4 ${
            settings.effectsEnabled ? "animate-glitch" : ""
          }`}
          data-text="NO SIGNAL"
        >
          NO SIGNAL
        </div>

        <div className="font-mono text-xl sm:text-2xl text-muted-foreground mb-8">
          TAPE NOT FOUND
        </div>

        <div className="font-mono text-sm text-muted-foreground/70 mb-8 space-y-1">
          <p>ERROR CODE: 404</p>
          <p>The requested tape is not in our library.</p>
        </div>

        {/* VHS tracking lines */}
        <div className="w-64 mx-auto mb-8 space-y-1">
          <div className="h-0.5 bg-primary/30" />
          <div className="h-0.5 bg-primary/50 w-3/4" />
          <div className="h-0.5 bg-primary/20 w-1/2" />
          <div className="h-0.5 bg-primary/40 w-5/6" />
          <div className="h-0.5 bg-primary/30 w-2/3" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="vhs" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Main Menu
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>

        {settings.subtitlesEnabled && (
          <p className="mt-8 text-xs text-muted-foreground/50">
            Hint: Check the URL or use the navigation menu
          </p>
        )}
      </div>

      {/* Bottom tape info */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono text-muted-foreground/50">
        <div>
          <p>TRACKING ERROR</p>
          <p>ADJUST TRACKING</p>
        </div>
        <div className="text-right">
          <p>CH --</p>
          <p>--:--:--</p>
        </div>
      </div>
    </main>
  );
}
