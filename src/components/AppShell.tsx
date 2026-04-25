import { Link, Outlet } from "@tanstack/react-router";

export function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/60 backdrop-blur sticky top-0 bg-background/80 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              UN<span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">MAPPED</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Skills × Automation × Opportunity for LMIC youth
            </p>
          </div>
          <nav className="flex gap-1 p-1 rounded-lg bg-secondary/60 border border-border w-full sm:w-auto">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-center data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              Youth View
            </Link>
            <Link
              to="/policymaker"
              className="flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-center data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              Policymaker View
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border/60 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs sm:text-sm text-muted-foreground text-center">
          Data sources: ILO ILOSTAT · Frey-Osborne (2013) · World Bank WDI
        </div>
      </footer>
    </div>
  );
}