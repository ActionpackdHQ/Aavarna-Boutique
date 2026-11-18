export type Product = {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  discount?: number;
  image: string;
  hoverImage: string;
  category: string;
  note?: string;
};

const WA_PHONE = "918190007072";

/** Prefill WhatsApp so one tap sends a ready message. */
export function whatsappUrl(
  message = "Hi, I'd like to enquire with Aavarna Boutique."
) {
  return `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

/** Starting prices from the studio rate card. Final price after design review. */
export const products: Product[] = [
  {
    id: "1",
    name: "Dart Blouse (Plain)",
    price: 750,
    note: "Lined from ₹950",
    image: "/images/product-kanchipuram-temple-border.webp",
    hoverImage: "/images/product-kanchipuram-temple-border-hover.webp",
    category: "Blouses",
  },
  {
    id: "2",
    name: "Princess Cut Blouse",
    price: 950,
    note: "Lined from ₹1,250",
    image: "/images/product-soft-silk-pastel-peach.webp",
    hoverImage: "/images/product-soft-silk-pastel-peach-hover.webp",
    category: "Blouses",
  },
  {
    id: "3",
    name: "Bridal Blouse",
    price: 5000,
    image: "/images/product-bridal-blouse-heavy-zari.webp",
    hoverImage: "/images/product-bridal-blouse-heavy-zari-hover.webp",
    category: "Blouses",
  },
  {
    id: "4",
    name: "Madhubala Cut Blouse",
    price: 3200,
    image: "/images/product-bridal-blouse-elbow-sleeve.webp",
    hoverImage: "/images/product-bridal-blouse-elbow-sleeve-hover.webp",
    category: "Blouses",
  },
  {
    id: "5",
    name: "Half Saree",
    price: 2500,
    image: "/images/product-banarasi-midnight-blue.webp",
    hoverImage: "/images/product-banarasi-midnight-blue-hover.webp",
    category: "Ethnic",
  },
  {
    id: "6",
    name: "Lehenga",
    price: 2500,
    note: "Full custom (incl. fabric) from ₹20,000",
    image: "/images/product-lehenga-blouse-set.webp",
    hoverImage: "/images/product-lehenga-blouse-set-hover.webp",
    category: "Ethnic",
  },
  {
    id: "7",
    name: "Anarkali / Panel Anarkali",
    price: 3200,
    image: "/images/product-anarkali-ivory-gold.webp",
    hoverImage: "/images/product-anarkali-ivory-gold-hover.webp",
    category: "Ethnic",
  },
  {
    id: "8",
    name: "Aari with Stitching",
    price: 3000,
    note: "Saree border Aari from ₹8,000",
    image: "/images/brand-statement-zari-closeup.webp",
    hoverImage: "/images/product-bridal-blouse-heavy-zari.webp",
    category: "Aari",
  },
];

export const lookbook = [
  {
    id: "lb1",
    title: "Bridal Blouses",
    subtitle: "Custom work for the big day",
    image: "/images/lookbook-bridal-silk.webp",
  },
  {
    id: "lb2",
    title: "Aari Embroidery",
    subtitle: "Hand embroidery, made to design",
    image: "/images/brand-statement-zari-closeup.webp",
  },
  {
    id: "lb3",
    title: "Ethnic Sets",
    subtitle: "Half sarees, lehengas & anarkalis",
    image: "/images/lookbook-evening-drape.webp",
  },
  {
    id: "lb4",
    title: "Western Wear",
    subtitle: "Dresses, co-ords, gowns & more",
    image: "/images/collection-dresses.webp",
  },
  {
    id: "lb5",
    title: "Fitting Studio",
    subtitle: "Unlimited free trials by appointment",
    image: "/images/lookbook-fitting-studio.webp",
  },
];

export const collections = [
  {
    id: "blouses",
    title: "Blouses",
    copy: "Dart, princess, pattern, Madhubala & bridal — stitched to your fabric and measurements.",
    image: "/images/collection-bridal-blouses.webp",
    href: "#products",
  },
  {
    id: "ethnic",
    title: "Ethnic & Bridal",
    copy: "Half sarees, lehengas, anarkalis, salwar suits and Aari hand embroidery — custom only.",
    image: "/images/collection-sarees.webp",
    href: "#products",
  },
  {
    id: "western",
    title: "Western & Kids",
    copy: "Dresses, gowns, co-ords, blazers and kids wear — brought to life from your fabric.",
    image: "/images/collection-dresses.webp",
    href: "#products",
  },
];

export const categories = [
  {
    id: "blouses",
    title: "Custom Blouses",
    image: "/images/category-bridal-blouses.webp",
    href: "#products",
  },
  {
    id: "aari",
    title: "Aari Embroidery",
    image: "/images/brand-statement-zari-closeup.webp",
    href: "#products",
  },
];

/** Only studio-confirmed promises — no unverified headcounts. */
export const studioFacts = [
  { value: "₹0", label: "Alteration charges" },
  { value: "Free", label: "Unlimited trials" },
  { value: "50%", label: "Advance on order" },
  { value: "Chennai", label: "By appointment" },
] as const;

export const reviews = [
  {
    id: "r1",
    name: "Priya M.",
    place: "Chennai",
    quote:
      "Brought my Kanchipuram for a bridal blouse — three fittings until it sat perfectly. They explained every stitch in Tamil and English.",
  },
  {
    id: "r2",
    name: "Ananya R.",
    place: "Adyar",
    quote:
      "Aari work on my half-saree border looked exactly like the reference I sent on WhatsApp. Clear quote, no surprise charges.",
  },
  {
    id: "r3",
    name: "Deepika S.",
    place: "Anna Nagar",
    quote:
      "Express turnaround before a function and free alterations after. Feels like a real atelier, not a ready-made shop.",
  },
] as const;

export const marqueeText =
  "CUSTOM STITCHING ◆ BLOUSES ◆ AARI ◆ LEHENGAS ◆ WESTERN ◆ KIDS WEAR ◆ YOUR FABRIC ◆ ";

export const hours = [
  { days: "Studio visits", time: "By appointment" },
  { days: "Booking", time: "WhatsApp · team confirms" },
];

export const contact = {
  brand: "Aavarna Boutique",
  tagline: "Custom designer studio · Chennai",
  owner: "Aavarna Boutique",
  address: "Studio visits by appointment",
  city: "Chennai",
  phone: "81900 07072",
  phoneSecondary: "",
  phoneHref: "tel:+918190007072",
  phoneSecondaryHref: "",
  whatsapp: whatsappUrl(),
  whatsappGeneral: whatsappUrl(),
  /** No third-party pin — share location on WhatsApp after booking. */
  maps: "",
  /** Consultations book over WhatsApp — never an external personal calendar. */
  calendar: whatsappUrl(
    "Hi, I'd like to request a consultation with Aavarna Boutique."
  ),
  assistantUrl: "/assistant",
  /** Payment IDs confirmed by the team on WhatsApp — do not invent UPI handles. */
  upiId: "",
  upiName: "Aavarna Boutique",
  socials: {
    /** No public Instagram handle yet — omit link until confirmed. */
    instagram: "",
  },
};

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatFromPrice(n: number) {
  return `From ${formatPrice(n)}`;
}
