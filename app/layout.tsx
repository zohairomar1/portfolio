import type { Metadata } from "next";
import { VT323, Inter, JetBrains_Mono } from "next/font/google";
import { SettingsProvider } from "@/hooks/useSettings";
import { CRTWrapper } from "@/components/vhs/CRTWrapper";
import { StaticTransition } from "@/components/vhs/StaticTransition";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const displayFont = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Zohair Omar | Portfolio",
  description: "Portfolio of Zohair Omar - Full-Stack Developer and Data/BI specialist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="antialiased">
        <SettingsProvider>
          <TooltipProvider>
            <CRTWrapper>
              <StaticTransition />
              {children}
            </CRTWrapper>
          </TooltipProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
