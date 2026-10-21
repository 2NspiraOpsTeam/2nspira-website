import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import { buttonPrimary, buttonSecondary } from "./ui";

/** Native Google intake stays with the booking; no personal data in link parameters. */
export default function ServiceConversation({ label = "Book a 30-minute conversation", centered = false, mentoring = false, dark = false }: {
  label?: string; centered?: boolean; mentoring?: boolean; dark?: boolean;
}) {
  return <div className="mt-8">
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${centered ? "items-center sm:justify-center" : "items-start"}`}>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonPrimary}
        aria-label={`${label} (30-minute introductory call, Google Calendar, opens in a new tab)`}>{label}<span aria-hidden="true" className="ml-2">↗</span></a>
      <Link href="/contact#contact-message" className={`${buttonSecondary} ${dark ? "text-white hover:text-white focus-visible:ring-white focus-visible:ring-offset-ink" : ""}`}>Send a message</Link>
    </div>
    <p className={`mt-3 max-w-xl text-sm leading-6 ${centered ? "mx-auto" : ""} ${dark ? "text-white/80" : "text-muted"}`}>
      Choose a time, tell us how we can help, and confirm. This 30-minute introductory conversation is via Google Meet. Booking opens Google Calendar in a new tab.
    </p>
    {mentoring && <p className={`mt-2 max-w-xl text-sm leading-6 ${centered ? "mx-auto" : ""} ${dark ? "text-white/80" : "text-muted"}`}>This introduction is separate from mentoring sessions, which are usually one hour weekly.</p>}
  </div>;
}
