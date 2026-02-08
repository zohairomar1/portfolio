"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlayIndicator } from "@/components/vhs/PlayIndicator";
import { TimeIndicator } from "@/components/vhs/TimeIndicator";
import { useSettings } from "@/hooks/useSettings";
import { Settings, Home, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface VHSHeaderProps {
  className?: string;
}

export function VHSHeader({ className }: VHSHeaderProps) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const isHomePage = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border",
        className
      )}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Logo/Home */}
        <div className="flex items-center gap-4">
          {!isHomePage && (
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Return to main menu"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-mono hidden sm:inline">
                MAIN MENU
              </span>
            </Link>
          )}
          <div className="font-display text-primary vhs-text">
            <span className="hidden sm:inline">ZOHAIR OMAR</span>
            <span className="sm:hidden">ZO</span>
          </div>
        </div>

        {/* Center: Recording indicator */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <PlayIndicator />
        </div>

        {/* Right: Time indicator + Settings + Mobile menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <TimeIndicator />
          <Link
            href="/settings"
            className={cn(
              "p-2 rounded-md transition-colors",
              pathname === "/settings"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
          {!isHomePage && (
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors sm:hidden"
              onClick={() => window.dispatchEvent(new Event("open-quicknav"))}
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Subtitle hint - hidden on mobile where Esc key isn't available */}
      {settings.subtitlesEnabled && pathname !== "/" && (
        <div className="hidden md:block bg-black/50 text-center py-1 text-sm text-muted-foreground">
          Press <kbd className="px-1 bg-muted rounded text-xs">Esc</kbd> for
          quick navigation
        </div>
      )}
    </header>
  );
}
