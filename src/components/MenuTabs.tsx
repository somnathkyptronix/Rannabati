import { Link, useRouterState } from "@tanstack/react-router";

const tabs = [
  { to: "/menu", label: "Build Your Own Menu" },
  { to: "/packages", label: "Menu Packages" },
] as const;

export function MenuTabs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-gold/40 bg-primary-foreground/10 p-1 backdrop-blur">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-gold text-accent-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
