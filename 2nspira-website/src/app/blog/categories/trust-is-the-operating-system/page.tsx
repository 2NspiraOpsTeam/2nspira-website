import type { Metadata } from "next";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
export const metadata:Metadata={title:"Trust Is the Operating System",description:"Selected essays on trust, judgment, and organizational resilience by Jeffrey Cortez.",alternates:{canonical:"/blog/categories/trust-is-the-operating-system"}};
export default function Page(){return <main className="flex-1 bg-zinc-50 dark:bg-black"><header className="mx-auto max-w-4xl px-4 pt-16 sm:px-6"><Link href="/insights" className="rounded text-blue-700 underline dark:text-blue-400">← All insights</Link><h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Trust Is the Operating System</h1><p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">Selected essays on the invisible infrastructure of leadership.</p></header><BlogLibrary category="trust-is-the-operating-system" /></main>;}
