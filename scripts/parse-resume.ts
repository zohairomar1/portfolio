import * as fs from "fs";
import * as path from "path";
import type {
  ResumeData,
  SkillCategory,
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "../types/resume";

const CONTENT_DIR = path.join(process.cwd(), "content");
const TEX_FILE = path.join(CONTENT_DIR, "resume.tex");
const OUTPUT_FILE = path.join(CONTENT_DIR, "resume.json");
const FALLBACK_FILE = path.join(CONTENT_DIR, "resume.manual.json");

// Helper to clean LaTeX formatting
function cleanLatex(text: string): string {
  return text
    .replace(/\\textbf\{([^}]*)\}/g, "$1") // Remove \textbf{}
    .replace(/\\textit\{([^}]*)\}/g, "$1") // Remove \textit{}
    .replace(/\\href\{[^}]*\}\{([^}]*)\}/g, "$1") // Extract text from \href
    .replace(/\\\\/g, "") // Remove \\
    .replace(/\\&/g, "&") // Replace \& with &
    .replace(/\\\$/g, "$") // Replace \$ with $
    .replace(/\\%/g, "%") // Replace \% with %
    .replace(/\\_/g, "_") // Replace \_ with _
    .replace(/\\#/g, "#") // Replace \# with #
    .replace(/~+/g, " ") // Replace ~ with space
    .replace(/``/g, '"') // Replace `` with "
    .replace(/''/g, '"') // Replace '' with "
    .replace(/`/g, "'") // Replace ` with '
    .replace(/'/g, "'") // Replace ' with '
    .replace(/--/g, "-") // Replace -- with hyphen
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

// Extract URL from \href{url}{text}
function extractHref(text: string): { url?: string; text: string } {
  const match = text.match(/\\href\{([^}]*)\}\{([^}]*)\}/);
  if (match) {
    return {
      url: match[1],
      text: cleanLatex(match[2]),
    };
  }
  return { text: cleanLatex(text) };
}

// Parse sections from LaTeX
function parseSections(
  content: string
): Map<string, string> {
  const sections = new Map<string, string>();
  const sectionRegex = /\\sectiontitle\{([^}]+)\}([\s\S]*?)(?=\\sectiontitle\{|\\end\{document\}|$)/g;

  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    sections.set(match[1].trim(), match[2].trim());
  }

  return sections;
}

// Parse header info
function parseHeader(content: string): ResumeData["header"] {
  const headerMatch = content.match(
    /\\begin\{center\}([\s\S]*?)\\end\{center\}/
  );
  const headerText = headerMatch ? headerMatch[1] : "";

  // Extract name
  const nameMatch = headerText.match(/\\textbf\{([^}]+)\}/);
  const name = nameMatch ? cleanLatex(nameMatch[1]) : "Zohair Omar";

  // Extract email
  const emailMatch = headerText.match(
    /\\href\{mailto:([^}]+)\}\{[^}]+\}/
  );
  const email = emailMatch ? emailMatch[1] : "zohairomar@gmail.com";

  // Extract phone
  const phoneMatch = headerText.match(/\+[\d-]+/);
  const phone = phoneMatch ? phoneMatch[0] : "+1-604-8628753";

  // Extract LinkedIn
  const linkedinMatch = headerText.match(
    /\\href\{https?:\/\/linkedin\.com\/in\/([^}]+)\}/
  );
  const linkedin = linkedinMatch
    ? `linkedin.com/in/${linkedinMatch[1]}`
    : "linkedin.com/in/zohairomar";

  // Extract GitHub
  const githubMatch = headerText.match(
    /\\href\{https?:\/\/github\.com\/([^}]+)\}/
  );
  const github = githubMatch
    ? `github.com/${githubMatch[1]}`
    : "github.com/zohairomar1";

  return { name, email, phone, linkedin, github };
}

// Parse skills section
function parseSkills(content: string): SkillCategory[] {
  const skills: SkillCategory[] = [];
  const lines = content.split(/\\\\|\n/).filter((l) => l.trim());

  for (const line of lines) {
    const match = line.match(/\\textbf\{([^}]+):\}\s*(.+)/);
    if (match) {
      const category = cleanLatex(match[1]);
      // Split by comma, but not commas inside parentheses
      const items: string[] = [];
      let current = "";
      let parenDepth = 0;

      for (const char of match[2]) {
        if (char === "(") parenDepth++;
        else if (char === ")") parenDepth--;

        if (char === "," && parenDepth === 0) {
          const cleaned = cleanLatex(current);
          if (cleaned) items.push(cleaned);
          current = "";
        } else {
          current += char;
        }
      }

      const lastItem = cleanLatex(current);
      if (lastItem) items.push(lastItem);

      skills.push({ category, items });
    }
  }

  return skills;
}

