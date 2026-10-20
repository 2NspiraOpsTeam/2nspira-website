import Link from "next/link";
import Image from "next/image";
import { Handshake } from "lucide-react";
import { card, eyebrow, h3, linkInline } from "@/components/ui";

export default function EntrepreneurMentoringCard() {
  return <article data-catalog-card data-service-card aria-labelledby="entrepreneur-service-heading" className={`relative grid items-center gap-8 overflow-hidden p-8 sm:p-10 md:grid-cols-[minmax(0,1fr)_180px] ${card}`}>
    <span data-service-rule aria-hidden="true" />
    <figure className="mx-auto w-36 overflow-hidden rounded-2xl border border-line md:order-last md:mx-0 md:w-full"><Image src="/images/coaching/jeffrey-cortez-mentor.webp" alt="Jeffrey Cortez, your entrepreneur mentor." width={600} height={900} sizes="(min-width: 768px) 180px, 144px" className="h-auto w-full" /></figure>
    <div><span data-service-icon><Handshake aria-hidden="true" size={25} strokeWidth={1.6} /></span>
    <p className={eyebrow}>With Jeffrey Cortez</p>
    <h3 id="entrepreneur-service-heading" className={`mt-4 ${h3}`}>Entrepreneur Mentoring &amp; Coaching</h3>
    <p className="mt-4 max-w-3xl leading-7 text-body">One-on-one mentoring for entrepreneurs—from validating a product idea to navigating the challenges of leading a growing company. Practical business guidance, mindset and leadership coaching, and ongoing support from Jeffrey Cortez, founder of 2Nspira.</p>
    <Link href="/coaching" className={`mt-6 min-h-[44px] ${linkInline}`}>Explore Entrepreneur Mentoring &amp; Coaching <span data-service-arrow aria-hidden="true">→</span></Link>
    </div>
  </article>;
}
