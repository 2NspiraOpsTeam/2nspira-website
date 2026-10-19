export type ColoringBook = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  href: string;
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

export const coloringBooks: readonly ColoringBook[] = [littleHaunts, littleCocoa];
