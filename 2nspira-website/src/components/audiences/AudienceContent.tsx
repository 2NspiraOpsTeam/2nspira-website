import { audienceImagery } from "@/lib/audiences/imagery";
import { audienceRoutes } from "@/lib/audiences/routes";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import PlatformCarousel from "@/components/platforms/PlatformCarousel";
import { clientLogos } from "@/lib/audiences/clients";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Factory,
  Building2,
  BriefcaseBusiness,
  HeartHandshake,
  ShoppingBag,
  Clapperboard,
  Plus,
} from "lucide-react";
import type { Content } from "@/lib/audiences/model";
import { BOOKING_URL } from "@/lib/booking";
import { buttonPrimary, eyebrow, h1, h2 } from "@/components/ui";
const icons = [
  GraduationCap,
  Factory,
  Building2,
  BriefcaseBusiness,
  HeartHandshake,
  ShoppingBag,
  Clapperboard,
  Plus,
];
export default function AudienceContent({ content: c }: { content: Content }) {
  return (
    <CatalogEffects headings>
    <main id="main-content" className="flex-1 bg-canvas">
      <section className="border-b border-line bg-canvas-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className={eyebrow}>Business transformation, built around you</p>
          <h1 className={`${h1} max-w-4xl`}>{c.heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-body">
            {c.intro}
          </p>
          <nav aria-label="Explore audiences" className="mt-7 flex flex-wrap gap-3">
            {c.industries.filter(i => i.visible).map(i => <a key={i.id} href={i.page && audienceRoutes[i.id] ? audienceRoutes[i.id] : `#industry-${i.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-accent">{i.title}<ArrowRight size={15} aria-hidden="true" /></a>)}
          </nav>
          <div id="our-clients" className="mt-10 scroll-mt-24 border-t border-line pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-ink">Our clients</h2>
            <PlatformCarousel
              platforms={clientLogos}
              description="A selection of the organizations we serve."
              label="Client logos"
              listLabel="Our clients"
              notice="Names and logos belong to their respective owners. Inclusion identifies client relationships, not endorsement."
            />
          </div>
          <a
            href="#industries"
            className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4"
          >
            Find your organization <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>
      <section
        id="industries"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
      >
        <p className={eyebrow}>Your work. Your next possibility.</p>
        <h2 className={`${h2} mt-4 max-w-3xl`}>
          Practical technology for everyday challenges.
        </h2>
        <p className="mt-5 max-w-3xl leading-7 text-body">
          Find your everyday challenges. Explore what a more connected way of working could look like.
        </p>
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {c.industries
            .filter((i) => i.visible)
            .map((i, n) => {
              const Icon = icons[n % icons.length];
              return (
                <article
                  key={i.id}
                  id={`industry-${i.id}`}
                  data-catalog-card
                  className="group flex min-w-0 scroll-mt-28 flex-col rounded-3xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-lg motion-reduce:transition-none sm:p-8"
                >
                  {audienceImagery[i.id] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={`${audienceImagery[i.id].src}-640.webp`} srcSet={`${audienceImagery[i.id].src}-640.webp 640w, ${audienceImagery[i.id].src}-1280.webp 1280w`} sizes="(min-width: 1280px) 340px, (min-width: 768px) 45vw, 90vw" alt={audienceImagery[i.id].alt} width={640} height={427} loading="lazy" className="mb-6 aspect-[3/2] w-full rounded-2xl object-cover" />
                  ) : <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Icon aria-hidden="true" size={25} />
                  </span>}
                  <h3 className="text-2xl font-medium tracking-tight text-ink">
                    {i.title}
                  </h3>
                  <p className="mt-4 leading-7 text-body">{i.challenges}</p>
                  <details className="group/details my-5 border-y border-line">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-sm py-3 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                      Explore the possibilities <span className="sr-only">for {i.title}</span>
                      <Plus aria-hidden="true" size={18} className="shrink-0 transition-transform group-open/details:rotate-45 motion-reduce:transition-none" />
                    </summary>
                  <h4 className="mt-3 text-sm font-semibold text-ink">
                    How we can help
                  </h4>
                  <p className="mt-2 leading-7 text-body">{i.help}</p>
                  <div className="my-6 rounded-2xl bg-canvas-deep p-5">
                    <h4 className="text-sm font-semibold text-ink">
                      What better can look like
                    </h4>
                    <p className="mt-2 leading-7 text-body">{i.outcomes}</p>
                  </div>
                  <p className="mb-5 text-xs leading-5 text-muted">Illustrative possibilities, not guaranteed results or a description of any specific client engagement.</p>
                  </details>
                  <div className="mt-auto space-y-2">
                    {i.href && (
                      <Link
                        href={i.page && audienceRoutes[i.id] ? audienceRoutes[i.id] : i.href}
                        className="inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4"
                      >
                        {i.linkLabel}
                        <ArrowRight aria-hidden="true" size={17} />
                      </Link>
                    )}
                    {i.exampleHref && (
                      <p>
                        <Link
                          href={i.exampleHref}
                          className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4"
                        >
                          {i.exampleLabel}
                        </Link>
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <div className="rounded-3xl border border-line bg-accent-soft p-8 sm:p-12">
          <p className={eyebrow}>Start with your business, not a tool</p>
          <h2 className={`${h2} mt-4 max-w-3xl`}>
            What would make work easier for your people?
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-body">
            Tell us where work slows down. Let’s find a practical next step together.
          </p>
          <a href={BOOKING_URL} className={`${buttonPrimary} mt-7`}>
            Let’s discuss your business{" "}
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
    </CatalogEffects>
  );
}
