import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PanelsTopLeft, Workflow, Cable, SearchCheck } from "lucide-react";
import ServiceEffects from "@/components/ServiceEffects";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceFit from "@/components/ServiceFit";
import ServiceQuestions from "@/components/ServiceQuestions";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { card, cardFlat, eyebrow, h2, h3, lead, linkInline, pageMain, section, sectionBand } from "@/components/ui";

const description = "Website design that helps customers understand your business and take action. Explore accessible websites, business system integrations, and scoped ongoing support.";
export const metadata: Metadata = publicPageMetadata({ title: "Website Design & Business System Integration", shareTitle: "A better website. A more connected business.", description, path: "/websites" });

type ShowcaseSite = {
  name: string;
  url: string;
  tag: string;
  description: string;
  scope: string[];
};

const showcase: ShowcaseSite[] = [
  {
    name: "2Nspira",
    url: "https://2nspira.com",
    tag: "Services & advisory",
    description:
      "Technology leadership, AI readiness, insights, and practical assessment tools in one clear digital home.",
    scope: ["Advisory platform", "Resource library", "Assessment tools"],
  },
  {
    name: "CalmLoop",
    url: "https://calmloop.vercel.app",
    tag: "Consumer web app",
    description:
      "A low-pressure companion offering gentle routine ideas for neurodivergent children and their families.",
    scope: ["Family-focused UX", "Sensory-aware design", "Web app"],
  },
  {
    name: "Breadcrumb",
    url: "https://breadcrumb-challenge.vercel.app",
    tag: "Interactive experience",
    description:
      "A fast OSINT challenge game engineered to run anywhere without a server or database.",
    scope: ["Interactive game", "Zero-infrastructure", "Fast delivery"],
  },
  {
    name: "GeVitals",
    url: "https://gevitals.com",
    tag: "Bilingual professional site",
    description:
      "A bilingual clinic website combining migrated content, video, publishing, and local discovery.",
    scope: ["Bilingual experience", "Content migration", "Local SEO"],
  },
  {
    name: "Open Goal Soccer",
    url: "https://opengoalsoccer.com",
    tag: "Mission-driven archival site",
    description:
      "An accessible digital archive preserving an inclusive youth soccer program’s mission and community story.",
    scope: ["Archival redesign", "Content preservation", "Accessibility"],
  },
];


const websiteQuestions = [
  { question: "Do I need a complex platform, or can we start with a website?", answer: "We can start with a clear website. Portals, payments, automation, and AI are options only when they serve a real need and are included in the agreed scope. You do not need to build everything at once." },
  { question: "Can you improve an existing website?", answer: "We review the existing site, content, tools, and customer journey before recommending what to keep, improve, connect, or replace. Migration requirements and platform constraints are considered when defining the work." },
  { question: "Who provides the content and access?", answer: "We agree content responsibilities and the access needed to your domain, hosting, and existing systems before work begins. Bring your current website, examples, and priorities to the introductory conversation; you do not need a finished technical brief." },
  { question: "What about cost, hosting, and support after launch?", answer: "Project scope, hosting, third-party charges, handover, and any ongoing support are discussed and agreed before work begins. Integrations and ongoing changes are not automatically included in every website engagement. We define the support you need and how it will work." },
];

