import { Compass, Lightbulb, Target, Route } from "lucide-react";
import Reveal from "../Reveal";
import Link from "next/link";
import BreadcrumbList, { type Crumb } from "../BreadcrumbList";
import {
  buttonPrimary,
  card,
  caption,
  h2,
  lead,
  linkInline,
  pageMain,
} from "../ui";

type Props = {
  title: string;
  intro: string;
  audience: string;
  highlights: string[];
  href: string;
  action: string;
  breadcrumb?: Crumb[];
};

export default function AssessmentPage({ title, intro, audience, highlights, href, action, breadcrumb }: Props) {
  const icons = [Compass, Lightbulb, Target, Route];
  return (
    <main className={pageMain} id="main-content">
      {breadcrumb && <BreadcrumbList items={breadcrumb} />}      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <Link href="/resources" className={linkInline}>
          ← All resources
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className={lead}>{intro}</p>

        <section className="mt-12" aria-labelledby="explore-heading">
          <Reveal><h2 id="explore-heading" className={h2}>What you can explore</h2></Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = icons[index % icons.length];
              return <li key={item}><Reveal delay={index * 60} className="h-full"><div className={`h-full p-6 ${card}`}><Icon aria-hidden="true" className="mb-4 h-7 w-7 text-accent" /><p className="leading-7 text-body">{item}</p></div></Reveal></li>;
            })}
          </ul>
        </section>
        <section className="mt-8 rounded-3xl border border-line bg-canvas-deep p-6 sm:p-8" aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="text-2xl font-semibold text-ink">Who it is for</h2>
          <p className="mt-3 leading-8 text-body">{audience}</p>
          <a href={href} className={`mt-6 ${buttonPrimary}`}>{action} →</a>
          <p className={`mt-3 ${caption}`}>Free to use. Continue to the dedicated 2Nspira assessment app.</p>
        </section>

        <p className="mt-8 text-body">
          Want help putting your insights into practice?{" "}
          <Link href="/contact" className={linkInline}>
            Contact 2Nspira
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
