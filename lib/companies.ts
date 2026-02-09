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
  deloitte: { slug: "deloitte", displayName: "DELOITTE", brandColor: "#86BC25", brandAccent: "#B8E06A" },
  bmo: { slug: "bmo", displayName: "BMO", brandColor: "#0079C1", brandAccent: "#ED1C24" },
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
};

export function getCompanyConfig(slug: string): CompanyConfig | null {
  return ALLOWED_COMPANIES[slug.toLowerCase()] ?? null;
}

export function getCompanyRoleConfig(company: string, role: string): CompanyConfig | null {
  const companyRoles = ALLOWED_COMPANY_ROLES[company.toLowerCase()];
  if (!companyRoles) return null;
  return companyRoles[role.toLowerCase()] ?? null;
}
