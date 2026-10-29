export type ColoringBook = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  href?: string;
  comingSoon?: boolean;
  paragraphs: readonly string[];
};

export const littleHaunts: ColoringBook = {
  "id": "little-haunts",
  "title": "Little Haunts & Happy Plants",
  "image": "/images/books/little-haunts-happy-plants.jpg",
  "imageAlt": "Little Haunts & Happy Plants cover with a friendly ghost, white cat, plants, and a mushroom house",
  "href": "https://link.amazon/B03B1TntH",
  "paragraphs": [
    "A cozy, gently spooky garden is waiting for your favorite colors.",
    "Explore 40 illustrations of friendly ghosts, curious cats, leafy plants, pumpkins, and little mushroom homes. Spacious scenes and more detailed garden corners offer different ways to enjoy a creative break.",
    "This 8.5 × 8.5-inch paperback includes black-and-white artwork, blank reverse pages, and a color-swatch page. If using markers, place a protective sheet behind the page; blank backs do not prevent bleed-through."
  ]
};

export const littleCocoa: ColoringBook = {
  "id": "little-cocoa-club",
  "title": "The Little Cocoa Club",
  "image": "/images/books/little-cocoa-club.jpg",
  "imageAlt": "The Little Cocoa Club paperback cover with an otter, rabbit, fox, and hedgehog sharing cocoa beside a snowy café window",
  "href": "https://link.amazon/B01xtcRTf",
  "paragraphs": [
    "Step into a cozy woodland café with four animal friends and a warm winter welcome.",
    "Color 40 distinct winter café scenes, each paired with a cheerful rhyme—from snowy window seats and baking to book exchanges and a knitting nook. Bold outlines and simple-to-moderate details leave room for your own colors.",
    "This 88-page, 8.5 × 8.5-inch paperback includes black-and-white scenes, blank reverse pages, and a color-swatch page. Use colored pencils, or place a protective sheet behind the page when using markers; blank backs do not prevent bleed-through."
  ]
};

// KDP Bookshelf verified 2026-10-28: both companions remain Draft.
// Add purchase URLs only after their public Amazon listings are verified live.
export const cozyNooks: ColoringBook = {
  id: "little-haunts-cozy-nooks",
  title: "Little Haunts & Cozy Nooks",
  image: "/images/books/little-haunts-cozy-nooks.webp",
  imageAlt: "Little Haunts and Cozy Nooks cover with a friendly ghost reading in an armchair beside a sleeping cat",
  comingSoon: true,
  paragraphs: [
    "Cozy rooms. Happy little haunts. Explore snug reading corners, pillow forts, cheerful craft rooms, and moonlit hideaways with friendly ghosts and curious cats.",
    "40 original illustrations pair bold outlines with a short rhyme beneath every scene. This 88-page, 8.5 × 8.5-inch paperback includes blank reverse pages and a color-swatch page.",
    "Use colored pencils, or place a protective sheet behind the page when using markers; blank backs do not prevent bleed-through."
  ]
};

export const woodlandWonders: ColoringBook = {
  id: "little-haunts-woodland-wonders",
  title: "Little Haunts & Woodland Wonders",
  image: "/images/books/little-haunts-woodland-wonders.webp",
  imageAlt: "Little Haunts and Woodland Wonders cover with a friendly ghost and woodland animals in an enchanted forest",
  comingSoon: true,
  paragraphs: [
    "Small adventures. Woodland magic. Wander past mushroom cottages, hollow-tree libraries, woodland picnics, and lantern-lit paths with friendly ghosts and forest neighbors.",
    "40 original illustrations pair bold outlines with a short rhyme beneath every scene. This 88-page, 8.5 × 8.5-inch paperback includes blank reverse pages and a color-swatch page.",
    "Use colored pencils, or place a protective sheet behind the page when using markers; blank backs do not prevent bleed-through."
  ]
};

export const coloringBooks: readonly ColoringBook[] = [littleHaunts, littleCocoa, cozyNooks, woodlandWonders];
