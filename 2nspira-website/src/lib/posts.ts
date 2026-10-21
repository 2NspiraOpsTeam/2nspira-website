import index from "@/content/posts/index.json";
import compiled from "@/content/generated/posts.json";

export const posts = index;
export const fullPosts = compiled;
export const getPost = (slug: string) => fullPosts.find(post => post.slug === slug);
export const displayDate = (date: string) => new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
