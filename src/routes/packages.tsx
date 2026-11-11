import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MenuTabs } from "@/components/MenuTabs";
import { CONTACT } from "@/lib/contact";
import { BrandLockup, BrandSeal } from "@/components/Brand";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Menu Packages | Rannabati Catering Kolkata" },
      { name: "description", content: "Browse Rannabati Catering's suggested Bengali and Indian catering packages for weddings, pujas and parties in Kolkata, then book your date." },
      { property: "og:title", content: "Menu Packages | Rannabati Catering" },
      { property: "og:description", content: "Suggested Bengali and Indian catering packages for every celebration in Kolkata." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackagesPage,
});

const WHATSAPP = CONTACT.whatsapp;

type Pkg = {
  name: string;
  kind: string;
  blurb: string;
  sections: { title: string; items: string[] }[];
};

const packages: Pkg[] = [
  {
    name: "Suggested Menu 1",
    kind: "Vegetarian",
    blurb: "A homestyle Bengali table — luchi, dhokadal and sweets straight from the kitchen.",
    sections: [
      { title: "Starters", items: ["Coffee", "Mochar Chop", "Beguni", "Paneer Tikka", "Fresh Lime Soda"] },
      {
        title: "Main Course",
        items: ["Luchi", "Koraishutir Kochuri", "Shukto", "Aloo Posto", "Echorer Dalna", "Cholar Dal", "Basanti Pulao", "Doi Potol", "Khejur Aamsotto Chutney", "Papad (Baked & Fried)"],
      },
      { title: "Desserts & Finish", items: ["Mishti Doi", "Rosogolla", "Ice Cream (Six Flavours)", "Paan (Stall)", "Mineral Water"] },
    ],
  },
  {
    name: "Suggested Menu 2",
    kind: "Non Vegetarian",
    blurb: "River fish and chicken cooked the way Kolkata likes it.",
    sections: [
      { title: "Starters", items: ["Coffee", "Bhetki Fish Fry", "Chicken Reshmi Kebab", "Mocktail Counter"] },
      {
        title: "Main Course",
        items: ["Luchi", "Lachha Paratha", "Shorshe Ilish", "Bhetki Paturi", "Chingri Malai Curry", "Murgir Jhol", "Peas Pulao", "Bhaja Moong Dal", "Green Salad", "Tomato Chutney", "Papad (Baked & Fried)"],
      },
      { title: "Desserts & Finish", items: ["Kesar Kulfi", "Chhanar Payesh", "Paan (Stall)", "Mineral Water"] },
    ],
  },
  {
    name: "Suggested Menu 3",
    kind: "Non Vegetarian",
    blurb: "For the mutton lovers — slow-cooked cuts with butter naan and biryani.",
    sections: [
      { title: "Starters", items: ["Coffee", "Mutton Seekh Kebab", "Chicken Pakora", "Paneer Pakora", "Cold Drinks"] },
      {
        title: "Main Course",
        items: ["Butter Naan", "Rumali Roti", "Kosha Mangsho", "Mutton Rezala", "Butter Chicken", "Kolkata Mutton Biryani", "Dal Makhani", "Russian Salad", "Mango Chutney", "Papad (Baked & Fried)"],
      },
      { title: "Desserts & Finish", items: ["Ice Cream Counter", "Gulab Jamun", "Paan (Stall)", "Mineral Water"] },
    ],
  },
  {
    name: "Suggested Menu 4",
    kind: "Reception Grand",
    blurb: "A full reception spread with live counters and a long dessert table.",
    sections: [
      { title: "Starters", items: ["Coffee", "Mocktail Counter", "Galouti Kebab", "Paneer Tikka", "Crispy Baby Corn", "Fish Kabiraji"] },
      {
        title: "Main Course",
        items: ["Bread Basket (3 types)", "Chicken Chaap", "Mutton Chaap", "Malai Kofta", "Paneer Butter Masala", "Kaju Kishmish Pulao", "Dal Makhani", "Green Salad", "Assorted Chutney", "Papad (Baked & Fried)"],
      },
      { title: "Desserts & Finish", items: ["Ice Cream Counter", "Rasmalai", "Nolen Gurer Sandesh", "Caramel Custard", "Paan Live Counter", "Mineral Water"] },
    ],
  },
];

