import Image from "next/image";
import { buttonPrimary, caption, card, h2 } from "@/components/ui";

export default function LittleHauntsCard() {
  return (
<section
          className={`grid gap-10 p-6 sm:p-10 md:grid-cols-[1fr_2fr] ${card}`}
          aria-labelledby="little-haunts-title"
        >
          <Image
            src="/images/books/little-haunts-happy-plants.jpg"
            alt="Little Haunts & Happy Plants cover with a friendly ghost, white cat, plants, and a mushroom house"
            width={1000}
            height={1000}
            unoptimized
            className="mx-auto h-auto w-full max-w-xs rounded-xl shadow-[0_18px_45px_rgba(35,41,54,0.16)] transition-transform duration-500 ease-gentle hover:-translate-y-1"
          />
          <div>
            <h3 id="little-haunts-title" className={h2}>Little Haunts &amp; Happy Plants</h3>
            <p className="mt-4 text-sm font-medium text-accent">Paperback coloring book · Adults &amp; teens</p>
            <p className="mt-3 text-sm text-body">By 2Nspira Books</p>
            <div className="mt-6 space-y-4 leading-8 text-body">
              <p>A cozy, gently spooky garden is waiting for your favorite colors.</p>
              <p>
                Explore 40 illustrations of friendly ghosts, curious cats,
                leafy plants, pumpkins, and little mushroom homes. Spacious scenes
                and more detailed garden corners offer different ways to enjoy a creative break.
              </p>
              <p>
                This 8.5 × 8.5-inch paperback includes black-and-white artwork,
                blank reverse pages, and a color-swatch page. If using markers,
                place a protective sheet behind the page; blank backs do not prevent bleed-through.
              </p>
            </div>
            <a href="https://link.amazon/B06jTi3ms" rel="sponsored"
              className={`mt-6 min-h-[44px] ${buttonPrimary}`}>
              Buy on Amazon
            </a>
            <p className={`mt-3 ${caption}`}>
              As an Amazon Associate I earn from qualifying purchases.
            </p>
          </div>
        </section>
  );
}
