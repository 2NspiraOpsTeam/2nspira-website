import { catalogPages } from "@/content/catalog/seo";
import type { Metadata } from "next";
import ShopCollection from "@/components/shop/ShopCollection";
import { printables } from "@/content/shop/products";

const description = catalogPages.printables.description;
export const metadata: Metadata = {
  title: catalogPages.printables.title,
  description,
  alternates: { canonical: "/shop/printables-games" },
  openGraph: { type: "website", siteName: "2Nspira", title: "Print, play, and make a little room for joy", description, url: "https://2nspira.com/shop/printables-games", images: [{ url: "https://2nspira.com/images/shop/thanksgiving-family-games.jpg", width: 1080, height: 1080, alt: "Thanksgiving Table Games printable cover" }] },
  twitter: { card: "summary_large_image", title: "Print, play, and make a little room for joy", description, images: ["https://2nspira.com/images/shop/thanksgiving-family-games.jpg"] },
};

export default function PrintablesPage() {
  return <ShopCollection title="Printables & Games" description="Small moments, shared laughter, and a little creative calm. Pick something to print and enjoy together—or at your own pace." current="printables" products={printables} />;
}
