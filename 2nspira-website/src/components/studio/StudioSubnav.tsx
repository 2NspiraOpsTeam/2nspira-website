"use client";
import Link from "next/link";
import type { NavigationLink } from "@/lib/studio/model";
export default function StudioSubnav({
  links,
  onNavigate,
}: {
  links: NavigationLink[];
  onNavigate: () => void;
}) {
  const groups = [
    { name: "Watch", href: "/studio/watch", matches: /watch|youtube|video/ },
    {
      name: "Read",
      href: "/studio/read",
      matches: /read|books|insights|resources/,
    },
    { name: "Shop", href: "/shop", matches: /shop/ },
  ];
  return (
    <details className="rounded-xl px-3 py-2.5 text-body">
      <summary className="min-h-11 cursor-pointer py-2 font-medium focus-visible:outline-2 focus-visible:outline-accent">
        Creative Studio
      </summary>
      <div className="space-y-1 border-l border-line pl-3">
        <Link
          href="/studio"
          onClick={onNavigate}
          className="block rounded-lg px-2 py-3 hover:bg-accent-soft"
        >
          Explore Creative Studio
        </Link>
        {groups.map((g) => (
          <details key={g.name}>
            <summary className="min-h-11 cursor-pointer rounded-lg px-2 py-3 font-medium focus-visible:outline-2 focus-visible:outline-accent">
              {g.name}
            </summary>
            <div className="border-l border-line pl-3">
              <Link
                href={g.href}
                onClick={onNavigate}
                className="block rounded-lg px-2 py-3 hover:bg-accent-soft"
              >
                Explore {g.name}
              </Link>
              {links
                .filter((l) => l.href !== g.href && g.matches.test(l.href))
                .map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={onNavigate}
                    className="block rounded-lg px-2 py-3 hover:bg-accent-soft"
                  >
                    {l.name}
                  </Link>
                ))}
            </div>
          </details>
        ))}
        {links
          .filter(
            (l) =>
              l.href !== "/studio" &&
              !groups.some((g) => g.matches.test(l.href)),
          )
          .map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onNavigate}
              className="block rounded-lg px-2 py-3 hover:bg-accent-soft"
            >
              {l.name}
            </Link>
          ))}
      </div>
    </details>
  );
}