function PackagesPage() {
  const [chosen, setChosen] = useState<string>(packages[0]?.name ?? "");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      "*Rannabati Catering – Package Booking*",
      `Menu: ${chosen}`,
      `Name: ${f.get("name")}`,
      f.get("email") ? `Email: ${f.get("email")}` : "",
      `Phone: ${f.get("phone")}`,
      `Date: ${f.get("date")}  |  Guests: ${f.get("headcount")}`,
      `Venue: ${f.get("venue")}`,
      `Address: ${f.get("address")}`,
      f.get("notes") ? `Notes: ${f.get("notes")}` : "",
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };

  const input = "w-full rounded-lg border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <BrandLockup />
          <div className="flex items-center gap-4">
            <Link to="/menu" className="hidden text-sm font-semibold text-muted-foreground hover:text-primary sm:inline">Build your own menu</Link>
            <a href={CONTACT.telHref} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Call {CONTACT.display}</a>
          </div>
        </div>
      </header>

      <section className="bg-primary py-16 text-center text-primary-foreground">
        <p className="font-semibold uppercase tracking-[0.3em] text-gold">Choose From Our Suggested Menu</p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Menu Packages</h1>
        <p className="mx-auto mt-4 max-w-xl px-5 text-primary-foreground/80">
          Four ready-made spreads for weddings, pujas and parties. Pick one and we'll fine-tune it for your guest count.
        </p>
        <MenuTabs />
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {packages.map((p) => (
            <article key={p.name} className="flex flex-col rounded-2xl border bg-card p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-2xl font-bold text-primary">{p.name}</h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider">{p.kind}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>

              {p.sections.map((s) => (
                <div key={s.title} className="mt-6">
                  <h3 className="font-display text-lg font-semibold text-primary">{s.title}</h3>
                  <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                    {s.items.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-7 flex items-center justify-between gap-3 border-t pt-5">
                <span className="text-sm font-semibold text-muted-foreground">Price on request</span>
                <button
                  type="button"
                  onClick={() => {
                    setChosen(p.name);
                    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Book this menu
                </button>
              </div>
            </article>
          ))}
        </div>

        <form id="book" onSubmit={submit} className="mt-14 rounded-2xl border bg-secondary p-6 md:p-10">
          <h2 className="text-3xl font-extrabold">Book Now</h2>
          <p className="mt-3 text-muted-foreground">Send us your details and we'll confirm availability and pricing.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">
              <span className="mb-1.5 block">Menu *</span>
              <select value={chosen} onChange={(e) => setChosen(e.target.value)} className={input}>
                {packages.map((p) => (
                  <option key={p.name} value={p.name}>{`${p.name} (${p.kind})`}</option>
                ))}
              </select>
            </label>
            <input required name="name" placeholder="Name *" className={`${input} mt-6 md:mt-0`} />
            <input required name="phone" type="tel" placeholder="Phone *" className={input} />
            <input name="email" type="email" placeholder="Email address" className={input} />
            <input required name="date" type="date" placeholder="Date of event" className={input} />
            <input required name="headcount" type="number" min={1} placeholder="Headcount *" className={input} />
            <input required name="venue" placeholder="Location of venue *" className={`${input} md:col-span-2`} />
            <input required name="address" placeholder="Address *" className={`${input} md:col-span-2`} />
            <textarea name="notes" rows={3} placeholder="Anything else? (live counters, dietary needs…)" className={`${input} md:col-span-2`} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground">
              Send Booking on WhatsApp
            </button>
            <a href={CONTACT.telHref} className="font-semibold text-primary hover:underline">or call {CONTACT.display}</a>
          </div>
        </form>
      </div>

      <footer className="border-t py-12 text-center">
        <BrandSeal />
        <p className="mt-5 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rannabati Catering · Kolkata ·{" "}
          <Link to="/menu" className="text-primary hover:underline">Build your own menu</Link>
        </p>
      </footer>
    </div>
  );
}
