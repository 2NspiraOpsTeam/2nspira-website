export const catalogPages = {
  shop: {
    path: "/shop", name: "Shop",
    title: "Shop Printable Games, Coloring Books & Art Prints",
    description: "Explore 2Nspira printable family games, cozy coloring books and pages, and thoughtful wall art. Discover digital downloads on Etsy and paperbacks on Amazon.",
  },
  printables: {
    path: "/shop/printables-games", name: "Printables & Games",
    title: "Printable Family Games & Coloring Pages",
    description: "Download Thanksgiving and Christmas family games, kids’ activity kits, and Cocoa Club coloring pages. Explore six 2Nspira printable products on Etsy.",
  },
  coloring: {
    path: "/shop/coloring-books", name: "Coloring Books",
    title: "Cozy Coloring Books for Adults & Teens",
    description: "Discover Little Haunts & Happy Plants and The Little Cocoa Club: cozy paperback coloring books for adults and teens from 2Nspira Books, available on Amazon.",
  },
  art: {
    path: "/shop/art-prints", name: "Art Prints",
    title: "Printable Wall Art & Physical Art Prints",
    description: "Explore 2Nspira wall art about collaboration, belonging, accountability, empowerment, and focus. Choose printable downloads or a physical print on Etsy.",
  },
  books: {
    path: "/books", name: "Leadership Books",
    title: "Trust Is the Operating System — Leadership Book",
    description: "Explore Trust Is the Operating System by Jeffrey Cortez, a leadership book about trust, judgment, and AI. Read selected excerpts and listen to a reflection.",
  },
} as const;

export type CatalogPage = keyof typeof catalogPages;
export type CatalogQuestion = { question: string; answer: string; link?: { label: string; href: string } };
export const catalogQuestions: Record<CatalogPage, readonly CatalogQuestion[]> = {
  shop: [
    { question: "Where do I buy 2Nspira books and designs?", answer: "Browse the collections here, then use the product’s purchase button. Etsy handles purchases of digital printables and art prints; Amazon handles purchases of paperback activity and coloring books." },
    { question: "How do I tell digital downloads from physical products?", answer: "Each card shows its format. Digital downloads are files you print yourself; no physical item is shipped. Paperback activity and coloring books and the physical art print are shipped products. Check the marketplace listing for current options and fulfillment details." },
  ],
  printables: [
    { question: "Are the games and coloring pages digital downloads?", answer: "Yes. These are printable files purchased through Etsy, not items shipped to you. Check each product’s details for its activities, paper sizes, and suggested audience before printing." },
    { question: "Does the Christmas Gathering Bundle include extra activities?", answer: "The bundle contains the same PDFs as Christmas Table Rescue and The Cozy Elf Workshop: eight group challenges and sixteen individual activities. It does not include additional or exclusive activities." },
  ],
  coloring: [
    { question: "Are these coloring books paperbacks or printable files?", answer: "These two titles are physical paperback coloring books for adults and teens, purchased on Amazon. The Cocoa Club printable PDF is a separate Etsy product in Printables & Games.", link: { label: "Browse printable games and coloring pages", href: "/shop/printables-games" } },
    { question: "Can I use markers in the coloring books?", answer: "Both books have artwork with blank reverse pages. Use a protective sheet behind your page when using markers: blank backs do not prevent ink from bleeding through. Each book also includes a color-swatch page." },
  ],
  art: [
    { question: "Which Art Prints are digital downloads?", answer: "Build the bridge, Leave room, Own the next step, and Help others rise are digital artwork downloads. Each includes one design in 5 × 7-inch, 8 × 10-inch, and A4 PDF sizes, plus a printing guide. Reduce the Noise. Strengthen the Signal. is the physical print." },
    { question: "Do the digital art downloads include a frame?", answer: "No. The digital designs do not include printed artwork, a frame, or mounting. Their listing images use illustrated frame mockups. Check the physical print’s Etsy listing separately for its current sizes and what is included." },
  ],
  books: [
    { question: "Where can I read excerpts from Trust Is the Operating System?", answer: "Selected excerpts and related reflections are collected in the book’s Insights category.", link: { label: "Read Trust Is the Operating System excerpts", href: "/blog/categories/trust-is-the-operating-system" } },
    { question: "Is there an audio reflection to explore?", answer: "Yes. This page includes When Systems Work, Trust Weakens, a conversation on leadership, AI, and judgment. Use the audio player to listen at your own pace.", link: { label: "Go to the leadership audio reflection", href: "/books#leadership-reflection" } },
  ],
};
