export interface CompanyConfig {
  slug: string;
  displayName: string;
  subtitle?: string;
  brandColor: string;
  brandAccent: string;
}

const ALLOWED_COMPANIES: Record<string, CompanyConfig> = {
  "city-of-calgary": { slug: "city-of-calgary", displayName: "CITY OF CALGARY", brandColor: "#D0202E", brandAccent: "#E8636B" },
  imperial: { slug: "imperial", displayName: "IMPERIAL OIL", brandColor: "#0072CE", brandAccent: "#5AB0F2" },
  wealthsimple: { slug: "wealthsimple", displayName: "WEALTHSIMPLE", brandColor: "#333333", brandAccent: "#888888" },
  deloitte: { slug: "deloitte", displayName: "DELOITTE", brandColor: "#80b625", brandAccent: "#ffffff" },
  bmo: { slug: "bmo", displayName: "BMO", brandColor: "#0079C1", brandAccent: "#ED1C24" },
  atco: { slug: "atco", displayName: "ATCO", brandColor: "#2E299D", brandAccent: "#E9BF48" },
  "precision-drilling": { slug: "precision-drilling", displayName: "PRECISION DRILLING", brandColor: "#4a9841", brandAccent: "#ffffff" },
  nutrien: { slug: "nutrien", displayName: "NUTRIEN", brandColor: "#009A44", brandAccent: "#97D700" },
  "health-shared-services": { slug: "health-shared-services", displayName: "HEALTH SHARED SERVICES", brandColor: "#0579c3", brandAccent: "#17b374" },
  "cardinal-energy": { slug: "cardinal-energy", displayName: "CARDINAL ENERGY", brandColor: "#bc0f2d", brandAccent: "#7e889c" },
  "bis-safety-software": { slug: "bis-safety-software", displayName: "BIS SAFETY SOFTWARE", brandColor: "#1a5a94", brandAccent: "#93c647" },
  fortisbc: { slug: "fortisbc", displayName: "FORTISBC", brandColor: "#0e568f", brandAccent: "#ffce38" },
  "rakuten-kobo": { slug: "rakuten-kobo", displayName: "RAKUTEN KOBO", brandColor: "#c2130d", brandAccent: "#ffffff" },
  cenovus: { slug: "cenovus", displayName: "CENOVUS", brandColor: "#244c5b", brandAccent: "#cf4420" },
  "critical-mass": { slug: "critical-mass", displayName: "CRITICAL MASS", brandColor: "#f24711", brandAccent: "#f7faf2" },
  "university-of-calgary": { slug: "university-of-calgary", displayName: "UNIVERSITY OF CALGARY", brandColor: "#e6322e", brandAccent: "#ffd728" },
  clio: { slug: "clio", displayName: "CLIO", brandColor: "#006fdf", brandAccent: "#ffffff" },
  nokia: { slug: "nokia", displayName: "NOKIA", brandColor: "#0059fe", brandAccent: "#ffffff" },
  sap: { slug: "sap", displayName: "SAP", brandColor: "#0a9ce1", brandAccent: "#ffffff" },
  kinaxis: { slug: "kinaxis", displayName: "KINAXIS", brandColor: "#E30613", brandAccent: "#ffffff" },
  mackenzie: { slug: "mackenzie", displayName: "MACKENZIE INVESTMENTS", brandColor: "#6AB2E2", brandAccent: "#333333" },
  igm: { slug: "igm", displayName: "IGM FINANCIAL", brandColor: "#6AB2E2", brandAccent: "#333333" },
  ey: { slug: "ey", displayName: "EY", brandColor: "#333333", brandAccent: "#ffe600" },
  aecon: { slug: "aecon", displayName: "AECON", brandColor: "#EE2722", brandAccent: "#ffffff" },
  kpmg: { slug: "kpmg", displayName: "KPMG", brandColor: "#1E49E2", brandAccent: "#ffffff" },
  cut: { slug: "cut", displayName: "CARBON UPCYCLING", brandColor: "#21b27c", brandAccent: "#182c40" },
  magna: { slug: "magna", displayName: "MAGNA INTERNATIONAL", brandColor: "#DA291C", brandAccent: "#A4032F" },
};

