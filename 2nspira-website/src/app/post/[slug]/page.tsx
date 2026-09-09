import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, displayDate } from "@/lib/posts";

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
  return <main className="flex-1 bg-white py-16 dark:bg-black sm:py-24"><article className="mx-auto max-w-3xl px-4 sm:px-6"><Link href="/insights" className="rounded text-sm font-semibold text-blue-700 underline dark:text-blue-400">← All insights</Link><h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-5xl">{post.title}</h1><p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">By {post.author} · <time dateTime={post.datePublished}>{displayDate(post.datePublished)}</time></p>{post.dateModified?.slice(0,10)!==post.datePublished.slice(0,10)&&<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Updated <time dateTime={post.dateModified}>{displayDate(post.dateModified)}</time></p>}<div className="article-body mt-10 text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{__html:post.html}} /><div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800"><Link href="/contact" className="rounded font-semibold text-blue-700 underline dark:text-blue-400">Discuss these ideas with 2Nspira →</Link></div></article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}} /></main>;
}
