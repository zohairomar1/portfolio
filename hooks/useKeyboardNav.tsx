"use client";

import { useEffect, useCallback, useState } from "react";

interface UseKeyboardNavOptions {
  items: string[];
  onSelect: (item: string) => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  items,
  onSelect,
  onEscape,
  enabled = true,
}: UseKeyboardNavOptions) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      switch (e.key) {
        case "ArrowUp":
        case "k":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case "ArrowDown":
        case "j":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (items[selectedIndex]) {
            onSelect(items[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          if (onEscape) {
            onEscape();
          }
          break;
        default:
          // Number keys for quick selection (1-9)
          const num = parseInt(e.key);
          if (!isNaN(num) && num >= 1 && num <= items.length) {
            e.preventDefault();
            setSelectedIndex(num - 1);
            onSelect(items[num - 1]);
          }
          break;
      }
    },
    [enabled, items, selectedIndex, onSelect, onEscape]
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, enabled]);

  return {
    selectedIndex,
    setSelectedIndex,
  };
}
