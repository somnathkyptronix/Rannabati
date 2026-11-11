import { useLocation } from "react-router-dom";

export function MenuTabs() {
  const location = useLocation();
  const pathname = location.pathname;

  const label =
    pathname === "/packages" ? "Menu Packages" : "Build Your Own Menu";

  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex rounded-full border border-gold/40 bg-primary-foreground/10 p-1 backdrop-blur shadow-md">
        <span className="inline-flex items-center rounded-full bg-gold px-6 py-2 text-sm font-semibold text-accent-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
