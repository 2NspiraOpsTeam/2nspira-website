import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  buttonPrimary,
  card,
  caption,
  eyebrow,
  h2,
  lead,
  linkInline,
  pageMain,
  pageHero,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "From the Author | Books & Visual Essays",
  description:
    "Explore Trust Is the Operating System, leadership reflections, audio, and visual essays by Jeffrey Cortez.",
  alternates: { canonical: "/books" },
};

export default function BooksPage() {
  return (
    <main className={pageMain} id="main-content">
      <header className={pageHero}>
        <p className={eyebrow}>From the author</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Leadership Books &amp; Visual Essays
        </h1>
        <p className={lead}>
          Explore clarity, restraint, and leadership through different mediums.
          Each piece is an invitation to think about how trust, judgment, and
          meaning shape modern organizations.
        </p>
      </header>

      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-20 sm:px-6">
        <section
          className={`grid gap-10 p-6 sm:p-10 md:grid-cols-[1fr_2fr] ${card}`}
          aria-labelledby="book-title"
        >
          <Image
            src="/images/books/trust-is-the-operating-system.jpg"
            alt="Cover of Trust Is the Operating System by Jeffrey Cortez"
            width={1600}
            height={2560}
            unoptimized
            className="mx-auto h-auto w-full max-w-xs rounded-xl"
          />
          <div>
            <h2 id="book-title" className={h2}>
              Trust Is the Operating System
            </h2>
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
              className={`mt-6 ${buttonPrimary}`}
            >
              View the book on Amazon →
            </a>
            <p className={`mt-3 ${caption}`}>
              Supporting affiliate link. Proceeds help sustain independent
              publishing and research.
            </p>
            <Link
              href="/blog/categories/trust-is-the-operating-system"
              className={`mt-4 ${linkInline}`}
            >
              Read selected excerpts →
            </Link>
          </div>
        </section>

        <section
          className={`p-6 sm:p-10 ${card}`}
          aria-labelledby="audio-title"
        >
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
        </section>

        <section
          className={`grid gap-8 p-6 sm:p-10 md:grid-cols-2 ${card}`}
          aria-labelledby="print-title"
        >
          <Image
            src="/images/books/reduce-the-noise.png"
            alt="Reduce the Noise. Strengthen the Signal. — visual essay print"
            width={1014}
            height={1522}
            unoptimized
            className="mx-auto h-auto w-full max-w-xs rounded-xl"
          />
          <div className="self-center">
            <p className={eyebrow}>Visual essays</p>
            <h2 id="print-title" className="mt-4 text-3xl font-semibold tracking-tight text-ink">
              Reduce the Noise. Strengthen the Signal.
            </h2>
            <p className="mt-6 leading-8 text-body">
              A visual meditation on clarity, focus, and leadership in an
              increasingly noisy world.
            </p>
            <a
              href="https://2nspira.etsy.com/listing/4437231821/reduce-the-noise-strengthen-the-signal"
              className={`mt-6 ${linkInline}`}
            >
              View the print on Etsy →
            </a>
          </div>
        </section>

        <section
          className={`grid gap-8 p-6 sm:p-10 md:grid-cols-2 ${card}`}
          aria-labelledby="reading-title"
        >
          <Image
            src="/images/pages/books-reading.webp"
            alt="Conceptual visualization of an open book and tea beside a soft window."
            width={1344}
            height={768}
            className="h-auto w-full rounded-xl"
          />
          <div className="self-center">
            <p className={eyebrow}>The practice of reading</p>
            <h2 id="reading-title" className="mt-4 text-3xl font-semibold tracking-tight text-ink">
              Ideas that stay with you
            </h2>
            <p className="mt-6 leading-8 text-body">
              Each book and essay in this collection is an invitation to slow
              down and think clearly — the same quiet discipline that trusted,
              human-centered leadership requires.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