// Role-specific configurations for /for/[company]/[role] routes
// The slug becomes "company/role" to match in directors-pick.json
const ALLOWED_COMPANY_ROLES: Record<string, Record<string, CompanyConfig>> = {
  "city-of-calgary": {
    "it-dev-student": {
      slug: "city-of-calgary/it-dev-student",
      displayName: "CITY OF CALGARY",
      subtitle: "IT Developer Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "business-analyst-student": {
      slug: "city-of-calgary/business-analyst-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Business Analyst Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "cybersecurity-student": {
      slug: "city-of-calgary/cybersecurity-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Cybersecurity Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "automation-student": {
      slug: "city-of-calgary/automation-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Automation Developer Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "pmis-student": {
      slug: "city-of-calgary/pmis-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Project Management Information Systems Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "swe-student": {
      slug: "city-of-calgary/swe-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Software Developer Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "information-management-student": {
      slug: "city-of-calgary/information-management-student",
      displayName: "CITY OF CALGARY",
      subtitle: "Information Management Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "it-ops-euc-student": {
      slug: "city-of-calgary/it-ops-euc-student",
      displayName: "CITY OF CALGARY",
      subtitle: "IT Operations End User Computing Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
    "it-ops-am-student": {
      slug: "city-of-calgary/it-ops-am-student",
      displayName: "CITY OF CALGARY",
      subtitle: "IT Operations Asset Management Summer Student",
      brandColor: "#D0202E",
      brandAccent: "#E8636B",
    },
  },
  atco: {
    "ai-automation": {
      slug: "atco/ai-automation",
      displayName: "ATCO",
      subtitle: "AI & Automation Co-op Student",
      brandColor: "#0057bb",
      brandAccent: "#E9BF48",
    },
    "erp-scm-student": {
      slug: "atco/erp-scm-student",
      displayName: "ATCO",
      subtitle: "ERP & SCM Support Analyst Co-op Student",
      brandColor: "#0057bb",
      brandAccent: "#E9BF48",
    },
    "solution-architecture-student": {
      slug: "atco/solution-architecture-student",
      displayName: "ATCO",
      subtitle: "IT Solution Architecture Co-op Student",
      brandColor: "#0057bb",
      brandAccent: "#E9BF48",
    },
  },
  "precision-drilling": {
    "ai-innovation-analyst-intern": {
      slug: "precision-drilling/ai-innovation-analyst-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "AI Innovation Analyst Intern",
      brandColor: "#4a9841",
      brandAccent: "#ffffff",
    },
    "infrastructure-services-intern": {
      slug: "precision-drilling/infrastructure-services-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "Infrastructure Services, Systems & Storage Intern",
      brandColor: "#4a9841",
      brandAccent: "#ffffff",
    },
    "data-analyst-intern": {
      slug: "precision-drilling/data-analyst-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "Data Analyst Intern",
      brandColor: "#4a9841",
      brandAccent: "#ffffff",
    },
    "sap-development-intern": {
      slug: "precision-drilling/sap-development-intern",
      displayName: "PRECISION DRILLING",
      subtitle: "SAP Development Intern",
      brandColor: "#4a9841",
      brandAccent: "#ffffff",
    },
  },
  nutrien: {
    "automation-ai": {
      slug: "nutrien/automation-ai",
      displayName: "NUTRIEN",
      subtitle: "Automation and AI Co-op",
      brandColor: "#009A44",
      brandAccent: "#97D700",
    },
  },
  "health-shared-services": {
    "it-student": {
      slug: "health-shared-services/it-student",
      displayName: "HEALTH SHARED SERVICES",
      subtitle: "Co-op Work Experience Student - IT",
      brandColor: "#0579c3",
      brandAccent: "#17b374",
    },
  },
  "cardinal-energy": {
    "field-operations-summer-student": {
      slug: "cardinal-energy/field-operations-summer-student",
      displayName: "CARDINAL ENERGY",
      subtitle: "Field Operations Summer Student",
      brandColor: "#bc0f2d",
      brandAccent: "#7e889c",
    },
  },
  "bis-safety-software": {
    "software-tester-qa-qc-intern": {
      slug: "bis-safety-software/software-tester-qa-qc-intern",
      displayName: "BIS SAFETY SOFTWARE",
      subtitle: "Software Tester (QA/QC) Intern",
      brandColor: "#1a5a94",
      brandAccent: "#93c647",
    },
  },
  fortisbc: {
    "information-systems-coop": {
      slug: "fortisbc/information-systems-coop",
      displayName: "FORTISBC",
      subtitle: "Information Systems Co-op",
      brandColor: "#0e568f",
      brandAccent: "#ffce38",
    },
  },
  "rakuten-kobo": {
    "devops-engineering-coop": {
      slug: "rakuten-kobo/devops-engineering-coop",
      displayName: "RAKUTEN KOBO",
      subtitle: "DevOps Engineering Co-op",
      brandColor: "#c2130d",
      brandAccent: "#ffffff",
    },
  },
  cenovus: {
    "information-technology-student": {
      slug: "cenovus/information-technology-student",
      displayName: "CENOVUS",
      subtitle: "Student, AI & Data Science",
      brandColor: "#244c5b",
      brandAccent: "#cf4420",
    },
  },
  "critical-mass": {
    "development-intern": {
      slug: "critical-mass/development-intern",
      displayName: "CRITICAL MASS",
      subtitle: "Development Intern",
      brandColor: "#f24711",
      brandAccent: "#f7faf2",
    },
  },
  "university-of-calgary": {
    "grc-student": {
      slug: "university-of-calgary/grc-student",
      displayName: "UNIVERSITY OF CALGARY",
      subtitle: "Governance, Risk & Compliance Student",
      brandColor: "#e6322e",
      brandAccent: "#ffd728",
    },
  },
  clio: {
    "software-developer-coop": {
      slug: "clio/software-developer-coop",
      displayName: "CLIO",
      subtitle: "Software Developer, Co-op",
      brandColor: "#006fdf",
      brandAccent: "#ffffff",
    },
  },
  nokia: {
    "innovation-automation": {
      slug: "nokia/innovation-automation",
      displayName: "NOKIA",
      subtitle: "Innovation & Automation Co-op",
      brandColor: "#0059fe",
      brandAccent: "#ffffff",
    },
  },
  deloitte: {
    "technology-transformation": {
      slug: "deloitte/technology-transformation",
      displayName: "DELOITTE",
      subtitle: "Technology Transformation",
      brandColor: "#80b625",
      brandAccent: "#ffffff",
    },
    "it-audit-assurance": {
      slug: "deloitte/it-audit-assurance",
      displayName: "DELOITTE",
      subtitle: "Analyst, IT Audit & Assurance",
      brandColor: "#80b625",
      brandAccent: "#ffffff",
    },
  },
  magna: {
    "software-engineering": {
      slug: "magna/software-engineering",
      displayName: "MAGNA INTERNATIONAL",
      subtitle: "Software Engineering Co-op, MML",
      brandColor: "#DA291C",
      brandAccent: "#A4032F",
    },
  },
  cut: {
    "data-analyst": {
      slug: "cut/data-analyst",
      displayName: "CARBON UPCYCLING",
      subtitle: "Data Analyst Intern",
      brandColor: "#21b27c",
      brandAccent: "#182c40",
    },
  },
  kpmg: {
    "advisory-consulting": {
      slug: "kpmg/advisory-consulting",
      displayName: "KPMG",
      subtitle: "Advisory, Management Consulting Intern",
      brandColor: "#1E49E2",
      brandAccent: "#ffffff",
    },
  },
  aecon: {
    "data-systems-analyst": {
      slug: "aecon/data-systems-analyst",
      displayName: "AECON",
      subtitle: "Data and Systems Analyst Co-op",
      brandColor: "#EE2722",
      brandAccent: "#ffffff",
    },
  },
  ey: {
    "technology-risk": {
      slug: "ey/technology-risk",
      displayName: "EY",
      subtitle: "Assurance Technology Risk Intern",
      brandColor: "#333333",
      brandAccent: "#ffe600",
    },
  },
  igm: {
    "technology-engineering": {
      slug: "igm/technology-engineering",
      displayName: "IGM FINANCIAL",
      subtitle: "Technology Engineering Intern",
      brandColor: "#6AB2E2",
      brandAccent: "#333333",
    },
    "cybersecurity-services": {
      slug: "igm/cybersecurity-services",
      displayName: "IGM FINANCIAL",
      subtitle: "Cybersecurity Services Intern",
      brandColor: "#6AB2E2",
      brandAccent: "#333333",
    },
  },
  mackenzie: {
    "mas-intern": {
      slug: "mackenzie/mas-intern",
      displayName: "MACKENZIE INVESTMENTS",
      subtitle: "MAS Intern, Multi-Asset Strategies",
      brandColor: "#6AB2E2",
      brandAccent: "#333333",
    },
  },
  kinaxis: {
    "software-developer-intern": {
      slug: "kinaxis/software-developer-intern",
      displayName: "KINAXIS",
      subtitle: "Software Developer Intern",
      brandColor: "#E30613",
      brandAccent: "#ffffff",
    },
  },
  sap: {
    "data-platform-technical-support": {
      slug: "sap/data-platform-technical-support",
      displayName: "SAP",
      subtitle: "iXp Intern, Data & Platform Technical Support",
      brandColor: "#0a9ce1",
      brandAccent: "#ffffff",
    },
  },
};

export function getCompanyConfig(slug: string): CompanyConfig | null {
  return ALLOWED_COMPANIES[slug.toLowerCase()] ?? null;
}

export function getCompanyRoleConfig(company: string, role: string): CompanyConfig | null {
  const companyRoles = ALLOWED_COMPANY_ROLES[company.toLowerCase()];
  if (!companyRoles) return null;
  return companyRoles[role.toLowerCase()] ?? null;
}
