import { useEffect, useRef } from "react";

type Frame = {
  dish: string | null;
  image: string;
  alt: string;
  kicker: string;
  title: string;
  sub: string;
  malayalam: boolean;
};

const FRAMES: Frame[] = [
  {
    dish: null,
    image: "/ramees/room.jpg",
    alt: "Dining room at Ramees, Whytefort Hotel, Maradu",
    kicker: "WHYTEFORT · FLOOR 0",
    title: "റമീസ്",
    sub: "A late table in Maradu. The pot stays open until 11:30.",
    malayalam: true,
  },
  {
    dish: "biryani",
    image: "/ramees/biryani.jpg",
    alt: "Chicken biryani",
    kicker: "01 · THE POT",
    title: "Biryani",
    sub: "Saffron rice, a roasted piece, fried onion. The plate the room queues for.",
    malayalam: false,
  },
  {
    dish: "lollipop",
    image: "/ramees/lollipop.jpg",
    alt: "Chicken lollipop",
    kicker: "02 · SWEET CHILLI",
    title: "Lollipop",
    sub: "Glaze, char, the starter people film before they sit.",
    malayalam: false,
  },
  {
    dish: "alfaham",
    image: "/ramees/alfaham.jpg",
    alt: "Classic alfaham",
    kicker: "03 · THE GRILL",
    title: "Alfaham",
    sub: "Charcoal chicken, Arabic crust, lemon. Not a tandoor impression.",
    malayalam: false,
  },
  {
    dish: "porotta",
    image: "/ramees/porotta.jpg",
    alt: "Kerala porotta",
    kicker: "04 · TORN",
    title: "Porotta",
    sub: "Layered, pulled apart, next to the beef roast.",
    malayalam: false,
  },
  {
    dish: "falooda",
    image: "/ramees/falooda.jpg",
    alt: "Ramees special falooda",
    kicker: "05 · LAST GLASS",
    title: "Falooda",
    sub: "Rose, vermicelli, ice cream. Then the bill.",
    malayalam: false,
  },
];

type Props = {
  reduced: boolean;
  onPick: (id: string) => void;
};

export function Reel({ reduced, onPick }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const plates = useRef<(HTMLDivElement | null)[]>([]);
  const kicker = useRef<HTMLParagraphElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const ghost = useRef<HTMLParagraphElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const count = useRef<HTMLParagraphElement>(null);
  const play = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLButtonElement>(null);
  const index = useRef(-1);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      const el = root.current;
      if (el) {
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 0));
        const p = total > 0 ? scrolled / total : 0;
        paint(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  function paint(p: number) {
    const n = FRAMES.length;
    const x = Math.min(0.9999, Math.max(0, p)) * n;
    const i = Math.floor(x);
    const local = x - i;
    const frame = FRAMES[i];

    plates.current.forEach((node, idx) => {
      if (!node) return;
      const photo = node.querySelector("img");
      if (idx < i) {
        node.style.clipPath = "inset(0 0 0 100%)";
        node.style.zIndex = "1";
      } else if (idx === i) {
        node.style.clipPath = "inset(0 0 0 0)";
        node.style.zIndex = "2";
        if (photo) photo.style.transform = `scale(${1.12 - local * 0.06})`;
      } else if (idx === i + 1) {
        node.style.clipPath = `inset(0 ${(1 - local) * 100}% 0 0)`;
        node.style.zIndex = "3";
        if (photo) photo.style.transform = "scale(1.14)";
      } else {
        node.style.clipPath = "inset(0 100% 0 0)";
        node.style.zIndex = "0";
      }
    });

    if (index.current !== i) {
      index.current = i;
      if (kicker.current) kicker.current.textContent = frame.kicker;
      if (count.current) count.current.textContent = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
      if (sub.current) sub.current.textContent = frame.sub;
      for (const node of [title.current, ghost.current]) {
        if (!node) continue;
        node.textContent = frame.title;
        node.classList.toggle("font-malayalam", frame.malayalam);
        node.classList.toggle("italic", !frame.malayalam);
      }
      if (cta.current) {
        cta.current.hidden = frame.dish == null;
        cta.current.dataset.dish = frame.dish ?? "";
      }
    }

    const enter = i === 0 ? 1 : Math.min(1, local / 0.28);
    const exit = i === n - 1 ? 0 : local > 0.7 ? (local - 0.7) / 0.3 : 0;
    const y = (1 - enter) * 90 - exit * 140;
    const opacity = enter * (1 - exit);
    if (title.current) {
      title.current.style.transform = `translate3d(${exit * -6}vw, ${y}px, 0) scale(${1 + exit * 0.18})`;
      title.current.style.opacity = String(opacity);
    }
    if (ghost.current) {
      ghost.current.style.transform = `translate3d(calc(0.8rem + ${(1 - enter) * 6 + exit * 8}vw), calc(0.45rem + ${y * 0.35}px), 0)`;
      ghost.current.style.opacity = String(opacity * 0.9);
    }
    if (sub.current) sub.current.style.opacity = String(Math.max(0, opacity - exit));
    if (play.current) play.current.style.transform = `scaleX(${p})`;
  }

  if (reduced) {
    return (
      <div id="reel">
        {FRAMES.map((frame) => (
          <section key={frame.title} className="relative flex h-[80svh] items-end bg-ink">
            <img src={frame.image} alt={frame.alt} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30" />
            <div className="relative z-10 px-5 pb-10 md:px-10">
              <p className="tracking-brand text-xs text-teak">{frame.kicker}</p>
              <h1
                className={`font-display text-6xl leading-display text-cream md:text-8xl ${frame.malayalam ? "font-malayalam not-italic" : "italic"}`}
              >
                {frame.title}
              </h1>
              <p className="mt-2 max-w-md text-cream">{frame.sub}</p>
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div id="reel" ref={root} className="relative h-[520vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-ink">
        {FRAMES.map((frame, i) => (
          <div
            key={frame.title}
            ref={(node) => {
              plates.current[i] = node;
            }}
            className="absolute inset-0"
            style={{ clipPath: i === 0 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
          >
            <img src={frame.image} alt={frame.alt} className="h-full w-full object-cover will-change-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/25" />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 pt-24 pb-8 md:px-10">
          <div className="flex items-start justify-between gap-4">
            <p ref={kicker} className="tracking-brand text-xs text-cream">
              WHYTEFORT · FLOOR 0
            </p>
            <p ref={count} className="font-display text-2xl text-cream">
              01 / 06
            </p>
          </div>
          <div className="max-w-5xl">
            <div className="relative">
              <p
                ref={ghost}
                aria-hidden
                className="stroke-word reel-title font-malayalam pointer-events-none absolute top-0 left-0"
              >
                റമീസ്
              </p>
              <h1 ref={title} className="reel-title font-malayalam relative text-cream">
                റമീസ്
              </h1>
            </div>
            <p ref={sub} className="mt-3 max-w-md text-base text-cream">
              A late table in Maradu. The pot stays open until 11:30.
            </p>
            <button
              ref={cta}
              type="button"
              hidden
              className="pointer-events-auto mt-5 min-h-11 bg-chilli px-5 text-sm text-cream"
              onClick={() => {
                const id = cta.current?.dataset.dish;
                if (id) onPick(id);
              }}
            >
              Put this on the slip
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-cream/20">
          <div ref={play} className="h-full origin-left bg-chilli" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
