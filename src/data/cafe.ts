export type Category = "Coffee" | "Breakfast" | "Pizza" | "Pasta" | "Plates" | "Sweet";

export type Dish = {
  id: string;
  name: string;
  blurb: string;
  price: number;
  category: Category;
  popular?: boolean;
  image: string;
  veg: boolean;
};

export const PHONE_DISPLAY = "090360 19362";
export const PHONE_TEL = "+919036019362";
export const PHONE_WA = "919036019362";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cafe+Memoire+KPR+Tower+Hulimavu+Bengaluru";

export const ADDRESS = [
  "337/14, Ground Floor, KPR Tower",
  "Begur–Hulimavu Road, Krishna Layout",
  "Hulimavu, Bengaluru 560076",
];

export const CATEGORIES: Category[] = [
  "Coffee",
  "Breakfast",
  "Pizza",
  "Pasta",
  "Plates",
  "Sweet",
];

export const DISHES: Dish[] = [
  {
    id: "hazelnut",
    name: "Hazelnut Cappuccino",
    blurb: "The cup regulars order without looking. Espresso, warm milk, a slow hazelnut finish.",
    price: 240,
    category: "Coffee",
    popular: true,
    image: "/images/cappuccino.jpg",
    veg: true,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    blurb: "Short, dense, and finished with a proper foam. The house standard.",
    price: 190,
    category: "Coffee",
    image: "/images/cappuccino.jpg",
    veg: true,
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    blurb: "Dark cocoa, not a packet. Thick enough to end an evening on.",
    price: 230,
    category: "Coffee",
    popular: true,
    image: "/images/chocolate.jpg",
    veg: true,
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    blurb: "Cold brew length, a ribbon of cream, ice that actually lasts.",
    price: 220,
    category: "Coffee",
    image: "/images/iced.jpg",
    veg: true,
  },
  {
    id: "americano",
    name: "Americano",
    blurb: "Espresso stretched with hot water. Clean, for people who want the coffee itself.",
    price: 160,
    category: "Coffee",
    image: "/images/cappuccino.jpg",
    veg: true,
  },
  {
    id: "breakfast",
    name: "Memory Breakfast",
    blurb: "Eggs, sourdough, roasted tomato and greens. The long morning, on one plate.",
    price: 480,
    category: "Breakfast",
    popular: true,
    image: "/images/breakfast.jpg",
    veg: true,
  },
  {
    id: "eggs",
    name: "Eggs on Sourdough",
    blurb: "Two eggs, olive oil, a sharp toast. All day, not just before noon.",
    price: 360,
    category: "Breakfast",
    image: "/images/breakfast.jpg",
    veg: true,
  },
  {
    id: "margherita",
    name: "Thin-crust Margherita",
    blurb: "Blistered edge, mozzarella, basil. The pizza the room is known for.",
    price: 440,
    category: "Pizza",
    popular: true,
    image: "/images/pizza.jpg",
    veg: true,
  },
  {
    id: "garden",
    name: "Garden Thin Crust",
    blurb: "Charred vegetables, a little chilli, the same thin base.",
    price: 480,
    category: "Pizza",
    image: "/images/pizza.jpg",
    veg: true,
  },
  {
    id: "tikka",
    name: "Tikka Thin Crust",
    blurb: "Spiced chicken, onion, a yoghurt heat. Share it, or don’t.",
    price: 540,
    category: "Pizza",
    image: "/images/pizza.jpg",
    veg: false,
  },
  {
    id: "arrabbiata",
    name: "Pan-tossed Arrabbiata",
    blurb: "Tomato, garlic, a honest chilli. Generous, the way guests describe it.",
    price: 420,
    category: "Pasta",
    popular: true,
    image: "/images/pasta.jpg",
    veg: true,
  },
  {
    id: "fettuccine",
    name: "Mushroom Fettuccine",
    blurb: "Cream, mushroom, parmesan. The quiet order when it rains.",
    price: 460,
    category: "Pasta",
    image: "/images/pasta.jpg",
    veg: true,
  },
  {
    id: "club",
    name: "Club Sandwich",
    blurb: "Toasted, stacked, with a side of fries that disappear first.",
    price: 390,
    category: "Plates",
    popular: true,
    image: "/images/sandwich.jpg",
    veg: true,
  },
  {
    id: "garlic",
    name: "Garlic Bread",
    blurb: "Butter, garlic, a browned edge. The thing tables add without discussing.",
    price: 210,
    category: "Plates",
    image: "/images/sandwich.jpg",
    veg: true,
  },
  {
    id: "fries",
    name: "Salted Fries",
    blurb: "Hot, salted, nothing clever. Exactly enough.",
    price: 180,
    category: "Plates",
    image: "/images/sandwich.jpg",
    veg: true,
  },
  {
    id: "brownie",
    name: "Chocolate Brownie",
    blurb: "Cracked top, soft middle, a scoop if you want the evening to last.",
    price: 290,
    category: "Sweet",
    popular: true,
    image: "/images/brownie.jpg",
    veg: true,
  },
];

export const SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];

export const REVIEWS = [
  {
    name: "Chandra Reddy",
    meta: "Local Guide · 8 months ago",
    quote:
      "A perfect spot to relax, enjoy a good chat, and spend quality time. The ambiance is warm, and the service is great.",
  },
  {
    name: "Raveendar Alagudurai",
    meta: "2 months ago",
    quote:
      "Calm and peaceful — the kind of room you stay in. The food was delicious. I’ll be coming back.",
  },
  {
    name: "From 2,889 visits",
    meta: "Google · Hulimavu",
    quote:
      "Guests keep naming the pasta, the sandwiches and the coffee, the generous plates, and a staff that actually welcomes you. Plenty mention bringing the dog.",
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

export function slotState(date: string, slot: string, now: Date | null): "open" | "few" | "gone" {
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

export type Hold = {
  name: string;
  phone: string;
  date: string;
  slot: string;
  guests: number;
  note: string;
};

export function waLink(text: string) {
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`;
}
