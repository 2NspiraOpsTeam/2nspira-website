import PageSections from "@/components/PageSections";
import Modernization from "./Modernization";
import DemoTrust from "@/components/demos/DemoTrust";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  AppWindow,
  Smartphone,
  CalendarDays,
  ShoppingBag,
  LayoutDashboard,
  ChartNoAxesCombined,
  Languages,
  ShieldCheck,
  MapPin,
  MousePointer2,
  ArrowRight,
  Network,
  UserRoundCheck,
} from "lucide-react";
import ServiceEffects from "@/components/ServiceEffects";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceFit from "@/components/ServiceFit";
import styles from "./websites.module.css";
import ServiceQuestions from "@/components/ServiceQuestions";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  card,
  cardFlat,
  eyebrow,
  h1,
  h2,
  h3,
  lead,
  linkInline,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

const description =
  "Modernize your website with accessible, mobile-friendly design, considered migration and easier content management. Explore websites, apps and custom operations software from 2Nspira.";
export const metadata: Metadata = publicPageMetadata({
  title: "Website Modernization, Apps & Operations Software",
  shareTitle: "Your Website Was Built for Yesterday. Let’s Build It for What’s Next.",
  description,
  path: "/websites",
});

const projects = [
  {
    id: "teams-management",
    name: "Teams Management",
    category: "Property website & operations",
    status: "Published website",
    url: "https://www.teamsmanagement.com/",
    link: "Visit Teams Management",
    image: "teams",
    need: "Connect property discovery with the information and workflows a property team manages behind the scenes.",
    work: "Property pages and media management, tenant access, maintenance workflows, and an Admin analytics workspace.",
    enables:
      "A customer-facing property experience connected to structured records and staff tools.",
    tags: [
      "Property discovery",
      "Tenant portal",
      "Backend operations",
      "Analytics",
      "Maps & directions",
    ],
    journey: [
      "Discover a property",
      "Make an inquiry",
      "Staff manage follow-up",
    ],
    behind:
      "The backend includes property and unit records, photo assignments, tenant maintenance requests, and website analytics. Private tools require authorized access; the public website is not a tenant or Admin demo.",
    note: "Public website linked. Private workflows require authorized access; no tenant records are displayed.",
  },
  {
    id: "gevitals",
    name: "GeVitals",
    category: "Multilingual service website",
    status: "Published website",
    url: "https://gevitals.com/",
    link: "Visit GeVitals",
    image: "gevitals",
    need: "Help a clinic explain its services to Spanish- and English-speaking visitors.",
    work: "A bilingual website with language switching, migrated content, video, and service pages.",
    enables:
      "Visitors can explore the clinic’s approach and find the next step in their preferred language.",
    tags: ["Language switching", "Content migration", "Local discovery"],
    journey: ["Explore services", "Choose a language", "Find contact options"],
    behind:
      "Content structure, publishing, and technical search foundations support the public experience. Moving an existing site includes preserving useful content—not simply changing its appearance.",
    note: "Public website shown. No patient information is included.",
  },
  {
    id: "2nspira",
    name: "2Nspira",
    category: "Advisory website & client services",
    status: "In-house platform",
    url: "https://2nspira.com/",
    link: "Explore 2Nspira",
    image: "2nspira",
    need: "Make it easy to understand the services, book a conversation, and support ongoing client relationships.",
    work: "Google Calendar booking links, assessment tools, a secure client portal, service management, and due-date reminders.",
    enables:
      "A clear route from exploring an offer to booking a conversation, with separate tools for ongoing service operations.",
    tags: [
      "Calendar integration",
      "Assessment tools",
      "Client portal",
      "Service reminders",
    ],
    journey: [
      "Choose a service",
      "Book a conversation",
      "Manage ongoing services",
    ],
    behind:
      "Bookings open Google Calendar rather than a custom scheduling system. Authorized staff manage client services and due dates; scheduled reminders support follow-up. Client information stays behind sign-in.",
    note: "Public website shown. Client records and private dashboards are not displayed.",
  },
  {
    id: "2nspira-books",
    name: "2Nspira Books",
    category: "Specialist bookstore ecommerce",
    status: "In-house storefront preview",
    url: "https://2nspira-books-preview.jcortez-36a.workers.dev/",
    link: "Explore the bookstore preview",
    image: "books",
    need: "Give collectors the photographs, edition details, and condition information needed to evaluate an individual book.",
    work: "A searchable catalog, actual-copy galleries, inventory and order tools, plus Stripe and PayPal checkout development.",
    enables:
      "A focused shopping experience supported by per-copy inventory and order workflows.",
    tags: ["Product catalog", "Inventory & orders", "Stripe & PayPal"],
    journey: [
      "Browse the collection",
      "Inspect an individual copy",
      "Review purchase options",
    ],
    behind:
      "Payment integrations have been exercised in test/sandbox environments. Test payments are not evidence that every collectible is available for live checkout. Inventory is managed manually across sales channels; this is not an eBay-sync integration.",
    note: "Preview project. Payment testing and live availability are separate; consult the storefront for current purchase options.",
  },
];

