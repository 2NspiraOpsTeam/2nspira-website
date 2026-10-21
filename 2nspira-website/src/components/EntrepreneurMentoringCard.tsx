import Link from "next/link";
import { Handshake } from "lucide-react";
import { card, eyebrow, h3, linkInline } from "@/components/ui";

export default function EntrepreneurMentoringCard() {
  return (
    <article
      data-catalog-card
      data-service-card
      aria-labelledby="entrepreneur-service-heading"
      className={`relative overflow-hidden p-8 sm:p-10 ${card}`}
    >
      <span data-service-rule aria-hidden="true" />
      <div>
        <span data-service-icon>
          <Handshake aria-hidden="true" size={25} strokeWidth={1.6} />
        </span>
        <p className={eyebrow}>Entrepreneur Mentoring &amp; Coaching</p>
        <h3 id="entrepreneur-service-heading" className={`mt-4 ${h3}`}>
          Build your business. Grow into the leader it needs.
        </h3>
        <p className="mt-4 max-w-3xl leading-7 text-body">
          You don’t have to figure everything out alone. Work one-on-one with an
          experienced industry leader matched to your industry—someone to challenge
          your thinking, offer candid feedback, and help you turn uncertainty into
          practical next steps.
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-body">
          From testing your business idea to making difficult decisions and leading
          a team, get ongoing guidance that develops your business, your mindset,
          and the way you lead.
        </p>
        <div className="mt-5 max-w-3xl rounded-xl border border-line bg-canvas-deep p-4 sm:p-5">
          <p className="font-semibold text-ink">
            A focused hour. Every week. Built around you.
          </p>
          <p className="mt-2 text-sm leading-7 text-body">
            Sessions are usually one hour weekly, via Zoom or in person when possible.
          </p>
        </div>
        <Link href="/coaching" className={`mt-6 min-h-[44px] ${linkInline}`}>
          Explore one-on-one mentoring
          <span data-service-arrow aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
