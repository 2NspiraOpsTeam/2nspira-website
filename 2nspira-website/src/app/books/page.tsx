import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import LittleHauntsCard from "@/components/books/LittleHauntsCard";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  buttonPrimary,
  card,
  caption,
  h2,
  lead,
  linkInline,
  pageMain,
  pageHero,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Books | Leadership & Creative Coloring",
  description:
    "Explore Trust Is the Operating System by Jeffrey Cortez and Little Haunts & Happy Plants, a cozy garden coloring book from 2Nspira Books.",
  alternates: { canonical: "/books" },
  openGraph: { type: "website", siteName: "2Nspira", title: "Make room for reflection and creativity", description: "Discover Trust Is the Operating System and Little Haunts & Happy Plants: leadership reading and cozy garden coloring for adults and teens.", url: "https://2nspira.com/books", images: [{ url: "https://2nspira.com/images/logo/og-image-v2.png", width: 1200, height: 630, alt: "2Nspira" }] },
  twitter: { card: "summary_large_image", title: "Make room for reflection and creativity", description: "Discover Trust Is the Operating System and Little Haunts & Happy Plants: leadership reading and cozy garden coloring for adults and teens.", images: ["https://2nspira.com/images/logo/og-image-v2.png"] },
};

export default function BooksPage() {
  return (
    <main className={pageMain} id="main-content">
      <header className={`${pageHero} relative overflow-hidden text-center`}>
        <AmbientField />
        <div className="relative">
        <p><EyebrowPill>From 2Nspira</EyebrowPill></p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Books for reflection &amp; creativity
        </h1>
        <p className={`mx-auto max-w-2xl ${lead}`}>
          Thoughtful reading and cozy coloring. Explore ideas about leadership,
          or make a little space for your own creativity.
        </p></div>
      </header>

      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-20 sm:px-6">
        <Reveal><section
          className={`grid gap-10 p-6 sm:p-10 md:grid-cols-[1fr_2fr] ${card}`}
          aria-labelledby="book-title"
        >
          <Image
            src="/images/books/trust-is-the-operating-system.jpg"
            alt="Cover of Trust Is the Operating System by Jeffrey Cortez"
            width={1600}
            height={2560}
            unoptimized
            className="mx-auto h-auto w-full max-w-xs rounded-xl shadow-[0_18px_45px_rgba(35,41,54,0.16)] transition-transform duration-500 ease-gentle hover:-translate-y-1"
          />
          <div>
            <h2 id="book-title" className={h2}>
              Trust Is the Operating System
            </h2>
            <p className="mt-4 text-sm font-medium text-accent">Paperback &amp; Kindle editions</p>
            <div className="mt-6 space-y-4 leading-8 text-body">
              <p>Most organizations aren&rsquo;t failing. They&rsquo;re functioning.</p>
              <p>
                Systems run. Dashboards glow green. AI optimizes faster than
                judgment can keep up. And yet, something feels increasingly
                fragile.
              </p>
              <p>
                This book examines leadership in an AI-saturated world where
                efficiency has quietly replaced coherence—and trust has become
                invisible infrastructure.
              </p>
              <p>
                Written by a technology executive and educator, it explores why
                capable teams hesitate long before performance declines, why
                optimization creates fragility rather than scale, and what
                leaders must protect as automation increases.
              </p>
            </div>
            <a
              href="https://amzn.to/4sVBcuF"
              rel="sponsored"
              className={`mt-6 min-h-[44px] ${buttonPrimary}`}
            >
              Buy on Amazon
            </a>
            <p className={`mt-3 ${caption}`}>
              As an Amazon Associate I earn from qualifying purchases.
            </p>
            <Link
              href="/blog/categories/trust-is-the-operating-system"
              className={`mt-4 ${linkInline}`}
            >
              Read selected excerpts →
            </Link>
          </div>
        </section></Reveal>

        <Reveal><LittleHauntsCard /></Reveal>

        <Reveal><section
          className={`p-6 sm:p-10 ${card}`}
          aria-labelledby="audio-title"
        >
          <AccentRule className="mb-6" />
          <h2 id="audio-title" className={h2}>
            When Systems Work, Trust Weakens
          </h2>
          <p className="mt-3 text-body">
            A 13-minute conversation on leadership, AI, and judgment.
          </p>
          <audio
            controls
            preload="none"
            aria-label="When Systems Work, Trust Weakens"
            className="mt-6 w-full"
          >
            <source src="/audio/when-systems-work-trust-weakens.mp3" type="audio/mpeg" />
            <a href="/audio/when-systems-work-trust-weakens.mp3">
              Listen to the audio
            </a>
          </audio>
        </section></Reveal>

        <Reveal><section
          className={`grid gap-8 p-6 sm:p-10 md:grid-cols-2 ${card}`}
          aria-labelledby="reading-title"
        >
          <Image
            src="/images/pages/books-reading.webp"
            alt="Conceptual visualization of an open book and tea beside a soft window."
            width={1344}
            height={768}
            className="h-auto w-full rounded-xl transition-transform duration-700 ease-gentle hover:scale-[1.015]"
          />
          <div className="self-center">
            <p><EyebrowPill>The practice of reading</EyebrowPill></p>
            <h2 id="reading-title" className="mt-4 text-3xl font-semibold tracking-tight text-ink">
              Ideas that stay with you
            </h2>
            <p className="mt-6 leading-8 text-body">
              Make room for thoughtful ideas, a creative pause, and a little
              inspiration. Each book offers a different way to slow down and engage.
            </p>
          </div>
        </section></Reveal>
      </div>
    </main>
  );
}
