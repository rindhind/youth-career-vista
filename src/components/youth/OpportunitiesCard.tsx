interface Opportunity {
  title?: string;
  type?: "formal" | "self-employment" | "gig" | "training" | string;
  sector?: string;
  match_score?: number;
  why_realistic?: string;
  next_step?: string;
}
interface Opps {
  opportunities?: Opportunity[];
  wage_signal?: string;
  sector_growth?: string;
  policymaker_summary?: string;
}

const TYPE_STYLES: Record<string, string> = {
  formal: "bg-info/15 text-info border-info/30",
  "self-employment": "bg-primary/15 text-primary border-primary/30",
  gig: "bg-teal/15 text-teal border-teal/30",
  training: "bg-warning/15 text-warning border-warning/30",
};

export function OpportunitiesCard({ data }: { data: Opps }) {
  return (
    <div className="space-y-4 animate-fade-in">
      {data.opportunities?.map((op, i) => (
        <div key={i} className="rounded-lg border border-border bg-background/40 p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold leading-tight">{op.title}</div>
              {op.sector && <div className="text-xs text-muted-foreground mt-0.5">{op.sector}</div>}
            </div>
            {typeof op.match_score === "number" && (
              <span className="shrink-0 px-2 py-1 rounded-md text-xs font-bold bg-teal/20 text-teal border border-teal/40">
                {op.match_score}%
              </span>
            )}
          </div>
          {op.type && (
            <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider rounded font-semibold border ${TYPE_STYLES[op.type] || "bg-secondary border-border text-muted-foreground"}`}>
              {op.type}
            </span>
          )}
          {op.why_realistic && <p className="text-xs text-muted-foreground leading-relaxed">{op.why_realistic}</p>}
          {op.next_step && <p className="text-sm font-semibold">→ {op.next_step}</p>}
        </div>
      ))}
      {data.wage_signal && (
        <div className="pt-3 border-t border-border text-sm">
          <span className="text-muted-foreground">💰 Wage signal: </span>
          <span className="font-medium">{data.wage_signal}</span>
        </div>
      )}
      {data.sector_growth && (
        <div className="text-sm">
          <span className="text-muted-foreground">📈 Sector growth: </span>
          <span className="font-medium">{data.sector_growth}</span>
        </div>
      )}
    </div>
  );
}