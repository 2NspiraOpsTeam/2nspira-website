"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Job } from "@/lib/careers/model";
export default function Openings() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    fetch("/api/careers", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw Error();
        const d = await r.json();
        if (active) {
          setJobs(d.jobs);
          setError(false);
        }
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [retry]);
  return (
    <div className="mt-8 text-left" aria-live="polite">
      {error ? (
        <div role="alert">
          Openings could not be loaded.{" "}
          <button className="underline" onClick={() => setRetry((x) => x + 1)}>
            Try again
          </button>
        </div>
      ) : jobs === null ? (
        <p>Loading openings…</p>
      ) : !jobs.length ? (
        <p className="text-center">There are no open positions at this time.</p>
      ) : (
        <ul className="grid gap-5">
          {jobs.map((j) => (
            <li
              key={j.id}
              className="rounded-2xl border border-line bg-canvas p-6"
            >
              <h3 className="text-xl font-semibold">
                <Link
                  className="underline decoration-accent underline-offset-4"
                  href={`/careers/${j.id}`}
                >
                  {j.title}
                </Link>
              </h3>
              <p className="mt-3">
                {j.location} · {j.employmentType}
              </p>
              <p className="mt-2">{j.compensation}</p>
              <Link
                className="mt-5 inline-block font-semibold underline"
                href={`/careers/${j.id}`}
              >
                View role and apply →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
