import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
const siteDomain = "https://www.2nspira.com";
const siteDescription =
  "Human-centered technology transformation and practical AI adoption — specializing in AI enablement, systems optimization, and fractional technology leadership.";
export const metadata: Metadata = {
  title: {
    default: `${siteName} | Human-centered technology transformation and practical AI adoption`,
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
    title: `${siteName} | Human-centered technology transformation and practical AI adoption`,
    description: siteDescription,
    siteName: siteName,
  },
  twitter: {
    card: "summary",
    title: `${siteName} | Human-centered technology transformation and practical AI adoption`,
    description: siteDescription,
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
