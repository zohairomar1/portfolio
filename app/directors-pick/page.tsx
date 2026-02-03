"use client";

import { useState, useEffect } from "react";
import { VHSHeader } from "@/components/menu/VHSHeader";
import { PageNav, getPageNav } from "@/components/menu/PageNav";
import { ScrollReveal } from "@/components/vhs/ScrollReveal";
import { DirectorsPickBadge } from "@/components/vhs/DirectorsPickBadge";
import { useSettings } from "@/hooks/useSettings";
import { Star, Briefcase, Code, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import directorsPickData from "@/content/directors-pick.json";
import projectsData from "@/content/projects.json";
import resumeData from "@/content/resume.json";

interface Highlight {
  label: string;
  problem: string;
  built: string;
  tech: string;
  impact: string;
  link: string | null;
}

interface Role {
  title: string;
  topSkills: string[];
  pitch: string;
}

const data = directorsPickData as {
  custom: boolean;
  targetCompany: string | null;
  roles: Role[];
  genericPitch?: string;
  highlights: Highlight[];
  relevantProjects: string[];
  relevantExperience: string[];
};

/**
 * Checks sessionStorage for company data set by /for/[company].
 * Only shows tailored content when the user arrived via a company link.
 */
function useIsCustomMode(): boolean {
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    if (!data.custom || !data.targetCompany) {
      setIsCustom(false);
      return;
    }
    const stored = sessionStorage.getItem("vhs-company");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.displayName) {
          setIsCustom(true);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  return isCustom;
}

export default function DirectorsPickPage() {
  const { settings } = useSettings();
  const isCustom = useIsCustomMode();

  const relevantProjects = projectsData.filter((p) =>
    data.relevantProjects.includes(p.slug)
  );

  const relevantExperience = resumeData.experience.filter((e) =>
    data.relevantExperience.includes(e.name)
  );

  const pitch = isCustom
    ? data.roles?.[0]?.pitch || data.genericPitch || ""
    : data.genericPitch || "";

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
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
              DIRECTOR&apos;S PICK
            </span>
          </div>

          {/* Track label */}
          <div className="mb-6">
            <span className="tape-label">DIRECTOR&apos;S PICK</span>
          </div>

          {/* Hero */}
          <ScrollReveal variant="glitch" delay={0}>
            <div className="mb-12 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <DirectorsPickBadge />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary vhs-text mb-4">
                Why Me
              </h1>

              {/* Custom mode: show target role & company */}
              {isCustom && (
                <div className="mt-4 mb-4 vhs-card p-4 sm:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-xs text-muted-foreground/60 uppercase tracking-wider">
                        {data.roles.length > 1 ? "Target Roles" : "Target Role"}
                      </p>
                      {data.roles.map((role, i) => (
                        <div key={i} className={i > 0 ? "mt-2 pt-2 border-t border-primary/10" : ""}>
                          <p className="font-display text-lg text-primary">
                            {role.title}
                          </p>
                          {role.topSkills && role.topSkills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {role.topSkills.map((skill) => (
                                <span
                                  key={skill}
                                  className="font-mono text-[10px] px-2 py-0.5 rounded-sm border"
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
                          )}
                        </div>
                      ))}
                      <p className="font-mono text-sm text-muted-foreground mt-2">
                        {data.targetCompany}
                      </p>
                    </div>
                  </div>
                  {pitch && (
                    <p className="text-foreground/80 leading-relaxed mt-4">
                      {pitch}
                    </p>
                  )}
                </div>
              )}

              {/* Generic mode: just show the pitch */}
              {!isCustom && pitch && (
                <p className="text-foreground/80 leading-relaxed mt-4 max-w-2xl">
                  {pitch}
                </p>
              )}

              {settings.subtitlesEnabled && isCustom && (
                <p className="text-sm text-muted-foreground mt-2">
                  Tailored for {data.targetCompany}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* Key Qualifications */}
          <section className="mb-12">
            <ScrollReveal variant="scanline" delay={0}>
              <h2 className="font-display text-2xl text-primary vhs-text mb-6 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Key Qualifications
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {data.highlights.map((highlight, index) => (
                <ScrollReveal
                  key={highlight.label}
                  delay={index * 80}
                  variant={index % 2 === 0 ? "tape" : "scanline"}
                >
                  <div className="vhs-card p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-primary text-lg shrink-0">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base sm:text-lg text-primary mb-2">
                          {highlight.label}
                        </h3>

                        {/* Problem */}
                        <div className="mb-1.5">
                          <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                            Problem
                          </span>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {highlight.problem}
                          </p>
                        </div>

                        {/* What I Built */}
                        <div className="mb-1.5">
                          <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                            What I Built
                          </span>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {highlight.built}
                          </p>
                        </div>

                        {/* Tech + Impact row */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 mt-2">
                          <div className="flex-1">
                            <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                              Tech
                            </span>
                            <p className="font-mono text-xs text-muted-foreground">
                              {highlight.tech}
                            </p>
                          </div>
                          <div className="flex-1">
                            <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                              Impact
                            </span>
                            <p className="text-sm text-primary/80 font-medium">
                              {highlight.impact}
                            </p>
                          </div>
                        </div>

                        {/* Link */}
                        {highlight.link && (
                          <Link
                            href={highlight.link}
                            className="inline-flex items-center gap-1 mt-2 font-mono text-[10px] text-primary/60 hover:text-primary transition-colors uppercase tracking-wider"
                          >
                            View Project <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Relevant Projects */}
          {relevantProjects.length > 0 && (
            <section className="mb-12">
              <ScrollReveal variant="chromatic" delay={0}>
                <h2 className="font-display text-2xl text-primary vhs-text mb-6 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Relevant Projects
                </h2>
              </ScrollReveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {relevantProjects.map((project, index) => (
                  <ScrollReveal
                    key={project.slug}
                    delay={index * 100}
                    variant="flicker"
                  >
                    <Link
                      href={`/scenes#${project.slug}`}
                      className="vhs-card p-4 block group hover:border-primary/40 transition-colors h-full"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-base text-primary group-hover:text-accent transition-colors">
                          {project.name}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground/60 mb-2">
                        {project.stack}
                      </p>
                      {project.pitch && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.pitch}
                        </p>
                      )}
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}

          {/* Relevant Experience */}
          {relevantExperience.length > 0 && (
            <section className="mb-12">
              <ScrollReveal variant="tape" delay={0}>
                <h2 className="font-display text-2xl text-primary vhs-text mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Relevant Experience
                </h2>
              </ScrollReveal>

              <div className="space-y-4">
                {relevantExperience.map((exp, index) => (
                  <ScrollReveal
                    key={exp.name}
                    delay={index * 100}
                    variant="scanline"
                  >
                    <div className="vhs-card p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="font-display text-base sm:text-lg text-primary">
                            {exp.name}
                          </h3>
                          <p className="font-mono text-xs text-muted-foreground">
                            {exp.title}
                            {exp.stack && (
                              <span className="text-muted-foreground/50">
                                {" "}
                                &middot; {exp.stack}
                              </span>
                            )}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground/50 shrink-0">
                          {exp.dates}
                        </span>
                      </div>
                      {exp.pitch && (
                        <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                          {exp.pitch}
                        </p>
                      )}
                      <ul className="space-y-1.5">
                        {exp.bullets.slice(0, 3).map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-primary shrink-0">&#9656;</span>
                            <span className="text-muted-foreground">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}

          {/* Disclaimer footer - only when viewing in custom/company mode */}
          {isCustom && (
            <div className="mt-8 mb-4 text-center">
              <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wider">
                Independent portfolio page. Not affiliated with {data.targetCompany}.
              </p>
            </div>
          )}

          {/* Page Navigation */}
          <PageNav
            prevPage={getPageNav("/directors-pick").prev}
            nextPage={getPageNav("/directors-pick").next}
          />
        </div>
      </main>
    </>
  );
}
