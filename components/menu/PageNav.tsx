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
  { href: "/trailer", label: "Watch Trailer", description: "About Me" },
  { href: "/scenes", label: "Scene Selection", description: "Projects" },
  { href: "/behind", label: "Behind the Scenes", description: "Experience" },
  { href: "/bonus", label: "Bonus Features", description: "Lessons" },
  { href: "/subscribe", label: "Subscribe", description: "Contact" },
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {prevPage ? (
          <Link
            href={prevPage.href}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-primary group-hover:translate-x-[-4px] transition-transform">◂</span>
            <span className="font-mono text-sm">{prevPage.label}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPage && (
          <div className="vhs-card p-6 text-center flex-1 max-w-md">
            <p className="font-mono text-sm text-muted-foreground mb-3">
              Ready to see more?
            </p>
            <Link
              href={nextPage.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display text-lg rounded hover:bg-primary/90 transition-colors group"
            >
              <span>▸ {nextPage.label}</span>
              <span className="text-sm opacity-70">({nextPage.description})</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
