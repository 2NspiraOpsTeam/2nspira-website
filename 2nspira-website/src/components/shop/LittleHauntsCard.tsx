import ColoringBookCard from "./ColoringBookCard";
import { littleHaunts } from "@/content/shop/coloring-books";

export default function LittleHauntsCard({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return <ColoringBookCard {...littleHaunts} headingLevel={headingLevel} />;
}
