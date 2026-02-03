"use client";

import Link from "next/link";

interface PageNavProps {
  nextPage?: {
    label: string;
    href: string;
    description: string;
  };
  prevPage?: {
    label: string;
    href: string;
  };
}

// Define the page order for navigation
export const PAGE_ORDER = [
  { href: "/directors-pick", label: "Director's Pick", description: "Why Me" },
  { href: "/trailer", label: "About Me", description: "About Me" },
  { href: "/scenes", label: "Projects", description: "Projects" },
  { href: "/behind", label: "Experience & Education", description: "Experience" },
  { href: "/bonus", label: "Bonus Features", description: "Lessons" },
  { href: "/subscribe", label: "Contact", description: "Contact" },
];

export function getPageNav(currentPath: string) {
  const currentIndex = PAGE_ORDER.findIndex((p) => p.href === currentPath);

  return {
    prev: currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : undefined,
    next: currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : undefined,
  };
}

export function PageNav({ nextPage, prevPage }: PageNavProps) {
  if (!nextPage && !prevPage) return null;

  return (
    <div className="mt-16 pt-8 border-t border-border">
      <div className="grid grid-cols-2 gap-4">
        {prevPage ? (
          <Link
            href={prevPage.href}
            className="vhs-card p-4 sm:p-5 flex items-center gap-3 group transition-all"
          >
            <span className="text-primary text-lg group-hover:translate-x-[-4px] transition-transform">◂</span>
            <div>
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider block">Previous</span>
              <span className="font-display text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">{prevPage.label}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPage ? (
          <Link
            href={nextPage.href}
            className="vhs-card p-4 sm:p-5 flex items-center justify-end gap-3 group transition-all text-right"
          >
            <div>
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider block">Next</span>
              <span className="font-display text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">{nextPage.label}</span>
            </div>
            <span className="text-primary text-lg group-hover:translate-x-[4px] transition-transform">▸</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