const capabilities = [
  {
    icon: CalendarDays,
    title: "Booking & calendars",
    text: "Help visitors choose a time and book through the scheduling tools you already use.",
    proof: "Google Calendar at 2Nspira",
    href: "#2nspira",
  },
  {
    icon: MapPin,
    title: "Google Maps & locations",
    text: "Help visitors explore locations, view property maps, and open Google Maps directions to the right address.",
    proof: "Teams property discovery",
    href: "#teams-management",
  },
  {
    icon: ShoppingBag,
    title: "Online stores",
    text: "Bring product details, photographs, checkout, inventory, and order management into one considered journey.",
    proof: "2Nspira Books · preview",
    href: "#2nspira-books",
  },
  {
    icon: ShieldCheck,
    title: "Client & tenant portals",
    text: "Give authorized users a secure place for service information, requests, and updates.",
    proof: "2Nspira & Teams workflows",
    href: "#teams-management",
  },
  {
    icon: LayoutDashboard,
    title: "Backend operations",
    text: "Equip your team to manage content, records, inquiries, notifications, and the work that follows.",
    proof: "Teams private property operations",
    href: "#teams-management",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analytics & insights",
    text: "Understand website traffic and property interest with reporting scoped to the business and its privacy needs.",
    proof: "Teams private analytics workspace",
    href: "#teams-management",
  },
  {
    icon: Languages,
    title: "Multilingual & migration",
    text: "Help people navigate in their preferred language, and preserve useful content when moving an existing site.",
    proof: "GeVitals bilingual website",
    href: "#gevitals",
  },
];

const websiteQuestions = [
  { question: "Who owns our content, and what happens if we leave?", answer: "Your agreement will define ownership, content export and handover. You retain ownership of the content you supply. Domain access, licensed assets, custom code rights, export formats and any transition assistance must be agreed before work starts; we do not promise a one-click migration to every platform." },
  { question: "Do you maintain existing WordPress installations?", answer: "Existing WordPress sites are rebuild or migration prospects, not legacy-maintenance engagements. We inventory useful content and URLs, scope redirects and integrations, and agree a tested migration rather than taking over indefinite maintenance of an existing installation." },
  { question: "Are these managed plans available to buy now?", answer: "No. This draft shows proposed pricing for internal review. CMS feasibility, service costs, usage allowances, support terms and the final offering must be validated and approved. Build work is quoted separately; no subscription is created here." },
  {
    question: "Do you build custom internal operations systems?",
    answer:
      "Yes. We scope internal applications around your team’s records, requests, approvals, reporting and handoffs. We review your existing tools and maintained platforms first, then configure or build the focused solution that fits. Data ownership, access roles, integrations, migration, testing and support are agreed before rollout.",
  },
  {
    question: "Do you develop apps as well as websites?",
    answer:
      "Yes. We scope web applications and mobile apps around a defined user need. We help choose between a browser-based experience and an iOS or Android app, then agree the first release, integrations, testing, and support. App-store submission and review are separate from development; approval is controlled by the relevant store.",
  },
  {
    question: "What does AI-native development mean?",
    answer:
      "AI is part of our development workflow, supporting exploration, implementation, and review. Human judgment remains responsible for the product, architecture, content, and release decisions. We verify the resulting experience. It does not mean every website needs a chatbot or customer-facing AI.",
  },
  {
    question: "Can we start with a simple website?",
    answer:
      "Yes. Start with a clear offer, useful content, and an easy next step. Portals, payments, integrations, automation, and AI-powered features are separately scoped when they serve a real need. You do not need everything at once.",
  },
  {
    question: "Can you improve or migrate an existing website?",
    answer:
      "We review the existing content, platform, customer journeys, and integrations before recommending what to keep, improve, connect, or replace. Language requirements, content migration, and redirects are considered in the agreed scope.",
  },
  {
    question: "Can I try the private dashboards shown in your work?",
    answer:
      "The screenshots on this page show public-facing websites, not private client records. Preview links are labeled separately from published sites. You can explore our fictional school, manufacturing and property-management demos without accessing client data. Private client and tenant accounts are never public demos.",
  },
  {
    question: "What about content, cost, hosting, and support?",
    answer:
      "We agree content responsibilities, required access, deliverables, third-party charges, hosting, and handover before work begins. Any ongoing support and future integrations are defined separately. Bring your current website and priorities; you do not need a finished technical brief.",
  },
];

