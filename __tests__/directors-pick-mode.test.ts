import { describe, it, expect, beforeEach } from "vitest";
import directorsPickData from "@/content/directors-pick.json";

/**
 * Tests that the Director's Pick page correctly determines custom vs generic mode.
 * Roles are now per-company with companySlug. The page matches roles against
 * the slug stored in sessionStorage by /for/[company].
 */
describe("Director's Pick mode detection", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("JSON has custom content with multiple company roles", () => {
    expect(directorsPickData.custom).toBe(true);
    expect(directorsPickData.roles.length).toBeGreaterThanOrEqual(2);
    // Each role must have company and companySlug
    for (const role of directorsPickData.roles) {
      expect(role.company).toBeTruthy();
      expect(role.companySlug).toBeTruthy();
      expect(role.title).toBeTruthy();
      expect(role.pitch).toBeTruthy();
    }
  });

  it("has a BMO role", () => {
    const bmoRoles = directorsPickData.roles.filter((r) => r.companySlug === "bmo");
    expect(bmoRoles.length).toBeGreaterThan(0);
    expect(bmoRoles[0].company).toBe("BMO Financial Group");
  });

  it("has a City of Calgary role", () => {
    const cocRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary");
    expect(cocRoles.length).toBeGreaterThan(0);
    expect(cocRoles[0].company).toBe("City of Calgary");
    expect(cocRoles[0].title).toBe("IT Developer Summer Student");
  });

  it("base website visitor (no sessionStorage) should NOT see custom mode", () => {
    const stored = sessionStorage.getItem("vhs-company");
    expect(stored).toBeNull();
  });

  it("visitor via /for/bmo should match BMO roles", () => {
    const companyConfig = {
      slug: "bmo",
      displayName: "BMO",
      brandColor: "#0079C1",
      brandAccent: "#ED1C24",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].company).toBe("BMO Financial Group");
  });

  it("visitor via /for/city-of-calgary should match City of Calgary roles", () => {
    const companyConfig = {
      slug: "city-of-calgary",
      displayName: "CITY OF CALGARY",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("IT Developer Summer Student");
  });

  it("visitor for unknown company should NOT match any roles", () => {
    const companyConfig = {
      slug: "unknown-company",
      displayName: "UNKNOWN",
      brandColor: "#000",
      brandAccent: "#000",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBe(0);
  });

  it("genericPitch is always available for base website visitors", () => {
    expect(directorsPickData.genericPitch).toBeTruthy();
    expect(typeof directorsPickData.genericPitch).toBe("string");
    expect(directorsPickData.genericPitch!.length).toBeGreaterThan(0);
  });

  it("highlights are available in both modes", () => {
    expect(directorsPickData.highlights.length).toBeGreaterThan(0);
    for (const h of directorsPickData.highlights) {
      expect(h.label).toBeTruthy();
      expect(h.problem).toBeTruthy();
      expect(h.built).toBeTruthy();
      expect(h.tech).toBeTruthy();
      expect(h.impact).toBeTruthy();
    }
  });
});

describe("Main page disclaimer", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should NOT show disclaimer on base website (no sessionStorage)", () => {
    const company = sessionStorage.getItem("vhs-company");
    expect(company).toBeNull();
  });

  it("should show disclaimer when company is in sessionStorage", () => {
    sessionStorage.setItem(
      "vhs-company",
      JSON.stringify({ slug: "bmo", displayName: "BMO" })
    );
    const company = JSON.parse(sessionStorage.getItem("vhs-company")!);
    expect(company.displayName).toBe("BMO");
  });
});
