import { videos } from "@/content/videos";
import posts from "@/content/posts/index.json";
import {
  activityBooks,
  artPrints,
  leadershipBooks,
  printables,
} from "@/content/shop/products";
import { coloringBooks } from "@/content/shop/coloring-books";
import type { Item, Studio } from "./model";
const item = (
  value: Partial<Item> &
    Pick<Item, "id" | "title" | "description" | "categoryIds">,
): Item => ({
  type: "Article",
  status: "published",
  featured: false,
  image: "",
  imageAlt: "",
  url: "",
  purchaseUrl: "",
  body: "",
  author: "",
  ...value,
});
export function initialStudio(): Studio {
  const leadership = leadershipBooks[0];
  return {
    revision: 0,
    status: "draft",
    intro:
      "Step out of the everyday. Into a story, a new perspective, or a challenge that sparks your curiosity.",
    groups: [
      {
        id: "watch",
        name: "Watch",
        description:
          "Visual stories and fresh perspectives on technology, trust, and leadership.",
        visible: true,
      },
      {
        id: "listen",
        name: "Listen",
        description: "Music & Ambience: original soundscapes and imagined worlds to spend a little time in.",
        visible: true,
      },
      {
        id: "read",
        name: "Read",
        description:
          "Ideas, articles, resources, and introductions to books we author.",
        visible: true,
      },
      {
        id: "play",
        name: "Play",
        description:
          "Creative pauses, coloring, shared challenges, and games for adults and families.",
        visible: true,
      },
    ],
    categories: [
      {
        id: "youtube",
        name: "Our YouTube channel",
        groupIds: ["watch"],
        visible: true,
      },
      {
        id: "music-ambience",
        name: "Music & Ambience",
        groupIds: ["listen"],
        visible: true,
      },
      {
        id: "insights",
        name: "Insights & articles",
        groupIds: ["read"],
        visible: true,
      },
      { id: "resources", name: "Resources", groupIds: ["read"], visible: true },
      {
        id: "authored-books",
        name: "Books we author",
        groupIds: ["read"],
        visible: true,
      },
      {
        id: "collectibles",
        name: "Rare & collectible books",
        groupIds: ["read"],
        visible: true,
      },
      {
        id: "activity-books",
        name: "Activity books",
        groupIds: ["play"],
        visible: true,
      },
      {
        id: "coloring-books",
        name: "Coloring books",
        groupIds: ["play"],
        visible: true,
      },
      {
        id: "printables",
        name: "Printables & games",
        groupIds: ["play"],
        visible: true,
      },
      {
        id: "interactive",
        name: "Games & experiences",
        groupIds: ["play"],
        visible: true,
      },
      { id: "art", name: "Art prints", groupIds: ["play"], visible: true },
    ],
    links: ["watch", "listen", "read", "play"].map((id) => ({
      id,
      name: "",
      groupId: id,
      categoryId: "",
      url: "",
      visible: true,
    })),
    items: [
      item({
        id: "breadcrumb",
        title: "Breadcrumb",
        description:
          "Follow a trail of clues in this browser-based OSINT investigation challenge for curious adults. Test your observation, research, and verification skills.",
        type: "Game",
        categoryIds: ["interactive"],
        status: "published",
        featured: true,
        image: "/images/work/project-breadcrumb.png",
        imageAlt:
          "Breadcrumb project artwork featuring an investigation workspace",
        url: "https://breadcrumb.2nspira.com/",
      }),
      item({
        id: "youtube-channel",
        title: "2Nspira on YouTube",
        description:
          "Explore original rain soundscapes, immersive imagined worlds, creative stories, and perspectives on AI and human-centered leadership. Browse the full video library on our channel.",
        type: "Channel",
        categoryIds: ["youtube"],
        featured: true,
        image: "/images/studio/youtube-channel.svg",
        imageAlt:
          "2Nspira Creative Studio — original soundscapes, creative stories, and fresh perspectives on YouTube",
        url: "https://www.youtube.com/@2Nspira",
      }),
      ...videos.map((v) => item({
        id: `video-${v.id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
        title: v.title,
        description: v.description,
        type: "Video",
        categoryIds: [v.category === "ambience" ? "music-ambience" : "youtube"],
        featured: true,
        image: `/images/videos/${v.id}.jpg`,
        imageAlt: `Preview for ${v.title}`,
        url: `https://www.youtube.com/watch?v=${v.id}`,
      })),
      ...posts.map((p, n) =>
        item({
          id: p.slug,
          title: p.title,
          description: p.description,
          type: "Article",
          categoryIds: ["insights"],
          featured: n === 0,
          image: p.image,
          imageAlt: `Featured image for ${p.title}`,
          url: `/post/${p.slug}`,
          author: p.author,
        }),
      ),
      item({
        id: "ai-readiness-scorecard",
        title: "AI Readiness Scorecard",
        description:
          "Explore your organization’s readiness for practical, responsible AI adoption.",
        type: "Resource",
        categoryIds: ["resources"],
        url: "/resources/ai-readiness-scorecard",
      }),
      item({
        id: "strength-profile",
        title: "Strength Profile",
        description:
          "Reflect on your strengths and discover a clearer way forward.",
        type: "Resource",
        categoryIds: ["resources"],
        url: "/resources/strength-profile",
      }),
      ...(leadership
        ? [
            item({
              id: leadership.id,
              title: leadership.title,
              description: leadership.description,
              type: "Book",
              categoryIds: ["authored-books"],
              featured: true,
              image: leadership.image,
              imageAlt: leadership.imageAlt,
              url: "/books",
              purchaseUrl: leadership.href,
            }),
          ]
        : []),
      item({
        id: "rare-collectible-books",
        title: "The collector’s shelf",
        description:
          "Explore rare, signed, and limited editions, with photographs and condition details for each individual copy at 2Nspira Books.",
        type: "Collection",
        categoryIds: ["collectibles"],
        featured: false,
        image: "/images/shop/rare-books-website.webp",
        imageAlt: "A preview of the 2Nspira rare and collectible bookstore",
        url: "https://books.2nspira.com",
        status: "draft",
      }),
      ...[
        ...activityBooks.map((p) => ({ p, cat: "activity-books" })),
        ...printables.map((p) => ({ p, cat: "printables" })),
        ...artPrints.map((p) => ({ p, cat: "art" })),
      ].map(({ p, cat }) =>
        item({
          id: p.id,
          title: p.title,
          description: p.description,
          type: cat === "activity-books" ? "Book" : "Product",
          categoryIds: [cat],
          featured: cat === "activity-books",
          image: p.image,
          imageAlt: p.imageAlt,
          url: p.href,
          purchaseUrl: p.href,
        }),
      ),
      ...coloringBooks
        .filter((b) => b.href && !b.comingSoon)
        .map((b) =>
          item({
            id: b.id,
            title: b.title,
            description: b.paragraphs[0],
            type: "Book",
            categoryIds: ["coloring-books"],
            image: b.image,
            imageAlt: b.imageAlt,
            url: b.href!,
            purchaseUrl: b.href!,
          }),
        ),
    ],
  };
}
