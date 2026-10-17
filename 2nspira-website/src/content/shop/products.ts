// Listing images/details verified against the live Etsy listings on 2026-10-16.
// Preserve owner-supplied shop-subdomain links; do not manufacture tracking parameters.
export const etsyShopUrl = "https://2nspira.etsy.com";

export type ShopProduct = {
  id: string;
  title: string;
  description: string;
  format: "Digital download" | "Physical print · Multiple sizes";
  details: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt: string;
  href: string;
};

export const printables: ShopProduct[] = [
  {
    id: "little-harvest-table",
    title: "Little Harvest Table — Thanksgiving Kids Table Kit",
    description: "Bring puzzles, drawing, and autumn imagination to the kids’ table with six paper-sized activity mats, twelve write-in place cards, and one keepsake page. Adult cutting is needed only for the optional cards.",
    format: "Digital download",
    details: "Landscape PDFs · US Letter + A4 · Suggested ages 6–10, with help as needed · Personal use",
    image: "/images/shop/little-harvest-table.jpg",
    imageWidth: 1080,
    imageHeight: 914,
    imageAlt: "Thanksgiving Kids Table Kit cover showing a squirrel, turkey, and hedgehog drawing at an autumn table",
    href: "https://2nspira.etsy.com/listing/4597118917",
  },
  {
    id: "cozy-elf-workshop",
    title: "The Cozy Elf Workshop — 16 Christmas Activities",
    description: "Make room for a quieter festive moment with mazes, secret codes, visual puzzles, and drawing pages. Pick any of sixteen stand-alone activities for home or a private family gathering.",
    format: "Digital download",
    details: "Printable PDFs · US Letter + A4 · Suggested ages 7–10, with reading help as needed · Personal use",
    image: "/images/shop/cozy-elf-workshop.jpg",
    imageAlt: "Christmas Quiet-Time: The Cozy Elf Workshop cover with an elf and reindeer drawing at a festive table",
    href: "https://2nspira.etsy.com/listing/4596685843",
  },
  {
    id: "thanksgiving-family-games",
    title: "Thanksgiving Family Games — 8 Activities",
    description: "Bring the table together with playful choices, shared stories, drawing prompts, charades, and a harvest logic puzzle. Choose the activities that suit your gathering.",
    format: "Digital download",
    details: "Printable PDFs · US Letter + A4 · Host guide included · Personal use",
    image: "/images/shop/thanksgiving-family-games.jpg",
    imageAlt: "Thanksgiving Table Games cover with a cheerful pumpkin, squirrel, and pie",
    href: "https://2nspira.etsy.com/listing/4596133102",
  },
  {
    id: "christmas-family-games",
    title: "Christmas Family Games — 8 Cooperative Challenges",
    description: "Take on a shared festive mission with imaginative gifts, North Pole news, a parcel puzzle, and more. Pick three challenges and create a table-toast finale together.",
    format: "Digital download",
    details: "Printable PDFs · US Letter + A4 · Host guide included · Personal use",
    image: "/images/shop/christmas-family-games.jpg",
    imageAlt: "Christmas Table Rescue cover with a snowman, reindeer, elf, and stack of gifts",
    href: "https://2nspira.etsy.com/listing/4596463691",
  },
  {
    id: "cocoa-club",
    title: "Cocoa Club — Winter Café Coloring Pages",
    description: "Slow down with 40 cozy woodland-animal scenes, each paired with a cheerful rhyme. Winter baking, warm drinks, and book nooks come with four bonus bookmarks to color.",
    format: "Digital download",
    details: "Printable PDFs · US Letter + A4 · For adults and teens · Personal use",
    image: "/images/shop/cocoa-club.jpg",
    imageAlt: "The Little Cocoa Club cover with four woodland friends sharing warm drinks in a winter café",
    href: "https://2nspira.etsy.com/listing/4595228205",
  },
];

export const artPrints: ShopProduct[] = [
  {
    id: "reduce-the-noise",
    title: "Reduce the Noise. Strengthen the Signal.",
    description: "Soft, scattered forms resolve into one precise line in this minimalist reflection on clarity and focus. A quiet visual companion for offices, studios, and spaces for thought.",
    format: "Physical print · Multiple sizes",
    details: "Matte paper · Printed and shipped on demand · Choose your size on Etsy",
    image: "/images/shop/reduce-the-noise.jpg",
    imageAlt: "Minimalist art print with a cloud of soft abstract marks resolving into a single vertical line",
    href: "https://2nspira.etsy.com/listing/4437231821",
  },
];
