import type { Content } from "@/lib/audiences/model";
import { eyebrow, h2 } from "@/components/ui";
export default function Relationships({ content: c }: { content: Content }) {
  return (
    <>
      {c.showOrganizations && c.organizations.length > 0 && (
        <section className="border-y border-line bg-canvas-deep">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className={eyebrow}>Verified connections</p>
            <h2 className={`${h2} mt-4`}>Clients & project relationships</h2>
            <p className="mt-5 max-w-3xl leading-7 text-body">
              Each relationship is described individually. Founder experience,
              predecessor-company work, volunteer contributions and partnerships
              are not presented as direct 2Nspira client engagements.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.organizations
                .filter((o) => o.visible && o.approved)
                .map((o) => (
                  <article
                    key={o.id}
                    className="rounded-2xl border border-line bg-white p-6"
                  >
                    {o.href ? (
                      <a
                        href={o.href}
                        className="block rounded-lg focus-visible:outline-2 focus-visible:outline-accent"
                        aria-label={`${o.name} — project details`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={o.logo}
                          alt={o.name}
                          width={240}
                          height={100}
                          className="h-24 w-full object-contain"
                        />
                      </a>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={o.logo}
                        alt={o.name}
                        width={240}
                        height={100}
                        className="h-24 w-full object-contain"
                      />
                    )}
                    <h3 className="mt-5 font-semibold">{o.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-body">
                      {o.relationship}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
