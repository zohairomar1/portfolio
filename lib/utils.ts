import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format timestamp like VHS timecode
export function formatTimecode(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Generate fake chapter timestamps for projects
export function generateChapterTime(index: number): string {
  const baseMinutes = 3 + index * 7;
  const seconds = Math.floor(Math.random() * 59);
  return formatTimecode(baseMinutes * 60 + seconds);
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Slugify text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Get category badge class
export function getCategoryClass(
  category: "fullstack" | "data" | "hackathon" | undefined
): string {
  switch (category) {
    case "fullstack":
      return "fullstack";
    case "data":
      return "data";
    case "hackathon":
      return "hackathon";
    default:
      return "fullstack";
  }
}

// Get category label
export function getCategoryLabel(
  category: "fullstack" | "data" | "hackathon" | undefined
): string {
  switch (category) {
    case "fullstack":
      return "Track A: Full-Stack";
    case "data":
      return "Track B: Data/BI";
    case "hackathon":
      return "Hackathon";
    default:
      return "Track A: Full-Stack";
  }
}
