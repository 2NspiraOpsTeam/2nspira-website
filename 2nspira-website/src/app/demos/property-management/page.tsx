import DemoSchema from "@/components/demos/DemoSchema";
import DemoHero from "@/components/demos/DemoHero";
import DemoTrust from "@/components/demos/DemoTrust";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { PROPERTY_DEMO_URL } from "@/lib/demos";
import { buttonPrimary, eyebrow, h2, pageMain } from "@/components/ui";
export const metadata = publicPageMetadata({
  title: "Property Management Operations Demo",
  shareTitle: "Less chasing. More taking care of people.",
  description:
    "Explore a fictional property operations workspace: properties, tenant contacts, rent rolls, simulated electronic rent collection, maintenance requests and resident communications.",
  path: "/demos/property-management",
  image: "/images/demos/property-workspace.webp",
});
const modules = [
  [
    "Properties & apartments",
    "See buildings, occupancy, apartment details, and the work that needs attention.",
    "properties",
  ],
  [
    "Rent roll & contacts",
    "Filter apartment and lease records, find fictional residents, and export the phone list.",
    "rent-roll",
  ],
  [
    "Simulated rent collection",
    "Record a partial or full demo payment and follow the balance through to a receipt.",
    "payments",
  ],
  [
    "Maintenance & communications",
    "Move a repair from resident request to completion, then publish a targeted demo notice.",
    "maintenance",
  ],
];
export default function PropertyDemoPage() {
  return (
    <main className={pageMain}>
      <DemoSchema
        path="/demos/property-management"
        title="Property Management Operations Demo"
        description="Explore connected rent records, repairs and resident updates with the Harborstone fictional portfolio."
        image="/images/demos/property-workspace.webp"
      />
      <DemoHero
        category="Property management"
        title="Less chasing. More taking care of people."
        text="A rent balance. A repair. A resident waiting for an update. Bring the office and resident experience together, so the next step is always clear."
        image="/images/demos/property-workspace.webp"
        alt="Harborstone property workspace showing rent balances, maintenance and office activity."
        href={PROPERTY_DEMO_URL}
        steps={[
          "See the portfolio",
          "Resolve the request",
          "Keep residents informed",
        ]}
      />
      <section
        id="walkthrough"
        className="scroll-mt-24 border-y border-line bg-canvas-deep py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={eyebrow}>Built for the everyday work</p>
          <h2 className={`mt-4 ${h2}`}>A connected property office.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {modules.map(([title, text, path], i) => (
              <a
                href={`${PROPERTY_DEMO_URL}${path}/`}
                key={path}
                className={`rounded-2xl border border-line p-7 focus-visible:outline-2 focus-visible:outline-accent ${["bg-[#e0f1e8]", "bg-[#fff0d9]", "bg-[#e9e5f5]", "bg-[#fff3ce]"][i]}`}
              >
                <h3 className="text-xl font-medium text-ink">
                  {title} <span aria-hidden="true">↗</span>
                </h3>
                <p className="mt-3 text-sm leading-7 text-body">{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className={eyebrow}>See both sides of the handoff</p>
          <h2 className={`mt-4 ${h2}`}>
            An office action. A resident-visible result.
          </h2>
          <p className="mt-5 leading-8 text-body">
            Start as Jamie Rowan. Simulate a rent payment and submit a repair
            request. Switch to the office to complete the work and publish a
            building notice—then see the receipt, repair status, and update in
            Jamie’s view.
          </p>
          <a
            href={`${PROPERTY_DEMO_URL}resident/`}
            className={`mt-6 ${buttonPrimary}`}
          >
            Start the connected journey{" "}
            <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </a>
        </div>
        <a
          href={`${PROPERTY_DEMO_URL}resident/`}
          className="block rounded-2xl border border-line bg-[#eee6d5] p-3 focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Explore the fictional resident experience"
        >
          <Image
            src="/images/demos/property-resident.webp"
            width={1440}
            height={1000}
            alt="Harborstone resident demo showing a fictional apartment, November rent balance, simulated payment form, and maintenance request form."
            sizes="(max-width:1024px) 100vw, 550px"
            unoptimized
            className="h-auto w-full rounded-xl"
          />
        </a>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <details className="rounded-xl border border-line p-6">
          <summary className="min-h-11 cursor-pointer font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">
            Demo scope & safe exploration
          </summary>
          <p className="mt-4 text-sm leading-7 text-body">
            Three fictional properties, eight apartments, and six residents.
            Changes are browser-tab-local; valid edits survive refresh and a
            confirmed reset restores the samples. Resident views demonstrate
            appropriate information, not production authentication. No client
            records, real documents, live bank/card processing, email, SMS,
            emergency dispatch, or accounting integrations are connected. Rent
            payments and communications are simulations. Do not enter personal
            information.
          </p>
        </details>
      </section>
      <DemoTrust />
    </main>
  );
}
