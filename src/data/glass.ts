export type Category = "Start" | "Coast" | "Rice" | "Bread" | "Sweet";

export type Dish = {
  id: string;
  name: string;
  blurb: string;
  price: number;
  category: Category;
  popular?: boolean;
  seasonal?: boolean;
  image: string;
  veg: boolean;
};

export const PHONE_DISPLAY = "080 4620 5900";
export const PHONE_TEL = "+918046205900";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Glass+Kitchen+%26+Bar+Holiday+Inn+Bengaluru+Racecourse";

export const ADDRESS = [
  "16/1, Seshadri Road",
  "Holiday Inn Bengaluru Racecourse",
  "Gandhi Nagar, Bengaluru 560009",
];

export const CATEGORIES: Category[] = ["Start", "Coast", "Rice", "Bread", "Sweet"];

export const LUNCH = ["12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
export const DINNER = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];

export const DISHES: Dish[] = [
  {
    id: "crab",
    name: "Avocado & Crab Salad",
    blurb: "From the coastal card. Cool, sharp, the plate that starts a long dinner.",
    price: 740,
    category: "Start",
    popular: true,
    image: "/glass/crab.jpg",
    veg: false,
  },
  {
    id: "khakra",
    name: "Avocado & Khakra",
    blurb: "The vegetarian twin. Crisp khakra, ripe avocado.",
    price: 480,
    category: "Start",
    image: "/glass/crab.jpg",
    veg: true,
  },
  {
    id: "paniyaram",
    name: "Nei Podi Kara Paniyaram",
    blurb: "Fermented batter, ghee, a podi heat. What Bengaluru calls paddu, done for the room.",
    price: 420,
    category: "Start",
    image: "/glass/paniyaram.jpg",
    veg: true,
  },
  {
    id: "kalmi",
    name: "Black Garlic Kalmi Kebab",
    blurb: "Charred, glazed, the one guests photograph before they sit back.",
    price: 680,
    category: "Start",
    popular: true,
    image: "/glass/kebab.jpg",
    veg: false,
  },
  {
    id: "millet",
    name: "Foxtail Millet & Yam Kebab",
    blurb: "Tawa-cooked. Grain, yam, a cleaner heat.",
    price: 460,
    category: "Start",
    image: "/glass/kebab.jpg",
    veg: true,
  },
  {
    id: "gassi",
    name: "Mangalorean Tarkari Gassi",
    blurb: "Vegetables in a coconut gravy. The coast, without the theatre.",
    price: 680,
    category: "Coast",
    image: "/glass/coast.jpg",
    veg: true,
  },
  {
    id: "avial",
    name: "Malabar Avial",
    blurb: "Mixed vegetables, coconut milk, the seasoning that makes the table go quiet.",
    price: 620,
    category: "Coast",
    image: "/glass/coast.jpg",
    veg: true,
  },
  {
    id: "paneer",
    name: "Kadai Paneer",
    blurb: "The familiar order, in a room that doesn’t treat it as an afterthought.",
    price: 720,
    category: "Coast",
    image: "/glass/coast.jpg",
    veg: true,
  },
  {
    id: "soup",
    name: "Seafood & Smoked Tomato Soup",
    blurb: "Smoke first, then the sea. A small bowl that eats like a course.",
    price: 540,
    category: "Coast",
    image: "/glass/coast.jpg",
    veg: false,
  },
  {
    id: "sadhya",
    name: "Non Veg Onam Sadhya",
    blurb: "When the festival kitchen is on. Regulars plan the year around this leaf.",
    price: 1450,
    category: "Rice",
    popular: true,
    seasonal: true,
    image: "/glass/coast.jpg",
    veg: false,
  },
  {
    id: "kozhi",
    name: "Ambur Kozhi Biryani",
    blurb: "Seeraga samba, chicken, chilli, butter. A full plate, not a side.",
    price: 780,
    category: "Rice",
    image: "/glass/coast.jpg",
    veg: false,
  },
  {
    id: "mutton",
    name: "Malabar Mutton Biryani",
    blurb: "Kaima rice, fried onion, cashew. The longer order.",
    price: 860,
    category: "Rice",
    image: "/glass/coast.jpg",
    veg: false,
  },
  {
    id: "parotta",
    name: "Malabar Parotta",
    blurb: "Layered, pulled apart at the table. One piece is never the order.",
    price: 160,
    category: "Bread",
    popular: true,
    image: "/glass/parotta.jpg",
    veg: true,
  },
  {
    id: "appam",
    name: "Appam",
    blurb: "Lace edge, soft well. The bread Paul still writes about.",
    price: 180,
    category: "Bread",
    popular: true,
    image: "/glass/appam.jpg",
    veg: true,
  },
  {
    id: "payasam",
    name: "Eleneer Payasam, Chocolate",
    blurb: "Tender coconut, taken somewhere darker. The house ending.",
    price: 420,
    category: "Sweet",
    popular: true,
    image: "/glass/dessert.jpg",
    veg: true,
  },
  {
    id: "paan",
    name: "Chocolate Paan",
    blurb: "A last bite that isn’t a dessert course. Sweet, cool, gone.",
    price: 280,
    category: "Sweet",
    image: "/glass/dessert.jpg",
    veg: true,
  },
  {
    id: "ice",
    name: "Tender Coconut Payasam Ice Cream",
    blurb: "The cooler finish, when the room is still warm.",
    price: 340,
    category: "Sweet",
    image: "/glass/dessert.jpg",
    veg: true,
  },
];

