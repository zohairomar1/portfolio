export interface CompanyConfig {
  displayName: string;
  subtitle?: string;
  brandColor: string;
  brandAccent: string;
}

const ALLOWED_COMPANIES: Record<string, CompanyConfig> = {
  "city-of-calgary": { displayName: "CITY OF CALGARY", brandColor: "#D0202E", brandAccent: "#FF6B6B" },
  wealthsimple: { displayName: "WEALTHSIMPLE", brandColor: "#00C853", brandAccent: "#69F0AE" },
  shopify: { displayName: "SHOPIFY", brandColor: "#96BF48", brandAccent: "#C8E6A0" },
  rbc: { displayName: "RBC", brandColor: "#005DAA", brandAccent: "#4DA6FF" },
  telus: { displayName: "TELUS", brandColor: "#6C2D82", brandAccent: "#B366CC" },
  atb: { displayName: "ATB FINANCIAL", brandColor: "#0072CE", brandAccent: "#66B3FF" },
  suncor: { displayName: "SUNCOR", brandColor: "#E31837", brandAccent: "#FF6B7A" },
  cenovus: { displayName: "CENOVUS", brandColor: "#003B5C", brandAccent: "#4DA3CC" },
  enbridge: { displayName: "ENBRIDGE", brandColor: "#F7941D", brandAccent: "#FFB84D" },
  "tc-energy": { displayName: "TC ENERGY", brandColor: "#003B71", brandAccent: "#4D88BF" },
  shaw: { displayName: "SHAW", brandColor: "#003D6B", brandAccent: "#4D8AB8" },
  benevity: { displayName: "BENEVITY", brandColor: "#FF6F00", brandAccent: "#FFB066" },
  neo: { displayName: "NEO FINANCIAL", brandColor: "#6366F1", brandAccent: "#A5A6F6" },
  symend: { displayName: "SYMEND", brandColor: "#1A1A2E", brandAccent: "#6B6B9E" },
  parvus: { displayName: "PARVUS THERAPEUTICS", brandColor: "#2E7D32", brandAccent: "#81C784" },
  garmin: { displayName: "GARMIN", brandColor: "#000000", brandAccent: "#4DA6FF" },
  helcim: { displayName: "HELCIM", brandColor: "#2563EB", brandAccent: "#7DA8F0" },
  attabotics: { displayName: "ATTABOTICS", brandColor: "#FF4500", brandAccent: "#FF8C66" },
  "smart-technologies": { displayName: "SMART TECHNOLOGIES", brandColor: "#0099CC", brandAccent: "#66CCE6" },
  boeing: { displayName: "BOEING", brandColor: "#003A70", brandAccent: "#4D8AB8" },
  amazon: { displayName: "AMAZON", brandColor: "#FF9900", brandAccent: "#FFBF66" },
  google: { displayName: "GOOGLE", brandColor: "#4285F4", brandAccent: "#8AB4F8" },
  microsoft: { displayName: "MICROSOFT", brandColor: "#00A4EF", brandAccent: "#66CCFF" },
  meta: { displayName: "META", brandColor: "#0668E1", brandAccent: "#6BA3EE" },
  apple: { displayName: "APPLE", brandColor: "#A2AAAD", brandAccent: "#D1D5D7" },
};

export function getCompanyConfig(slug: string): CompanyConfig | null {
  return ALLOWED_COMPANIES[slug.toLowerCase()] ?? null;
}
