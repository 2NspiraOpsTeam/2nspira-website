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
      "A place for curious minds and creative pauses. Watch original worlds come to life, read ideas with a human perspective, and discover books and creative things to make your own.",
    groups: [
      {
        id: "watch",
        name: "Watch",
        description:
          "Original soundscapes, creative stories, and fresh perspectives on technology and leadership.",
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
        id: "shop",
        name: "Shop",
        description:
          "Our published books, rare and collectible editions, and creative products.",
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
        id: "insights",
        name: "Insights & articles",
        groupIds: ["read"],
        visible: true,
      },
      { id: "resources", name: "Resources", groupIds: ["read"], visible: true },
      {
        id: "authored-books",
        name: "Books we author",
        groupIds: ["read", "shop"],
        visible: true,
      },
      {
        id: "collectibles",
        name: "Rare & collectible books",
        groupIds: ["shop"],
        visible: true,
      },
      {
        id: "activity-books",
        name: "Activity books",
        groupIds: ["shop"],
        visible: true,
      },
      {
        id: "coloring-books",
        name: "Coloring books",
        groupIds: ["shop"],
        visible: true,
      },
      {
        id: "printables",
        name: "Printables & games",
        groupIds: ["shop"],
        visible: true,
      },
      { id: "art", name: "Art prints", groupIds: ["shop"], visible: true },
    ],
    links: ["watch", "read", "shop"].map((id) => ({
      id,
      name: "",
      groupId: id,
      categoryId: "",
      url: "",
      visible: true,
    })),
    items: [
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
        featured: true,
        image: "/images/shop/rare-books-website.webp",
        imageAlt: "A preview of the 2Nspira rare and collectible bookstore",
        url: "https://books.2nspira.com",
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
