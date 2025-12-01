export interface CompanyConfig {
  displayName: string;
  subtitle?: string;
}

const ALLOWED_COMPANIES: Record<string, CompanyConfig> = {
  wealthsimple: { displayName: "WEALTHSIMPLE" },
  shopify: { displayName: "SHOPIFY" },
  rbc: { displayName: "RBC" },
  telus: { displayName: "TELUS" },
  atb: { displayName: "ATB FINANCIAL" },
  suncor: { displayName: "SUNCOR" },
  cenovus: { displayName: "CENOVUS" },
  enbridge: { displayName: "ENBRIDGE" },
  "tc-energy": { displayName: "TC ENERGY" },
  shaw: { displayName: "SHAW" },
  benevity: { displayName: "BENEVITY" },
  neo: { displayName: "NEO FINANCIAL" },
  symend: { displayName: "SYMEND" },
  parvus: { displayName: "PARVUS THERAPEUTICS" },
  garmin: { displayName: "GARMIN" },
  helcim: { displayName: "HELCIM" },
  attabotics: { displayName: "ATTABOTICS" },
  "smart-technologies": { displayName: "SMART TECHNOLOGIES" },
  boeing: { displayName: "BOEING" },
  amazon: { displayName: "AMAZON" },
  google: { displayName: "GOOGLE" },
  microsoft: { displayName: "MICROSOFT" },
  meta: { displayName: "META" },
  apple: { displayName: "APPLE" },
};

export function getCompanyConfig(slug: string): CompanyConfig | null {
  return ALLOWED_COMPANIES[slug.toLowerCase()] ?? null;
}
