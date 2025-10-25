import type { Metadata } from "next";
import { VT323, Inter, JetBrains_Mono } from "next/font/google";
import { SettingsProvider } from "@/hooks/useSettings";
import { CRTWrapper } from "@/components/vhs/CRTWrapper";
import { StaticTransition } from "@/components/vhs/StaticTransition";
import { QuickNav } from "@/components/menu/QuickNav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppWrapper } from "@/components/AppWrapper";
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
  title: "Zohair Omar | Full-Stack Developer & Data/BI",
  description:
    "Portfolio of Zohair Omar - Full-Stack Developer and Data/BI specialist building products backed by metrics.",
  keywords: [
    "Zohair Omar",
    "Full-Stack Developer",
    "Data Analytics",
    "Power BI",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Zohair Omar" }],
  openGraph: {
    title: "Zohair Omar | Full-Stack Developer & Data/BI",
    description:
      "Portfolio of Zohair Omar - Full-Stack Developer and Data/BI specialist building products backed by metrics.",
    type: "website",
  },
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
            <AppWrapper>
              <CRTWrapper>
                <StaticTransition />
                <QuickNav />
                {children}
              </CRTWrapper>
            </AppWrapper>
          </TooltipProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
