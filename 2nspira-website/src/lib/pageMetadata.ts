import type { Metadata } from "next";

const origin = "https://2nspira.com";
const defaultImage = "/images/logo/og-image-v2.png";

/** Route-owned public metadata: never inherit a homepage social URL/title. */
export function publicPageMetadata({
  title,
  description,
  path,
  shareTitle = title,
  image = defaultImage,
}: {
  title: string;
  description: string;
  path: string;
  shareTitle?: string;
  image?: string;
}): Metadata {
  const url = new URL(path, origin).href;
  const socialImage = new URL(image, origin).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "2Nspira",
      url,
      title: shareTitle,
      description,
      images: [
        {
          url: socialImage,
          ...(image === defaultImage
            ? { width: 1200, height: 630 }
            : { width: 1440, height: 1000 }),
          alt: shareTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [socialImage],
    },
  };
}
