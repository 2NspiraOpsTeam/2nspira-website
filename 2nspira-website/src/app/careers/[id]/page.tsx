import { buttonPrimary } from "@/components/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { job, settings, CareerError } from "@/lib/careers/server";
import ApplicationForm from "@/components/careers/ApplicationForm";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const j = await job((await params).id, true);
    return {
      title: `${j.title} | Careers at 2Nspira`,
      description: `${j.location}. ${j.employmentType}. ${j.compensation}`,
      alternates: { canonical: `/careers/${j.id}` },
    };
  } catch {
    return {
      title: "Opening unavailable",
      robots: { index: false, follow: false },
    };
  }
}
export default async function Role({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let j;
  try {
    j = await job((await params).id, true);
  } catch (e) {
    if (e instanceof CareerError && e.status === 404) notFound();
    throw e;
  }
  const s = await settings();
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <Link className="underline" href="/careers">
        ← All opportunities
      </Link>
      <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">{j.title}</h1>
      <p className="mt-5">
        {j.location} · {j.employmentType}
      </p>
      <p className="mt-2 font-medium">{j.compensation}</p>
      <a className={`mt-6 ${buttonPrimary}`} href="#apply">
        Apply for this role
      </a>
      {[
        ["About this role", j.description],
        ["Responsibilities", j.responsibilities],
        ["Qualifications", j.qualifications],
        ...(j.additionalDetails
          ? [["Additional role details", j.additionalDetails]]
          : []),
      ].map(([heading, text]) => (
        <section className="mt-10" key={heading}>
          <h2 className="text-2xl font-semibold">{heading}</h2>
          <p className="mt-4 whitespace-pre-wrap leading-8">{text}</p>
        </section>
      ))}
      <ApplicationForm
        job={{
          id: j.id,
          title: j.title,
          revision: j.revision,
          questions: j.questions,
          coverRequired: j.coverRequired,
          resumeOrProfile: j.resumeOrProfile,
        }}
        privacy={s}
      />
    </main>
  );
}
