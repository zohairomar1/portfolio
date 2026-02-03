export interface CompanyConfig {
  displayName: string;
  subtitle?: string;
  brandColor: string;
  brandAccent: string;
  logo?: string;
}

const ALLOWED_COMPANIES: Record<string, CompanyConfig> = {
  "city-of-calgary": { displayName: "CITY OF CALGARY", brandColor: "#D0202E", brandAccent: "#FF6B6B", logo: "/city-of-calgary-logo.png" },
  imperial: { displayName: "IMPERIAL OIL", brandColor: "#0072CE", brandAccent: "#5AB0F2", logo: "/imperial.png" },
  wealthsimple: { displayName: "WEALTHSIMPLE", brandColor: "#333333", brandAccent: "#888888", logo: "/wealthsimple.png" },
  deloitte: { displayName: "DELOITTE", brandColor: "#86BC25", brandAccent: "#B8E06A", logo: "/deloitte.png" },
  bmo: { displayName: "BMO", brandColor: "#0079C1", brandAccent: "#ED1C24", logo: "/bmo.png" },
};

export function getCompanyConfig(slug: string): CompanyConfig | null {
  return ALLOWED_COMPANIES[slug.toLowerCase()] ?? null;
}
