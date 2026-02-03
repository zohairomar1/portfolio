"use client";

import { VHSHeader } from "@/components/menu/VHSHeader";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import resumeData from "@/content/resume.json";

export default function ResumePage() {
  const { header, skills, education, experience, projects } = resumeData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <VHSHeader />

      {/* Print controls - hidden on print */}
      <div className="no-print fixed bottom-4 right-4 z-50 flex gap-2 max-sm:bottom-2 max-sm:right-2 max-sm:scale-90 max-sm:origin-bottom-right">
        <Button variant="vhs" onClick={handlePrint} className="hidden sm:flex">
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
        <Button variant="vhs" asChild>
          <a href="/resume.pdf" download>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </a>
        </Button>
      </div>

      <main className="min-h-screen pt-20 pb-12 px-4 print:pt-4 print:px-8">
        <div className="container mx-auto max-w-4xl bg-background print:bg-white">
          {/* Header */}
          <header className="text-center mb-8 print:mb-4">
            <h1 className="text-3xl font-bold mb-2 print:text-black">
              {header.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground print:text-gray-600">
              <a href={`mailto:${header.email}`}>{header.email}</a>
              <a
                href={`https://${header.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {header.linkedin}
              </a>
              <a
                href={`https://${header.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {header.github}
              </a>
            </div>
          </header>

          {/* Technical Skills */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-border pb-1 mb-3 print:border-gray-300 print:text-black">
              Technical Skills
            </h2>
            <div className="space-y-1 text-sm">
              {skills.map((skill) => (
                <p key={skill.category}>
                  <span className="font-semibold print:text-black">
                    {skill.category}:
                  </span>{" "}
                  <span className="text-muted-foreground print:text-gray-700">
                    {skill.items.join(", ")}
                  </span>
                </p>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-border pb-1 mb-3 print:border-gray-300 print:text-black">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.degree}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold print:text-black">
                        {edu.degree}
                      </p>
                      <p className="text-sm text-muted-foreground print:text-gray-600">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground print:text-gray-600 shrink-0">
                      {edu.dates}
                    </span>
                  </div>
                  {edu.keyCourses && edu.keyCourses.length > 0 && (
                    <p className="text-sm mt-1">
                      <span className="font-medium italic print:text-black">
                        Key Courses:
                      </span>{" "}
                      <span className="text-muted-foreground print:text-gray-700">
                        {edu.keyCourses.join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-border pb-1 mb-3 print:border-gray-300 print:text-black">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.name}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold print:text-black">
                        {exp.name}
                      </p>
                      <p className="text-sm">
                        <span className="print:text-black">{exp.title}</span>
                        {exp.stack && (
                          <span className="text-muted-foreground print:text-gray-600">
                            ; {exp.stack}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground print:text-gray-600 shrink-0">
                      <p>{exp.dates}</p>
                      <p className="italic">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0">•</span>
                        <span className="text-muted-foreground print:text-gray-700">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-lg font-bold border-b border-border pb-1 mb-3 print:border-gray-300 print:text-black">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.name}>
                  <p>
                    <span className="font-semibold print:text-black">
                      {project.name}
                    </span>
                    <span className="text-muted-foreground print:text-gray-600">
                      ; {project.stack}
                    </span>
                  </p>
                  <ul className="mt-1 space-y-1 text-sm">
                    {project.bullets.slice(0, 3).map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0">•</span>
                        <span className="text-muted-foreground print:text-gray-700">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
