import { useState, type FormEvent } from "react";

const FILMS = [
  {
    id: "lotus",
    no: "01",
    title: "Lotus",
    kind: "Pre-wedding",
    image: "/palette/04.jpg",
    alt: "A couple in a boat on a lotus pond, photographed by Palette Media",
    note: "Yellow silk, still water, no stiff pose.",
  },
  {
    id: "boat",
    no: "02",
    title: "The boat",
    kind: "Pre-wedding",
    image: "/palette/07.jpg",
    alt: "A couple on a backwater boat at late light, Palette Media",
    note: "The backwater, framed by the roof of the boat.",
  },
  {
    id: "window",
    no: "03",
    title: "The window",
    kind: "Pre-wedding",
    image: "/palette/11.jpg",
    alt: "A couple laughing beside a window, Palette Media",
    note: "Shot through the frame. The laugh is the picture.",
  },
  {
    id: "party",
    no: "04",
    title: "The dressing",
    kind: "Wedding",
    image: "/palette/02.jpg",
    alt: "A bride in pink silk with her party, Palette Media",
    note: "The bride, and the hands still fixing the saree.",
  },
  {
    id: "sangeet",
    no: "05",
    title: "Sangeet",
    kind: "Wedding",
    image: "/palette/03.jpg",
    alt: "A couple dancing under a flower canopy, Palette Media",
    note: "Mint, teal, and the flower arch.",
  },
  {
    id: "walk",
    no: "06",
    title: "The walk",
    kind: "Wedding",
    image: "/palette/12.jpg",
    alt: "A bride in a pink lehenga walking toward the groom, Palette Media",
    note: "She comes down the deck. He waits out of focus.",
  },
] as const;

const RATES = [
  { name: "Pre-wedding", price: "₹20,000", unit: "a day" },
  { name: "Photography", price: "₹50,000", unit: "a day" },
  { name: "Photo and film", price: "₹1,20,000", unit: "a day" },
  { name: "Album", price: "₹20,000", unit: "40 pages" },
];

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Palette+Media+VD+Mansion+Thykoodam+Vyttila+Kochi";

