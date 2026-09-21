import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "2Nspira";
const siteDomain = "https://2nspira.com";
const siteDescription =
  "We help organizations modernize systems, adopt AI responsibly, and strengthen technology leadership to turn complexity into practical, measurable progress.";
const socialTitle = "Human-centered technology transformation for the AI era";
const socialImageUrl = `${siteDomain}/images/logo/og-image-v2.png`;
export const metadata: Metadata = {
  title: {
    default: `${siteName} | Technology Transformation & AI`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "AI enablement",
    "AI governance",
    "technology transformation",
    "systems optimization",
    "fractional CTO",
    "practical AI adoption",
    "human-centered technology",
    "process optimization",
    "technology leadership",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  metadataBase: new URL(siteDomain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteDomain,
    title: socialTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "2Nspira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: siteDescription,
    images: [socialImageUrl],
  },
  icons: {
    icon: [
      { url: "/images/logo/favicon-transparent-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo/favicon-transparent-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo/favicon-transparent-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/logo/favicon-transparent-64.png", sizes: "64x64", type: "image/png" },
      { url: "/images/logo/favicon-transparent.ico", type: "image/x-icon" },
    ],
    apple: "/images/logo/apple-touch-icon-transparent.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://2nspira.com/#organization",
        name: "2Nspira",
        url: "https://2nspira.com",
        logo: {
          "@type": "ImageObject",
          url: "https://2nspira.com/images/logo/2nspira-logo.png",
          width: 320,
          height: 132,
        },
        description:
          "Human-centered technology transformation and practical AI adoption — specializing in AI enablement, systems optimization, and fractional technology leadership.",
        email: "hello@2nspira.com",
        telephone: "+1-646-543-0199",
        address: {
          "@type": "PostalAddress",
          streetAddress: "11215 72nd Rd",
          addressLocality: "Forest Hills",
          addressRegion: "NY",
          addressCountry: "US",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@2nspira.com",
          telephone: "+1-646-543-0199",
          contactType: "customer support",
        },
        founder: {
          "@type": "Person",
          name: "Jeffrey Cortez",
          sameAs: ["https://www.linkedin.com/in/jeffreyvcortez"],
        },
        sameAs: [
          "https://www.linkedin.com/company/2nspira",
          "https://www.instagram.com/2nspira/",
          "https://www.youtube.com/@2Nspira",
          "https://github.com/2NspiraOpsTeam",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://2nspira.com/#website",
        url: "https://2nspira.com",
        name: "2Nspira",
        publisher: { "@id": "https://2nspira.com/#organization" },
      },
    ],
  };
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><Analytics>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        {children}
        <Footer />
      </Analytics>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </body>
    </html>
  );
}
