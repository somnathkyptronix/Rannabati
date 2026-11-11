import { Link, useLocation, useNavigate } from "react-router-dom";
import navLogo from "@/assets/rannabati-navbar-logo.png";
import fullLogo from "@/assets/rannabati-logo-trim.png";

/**
 * Navbar logo — using the emblem artwork (Bengali woman, Rannabati, CATERING)
 * optimized specifically for the top navigation bar.
 */
export function BrandLockup({
  className = "",
  imgClassName = "",
}: {
  className?: string;
  imgClassName?: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        history.replaceState(null, "", "/");
      }
    } else {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      className={`shrink-0 flex items-center ${className}`}
      aria-label="Rannabati Catering, home"
    >
      <img
        src={navLogo}
        alt="Rannabati Catering"
        width={1186}
        height={915}
        className={`w-auto object-contain ${imgClassName || "h-11 sm:h-12"}`}
      />
    </Link>
  );
}

/** The full logo emblem, shown large in the footer. */
export function BrandSeal({ className = "" }: { className?: string }) {
  return (
    <img
      src={fullLogo}
      alt="Rannabati Catering"
      width={1198}
      height={1044}
      loading="lazy"
      className={`mx-auto w-48 ${className}`}
    />
  );
}
