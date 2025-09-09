"use client";

import { useRouter } from "next/navigation";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href: string;
  description?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Watch Trailer", href: "/trailer", description: "About Me" },
  { label: "Scene Selection", href: "/scenes", description: "Projects" },
  {
    label: "Behind the Scenes",
    href: "/behind",
    description: "Experience & Education",
  },
  {
    label: "Bonus Features",
    href: "/bonus",
    description: "Lessons & Bloopers",
  },
  { label: "Subscribe / Fan Mail", href: "/subscribe", description: "Contact" },
  { label: "Settings", href: "/settings", description: "Adjust Display" },
];

interface DVDMenuProps {
  className?: string;
}

export function DVDMenu({ className }: DVDMenuProps) {
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
      className={cn("flex flex-col", className)}
      role="menu"
      aria-label="Main navigation"
      data-menu="dvd-menu"
    >
      {MENU_ITEMS.map((item, index) => (
        <button
          key={item.href}
          role="menuitem"
          tabIndex={selectedIndex === index ? 0 : -1}
          className={cn(
            "dvd-menu-item group text-left",
            selectedIndex === index && "active"
          )}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleClick(item.href)}
          onFocus={() => setSelectedIndex(index)}
        >
          <span
            className="cursor w-4 text-primary font-bold"
            aria-hidden="true"
          >
            ▸
          </span>
          <span className="flex-1">
            <span className="font-display text-lg vhs-text">{item.label}</span>
            {item.description && (
              <span className="ml-3 text-sm text-muted-foreground font-body">
                ({item.description})
              </span>
            )}
          </span>
          <span className="text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {index + 1}
          </span>
        </button>
      ))}

      <div className="mt-6 px-4 text-xs text-muted-foreground font-mono">
        <p>
          Use <kbd className="px-1 bg-muted rounded">↑</kbd>{" "}
          <kbd className="px-1 bg-muted rounded">↓</kbd> to navigate
        </p>
        <p>
          Press <kbd className="px-1 bg-muted rounded">Enter</kbd> or{" "}
          <kbd className="px-1 bg-muted rounded">1-6</kbd> to select
        </p>
      </div>
    </nav>
  );
}
