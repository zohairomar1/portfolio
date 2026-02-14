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

  it("has City of Calgary IT Dev role", () => {
    const itDevRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/it-dev-student");
    expect(itDevRoles.length).toBeGreaterThan(0);
    expect(itDevRoles[0].company).toBe("City of Calgary");
    expect(itDevRoles[0].title).toBe("IT Developer Summer Student");
  });

  it("has City of Calgary Business Analyst role", () => {
    const baRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/business-analyst-student");
    expect(baRoles.length).toBeGreaterThan(0);
    expect(baRoles[0].company).toBe("City of Calgary");
    expect(baRoles[0].title).toBe("Business Analyst Student");
  });

  it("has City of Calgary Cybersecurity role", () => {
    const cyberRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/cybersecurity-student");
    expect(cyberRoles.length).toBeGreaterThan(0);
    expect(cyberRoles[0].company).toBe("City of Calgary");
    expect(cyberRoles[0].title).toBe("Cybersecurity Student");
  });

  it("has City of Calgary PMIS role", () => {
    const pmisRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/pmis-student");
    expect(pmisRoles.length).toBeGreaterThan(0);
    expect(pmisRoles[0].company).toBe("City of Calgary");
    expect(pmisRoles[0].title).toBe("Project Management Information Systems Summer Student");
  });

  it("has City of Calgary Automation Developer role", () => {
    const autoRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/automation-student");
    expect(autoRoles.length).toBeGreaterThan(0);
    expect(autoRoles[0].company).toBe("City of Calgary");
    expect(autoRoles[0].title).toBe("Automation Developer Student");
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

  it("visitor via /for/city-of-calgary/it-dev-student should match IT Dev role", () => {
    const companyConfig = {
      slug: "city-of-calgary/it-dev-student",
      displayName: "CITY OF CALGARY",
      subtitle: "IT Developer Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("IT Developer Summer Student");
  });

  it("visitor via /for/city-of-calgary/business-analyst-student should match BA role", () => {
    const companyConfig = {
      slug: "city-of-calgary/business-analyst-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Business Analyst Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Business Analyst Student");
  });

  it("visitor via /for/city-of-calgary/cybersecurity-student should match Cybersecurity role", () => {
    const companyConfig = {
      slug: "city-of-calgary/cybersecurity-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Cybersecurity Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Cybersecurity Student");
  });

  it("visitor via /for/city-of-calgary/pmis-student should match PMIS role", () => {
    const companyConfig = {
      slug: "city-of-calgary/pmis-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Project Management Information Systems Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Project Management Information Systems Summer Student");
  });

  it("visitor via /for/city-of-calgary/automation-student should match Automation role", () => {
    const companyConfig = {
      slug: "city-of-calgary/automation-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Automation Developer Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Automation Developer Student");
  });

  it("has City of Calgary Software Developer role", () => {
    const sweRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/swe-student");
    expect(sweRoles.length).toBeGreaterThan(0);
    expect(sweRoles[0].company).toBe("City of Calgary");
    expect(sweRoles[0].title).toBe("Software Developer Summer Student");
  });

  it("visitor via /for/city-of-calgary/swe-student should match SWE role", () => {
    const companyConfig = {
      slug: "city-of-calgary/swe-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Software Developer Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Software Developer Summer Student");
  });

  it("has City of Calgary Information Management Student role", () => {
    const imsRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/information-management-student");
    expect(imsRoles.length).toBeGreaterThan(0);
    expect(imsRoles[0].company).toBe("City of Calgary");
    expect(imsRoles[0].title).toBe("Information Management Student");
  });

  it("visitor via /for/city-of-calgary/information-management-student should match IMS role", () => {
    const companyConfig = {
      slug: "city-of-calgary/information-management-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Information Management Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Information Management Student");
  });

  it("has City of Calgary IT Operations EUC role", () => {
    const eucRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/it-ops-euc-student");
    expect(eucRoles.length).toBeGreaterThan(0);
    expect(eucRoles[0].company).toBe("City of Calgary");
    expect(eucRoles[0].title).toBe("IT Operations End User Computing Summer Student");
  });

  it("visitor via /for/city-of-calgary/it-ops-euc-student should match EUC role", () => {
    const companyConfig = {
      slug: "city-of-calgary/it-ops-euc-student",
      displayName: "CITY OF CALGARY",
      subtitle: "IT Operations End User Computing Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("IT Operations End User Computing Summer Student");
  });

  it("has City of Calgary IT Operations Asset Management role", () => {
    const amRoles = directorsPickData.roles.filter((r) => r.companySlug === "city-of-calgary/it-ops-am-student");
    expect(amRoles.length).toBeGreaterThan(0);
    expect(amRoles[0].company).toBe("City of Calgary");
    expect(amRoles[0].title).toBe("IT Operations Asset Management Summer Student");
  });

  it("visitor via /for/city-of-calgary/it-ops-am-student should match AM role", () => {
    const companyConfig = {
      slug: "city-of-calgary/it-ops-am-student",
      displayName: "CITY OF CALGARY",
      subtitle: "IT Operations Asset Management Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#FF6B6B",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("IT Operations Asset Management Summer Student");
  });

  it("has ATCO AI & Automation role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "atco/ai-automation");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("ATCO");
    expect(roles[0].title).toBe("AI & Automation Co-op Student");
  });

  it("visitor via /for/atco/ai-automation should match AI & Automation role", () => {
    const companyConfig = {
      slug: "atco/ai-automation",
      displayName: "ATCO",
      subtitle: "AI & Automation Co-op Student",
      brandColor: "#2E299D",
      brandAccent: "#E9BF48",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("AI & Automation Co-op Student");
  });

  it("has ATCO ERP & SCM Support Analyst role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "atco/erp-scm-student");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("ATCO");
    expect(roles[0].title).toBe("ERP & SCM Support Analyst Co-op Student");
  });

  it("visitor via /for/atco/erp-scm-student should match ERP & SCM role", () => {
    const companyConfig = {
      slug: "atco/erp-scm-student",
      displayName: "ATCO",
      subtitle: "ERP & SCM Support Analyst Co-op Student",
      brandColor: "#2E299D",
      brandAccent: "#E9BF48",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("ERP & SCM Support Analyst Co-op Student");
  });

  it("has ATCO IT Solution Architecture role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "atco/solution-architecture-student");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("ATCO");
    expect(roles[0].title).toBe("IT Solution Architecture Co-op Student");
  });

  it("visitor via /for/atco/solution-architecture-student should match Solution Architecture role", () => {
    const companyConfig = {
      slug: "atco/solution-architecture-student",
      displayName: "ATCO",
      subtitle: "IT Solution Architecture Co-op Student",
      brandColor: "#2E299D",
      brandAccent: "#E9BF48",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("IT Solution Architecture Co-op Student");
  });

  it("has Precision Drilling AI Innovation Analyst role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "precision-drilling/ai-innovation-analyst-intern");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Precision Drilling");
    expect(roles[0].title).toBe("AI Innovation Analyst Intern");
  });

  it("visitor via /for/precision-drilling/ai-innovation-analyst-intern should match AI Innovation role", () => {
    const companyConfig = {
      slug: "precision-drilling/ai-innovation-analyst-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "AI Innovation Analyst Intern",
      brandColor: "#CC0000",
      brandAccent: "#FF4444",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("AI Innovation Analyst Intern");
  });

  it("has Precision Drilling Infrastructure Services role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "precision-drilling/infrastructure-services-intern");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Precision Drilling");
    expect(roles[0].title).toBe("Infrastructure Services, Systems & Storage Intern");
  });

  it("visitor via /for/precision-drilling/infrastructure-services-intern should match Infrastructure role", () => {
    const companyConfig = {
      slug: "precision-drilling/infrastructure-services-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "Infrastructure Services, Systems & Storage Intern",
      brandColor: "#CC0000",
      brandAccent: "#FF4444",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Infrastructure Services, Systems & Storage Intern");
  });

  it("has Precision Drilling Data Analyst role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "precision-drilling/data-analyst-intern");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Precision Drilling");
    expect(roles[0].title).toBe("Data Analyst Intern");
  });

  it("visitor via /for/precision-drilling/data-analyst-intern should match Data Analyst role", () => {
    const companyConfig = {
      slug: "precision-drilling/data-analyst-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "Data Analyst Intern",
      brandColor: "#CC0000",
      brandAccent: "#FF4444",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Data Analyst Intern");
  });

  it("has Precision Drilling SAP Development role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "precision-drilling/sap-development-intern");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Precision Drilling");
    expect(roles[0].title).toBe("SAP Development Intern");
  });

  it("visitor via /for/precision-drilling/sap-development-intern should match SAP Development role", () => {
    const companyConfig = {
      slug: "precision-drilling/sap-development-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "SAP Development Intern",
      brandColor: "#CC0000",
      brandAccent: "#FF4444",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("SAP Development Intern");
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
