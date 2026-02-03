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
  { label: "About Me", href: "/trailer" },
  { label: "Projects", href: "/scenes" },
  { label: "Experience & Education", href: "/behind" },
  { label: "Bonus Features", href: "/bonus" },
  { label: "Contact", href: "/subscribe" },
  { label: "Settings", href: "/settings" },
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

      {MENU_ITEMS.map((item, index) => (
        <button
          key={item.href}
          role="menuitem"
          tabIndex={selectedIndex === index ? 0 : -1}
          className={cn(
            "dvd-menu-item group",
            selectedIndex === index && "active"
          )}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleClick(item.href)}
          onFocus={() => setSelectedIndex(index)}
        >
          <span
            className="cursor w-4 text-primary font-bold text-center"
            aria-hidden="true"
          >
            ▸
          </span>
          <span className="flex-1 text-center">
            <span className="font-display text-base sm:text-lg">{item.label}</span>
          </span>
          <span className="w-4 text-xs font-mono text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity text-center">
            {index + 1}
          </span>
        </button>
      ))}

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
