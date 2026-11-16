import InvoiceDemoFeature from "@/components/demos/InvoiceDemoFeature";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DemoHero from "@/components/demos/DemoHero";
import DemoTrust from "@/components/demos/DemoTrust";
import DemoSchema from "@/components/demos/DemoSchema";
import { publicPageMetadata } from "@/lib/pageMetadata";
import DemoCollection from "@/components/engagement/DemoCollection";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import engagement from "@/components/engagement/engagement.module.css";
import { buttonPrimary, eyebrow, h2, pageMain } from "@/components/ui";
const description =
  "Explore AI invoice workflows and interactive school, manufacturing and property management software demos. See connected workflows, clearer handoffs and practical possibilities with 2Nspira.";
export const metadata = publicPageMetadata({
  title: "Interactive Software & AI Invoice Workflow Demos",
  shareTitle: "Less friction. More possibility. See connected work in action.",
  description,
  path: "/demos",
  image: "/images/demos/manufacturing-workspace.webp",
});
export default function Demos() {
  return (
    <main id="main-content" tabIndex={-1} className={pageMain}><CatalogEffects headings>
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
      <InvoiceDemoFeature editorial />
      <section className={engagement.chapter} aria-labelledby="demo-connection-heading"><div className={engagement.chapterInner}><Image src="/images/hero/ai-human-led-v3.webp" alt="Illustrative team exploring connected digital workflows together." width={1536} height={1024} sizes="(min-width:768px) 576px, 100vw" unoptimized className={engagement.chapterImage} /><div className={engagement.chapterCopy}><p className={engagement.kicker}>Don’t just read about it</p><h2 id="demo-connection-heading">Step inside.<br />Follow the connection.</h2><p>Choose a world below. Follow a handoff from one person to the next. Explore what better-connected work could feel like.</p><a href="#experiences">Choose your experience ↓</a><p className="mt-4 text-xs">Concept illustration · Fictional demo organizations</p></div></div></section>
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
        <DemoCollection />
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6"><div className="grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-2"><Image src="/images/posts/ai-agents-human-accountability-20261030.webp" alt="Concept illustration of a human supervising connected AI workspaces." width={1672} height={941} sizes="(min-width:1024px) 550px, 100vw" unoptimized className="h-full min-h-64 w-full object-cover" /><div className="p-7 sm:p-10"><p className={eyebrow}>Website AI assistant · live demonstration</p><h2 className={`mt-4 ${h2}`}>A helpful first conversation. A human next step.</h2><p className="mt-4 max-w-2xl leading-7 text-body">Explore a branded website assistant and see how a free-allowance limit leads visitors to your team. This demonstration gives real AI answers using a limited free allowance, with a contact-page handoff when the allowance is reached.</p><Link href="/chatbot-demo" className={`mt-6 ${buttonPrimary}`}>Try the AI assistant <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link></div></div></section>

      <DemoTrust />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <details className="rounded-2xl border border-line p-6">
          <summary className="min-h-11 cursor-pointer font-medium text-ink">
            About these interactive experiences
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-body">
            Fictional organizations and sample data, not client deployments or
            measured client outcomes. Existing industry-demo actions are simulated in your browser tab; the AI Operations Hub uses expiring server-side sandbox records.
            No real payments, messages, purchasing or shipments. Confirm Reset
            demo to restore the examples. Do not enter personal information.
            Explore{" "}
            <Link href="/work" className="text-accent underline">
              our project work
            </Link>{" "}
            for implementation examples.
          </p>
        </details>
      </section>
    </CatalogEffects></main>
  );
}
