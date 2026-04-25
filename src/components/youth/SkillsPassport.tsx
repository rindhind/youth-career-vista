import { useRef } from "react";

interface PassportProps {
  name: string;
  country: string;
  flag: string;
  skills: any;
  risk: any;
  opportunities: any;
}

export function SkillsPassport({ name, country, flag, skills, risk, opportunities }: PassportProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const topOpp = Array.isArray(opportunities?.opportunities) && opportunities.opportunities.length > 0
    ? [...opportunities.opportunities].sort((a, b) => (b.match_score ?? 0) - (a.match_score ?? 0))[0]
    : null;

  const riskLevel = String(risk?.automation_risk ?? "—").toUpperCase();
  const riskPct = typeof risk?.risk_score === "number" ? Math.round(risk.risk_score * 100) : null;

  const handleSave = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `unmapped-passport-${name.replace(/\s+/g, "-").toLowerCase() || "card"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #2a0e54 0%, #4c1d95 50%, #1e1b4b 100%)",
          backgroundImage:
            "linear-gradient(135deg, #2a0e54 0%, #4c1d95 50%, #1e1b4b 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 24px)",
          backgroundBlendMode: "normal, overlay, overlay",
        }}
      >
        {/* subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 24px)",
          }}
        />

        <div className="relative space-y-5">
          <div className="flex items-start justify-between">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-white/70">
              Unmapped Skills Passport
            </div>
            <div className="text-2xl sm:text-3xl">{flag}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-1">Holder</div>
            <div className="text-3xl sm:text-4xl font-bold leading-tight">{name || "—"}</div>
            <div className="text-sm text-white/60 mt-1">{country}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/15">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">ISCO</div>
              <div className="text-sm font-mono text-white/90">{skills?.isco_code ?? "—"}</div>
              <div className="text-base font-semibold">{skills?.isco_title ?? "—"}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Automation Risk</div>
              <div className="text-base font-semibold">
                {riskLevel}
                {riskPct !== null && (
                  <span className="ml-2 text-white/70 font-mono text-sm">{riskPct}%</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/50 mb-2">ESCO Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {(skills?.esco_skills ?? []).slice(0, 8).map((s: string, i: number) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-white/15 border border-white/20 text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {topOpp && (
            <div className="rounded-lg bg-white/10 border border-white/15 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50">Top Opportunity</div>
                  <div className="text-base font-semibold">{topOpp.title}</div>
                </div>
                {typeof topOpp.match_score === "number" && (
                  <div className="text-lg font-bold font-mono">{topOpp.match_score}%</div>
                )}
              </div>
              {topOpp.next_step && (
                <div className="text-sm italic text-white/80 mt-2">{topOpp.next_step}</div>
              )}
            </div>
          )}

          <div className="pt-3 border-t border-white/15 text-[10px] sm:text-xs text-white/60 text-center tracking-wide">
            Verified by UNMAPPED · ILO ILOSTAT · Frey-Osborne (2013)
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-primary-foreground bg-gradient-to-r from-primary to-primary-glow shadow-[var(--shadow-glow)] hover:opacity-95 transition"
      >
        Save as Image
      </button>
    </div>
  );
}