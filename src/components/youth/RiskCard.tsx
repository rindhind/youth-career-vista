interface Risk {
  automation_risk?: "low" | "medium" | "high" | string;
  risk_score?: number;
  at_risk_tasks?: string[];
  durable_skills?: string[];
  lmic_adjustment?: string;
  resilience_skills?: string[];
  timeline?: string;
}

export function RiskCard({ data }: { data: Risk }) {
  const level = (data.automation_risk || "").toLowerCase();
  const color =
    level === "low" ? "text-success" : level === "high" ? "text-danger" : "text-warning";
  const pct = Math.round(((data.risk_score ?? 0) as number) * 100);
  const barColor =
    level === "low" ? "bg-success" : level === "high" ? "bg-danger" : "bg-warning";
  return (
    <div className="space-y-4 animate-fade-in">
      <div className={`text-5xl font-extrabold uppercase tracking-tight ${color}`}>
        {data.automation_risk || "—"}
      </div>
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Risk score</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
        </div>
      </div>
      {data.at_risk_tasks && data.at_risk_tasks.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">At-risk tasks</div>
          <div className="flex flex-wrap gap-2">
            {data.at_risk_tasks.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-warning/15 text-warning border border-warning/30">{t}</span>
            ))}
          </div>
        </div>
      )}
      {data.durable_skills && data.durable_skills.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Durable skills</div>
          <div className="flex flex-wrap gap-2">
            {data.durable_skills.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-teal/15 text-teal border border-teal/30">{t}</span>
            ))}
          </div>
        </div>
      )}
      {data.lmic_adjustment && (
        <p className="text-sm text-muted-foreground leading-relaxed">{data.lmic_adjustment}</p>
      )}
      {data.timeline && <div className="text-xs text-muted-foreground pt-2 border-t border-border">⏱ {data.timeline}</div>}
    </div>
  );
}