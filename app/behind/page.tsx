"use client";

import { useState } from "react";
import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import { ExternalLink, MapPin, Calendar, GraduationCap, Briefcase, Clapperboard, ArrowUp } from "lucide-react";
import resumeData from "@/content/resume.json";
import { PageNav, getPageNav } from "@/components/menu/PageNav";
import { ScrollReveal, VHSSectionDivider } from "@/components/vhs/ScrollReveal";

// Director's Notes for each experience - gamified, VHS-themed commentary
const DIRECTORS_NOTES: Record<string, string> = {
  "Enactus UCalgary - WealthPath":
    "DIRECTOR'S CUT: This role unlocked the \"Team Lead\" achievement. Managing 4 devs taught me that shipping a feature is 30% code, 70% communication. The CI/CD pipeline was my proudest build — watching 30+ PRs merge clean felt like a speedrun with zero deaths.",
  "TechNova":
    "BEHIND THE SCENES: Co-founding TechNova was like starting a new game with no tutorial. We went from zero to serving real clubs in weeks. The secret weapon? Agile sprints kept us from feature-creeping into oblivion. Every code review was a co-op mission.",
  "Agrius IT":
    "DELETED SCENE: My first day, I stared at CORS errors for hours thinking the API was broken. Turns out, it was working exactly as designed — I just didn't understand enterprise security yet. By week 3, I was the one configuring proxy settings. Level up.",
  "UBC Design League":
    "EASTER EGG: Programming a robot to navigate obstacles sounds futuristic until you're debugging ultrasonic sensors at 2 AM wondering why it keeps turning left. The 95% success rate hides a lot of duct tape and creative problem-solving. Worth every late night.",
};

export default function BehindPage() {
  const { settings } = useSettings();
  const { experience, education } = resumeData;
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const toggleNote = (name: string) => {
    setOpenNotes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Track label */}
          <div className="mb-6">
            <span className="tape-label">BEHIND THE SCENES &bull; EXPERIENCE</span>
          </div>

          {/* Header */}
          <div className="mb-12 animate-fadeIn">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">
              Behind the Scenes
            </h1>
            {settings.subtitlesEnabled && (
              <p className="text-sm text-muted-foreground">
                Experience and education timeline
              </p>
            )}
          </div>

          {/* Experience Timeline */}
          <section className="mb-16">
            <ScrollReveal variant="glitch" delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl text-primary vhs-text">
                  Experience
                </h2>
              </div>
            </ScrollReveal>

            <div className="relative pl-8">
              {/* Timeline line */}
              <div className="timeline-line" />

              <div className="space-y-8">
                {experience.map((exp, index) => {
                  // Alternate between tape and scanline for experience items
                  const variant = index % 2 === 0 ? "tape" : "scanline";
                  const note = DIRECTORS_NOTES[exp.name];
                  const isNoteOpen = openNotes[exp.name] || false;

                  return (
                    <ScrollReveal
                      key={exp.name}
                      delay={index * 100}
                      variant={variant}
                    >
                      <div className="relative">
                        {/* Timeline dot */}
                        <div className="timeline-dot" style={{ top: "1.5rem" }} />

                        <div className="vhs-card p-5">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <div>
                              <h3 className="font-display text-lg text-primary flex items-center gap-2">
                                {exp.name}
                                {exp.url && (
                                  <a
                                    href={exp.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </h3>
                              <p className="text-sm text-foreground/80 font-medium">
                                {exp.title}
                              </p>
                            </div>
                            <div className="text-right text-xs text-muted-foreground font-mono">
                              <div className="flex items-center gap-1 justify-end">
                                <Calendar className="w-3 h-3" />
                                {exp.dates}
                              </div>
                              <div className="flex items-center gap-1 justify-end mt-1">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </div>
                            </div>
                          </div>

                          {/* Stack */}
                          {exp.stack && (
                            <p className="text-xs text-muted-foreground font-mono mb-4">
                              {exp.stack}
                            </p>
                          )}

                          {/* Bullets */}
                          <ul className="space-y-2">
                            {exp.bullets.map((bullet, i) => (
                              <li key={i} className="flex gap-2 text-sm">
                                <span className="text-primary shrink-0">▸</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Director's Note */}
                          {note && (
                            <div className="mt-4 pt-4 border-t border-border/50">
                              <button
                                onClick={() => toggleNote(exp.name)}
                                className="flex items-center gap-2 text-xs font-mono text-primary/70 hover:text-primary transition-colors cursor-pointer group"
                              >
                                <Clapperboard className="w-3.5 h-3.5" />
                                <span className="tracking-wider uppercase">
                                  {isNoteOpen ? "▾" : "▸"} Director&apos;s Note
                                </span>
                                {!isNoteOpen && (
                                  <span className="text-muted-foreground/50 text-[10px] group-hover:text-primary/50 transition-colors">
                                    CLICK TO REVEAL
                                  </span>
                                )}
                              </button>
                              {isNoteOpen && (
                                <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-sm text-foreground/80 font-mono leading-relaxed animate-fadeIn">
                                  <span className="text-primary/60 text-xs">&#47;&#47; </span>
                                  {note}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <VHSSectionDivider label="EDUCATION REEL" />

          {/* Education Section */}
          <section>
            <ScrollReveal variant="chromatic" delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl text-primary vhs-text">
                  Education
                </h2>
              </div>
            </ScrollReveal>

            <div className="relative pl-8">
              {/* Timeline line */}
              <div className="timeline-line" />

              <div className="space-y-0">
                {education.map((edu, index) => (
                  <div key={edu.degree}>
                    <ScrollReveal
                      delay={index * 120}
                      variant="flicker"
                    >
                      <div className="relative">
                        {/* Timeline dot */}
                        <div className="timeline-dot" style={{ top: "1.25rem" }} />

                        <div className="vhs-card p-5">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-display text-lg text-primary">
                                {edu.degree}
                              </h3>
                              <p className="text-sm text-foreground/80">
                                {edu.school}
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {edu.dates}
                            </div>
                          </div>

                          {edu.keyCourses && edu.keyCourses.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">
                                Key Courses
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {edu.keyCourses.map((course) => (
                                  <span
                                    key={course}
                                    className="px-2 py-1 text-xs bg-muted/50 border border-border rounded"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Transfer Arrow between UCalgary and UBC */}
                    {index === 0 && education.length > 1 && (
                      <ScrollReveal delay={150} variant="scanline">
                        <div className="relative my-4 ml-4">
                          <div className="flex items-center gap-3 py-2">
                            <div className="flex flex-col items-center">
                              <ArrowUp className="w-4 h-4 text-primary animate-pulse" />
                              <div className="w-px h-6 bg-primary/40" />
                            </div>
                            <div className="flex-1 p-2.5 rounded border border-primary/30 bg-primary/5">
                              <p className="text-xs font-mono text-primary/80">
                                <span className="text-primary">TRANSFERRED</span>{" "}
                                &mdash; UBC → UCalgary, Fall 2024
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Page Navigation */}
          <PageNav
            prevPage={getPageNav("/behind").prev}
            nextPage={getPageNav("/behind").next}
          />
        </div>
      </main>
    </>
  );
}
