import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { MenuTabs } from "@/components/MenuTabs";
import { CONTACT } from "@/lib/contact";
import { BrandSeal } from "@/components/Brand";
import { Navbar } from "@/components/Navbar";

const WHATSAPP = CONTACT.whatsapp;

const menu: { cat: string; items: string[] }[] = [
  { cat: "Welcome Drinks & Soups", items: ["Aam Panna", "Sweet Lassi", "Fresh Lime Soda", "Gondhoraj Ghol", "Cold Coffee", "Masala Chai", "Tomato Soup", "Sweet Corn Soup", "Mocktail Counter (Live)"] },
  { cat: "Veg Starters", items: ["Vegetable Chop", "Mochar Chop", "Beguni", "Paneer Tikka", "Hara Bhara Kebab", "Chilli Paneer", "Crispy Baby Corn", "Mini Samosa", "Cheese Corn Balls"] },
  { cat: "Non-Veg Starters", items: ["Bhetki Fish Fry", "Fish Kabiraji", "Fish Fingers", "Prawn Cutlet", "Golden Fried Prawn", "Chicken Reshmi Kebab", "Chicken Tikka", "Chicken Pakora", "Mutton Seekh Kebab", "Galouti Kebab"] },
  { cat: "Breads", items: ["Luchi", "Radhaballabhi", "Koraishutir Kochuri", "Lachha Paratha", "Butter Naan", "Rumali Roti", "Bread Basket (3 types)"] },
  { cat: "Rice", items: ["Steamed Basmati Rice", "Basanti Pulao", "Ghee Bhaat", "Kaju Kishmish Pulao", "Peas Pulao", "Veg Fried Rice", "Chicken Fried Rice", "Kolkata Mutton Biryani", "Chicken Biryani"] },
  { cat: "Dal", items: ["Bhaja Moong Dal", "Cholar Dal with Coconut", "Masoor Dal", "Dal Tadka", "Dal Makhani"] },
  { cat: "Salads", items: ["Green Salad", "Sprout Salad", "Russian Salad", "Chicken Salad", "Pasta Salad"] },
  { cat: "Bengali Niramish", items: ["Shukto", "Aloo Jhuri Bhaja", "Begun Bhaja", "Echorer Dalna", "Lau Ghonto", "Aloo Posto", "Potoler Dolma", "Doi Potol", "Chhanar Dalna", "Phulkopir Roast"] },
  { cat: "Bengali Fish & Meat", items: ["Shorshe Ilish", "Ilish Bhapa", "Bhetki Paturi", "Doi Katla", "Katla Kalia", "Chingri Malai Curry", "Daab Chingri", "Chitol Muitha", "Murgir Jhol", "Kosha Mangsho", "Kochi Pathar Jhol"] },
  { cat: "Indian Veg", items: ["Dum Aloo", "Malai Kofta", "Navratan Korma", "Paneer Butter Masala", "Palak Paneer", "Kadai Paneer", "Mixed Veg Jalfrezi"] },
  { cat: "Chicken", items: ["Butter Chicken", "Chicken Rezala", "Chicken Kosha", "Chicken Korma", "Kadai Chicken", "Chicken Chaap", "Chicken Tikka Masala", "Grilled Chicken with Veggies"] },
  { cat: "Mutton", items: ["Mutton Rogan Josh", "Mutton Rezala", "Mutton Chaap", "Mutton Korma", "Keema Matar", "Dak Bungalow Mutton", "Mutton Handi"] },
  { cat: "Chutney", items: ["Khejur Aamsotto Chutney", "Tomato Chutney", "Mango Chutney", "Pineapple Chutney", "Plastic Chutney"] },
  { cat: "Desserts", items: ["Rosogolla", "Baked Rosogolla", "Gulab Jamun", "Mishti Doi", "Rasmalai", "Rabri", "Nolen Gurer Sandesh", "Chhanar Payesh", "Gajar Halwa", "Caramel Custard"] },
  { cat: "Ice Cream", items: ["Vanilla with Hot Chocolate", "Chocolate", "Strawberry", "Kesar Kulfi", "Pista Kulfi", "Ice Cream Counter"] },
  { cat: "Paan & Extras", items: ["Mishti Paan", "Paan Live Counter", "Mouth Freshener Counter"] },
];

