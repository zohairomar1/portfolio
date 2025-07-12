export interface SkillCategory {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  location?: string;
  dates: string;
  keyCourses?: string[];
}

export interface ExperienceItem {
  name: string;
  url?: string;
  title: string;
  stack?: string;
  location: string;
  dates: string;
  bullets: string[];
}

export interface ProjectItem {
  name: string;
  url?: string;
  stack: string;
  bullets: string[];
  slug?: string;
  category?: "fullstack" | "data" | "hackathon";
  // Website-specific fields (not from resume)
  pitch?: string; // 1-2 sentence elevator pitch
  keyChallenge?: string; // What I learned / key challenge
}

export interface ResumeData {
  header: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  skills: SkillCategory[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
}

// Settings types
export type ThemePreset = "crt-blue" | "vhs-purple" | "test-card";
export type FlickerIntensity = "low" | "med" | "high";

export interface Settings {
  effectsEnabled: boolean;
  flickerIntensity: FlickerIntensity;
  grainEnabled: boolean;
  soundEnabled: boolean;
  theme: ThemePreset;
  subtitlesEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  effectsEnabled: true,
  flickerIntensity: "med",
  grainEnabled: true,
  soundEnabled: false,
  theme: "crt-blue",
  subtitlesEnabled: false,
};
