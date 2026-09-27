export type Dish = {
  id: string;
  name: string;
  category: "Biryani" | "Grill" | "Kerala" | "Bread" | "Sweet";
  blurb: string;
  /** Public-listing guide in rupees. Null means the printed card was not confirmed. */
  price: number | null;
  veg: boolean;
  image: string;
  onTable: boolean;
};

export const DISHES: Dish[] = [
  {
    id: "biryani",
    name: "Chicken biryani",
    category: "Biryani",
    blurb: "The lunch plate Maradu actually queues for. Saffron rice, a roasted piece, fried onion.",
    price: 240,
    veg: false,
    image: "/ramees/biryani.jpg",
    onTable: true,
  },
  {
    id: "mutton",
    name: "Mutton biryani",
    category: "Biryani",
    blurb: "The one reviewers name by the plate. Heavier spice, same copper pot.",
    price: 310,
    veg: false,
    image: "/ramees/biryani.jpg",
    onTable: false,
  },
  {
    id: "lollipop",
    name: "Chicken lollipop",
    category: "Grill",
    blurb: "Sweet chilli glaze, charred edges. The starter people film before they sit.",
    price: null,
    veg: false,
    image: "/ramees/lollipop.jpg",
    onTable: true,
  },
  {
    id: "alfaham",
    name: "Classic alfaham",
    category: "Grill",
    blurb: "Charcoal chicken, Arabic spice crust, lemon. The Whytefort grill, not a tandoor impression.",
    price: null,
    veg: false,
    image: "/ramees/alfaham.jpg",
    onTable: true,
  },
  {
    id: "bbq",
    name: "Pepper barbecue chicken",
    category: "Grill",
    blurb: "Pepper-forward, off the same fire as the alfaham.",
    price: 250,
    veg: false,
    image: "/ramees/alfaham.jpg",
    onTable: false,
  },
  {
    id: "afghani",
    name: "Afghani chicken",
    category: "Grill",
    blurb: "Cream, charcoal, a quieter plate than the chilli starters.",
    price: 275,
    veg: false,
    image: "/ramees/platter.jpg",
    onTable: false,
  },
  {
    id: "beef",
    name: "Beef roast & porotta",
    category: "Kerala",
    blurb: "Dark coconut roast, flaky porotta torn at the table. The Kerala half of the menu.",
    price: 170,
    veg: false,
    image: "/ramees/porotta.jpg",
    onTable: true,
  },
  {
    id: "bellari",
    name: "Beef bellari rice",
    category: "Kerala",
    blurb: "Named again and again in the Google reviews. A rice plate, not a biryani.",
    price: null,
    veg: false,
    image: "/ramees/porotta.jpg",
    onTable: false,
  },
  {
    id: "chilli",
    name: "Ramees special chilli chicken",
    category: "Kerala",
    blurb: "The house chilli — hotter and wetter than the lollipop glaze.",
    price: null,
    veg: false,
    image: "/ramees/lollipop.jpg",
    onTable: false,
  },
  {
    id: "paneer",
    name: "Paneer butter masala",
    category: "Kerala",
    blurb: "The vegetarian plate that still belongs on a meat table.",
    price: 195,
    veg: true,
    image: "/ramees/platter.jpg",
    onTable: false,
  },
  {
    id: "porotta",
    name: "Kerala porotta",
    category: "Bread",
    blurb: "Layered, pulled apart. Order two if the roast is for the table.",
    price: null,
    veg: true,
    image: "/ramees/porotta.jpg",
    onTable: false,
  },
  {
    id: "cheese",
    name: "Cheese porotta",
    category: "Bread",
    blurb: "The filled one visitors single out — omelette and cheese inside the layers.",
    price: 115,
    veg: true,
    image: "/ramees/porotta.jpg",
    onTable: false,
  },
  {
    id: "platter",
    name: "Ramees super platter",
    category: "Grill",
    blurb: "Grill, lollipop, porotta, a small biryani. Built for three, priced as a table.",
    price: null,
    veg: false,
    image: "/ramees/platter.jpg",
    onTable: true,
  },
  {
    id: "falooda",
    name: "Ramees special falooda",
    category: "Sweet",
    blurb: "Rose syrup, vermicelli, ice cream. The close of a loud dinner.",
    price: null,
    veg: true,
    image: "/ramees/falooda.jpg",
    onTable: true,
  },
];

export const TABLE_IDS = DISHES.filter((d) => d.onTable).map((d) => d.id);

export const CATEGORIES = ["All", "Biryani", "Grill", "Kerala", "Bread", "Sweet"] as const;
export type Category = (typeof CATEGORIES)[number];

export const SLOTS = ["12:30 pm", "1:30 pm", "2:30 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm"];

export const PHONE_DISPLAY = "075105 66666";
export const PHONE_TEL = "+917510566666";
export const PHONE_WA = "917510566666";

export const ADDRESS =
  "The Whytefort Hotel, Service Road, Vijaya Nagar, Jaya Nagar, Maradu, Kochi, Kerala 682304";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Ramees+Restaurant+Whytefort+Hotel+Maradu+Kochi";

export function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function dishById(id: string) {
  return DISHES.find((d) => d.id === id) ?? DISHES[0];
}
