// Listing images/details verified against live Etsy listings on 2026-10-16 and 2026-10-17.
// Preserve owner-supplied shop-subdomain links; do not manufacture tracking parameters.
export const etsyShopUrl = "https://2nspira.etsy.com";

export type ShopProduct = {
  id: string;
  title: string;
  description: string;
  format: "Digital download" | "Physical print · Multiple sizes" | "Paperback · Amazon" | "Paperback & Kindle · Amazon";
  marketplace?: "Etsy" | "Amazon";
  details: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt: string;
  href: string;
};

export const printables: ShopProduct[] = [
  {
    id: "christmas-gathering-bundle",
    title: "Christmas Gathering Bundle",
    description: "Pair eight cooperative family challenges with sixteen individual puzzles and drawing activities. Contains the same PDFs as Christmas Table Rescue and The Cozy Elf Workshop—no additional activities.",
    format: "Digital download",
    details: "4 PDFs · US Letter + A4 · Guides and answers included · Personal use",
    image: "/images/shop/christmas-gathering-bundle.jpg",
    imageWidth: 1080,
    imageHeight: 914,
    imageAlt: "Christmas Gathering Bundle showing the Christmas Table Rescue and Cozy Elf Workshop covers side by side",
    href: "https://2nspira.etsy.com/listing/4597140476",
  },
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
    id: "build-the-bridge",
    title: "Build the bridge — Collaboration",
    description: "A sculptural bridge joins two sides over flowing water beneath an ochre sun. A warm visual reflection on bringing perspectives together in shared workspaces and home offices.",
    format: "Digital download",
    details: "One design · 3 PDF sizes: 5 × 7 in, 8 × 10 in + A4 · Printing guide · No physical item or frame",
    image: "/images/shop/build-the-bridge.jpg",
    imageWidth: 1080,
    imageHeight: 810,
    imageAlt: "Collaboration artwork mockup showing a navy and terracotta bridge over flowing water beneath an ochre sun",
    href: "https://2nspira.etsy.com/listing/4597328332",
  },
  {
    id: "leave-room",
    title: "Leave room — Belonging",
    description: "A circle of sculptural seats leaves an open invitation for another perspective. An art-led reminder to welcome different voices into meeting spaces, workplaces, and home offices.",
    format: "Digital download",
    details: "One design · 3 PDF sizes: 5 × 7 in, 8 × 10 in + A4 · Printing guide · No physical item or frame",
    image: "/images/shop/leave-room.jpg",
    imageWidth: 1080,
    imageHeight: 810,
    imageAlt: "Belonging artwork mockup showing colorful sculptural seats around an ochre table with space left open",
    href: "https://2nspira.etsy.com/listing/4597329048",
  },
  {
    id: "own-the-next-step",
    title: "Own the next step — Accountability",
    description: "A highlighted stepping stone begins a deliberate path across calm water. A thoughtful reflection on careful choices and following through, without pressure or hustle slogans.",
    format: "Digital download",
    details: "One design · 3 PDF sizes: 5 × 7 in, 8 × 10 in + A4 · Printing guide · No physical item or frame",
    image: "/images/shop/own-the-next-step.jpg",
    imageWidth: 1080,
    imageHeight: 810,
    imageAlt: "Accountability artwork mockup showing a terracotta stepping stone leading across calm blue water toward the sun",
    href: "https://2nspira.etsy.com/listing/4597329372",
  },
  {
    id: "help-others-rise",
    title: "Help others rise — Empowerment",
    description: "Botanical stems grow from shared ground, making space for new growth. A warm visual tribute to mentorship, encouragement, and helping others develop their strengths.",
    format: "Digital download",
    details: "One design · 3 PDF sizes: 5 × 7 in, 8 × 10 in + A4 · Printing guide · No physical item or frame",
    image: "/images/shop/help-others-rise.jpg",
    imageWidth: 1080,
    imageHeight: 810,
    imageAlt: "Empowerment artwork mockup showing navy, teal, and sage botanical stems growing from shared terracotta ground",
    href: "https://2nspira.etsy.com/listing/4597308883",
  },
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

// Published paperback details confirmed against the Amazon listings on 2026-10-26.
export const activityBooks: ShopProduct[] = [
  {
    id: "holiday-family-challenge-book",
    title: "Holiday Family Challenge Book",
    description: "A little less scrolling. A little more together. Bring 100 quick games, word puzzles, drawing prompts, and team challenges to holiday gatherings and cozy family afternoons.",
    format: "Paperback · Amazon",
    marketplace: "Amazon",
    details: "Ages 8+ and adults · 110 pages · 7 × 10 inches · Physical book—no printing required",
    image: "/images/shop/holiday-family-challenge-book.jpg",
    imageWidth: 1312,
    imageHeight: 1873,
    imageAlt: "Holiday Family Challenge Book cover with cream lettering, gold stars, and a coral banner on a green background",
    href: "https://www.amazon.com/dp/B0HPB5VSL6",
  },
  {
    id: "grandparents-grandkids-table-challenges",
    title: "Grandparents & Grandkids Table Challenges",
    description: "Two generations. Plenty to share. Enjoy 60 shared games, story prompts, and drawing activities that turn an ordinary visit into time to talk, laugh, and create together.",
    format: "Paperback · Amazon",
    marketplace: "Amazon",
    details: "Ages 8+ and adults · 66 pages · 7 × 10 inches · Physical book—no printing required",
    image: "/images/shop/grandparents-grandkids-table-challenges.jpg",
    imageWidth: 1312,
    imageHeight: 1873,
    imageAlt: "Grandparents and Grandkids Table Challenges cover with cream lettering, a gold banner, and two speech bubbles on a blue background",
    href: "https://www.amazon.com/dp/B0HP83DSV9",
  },
];


export const leadershipBooks: ShopProduct[] = [
  {
    id: "trust-is-the-operating-system",
    title: "Trust Is the Operating System",
    description: "Explore how human-centered leaders build organizations that endure in an AI-saturated world—and why trust, judgment, and meaning matter as automation increases.",
    format: "Paperback & Kindle · Amazon",
    marketplace: "Amazon",
    details: "By Jeffrey Cortez · Leadership, trust, and AI · Choose your edition on Amazon",
    image: "/images/books/trust-is-the-operating-system.jpg",
    imageWidth: 1600,
    imageHeight: 2560,
    imageAlt: "Cover of Trust Is the Operating System by Jeffrey Cortez",
    href: "https://www.amazon.com/dp/B0GDQG1XBL",
  },
];
