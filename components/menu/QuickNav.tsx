"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface QuickNavProps {
  className?: string;
}

const NAV_ITEMS = [
  { label: "Main Menu", href: "/" },
  { label: "Trailer", href: "/trailer" },
  { label: "Scenes", href: "/scenes" },
  { label: "Behind the Scenes", href: "/behind" },
  { label: "Bonus", href: "/bonus" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Settings", href: "/settings" },
  { label: "Resume", href: "/resume" },
];

export function QuickNav({ className }: QuickNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { playSound } = useSound();

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(0);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      playSound("select");
      router.push(href);
      close();
    },
    [router, playSound, close]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open on Escape when not already open
      if (e.key === "Escape" && !isOpen && pathname !== "/") {
        e.preventDefault();
        setIsOpen(true);
        playSound("navigate");
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowUp":
        case "k":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : NAV_ITEMS.length - 1
          );
          playSound("navigate");
          break;
        case "ArrowDown":
        case "j":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < NAV_ITEMS.length - 1 ? prev + 1 : 0
          );
          playSound("navigate");
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          navigate(NAV_ITEMS[selectedIndex].href);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, pathname, navigate, close, playSound]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm",
        className
      )}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation"
    >
      <div
        className="relative bg-card border border-border rounded-lg p-6 min-w-[300px] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          onClick={close}
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display text-lg text-primary mb-4 vhs-text">
          Quick Nav
        </h2>

        <nav className="flex flex-col gap-1" role="menu">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.href}
              role="menuitem"
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-left rounded transition-colors",
                selectedIndex === index
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-muted text-foreground",
                pathname === item.href && "font-bold"
              )}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => navigate(item.href)}
            >
              <span
                className={cn(
                  "w-4 text-primary",
                  selectedIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                ▸
              </span>
              <span>{item.label}</span>
              {pathname === item.href && (
                <span className="ml-auto text-xs text-muted-foreground">
                  (current)
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
          Press <kbd className="px-1 bg-muted rounded">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}
