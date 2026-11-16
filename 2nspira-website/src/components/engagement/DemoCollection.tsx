"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { demos, PROPERTY_DEMO_URL } from "@/lib/demos";
import { buttonPrimary, eyebrow } from "@/components/ui";
import styles from "./engagement.module.css";
const experiences = [
  {
    slug: "education",
    category: "Education",
    title: "More room for the moments that matter.",
    text: "From a family’s first application to a teacher’s published feedback. One connected learning journey.",
    image: "education-workspace",
    alt: "Learning Grove school family overview with classroom learning and published feedback.",
    url: demos.education.url,
    steps: "Admissions → Classroom → Family",
  },
  {
    slug: "manufacturing",
    category: "Manufacturing",
    title: "Keep work moving. Keep everyone in the picture.",
    text: "See the shortage. Move the order. Clear the quality gate. Follow the handoffs across a fictional factory.",
    image: "manufacturing-workspace",
    alt: "Northstar manufacturing command center with production cells and material alerts.",
    url: demos.manufacturing.url,
    steps: "Materials → Production → Quality",
  },
  {
    slug: "property-management",
    category: "Property management",
    title: "A better day for your office. And your residents.",
    text: "Connect rent records, repairs and updates. See the same handoff from the office and resident sides.",
    image: "property-workspace",
    alt: "Harborstone property office showing portfolio balances and maintenance activity.",
    url: PROPERTY_DEMO_URL,
    steps: "Portfolio → Office → Resident",
  },
];
export default function DemoCollection() {
const [active,setActive]=useState("All");
return <><div className={styles.filters} role="group" aria-label="Choose a demo industry">{["All", ...experiences.map(d=>d.category)].map(category=><button key={category} type="button" aria-pressed={active===category} onClick={()=>setActive(category)}>{category}</button>)}</div><p className="sr-only" role="status">{active === "All" ? "Showing all 3 industry demos" : `Showing ${active} demo`}</p>        <div className="mt-10 space-y-8">
          {experiences.filter(d => active === "All" || d.category === active).map(d => (
            <article
              key={d.slug}
              className="demo-story-card grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-2"
            >
              <Link
                href={`/demos/${d.slug}`}
                className={`block min-w-0 border-b border-line p-4 focus-visible:outline-2 focus-visible:outline-accent sm:p-6 lg:border-b-0 ${({education:"bg-[#e4eef8]",manufacturing:"bg-[#e0eee6]","property-management":"bg-[#e5eaf2]"})[d.slug]}`}
                aria-label={`Discover the ${d.category} experience`}
              >
                <Image
                  src={`/images/demos/${d.image}.webp`}
                  alt={d.alt}
                  width={1440}
                  height={1000}
                  sizes="(max-width:1024px) 100vw, 560px"
                  unoptimized
                  className="h-auto w-full rounded-xl border border-line shadow-sm"
                />
              </Link>
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <p className={eyebrow}>{d.category}</p>
                <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-ink sm:text-3xl">
                  {d.title}
                </h3>
                <p className="mt-4 leading-7 text-body">{d.text}</p>
                <p className="mt-5 text-xs font-semibold tracking-wide text-accent">
                  {d.steps}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link href={`/demos/${d.slug}`} className={buttonPrimary}>
                    Discover the experience{" "}
                    <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                  </Link>
                  <a
                    href={d.url}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
                  >
                    Launch workspace ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
</>;
}