export function PalettePage() {
  const [active, setActive] = useState<(typeof FILMS)[number]["id"]>("lotus");
  const [sent, setSent] = useState("");
  const [error, setError] = useState("");
  const film = FILMS.find((f) => f.id === active) ?? FILMS[0];

  function inquire(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const names = String(data.get("names") ?? "").trim();
    const date = String(data.get("date") ?? "");
    const venue = String(data.get("venue") ?? "").trim();
    if (names.length < 2 || !date) {
      setError("Both names, and a date.");
      return;
    }
    const note = { names, date, venue };
    localStorage.setItem("palette-inquiry", JSON.stringify(note));
    setSent(`${names} · ${date}`);
    setError("");
    window.open("https://www.instagram.com/palettemedia/", "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#films" className="sr-only">
        Skip to the films
      </a>
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-4 py-4 mix-blend-difference md:px-8">
        <a href="#top" className="text-sm text-white">
          Palette Media
        </a>
        <nav className="flex items-center gap-5 text-sm text-white">
          <a href="#films">Films</a>
          <a href="#card" className="hidden sm:inline">
            The card
          </a>
          <a href="#inquire" className="underline decoration-white/50 underline-offset-4">
            Inquire
          </a>
        </nav>
      </header>

      <section id="top" className="relative h-svh bg-ink">
        <img
          src="/palette/04.jpg"
          alt="A couple in a boat on a lotus pond, photographed by Palette Media"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent px-4 pt-28 pb-4 md:px-8">
          <p className="tracking-brand text-xs text-paper">VYTTILA · KOCHI · 4.8 FROM 114</p>
          <h1 className="mark font-display text-paper italic">Palette</h1>
        </div>
      </section>

      <section className="grid gap-8 px-4 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <p className="tracking-brand text-xs text-rust">THE STUDIO</p>
          <p className="font-display mt-4 text-4xl leading-display italic md:text-5xl">
            Weddings, filmed the way Rahul’s team already shoots them.
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-lg text-moss">
            Palette Media works from the first floor of VD Mansion, Thykoodam, by metro pillar 931. Couples
            on WedMeGood name Rahul, and they name the same thing twice: nobody was made to hold an awkward
            pose, and the album came back on time.
          </p>
          <p className="mt-6 text-sm text-moss">
            4.8 on Google, from 114 reviews. Photography, film, haldi, mehendi, sangeet, and the day itself.
            Kochi, and the cities the weddings travel to.
          </p>
        </div>
      </section>

      <section id="films" className="border-t border-mist">
        <div className="flex items-end justify-between gap-4 px-4 py-6 md:px-8">
          <h2 className="font-display text-4xl italic leading-display md:text-6xl">Selected films</h2>
          <p className="text-sm text-moss">Drag sideways</p>
        </div>
        <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-10 md:px-8">
          {FILMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className="film shrink-0 text-left"
            >
              <img src={item.image} alt={item.alt} className="aspect-[3/4] w-full object-cover" />
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl italic">{item.title}</span>
                <span className="text-xs tracking-brand text-rust">{item.no}</span>
              </span>
              <span className="text-sm text-moss">{item.kind}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid border-t border-mist md:grid-cols-2">
        <div className="md:sticky md:top-0 md:h-svh">
          <img src={film.image} alt={film.alt} className="h-full min-h-[70vw] w-full object-cover md:min-h-0 md:h-svh" />
        </div>
        <div className="flex flex-col justify-between gap-10 px-4 py-12 md:px-12 md:py-20">
          <div>
            <p className="tracking-brand text-xs text-rust">
              {film.no} · {film.kind}
            </p>
            <h2 className="font-display mt-3 text-6xl italic leading-display md:text-8xl">{film.title}</h2>
            <p className="mt-6 max-w-md text-lg text-moss">{film.note}</p>
          </div>
          <blockquote className="max-w-md border-t border-mist pt-6">
            <p className="font-display text-2xl italic leading-snug">
              “Rahul has the timing to catch a frame the way it feels, not only the way it looks.”
            </p>
            <footer className="mt-3 text-sm text-moss">Jon Toms, on WedMeGood</footer>
          </blockquote>
        </div>
      </section>

      <section id="card" className="bg-ink px-4 py-16 text-paper md:px-8 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl italic leading-display md:text-7xl">The card</h2>
          <p className="max-w-xs text-sm text-mist">
            Published on WedMeGood. The printed quote for a date can differ. Ask the studio.
          </p>
        </div>
        <ul className="divide-y divide-white/15">
          {RATES.map((rate) => (
            <li key={rate.name} className="flex items-baseline justify-between gap-4 py-5">
              <span className="font-display text-3xl italic md:text-4xl">{rate.name}</span>
              <span className="text-right">
                <span className="block text-lg">{rate.price}</span>
                <span className="text-sm text-mist">{rate.unit}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 px-4 py-16 md:grid-cols-3 md:px-8">
        <Quote
          who="Priya Kandulna"
          text="The most visually pleasing work I have seen. Rahul and his team, from pre-wedding through the reception."
        />
        <Quote
          who="Nijith George"
          text="The album came back beautiful, and the day is still in it. They would book the team again without thinking."
        />
        <Quote
          who="A couple, five years on"
          text="They hired Palette in 2018. Five years later the sister’s wedding went to the same team."
        />
      </section>

      <section id="inquire" className="grid gap-10 border-t border-mist px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <p className="tracking-brand text-xs text-rust">A DATE</p>
          <h2 className="font-display mt-3 text-5xl italic leading-display md:text-7xl">Tell them the day.</h2>
          <p className="mt-4 max-w-md text-moss">
            No phone is listed on the Google card. This note is saved here, then Instagram opens so you can
            send it to @palettemedia.
          </p>
          <p className="mt-6 text-sm">
            <a className="underline decoration-mist underline-offset-4" href={MAPS}>
              1st floor, VD Mansion, Thykoodam, Vyttila, Kochi 682019
            </a>
          </p>
          <p className="mt-2 text-sm text-moss">Studio hours run until 6:30 pm.</p>
        </div>
        {sent ? (
          <div className="border border-mist p-6">
            <p className="tracking-brand text-xs text-rust">HELD ON THIS BROWSER</p>
            <p className="font-display mt-3 text-4xl italic">{sent}</p>
            <a
              className="mt-6 inline-flex min-h-11 items-center bg-rust px-5 text-paper"
              href="https://www.instagram.com/palettemedia/"
            >
              Open Instagram
            </a>
          </div>
        ) : (
          <form onSubmit={inquire} className="grid gap-3">
            <label className="grid gap-1 text-sm">
              The two names
              <input className="field" name="names" required suppressHydrationWarning />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid min-w-0 gap-1 text-sm">
                Date
                <input className="field" name="date" type="date" required suppressHydrationWarning />
              </label>
              <label className="grid min-w-0 gap-1 text-sm">
                Venue
                <input className="field" name="venue" suppressHydrationWarning />
              </label>
            </div>
            {error ? <p className="text-sm text-rust">{error}</p> : null}
            <button type="submit" className="min-h-11 bg-ink text-paper">
              Inquire on Instagram
            </button>
          </form>
        )}
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-mist px-4 py-8 text-sm text-moss md:px-8">
        <p>Palette Media · Vyttila</p>
        <a href="https://www.instagram.com/palettemedia/">@palettemedia</a>
      </footer>
    </div>
  );
}

function Quote({ who, text }: { who: string; text: string }) {
  return (
    <blockquote>
      <p className="font-display text-2xl italic leading-snug">{text}</p>
      <footer className="mt-3 text-sm text-moss">{who}</footer>
    </blockquote>
  );
}
