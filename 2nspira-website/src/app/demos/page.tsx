import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DemoHero from "@/components/demos/DemoHero";
import DemoTrust from "@/components/demos/DemoTrust";
import DemoSchema from "@/components/demos/DemoSchema";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { demos, PROPERTY_DEMO_URL } from "@/lib/demos";
import { buttonPrimary, eyebrow, h2, pageMain } from "@/components/ui";
const description =
  "Explore interactive school, manufacturing and property management software demos. See connected workflows, clearer handoffs and practical possibilities with 2Nspira.";
export const metadata = publicPageMetadata({
  title: "Interactive Software Demos | Schools, Manufacturing & Property",
  shareTitle: "Less friction. More possibility. See connected work in action.",
  description,
  path: "/demos",
  image: "/images/demos/manufacturing-workspace.webp",
});
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
export default function Demos() {
  return (
    <main className={pageMain}>
      <DemoSchema
        path="/demos"
        title="Interactive software demos"
        description={description}
        image="/images/demos/manufacturing-workspace.webp"
      />
      <DemoHero
        overview
        category="The 2Nspira interactive collection"
        title="Less friction. More possibility."
        text="Imagine your people spending less time chasing information—and more time moving things forward. Step inside connected experiences built around the work that matters."
        image="/images/demos/manufacturing-workspace.webp"
        alt="Actual Northstar demo workspace with a connected view of production, materials and quality."
        href="#experiences"
        steps={[
          "Choose your world",
          "Follow a real workflow",
          "Imagine your next step",
        ]}
      />
      <section
        id="experiences"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      >
        <p className={eyebrow}>Choose your world</p>
        <h2 className={`mt-4 max-w-3xl ${h2}`}>
          Different industries.
          <br />
          The same possibility: better-connected work.
        </h2>
        <div className="mt-10 space-y-8">
          {experiences.map((d, i) => (
            <article
              key={d.slug}
              className="demo-story-card grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-2"
            >
              <Link
                href={`/demos/${d.slug}`}
                className={`block min-w-0 border-b border-line p-4 focus-visible:outline-2 focus-visible:outline-accent sm:p-6 lg:border-b-0 ${["bg-[#eee7f6]", "bg-[#e0eee6]", "bg-[#f0e9da]"][i]}`}
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
      </section>
      <DemoTrust />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <details className="rounded-2xl border border-line p-6">
          <summary className="min-h-11 cursor-pointer font-medium text-ink">
            About these interactive experiences
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-body">
            Fictional organizations and sample data, not client deployments or
            measured client outcomes. Actions are simulated in your browser tab;
            no real payments, messages, purchasing or shipments. Confirm Reset
            demo to restore the examples. Do not enter personal information.
            Explore{" "}
            <Link href="/work" className="text-accent underline">
              our project work
            </Link>{" "}
            for implementation examples.
          </p>
        </details>
      </section>
    </main>
  );
}
