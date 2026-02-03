"use client";

import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Lightbulb, BookOpen, Sparkles, Coffee, MapPin } from "lucide-react";
import { PageNav, getPageNav } from "@/components/menu/PageNav";
import { ScrollReveal, VHSSectionDivider } from "@/components/vhs/ScrollReveal";
import { LessonCardSkeleton, BlooperCardSkeleton } from "@/components/vhs/Skeleton";

const LESSONS = [
  {
    id: "lesson-1",
    title: "The Art of Learning on the Job",
    icon: BookOpen,
    content: `My first week at Agrius IT, I was assigned to debug a CORS issue blocking 1,000+ daily users. I'd never configured enterprise security protocols before. I spent day one reading Mozilla docs and tracing network requests in the browser. By week two, I was writing the proxy configurations myself. The lesson: you don't need to know everything going in — you need to know how to learn fast and ask the right questions.`,
  },
  {
    id: "lesson-2",
    title: "Shipping Is a Team Sport",
    icon: Coffee,
    content: `At WealthPath, I ran 2-3 standups a week with my 4-person front-end team. Early on, I focused too much on what was getting built and not enough on what was getting blocked. Once I shifted standups from "status updates" to "what's slowing you down?", our sprint velocity improved noticeably. The component library we built got adopted across 5+ pages because we prioritized reusable patterns over quick fixes.`,
  },
  {
    id: "lesson-3",
    title: "Data Without Context Is Just Numbers",
    icon: Sparkles,
    content: `When I built the Oil & Gas Asset Integrity Dashboard, I initially showed every KPI on one screen — corrosion rates, SRB levels, overdue inspections, the works. The first feedback from a test user was "I don't know where to look." That's when I implemented role-based views: engineers see the technical metrics, managers see compliance summaries. Same data, different stories. That reframe changed how I think about building for users.`,
  },
  {
    id: "lesson-4",
    title: "24 Hours to Ship or Sink",
    icon: Lightbulb,
    content: `At nwHacks 2024, our original idea fell apart 4 hours in when we realized the API we needed didn't exist. We pivoted to Comfort Corner — a mental health support tool. We integrated OpenAI's API for a chatbot, designed the UI, and deployed. We placed top 10 out of 653 participants. The pivot taught me that the best hackathon projects aren't the most ambitious — they're the ones that ship something real under pressure.`,
  },
  {
    id: "lesson-5",
    title: "Moving 900km for a Fresh Start",
    icon: MapPin,
    content: `Transferring from UBC to UCalgary in Fall 2024 was the hardest decision I'd made. I was leaving a city I loved, friends I'd built two years of memories with, and a campus where I felt comfortable. But I wanted to challenge myself — new environment, new opportunities, closer to the tech community I wanted to grow in. Within months, I co-founded TechNova and joined Enactus. Sometimes the uncomfortable choice is the right one.`,
  },
];

const BLOOPERS = [
  {
    title: "The Force Push Heard Round the Repo",
    description:
      "First month at UBC Design League, I ran git push --force on main instead of my feature branch. Three teammates' work vanished. We recovered it from reflog, but I earned the nickname 'Force Push' for a semester. Now I use branch protection rules on everything.",
  },
  {
    title: "The !important Epidemic",
    description:
      "While building a dashboard layout, I couldn't figure out why my sidebar was rendering behind the main content. Added !important to 12 CSS rules before realizing I'd set z-index on an element without position: relative. One line fixed it. I deleted all 12 !importants in shame.",
  },
  {
    title: "The .env That Wasn't",
    description:
      "During nwHacks, I committed our OpenAI API key to a public GitHub repo. Got an email from GitHub's secret scanning within minutes. Rotated the key, added .gitignore, and spent 20 minutes of our hackathon time on damage control. Now .env.local is the first file I create in any project.",
  },
  {
    title: "The 2 AM Robot Rebellion",
    description:
      "Our Design League robot was supposed to navigate around obstacles using ultrasonic sensors. During a late-night test, a loose wire made it spin in circles, knocking a monitor off a desk. We added a kill switch the next day. Hardware debugging hits different at 2 AM.",
  },
];

export default function BonusPage() {
  const { settings } = useSettings();

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Track label */}
          <div className="mb-6">
            <span className="tape-label">BONUS FEATURES</span>
          </div>

          {/* Header */}
          <div className="mb-12 animate-fadeIn">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">
              Bonus Features
            </h1>
            {settings.subtitlesEnabled && (
              <p className="text-sm text-muted-foreground">
                Lessons learned and memorable mistakes
              </p>
            )}
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Every project comes with outtakes. Here are real lessons and
              real mistakes from my journey — because growth happens when
              things don&apos;t go according to plan.
            </p>
          </div>

          {/* Lessons Learned */}
          <section className="mb-16">
            <ScrollReveal variant="glitch" delay={0}>
              <h2 className="font-display text-2xl text-primary vhs-text mb-6">
                Director&apos;s Commentary
              </h2>
            </ScrollReveal>

            <Accordion type="single" collapsible className="space-y-4">
              {LESSONS.map((lesson, index) => (
                <ScrollReveal
                  key={lesson.id}
                  delay={index * 80}
                  variant={index % 2 === 0 ? "tape" : "scanline"}
                  skeleton={<LessonCardSkeleton />}
                >
                  <AccordionItem
                    value={lesson.id}
                    className="vhs-card px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <lesson.icon className="w-5 h-5 text-primary" />
                        <span className="font-display text-lg text-left">
                          {lesson.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80 leading-relaxed">
                      {lesson.content}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </section>

          {/* Section Divider */}
          <VHSSectionDivider label="BLOOPER REEL" />

          {/* Bloopers */}
          <section>
            <ScrollReveal variant="chromatic" delay={0}>
              <h2 className="font-display text-2xl text-primary vhs-text mb-6">
                Blooper Reel
              </h2>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {BLOOPERS.map((blooper, index) => (
                <ScrollReveal
                  key={blooper.title}
                  delay={index * 100}
                  variant="flicker"
                  skeleton={<BlooperCardSkeleton />}
                >
                  <div className="vhs-card p-4 h-full">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-mono text-lg shrink-0">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>
                      <div>
                        <h3 className="font-display text-primary mb-2">
                          {blooper.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {blooper.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal variant="tape" delay={200}>
              <div className="mt-8 p-4 vhs-card text-center">
                <p className="text-sm text-muted-foreground font-mono">
                  &quot;Experience is what you get when you didn&apos;t get what you wanted.&quot;
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  &mdash; Randy Pausch, The Last Lecture
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* Page Navigation */}
          <PageNav
            prevPage={getPageNav("/bonus").prev}
            nextPage={getPageNav("/bonus").next}
          />
        </div>
      </main>
    </>
  );
}
