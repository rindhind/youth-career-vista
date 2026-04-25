[README.md](https://github.com/user-attachments/files/27091066/README.md)
# UNMAPPED
### Closing the distance between real skills and economic opportunity in the age of AI

> Built for the World Bank Youth Summit × Hack-Nation Global AI Hackathon 2026

---

## What is UNMAPPED?

UNMAPPED is an open, localizable infrastructure layer that connects a young person's real skills to real economic opportunities — without requiring formal credentials.

**The problem:** Hundreds of millions of young people in low-income countries hold real skills that broken credentialing systems render economically invisible. A 17-year-old who taught himself mobile repair from YouTube videos doesn't exist to the formal economy.

**The solution:** A 3-module system that maps informal skills to global standards, assesses honest automation risk calibrated for LMIC contexts, and surfaces realistic (not aspirational) economic opportunities.

---

## Live Demo

🔗 [Live App] — https://youth-career-vista.lovable.app/

---

## Three Modules

### Module 1 — Skills Signal Engine
Maps education + informal experience to ISCO-08 occupational codes and ESCO skill categories. Produces a portable, human-readable skills profile the user can own and share across borders.

### Module 2 — AI Readiness & Displacement Risk Lens
Produces an honest automation risk score calibrated for LMIC contexts using Frey-Osborne occupation scores. Identifies durable skills and adjacent upskilling paths. Accounts for local infrastructure constraints (digital access %, informality %).

### Module 3 — Opportunity Matching
Surfaces realistic matched opportunities (formal employment, self-employment, gig, training) grounded in real labor market signals. Dual interface: youth view + policymaker aggregate view.

---

## Country-Agnostic Design

The system is configurable for any country without changing the codebase. Switch between Pakistan and Ghana in the demo to see the same infrastructure with different local parameters.

Configurable inputs (see `config.json`):
- Labor market data source
- Education level taxonomy
- Language and script
- Automation exposure calibration
- Opportunity types surfaced

---

## Real Data Sources

| Dataset | Use | File |
|---|---|---|
| Frey & Osborne (2013) Automation Scores | Occupation-level automation probability | `data/frey_osborne.csv` |
| ILO ILOSTAT Youth Unemployment | Country-level youth labor market signals | `data/ilo_youth.csv` |
| World Bank WDI | Digital access, informal employment % | Embedded in config |
| ISCO-08 | Occupational classification backbone | Via Claude API mapping |
| ESCO Skills Taxonomy | Portable multilingual skills categories | Via Claude API mapping |

---

## Tech Stack

| Layer | Tool |
|---|---|
| AI Brain | Claude API (claude-sonnet-4-20250514) |
| Orchestration | Make.com (webhook → HTTP → response) |
| Frontend | Lovable.dev |
| Country Config | config.json (country-agnostic parameter layer) |

---

## Repository Structure

```
unmapped/
├── README.md
├── config.json              # Country config layer (Pakistan + Ghana)
├── data/
│   ├── frey_osborne.csv     # Automation probability by occupation (Frey & Osborne 2013)
│   └── ilo_youth.csv        # ILO youth unemployment + labor market signals
├── make/
│   └── scenario-description.md   # Make.com scenario documentation
└── docs/
    └── demo-script.md       # Demo walkthrough script
```

---

## Builder

**Muhammad Khan** — AI Automation Agency founder, A-Level student, Mardan, Pakistan.

*I am the person this system is for. Self-taught, no formal network, real skills that no credentialing system has ever recognized. I built UNMAPPED for myself and for the 600 million young people like me.*

---

## Data Citations

- Frey, C.B. & Osborne, M.A. (2013). The Future of Employment. Oxford Martin School.
- ILO ILOSTAT. Youth unemployment indicators, 2024. International Labour Organization.
- World Bank World Development Indicators. Digital infrastructure and employment data, 2024.
- ISCO-08. International Standard Classification of Occupations. ILO, 2008.
- ESCO v1.2. European Skills, Competences, Qualifications and Occupations taxonomy.
