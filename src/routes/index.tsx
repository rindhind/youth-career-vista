import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { COUNTRIES, type CountryKey } from "@/lib/countries";
import { SkillsCard } from "@/components/youth/SkillsCard";
import { RiskCard } from "@/components/youth/RiskCard";
import { OpportunitiesCard } from "@/components/youth/OpportunitiesCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth View — UNMAPPED" },
      { name: "description", content: "Map your skills, automation risk, and real opportunities." },
      { property: "og:title", content: "Youth View — UNMAPPED" },
      { property: "og:description", content: "Map your skills, automation risk, and real opportunities." },
    ],
  }),
  component: YouthView,
});

const WEBHOOK_URL = "https://hook.eu2.make.com/w43sf9k4dv322ufayd1yzwsbuj37rq1k";

interface ResultState {
  loading: boolean;
  error: string | null;
  skills_profile: any | null;
  automation_risk: any | null;
  opportunities: any | null;
}

const initialResult: ResultState = {
  loading: false,
  error: null,
  skills_profile: null,
  automation_risk: null,
  opportunities: null,
};

function YouthView() {
  const [country, setCountry] = useState<CountryKey | null>(null);
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [years, setYears] = useState<number | "">("");
  const [result, setResult] = useState<ResultState>(initialResult);
  const [submitted, setSubmitted] = useState(false);

  const cfg = country ? COUNTRIES[country] : null;

  const canSubmit = useMemo(
    () => Boolean(cfg && education && skills.trim() && years !== "" && !result.loading),
    [cfg, education, skills, years, result.loading]
  );

  const handleSelectCountry = (k: CountryKey) => {
    setCountry(k);
    setEducation("");
  };

  const handleSubmit = async () => {
    if (!cfg) return;
    const yrs = Number(years || 0);
    const prompt1 = `You are a skills mapping system. A young person from ${cfg.name} has: Education: ${education}, Skills: ${skills}, Experience: ${yrs} years. Return a JSON object only with these exact fields: isco_code (string), isco_title (string), esco_skills (array of strings), portable_profile_summary (string), skill_level (one of: entry, intermediate, advanced), transferable_to (array of strings). No text outside the JSON.`;
    const prompt2 = `You are an automation risk analyst for low-income countries. Country: ${cfg.name}. Skills: ${skills}. Education: ${education}. Experience: ${yrs} years. Digital access: ${cfg.digitalAccessPct}%. Return a JSON object only with these exact fields: automation_risk (one of: low, medium, high), risk_score (number 0-1), at_risk_tasks (array of strings), durable_skills (array of strings), lmic_adjustment (string), resilience_skills (array of strings), timeline (string). No text outside the JSON.`;
    const prompt3 = `You are an opportunity matching engine for youth in ${cfg.name}. Skills: ${skills}. Education: ${education}. Experience: ${yrs} years. Return a JSON object only with these exact fields: opportunities (array of objects, each with: title, type (one of: formal, self-employment, gig, training), sector, match_score (number 0-100), why_realistic, next_step), wage_signal (string using local currency: ${cfg.currency} for ${cfg.name}), sector_growth (string), policymaker_summary (string). No text outside the JSON.`;

    setSubmitted(true);
    setResult({ ...initialResult, loading: true });

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ prompt1, prompt2, prompt3 }),
      });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text.slice(0, 300)}`);
      }
      let parsed: any;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        throw new Error(`Invalid JSON from webhook: ${text.slice(0, 300)}`);
      }
      const tryParse = (v: any) => {
        if (typeof v === "string") {
          try { return JSON.parse(v); } catch { return v; }
        }
        return v;
      };
      setResult({
        loading: false,
        error: null,
        skills_profile: tryParse(parsed.skills_profile) ?? null,
        automation_risk: tryParse(parsed.automation_risk) ?? null,
        opportunities: tryParse(parsed.opportunities) ?? null,
      });
    } catch (e: any) {
      setResult({
        loading: false,
        error: e?.message || String(e),
        skills_profile: null,
        automation_risk: null,
        opportunities: null,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* SECTION 1 — Country */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">1. Choose your country</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.values(COUNTRIES)).map((c) => {
            const active = country === c.key;
            return (
              <button
                key={c.key}
                onClick={() => handleSelectCountry(c.key)}
                className={`text-left rounded-2xl border-2 bg-card p-6 transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-card)] ${
                  active ? "border-primary shadow-[var(--shadow-glow)]" : "border-border"
                }`}
              >
                <div className="text-5xl mb-3">{c.flag}</div>
                <div className="text-xl font-bold">{c.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{c.region}</div>
              </button>
            );
          })}
        </div>
        {cfg && (
          <div className="mt-4 rounded-lg bg-secondary/50 border border-border px-4 py-3 text-sm text-muted-foreground animate-fade-in">
            <span className="font-medium text-foreground">{cfg.unemployment}</span>
            <span className="mx-2">·</span>
            <span className="font-medium text-foreground">{cfg.digital}</span>
            <span className="mx-2">·</span>
            <span className="font-medium text-foreground">{cfg.region}</span>
          </div>
        )}
      </section>

      {/* SECTION 2 — Form */}
      {cfg && (
        <section className="animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">2. Tell us about you</h2>
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-[var(--shadow-card)]">
            <div>
              <label className="block text-sm font-medium mb-1.5">Education level</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full rounded-lg bg-background border border-border px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              >
                <option value="">Select…</option>
                {cfg.educationOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. mobile repair, basic coding, tailoring"
                className="w-full rounded-lg bg-background border border-border px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Years of experience</label>
              <input
                type="number"
                min={0}
                max={60}
                value={years}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "") setYears("");
                  else setYears(Math.max(0, Math.min(60, Number(v))));
                }}
                className="w-full rounded-lg bg-background border border-border px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-primary-foreground bg-gradient-to-r from-primary to-primary-glow shadow-[var(--shadow-glow)] hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {result.loading ? "Mapping…" : "Map My Skills →"}
            </button>
          </div>
        </section>
      )}

      {/* SECTION 3 — Results */}
      {submitted && (
        <section className="animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">3. Your map</h2>
          {result.error && (
            <div className="mb-4 rounded-lg border border-danger/40 bg-danger/10 text-danger text-sm px-4 py-3 font-mono whitespace-pre-wrap break-words">
              {result.error}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <ResultCard title="Skills Profile" border="border-primary/60">
              {result.loading ? <Spinner /> : result.skills_profile ? <SkillsCard data={result.skills_profile} /> : <Empty />}
            </ResultCard>
            <ResultCard title="Automation Risk" border="border-warning/60">
              {result.loading ? <Spinner /> : result.automation_risk ? <RiskCard data={result.automation_risk} /> : <Empty />}
            </ResultCard>
            <ResultCard title="Opportunities" border="border-teal/60">
              {result.loading ? <Spinner /> : result.opportunities ? <OpportunitiesCard data={result.opportunities} /> : <Empty />}
            </ResultCard>
          </div>
        </section>
      )}
    </div>
  );
}

function ResultCard({ title, border, children }: { title: string; border: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border-2 ${border} bg-card p-5 shadow-[var(--shadow-card)]`}>
      <h3 className="text-sm uppercase tracking-wider font-bold text-muted-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function Empty() {
  return <div className="text-sm text-muted-foreground">No data.</div>;
}