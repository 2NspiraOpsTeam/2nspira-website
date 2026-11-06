import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import { buttonPrimary, eyebrow, h2 } from "@/components/ui";
export default function DemoTrust() {
  return (
    <section
      id="how-we-build"
      className="scroll-mt-24 border-y border-line bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Confidence through clarity</p>
        <h2 className={`mt-4 max-w-3xl ${h2}`}>
          A product you can explore.
          <br />A partner you can get to know.
        </h2>
        <div className="mt-9 grid gap-7 md:grid-cols-3">
          {[
            [
              "See it, don’t just read about it.",
              "Follow connected workflows in a working experience, from the first action to the next person’s view.",
            ],
            [
              "Know exactly what you’re seeing.",
              "These are fictional examples. Payments and messages are simulated, and changes stay in your browser tab.",
            ],
            [
              "Start with your real priorities.",
              "A conversation begins with your people, existing systems, and one workflow worth improving—not a promise to replace everything.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="border-t-2 border-accent/30 pt-5">
              <h3 className="text-lg font-medium text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-body">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a href={BOOKING_URL} className={buttonPrimary}>
            Let’s map your first improvement
          </a>
          <Link
            href="/team-delivery"
            className="inline-flex min-h-11 items-center font-medium text-accent underline underline-offset-4"
          >
            Meet the people & delivery approach
          </Link>
        </div>
      </div>
    </section>
  );
}
