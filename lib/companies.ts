export interface CompanyConfig {
  slug: string;
  displayName: string;
  subtitle?: string;
  brandColor: string;
  brandAccent: string;
}

const ALLOWED_COMPANIES: Record<string, CompanyConfig> = {
  "city-of-calgary": { slug: "city-of-calgary", displayName: "CITY OF CALGARY", brandColor: "#D0202E", brandAccent: "#FF6B6B" },
  imperial: { slug: "imperial", displayName: "IMPERIAL OIL", brandColor: "#0072CE", brandAccent: "#5AB0F2" },
  wealthsimple: { slug: "wealthsimple", displayName: "WEALTHSIMPLE", brandColor: "#333333", brandAccent: "#888888" },
  deloitte: { slug: "deloitte", displayName: "DELOITTE", brandColor: "#86BC25", brandAccent: "#B8E06A" },
  bmo: { slug: "bmo", displayName: "BMO", brandColor: "#0079C1", brandAccent: "#ED1C24" },
};

export function getCompanyConfig(slug: string): CompanyConfig | null {
  return ALLOWED_COMPANIES[slug.toLowerCase()] ?? null;
}
