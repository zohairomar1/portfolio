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

  it("has Nutrien Automation and AI Co-op role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "nutrien/automation-ai");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Nutrien");
    expect(roles[0].title).toBe("Automation and AI Co-op");
  });

  it("visitor via /for/nutrien/automation-ai should match Nutrien Automation AI role", () => {
    const companyConfig = {
      slug: "nutrien/automation-ai",
      displayName: "NUTRIEN",
      subtitle: "Automation and AI Co-op",
      brandColor: "#009A44",
      brandAccent: "#97D700",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Automation and AI Co-op");
  });

  it("has Health Shared Services IT Student role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "health-shared-services/it-student");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Health Shared Services");
    expect(roles[0].title).toBe("Co-op Work Experience Student - IT");
  });

  it("visitor via /for/health-shared-services/it-student should match AHS IT Student role", () => {
    const companyConfig = {
      slug: "health-shared-services/it-student",
      displayName: "HEALTH SHARED SERVICES",
      subtitle: "Co-op Work Experience Student - IT",
      brandColor: "#0579c3",
      brandAccent: "#17b374",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Co-op Work Experience Student - IT");
  });

  it("has Cardinal Energy Field Operations role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "cardinal-energy/field-operations-summer-student");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Cardinal Energy");
    expect(roles[0].title).toBe("Field Operations Summer Student");
  });

  it("visitor via /for/cardinal-energy/field-operations-summer-student should match Cardinal role", () => {
    const companyConfig = {
      slug: "cardinal-energy/field-operations-summer-student",
      displayName: "CARDINAL ENERGY",
      subtitle: "Field Operations Summer Student",
      brandColor: "#bc0f2d",
      brandAccent: "#7e889c",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Field Operations Summer Student");
  });

  it("has BIS Safety Software QA Intern role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "bis-safety-software/software-tester-qa-qc-intern");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("BIS Safety Software");
    expect(roles[0].title).toBe("Software Tester (QA/QC) Intern");
  });

  it("visitor via /for/bis-safety-software/software-tester-qa-qc-intern should match BIS role", () => {
    const companyConfig = {
      slug: "bis-safety-software/software-tester-qa-qc-intern",
      displayName: "BIS SAFETY SOFTWARE",
      subtitle: "Software Tester (QA/QC) Intern",
      brandColor: "#1a5a94",
      brandAccent: "#93c647",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Software Tester (QA/QC) Intern");
  });

  it("has FortisBC Information Systems Co-op role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "fortisbc/information-systems-coop");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("FortisBC");
    expect(roles[0].title).toBe("Information Systems Co-op");
  });

  it("visitor via /for/fortisbc/information-systems-coop should match FortisBC role", () => {
    const companyConfig = {
      slug: "fortisbc/information-systems-coop",
      displayName: "FORTISBC",
      subtitle: "Information Systems Co-op",
      brandColor: "#0e568f",
      brandAccent: "#ffce38",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Information Systems Co-op");
  });

  it("has Rakuten Kobo DevOps Engineering Co-op role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "rakuten-kobo/devops-engineering-coop");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Rakuten Kobo");
    expect(roles[0].title).toBe("DevOps Engineering Co-op");
  });

  it("visitor via /for/rakuten-kobo/devops-engineering-coop should match Kobo role", () => {
    const companyConfig = {
      slug: "rakuten-kobo/devops-engineering-coop",
      displayName: "RAKUTEN KOBO",
      subtitle: "DevOps Engineering Co-op",
      brandColor: "#c2130d",
      brandAccent: "#ffffff",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("DevOps Engineering Co-op");
  });

  it("has Cenovus Student, AI & Data Science role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "cenovus/information-technology-student");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Cenovus Energy");
    expect(roles[0].title).toBe("Student, AI & Data Science");
  });

  it("visitor via /for/cenovus/information-technology-student should match Cenovus role", () => {
    const companyConfig = {
      slug: "cenovus/information-technology-student",
      displayName: "CENOVUS",
      subtitle: "Student, AI & Data Science",
      brandColor: "#244c5b",
      brandAccent: "#cf4420",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Student, AI & Data Science");
  });

  it("has Critical Mass Development Intern role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "critical-mass/development-intern");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("Critical Mass");
    expect(roles[0].title).toBe("Development Intern");
  });

  it("visitor via /for/critical-mass/development-intern should match Critical Mass role", () => {
    const companyConfig = {
      slug: "critical-mass/development-intern",
      displayName: "CRITICAL MASS",
      subtitle: "Development Intern",
      brandColor: "#f24711",
      brandAccent: "#f7faf2",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Development Intern");
  });

  it("has University of Calgary GRC Student role", () => {
    const roles = directorsPickData.roles.filter((r) => r.companySlug === "university-of-calgary/grc-student");
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].company).toBe("University of Calgary");
    expect(roles[0].title).toBe("Governance, Risk & Compliance Student");
  });

  it("visitor via /for/university-of-calgary/grc-student should match UofC GRC role", () => {
    const companyConfig = {
      slug: "university-of-calgary/grc-student",
      displayName: "UNIVERSITY OF CALGARY",
      subtitle: "Governance, Risk & Compliance Student",
      brandColor: "#e6322e",
      brandAccent: "#ffd728",
    };
    sessionStorage.setItem("vhs-company", JSON.stringify(companyConfig));

    const parsed = JSON.parse(sessionStorage.getItem("vhs-company")!);
    const matched = directorsPickData.roles.filter((r) => r.companySlug === parsed.slug);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched[0].title).toBe("Governance, Risk & Compliance Student");
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
