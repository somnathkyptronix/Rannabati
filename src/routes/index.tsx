import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import thali from "@/assets/thali.jpg";
import { CONTACT } from "@/lib/contact";
import { BrandLockup, BrandSeal } from "@/components/Brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rannabati Catering | Wedding & Party Caterers in Kolkata" },
      { name: "description", content: "Authentic Bengali and Indian catering for weddings, birthdays, annaprashan and corporate events across Kolkata." },
      { property: "og:title", content: "Rannabati Catering | Caterers in Kolkata" },
      { property: "og:description", content: "Authentic Bengali and Indian catering for every celebration in Kolkata." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { t: "Wedding Catering", d: "From aiburobhat to the reception night, full menus planned around your family's traditions." },
  { t: "Birthday & Annaprashan", d: "Joyful spreads for little ones and big gatherings, with kid-friendly counters." },
  { t: "Corporate Events", d: "Punctual, tidy service for conferences, office lunches and festive parties." },
  { t: "Puja & Family Gatherings", d: "Niramish bhog, homestyle meals and sweets served with warmth." },
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

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <BrandLockup />
          <nav className="hidden gap-7 text-sm font-semibold md:flex">
            <a href="#about">About</a><a href="#services">Services</a><Link to="/menu">Build Your Menu</Link><Link to="/packages">Menu Packages</Link><a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Book Now</a>
        </div>
      </header>

      <section className="relative">
        <img src={hero} alt="Bengali wedding buffet by Rannabati Catering" width={1600} height={1008} className="h-[78vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-5">
          <p className="font-semibold uppercase tracking-[0.3em] text-gold">Rannabati Catering Service</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-extrabold leading-tight text-cream md:text-7xl">Bengali Feasts for Every Celebration</h1>
          <p className="mt-5 max-w-lg text-lg text-cream/85">Weddings, birthdays and corporate events across Kolkata — cooked fresh, served with heart.</p>
          <div className="mt-8 flex gap-3">
            <Link to="/menu" className="rounded-full bg-gold px-7 py-3 font-semibold text-accent-foreground">Build Your Menu</Link>
            <a href="#contact" className="rounded-full border border-cream/60 px-7 py-3 font-semibold text-cream">Get a Quote</a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <img src={thali} alt="Traditional Bengali thali" loading="lazy" width={1024} height={1024} className="rounded-3xl shadow-2xl" />
        <div>
          <p className="font-semibold uppercase tracking-widest text-primary">About Us</p>
          <h2 className="mt-3 text-4xl font-extrabold">Caterers in Kolkata who cook like family</h2>
          <p className="mt-5 text-muted-foreground">Rannabati brings the flavours of a Bengali kitchen to your event. We plan the menu with you, source fresh ingredients every morning, and send a trained team to serve your guests from the first plate to the last sweet.</p>
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
          <h2 className="text-center text-4xl font-extrabold">Our Services</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {services.map((s) => (
              <div key={s.t} className="rounded-2xl border border-primary-foreground/20 p-6">
                <h3 className="text-xl font-semibold text-gold">{s.t}</h3>
                <p className="mt-3 text-sm text-primary-foreground/80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-6xl px-5 py-24 text-center">
        <p className="font-semibold uppercase tracking-widest text-primary">Signature Dishes</p>
        <h2 className="mt-3 text-4xl font-extrabold">A taste of our menu</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {dishes.map((d) => (
            <div key={d} className="rounded-2xl border bg-card px-4 py-8 font-display text-lg font-semibold">{d}</div>
          ))}
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
        <p className="mt-4 text-muted-foreground">Tell us your date, guest count and favourite dishes — we'll send a custom quote.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={CONTACT.telHref} className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Call {CONTACT.display}</a>
          <a href={`https://wa.me/${CONTACT.whatsapp}`} className="rounded-full border border-primary px-7 py-3 font-semibold text-primary">WhatsApp Us</a>
        </div>
      </section>

      <footer className="border-t py-12 text-center">
        <BrandSeal />
        <p className="mt-5 text-sm text-muted-foreground">© {new Date().getFullYear()} Rannabati Catering · Kolkata</p>
      </footer>
    </div>
  );
}
