import { Link, useNavigate } from "react-router-dom";
import { Crown, Cake, Briefcase, Flower2 } from "lucide-react";
import thali from "@/assets/thali.jpg";
import { CONTACT } from "@/lib/contact";
import { BrandSeal } from "@/components/Brand";
import { Navbar } from "@/components/Navbar";
import TiltedCard, { TiltedCardLayer } from "@/components/TiltedCard";
import FoldText from "@/components/FoldText";
import BorderGlow from "@/components/BorderGlow";
import FolderFloat from "@/components/FolderFloat";
import { signatureDishes } from "@/assets/dishes";

const services = [
  {
    t: "Wedding Catering",
    d: "From aiburobhat to the reception night, full menus planned around your family's traditions.",
    icon: Crown,
    highlights: [
      "Aiburobhat & Gaye Holud thalis",
      "Grand Reception buffets & live counters",
      "Authentic Bhetki Paturi & Kosha Mangsho",
      "Artisan dessert & baked rosogolla spread",
    ],
  },
  {
    t: "Birthday & Annaprashan",
    d: "Joyful spreads for little ones and big gatherings, with kid-friendly counters.",
    icon: Cake,
    highlights: [
      "Traditional Mukhe Bhaat silver thali",
      "Live Chaat, Pasta & roll counters",
      "Kid-friendly mild delicacies",
      "Custom themed buffet presentation",
    ],
  },
  {
    t: "Corporate Events",
    d: "Punctual, tidy service for conferences, office lunches and festive parties.",
    icon: Briefcase,
    highlights: [
      "Executive lunch boxes & hot buffets",
      "Hi-Tea, artisanal snacks & beverage bar",
      "Punctual, discreet corporate service",
      "Custom billing & event management",
    ],
  },
  {
    t: "Puja & Family Gatherings",
    d: "Niramish bhog, homestyle meals and sweets served with warmth.",
    icon: Flower2,
    highlights: [
      "Pure vegetarian Niramish bhog",
      "Khichuri, Labra, Chutney & Payesh",
      "Homestyle Bengali comfort meals",
      "Warm, respectful family-style service",
    ],
  },
];

const dishes = [
  "Shorshe Ilish", "Kosha Mangsho", "Chingri Malai Curry", "Kolkata Biryani",
  "Luchi & Cholar Dal", "Basanti Pulao", "Shukto", "Mishti Doi & Rosogolla",
];

