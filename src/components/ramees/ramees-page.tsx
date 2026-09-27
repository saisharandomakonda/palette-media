import { useEffect, useMemo, useState, type FormEvent } from "react";
import { MapPin, Phone } from "lucide-react";
import {
  ADDRESS,
  CATEGORIES,
  DISHES,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  PHONE_WA,
  SLOTS,
  type Category,
  dishById,
  inr,
} from "@/data/ramees";
import { Reel } from "./reel";

type Hold = { name: string; phone: string; date: string; slot: string; guests: number };

export function RameesPage() {
  const [reduced, setReduced] = useState(false);
  const [activeId, setActiveId] = useState("biryani");
  const [category, setCategory] = useState<Category>("All");
  const [order, setOrder] = useState<Record<string, number>>({});
  const [hold, setHold] = useState<Hold | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[4]);
  const [guests, setGuests] = useState(4);
  const [error, setError] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    const saved = localStorage.getItem("ramees-hold");
    if (saved) {
      try {
        setHold(JSON.parse(saved) as Hold);
      } catch {
        localStorage.removeItem("ramees-hold");
      }
    }
    return () => media.removeEventListener("change", apply);
  }, []);

  const active = dishById(activeId);
  const shown = useMemo(
    () => DISHES.filter((d) => category === "All" || d.category === category),
    [category],
  );
  const lines = Object.entries(order).filter(([, n]) => n > 0);
  const priced = lines.reduce((sum, [id, n]) => {
    const price = dishById(id).price;
    return price == null ? sum : sum + price * n;
  }, 0);
  const unpriced = lines.some(([id]) => dishById(id).price == null);

  function add(id: string) {
    setActiveId(id);
    setOrder((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function waOrder() {
    const body = lines
      .map(([id, n]) => {
        const d = dishById(id);
        return `${n} × ${d.name}${d.price == null ? "" : ` (${inr(d.price)})`}`;
      })
      .join("\n");
    const text = `Ramees, Maradu — pickup from Whytefort\n${body}\nGuide total ${inr(priced)}${unpriced ? " + items on the card" : ""}`;
    window.open(`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function reserve(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 10 || !date) {
      setError("Name, a 10-digit phone, and a date.");
      return;
    }
    const next = { name: name.trim(), phone: phone.trim(), date, slot, guests };
    localStorage.setItem("ramees-hold", JSON.stringify(next));
    setHold(next);
    setError("");
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <a href="#menu" className="sr-only">
        Skip to the menu
      </a>
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-3 border-b border-teak/30 bg-ink/50 px-4 py-3 backdrop-blur-md md:px-8">
        <a href="#reel" className="min-w-0">
          <span className="font-malayalam block text-lg leading-none text-cream">റമീസ്</span>
          <span className="tracking-brand text-xs text-teak">RAMEES · MARADU</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#reel" className="text-cream">
            The reel
          </a>
          <a href="#menu" className="text-cream">
            Menu
          </a>
          <a href="#hold" className="text-cream">
            A table
          </a>
        </nav>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex min-h-11 items-center gap-2 bg-chilli px-4 text-sm text-cream"
        >
          <Phone className="size-4" aria-hidden />
          {PHONE_DISPLAY}
        </a>
      </header>

      <main>
        <Reel
          reduced={reduced}
          onPick={(id) => {
            setActiveId(id);
            setOrder((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
          }}
        />

        <div className="overflow-hidden border-y border-teak/40 bg-cream text-ink">
          <div className="tape-track py-4">
            <p className="px-6 font-display text-3xl whitespace-nowrap italic">
              {DISHES.map((d) => d.name).join("   ·   ")} ·
            </p>
            <p className="px-6 font-display text-3xl whitespace-nowrap italic" aria-hidden>
              {DISHES.map((d) => d.name).join("   ·   ")} ·
            </p>
          </div>
        </div>

        <section className="grid gap-6 border-b border-teak/40 bg-ink px-4 py-8 md:grid-cols-3 md:px-8">
        <Fact k="Rating" v="4.1" d="4,008 Google reviews" />
        <Fact k="For two" v="₹200–400" d="a person, as reported" />
        <Fact k="Hours" v="12–11:30" d="noon to close, all week" />
      </section>

      <section id="menu" className="bg-cream px-4 py-12 text-ink md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="tracking-brand text-xs text-teak">THE CARD</p>
            <h2 className="font-display text-4xl leading-display md:text-6xl">What is on the table</h2>
          </div>
          <p className="max-w-sm text-sm text-leaf">
            Prices with a number are from public listings, not tonight’s printed card. Blank prices stay on
            the card until the house confirms them.
          </p>
        </div>

        <div className="scrollbar-none -mx-4 mb-8 flex gap-2 overflow-x-auto px-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`min-h-11 shrink-0 border px-4 text-sm ${
                category === c ? "border-ink bg-ink text-cream" : "border-teak/50 bg-cream text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <figure className="lg:col-span-5">
            <img
              key={active.id}
              src={active.image}
              alt={active.name}
              className="slam aspect-square w-full object-cover"
            />
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="font-display text-3xl leading-display">{active.name}</span>
              <span className="text-teak">{active.price == null ? "On the card" : inr(active.price)}</span>
            </figcaption>
            <p className="mt-2 text-leaf">{active.blurb}</p>
            <button
              type="button"
              onClick={() => add(active.id)}
              className="mt-4 min-h-11 bg-chilli px-5 text-cream"
            >
              Add to the slip
            </button>
          </figure>

          <ul className="min-w-0 divide-y divide-teak/30 lg:col-span-4">
            {shown.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(d.id)}
                  className={`flex w-full min-h-11 items-center justify-between gap-3 py-3 text-left ${
                    d.id === activeId ? "text-chilli" : "text-ink"
                  }`}
                >
                  <span>
                    <span className="block">{d.name}</span>
                    <span className="text-xs text-teak">
                      {d.category}
                      {d.veg ? " · veg" : ""}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm">{d.price == null ? "Card" : inr(d.price)}</span>
                </button>
              </li>
            ))}
          </ul>

          <aside className="min-w-0 border border-teak/40 bg-cream p-4 lg:col-span-3">
            <p className="tracking-brand text-xs text-teak">SLIP</p>
            {lines.length === 0 ? (
              <p className="mt-3 text-sm text-leaf">Nothing yet. Add a plate from the card.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {lines.map(([id, n]) => (
                  <li key={id} className="flex justify-between gap-3">
                    <span>
                      {n} × {dishById(id).name}
                    </span>
                    <button
                      type="button"
                      className="text-teak"
                      onClick={() =>
                        setOrder((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }))
                      }
                    >
                      Less
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-display text-2xl">
              {inr(priced)}
              {unpriced ? <span className="ml-2 text-sm text-teak">+ card</span> : null}
            </p>
            <button
              type="button"
              disabled={lines.length === 0}
              onClick={waOrder}
              className="mt-4 min-h-11 w-full bg-leaf px-4 text-cream disabled:opacity-40"
            >
              Send pickup on WhatsApp
            </button>
          </aside>
        </div>
      </section>

      <section className="grid gap-10 bg-ink px-4 py-14 md:grid-cols-2 md:px-8">
        <div>
          <p className="tracking-brand text-xs text-teak">THE HOUSE</p>
          <h2 className="font-display text-4xl leading-display md:text-5xl">
            One floor of Whytefort. Open late.
          </h2>
          <p className="mt-4 max-w-prose text-cream">
            Ramees sits on the ground floor of The Whytefort Hotel in Maradu — biryani and Kerala roast
            next to an Arabic grill, the kind of room families book for a whole table. Google still has no
            website on the listing. The phone does.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-teak">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
            <a href={MAPS_URL} className="text-cream underline decoration-teak">
              {ADDRESS}
            </a>
          </p>
        </div>
        <div className="grid gap-4">
          <Quote
            who="sree lekshmi · Local Guide"
            text="Chicken lollipop is so good. The sauce is sweet — and the appam, sulaimani, kariveppila and beef bellari were on the same table."
          />
          <Quote
            who="Jaleela Jalaludheen · Local Guide"
            text="Malthootha Dajaj, full bird, scored 4 out of 5. A five-star visit three months ago."
          />
        </div>
      </section>

      <section id="hold" className="bg-leaf px-4 py-14 text-cream md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="tracking-brand text-xs text-teak">HOLD A TABLE</p>
            <h2 className="font-display text-4xl leading-display md:text-5xl">Tell the floor you’re coming.</h2>
            <p className="mt-3 max-w-prose text-cream">
              This holds the request on your phone and opens WhatsApp to 075105 66666. It is not a confirmed
              booking until the restaurant replies.
            </p>
          </div>
          {hold ? (
            <div className="border border-cream/30 p-5">
              <p className="font-display text-3xl">Held for {hold.name}</p>
              <p className="mt-2">
                {hold.guests} guests · {hold.date} · {hold.slot}
              </p>
              <p className="mt-1 text-sm text-cream/80">{hold.phone}</p>
              <a
                className="mt-4 inline-flex min-h-11 items-center bg-chilli px-4"
                href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                  `Table at Ramees, Whytefort Maradu\n${hold.name}, ${hold.phone}\n${hold.guests} guests\n${hold.date} ${hold.slot}`,
                )}`}
              >
                Send the hold on WhatsApp
              </a>
              <button type="button" className="mt-3 block text-sm text-teak" onClick={() => setHold(null)}>
                Change it
              </button>
            </div>
          ) : (
            <form onSubmit={reserve} className="grid gap-3">
              <label className="grid gap-1 text-sm">
                Name
                <input className="field" suppressHydrationWarning value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label className="grid gap-1 text-sm">
                Phone
                <input
                  className="field"
                  suppressHydrationWarning
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid min-w-0 gap-1 text-sm">
                  Date
                  <input
                    className="field"
                    suppressHydrationWarning
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </label>
                <label className="grid min-w-0 gap-1 text-sm">
                  Guests
                  <input
                    className="field"
                    suppressHydrationWarning
                    type="number"
                    min={1}
                    max={12}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  />
                </label>
              </div>
              <fieldset className="min-w-0">
                <legend className="mb-2 text-sm">Time</legend>
                <div className="scrollbar-none flex gap-2 overflow-x-auto">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={slot === s}
                      onClick={() => setSlot(s)}
                      className={`min-h-11 shrink-0 border px-3 text-sm ${
                        slot === s ? "border-cream bg-cream text-ink" : "border-cream/40 text-cream"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
              {error ? <p className="text-sm text-cream">{error}</p> : null}
              <button type="submit" className="min-h-11 bg-chilli text-cream">
                Hold this table
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-ink px-4 py-8 text-sm text-teak md:px-8">
        <p>റമീസ് റസ്റ്റോറൻ്റ് · Maradu</p>
        <a href={`tel:${PHONE_TEL}`} className="text-cream">
          {PHONE_DISPLAY}
        </a>
      </footer>
      </main>
    </div>
  );
}

function Fact({ k, v, d }: { k: string; v: string; d: string }) {
  return (
    <div>
      <p className="tracking-brand text-xs text-teak">{k}</p>
      <p className="font-display text-4xl leading-display text-cream">{v}</p>
      <p className="text-sm text-teak">{d}</p>
    </div>
  );
}

function Quote({ who, text }: { who: string; text: string }) {
  return (
    <blockquote className="border-l-2 border-chilli pl-4">
      <p className="font-display text-2xl leading-snug text-cream">{text}</p>
      <footer className="mt-2 text-sm text-teak">{who}</footer>
    </blockquote>
  );
}