// Parse education section
function parseEducation(content: string): EducationItem[] {
  const education: EducationItem[] = [];
  const lines = content.split("\n").filter((l) => l.trim());

  let currentEntry: Partial<EducationItem> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for degree line with date
    const degreeMatch = line.match(
      /\\textbf\{([^}]+)\}\s*\\hfill\s*\{([^}]+)\}/
    );
    if (degreeMatch) {
      if (currentEntry && currentEntry.degree) {
        education.push(currentEntry as EducationItem);
      }
      currentEntry = {
        degree: cleanLatex(degreeMatch[1]),
        dates: cleanLatex(degreeMatch[2]),
      };
      continue;
    }

    // Check for school line
    if (currentEntry && !currentEntry.school) {
      const schoolMatch = line.match(/^\{?([^}\\]+)/);
      if (schoolMatch && !line.includes("\\textbf") && !line.includes("\\textit{\\textbf")) {
        const schoolText = cleanLatex(schoolMatch[1]);
        if (schoolText && !schoolText.startsWith("Key Courses")) {
          currentEntry.school = schoolText;
          continue;
        }
      }
    }

    // Check for Key Courses
    const coursesMatch = line.match(
      /\\textit\{\\textbf\{Key Courses:\}\}\s*(.+)/
    );
    if (coursesMatch) {
      const courses = coursesMatch[1]
        .split(",")
        .map((c) => cleanLatex(c))
        .filter((c) => c.length > 0);
      if (education.length > 0) {
        education[education.length - 1].keyCourses = courses;
      } else if (currentEntry) {
        currentEntry.keyCourses = courses;
      }
    }
  }

  if (currentEntry && currentEntry.degree) {
    education.push(currentEntry as EducationItem);
  }

  return education;
}

// Parse experience section
function parseExperience(content: string): ExperienceItem[] {
  const experiences: ExperienceItem[] = [];

  // Split entries by \end{itemize} blocks - each experience ends with one
  const entries: string[] = [];
  const parts = content.split(/\\end\{itemize\}/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed && trimmed.includes('\\hfill')) {
      entries.push(trimmed + '\\end{itemize}');
    }
  }

  for (const entryContent of entries) {

    // Parse company name and URL
    const nameLineMatch = entryContent.match(
      /\\textbf\{((?:\\href\{([^}]+)\}\{)?([^}]+)\}?)\}\s*\\hfill\s*\{([^}]+)\}/
    );
    if (!nameLineMatch) continue;

    const hrefInfo = extractHref(nameLineMatch[1]);
    const dates = cleanLatex(nameLineMatch[4]);

    // Parse title line - allow \& and other escaped chars in title/stack
    const titleMatch = entryContent.match(
      /\\hfill\s*\{[^}]+\}\s*\\\\?\s*\n?\s*(.+?)\\hfill\s*\\textit\s*\{([^}]+)\}/
    );

    let title = "";
    let stack = "";
    let location = "";

    if (titleMatch) {
      const titleParts = titleMatch[1].split(";");
      title = cleanLatex(titleParts[0]);
      stack = titleParts[1] ? cleanLatex(titleParts[1]) : "";
      location = cleanLatex(titleMatch[2]);
    }

    // Parse bullets - handle multi-line bullets
    const bullets: string[] = [];
    const itemizeMatch = entryContent.match(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/);
    if (itemizeMatch) {
      const itemsContent = itemizeMatch[1];
      // Split by \item and filter empty entries
      const items = itemsContent.split(/\\item\s+/).filter(s => s.trim());
      for (const item of items) {
        const cleaned = cleanLatex(item.replace(/\n/g, ' ').trim());
        if (cleaned) bullets.push(cleaned);
      }
    }

    experiences.push({
      name: hrefInfo.text,
      url: hrefInfo.url,
      title,
      stack,
      location,
      dates,
      bullets,
    });
  }

  return experiences;
}

// Parse projects section
function parseProjects(content: string): ProjectItem[] {
  const projects: ProjectItem[] = [];

  // Split entries by \end{itemize} blocks - each project ends with one
  const entries: string[] = [];
  const parts = content.split(/\\end\{itemize\}/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed && trimmed.includes('\\textbf{')) {
      entries.push(trimmed + '\\end{itemize}');
    }
  }

  for (const entryContent of entries) {

    // Parse name, url, and stack
    const headerMatch = entryContent.match(
      /(?:\\href\{([^}]+)\}\{)?\\textbf\{([^}]+)\}\}?\s*;\s*([^\n\\]+)/
    );
    if (!headerMatch) continue;

    const url = headerMatch[1] || undefined;
    const name = cleanLatex(headerMatch[2]);
    const stack = cleanLatex(headerMatch[3]);

    // Parse bullets - handle multi-line bullets
    const bullets: string[] = [];
    const itemizeMatch = entryContent.match(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/);
    if (itemizeMatch) {
      const itemsContent = itemizeMatch[1];
      // Split by \item and filter empty entries
      const items = itemsContent.split(/\\item\s+/).filter(s => s.trim());
      for (const item of items) {
        const cleaned = cleanLatex(item.replace(/\n/g, ' ').trim());
        if (cleaned) bullets.push(cleaned);
      }
    }

    // Generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Auto-categorize
    const stackLower = stack.toLowerCase();
    let category: ProjectItem["category"] = "fullstack";

    if (
      stackLower.includes("power bi") ||
      stackLower.includes("streamlit") ||
      stackLower.includes("pandas") ||
      stackLower.includes("statsmodels") ||
      stackLower.includes("r,") ||
      stackLower.includes("tidyverse")
    ) {
      category = "data";
    } else if (
      name.toLowerCase().includes("hack") ||
      bullets.some((b) => b.toLowerCase().includes("hackathon"))
    ) {
      category = "hackathon";
    }

    projects.push({
      name,
      url,
      stack,
      bullets,
      slug,
      category,
    });
  }

  return projects;
}

