import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Check, Clock, MapPin, Menu, Minus, Phone, Plus, Star, X } from "lucide-react";
import {
  ADDRESS,
  CATEGORIES,
  DISHES,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEWS,
  type Category,
  type Hold,
  formatDay,
  hasLunch,
  inr,
  labelTime,
  serviceNow,
  slotState,
  slotsFor,
} from "@/data/glass";

const HOLD_KEY = "glass-kitchen-hold";

const LINKS = [
  { id: "menu", label: "The card" },
  { id: "room", label: "The room" },
  { id: "visit", label: "Hours" },
  { id: "reserve", label: "A table" },
];

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function GlassPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [category, setCategory] = useState<Category>("Start");
  const [activeId, setActiveId] = useState("crab");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [hold, setHold] = useState<Hold | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [service, setService] = useState("Dinner nightly");

  useEffect(() => {
    const clock = new Date();
    setNow(clock);
    setService(serviceNow(clock));
    try {
      const raw = localStorage.getItem(HOLD_KEY);
      if (raw) setHold(JSON.parse(raw) as Hold);
    } catch {
      /* ignore */
    }
  }, []);

  const visible = DISHES.filter((d) => d.category === category);
  const active = DISHES.find((d) => d.id === activeId) ?? visible[0];
  const lines = DISHES.filter((d) => (qty[d.id] ?? 0) > 0);
  const total = lines.reduce((sum, d) => sum + d.price * (qty[d.id] ?? 0), 0);
  const count = lines.reduce((sum, d) => sum + (qty[d.id] ?? 0), 0);

  function pickCategory(next: Category) {
    setCategory(next);
    const first = DISHES.find((d) => d.category === next);
    if (first) setActiveId(first.id);
  }

  function add(id: string) {
    setQty((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
    setActiveId(id);
  }

  function sub(id: string) {
    setQty((q) => {
      const next = { ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  const note = useMemo(() => {
    if (!lines.length) return "";
    const body = lines.map((d) => `• ${d.name} × ${qty[d.id]}`).join("\n");
    return `Glass Kitchen & Bar — table note\n${body}\nGuide total ${inr(total)}`;
  }, [lines, qty, total]);

  return (
    <div className="min-h-svh bg-night text-mist">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-rule bg-night/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#top" onClick={() => setNavOpen(false)} className="leading-none">
            <span className="font-display block text-2xl italic leading-none">Glass</span>
            <span className="mt-1 block text-xs tracking-brand text-brass uppercase">Kitchen & Bar</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="text-sm text-mist/80 transition-colors duration-200 hover:text-mist"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go("reserve")}
              className="bg-mist px-4 py-2 text-sm text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              Find a table
            </button>
          </nav>
          <button
            type="button"
            className="grid size-11 place-items-center md:hidden"
            aria-expanded={navOpen}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen((v) => !v)}
          >
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
        {navOpen && (
          <nav className="border-t border-rule px-5 py-3 md:hidden">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                className="flex h-12 w-full items-center text-left text-lg"
                onClick={() => {
                  setNavOpen(false);
                  go(l.id);
                }}
              >
                {l.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main id="content">
        <section id="top">
          <img
            src="/glass/interior.jpg"
            alt="Evening tables at Glass Kitchen and Bar, glass walls and brass light"
            width={1792}
            height={1008}
            className="frame-tall w-full object-cover"
          />
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:grid-cols-12 md:px-8 md:py-16">
            <div className="md:col-span-7">
              <p className="text-xs tracking-brand text-brass uppercase">
                Holiday Inn · Racecourse
              </p>
              <h1 className="font-display mt-4 text-6xl leading-display italic md:text-8xl">
                A coast apart.
              </h1>
            </div>
            <div className="flex flex-col justify-end md:col-span-5">
              <p className="text-lg leading-relaxed text-mist/85">
                Southern shoreline cooking, behind the glass on Seshadri Road. Dinner every night.
                Lunch from Friday to Sunday.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => go("reserve")}
                  className="bg-mist px-5 py-3 text-sm text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
                >
                  Find a table
                </button>
                <button
                  type="button"
                  onClick={() => go("menu")}
                  className="border border-rule px-5 py-3 text-sm transition-transform duration-150 ease-out active:scale-[0.96]"
                >
                  Read the card
                </button>
              </div>
            </div>
          </div>
          <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 border-t border-rule px-5 py-6 sm:grid-cols-4 md:px-8">
            <Fact k="Google" v="4.5" d="378 reviews" />
            <Fact k="A sitting" v="₹800–2,000" d="a person" />
            <Fact k="For two" v="₹2,500+" d="coastal menu" />
            <Fact k="Now" v={service} d="Closes 11:30 pm" />
          </dl>
        </section>

        <section id="room" className="scroll-mt-20 border-t border-rule">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
            <div className="md:col-span-5">
              <p className="text-xs tracking-brand text-brass uppercase">The room</p>
              <h2 className="font-display mt-3 text-5xl leading-tight italic md:text-6xl">
                Glass, then the coast.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg leading-relaxed">
                Glass Kitchen & Bar is the dining room of Holiday Inn Bengaluru Racecourse. Not a
                buffet. A kitchen, and a bar, for people who came for the hotel and stayed because
                of the leaf.
              </p>
              <p className="mt-4 leading-relaxed text-mist/75">
                The card they cook now is called A Coast Apart — Malabar, Mangalorean, the
                southern shore, with a few plates the city already knew how to order. Guests name
                the appam, the sadhya, a cashew curry, dal, sometimes a lobster mappas. The service
                is the other thing they write down.
              </p>
            </div>
          </div>
        </section>

        <figure className="relative">
          <img
            src="/glass/bar.jpg"
            alt="The bar at night, brass rail and a single cocktail"
            width={1792}
            height={1008}
            className="frame-bar w-full object-cover"
            loading="lazy"
          />
          <figcaption className="absolute bottom-5 left-5 max-w-xs bg-night p-5 text-mist md:bottom-10 md:left-10 md:p-7">
            <p className="font-display text-3xl leading-tight italic">The bar is its own card.</p>
            <p className="mt-3 text-sm leading-relaxed text-mist/75">
              Cocktails and a full list. Alcohol is served. Ask, don’t guess from the food menu.
            </p>
          </figcaption>
        </figure>

        <section id="menu" className="scroll-mt-20 bg-paper text-ink">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs tracking-brand text-seal uppercase">A Coast Apart</p>
                <h2 className="font-display mt-3 text-5xl leading-tight italic">The short card.</h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Dishes guests and the coastal menu actually name. Prices are a guide. The kitchen
                and bar lists at the table are longer.
              </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5">
                <div className="overflow-hidden bg-night">
                  <img
                    key={active.id}
                    src={active.image}
                    alt={active.name}
                    width={1600}
                    height={1200}
                    className="rise aspect-4/3 w-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl leading-tight italic">{active.name}</p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{active.blurb}</p>
                  </div>
                  <p className="shrink-0 text-sm tabular-nums">{inr(active.price)}</p>
                </div>
              </div>

              <div className="min-w-0 lg:col-span-7">
                <div
                  role="tablist"
                  aria-label="Menu categories"
                  className="scrollbar-none -mx-5 flex min-w-0 gap-2 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0"
                >
                  {CATEGORIES.map((c) => {
                    const on = c === category;
                    return (
                      <button
                        key={c}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        onClick={() => pickCategory(c)}
                        className={
                          "h-11 shrink-0 border px-4 text-sm transition-colors duration-200 " +
                          (on ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink")
                        }
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                <ul className="border-t border-line">
                  {visible.map((dish) => {
                    const n = qty[dish.id] ?? 0;
                    const on = dish.id === active.id;
                    return (
                      <li key={dish.id} className={on ? "bg-night/5" : ""}>
                        <div className="flex items-center gap-3 border-b border-line py-4 pr-1 pl-3">
                          <button
                            type="button"
                            onClick={() => setActiveId(dish.id)}
                            className="min-w-0 flex-1 text-left"
                          >
                            <span className="flex items-center gap-2">
                              {dish.popular && (
                                <span className="size-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
                              )}
                              <span className="font-display text-2xl leading-tight italic">
                                {dish.name}
                              </span>
                            </span>
                            <span className="mt-1 block text-xs text-muted">
                              {dish.veg ? "Veg" : "Non-veg"}
                              {dish.seasonal ? " · Seasonal" : ""}
                              {dish.popular ? " · Asked for" : ""}
                            </span>
                          </button>
                          <span className="w-16 shrink-0 text-right text-sm tabular-nums">
                            {inr(dish.price)}
                          </span>
                          {n === 0 ? (
                            <button
                              type="button"
                              aria-label={`Add ${dish.name}`}
                              onClick={() => add(dish.id)}
                              className="grid size-11 shrink-0 place-items-center border border-line transition-transform duration-150 active:scale-[0.96]"
                            >
                              <Plus className="size-4" />
                            </button>
                          ) : (
                            <div className="flex items-center border border-ink">
                              <button
                                type="button"
                                aria-label={`Remove one ${dish.name}`}
                                onClick={() => sub(dish.id)}
                                className="grid size-11 place-items-center"
                              >
                                <Minus className="size-4" />
                              </button>
                              <span className="w-4 text-center text-sm tabular-nums">{n}</span>
                              <button
                                type="button"
                                aria-label={`Add another ${dish.name}`}
                                onClick={() => add(dish.id)}
                                className="grid size-11 place-items-center"
                              >
                                <Plus className="size-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <NoteSlip count={count} total={total} lines={lines} qty={qty} note={note} />
              </div>
            </div>
          </div>
        </section>

        <section id="visit" className="scroll-mt-20 border-t border-rule bg-pine text-mist">
          <div className="mx-auto grid w-full max-w-6xl md:grid-cols-2">
            <img
              src="/glass/exterior.jpg"
              alt="Night outside the hotel on Seshadri Road"
              width={1792}
              height={1008}
              className="h-72 w-full object-cover md:h-full"
              loading="lazy"
            />
            <div className="px-5 py-16 md:px-12 md:py-20">
              <p className="text-xs tracking-brand text-brass uppercase">Visit</p>
              <h2 className="font-display mt-3 text-5xl leading-tight italic">Come for dinner.</h2>
              <address className="mt-8 leading-relaxed not-italic">
                {ADDRESS.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <table className="mt-8 w-full text-left text-sm">
                <caption className="sr-only">Service hours</caption>
                <thead className="text-mist/60">
                  <tr>
                    <th className="py-2 font-medium">Days</th>
                    <th className="py-2 font-medium">Lunch</th>
                    <th className="py-2 font-medium">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-rule">
                    <td className="py-3">Mon–Thu</td>
                    <td className="py-3 text-mist/60">—</td>
                    <td className="py-3">7:00–11:30 pm</td>
                  </tr>
                  <tr className="border-t border-rule">
                    <td className="py-3">Fri–Sun</td>
                    <td className="py-3">12:30–3:30 pm</td>
                    <td className="py-3">7:00–11:30 pm</td>
                  </tr>
                </tbody>
              </table>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brass" />
                  <div>
                    <dt className="text-mist/60">Desk</dt>
                    <dd>
                      <a href={`tel:${PHONE_TEL}`} className="underline decoration-rule underline-offset-4">
                        {PHONE_DISPLAY}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brass" />
                  <div>
                    <dt className="text-mist/60">Find it</dt>
                    <dd>XHJH+39 · inside the hotel, Ward 94</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-brass" />
                  <div>
                    <dt className="text-mist/60">Also</dt>
                    <dd>Dine-in, takeaway, delivery</dd>
                  </div>
                </div>
              </dl>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex h-11 items-center gap-2 bg-mist px-4 text-sm text-ink transition-transform duration-150 active:scale-[0.96]"
              >
                Directions
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-paper text-ink">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <p className="text-xs tracking-brand text-seal uppercase">From the table</p>
            <h2 className="font-display mt-3 max-w-xl text-5xl leading-tight italic">
              4.5, from 378 dinners.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <figure key={r.name} className="flex flex-col border border-line p-6">
                  <div className="flex gap-1 text-seal" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-seal" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 leading-relaxed">“{r.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm text-muted">
                    <span className="block text-ink">{r.name}</span>
                    {r.meta}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <Reserve now={now} hold={hold} onHold={setHold} />
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="font-display text-3xl italic">Glass</p>
            <p className="text-xs tracking-brand text-brass uppercase">Kitchen & Bar</p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist/70">
            Holiday Inn Bengaluru Racecourse · {PHONE_DISPLAY}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Fact({ k, v, d }: { k: string; v: string; d: string }) {
  return (
    <div>
      <dt className="text-xs text-mist/60">{k}</dt>
      <dd className="font-display mt-1 text-2xl leading-tight italic">{v}</dd>
      <dd className="mt-1 text-xs text-mist/60">{d}</dd>
    </div>
  );
}

function NoteSlip({
  count,
  total,
  lines,
  qty,
  note,
}: {
  count: number;
  total: number;
  lines: typeof DISHES;
  qty: Record<string, number>;
  note: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(note);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 border border-line p-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-2xl italic">For the table</p>
        <p className="text-sm tabular-nums text-muted">
          {count === 0 ? "Empty" : `${count} · ${inr(total)}`}
        </p>
      </div>
      {lines.length === 0 ? (
        <p className="mt-2 text-sm text-muted">
          Build a note, then call the desk. The number is a hotel line, not a chat.
        </p>
      ) : (
        <ul className="mt-3 space-y-1 text-sm">
          {lines.map((d) => (
            <li key={d.id} className="flex justify-between gap-4 tabular-nums">
              <span>
                {d.name} × {qty[d.id]}
              </span>
              <span>{inr(d.price * (qty[d.id] ?? 0))}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!lines.length}
          onClick={copy}
          className="h-11 bg-ink px-4 text-sm text-paper disabled:opacity-40"
        >
          {copied ? "Copied" : "Copy the note"}
        </button>
        <a href={`tel:${PHONE_TEL}`} className="inline-flex h-11 items-center gap-2 border border-line px-4 text-sm">
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}

function Reserve({
  now,
  hold,
  onHold,
}: {
  now: Date | null;
  hold: Hold | null;
  onHold: (h: Hold | null) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<Hold | null>(null);

  useEffect(() => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setDate(iso);
    const open = slotsFor(iso);
    setSlot((current) => (open.includes(current) ? current : open[0]));
  }, []);

  const slots = slotsFor(date);
  const minDate = now
    ? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    : undefined;

  function onDate(value: string) {
    setDate(value);
    const open = slotsFor(value);
    setSlot((current) => (open.includes(current) ? current : open[0]));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) {
      setError("The name the table is under.");
      return;
    }
    if (digits.length < 10) {
      setError("A 10-digit mobile, so the desk can call back.");
      return;
    }
    if (!date || !slot || slotState(date, slot, now) === "gone") {
      setError("That time isn’t in service. Pick another.");
      return;
    }
    const next: Hold = {
      name: name.trim(),
      phone: digits.slice(-10),
      date,
      slot,
      guests,
      note: note.trim(),
    };
    setDone(next);
    onHold(next);
    setError("");
    try {
      localStorage.setItem(HOLD_KEY, JSON.stringify(next));
    } catch {
      /* private mode */
    }
  }

  return (
    <section id="reserve" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="min-w-0 md:col-span-5">
          <p className="text-xs tracking-brand text-brass uppercase">Reserve</p>
          <h2 className="font-display mt-3 text-5xl leading-tight italic">Hold the glass.</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-mist/80">
            Walk-ins happen. A table with a name is how anniversaries and sadhya afternoons
            actually land. Call {PHONE_DISPLAY} and read them what you wrote.
          </p>
          {hold && !done && (
            <p className="mt-6 border border-rule p-4 text-sm leading-relaxed">
              Already noted: {formatDay(hold.date)} at {labelTime(hold.slot)}, {hold.guests}{" "}
              {hold.guests === 1 ? "guest" : "guests"}, under {hold.name}.
            </p>
          )}
        </div>
        <div className="min-w-0 md:col-span-7">
          {done ? (
            <div className="bg-paper p-6 text-ink md:p-8">
              <p className="flex items-center gap-2 text-sm text-seal">
                <Check className="size-4" />
                Noted on this phone
              </p>
              <h3 className="font-display mt-3 text-4xl leading-tight italic">
                {formatDay(done.date)}, {labelTime(done.slot)}
              </h3>
              <p className="mt-3 text-muted">
                {done.guests} {done.guests === 1 ? "guest" : "guests"} · {done.name} · {done.phone}
              </p>
              {done.note && <p className="mt-2 text-sm">{done.note}</p>}
              <p className="mt-4 text-sm leading-relaxed text-muted">
                The desk doesn’t see this until you call. Read them the name, the time, and the
                count.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex h-11 items-center gap-2 bg-ink px-4 text-sm text-paper"
                >
                  Call the desk
                  <ArrowUpRight className="size-4" />
                </a>
                <button type="button" onClick={() => setDone(null)} className="h-11 border border-line px-4 text-sm">
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-paper p-6 text-ink md:p-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input id="g-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field" placeholder="Under which name" />
                </Field>
                <Field label="Mobile">
                  <input id="g-phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" className="field" placeholder="10-digit mobile" />
                </Field>
                <Field label="Day">
                  <input id="g-day" type="date" value={date} min={minDate} onChange={(e) => onDate(e.target.value)} className="field" />
                </Field>
                <div>
                  <p className="text-xs text-muted">Guests</p>
                  <div className="mt-2 flex h-12 items-center justify-between border border-line px-2">
                    <button type="button" aria-label="Fewer guests" className="grid size-11 place-items-center" onClick={() => setGuests((g) => Math.max(1, g - 1))}>
                      <Minus className="size-4" />
                    </button>
                    <span className="tabular-nums">{guests}</span>
                    <button type="button" aria-label="More guests" className="grid size-11 place-items-center" onClick={() => setGuests((g) => Math.min(12, g + 1))}>
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted">
                {date && hasLunch(date)
                  ? "Friday to Sunday: lunch from 12:30, dinner from 7."
                  : "Monday to Thursday is dinner only, from 7 pm."}
              </p>
              <fieldset className="mt-4 min-w-0">
                <legend className="text-xs text-muted">Time</legend>
                <div className="scrollbar-none mt-2 flex w-full min-w-0 gap-2 overflow-x-auto pb-1">
                  {slots.map((s) => {
                    const state = date ? slotState(date, s, now) : "open";
                    const on = slot === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={state === "gone"}
                        onClick={() => setSlot(s)}
                        className={
                          "h-11 shrink-0 border px-3 text-sm tabular-nums transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35 " +
                          (on ? "border-ink bg-ink text-paper" : "border-line bg-paper")
                        }
                      >
                        {labelTime(s)}
                        {state === "few" ? " · few" : ""}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <label className="mt-4 block text-xs text-muted">
                A note
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="field mt-2 resize-none"
                  placeholder="Anniversary, sadhya, a window if there is one"
                />
              </label>
              {error && (
                <p className="mt-4 text-sm text-seal" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="mt-6 h-12 bg-ink px-6 text-sm text-paper transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Note this table
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs text-muted">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}
