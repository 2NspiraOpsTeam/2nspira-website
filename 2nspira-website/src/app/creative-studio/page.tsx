import { permanentRedirect } from "next/navigation";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const q = await searchParams;
  permanentRedirect(
    `/studio${q.category ? `?category=${encodeURIComponent(q.category)}` : ""}`,
  );
}
