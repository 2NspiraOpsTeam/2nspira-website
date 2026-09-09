import Link from "next/link";
import { buttonPrimary } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 py-12 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-semibold tracking-tight text-ink">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-ink">Page not found</h2>
        <p className="mt-4 text-lg text-body">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonPrimary}>
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-base font-medium text-body transition-colors duration-300 ease-gentle hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