export function Menu() {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [meal, setMeal] = useState("Dinner");

  const toggle = (item: string) =>
    setPicked((p) => {
      const n = new Set(p);
      n.has(item) ? n.delete(item) : n.add(item);
      return n;
    });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      "*Rannabati Catering – Menu Enquiry*",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      f.get("email") ? `Email: ${f.get("email")}` : "",
      `Date: ${f.get("date")}  |  Guests: ${f.get("guests")}`,
      f.get("occasion") ? `Occasion: ${f.get("occasion")}` : "",
      `Venue: ${f.get("venue")}`,
      `Address: ${f.get("address")}`,
      `Meal: ${meal}`,
      "",
      ...menu
        .map((c) => {
          const sel = c.items.filter((i) => picked.has(i));
          return sel.length ? `*${c.cat}:* ${sel.join(", ")}` : "";
        })
        .filter(Boolean),
      f.get("notes") ? `\nNotes: ${f.get("notes")}` : "",
    ].filter((l) => l !== "");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };

  const input = "w-full rounded-lg border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-primary pt-36 pb-16 text-center text-primary-foreground">
        <p className="font-semibold uppercase tracking-[0.3em] text-gold">Customised Menu</p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Build Your Own Menu</h1>
        <p className="mx-auto mt-4 max-w-xl px-5 text-primary-foreground/80">Tick the dishes you love, fill in your event details, and we'll send you a quote.</p>
        {picked.size > 0 && (
          <div className="mt-4 inline-block rounded-full bg-gold/20 border border-gold/40 px-4 py-1 text-sm font-semibold text-gold">
            {picked.size} dishes selected
          </div>
        )}
        <MenuTabs />
      </section>

      <form onSubmit={submit} className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {menu.map((c) => (
            <fieldset key={c.cat} className="rounded-2xl border bg-card p-6">
              <legend className="px-2 font-display text-xl font-semibold text-primary">{c.cat}</legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {c.items.map((i) => (
                  <label key={i} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-secondary">
                    <input type="checkbox" checked={picked.has(i)} onChange={() => toggle(i)} className="h-4 w-4 accent-primary" />
                    {i}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <h2 className="font-display text-xl font-semibold text-primary">Meal Type</h2>
          <div className="mt-3 flex gap-3">
            {["Breakfast", "Lunch", "Dinner"].map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setMeal(m)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold ${
                  meal === m ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <textarea name="notes" placeholder="Anything additional? (special dishes, dietary needs…)" className={`${input} mt-5`} rows={3} />
        </div>

        <div className="mt-8 rounded-2xl border bg-secondary p-6 md:p-8">
          <h2 className="text-3xl font-extrabold">Your Details</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input required name="name" placeholder="Name *" className={input} />
            <input name="email" type="email" placeholder="Email address" className={input} />
            <input required name="phone" type="tel" placeholder="Phone *" className={input} />
            <input name="whatsapp" type="tel" placeholder="WhatsApp number" className={input} />
            <input required name="date" type="date" className={input} />
            <input required name="guests" type="number" min={1} placeholder="Number of guests *" className={input} />
            <input name="occasion" placeholder="Occasion (wedding, birthday…)" className={input} />
            <input required name="venue" placeholder="Venue *" className={input} />
            <input required name="address" placeholder="Address *" className={`${input} md:col-span-2`} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground">
              Send Enquiry on WhatsApp
            </button>
            <a href={CONTACT.telHref} className="font-semibold text-primary hover:underline">or call {CONTACT.display}</a>
          </div>
        </div>
      </form>

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
