import { publicStudio, type Studio } from "./model";
export function studioVideoIds(content: Studio, groupId: string): string[] {
  const c=publicStudio(content);
  const categories=c.categories.filter(cat=>cat.groupIds.includes(groupId)).map(cat=>cat.id);
  return c.items.filter(item=>item.categoryIds.some(id=>categories.includes(id))).flatMap(item=>{
    try {const u=new URL(item.url);return ["www.youtube.com","youtube.com"].includes(u.hostname) && u.pathname==="/watch" && u.searchParams.has("v") ? [u.searchParams.get("v")!] : [];}catch{return [];}
  });
}
