import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Star,
  X,
} from "lucide-react";
import {
  ADDRESS,
  CATEGORIES,
  DISHES,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEWS,
  SLOTS,
  type Category,
  type Hold,
  formatDay,
  inr,
  labelTime,
  slotState,
  waLink,
} from "@/data/cafe";

const HOLD_KEY = "cafe-memoire-hold";

const LINKS = [
  { id: "menu", label: "Menu" },
  { id: "room", label: "The room" },
  { id: "visit", label: "Visit" },
  { id: "reserve", label: "Reserve" },
];

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CafePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [category, setCategory] = useState<Category>("Coffee");
  const [activeId, setActiveId] = useState("hazelnut");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [hold, setHold] = useState<Hold | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [busy, setBusy] = useState<string>("Open till 11 pm");

  useEffect(() => {
    const clock = new Date();
    setNow(clock);
    const h = clock.getHours();
    if (h < 9 || h >= 23) setBusy("Closed · opens 9 am");
    else if ((h >= 12 && h <= 15) || (h >= 18 && h <= 21)) setBusy("A little busy");
    else setBusy("Easy to walk in");
    try {
      const raw = localStorage.getItem(HOLD_KEY);
      if (raw) setHold(JSON.parse(raw) as Hold);
    } catch {
      /* ignore a bad local note */
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

  const orderText = useMemo(() => {
    if (!lines.length) return "";
    const body = lines.map((d) => `• ${d.name} × ${qty[d.id]}`).join("\n");
    return `Hello Café Memoire — pickup note:\n${body}\nTotal ${inr(total)}\nName: `;
  }, [lines, qty, total]);

  return (
    <div className="min-h-svh bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-foam focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#top" className="group flex items-baseline gap-3" onClick={() => setNavOpen(false)}>
            <span className="font-display text-xl leading-none tracking-tight">Café Memoire</span>
            <span className="font-kannada hidden text-sm text-muted sm:inline">ಕೆಫೆ ಮೆಮೊಯಿರ್</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="text-sm text-muted transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go("reserve")}
              className="bg-ink px-4 py-2 text-sm text-foam transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              Reserve a table
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
          <nav className="border-t border-line px-5 py-3 md:hidden">
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
        <section id="top" className="mx-auto grid w-full max-w-6xl md:hero-split md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-5 py-12 md:order-1 md:px-8 md:py-16">
            <p className="text-xs font-medium tracking-brand text-clay uppercase">
              Hulimavu · Bengaluru
            </p>
            <h1 className="font-display mt-4 text-5xl leading-display text-balance md:text-7xl">
              Where every cup is a memory.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              A ground-floor room on Begur–Hulimavu Road for slow breakfasts, thin-crust pizza, and
              conversations that run past the second coffee.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => go("reserve")}
                className="bg-ink px-5 py-3 text-sm text-foam transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Reserve a table
              </button>
              <button
                type="button"
                onClick={() => go("menu")}
                className="border border-line bg-foam px-5 py-3 text-sm transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                See the card
              </button>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
              <Fact k="Google" v="4.7" d="2,889 reviews" />
              <Fact k="A sitting" v="₹400–1,200" d="a person" />
              <Fact k="Tonight" v={busy} d="Daily 9 am – 11 pm" />
              <Fact k="The house" v="Women-owned" d="LGBTQ+ friendly" />
            </dl>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/images/interior.jpg"
              alt="Sunlit seating at Café Memoire, coffee on a marble table"
              width={1792}
              height={1008}
              className="h-80 w-full object-cover md:h-full"
            />
          </div>
        </section>

        <section className="border-y border-line bg-foam">
          <ul className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-8 gap-y-2 px-5 py-4 text-sm text-muted md:px-8">
            <li>Dine-in</li>
            <li>Kerbside pickup</li>
            <li>No-contact delivery</li>
            <li>Pet friendly</li>
            <li>Board games</li>
            <li>All-day breakfast</li>
          </ul>
        </section>

        <section id="room" className="scroll-mt-20 mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-brand text-clay uppercase">The room</p>
              <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
                More than the cup.
              </h2>
            </div>
            <div className="md:col-span-7 md:pb-1">
              <p className="text-lg leading-relaxed">
                Hulimavu got busier. The café stayed unhurried. Café Memoire is a women-owned room
                for people who live and work around Bannerghatta Road — a laptop, a family, a dog
                under the table.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Breakfast runs all day. Coffee is why a lot of regulars never open the rest of the
                card. When they do, it is usually the pasta, a thin-crust pizza, or the club
                sandwich. Guests mention the ambience more than anything else — 687 times, at last
                count — and 40 of them brought it up because of the dog.
              </p>
            </div>
          </div>
        </section>

        <figure className="relative">
          <img
            src="/images/evening.jpg"
            alt="Low lounge seating, warm lights and a board game at Café Memoire"
            width={1792}
            height={1008}
            className="frame-tall w-full object-cover"
            loading="lazy"
          />
          <figcaption className="absolute bottom-5 left-5 max-w-xs bg-paper p-5 text-ink md:bottom-10 md:left-10 md:max-w-sm md:p-7">
            <p className="font-display text-3xl leading-tight">Stay for the second hour.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Board games, low light, no one clearing the table to turn it.
            </p>
          </figcaption>
        </figure>

        <section id="menu" className="scroll-mt-20 mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-brand text-clay uppercase">The card</p>
              <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
                What people come back for.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              House favourites, not the whole twelve pages. The full card is at the table. Prices
              are a guide.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <div className="overflow-hidden bg-espresso">
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
                  <p className="font-display text-2xl leading-tight">{active.name}</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{active.blurb}</p>
                </div>
                <p className="font-display shrink-0 text-xl tabular-nums">{inr(active.price)}</p>
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
                        (on ? "border-ink bg-ink text-foam" : "border-line bg-foam text-ink")
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
                    <li key={dish.id} className={on ? "bg-foam" : ""}>
                      <div className="flex items-center gap-3 border-b border-line py-4 pr-1 pl-3">
                        <button
                          type="button"
                          onClick={() => setActiveId(dish.id)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <span className="flex items-center gap-2">
                            {dish.popular && (
                              <span className="size-1.5 shrink-0 rounded-full bg-clay" aria-hidden />
                            )}
                            <span className="font-display text-lg leading-tight">{dish.name}</span>
                          </span>
                          <span className="mt-1 block text-xs text-muted">
                            {dish.veg ? "Veg" : "Non-veg"}
                            {dish.popular ? " · Guest favourite" : ""}
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
                            className="grid size-11 shrink-0 place-items-center border border-line bg-paper transition-transform duration-150 active:scale-[0.96]"
                          >
                            <Plus className="size-4" />
                          </button>
                        ) : (
                          <div className="flex items-center border border-ink bg-paper">
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

              <div className="mt-6 border border-line bg-foam p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-xl">Pickup note</p>
                  <p className="text-sm tabular-nums text-muted">
                    {count === 0 ? "Empty" : `${count} · ${inr(total)}`}
                  </p>
                </div>
                {lines.length === 0 ? (
                  <p className="mt-2 text-sm text-muted">
                    Add a few things. We’ll hand the note to WhatsApp — the kitchen still confirms.
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
                <a
                  href={lines.length ? waLink(orderText) : undefined}
                  aria-disabled={lines.length === 0}
                  className={
                    "mt-4 inline-flex h-11 items-center gap-2 px-4 text-sm " +
                    (lines.length
                      ? "bg-ink text-foam"
                      : "pointer-events-none bg-line text-muted")
                  }
                >
                  Send on WhatsApp
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="visit" className="scroll-mt-20 border-t border-line bg-espresso text-foam">
          <div className="mx-auto grid w-full max-w-6xl md:grid-cols-2">
            <img
              src="/images/exterior.jpg"
              alt="Golden-hour light at the Hulimavu café"
              width={1792}
              height={1008}
              className="h-72 w-full object-cover md:h-full"
              loading="lazy"
            />
            <div className="px-5 py-16 md:px-12 md:py-20">
              <p className="text-xs font-medium tracking-brand text-wash uppercase">Visit</p>
              <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl">Come sit down.</h2>
              <address className="mt-8 text-base leading-relaxed not-italic">
                {ADDRESS.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-wash" />
                  <div>
                    <dt className="text-wash">Hours</dt>
                    <dd>Every day, 9:00 am – 11:00 pm</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-wash" />
                  <div>
                    <dt className="text-wash">Phone</dt>
                    <dd>
                      <a href={`tel:${PHONE_TEL}`} className="underline decoration-line/40 underline-offset-4">
                        {PHONE_DISPLAY}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-wash" />
                  <div>
                    <dt className="text-wash">Find it</dt>
                    <dd>VJG3+VQ · Ground floor, KPR Tower</dd>
                  </div>
                </div>
              </dl>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex h-11 items-center gap-2 bg-foam px-4 text-sm text-ink transition-transform duration-150 active:scale-[0.96]"
              >
                Directions
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-medium tracking-brand text-clay uppercase">From the table</p>
          <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight md:text-5xl">
            4.7, said 2,889 times.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="flex flex-col border border-line bg-foam p-6">
                <div className="flex gap-1 text-clay" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-clay" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed">“{r.quote}”</blockquote>
                <figcaption className="mt-6 text-sm text-muted">
                  <span className="block text-ink">{r.name}</span>
                  {r.meta}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <Reserve now={now} hold={hold} onHold={setHold} />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="font-display text-2xl">Café Memoire</p>
            <p className="font-kannada mt-1 text-sm text-muted">ಕೆಫೆ ಮೆಮೊಯಿರ್</p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Hulimavu, Bengaluru · Daily 9 am – 11 pm · {PHONE_DISPLAY}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Fact({ k, v, d }: { k: string; v: string; d: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{k}</dt>
      <dd className="font-display mt-1 text-lg leading-tight">{v}</dd>
      <dd className="mt-1 text-xs text-muted">{d}</dd>
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
  const [slot, setSlot] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<Hold | null>(null);

  useEffect(() => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setDate(iso);
  }, []);

  const minDate = now
    ? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    : undefined;

  function submit(e: FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) {
      setError("Tell us the name the table is under.");
      return;
    }
    if (digits.length < 10) {
      setError("A 10-digit mobile, so we can confirm.");
      return;
    }
    if (!date || !slot) {
      setError("Pick a day and a time.");
      return;
    }
    if (slotState(date, slot, now) === "gone") {
      setError("That time has passed or is full. Try another.");
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

  const message = done
    ? `Table request — Café Memoire\nName: ${done.name}\nPhone: ${done.phone}\nWhen: ${formatDay(done.date)}, ${labelTime(done.slot)}\nGuests: ${done.guests}${done.note ? `\nNote: ${done.note}` : ""}`
    : "";

  return (
    <section id="reserve" className="scroll-mt-20 border-t border-line bg-wash">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="min-w-0 md:col-span-5">
          <p className="text-xs font-medium tracking-brand text-clay uppercase">Reserve</p>
          <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl">Hold a table.</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-ink">
            Walk-ins are welcome. If you want the corner, or a table for more than two, leave a
            note. We confirm on WhatsApp.
          </p>
          {hold && !done && (
            <p className="mt-6 border border-line bg-foam p-4 text-sm leading-relaxed">
              You already asked for {formatDay(hold.date)} at {labelTime(hold.slot)}, {hold.guests}{" "}
              {hold.guests === 1 ? "guest" : "guests"}, under {hold.name}.
            </p>
          )}
        </div>

        <div className="min-w-0 md:col-span-7">
          {done ? (
            <div className="bg-foam p-6 md:p-8">
              <p className="flex items-center gap-2 text-sm text-clay">
                <Check className="size-4" />
                Request noted
              </p>
              <h3 className="font-display mt-3 text-3xl leading-tight">
                {formatDay(done.date)}, {labelTime(done.slot)}
              </h3>
              <p className="mt-3 text-muted">
                {done.guests} {done.guests === 1 ? "guest" : "guests"} · {done.name} · {done.phone}
              </p>
              {done.note && <p className="mt-2 text-sm">{done.note}</p>}
              <p className="mt-4 text-sm leading-relaxed text-muted">
                This stays on this phone. Send it across so the floor actually sees it.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink(message)}
                  className="inline-flex h-11 items-center gap-2 bg-ink px-4 text-sm text-foam"
                >
                  Confirm on WhatsApp
                  <ArrowUpRight className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setDone(null)}
                  className="h-11 border border-line px-4 text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-foam p-6 md:p-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" id="name">
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="field"
                    placeholder="Under which name"
                  />
                </Field>
                <Field label="Mobile" id="phone">
                  <input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                    className="field"
                    placeholder="10-digit mobile"
                  />
                </Field>
                <Field label="Day" id="day">
                  <input
                    id="day"
                    type="date"
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="field"
                  />
                </Field>
                <Field label="Guests" id="guests">
                  <div className="flex h-12 items-center justify-between border border-line bg-paper px-2">
                    <button
                      type="button"
                      aria-label="Fewer guests"
                      className="grid size-11 place-items-center"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="tabular-nums">{guests}</span>
                    <button
                      type="button"
                      aria-label="More guests"
                      className="grid size-11 place-items-center"
                      onClick={() => setGuests((g) => Math.min(12, g + 1))}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </Field>
              </div>

              <fieldset className="mt-5 min-w-0">
                <legend className="text-xs text-muted">Time</legend>
                <div className="scrollbar-none mt-2 flex w-full min-w-0 gap-2 overflow-x-auto pb-1">
                  {SLOTS.map((s) => {
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
                          (on ? "border-ink bg-ink text-foam" : "border-line bg-paper")
                        }
                      >
                        {labelTime(s)}
                        {state === "few" ? " · few" : ""}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <Field label="A note, if you need one" id="note">
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="field mt-2 resize-none"
                  placeholder="Window, a birthday, the dog is coming"
                />
              </Field>

              {error && (
                <p className="mt-4 text-sm text-clay" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 h-12 bg-ink px-6 text-sm text-foam transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Request this table
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="mt-4 block text-xs text-muted sm:mt-0">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}
