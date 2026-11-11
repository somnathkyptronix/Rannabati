import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrandLockup } from "@/components/Brand";
import { CONTACT } from "@/lib/contact";
import {
  Home as HomeIcon,
  Info,
  Utensils,
  BookOpen,
  Sparkles,
  Phone,
  X,
  ChevronDown,
  Check,
  Camera,
} from "lucide-react";
import "./navbar.css";

interface MenuOption {
  id: "menu" | "packages";
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

const menuOptions: MenuOption[] = [
  {
    id: "menu",
    label: "Build Menu",
    href: "/menu",
    icon: BookOpen,
    desc: "Custom dish-by-dish caterer builder",
  },
  {
    id: "packages",
    label: "Packages",
    href: "/packages",
    icon: Sparkles,
    desc: "Curated wedding & event thali spreads",
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Track chosen menu option: defaults to "menu", updates when user visits /packages or /menu
  const [chosenMenuKey, setChosenMenuKey] = useState<"menu" | "packages">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rannabati_chosen_menu");
      if (saved === "packages") return "packages";
    }
    return "menu";
  });

  useEffect(() => {
    if (location.pathname === "/packages") {
      setChosenMenuKey("packages");
      try {
        localStorage.setItem("rannabati_chosen_menu", "packages");
      } catch {}
    } else if (location.pathname === "/menu") {
      setChosenMenuKey("menu");
      try {
        localStorage.setItem("rannabati_chosen_menu", "menu");
      } catch {}
    }
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock background scroll when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Smooth scroll for hash links when already on home page
  const handleHashClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", href);
        }
      } else {
        e.preventDefault();
        navigate(href);
      }
    }
  };

  const isHashActive = (href: string) => {
    if (href === "/" && location.pathname === "/" && !location.hash) return true;
    if (href.startsWith("/#") && location.hash === href.replace("/", "")) return true;
    return false;
  };

  const isMenuSectionActive =
    location.pathname === "/menu" || location.pathname === "/packages";

  const chosenOption =
    menuOptions.find((opt) => opt.id === chosenMenuKey) || menuOptions[0];
  const ChosenIcon = chosenOption.icon;

  const handleSelectOption = (opt: MenuOption) => {
    setChosenMenuKey(opt.id);
    try {
      localStorage.setItem("rannabati_chosen_menu", opt.id);
    } catch {}
    setMobileOpen(false);
  };

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar" aria-label="Main Navigation">
          {/* Logo Brand */}
          <div className="navbar-brand">
            <BrandLockup className="h-10 sm:h-12 flex items-center" />
          </div>

          {/* Desktop Navigation Links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isHashActive("/") ? "active" : ""}`}
              >
                <HomeIcon className="nav-icon" />
                <span>Home</span>
              </Link>
            </li>

            <li className="nav-item">
              <a
                href="/#about"
                onClick={(e) => handleHashClick(e, "/#about")}
                className={`nav-link ${isHashActive("/#about") ? "active" : ""}`}
              >
                <Info className="nav-icon" />
                <span>About</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/#services"
                onClick={(e) => handleHashClick(e, "/#services")}
                className={`nav-link ${isHashActive("/#services") ? "active" : ""}`}
              >
                <Utensils className="nav-icon" />
                <span>Services</span>
              </a>
            </li>

            <li className="nav-item">
              <Link
                to="/work"
                className={`nav-link ${
                  location.pathname === "/work" || location.pathname === "/our-work"
                    ? "active"
                    : ""
                }`}
              >
                <Camera className="nav-icon" />
                <span>Our Work</span>
              </Link>
            </li>

            {/* Menu Dropdown - Displays only the currently chosen menu */}
            <li className="nav-item nav-item--has-dropdown">
              <Link
                to={chosenOption.href}
                className={`nav-link ${isMenuSectionActive ? "active" : ""}`}
              >
                <ChosenIcon className="nav-icon" />
                <span>{chosenOption.label}</span>
                <ChevronDown className="nav-chevron" />
              </Link>

              {/* Dropdown Options */}
              <div className="nav-dropdown" role="menu">
                <ul className="nav-dropdown-list">
                  {menuOptions.map((opt) => {
                    const isSelected = chosenOption.id === opt.id;
                    const OptIcon = opt.icon;
                    return (
                      <li key={opt.id}>
                        <Link
                          to={opt.href}
                          className={`nav-dropdown-link ${
                            isSelected ? "active" : ""
                          }`}
                          onClick={() => handleSelectOption(opt)}
                        >
                          <div className="nav-dropdown-link-left">
                            <OptIcon className="nav-dropdown-icon" />
                            <div className="nav-dropdown-text">
                              <span className="nav-dropdown-title">
                                {opt.label}
                              </span>
                              <span className="nav-dropdown-desc">
                                {opt.desc}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="nav-dropdown-check" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a
                href="/#contact"
                onClick={(e) => handleHashClick(e, "/#contact")}
                className={`nav-link ${isHashActive("/#contact") ? "active" : ""}`}
              >
                <Phone className="nav-icon" />
                <span>Contact</span>
              </a>
            </li>
          </ul>

          {/* Desktop CTA Button */}
          <div className="cta-button-desktop">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`mobile-toggle ${mobileOpen ? "active" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Backdrop Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Side Drawer Menu */}
      <aside
        className={`mobile-menu ${mobileOpen ? "active" : ""}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <BrandLockup className="h-11 flex items-center" />
          </div>
          <button
            type="button"
            className="mobile-menu-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={26} />
          </button>
        </div>

        <ul className="mobile-menu-nav">
          <li className="mobile-menu-item">
            <Link
              to="/"
              className={`mobile-menu-link ${isHashActive("/") ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <HomeIcon className="mobile-menu-icon" />
              <span>Home</span>
            </Link>
          </li>

          <li className="mobile-menu-item">
            <a
              href="/#about"
              className={`mobile-menu-link ${isHashActive("/#about") ? "active" : ""}`}
              onClick={(e) => handleHashClick(e, "/#about")}
            >
              <Info className="mobile-menu-icon" />
              <span>About</span>
            </a>
          </li>

          <li className="mobile-menu-item">
            <a
              href="/#services"
              className={`mobile-menu-link ${isHashActive("/#services") ? "active" : ""}`}
              onClick={(e) => handleHashClick(e, "/#services")}
            >
              <Utensils className="mobile-menu-icon" />
              <span>Services</span>
            </a>
          </li>

          <li className="mobile-menu-item">
            <Link
              to="/work"
              className={`mobile-menu-link ${
                location.pathname === "/work" || location.pathname === "/our-work"
                  ? "active"
                  : ""
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <Camera className="mobile-menu-icon" />
              <span>Our Work</span>
            </Link>
          </li>

          {/* Chosen Menu on Mobile with Accordion Dropdown */}
          <li className="mobile-menu-item">
            <div className="mobile-menu-item-row">
              <button
                type="button"
                className={`mobile-menu-link text-left flex-1 border-0 bg-transparent cursor-pointer ${
                  isMenuSectionActive ? "active" : ""
                }`}
                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
              >
                <ChosenIcon className="mobile-menu-icon" />
                <span>{chosenOption.label}</span>
              </button>

              <button
                type="button"
                className="mobile-submenu-arrow"
                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                aria-label="Toggle menu options"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {mobileSubmenuOpen && (
              <ul className="mobile-submenu">
                {menuOptions.map((opt) => {
                  const isSelected = chosenOption.id === opt.id;
                  const OptIcon = opt.icon;
                  return (
                    <li key={opt.id}>
                      <Link
                        to={opt.href}
                        className={`mobile-submenu-link ${
                          isSelected ? "active" : ""
                        }`}
                        onClick={() => handleSelectOption(opt)}
                      >
                        <OptIcon className="w-4 h-4 text-primary shrink-0" />
                        <div className="flex flex-col">
                          <span className="mobile-submenu-title">
                            {opt.label}
                          </span>
                          <span className="mobile-submenu-desc">
                            {opt.desc}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-primary ml-auto" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          <li className="mobile-menu-item">
            <a
              href="/#contact"
              className={`mobile-menu-link ${isHashActive("/#contact") ? "active" : ""}`}
              onClick={(e) => handleHashClick(e, "/#contact")}
            >
              <Phone className="mobile-menu-icon" />
              <span>Contact</span>
            </a>
          </li>
        </ul>

        <div className="mobile-cta">
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            className="mobile-cta-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            Book Now on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
