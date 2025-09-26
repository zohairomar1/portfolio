"use client";

import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Lightbulb, BookOpen, Sparkles, Coffee } from "lucide-react";
import { PageNav, getPageNav } from "@/components/menu/PageNav";

const LESSONS = [
  {
    id: "lesson-1",
    title: "The Art of Learning on the Job",
    icon: BookOpen,
    content: "Starting at a new company means facing unfamiliar tech stacks and workflows. The key is not knowing everything upfront — it's knowing how to learn fast and ask the right questions.",
  },
  {
    id: "lesson-2",
    title: "Shipping Is a Team Sport",
    icon: Coffee,
    content: "Leading a front-end team taught me that standups aren't just status updates. Shifting focus to blockers and dependencies made the biggest difference in sprint velocity.",
  },
  {
    id: "lesson-3",
    title: "Data Without Context Is Just Numbers",
    icon: Sparkles,
    content: "Building dashboards showed me that presenting all metrics at once overwhelms users. Role-based views — engineers vs. managers — made the data actually useful.",
  },
  {
    id: "lesson-4",
    title: "24 Hours to Ship or Sink",
    icon: Lightbulb,
    content: "Hackathons taught me that the best projects aren't the most ambitious — they're the ones that ship something real under time pressure.",
  },
];

const BLOOPERS = [
  {
    title: "The Git Force Push Incident",
    description: "Accidentally force-pushed to main and wiped three teammates' work. We recovered from reflog, but I earned a nickname that stuck for a whole semester.",
  },
  {
    title: "The CSS !important Spiral",
    description: "Added !important to a dozen CSS rules before realizing the actual issue was a missing position: relative. One line fixed everything.",
  },
  {
    title: "The Exposed API Key",
    description: "Committed an API key to a public repo during a hackathon. GitHub's secret scanning caught it in minutes. Now .env.local is always the first file I create.",
  },
  {
    title: "The Robot Rebellion",
    description: "A loose wire made our autonomous robot spin in circles and knock over a monitor during a late-night test. We added a kill switch the next day.",
  },
];

export default function BonusPage() {
  const { settings } = useSettings();

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <span className="tape-label">BONUS FEATURES</span>
          </div>

          <div className="mb-12 animate-fadeIn">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">Bonus Features</h1>
            {settings.subtitlesEnabled && (
              <p className="text-sm text-muted-foreground">Lessons learned and memorable mistakes</p>
            )}
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Every project comes with outtakes. Here are lessons and mistakes from the journey.
            </p>
          </div>

          {/* Lessons */}
          <section className="mb-16">
            <h2 className="font-display text-2xl text-primary vhs-text mb-6">Director&apos;s Commentary</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {LESSONS.map((lesson) => (
                <AccordionItem key={lesson.id} value={lesson.id} className="vhs-card px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <lesson.icon className="w-5 h-5 text-primary" />
                      <span className="font-display text-lg text-left">{lesson.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 leading-relaxed">{lesson.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Bloopers */}
          <section>
            <h2 className="font-display text-2xl text-primary vhs-text mb-6">Blooper Reel</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {BLOOPERS.map((blooper, index) => (
                <div key={blooper.title} className="vhs-card p-4 h-full">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{["🎬", "🎭", "🎪", "🎯"][index]}</span>
                    <div>
                      <h3 className="font-display text-primary mb-2">{blooper.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{blooper.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <PageNav prevPage={getPageNav("/bonus").prev} nextPage={getPageNav("/bonus").next} />
        </div>
      </main>
    </>
  );
}
