"use client";

import { useRouter } from "next/navigation";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href: string;
  description?: string;
  isDirectorsPick?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Director's Pick (Why Me)", href: "/directors-pick", isDirectorsPick: true },
  { label: "About Me", href: "/trailer" },
  { label: "Projects", href: "/scenes" },
  { label: "Experience & Education", href: "/behind" },
  { label: "Bonus Features", href: "/bonus" },
  { label: "Contact", href: "/subscribe" },
  { label: "Settings", href: "/settings" },
];

interface DVDMenuProps {
  className?: string;
  isCompanyMode?: boolean;
}

export function DVDMenu({ className, isCompanyMode = false }: DVDMenuProps) {
  const router = useRouter();
  const { playSound } = useSound();

  const { selectedIndex, setSelectedIndex } = useKeyboardNav({
    items: MENU_ITEMS.map((item) => item.href),
    onSelect: (href) => {
      playSound("select");
      router.push(href);
    },
  });

  const handleMouseEnter = (index: number) => {
    if (index !== selectedIndex) {
      playSound("navigate");
      setSelectedIndex(index);
    }
  };

  const handleClick = (href: string) => {
    playSound("select");
    router.push(href);
  };

  return (
    <nav
      className={cn(
        "flex flex-col border border-primary/20 bg-card/60 backdrop-blur-sm overflow-hidden",
        className
      )}
      role="menu"
      aria-label="Main navigation"
      data-menu="dvd-menu"
      style={{
        boxShadow:
          "0 0 15px hsl(var(--accent) / 0.1), inset 0 0 30px hsl(var(--primary) / 0.03)",
      }}
    >
      {/* Menu header */}
      <div className="px-4 py-2 border-b border-primary/15 flex items-center justify-between">
        <span className="font-mono text-[10px] text-primary/50 tracking-[0.3em] uppercase">
          Main Menu
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/40">
          ▸ SELECT
        </span>
      </div>

      {MENU_ITEMS.map((item, index) => {
        const isEnhancedPick = item.isDirectorsPick && isCompanyMode;
        const isLocked = isCompanyMode && !item.isDirectorsPick;

        return (
          <button
            key={item.href}
            role="menuitem"
            tabIndex={selectedIndex === index ? 0 : -1}
            className={cn(
              "dvd-menu-item group",
              !isLocked && selectedIndex === index && "active",
              isEnhancedPick && "border-l-2 border-l-accent bg-accent/[0.08] py-3.5 relative overflow-hidden animate-directors-glow",
              isLocked && "opacity-[0.28] pointer-events-none select-none"
            )}
            onMouseEnter={() => !isLocked && handleMouseEnter(index)}
            onClick={() => !isLocked && handleClick(item.href)}
            onFocus={() => !isLocked && setSelectedIndex(index)}
          >
            {/* Shimmer sweep for Director's Pick */}
            {isEnhancedPick && (
              <div
                className="absolute inset-0 pointer-events-none animate-menu-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.08), transparent)',
                }}
              />
            )}

            <span
              className={cn(
                "cursor w-4 font-bold text-center",
                isLocked ? "text-muted-foreground/30 text-[10px]" : "text-primary"
              )}
              aria-hidden="true"
            >
              {isLocked ? "—" : "▸"}
            </span>
            <span className="flex-1 text-center">
              <span className={cn(
                "font-display",
                isEnhancedPick ? "text-lg sm:text-xl" : "text-base sm:text-lg"
              )}>
                {item.isDirectorsPick && (
                  <span
                    className={cn(
                      "text-[10px] font-mono tracking-wider mr-1.5 align-middle inline-block",
                      isEnhancedPick && "animate-star-pulse"
                    )}
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    ★
                  </span>
                )}
                {item.label}
              </span>
              {isEnhancedPick && (
                <span
                  className="block font-mono text-[9px] mt-0.5 animate-subtitle-reveal"
                  style={{ color: "hsl(var(--accent) / 0.7)" }}
                >
                  ▶ START HERE — CURATED FOR YOU
                </span>
              )}
            </span>
            {!isLocked && (
              <span className="w-4 text-xs font-mono text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                {index + 1}
              </span>
            )}
          </button>
        );
      })}

      {/* Footer hint */}
      <div className="px-4 py-2.5 border-t border-primary/15 text-center">
        <p className="text-[10px] text-muted-foreground/50 font-mono tracking-wider">
          <kbd className="px-1 py-0.5 bg-muted/50 rounded text-[9px]">↑↓</kbd>{" "}
          navigate{" · "}
          <kbd className="px-1 py-0.5 bg-muted/50 rounded text-[9px]">Enter</kbd>{" "}
          select
        </p>
      </div>
    </nav>
  );
}