export const REVIEWS = [
  {
    name: "Paul",
    meta: "7 months ago",
    quote:
      "The best, most memorable meal I’ve eaten in a long time. Fusion starters, the appam, and a tres leches that ended it properly.",
  },
  {
    name: "Viral Kamdar",
    meta: "4 weeks ago",
    quote:
      "A hidden gem. Came for an anniversary and stayed for the Onam sadhya. The menu is the reason you book.",
  },
  {
    name: "Vidya S",
    meta: "A month ago",
    quote:
      "Every year I look for a new Onam sadhya in the city. This room is where that search stopped.",
  },
];

export function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function labelTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function dayOf(date: string) {
  return new Date(`${date}T12:00:00`).getDay();
}

export function hasLunch(date: string) {
  const d = dayOf(date);
  return d === 0 || d === 5 || d === 6;
}

export function slotsFor(date: string) {
  if (!date) return DINNER;
  return hasLunch(date) ? [...LUNCH, ...DINNER] : DINNER;
}

export function slotState(date: string, slot: string, now: Date | null): "open" | "few" | "gone" {
  if (!slotsFor(date).includes(slot)) return "gone";
  if (now && date) {
    const [y, mo, d] = date.split("-").map(Number);
    const [hh, mm] = slot.split(":").map(Number);
    const when = new Date(y, mo - 1, d, hh, mm, 0, 0);
    if (when.getTime() < now.getTime()) return "gone";
  }
  let n = 0;
  const s = `${date}${slot}`;
  for (let i = 0; i < s.length; i++) n = (n + s.charCodeAt(i) * (i + 3)) % 97;
  if (n % 11 === 0) return "gone";
  if (n % 5 === 0) return "few";
  return "open";
}

export function formatDay(date: string) {
  if (!date) return "";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function serviceNow(now: Date) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const lunchDay = day === 0 || day === 5 || day === 6;
  if (lunchDay && mins >= 12 * 60 + 30 && mins < 15 * 60 + 30) return "Lunch service";
  if (mins >= 19 * 60 && mins < 23 * 60 + 30) return "Dinner service";
  if (lunchDay && mins < 12 * 60 + 30) return "Opens 12:30";
  if (lunchDay && mins < 19 * 60) return "Reopens at 7";
  if (mins < 19 * 60) return "Opens at 7";
  return "Closed";
}

export type Hold = {
  name: string;
  phone: string;
  date: string;
  slot: string;
  guests: number;
  note: string;
};
