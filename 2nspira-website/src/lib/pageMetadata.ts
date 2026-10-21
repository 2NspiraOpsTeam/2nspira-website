import type { Metadata } from "next";

const origin = "https://2nspira.com";
const image = `${origin}/images/logo/og-image-v2.png`;

/** Route-owned public metadata: never inherit a homepage social URL/title. */
export function publicPageMetadata({ title, description, path, shareTitle = title }: { title: string; description: string; path: string; shareTitle?: string }): Metadata {
  const url = new URL(path, origin).href;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_US", siteName: "2Nspira", url, title: shareTitle, description,
      images: [{ url: image, width: 1200, height: 630, alt: "2Nspira" }] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [image] },
  };
}
