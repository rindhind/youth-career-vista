import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policymaker")({
  head: () => ({
    meta: [
      { title: "Policymaker View — UNMAPPED" },
      { name: "description", content: "Compare youth labor signals across Pakistan and Ghana." },
      { property: "og:title", content: "Policymaker View — UNMAPPED" },
      { property: "og:description", content: "Compare youth labor signals across Pakistan and Ghana." },
    ],
  }),
  component: PolicymakerPage,
});

const ROWS = [
  { metric: "Youth Unemployment", pk: "11.4%", gh: "12.1%" },
  { metric: "Digital Access", pk: "36%", gh: "53%" },
  {
    metric: "Top At-Risk Occupations",
    pk: "Cashiers, Data Entry Clerks, Agricultural Workers",
    gh: "Market Traders, Cashiers, Drivers",
  },
  {
    metric: "Key Skill Gaps",
    pk: "Digital literacy, English communication",
    gh: "Technical vocational, Financial literacy",
  },
  {
    metric: "Recommended Sectors",
    pk: "IT Services, Textile tech, Construction",
    gh: "Services, Agritech, Retail",
  },
];

const SECTORS = {
  Pakistan: ["IT Services", "Textile tech", "Construction"],
  Ghana: ["Services", "Agritech", "Retail"],
};

function PolicymakerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-fade-in">
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Pakistan vs Ghana</h2>
        <p className="text-muted-foreground text-sm mb-6">Snapshot of youth labor & automation signals.</p>
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/60 text-left">
                <th className="px-4 py-3 font-semibold">Metric</th>
                <th className="px-4 py-3 font-semibold">🇵🇰 Pakistan</th>
                <th className="px-4 py-3 font-semibold">🇬🇭 Ghana</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.metric} className={i % 2 ? "bg-background/40" : ""}>
                  <td className="px-4 py-3 font-medium">{r.metric}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.pk}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.gh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {(Object.entries(SECTORS) as [keyof typeof SECTORS, string[]][]).map(([country, sectors]) => (
          <div key={country} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-xl font-semibold mb-4">
              {country === "Pakistan" ? "🇵🇰" : "🇬🇭"} {country} — Recommended Sectors
            </h3>
            <div className="space-y-3">
              {sectors.map((s) => (
                <div
                  key={s}
                  className="rounded-lg border border-border bg-secondary/40 px-4 py-3 font-medium"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}