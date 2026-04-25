export type CountryKey = "pakistan" | "ghana";

export interface CountryConfig {
  key: CountryKey;
  name: string;
  flag: string;
  unemployment: string;
  digital: string;
  digitalAccessPct: number;
  region: string;
  currency: string;
  educationOptions: string[];
}

export const COUNTRIES: Record<CountryKey, CountryConfig> = {
  pakistan: {
    key: "pakistan",
    name: "Pakistan",
    flag: "🇵🇰",
    unemployment: "11.4% youth unemployment",
    digital: "36% digital access",
    digitalAccessPct: 36,
    region: "South Asia",
    currency: "PKR",
    educationOptions: [
      "No formal education",
      "Primary (Grade 1-5)",
      "Middle (Grade 6-8)",
      "Matric (Grade 9-10)",
      "Intermediate (Grade 11-12)",
      "Bachelor's degree",
      "Master's degree",
    ],
  },
  ghana: {
    key: "ghana",
    name: "Ghana",
    flag: "🇬🇭",
    unemployment: "12.1% youth unemployment",
    digital: "53% digital access",
    digitalAccessPct: 53,
    region: "Sub-Saharan Africa",
    currency: "GHS",
    educationOptions: [
      "No formal education",
      "Primary",
      "Junior High School (JHS)",
      "Senior High School (SHS)",
      "TVET Certificate",
      "HND / Diploma",
      "Bachelor's degree",
    ],
  },
};