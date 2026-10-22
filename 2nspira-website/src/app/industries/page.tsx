import type { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, Trophy, Factory, Utensils, Cpu, HeartHandshake, ArrowRight } from "lucide-react";
import { publicPageMetadata } from "@/lib/pageMetadata";
import ServiceEffects from "@/components/ServiceEffects";
import ServiceConversation from "@/components/ServiceConversation";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { cardFlat, h1, h2, lead, linkInline, pageMain, section, sectionBand } from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Industry Experience | Technology & Business Guidance",
  shareTitle: "Your industry. Your priorities. A practical way forward.",
  description: "Explore 2Nspira’s experience across real estate, property management, education, sports, manufacturing, restaurants, technology, and medical therapy.",
  path: "/industries",
});

const industries = [
  {
    name: "Real Estate & Property Management", icon: Building2,
    conversation: "Where do property information, tenant or client communication, and operational handoffs become disconnected?",
    focus: "Connected workflows, customer-facing digital experiences, and clearer technology priorities.",
  },
  {
    name: "Education", icon: GraduationCap,
    conversation: "How can your systems better support the people delivering and participating in learning?",
    focus: "Digital experiences, administrative workflows, and thoughtful technology adoption.",
  },
  {
    name: "Sports", icon: Trophy,
    conversation: "What would make it easier to connect your community and coordinate the work behind the experience?",
    focus: "Clearer websites, communication workflows, and business systems that work together.",
  },
  {
    name: "Manufacturing", icon: Factory,
    conversation: "Where are disconnected information and manual handoffs making decisions harder?",
    focus: "Operational visibility, connected processes, and practical automation priorities.",
  },
  {
    name: "Restaurants", icon: Utensils,
    conversation: "Where does your digital customer experience fall out of step with day-to-day operations?",
    focus: "Customer-facing websites, system connections, and opportunities to simplify repetitive work.",
  },
  {
    name: "Technology", icon: Cpu,
    conversation: "Which product, technology, or leadership decisions need a clearer direction?",
    focus: "Technology strategy, venture guidance, leadership development, and practical execution planning.",
  },
  {
    name: "Medical Therapy", icon: HeartHandshake,
    conversation: "What would help people understand your practice and make administrative work less fragmented?",
    focus: "Clear digital communication, business workflows, and carefully scoped technology decisions.",
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://2nspira.com/industries#webpage",
  url: "https://2nspira.com/industries",
  name: "2Nspira Industry Experience",
  description: "Industries where 2Nspira has worked, with starting points for discussing business and technology priorities.",
  about: { "@id": "https://2nspira.com/#organization" },
  isPartOf: { "@id": "https://2nspira.com/#website" },
};

export default function IndustriesPage() {
  return <main id="main-content" className={pageMain}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c") }} />
    <ServiceEffects>
      <section className="relative overflow-hidden border-b border-line bg-surface py-20 sm:py-28" aria-labelledby="industry-heading">
        <AmbientField />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <p><EyebrowPill>Industry experience</EyebrowPill></p>
          <h1 id="industry-heading" className={h1}>Your industry has its own challenges.<br className="hidden sm:block" /> Start with yours.</h1>
          <p className={`max-w-3xl ${lead}`}>2Nspira has worked across real estate and property management, education, sports, manufacturing, restaurants, technology, and medical therapy—as well as with startups across industries.</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-body">That breadth is a starting point, not a one-size-fits-all answer. We begin with how your organization works, what you want to change, and the decisions in front of you.</p>
          <a href="#industry-conversations" className={`mt-6 min-h-11 ${linkInline}`}>Explore the starting points <span aria-hidden="true" className="ml-2">↓</span></a>
        </div>
      </section>

      <section id="industry-conversations" className={`${section} scroll-mt-24`} aria-labelledby="conversations-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="conversations-heading" className={h2}>Recognize your situation?</h2>
          <p className={`max-w-3xl ${lead}`}>These are possible conversations we can explore together—not descriptions of past projects or a claim that every service has been delivered in every industry. The right support depends on your needs and the scope we agree.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {industries.map(({ name, icon: Icon, conversation, focus }) => <article key={name} data-catalog-card className={`p-6 sm:p-8 ${cardFlat}`}>
              <Icon size={26} strokeWidth={1.5} aria-hidden="true" className="mb-5 text-accent" />
              <h3 className="text-xl font-semibold tracking-tight text-ink">{name}</h3>
              <p className="mt-4 text-base leading-8 text-body">{conversation}</p>
              <p className="mt-4 border-t border-line pt-4 text-sm leading-7 text-body"><span className="font-semibold text-ink">A starting point: </span>{focus}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="startup-heading">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">A stage, not a sector</p>
            <h2 id="startup-heading" className={`mt-4 ${h2}`}>Building a startup?</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-body">Startups face a different set of decisions, whatever their industry. You may be testing an idea, learning about your customers, shaping a product, or growing into the responsibilities of leadership.</p>
            <p className="mt-4 text-base leading-8 text-body">Our Entrepreneur Mentoring &amp; Coaching offers practical business guidance alongside mindset and leadership coaching. We explore coach alignment with your industry and priorities; mentoring is guidance, not done-for-you product development.</p>
            <Link href="/coaching" className={`mt-6 min-h-11 ${linkInline}`}>Explore entrepreneur mentoring <ArrowRight aria-hidden="true" size={17} className="ml-2" /></Link>
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="next-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 id="next-heading" className={h2}>Tell us what needs to work better.</h2>
          <p className={lead}>Bring your context, not a finished brief. We can discuss AI adoption, connected systems, digital platforms, technology leadership, or entrepreneur mentoring—and whether there is a fit.</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/services" className={`min-h-11 ${linkInline}`}>Find the right service <ArrowRight aria-hidden="true" size={17} className="ml-2" /></Link>
            <Link href="/work" className={`min-h-11 ${linkInline}`}>See published work <ArrowRight aria-hidden="true" size={17} className="ml-2" /></Link>
          </div>
          <ServiceConversation label="Discuss your industry and priorities" />
        </div>
      </section>
    </ServiceEffects>
  </main>;
}
