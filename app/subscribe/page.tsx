"use client";

import { useState } from "react";
import { VHSHeader } from "@/components/menu/VHSHeader";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Mail, Download, Send, Github, Linkedin, Phone } from "lucide-react";
import resumeData from "@/content/resume.json";
import { PageNav, getPageNav } from "@/components/menu/PageNav";

export default function SubscribePage() {
  const { settings } = useSettings();
  const { header } = resumeData;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <VHSHeader />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <span className="tape-label">SUBSCRIBE &bull; FAN MAIL</span>
          </div>

          <div className="mb-12 animate-fadeIn">
            <h1 className="font-display text-4xl sm:text-5xl text-primary vhs-text mb-4">Get In Touch</h1>
            {settings.subtitlesEnabled && (
              <p className="text-sm text-muted-foreground">Contact &amp; Resume</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="vhs-card p-6">
              <h2 className="font-display text-xl text-primary mb-4">Send a Message</h2>
              {submitted ? (
                <p className="text-primary font-mono">Message sent! I&apos;ll get back to you soon.</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Your Name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-muted/30 border border-border rounded text-sm font-mono focus:border-primary outline-none"
                    required
                  />
                  <input type="email" placeholder="Your Email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-muted/30 border border-border rounded text-sm font-mono focus:border-primary outline-none"
                    required
                  />
                  <textarea placeholder="Your Message" value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-muted/30 border border-border rounded text-sm font-mono focus:border-primary outline-none h-32 resize-none"
                    required
                  />
                  <Button variant="vhs" type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Quick Contact + Download */}
            <div className="space-y-6">
              <div className="vhs-card p-6">
                <h2 className="font-display text-xl text-primary mb-3">Download Resume</h2>
                <Button variant="vhs" asChild className="w-full">
                  <a href="/resume.pdf" download>
                    <Download className="w-4 h-4 mr-2" />Download Resume (PDF)
                  </a>
                </Button>
              </div>
              <div className="vhs-card p-6">
                <h2 className="font-display text-xl text-primary mb-4">Quick Contact</h2>
                <div className="space-y-3">
                  <a href={`mailto:${header.email}`} className="flex items-center gap-2 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono">{header.email}</span>
                  </a>
                  <a href={`tel:${header.phone}`} className="flex items-center gap-2 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono">{header.phone}</span>
                  </a>
                  <a href={`https://${header.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors">
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono">{header.linkedin}</span>
                  </a>
                  <a href={`https://${header.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors">
                    <Github className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono">{header.github}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <PageNav prevPage={getPageNav("/subscribe").prev} />
        </div>
      </main>
    </>
  );
}
