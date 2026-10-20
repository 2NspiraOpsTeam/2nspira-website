import Link from "next/link";
import { Handshake } from "lucide-react";
import { card, eyebrow, h3, linkInline } from "@/components/ui";

export default function EntrepreneurMentoringCard() {
  return <article data-catalog-card data-service-card aria-labelledby="entrepreneur-service-heading" className={`relative overflow-hidden p-8 sm:p-10 ${card}`}>
    <span data-service-rule aria-hidden="true" /><span data-service-icon><Handshake aria-hidden="true" size={25} strokeWidth={1.6} /></span>
    <p className={eyebrow}>With Jeffrey Cortez</p>
    <h3 id="entrepreneur-service-heading" className={`mt-4 ${h3}`}>Entrepreneur Mentoring &amp; Coaching</h3>
    <p className="mt-4 max-w-3xl leading-7 text-body">One-on-one mentoring for entrepreneurs—from validating a product idea to navigating the challenges of leading a growing company. Practical business guidance, mindset and leadership coaching, and ongoing support from Jeffrey Cortez, founder of 2Nspira.</p>
    <Link href="/coaching" className={`mt-6 min-h-[44px] ${linkInline}`}>Explore Entrepreneur Mentoring &amp; Coaching <span data-service-arrow aria-hidden="true">→</span></Link>
  </article>;
}
