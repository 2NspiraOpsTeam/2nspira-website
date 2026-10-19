import Link from "next/link";
import BreadcrumbList from "@/components/BreadcrumbList";
import { catalogPages, type CatalogPage } from "@/content/catalog/seo";

export default function CatalogBreadcrumbs({ page }: { page: CatalogPage }) {
  const items = [{ name: "Home", url: "/" }];
  if (page !== "books" && page !== "shop") items.push({ name: "Shop", url: "/shop" });
  items.push({ name: catalogPages[page].name, url: catalogPages[page].path });
  return <>
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-body sm:px-6">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, index) => <li key={item.url} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">›</span>}
          {index === items.length - 1
            ? <span aria-current="page" className="inline-flex min-h-[44px] items-center text-ink">{item.name}</span>
            : <Link href={item.url} className="inline-flex min-h-[44px] items-center rounded px-1 underline decoration-line-strong underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{item.name}</Link>}
        </li>)}
      </ol>
    </nav>
    <BreadcrumbList items={items} />
  </>;
}
