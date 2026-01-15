"use client";

import { useState } from "react";
import type { ProjectItem } from "@/types/resume";

interface FeaturedProjectProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export function FeaturedProject({ project, onSelect }: FeaturedProjectProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="mb-8">
      {/* NOW SHOWING header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs tracking-[0.3em] text-red-400 uppercase">
            Now Showing
          </span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
          FEATURED PROJECT
        </span>
      </div>

      {/* Main card */}
      <div
        className="relative group cursor-pointer overflow-hidden rounded-sm border-2 transition-all duration-500"
        style={{
          borderColor: hovered
            ? "hsl(var(--primary))"
            : "hsl(var(--primary) / 0.3)",
          boxShadow: hovered
            ? "0 0 30px hsl(var(--primary) / 0.3), 0 0 60px hsl(var(--primary) / 0.1), inset 0 0 30px hsl(var(--primary) / 0.05)"
            : "0 0 10px hsl(var(--primary) / 0.1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect(project)}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.4) 2px, hsl(var(--primary) / 0.4) 3px)",
          }}
        />

        {/* Tracking line that sweeps on hover */}
        <div
          className="absolute left-0 right-0 h-[2px] z-20 transition-all duration-1000 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), transparent)",
            top: hovered ? "100%" : "-2px",
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="relative z-0 p-5 sm:p-6">
          {/* Top row: badge + category */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="track-badge fullstack text-[10px]">A</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                FULL-STACK • BUSINESS
              </span>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: hovered
                    ? "hsl(142 76% 50%)"
                    : "hsl(var(--primary) / 0.4)",
                  boxShadow: hovered
                    ? "0 0 6px hsl(142 76% 50% / 0.6)"
                    : "none",
                }}
              />
              <span
                className="font-mono text-[10px] transition-colors duration-300"
                style={{
                  color: hovered
                    ? "hsl(142 76% 70%)"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                LIVE
              </span>
            </div>
          </div>

          {/* Title with VHS glitch on hover */}
          <h3
            className="font-display text-xl sm:text-2xl mb-2 transition-all duration-300"
            style={{
              color: "hsl(var(--primary))",
              textShadow: hovered
                ? "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.2), 2px 0 hsl(0 100% 50% / 0.15), -2px 0 hsl(200 100% 50% / 0.15)"
                : "0 0 5px hsl(var(--primary) / 0.2)",
            }}
          >
            {project.name}
          </h3>

          {/* Stack */}
          <p className="text-xs text-muted-foreground font-mono mb-4">
            {project.stack}
          </p>

          {/* Pitch — always visible */}
          <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
            {project.pitch}
          </p>

          {/* Hover reveal: key skills / what makes it special */}
          <div
            className="overflow-hidden transition-all duration-500 ease-out"
            style={{
              maxHeight: hovered ? "200px" : "0",
              opacity: hovered ? 1 : 0,
            }}
          >
            <div className="border-t border-primary/20 pt-4 mt-1">
              {/* Skills showcase */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Entrepreneurship",
                  "Full-Stack Dev",
                  "Email Automation",
                  "SEO",
                  "Client Management",
                  "Branding",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2 py-1 rounded-sm border transition-colors duration-300"
                    style={{
                      borderColor: "hsl(var(--primary) / 0.3)",
                      color: "hsl(var(--primary) / 0.9)",
                      backgroundColor: "hsl(var(--primary) / 0.08)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Director's note */}
              <div className="border-l-2 border-primary/40 pl-3">
                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-wider">
                  Director&apos;s Notes
                </span>
                <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                  {project.keyChallenge}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/10">
            <span className="font-mono text-xs text-muted-foreground">
              everydaycleaning.ca
            </span>
            <div
              className="flex items-center gap-2 text-xs font-mono transition-all duration-300"
              style={{
                color: hovered
                  ? "hsl(var(--primary))"
                  : "hsl(var(--primary) / 0.5)",
              }}
            >
              <span>{hovered ? "▸ Click to view" : "▸ Hover for details"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
