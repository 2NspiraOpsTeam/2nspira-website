import ColoringBookCard from "./ColoringBookCard";
import { littleCocoa } from "@/content/shop/coloring-books";

export default function LittleCocoaCard({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return <ColoringBookCard {...littleCocoa} headingLevel={headingLevel} />;
}