export default function WebsitesPage() {
  return (
    <main id="main-content" className={pageMain}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://2nspira.com/websites#service",
            name: "Websites, Apps & Digital Platforms",
            serviceType: [
              "Website design",
              "Website redesign",
              "Website development",
              "Web application development",
              "Mobile app development",
              "Custom internal operations software",
              "Business system integration",
            ],
            description,
            url: "https://2nspira.com/websites",
            provider: { "@id": "https://2nspira.com/#organization" },
            areaServed: "Worldwide",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceEffects editorial>
        <section className="relative overflow-hidden border-b border-line bg-surface">
          <AmbientField />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <EyebrowPill>Website Modernization</EyebrowPill>
              <p className={`mt-6 ${eyebrow}`}>
                Websites · Apps · Custom operations solutions
              </p>
              <h1 className={h1}>
                Your Website Was Built for Yesterday.
                <br />Let’s Build It for What’s Next.
              </h1>
              <p className={lead}>
                Transform an outdated website into a faster, accessible,
                mobile-friendly, easier-to-manage digital experience, designed
                to evolve with your organization.
              </p>
              <p className="mt-4 leading-7 text-body">
                Start with what you need today. Build with tomorrow in mind.
                AI-native in how we build. Human-led in what we deliver.
              </p>
              <ServiceConversation label="Request a Website Assessment" />
              <a
                href="/contact#contact-message"
                className={`mt-4 min-h-11 ${linkInline}`}
              >
                Building a New Website? Let’s Talk. <span aria-hidden="true"> ↓</span>
              </a>
            </div>
            <div
              className="grid grid-cols-2 gap-3"
              aria-label="Selected project screenshots"
            >
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={`#${project.id}`}
                  data-catalog-card
                  className="group overflow-hidden rounded-2xl border border-line bg-canvas shadow-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <Image
                    src={`/images/pages/${project.image}-showcase-20261028.jpg`}
                    alt={`${project.name} public ${project.status.includes("preview") ? "preview" : "website"}`}
                    width={1440}
                    height={1000}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 290px, 45vw"
                    className="aspect-[4/3] w-full object-cover object-top"
                    priority={
                      project.id === "gevitals" ||
                      project.id === "teams-management"
                    }
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-ink group-hover:text-accent">
                      {project.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      {project.status}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-label="Our website development experience"
          className="border-b border-line bg-canvas"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-3 px-4 py-6 text-sm leading-6 text-body sm:px-6">
            <p>
              <strong className="text-ink">
                Established in New York in 2019
              </strong>
            </p>
            <p>
              <strong className="text-ink">
                100th website launched in 2024
              </strong>
            </p>
            <Link href="/about#company-history-heading" className={linkInline}>
              Explore our story →
            </Link>
          </div>
        </section>

        <PageSections items={[["why-modernize", "Why modernize?"], ["modernization-process", "The process"], ["website-and-app-development", "Websites & apps"], ["our-work", "Explore the work"]]} />
        <Modernization />

        <section
          id="website-and-app-development"
          className={sectionBand}
          aria-labelledby="development-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={eyebrow}>The right experience for the job</p>
            <h2 id="development-heading" className={`mt-4 max-w-3xl ${h2}`}>
              Websites. Apps.
              <br />
              Operations made for your team.
            </h2>
            <p className={`max-w-3xl ${lead}`}>
              We start with your audience and the problem to solve, then agree
              the right platform and a useful first release.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  Icon: Globe,
                  title: "Business website design & redesign",
                  text: "Launch a small business website or improve an existing one. Help customers understand your offer and take the next step, with content, booking, or commerce where needed.",
                },
                {
                  Icon: AppWindow,
                  title: "Web applications",
                  text: "Turn a business workflow into an interactive tool: a customer portal, an internal dashboard, or a service people use in their browser.",
                },
                {
                  Icon: Smartphone,
                  title: "Mobile apps",
                  text: "Put the right experience in your users’ hands. Define a useful first release for iOS or Android, with device capabilities and store requirements considered from the start.",
                },
                {
                  Icon: LayoutDashboard,
                  title: "Custom operations solutions",
                  text: "Replace spreadsheet chasing with a workspace around your team: records, requests, approvals, status and reporting. Connect existing tools where it makes sense.",
                },
              ].map(({ Icon, title, text }) => (
                <article key={title} className={`p-6 sm:p-8 ${cardFlat}`}>
                  <Icon
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.5}
                    className="mb-6 text-accent"
                  />
                  <h3 className={h3}>{title}</h3>
                  <p className="mt-4 leading-7 text-body">{text}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">
              Platform choice, integrations, testing, hosting, app-store
              submission, and ongoing support are agreed for each project. The
              work below shows website and web-platform experience, not
              published native mobile apps.
            </p>
          </div>
        </section>

        <section
          id="custom-operations"
          className="border-b border-line bg-white py-16 sm:py-20"
          aria-labelledby="operations-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <p className={eyebrow}>
                  Behind the website. Inside the business.
                </p>
                <h2 id="operations-title" className={`mt-4 ${h2}`}>
                  Build around the way
                  <br />
                  your team actually works.
                </h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-body">
                  When the work lives across spreadsheets, inboxes and
                  disconnected tools, every handoff costs attention. A focused
                  internal application can bring the record, the next step and
                  the right person into one place.
                </p>
                <p className="mt-4 leading-7 text-body">
                  We assess maintained platforms and your existing tools first.
                  Configure what fits; create custom workflows where your needs
                  call for something more.
                </p>
              </div>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "School operations",
                  text: "Admissions, classroom work and family-visible progress.",
                  image: "education-workspace",
                  href: "/demos/education",
                },
                {
                  title: "Manufacturing operations",
                  text: "Materials, production handoffs and quality gates.",
                  image: "manufacturing-workspace",
                  href: "/demos/manufacturing",
                },
                {
                  title: "Property operations",
                  text: "Rent records, maintenance and resident updates.",
                  image: "property-workspace",
                  href: "/demos/property-management",
                },
              ].map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="demo-story-card block overflow-hidden rounded-2xl border border-line bg-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <Image
                    src={`/images/demos/${d.image}.webp`}
                    alt={`${d.title} fictional interactive workspace preview`}
                    width={1440}
                    height={1000}
                    sizes="(max-width:768px) 100vw, 370px"
                    unoptimized
                    className="h-auto w-full border-b border-line"
                  />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      Interactive experience
                    </p>
                    <h3 className="mt-3 text-xl font-medium text-ink">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-body">{d.text}</p>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent">
                      Explore the possibilities{" "}
                      <ArrowRight aria-hidden="true" size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-muted">
              Fictional demonstrations, not client systems. Production access
              controls, integrations, data migration and support are defined for
              your engagement.
            </p>
          </div>
        </section>

        <section
          id="our-work"
          className={`${section} scroll-mt-24`}
          aria-labelledby="selected-work-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={eyebrow}>Real projects. Practical capabilities.</p>
            <h2
              data-catalog-reveal
              id="selected-work-heading"
              className={`mt-4 ${h2}`}
            >
              See the experience. Understand what’s behind it.
            </h2>
            <p className={`max-w-3xl ${lead}`}>
              A website is what your customers see. Booking, publishing,
              payments, and operations are what make it useful. Published client
              websites lead the selection below, followed by our in-house
              platform and storefront preview. Private operational tools are not
              public demos.
            </p>
            <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  id={project.id}
                  data-catalog-card
                  className={`scroll-mt-24 overflow-hidden ${card}`}
                  aria-labelledby={`${project.id}-heading`}
                >
                  <figure>
                    <Image
                      src={`/images/pages/${project.image}-showcase-20261028.jpg`}
                      alt={`${project.name} public-facing ${project.status.includes("preview") ? "preview" : "website"} screenshot`}
                      width={1440}
                      height={1000}
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="h-auto w-full border-b border-line"
                    />
                    <figcaption className="border-b border-line bg-canvas px-6 py-3 text-xs leading-5 text-muted">
                      {project.note}
                    </figcaption>
                  </figure>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-accent">
                        {project.category}
                      </p>
                      <span className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-semibold text-body">
                        {project.status}
                      </span>
                    </div>
                    <h3
                      id={`${project.id}-heading`}
                      className="mt-4 text-2xl font-semibold tracking-tight text-ink"
                    >
                      {project.name}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-body">
                      {project.enables}
                    </p>
                    <ul
                      className="mt-5 flex flex-wrap gap-2"
                      aria-label={`${project.name} capabilities`}
                    >
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-ink"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <details className="mt-5 border-y border-line">
                      <summary className="cursor-pointer rounded py-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-accent">
                        Inside the project &amp; customer journey
                      </summary>
                      <dl className="my-5 space-y-4 text-sm leading-7 text-body">
                        {[
                          ["The need", project.need],
                          ["What we built", project.work],
                          ["What it enables", project.enables],
                        ].map(([label, text]) => (
                          <div key={label}>
                            <dt className="font-semibold text-ink">{label}</dt>
                            <dd>{text}</dd>
                          </div>
                        ))}
                      </dl>
                      <ol
                        className="space-y-3 pb-4"
                        aria-label={`${project.name} journey`}
                      >
                        {project.journey.map((step, index) => (
                          <li
                            key={step}
                            className="flex items-center gap-3 text-sm text-body"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                      <p className="pb-5 text-sm leading-7 text-body">
                        {project.behind}
                      </p>
                    </details>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.link} (opens in a new tab)`}
                      className={`mt-5 min-h-11 ${linkInline}`}
                    >
                      {project.link} <span aria-hidden="true"> ↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <details className={`mt-8 px-6 py-2 ${cardFlat}`}>
              <summary className="cursor-pointer rounded py-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-accent">
                More published digital experiences
              </summary>
              <div className="grid gap-6 border-t border-line py-6 md:grid-cols-2">
                {[
                  {
                    name: "Open Goal Soccer",
                    text: "An archival redesign preserving a community program’s content, mission, and inclusive youth soccer story.",
                    url: "https://opengoalsoccer.com/",
                  },
                  {
                    name: "CalmLoop",
                    text: "A low-pressure web companion offering gentle routine ideas for neurodivergent children and their families.",
                    url: "https://calmloop.2nspira.com/",
                  },
                ].map((site) => (
                  <article key={site.name}>
                    <h3 className={h3}>{site.name}</h3>
                    <p className="mt-3 leading-7 text-body">{site.text}</p>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${site.name} (opens in a new tab)`}
                      className={`mt-4 min-h-11 ${linkInline}`}
                    >
                      Visit {site.name} ↗
                    </a>
                  </article>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section
          id="capabilities"
          className={sectionBand}
          aria-labelledby="capabilities-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <p className={eyebrow}>Choose what your business needs</p>
                <h2
                  data-catalog-reveal
                  id="capabilities-heading"
                  className={`mt-4 ${h2}`}
                >
                  Designed around people.
                  <br />
                  Connected to your business.
                </h2>
                <p className={lead}>
                  An easier booking. A clearer purchase. A better handoff to
                  your team. Start with the moments that matter, then choose the
                  capabilities to support them.
                </p>
                <a
                  href="#platform-model"
                  className={`mt-5 min-h-11 ${linkInline}`}
                >
                  See how the pieces connect{" "}
                  <span aria-hidden="true" className="ml-2">
                    ↓
                  </span>
                </a>
              </div>
              <figure
                data-catalog-fade
                className="overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft"
              >
                <Image
                  src="/images/pages/websites-business-journey-20261028.webp"
                  alt="Illustrative scene of two small-business colleagues reviewing a tablet and planning work together in a studio."
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="px-5 py-3 text-sm leading-6 text-body">
                  Less friction for your customers. More clarity for your team.
                </figcaption>
              </figure>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, text, proof, href }) => (
                <article
                  key={title}
                  data-catalog-card
                  data-service-card
                  className={`flex flex-col p-6 sm:p-7 ${card} ${styles.capability}`}
                >
                  <span data-service-icon>
                    <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className={h3}>{title}</h3>
                  <p className="mt-4 flex-1 leading-7 text-body">{text}</p>
                  <a
                    href={href}
                    className={`mt-5 min-h-11 text-sm ${linkInline}`}
                  >
                    {proof} <span aria-hidden="true"> ↑</span>
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">
              Capabilities are scoped to each engagement. Preview examples
              demonstrate development work, not a promise that every feature is
              live or included in every website.
            </p>
          </div>
        </section>

        <section
          id="ai-native"
          className={section}
          aria-labelledby="ai-native-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <figure
                data-catalog-fade
                className="overflow-hidden rounded-[1.5rem] border border-line shadow-soft"
              >
                <Image
                  src="/images/advisory/focused-collaboration.webp"
                  alt="Illustrative scene of three colleagues reviewing work together on a laptop."
                  width={1672}
                  height={941}
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="bg-canvas-deep px-5 py-3 text-sm leading-6 text-body">
                  Technology assists. People decide.
                </figcaption>
              </figure>
              <div>
                <p className={eyebrow}>Our development approach</p>
                <h2
                  data-catalog-reveal
                  id="ai-native-heading"
                  className={`mt-4 ${h2}`}
                >
                  AI-native development.
                  <br />
                  Human product judgment.
                </h2>
                <p className={lead}>
                  AI helps us explore, implement, and review. People stay
                  responsible for what we build, how it works, and whether it is
                  ready to launch.
                </p>
                <p className="mt-4 leading-7 text-body">
                  For your business, that means clear accountability for design
                  and engineering decisions, testing of agreed customer journeys
                  before launch, and an agreed handover and support plan.
                  AI-powered features are a separate choice; your website does
                  not need a chatbot.
                </p>
                <Link
                  href="/ai-enablement"
                  className={`mt-6 min-h-11 ${linkInline}`}
                >
                  Explore AI enablement →
                </Link>
              </div>
            </div>
            <ol
              className={`mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${styles.approach}`}
              aria-label="Our AI-native development approach"
            >
              {[
                [
                  "Understand",
                  "Define the audience, outcomes, existing tools, and constraints.",
                ],
                [
                  "Build",
                  "Combine AI assistance with engineering and design judgment.",
                ],
                [
                  "Review",
                  "Check real journeys, access, accessibility, and responsive behavior.",
                ],
                [
                  "Hand over",
                  "Verify the deployed experience and agree ownership and support.",
                ],
              ].map(([title, text], index) => (
                <li
                  key={title}
                  data-catalog-fade
                  className="relative border-t border-line pt-6"
                >
                  <span className={styles.stepNumber}>0{index + 1}</span>
                  <h3 className={`mt-5 ${h3}`}>{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="website-standards"
          className={sectionBand}
          aria-labelledby="website-standards-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={eyebrow}>Standards & project-specific requirements</p>
            <h2 id="website-standards-heading" className={`mt-4 ${h2}`}>
              Accessibility, Security, and Compliance
            </h2>
            <p className={`max-w-3xl ${lead}`}>
              We design with accessibility, security, and privacy in mind from
              the beginning. We agree testing, compliance requirements, and
              responsibilities for each project.
            </p>
            <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {[
                [
                  "Accessibility",
                  "Target WCAG 2.2 Level AA accessibility, test agreed user journeys, and document limitations and remediation needs.",
                ],
                [
                  "Security & data protection",
                  "Follow secure development practices and protect user data submitted through the website and webstore.",
                ],
                [
                  "Privacy & consent",
                  "Support privacy notice, cookie, consent, and data handling requirements as applicable.",
                ],
                [
                  "Pre-launch testing",
                  "Conduct accessibility, performance, security, and quality assurance testing before launch.",
                ],
              ].map(([title, text]) => (
                <li key={title} className="border-t border-line pt-5">
                  <h3 className={h3}>{title}</h3>
                  <p className="mt-3 leading-7 text-body">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ServiceFit
          title="The right solution for the stage you’re at."
          intro="You don’t have to know the technology. Bring the customer experience or internal workflow you want to improve, and we’ll agree the simplest useful scope."
          items={[
            {
              title: "Launch or refresh",
              text: "A clear offer, useful content, and a credible place to send prospective customers.",
            },
            {
              title: "Connect the next step",
              text: "Booking, inquiries, commerce, or information that needs a better handoff to your team.",
            },
            {
              title: "Extend your operations",
              text: "A portal, Admin workspace, or integration when the business has outgrown disconnected tools.",
            },
          ]}
        />
        <section
          id="platform-model"
          className="px-4 py-12 sm:px-6 sm:py-16"
          aria-labelledby="platform-model-heading"
        >
          <div
            className={`mx-auto max-w-6xl overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14 ${styles.journey}`}
          >
            <div className="max-w-2xl">
              <p className={styles.lightEyebrow}>
                From first click to follow-through
              </p>
              <h2
                data-catalog-reveal
                id="platform-model-heading"
                className={`mt-4 ${styles.lightHeading}`}
              >
                One journey.
                <br />
                Connected where it matters.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/85">
                A booking, purchase, or request should have a clear next
                step—for the customer and the people doing the work.
              </p>
            </div>
            <ol
              className={`mt-10 grid gap-5 md:grid-cols-3 ${styles.flow}`}
              aria-label="Illustrative connected business workflow"
            >
              {[
                {
                  Icon: MousePointer2,
                  title: "Your customer takes action",
                  text: "They book, buy, inquire, or submit a request.",
                  label: "The experience",
                },
                {
                  Icon: Network,
                  title: "The right context follows",
                  text: "An agreed integration passes relevant information to the appropriate tools.",
                  label: "The connection",
                },
                {
                  Icon: UserRoundCheck,
                  title: "Your team can act",
                  text: "Staff review records, manage status, and follow up.",
                  label: "The follow-through",
                },
              ].map(({ Icon, title, text, label }, index) => (
                <li key={title} data-catalog-fade className={styles.flowStep}>
                  <div className="flex items-center justify-between">
                    <span className={styles.flowIcon}>
                      <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-white/70">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/70">
                    {label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-7 text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/85">{text}</p>
                  {index < 2 && (
                    <ArrowRight
                      className={styles.flowArrow}
                      size={24}
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-start justify-between gap-5 border-t border-white/20 pt-6">
              <p className="max-w-xl text-sm leading-7 text-white/75">
                Illustrative workflow. Integrations, payments, automation, and
                portals are agreed separately for each project.
              </p>
              <Link
                href="/automation-systems-optimization"
                className={styles.lightLink}
              >
                Explore systems integration{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <ServiceQuestions items={websiteQuestions} />
        <section className={sectionBand} aria-labelledby="website-cta-heading">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 data-catalog-reveal id="website-cta-heading" className={h2}>
              Ready for your website’s next chapter?
            </h2>
            <p className={lead}>
              Bring your current site, an app idea, or an internal workflow that
              isn’t working. We’ll discuss what matters now and the simplest
              useful next step.
            </p>
            <ServiceConversation
              label="Discuss your website, app or workflow"
              centered
            />
          </div>
        </section>
        <DemoTrust />
      </ServiceEffects>
    </main>
  );
}
