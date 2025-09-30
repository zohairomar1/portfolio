"use client";

import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import resumeData from "@/content/resume.json";
import { Github, Linkedin, Mail } from "lucide-react";
import { PageNav, getPageNav } from "@/components/menu/PageNav";

export default function TrailerPage() {
  const { settings } = useSettings();
  const { header, skills } = resumeData;

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Track label */}
          <div className="mb-6">
            <span className="tape-label">TRAILER • ABOUT ME</span>
          </div>

          {/* Hero section */}
          <div className="mb-12 animate-fadeIn">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">
              {header.name}
            </h1>

            {settings.subtitlesEnabled && (
              <p className="text-sm text-muted-foreground mb-4">
                Watch the trailer to learn about me
              </p>
            )}

            <p className="text-lg text-foreground/90 mb-6 max-w-2xl">
              I&apos;m a Computer Science & Mathematics student at the
              University of Calgary, passionate about building full-stack
              applications and data-driven solutions that make a real impact.
            </p>

            <p className="text-muted-foreground mb-8 max-w-2xl">
              Currently leading front-end development at Enactus UCalgary and
              co-founding TechNova, I thrive at the intersection of clean code
              and meaningful metrics. Whether it&apos;s a React component
              library or a Power BI dashboard, I focus on solutions that are
              both elegant and effective.
            </p>

            {/* Contact links */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${header.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded hover:bg-primary/20 transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">{header.email}</span>
              </a>
              <a
                href={`https://${header.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href={`https://${header.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded hover:bg-primary/20 transition-colors"
              >
                <Github className="w-4 h-4 text-primary" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>

          {/* Skills section */}
          <section className="animate-slideUp">
            <h2 className="font-display text-2xl text-primary mb-6 vhs-text">
              Technical Skills
            </h2>

            <div className="grid gap-6">
              {skills.map((skillCategory, index) => (
                <div
                  key={skillCategory.category}
                  className="vhs-card p-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-mono text-sm text-primary/80 uppercase tracking-wider mb-3">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-sm bg-muted/50 border border-border rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Page Navigation */}
          <PageNav
            nextPage={getPageNav("/trailer").next}
          />
        </div>
      </main>
    </>
  );
}
