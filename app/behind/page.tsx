"use client";

import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import { ExternalLink, MapPin, Calendar, GraduationCap, Briefcase } from "lucide-react";
import resumeData from "@/content/resume.json";
import { PageNav, getPageNav } from "@/components/menu/PageNav";

export default function BehindPage() {
  const { settings } = useSettings();
  const { experience, education } = resumeData;

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <span className="tape-label">BEHIND THE SCENES &bull; EXPERIENCE</span>
          </div>

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
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl text-primary vhs-text">Experience</h2>
            </div>

            <div className="relative pl-8">
              <div className="timeline-line" />
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.name} className="relative">
                    <div className="timeline-dot" style={{ top: "1.5rem" }} />
                    <div className="vhs-card p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-display text-lg text-primary flex items-center gap-2">
                            {exp.name}
                            {exp.url && (
                              <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </h3>
                          <p className="text-sm text-foreground/80 font-medium">{exp.title}</p>
                        </div>
                        <div className="text-right text-xs text-muted-foreground font-mono">
                          <div className="flex items-center gap-1 justify-end">
                            <Calendar className="w-3 h-3" />{exp.dates}
                          </div>
                          <div className="flex items-center gap-1 justify-end mt-1">
                            <MapPin className="w-3 h-3" />{exp.location}
                          </div>
                        </div>
                      </div>
                      {exp.stack && (
                        <p className="text-xs text-muted-foreground font-mono mb-4">{exp.stack}</p>
                      )}
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-primary shrink-0">▸</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl text-primary vhs-text">Education</h2>
            </div>
            <div className="relative pl-8">
              <div className="timeline-line" />
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.degree} className="relative">
                    <div className="timeline-dot" style={{ top: "1.25rem" }} />
                    <div className="vhs-card p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-display text-lg text-primary">{edu.degree}</h3>
                          <p className="text-sm text-foreground/80">{edu.school}</p>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{edu.dates}
                        </div>
                      </div>
                      {edu.keyCourses && edu.keyCourses.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Key Courses</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.keyCourses.map((course) => (
                              <span key={course} className="px-2 py-1 text-xs bg-muted/50 border border-border rounded">{course}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <PageNav prevPage={getPageNav("/behind").prev} nextPage={getPageNav("/behind").next} />
        </div>
      </main>
    </>
  );
}
