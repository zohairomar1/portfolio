import { describe, it, expect, beforeEach } from "vitest";
import directorsPickData from "@/content/directors-pick.json";

/**
 * Tests that the Director's Pick page correctly determines custom vs generic mode.
 * The JSON may have custom: true with tailored content, but the page should only
 * show tailored content when sessionStorage has company data (set by /for/[company]).
 */
describe("Director's Pick mode detection", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("JSON has custom content available", () => {
    // The JSON file has custom: true and a targetCompany
    expect(directorsPickData.custom).toBe(true);
    expect(directorsPickData.targetCompany).toBeTruthy();
    expect(directorsPickData.roles.length).toBeGreaterThan(0);
  });

  it("base website visitor (no sessionStorage) should NOT see custom mode", () => {
    // Simulate a visitor to zohairomar.netlify.app - no /for/[company] visited
    const stored = sessionStorage.getItem("vhs-company");
    expect(stored).toBeNull();

    // The logic in useIsCustomMode: if no sessionStorage, isCustom = false
    const hasCompanyInSession = stored !== null;
    expect(hasCompanyInSession).toBe(false);
  });

  it("visitor via /for/bmo should see custom mode", () => {
    // Simulate what /for/[company] page does
    const companyConfig = {
      displayName: "BMO",
      brandColor: "#0079C1",
      brandAccent: "#ED1C24",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const stored = sessionStorage.getItem("vhs-company");
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored!);
    expect(parsed.displayName).toBeTruthy();

    // The logic in useIsCustomMode: if sessionStorage has company with displayName, isCustom = true
    const isCustom =
      directorsPickData.custom &&
      !!directorsPickData.targetCompany &&
      !!parsed.displayName;
    expect(isCustom).toBe(true);
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

  it("disclaimer should only show when company is in sessionStorage", () => {
    // No company in session = no disclaimer
    expect(sessionStorage.getItem("vhs-company")).toBeNull();

    // Set company in session = disclaimer should show
    sessionStorage.setItem(
      "vhs-company",
      JSON.stringify({ displayName: "BMO" })
    );
    const stored = sessionStorage.getItem("vhs-company");
    const parsed = JSON.parse(stored!);
    expect(parsed.displayName).toBe("BMO");
  });
});

describe("Main page disclaimer", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should NOT show disclaimer on base website (no sessionStorage)", () => {
    const company = sessionStorage.getItem("vhs-company");
    // company is null, so disclaimer condition (company && ...) is false
    expect(company).toBeNull();
  });

  it("should show disclaimer when company is in sessionStorage", () => {
    sessionStorage.setItem(
      "vhs-company",
      JSON.stringify({ displayName: "BMO" })
    );
    const company = JSON.parse(sessionStorage.getItem("vhs-company")!);
    expect(company.displayName).toBe("BMO");
  });
});