export default function WebsitesPage() {
  return <main id="main-content" className={pageMain}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "Service", "@id": "https://2nspira.com/websites#service",
      name: "Websites & Digital Platforms", serviceType: ["Website design", "Business system integration"], description,
      url: "https://2nspira.com/websites", provider: { "@id": "https://2nspira.com/#organization" }, areaServed: "Worldwide",
    }).replace(/</g, "\\u003c") }} />
    <ServiceEffects>
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <AmbientField />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div>
          <EyebrowPill>Websites &amp; Digital Platforms</EyebrowPill>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">A better website. A more connected business.</h1>
          <p className={lead}>A professional website should not leave your team managing every inquiry by hand. We build clear, accessible digital experiences and, where needed, connect them to internal systems and operational workflows that support growth.</p>
          <ServiceConversation label="Discuss your website project" />
          <a href="#our-work" className={`mt-4 min-h-11 ${linkInline}`}>See selected work <span aria-hidden="true"> ↓</span></a>
        </div>
        <figure data-catalog-fade className="overflow-hidden rounded-[2rem] border border-line shadow-soft">
          <Image src="/images/pages/websites-hero.webp" alt="Illustrative view of a customer website and connected business dashboard." width={1536} height={1024} sizes="(min-width: 1024px) 560px, 100vw" className="h-auto w-full" priority />
          <figcaption className="bg-canvas px-5 py-3 text-sm leading-6 text-muted">A website can be the starting point. Connections come where they add value. Illustrative scene.</figcaption>
        </figure>
      </div>
    </section>
    <ServiceFit title="A website for the stage you’re at." intro="You don’t have to know the technology. Start with what your customers need to do and what your business needs next." items={[
      { title: "You’re launching or refreshing", text: "You need a clear offer, useful content, and a credible place to send prospective customers." },
      { title: "Inquiries need a better handoff", text: "Your site collects interest, but the next step involves disconnected forms, spreadsheets, or manual follow-up." },
      { title: "Your business is outgrowing the site", text: "You’re considering a portal, payments, or a customer-facing application and need to decide what is worth building." },
    ]} />
    <section className={section} aria-labelledby="website-help-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 data-catalog-reveal id="website-help-heading" className={h2}>Make the next step easier for your customers.</h2>
        <p className={`max-w-3xl ${lead}`}>A useful website answers the visitor’s questions and supports the journey that follows. We agree the deliverables around your audience, priorities, and existing tools.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { icon: PanelsTopLeft, title: "An offer people understand", text: "Clear page structure, navigation, and content that explain who you help and how to get started." },
            { icon: SearchCheck, title: "A usable, discoverable experience", text: "Responsive layouts, accessibility, performance, and technical search foundations—not promises of rankings or traffic." },
            { icon: Workflow, title: "A clear inquiry journey", text: "Help customers contact you or book a conversation, with intake and the agreed next step made clear." },
            { icon: Cable, title: "Connections that serve the business", text: "Where needed, scope the integrations that move information into the systems and processes your team uses." },
          ].map(({ icon: Icon, title, text }) => <article key={title} data-catalog-card data-service-card className={`p-7 ${card}`}>
            <span data-service-icon><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span><h3 className={h3}>{title}</h3><p className="mt-4 leading-7 text-body">{text}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section id="platform-model" className={`${sectionBand} scroll-mt-24`} aria-labelledby="platform-model-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Website first. Connections where they matter.</p>
        <h2 data-catalog-reveal id="platform-model-heading" className={`mt-4 ${h2}`}>Start with the useful part. Build from there.</h2>
        <p className={`max-w-3xl ${lead}`}>A website does not need every feature. We help you decide what to build, buy, connect, or defer. Integrations, portals, payments, automation, and AI are separately scoped around a real business need.</p>
        <ol className="mt-10 grid gap-4 md:grid-cols-3" aria-label="Illustrative inquiry workflow">
          {[
            ["01", "A customer takes action", "An inquiry or booking starts on your website."],
            ["02", "The right context follows", "An agreed integration passes relevant information to your business tools."],
            ["03", "Your team knows what’s next", "A defined handoff makes responsibility and follow-up clear."],
          ].map(([number, title, text]) => <li key={number} className={`p-6 ${cardFlat}`}><p className="text-sm font-semibold text-accent">{number}</p><h3 className={`mt-4 ${h3}`}>{title}</h3><p className="mt-3 leading-7 text-body">{text}</p></li>)}
        </ol>
        <p className="mt-4 text-sm leading-7 text-muted">Illustrative workflow. Connections are selected and scoped around your business.</p>
        <div className="mt-6 flex flex-wrap gap-6"><Link href="/automation-systems-optimization" className={`min-h-11 ${linkInline}`}>Explore systems integration →</Link><Link href="/ai-enablement" className={`min-h-11 ${linkInline}`}>Explore responsible AI →</Link></div>
      </div>
    </section>
    <section id="our-work" className={`${section} scroll-mt-24`} aria-labelledby="selected-work-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 data-catalog-reveal id="selected-work-heading" className={h2}>See the work, not just the promise.</h2>
        <p className={`max-w-3xl ${lead}`}>Different organizations need different things. Explore the live sites and the work behind them.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { name: "GeVitals", image: "gevitals", need: "Help a clinic present its services in two languages.", scope: "Bilingual website, content migration, video, publishing, and local discovery.", url: "https://gevitals.com/" },
            { name: "Open Goal Soccer", image: "open-goal", need: "Keep a community program’s mission and history accessible.", scope: "An archival redesign preserving content and an inclusive youth soccer story.", url: "https://opengoalsoccer.com/" },
          ].map(site => <article key={site.name} data-catalog-card className={`overflow-hidden ${card}`}>
            <Image src={`/images/pages/${site.image}-website-preview-20261021.jpg`} alt={`${site.name} public website preview`} width={1440} height={1000} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full border-b border-line" />
            <div className="p-6 sm:p-8"><p className="text-sm font-semibold text-accent">Published website</p><h3 className={`mt-3 ${h3}`}>{site.name}</h3><p className="mt-4 leading-7 text-body"><strong className="font-medium text-ink">The need: </strong>{site.need}</p><p className="mt-3 leading-7 text-body"><strong className="font-medium text-ink">The work: </strong>{site.scope}</p><a href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${site.name} (opens in a new tab)`} className={`mt-5 min-h-11 ${linkInline}`}>Visit {site.name} <span aria-hidden="true"> ↗</span></a></div>
          </article>)}
        </div>
        <details className={`mt-8 px-6 py-2 ${cardFlat}`}><summary className="cursor-pointer rounded py-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-accent">More published digital experiences</summary>
          <div className="grid gap-6 border-t border-line py-6 md:grid-cols-3">{showcase.filter(site => !["GeVitals", "Open Goal Soccer"].includes(site.name)).map(site => <article key={site.name}><p className="text-sm text-accent">{site.tag}</p><h3 className={`mt-3 ${h3}`}>{site.name}</h3><p className="mt-3 leading-7 text-body">{site.description}</p><a href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${site.name} (opens in a new tab)`} className={`mt-4 min-h-11 ${linkInline}`}>Visit {site.name} ↗</a></article>)}</div>
        </details>
        <aside className={`mt-8 p-6 ${cardFlat}`}><h3 className={h3}>Beyond the website</h3><p className="mt-3 leading-7 text-body">Our broader work includes operational initiatives such as Water Bear Mecca’s phased property-operations modernization and a manufacturing operations command center. Explore the scope and status of those initiatives separately from the published websites above.</p><Link href="/work" className={`mt-4 min-h-11 ${linkInline}`}>Explore operational initiatives →</Link></aside>
      </div>
    </section>
    <section className={sectionBand} aria-labelledby="website-process-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6"><h2 data-catalog-reveal id="website-process-heading" className={h2}>A clear process. A scope you understand.</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[
          ["Understand", "Clarify your customers, goals, existing website, tools, and constraints."],
          ["Agree the scope", "Define deliverables, responsibilities, integrations, costs, and a practical sequence of work."],
          ["Design, build, test", "Develop the agreed experience and check the real journeys on desktop and mobile."],
          ["Launch and hand over", "Agree the launch and handover, and define any ongoing support or future work separately."],
        ].map(([title, text], index) => <li key={title} data-catalog-card className={`p-6 ${cardFlat}`}><p className="text-sm font-semibold text-accent">0{index + 1}</p><h3 className={`mt-4 ${h3}`}>{title}</h3><p className="mt-3 leading-7 text-body">{text}</p></li>)}</ol>
      </div>
    </section>
    <ServiceQuestions items={websiteQuestions} />
    <section className={sectionBand} aria-labelledby="website-cta-heading"><div className="mx-auto max-w-3xl px-4 text-center sm:px-6"><h2 data-catalog-reveal id="website-cta-heading" className={h2}>What should your website make easier?</h2><p className={lead}>Bring your current site, a new idea, or a customer journey that isn’t working. We’ll discuss what matters now and the simplest useful next step.</p><ServiceConversation label="Discuss your website project" centered /></div></section>
    </ServiceEffects>
  </main>;
}
