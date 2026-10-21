import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, displayDate } from "@/lib/posts";
import { getPostSeoTitle } from "@/lib/postSeo";
import { caption, linkInline, pageMain } from "@/components/ui";
import { articleReading } from "@/lib/articleReading";
import Reveal from "@/components/Reveal";
import BreadcrumbList from "@/components/BreadcrumbList";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(post=>({slug:post.slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const articleUrl = `https://2nspira.com/post/${post.slug}`;
  const seoTitle = getPostSeoTitle(post.slug, post.title);
  return {
    title: { absolute: `${seoTitle} | 2Nspira` },
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: articleUrl },
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: "2Nspira",
      title: post.title,
      description: post.description,
      url: articleUrl,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: `Featured image for ${post.title}` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}
export default async function PostPage({params}:Props) {
  const post=getPost((await params).slug);
  if(!post) notFound();
  const reading = articleReading(post.html, post.slug);
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const articleUrl = `https://2nspira.com/post/${post.slug}`;
  const structured={"@context":"https://schema.org","@type":"BlogPosting","@id":`${articleUrl}#article`,headline:post.title,description:post.description,url:articleUrl,inLanguage:"en-US",datePublished:post.datePublished,dateModified:post.dateModified,author:{"@type":"Person",name:post.author},publisher:{"@id":"https://2nspira.com/#organization"},isPartOf:{"@id":"https://2nspira.com/#website"},mainEntityOfPage:{"@type":"WebPage","@id":articleUrl},image:post.image?`https://2nspira.com${post.image}`:undefined};
  return <main className={pageMain} id="main-content"><BreadcrumbList items={[{name:"Home",url:"/"},{name:"Insights",url:"/insights"},{name:post.title,url:`/post/${post.slug}`}]} /><article className="py-16 sm:py-24"><header className="mx-auto max-w-3xl px-4 sm:px-6"><Link href="/insights" className={linkInline}>← All insights</Link><h1 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">{post.title}</h1><p className={`mt-6 ${caption}`}>By {post.author} · {reading.minutes} min read · <time dateTime={post.datePublished}>{displayDate(post.datePublished)}</time></p>{post.dateModified?.slice(0,10)!==post.datePublished.slice(0,10)&&<p className={`mt-2 ${caption}`}>Updated <time dateTime={post.dateModified}>{displayDate(post.dateModified)}</time></p>}</header>{post.image&&<figure className="mx-auto mt-10 w-full max-w-6xl sm:px-6"><div className="relative aspect-[16/9] overflow-hidden bg-canvas-deep sm:rounded-2xl"><Image src={post.image} alt={`Featured image for ${post.title}`} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" /></div></figure>}<div className="mx-auto max-w-3xl px-4 sm:px-6">{reading.headings.length > 1 && <nav aria-label="In this article" className="reading-contents mt-10 rounded-2xl border border-line bg-canvas-deep p-5 sm:p-7"><details><summary className="cursor-pointer text-lg font-semibold text-ink">In this article <span className="ml-2 text-sm font-normal text-muted">{reading.headings.length} sections</span></summary><ol className="mt-5 grid list-decimal gap-x-8 gap-y-3 pl-5 sm:grid-cols-2">{reading.headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`} className={linkInline}>{heading.text}</a></li>)}</ol></details></nav>}<div className="article-body mt-12" dangerouslySetInnerHTML={{__html:reading.html}} /><div className="mt-12 border-t border-line pt-8"><Link href="/contact" className={linkInline}>Discuss these ideas with 2Nspira →</Link></div></div><section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6" aria-labelledby="continue-reading"><Reveal><h2 id="continue-reading" className="text-2xl font-semibold tracking-tight text-ink">Continue exploring</h2><p className="mt-3 text-body">More perspectives on technology, people, and leadership.</p></Reveal><div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((item, index) => <Reveal key={item.slug} delay={index * 70}><Link href={`/post/${item.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-soft">{item.image && <div className="relative aspect-[16/9] overflow-hidden"><Image src={item.image} alt={`Featured image for ${item.title}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]" /></div>}<div className="p-5"><h3 className="text-lg font-semibold leading-snug text-ink">{item.title}</h3><p className="mt-3 text-sm leading-7 text-body">{item.description}</p><span className="mt-4 inline-block font-medium text-accent">Read article →</span></div></Link></Reveal>)}</div></section></article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}} /></main>;
}
