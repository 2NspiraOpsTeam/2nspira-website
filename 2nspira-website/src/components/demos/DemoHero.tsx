import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { buttonPrimary, buttonSecondary, eyebrow, h1 } from "@/components/ui";

export default function DemoHero({
  category,
  title,
  text,
  image,
  alt,
  href,
  steps,
  overview = false,
}: {
  category: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  href: string;
  steps: string[];
  overview?: boolean;
}) {
  return (
    <section className="demo-hero relative overflow-hidden border-b border-line">
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        {!overview && (
          <Link
            href="/demos"
            className="inline-flex min-h-11 items-center text-sm font-medium text-accent"
          >
            ← All demos
          </Link>
        )}
        <div className="grid items-center gap-10 py-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-10">
          <div className="demo-arrive min-w-0">
            <p className={eyebrow}>{category}</p>
            <h1 className={`${h1} max-w-2xl`}>{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-body">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={href} className={buttonPrimary}>
                {overview ? "Find your experience" : "Explore the workspace"}
                {overview ? (
                  <ArrowRight aria-hidden="true" size={17} className="ml-2" />
                ) : (
                  <ArrowUpRight aria-hidden="true" size={17} className="ml-2" />
                )}
              </a>
              <a
                href={overview ? "#how-we-build" : "#walkthrough"}
                className={buttonSecondary}
              >
                {overview ? "Our approach" : "See how it connects"}
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Interactive experiences · No sign-up · Fictional data
            </p>
          </div>
          <div className="demo-arrive demo-preview min-w-0">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span
                className="h-2 w-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              {overview
                ? "Real screens. Working journeys."
                : "Inside the experience"}
            </div>
            <a
              href={overview ? "#experiences" : href}
              className="demo-screen block overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-3"
              aria-label={
                overview
                  ? "Choose an interactive experience"
                  : `Open the ${category} experience`
              }
            >
              <div
                aria-hidden="true"
                className="flex gap-1.5 border-b border-line px-2 pb-3 pt-1"
              >
                <span className="h-2 w-2 rounded-full bg-[#c9d5e5]" />
                <span className="h-2 w-2 rounded-full bg-[#dce4db]" />
                <span className="h-2 w-2 rounded-full bg-[#e8dfce]" />
              </div>
              <Image
                src={image}
                alt={alt}
                width={1440}
                height={1000}
                sizes="(max-width:1024px) 100vw, 650px"
                unoptimized
                loading="eager"
                className="h-auto w-full rounded-b-xl"
              />
            </a>
            <ol className="mt-5 grid grid-cols-3 gap-2">
              {steps.map((step, i) => (
                <li
                  key={step}
                  className="rounded-xl border border-line bg-white/80 px-3 py-3 text-xs leading-5 text-body"
                >
                  <span className="mb-1 block font-semibold text-accent">
                    0{i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-body">
          {[
            "Explore before you commit",
            "Follow the handoffs",
            "See the result yourself",
          ].map((text) => (
            <span key={text} className="flex items-center gap-2">
              <Check aria-hidden="true" size={16} className="text-accent" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
