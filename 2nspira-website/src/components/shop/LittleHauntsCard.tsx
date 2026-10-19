import ColoringBookCard from "./ColoringBookCard";

export default function LittleHauntsCard({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return <ColoringBookCard
    id="little-haunts"
    title="Little Haunts & Happy Plants"
    image="/images/books/little-haunts-happy-plants.jpg"
    imageAlt="Little Haunts & Happy Plants cover with a friendly ghost, white cat, plants, and a mushroom house"
    href="https://link.amazon/B03B1TntH"
    headingLevel={headingLevel}
    paragraphs={[
      "A cozy, gently spooky garden is waiting for your favorite colors.",
      "Explore 40 illustrations of friendly ghosts, curious cats, leafy plants, pumpkins, and little mushroom homes. Spacious scenes and more detailed garden corners offer different ways to enjoy a creative break.",
      "This 8.5 × 8.5-inch paperback includes black-and-white artwork, blank reverse pages, and a color-swatch page. If using markers, place a protective sheet behind the page; blank backs do not prevent bleed-through.",
    ]}
  />;
}
