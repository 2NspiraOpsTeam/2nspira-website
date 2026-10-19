import ColoringBookCard from "./ColoringBookCard";

export default function LittleCocoaCard({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return <ColoringBookCard
    id="little-cocoa-club"
    title="The Little Cocoa Club"
    image="/images/books/little-cocoa-club.jpg"
    imageAlt="The Little Cocoa Club paperback cover with an otter, rabbit, fox, and hedgehog sharing cocoa beside a snowy café window"
    href="https://link.amazon/B01xtcRTf"
    headingLevel={headingLevel}
    paragraphs={[
      "Step into a cozy woodland café with four animal friends and a warm winter welcome.",
      "Color 40 distinct winter café scenes, each paired with a cheerful rhyme—from snowy window seats and baking to book exchanges and a knitting nook. Bold outlines and simple-to-moderate details leave room for your own colors.",
      "This 88-page, 8.5 × 8.5-inch paperback includes black-and-white scenes, blank reverse pages, and a color-swatch page. Use colored pencils, or place a protective sheet behind the page when using markers; blank backs do not prevent bleed-through.",
    ]}
  />;
}
