import { Link } from "@tanstack/react-router";
import logo from "@/assets/rannabati-logo-trim.png.asset.json";

/**
 * The complete logo, used whole in the top bar. The empty space around the
 * artwork has been trimmed from the file so the design fills the bar instead
 * of floating inside a square of transparent margin.
 */
export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`shrink-0 ${className}`}
      aria-label="Rannabati Catering, home"
    >
      <img
        src={logo.url}
        alt="Rannabati Catering"
        width={1198}
        height={1044}
        className="h-16 w-auto sm:h-20"
      />
    </Link>
  );
}

/** The same logo, shown large enough that every line of it stays readable. */
export function BrandSeal({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Rannabati Catering"
      width={1198}
      height={1044}
      loading="lazy"
      className={`mx-auto w-48 ${className}`}
    />
  );
}
