interface Profile {
  isco_code?: string;
  isco_title?: string;
  esco_skills?: string[];
  portable_profile_summary?: string;
  skill_level?: string;
  transferable_to?: string[];
}

export function SkillsCard({ data }: { data: Profile }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">ISCO</div>
        <div className="text-lg font-semibold leading-tight">
          {data.isco_code} {data.isco_title}
        </div>
      </div>
      {data.skill_level && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/40">
          {data.skill_level}
        </span>
      )}
      {data.esco_skills && data.esco_skills.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">ESCO Skills</div>
          <div className="flex flex-wrap gap-2">
            {data.esco_skills.map((s) => (
              <span key={s} className="px-2.5 py-1 text-xs rounded-md bg-primary/15 text-primary border border-primary/30">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.portable_profile_summary && (
        <p className="text-sm text-muted-foreground leading-relaxed">{data.portable_profile_summary}</p>
      )}
      {data.transferable_to && data.transferable_to.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Transferable to</div>
          <ul className="space-y-1 text-sm">
            {data.transferable_to.map((t) => (
              <li key={t} className="flex gap-2"><span className="text-primary">→</span>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}