import type { Metadata } from "next";
import ShopCollection from "@/components/shop/ShopCollection";
import { artPrints } from "@/content/shop/products";

const description = "Explore Reduce the Noise. Strengthen the Signal., a minimalist physical art print on matte paper. Choose from multiple sizes and purchase on Etsy.";
export const metadata: Metadata = {
  title: "Art Prints | Shop",
  description,
  alternates: { canonical: "/shop/art-prints" },
  openGraph: { type: "website", title: "Art that makes space for clearer thinking", description, url: "https://2nspira.com/shop/art-prints", images: [{ url: "https://2nspira.com/images/shop/reduce-the-noise.jpg", width: 1080, height: 1080, alt: "Reduce the Noise. Strengthen the Signal. art print" }] },
  twitter: { card: "summary_large_image", title: "Art that makes space for clearer thinking", description, images: ["https://2nspira.com/images/shop/reduce-the-noise.jpg"] },
};

export default function ArtPrintsPage() {
  return <ShopCollection title="Art Prints" description="Thoughtful artwork for the places where you pause, reflect, and do your best thinking." current="art" products={artPrints} />;
}
