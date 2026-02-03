import { describe, it, expect } from "vitest";
import resumeData from "@/content/resume.json";
import projectsData from "@/content/projects.json";
import directorsPickData from "@/content/directors-pick.json";
import fs from "fs";
import path from "path";

const EM_DASH = "\u2014"; // —
const EN_DASH = "\u2013"; // –

function findDashes(obj: unknown, path = ""): string[] {
  const issues: string[] = [];
  if (typeof obj === "string") {
    if (obj.includes(EM_DASH)) issues.push(`Em-dash found at ${path}: "${obj.substring(0, 60)}..."`);
    if (obj.includes(EN_DASH)) issues.push(`En-dash found at ${path}: "${obj.substring(0, 60)}..."`);
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => issues.push(...findDashes(item, `${path}[${i}]`)));
  } else if (obj && typeof obj === "object") {
    Object.entries(obj).forEach(([key, val]) => issues.push(...findDashes(val, `${path}.${key}`)));
  }
  return issues;
}

describe("No em-dashes or en-dashes in user-visible content", () => {
  it("resume.json has no em-dashes or en-dashes", () => {
    const issues = findDashes(resumeData, "resume.json");
    expect(issues).toEqual([]);
  });

  it("projects.json has no em-dashes or en-dashes", () => {
    const issues = findDashes(projectsData, "projects.json");
    expect(issues).toEqual([]);
  });

  it("directors-pick.json has no em-dashes or en-dashes", () => {
    const issues = findDashes(directorsPickData, "directors-pick.json");
    expect(issues).toEqual([]);
  });
});

describe("Phone number not displayed on website", () => {
  it("resume page does not render phone number", () => {
    const resumePage = fs.readFileSync(
      path.resolve(__dirname, "../app/resume/page.tsx"),
      "utf-8"
    );
    // The phone span should not be in the rendered output
    expect(resumePage).not.toContain("{header.phone}");
  });
});

describe("Resume PDF download", () => {
  it("public/resume.pdf exists and is not empty", () => {
    const pdfPath = path.resolve(__dirname, "../public/resume.pdf");
    const stats = fs.statSync(pdfPath);
    expect(stats.size).toBeGreaterThan(0);
  });

  it("resume page links to /resume.pdf", () => {
    const resumePage = fs.readFileSync(
      path.resolve(__dirname, "../app/resume/page.tsx"),
      "utf-8"
    );
    expect(resumePage).toContain('href="/resume.pdf"');
  });
});

describe("Bonus and Behind pages have no em-dashes", () => {
  it("bonus/page.tsx has no em-dashes or en-dashes in content", () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, "../app/bonus/page.tsx"),
      "utf-8"
    );
    // Only check string literals (content between backticks/quotes), not comments
    const stringLiterals = content.match(/`[^`]*`|"[^"]*"/g) || [];
    const issues = stringLiterals.filter(
      (s) => s.includes(EM_DASH) || s.includes(EN_DASH)
    );
    expect(issues).toEqual([]);
  });

  it("behind/page.tsx has no em-dashes or en-dashes in content", () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, "../app/behind/page.tsx"),
      "utf-8"
    );
    const stringLiterals = content.match(/`[^`]*`|"[^"]*"/g) || [];
    const issues = stringLiterals.filter(
      (s) => s.includes(EM_DASH) || s.includes(EN_DASH)
    );
    expect(issues).toEqual([]);
  });
});
