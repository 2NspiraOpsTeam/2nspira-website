import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { EyebrowPill } from "@/components/VisualAccents";
import { h2, h3, lead, linkInline, pageMain, section, cardFlat } from "@/components/ui";
const description = "Personal AI assistant setup and training around your tasks, tools and working preferences, with clear permissions and human approval.";
export const metadata: Metadata = publicPageMetadata({title: "Personal AI Assistant Setup & Training", description, path: "/personal-ai-assistant"});
export default function Page() { return <main id="main-content" className={pageMain}><section className={section}><div className="mx-auto max-w-6xl px-4 sm:px-6">
<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service",name:"Personal AI Assistant Setup & Training",description,url:"https://2nspira.com/personal-ai-assistant",provider:{"@id":"https://2nspira.com/#organization"}}).replace(/</g,"\\u003c")}} />
<Link href="/ai-enablement" className={linkInline}>← AI consulting for organizations</Link>
        <EyebrowPill>Complementary offering · Individuals & teams</EyebrowPill>
        <h1 id="personal-agent-heading" className={`mt-5 max-w-3xl ${h2}`}>Your own AI assistant. Set up around the way you work.</h1>
        <p className={`max-w-3xl ${lead}`}>Go beyond a blank chat window. We help you choose, set up, and personalize an AI agent assistant for your priorities, everyday tasks, and preferred tools.</p>
        <figure className="mt-8 overflow-hidden rounded-[2rem] border border-line bg-ink">
          <Image src="/images/advisory/personal-ai-workspace-v1.webp" alt="A professional directing a personal AI assistant that connects research, scheduling, writing, and task planning in one workspace." width={1672} height={941} sizes="(min-width: 1152px) 1104px, calc(100vw - 32px)" unoptimized className="aspect-[16/9] h-auto w-full object-cover" />
        </figure>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { title: "Start with your day", text: "Choose a useful first job: research a topic, organize information, draft content, or prepare for a meeting. Define what a helpful result looks like." },
            { title: "Make it yours", text: "Shape its instructions, tone, and working context. Connect selected tools and knowledge sources where supported, with permissions matched to the task." },
            { title: "Build confidence", text: "Test real examples together, refine the workflow, and learn how to review its work. Keep approval in your hands for messages, purchases, and important changes." }
          ].map(item => <article key={item.title} className={`p-6 sm:p-7 ${cardFlat}`}><h3 className={h3}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p></article>)}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">We’ll agree the setup, training, access boundaries, and any ongoing support before work begins. Platform capabilities, subscriptions, and integrations depend on the tools you choose.</p>
        <Link href="/contact?service=ai#contact-message" className={`mt-6 min-h-11 ${linkInline}`}>Ask about personal AI assistance →</Link>
</div></section></main>; }
