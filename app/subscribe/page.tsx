"use client";

import { useState } from "react";
import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Mail, Download, Copy, Check, Github, Linkedin, Phone } from "lucide-react";
import resumeData from "@/content/resume.json";
import { PageNav, getPageNav } from "@/components/menu/PageNav";

export default function SubscribePage() {
  const { settings } = useSettings();
  const { header } = resumeData;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(header.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Track label */}
          <div className="mb-6">
            <span className="tape-label">SUBSCRIBE &bull; FAN MAIL</span>
          </div>

          {/* Header */}
          <div className="mb-12 animate-fadeIn text-center">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">
              Get In Touch
            </h1>
            {settings.subtitlesEnabled && (
              <p className="text-sm text-muted-foreground">
                Contact &amp; Resume
              </p>
            )}
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Want to collaborate, chat about tech, or just say hi? Reach out
              through any of the channels below.
            </p>
          </div>

          {/* Download Resume - Featured */}
          <div
            className="vhs-card p-6 mb-6 animate-slideUp text-center"
          >
            <h2 className="font-display text-xl text-primary mb-3">
              Download Resume
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Get the full picture in PDF format.
            </p>
            <Button variant="vhs" asChild className="w-full max-w-xs mx-auto">
              <a href="/resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download Resume (PDF)
              </a>
            </Button>
          </div>

          {/* Quick Contact */}
          <div
            className="vhs-card p-6 mb-6 animate-slideUp"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="font-display text-xl text-primary mb-4">
              Quick Contact
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono">{header.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={copyEmail}>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <a
                href={`tel:${header.phone}`}
                className="flex items-center gap-2 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">{header.phone}</span>
              </a>

              <a
                href={`https://${header.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">{header.linkedin}</span>
              </a>

              <a
                href={`https://${header.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors"
              >
                <Github className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">{header.github}</span>
              </a>
            </div>
          </div>

          {/* Chinese Proverb */}
          <div
            className="vhs-card p-6 text-center animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="font-mono text-sm text-muted-foreground italic">
              &quot;The best time to plant a tree was 20 years ago. The
              second best time is now.&quot;
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              &mdash; Chinese Proverb
            </p>
          </div>

          {/* Page Navigation */}
          <PageNav
            prevPage={getPageNav("/subscribe").prev}
          />
        </div>
      </main>
    </>
  );
}
