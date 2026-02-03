"use client";

import { useState } from "react";
import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { generateChapterTime, getCategoryClass, getCategoryLabel } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";
import projectsData from "@/content/projects.json";
import type { ProjectItem } from "@/types/resume";
import { PageNav, getPageNav } from "@/components/menu/PageNav";
import { ScrollReveal, VHSSectionDivider } from "@/components/vhs/ScrollReveal";
import { FeaturedProject } from "@/components/vhs/FeaturedProject";
import { ProjectCardSkeleton } from "@/components/vhs/Skeleton";

type FilterType = "all" | "fullstack" | "data" | "hackathon";

export default function ScenesPage() {
  const { settings } = useSettings();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const projects = projectsData as ProjectItem[];
  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  const filteredProjects =
    filter === "all"
      ? regularProjects
      : regularProjects.filter((p) => p.category === filter);

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Track label */}
          <div className="mb-6">
            <span className="tape-label">SCENE SELECTION • PROJECTS</span>
          </div>

          {/* Header */}
          <div className="mb-8 animate-fadeIn">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">
              Scene Selection
            </h1>
            {settings.subtitlesEnabled && (
              <p className="text-sm text-muted-foreground">
                Select a chapter to view project details
              </p>
            )}
          </div>

          {/* Legend */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="text-foreground/70">Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="track-badge fullstack text-[10px]">A</span>
              <span>Full-Stack</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="track-badge data text-[10px]">B</span>
              <span>Data/BI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="track-badge hackathon text-[10px]">H</span>
              <span>Hackathon</span>
            </div>
          </div>

          {/* Featured Project */}
          {featuredProject && (filter === "all" || filter === featuredProject.category) && (
            <ScrollReveal variant="chromatic">
              <FeaturedProject
                project={featuredProject}
                onSelect={setSelectedProject}
              />
            </ScrollReveal>
          )}

          <VHSSectionDivider />

          {/* Filters */}
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as FilterType)}
            className="mb-8"
          >
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="fullstack">Full-Stack</TabsTrigger>
              <TabsTrigger value="data">Data/BI</TabsTrigger>
              <TabsTrigger value="hackathon">Hackathons</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Project Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => {
              // Cycle through animation variants for visual variety
              const variants: Array<"glitch" | "scanline" | "tape" | "flicker" | "chromatic"> =
                ["scanline", "tape", "glitch", "chromatic", "flicker"];
              const variant = variants[index % variants.length];

              return (
                <ScrollReveal
                  key={`${filter}-${project.slug || project.name}`}
                  delay={index * 80}
                  variant={variant}
                  skeleton={<ProjectCardSkeleton />}
                >
                  <button
                    className="vhs-card p-4 text-left group cursor-pointer hover:scale-[1.02] transition-transform w-full h-full"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Chapter info */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        CH {String(index + 1).padStart(2, "0")} •{" "}
                        {generateChapterTime(index)}
                      </span>
                      <span
                        className={`track-badge text-[10px] ${getCategoryClass(
                          project.category
                        )}`}
                      >
                        {project.category === "fullstack"
                          ? "A"
                          : project.category === "data"
                          ? "B"
                          : "H"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg text-primary group-hover:vhs-text mb-2 transition-all">
                      {project.name}
                    </h3>

                    {/* Stack */}
                    <p className="text-xs text-muted-foreground font-mono mb-3 line-clamp-1">
                      {project.stack}
                    </p>

                    {/* Pitch preview */}
                    <p className="text-sm text-foreground/70 line-clamp-2">
                      {project.pitch || project.bullets[0]}
                    </p>

                    {/* View indicator */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-primary/70 group-hover:text-primary transition-colors">
                      <span>▸ View Details</span>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects found in this category.
            </div>
          )}

          {/* Page Navigation */}
          <PageNav
            prevPage={getPageNav("/scenes").prev}
            nextPage={getPageNav("/scenes").next}
          />
        </div>
      </main>

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`track-badge ${getCategoryClass(
                      selectedProject.category
                    )}`}
                  >
                    {getCategoryLabel(selectedProject.category)}
                  </span>
                </div>
                <DialogTitle className="font-display text-2xl text-primary">
                  {selectedProject.name}
                </DialogTitle>
                <DialogDescription className="font-mono text-sm">
                  {selectedProject.stack}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {/* Pitch */}
                {selectedProject.pitch && (
                  <p className="text-sm text-foreground/90">
                    {selectedProject.pitch}
                  </p>
                )}

                {/* Key Challenge / What I Learned */}
                {selectedProject.keyChallenge && (
                  <div className="border-l-2 border-primary/50 pl-3">
                    <span className="text-xs font-mono text-primary/70 uppercase tracking-wider">
                      Director's Notes
                    </span>
                    <p className="text-sm text-foreground/80 mt-1">
                      {selectedProject.keyChallenge}
                    </p>
                  </div>
                )}

                {/* Fallback to bullets if no pitch/keyChallenge */}
                {!selectedProject.pitch && !selectedProject.keyChallenge && (
                  <ul className="space-y-3">
                    {selectedProject.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-primary shrink-0">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Links */}
                {selectedProject.url && (
                  <div className="pt-4 border-t border-border flex gap-3">
                    <Button variant="vhs" asChild>
                      <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedProject.url.includes("github") ? (
                          <>
                            <Github className="w-4 h-4 mr-2" />
                            View on GitHub
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Website
                          </>
                        )}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
