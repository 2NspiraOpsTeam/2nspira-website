import { catalogPages } from "@/content/catalog/seo";
import type { Metadata } from "next";
import ShopCollection from "@/components/shop/ShopCollection";
import { artPrints } from "@/content/shop/products";

const description = catalogPages.art.description;
export const metadata: Metadata = {
  title: catalogPages.art.title,
  description,
  alternates: { canonical: "/shop/art-prints" },
  openGraph: { type: "website", siteName: "2Nspira", title: "Art that makes space for clearer thinking", description, url: "https://2nspira.com/shop/art-prints", images: [{ url: "https://2nspira.com/images/shop/reduce-the-noise.jpg", width: 1080, height: 1080, alt: "Reduce the Noise. Strengthen the Signal. art print" }] },
  twitter: { card: "summary_large_image", title: "Art that makes space for clearer thinking", description, images: ["https://2nspira.com/images/shop/reduce-the-noise.jpg"] },
};

export default function ArtPrintsPage() {
  return <ShopCollection title="Art Prints" description="Thoughtful art for shared workspaces, home offices, and spaces for reflection. Explore collaboration, belonging, accountability, empowerment, and focus." current="art" products={artPrints} />;
}
