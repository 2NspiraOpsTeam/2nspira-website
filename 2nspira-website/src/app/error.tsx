"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonPrimary } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 py-12 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-semibold tracking-tight text-ink">500</h1>
        <h2 className="mt-4 text-2xl font-semibold text-ink">Something went wrong</h2>
        <p className="mt-4 text-lg text-body">
          We encountered an unexpected error. Please try again later.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonPrimary}>
            Return Home
          </Link>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-base font-medium text-body transition-colors duration-300 ease-gentle hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}
