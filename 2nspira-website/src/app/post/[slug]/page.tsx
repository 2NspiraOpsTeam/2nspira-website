import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, displayDate } from "@/lib/posts";
import { caption, linkInline, pageMain } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(post=>({slug:post.slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return { title: post.title, description: post.description, alternates: {canonical:`/post/${post.slug}`}, openGraph: {type:"article",title:post.title,description:post.description,url:`https://www.2nspira.com/post/${post.slug}`,publishedTime:post.datePublished,modifiedTime:post.dateModified,authors:[post.author],images:post.image ? [post.image] : []} };
}
export default async function PostPage({params}:Props) {
  const post=getPost((await params).slug);
  if(!post) notFound();
  const structured={"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.description,datePublished:post.datePublished,dateModified:post.dateModified,author:{"@type":"Person",name:post.author},publisher:{"@type":"Organization",name:"2Nspira"},mainEntityOfPage:`https://www.2nspira.com/post/${post.slug}`,image:post.image?`https://www.2nspira.com${post.image}`:undefined};
  return <main className={pageMain}><article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24"><Link href="/insights" className={linkInline}>← All insights</Link><h1 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">{post.title}</h1><p className={`mt-6 ${caption}`}>By {post.author} · <time dateTime={post.datePublished}>{displayDate(post.datePublished)}</time></p>{post.dateModified?.slice(0,10)!==post.datePublished.slice(0,10)&&<p className={`mt-2 ${caption}`}>Updated <time dateTime={post.dateModified}>{displayDate(post.dateModified)}</time></p>}<div className="article-body mt-10" dangerouslySetInnerHTML={{__html:post.html}} /><div className="mt-12 border-t border-line pt-8"><Link href="/contact" className={linkInline}>Discuss these ideas with 2Nspira →</Link></div></article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}} /></main>;
}