// Main parsing function
function parseResume(): ResumeData | null {
  try {
    if (!fs.existsSync(TEX_FILE)) {
      console.warn(
        `Warning: ${TEX_FILE} not found. Using fallback.`
      );
      return null;
    }

    const content = fs.readFileSync(TEX_FILE, "utf-8");
    const sections = parseSections(content);

    const resumeData: ResumeData = {
      header: parseHeader(content),
      skills: parseSkills(sections.get("Technical Skills") || ""),
      education: parseEducation(sections.get("Education") || ""),
      experience: parseExperience(sections.get("Experience") || ""),
      projects: parseProjects(sections.get("Projects") || ""),
    };

    return resumeData;
  } catch (error) {
    console.error("Error parsing resume:", error);
    return null;
  }
}

// Main execution
function main() {
  console.log("Parsing resume.tex...");

  let resumeData = parseResume();

  if (!resumeData) {
    console.warn("Falling back to resume.manual.json...");
    if (fs.existsSync(FALLBACK_FILE)) {
      const fallbackContent = fs.readFileSync(FALLBACK_FILE, "utf-8");
      resumeData = JSON.parse(fallbackContent);
    } else {
      console.error(
        "Error: No fallback file found. Please create resume.manual.json"
      );
      process.exit(1);
    }
  }

  // Apply experience overrides (pitch, etc.)
  const experienceOverrideFile = path.join(CONTENT_DIR, "experience.overrides.json");
  if (fs.existsSync(experienceOverrideFile)) {
    try {
      const overrides = JSON.parse(
        fs.readFileSync(experienceOverrideFile, "utf-8")
      ) as Record<string, Partial<ExperienceItem>>;
      resumeData!.experience = resumeData!.experience.map((exp) => ({
        ...exp,
        ...(overrides[exp.name] || {}),
      }));
    } catch (e) {
      console.warn("Could not parse experience.overrides.json:", e);
    }
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(resumeData, null, 2));
  console.log(`Successfully wrote ${OUTPUT_FILE}`);

  // Also generate projects.json with category overrides support
  const projectsFile = path.join(CONTENT_DIR, "projects.json");

  // Add portfolio project (not in resume.tex)
  const portfolioProject: ProjectItem = {
    name: "VHS Portfolio",
    url: "https://github.com/zohairomar1/portfolio-vhs",
    stack: "Next.js, TypeScript, Tailwind CSS, Radix UI",
    bullets: [
      "Built a retro VHS-themed portfolio website with custom animations and effects.",
      "Implemented a boot screen with CRT power-on effects, theme selection, and tape reel animations.",
      "Created a custom TypeWriter component and scanline effects for authentic 80s aesthetics."
    ],
    slug: "vhs-portfolio",
    category: "fullstack",
  };

  // Add Everyday Cleaning Company (not in resume.tex)
  const cleaningProject: ProjectItem = {
    name: "The Everyday Cleaning Company",
    url: "https://everydaycleaning.ca",
    stack: "Next.js, TypeScript, Tailwind CSS, Resend, Vercel",
    bullets: [
      "Founded and operate a residential cleaning company in Calgary, handling all business operations from client acquisition to service delivery.",
      "Built a full-stack website with an automated quote system, instant email confirmations via Resend, and SEO optimization.",
      "Implemented a dynamic pricing engine based on home size, service type, and add-ons with real-time quote generation.",
      "Manage all marketing, client relations, scheduling, and quality assurance as sole operator."
    ],
    slug: "everyday-cleaning-company",
    category: "fullstack",
  };

  let projectsWithOverrides = [...resumeData!.projects, cleaningProject, portfolioProject];

  // Check for manual overrides
  const projectsOverrideFile = path.join(
    CONTENT_DIR,
    "projects.overrides.json"
  );
  if (fs.existsSync(projectsOverrideFile)) {
    try {
      const overrides = JSON.parse(
        fs.readFileSync(projectsOverrideFile, "utf-8")
      ) as Record<string, Partial<ProjectItem>>;
      projectsWithOverrides = projectsWithOverrides.map((p) => ({
        ...p,
        ...(p.slug ? overrides[p.slug] : {}),
      }));
    } catch (e) {
      console.warn("Could not parse projects.overrides.json:", e);
    }
  }

  fs.writeFileSync(
    projectsFile,
    JSON.stringify(projectsWithOverrides, null, 2)
  );
  console.log(`Successfully wrote ${projectsFile}`);
}

main();
