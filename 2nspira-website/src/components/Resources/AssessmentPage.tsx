import Link from "next/link";
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
};

export default function AssessmentPage({ title, intro, audience, highlights, href, action }: Props) {
  return (
    <main className={pageMain} id="main-content">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <Link href="/resources" className={linkInline}>
          ← All resources
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className={lead}>{intro}</p>

        <section className={`mt-10 p-6 sm:p-8 ${card}`}>
          <h2 className={h2}>What you can explore</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-body">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="mt-8 text-xl font-semibold text-ink">Who it is for</h3>
          <p className="mt-3 leading-8 text-body">{audience}</p>
          <a href={href} className={`mt-8 ${buttonPrimary}`}>
            {action} →
          </a>
          <p className={`mt-3 ${caption}`}>
            Free to use. Continue to the dedicated 2Nspira assessment app.
          </p>
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
