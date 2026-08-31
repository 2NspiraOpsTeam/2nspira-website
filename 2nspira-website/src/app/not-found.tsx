import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 text-center dark:bg-black">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-white">Page not found</h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-6 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
