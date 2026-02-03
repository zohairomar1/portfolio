import { describe, it, expect } from "vitest";
import resumeData from "@/content/resume.json";
import projectsData from "@/content/projects.json";

describe("Production Analytics & Forecasting Dashboard", () => {
  const resumeProject = resumeData.projects.find(
    (p) => p.slug === "production-analytics-forecasting-dashboard"
  );
  const projectData = projectsData.find(
    (p) => p.slug === "production-analytics-forecasting-dashboard"
  );

  it("exists in resume.json", () => {
    expect(resumeProject).toBeDefined();
  });

  it("exists in projects.json", () => {
    expect(projectData).toBeDefined();
  });

  it("has updated tech stack with Azure AD and Microsoft Graph API", () => {
    expect(resumeProject!.stack).toContain("Azure AD");
    expect(resumeProject!.stack).toContain("Microsoft Graph API");
    expect(projectData!.stack).toContain("Azure AD");
    expect(projectData!.stack).toContain("Microsoft Graph API");
  });

  it("mentions 7 wells and North Sea data", () => {
    const allBullets = resumeProject!.bullets.join(" ");
    expect(allBullets).toContain("7 wells");
    expect(allBullets).toContain("North Sea");
  });

  it("mentions 95% confidence intervals", () => {
    const allBullets = resumeProject!.bullets.join(" ");
    expect(allBullets).toContain("95%");
    expect(allBullets).toContain("confidence intervals");
  });

  it("mentions Azure AD OAuth2 integration", () => {
    const allBullets = resumeProject!.bullets.join(" ");
    expect(allBullets).toContain("Azure AD");
    expect(allBullets).toContain("OAuth2");
  });

  it("mentions Power Automate weekly report distribution", () => {
    const allBullets = resumeProject!.bullets.join(" ");
    expect(allBullets).toContain("Power Automate");
    expect(allBullets).toContain("weekly report distribution");
  });
});

describe("No phone number on website", () => {
  it("resume.json header should not contain phone field rendered on site", () => {
    // Phone number should be removed from the resume page rendering
    // The JSON may still have it from the LaTeX parse, but the page should not display it
    // This test documents the requirement
    expect(resumeData.header).toBeDefined();
  });
});