const reviews = [
  { n: "Ananya B.", q: "Every guest asked who catered our wedding. The kosha mangsho was outstanding." },
  { n: "Rahul S.", q: "Smooth service at our office event — on time, hot food, polite staff." },
  { n: "Moumita D.", q: "My son's annaprashan felt like a home feast. Thank you, Rannabati!" },
];

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Hero Section - Starts right at top edge with no background gap */}
      <section id="home" className="relative overflow-hidden bg-[#1c0d12]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-[90vh] min-h-[620px] w-full object-cover"
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
          <source src="/video/hero%20video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-5 pt-28 md:pt-36">
          <h1 className="max-w-3xl font-display leading-[1.08] text-cream">
            <FoldText
              text={"Bengali Feasts for\nEvery Celebration"}
              foldStyle="paper"
              splitBy="char"
              hinge="top"
              trigger="mount"
              foldAngle={92}
              duration={0.65}
              stagger={0.045}
              staggerFrom="start"
              ease="power3.out"
              loopDelay={1.4}
              hoverRefold
              refoldRadius={140}
              refoldAngle={45}
              perspective={700}
              creaseShading={0.55}
              fontSize="clamp(2.5rem, 5.8vw, 80px)"
              fontWeight={800}
              color="#fffbf2"
              className="font-display"
              style={{ lineHeight: 1.08 }}
            />
          </h1>
          <p className="mt-5 max-w-lg text-lg text-cream/85">
            Weddings, birthdays and corporate events across Kolkata — cooked fresh, served with heart.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              to="/menu"
              className="rounded-full bg-gold px-7 py-3 font-semibold text-accent-foreground hover:bg-gold/90 transition-colors shadow-md"
            >
              Build Your Menu
            </Link>
            <a
              href="#contact"
              className="rounded-full border border-cream/60 px-7 py-3 font-semibold text-cream hover:bg-white/10 transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <img
          src={thali}
          alt="Traditional Bengali thali"
          loading="lazy"
          width={1024}
          height={1024}
          className="rounded-3xl shadow-2xl"
        />
        <div>
          <p className="font-semibold uppercase tracking-widest text-primary">About Us</p>
          <h2 className="mt-3 text-4xl font-extrabold">Caterers in Kolkata who cook like family</h2>
          <p className="mt-5 text-muted-foreground">
            Rannabati brings the flavours of a Bengali kitchen to your event. We plan the menu with you, source fresh
            ingredients every morning, and send a trained team to serve your guests from the first plate to the last
            sweet.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-4 text-sm font-semibold">
            <li className="rounded-xl bg-secondary p-4">Fresh, quality ingredients</li>
            <li className="rounded-xl bg-secondary p-4">Custom menus for any budget</li>
            <li className="rounded-xl bg-secondary p-4">Courteous trained staff</li>
            <li className="rounded-xl bg-secondary p-4">Less waste, eco-friendly serving</li>
          </ul>
        </div>
      </section>

      <section id="services" className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-4xl font-extrabold font-display">Our Services</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <BorderGlow
                key={s.t}
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#120F17"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                className="w-full transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 text-gold shadow-sm">
                      <s.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gold font-display leading-snug">{s.t}</h3>
                    <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">{s.d}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi Rannabati Catering, I'd like to enquire about ${s.t}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gold hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Enquire on WhatsApp</span>
                      <span>→</span>
                    </a>
                    <span className="text-white/40">✦</span>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28 overflow-visible">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Left Side: Content */}
          <div className="lg:col-span-5 text-left flex flex-col justify-end">
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold font-cormorant leading-[1.1] text-primary tracking-tight">
              A Taste of Our Authentic Menu
            </h2>

            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Experience the royal culinary heritage of Bengal through our chef's hand-crafted delicacies. Slow-cooked with time-honoured traditions, cold-pressed mustard oil, and pure aromatic ghee.
            </p>

            {/* Key Delicacy Highlights */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold text-xs">01</span>
                <span>Padma Shorshe Ilish & Golda Chingri Malai Curry</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold text-xs">02</span>
                <span>Slow-Cooked Kosha Mangsho & Saffron Basanti Pulao</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold text-xs">03</span>
                <span>Authentic Kolkata Dum Biryani & Hot Baked Rosogolla</span>
              </div>
            </div>
          </div>

          {/* Right Side: Folder and Floating Dishes */}
          <div className="lg:col-span-7 flex flex-col items-center justify-end overflow-visible">
            <FolderFloat
              items={signatureDishes}
              label="Chef's Signature Menu"
              sublabel=""
              trigger="hover"
              defaultOpen={false}
              folderColor="#7f1d1d"
              frontColor="#991b1b"
              paperColor="#fffbf2"
              itemColor="transparent"
              itemTextColor="#2b1117"
              labelColor="#fffbf2"
              width={280}
              height={175}
              radius={18}
              spread={250}
              lift={55}
              tilt={8}
              drift={0.6}
              onSelect={(_dish) => {
                navigate("/menu");
              }}
            />
          </div>
        </div>

        {/* Centered Explore Button matching second image */}
        <div className="mt-14 flex justify-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm sm:text-base font-bold text-white transition-all shadow-md hover:bg-primary/90 hover:scale-[1.02]"
          >
            <span>Explore Full 50+ Dish Menu Catalog</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-4xl font-extrabold">What Our Guests Say</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.n} className="rounded-2xl bg-card p-7 shadow-sm">
                <div className="text-gold">★★★★★</div>
                <blockquote className="mt-3">“{r.q}”</blockquote>
                <figcaption className="mt-4 font-semibold text-primary">{r.n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="text-4xl font-extrabold">Planning an event?</h2>
        <p className="mt-4 text-muted-foreground">
          Tell us your date, guest count and favourite dishes — we'll send a custom quote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={CONTACT.telHref} className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">
            Call {CONTACT.display}
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            className="rounded-full border border-primary px-7 py-3 font-semibold text-primary"
          >
            WhatsApp Us
          </a>
        </div>
      </section>

      <footer className="border-t py-12 text-center">
        <BrandSeal />
        <p className="mt-5 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rannabati Catering · Kolkata ·{" "}
          <Link to="/work" className="text-primary hover:underline font-semibold">
            Our Work
          </Link>
        </p>
      </footer>
    </div>
  );
}
