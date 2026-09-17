import { load } from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
async function get(url) {
  return (await run('curl', ['-fsSL', '--max-time', '40', url], { maxBuffer: 20 * 1024 * 1024 })).stdout;
}
const source = 'https://www.2nspira.com';
const xml = load(await get(source + '/blog-posts-sitemap.xml'), { xmlMode: true });
const urls = xml('url > loc').map((_, el) => xml(el).text()).get();
if (!urls.length) throw new Error('No published posts found');
await mkdir(root + 'src/content/posts', { recursive: true });
await mkdir(root + 'public/images/posts', { recursive: true });
const imageCache = new Map();
async function localImage(url) {
  if (!url) return '';
  if (new URL(url).hostname !== 'static.wixstatic.com') throw new Error('Unexpected image host: ' + url);
  if (imageCache.has(url)) return imageCache.get(url);
  const extension = new URL(url).pathname.match(/\.(png|jpe?g|webp|gif)(?:\/|$)/i)?.[1]?.toLowerCase() || 'jpg';
  const path = '/images/posts/' + createHash('sha256').update(url).digest('hex').slice(0, 16) + '.' + extension;
  await run('curl', ['-fsSL', '--max-time', '40', '--max-filesize', '15000000', url, '-o', root + 'public' + path]);
  imageCache.set(url, path);
  return path;
}
const categoryPage = load(await get(source + '/blog/categories/trust-is-the-operating-system'));
const categoryPosts = new Set(categoryPage('main a[href*="/post/"]').map((_,el)=>categoryPage(el).attr('href')).get());
const posts = [];
for (const url of urls) {
  const $ = load(await get(url));
  const metadata = $('script[type="application/ld+json"]').map((_, node) => {
    try { return JSON.parse($(node).text()); } catch { return null; }
  }).get().find(item => item?.['@type'] === 'BlogPosting');
  const section = $('[data-hook="post-description"]').first();
  if (!metadata || !section.length || section.text().trim().length < 100) throw new Error('Incomplete post: ' + url);
  const sourceText = section.text().replace(/[\s\u200b]+/g, '');
  const unsupported = section.find('iframe,video,audio,table').map((_,el)=>el.tagName).get();
  if (unsupported.length) console.log('REVIEW embedded media:', url, unsupported.join(','));
  for (const element of section.find('img').toArray()) {
    const image = $(element);
    const src = image.attr('src');
    if (src) image.attr('src', await localImage(src));
    image.attr('loading', 'lazy');
  }
  section.find('a').each((_,el) => {
    const href = $(el).attr('href');
    if (href?.startsWith(source + '/')) $(el).attr('href', href.slice(source.length));
  });
  const html = sanitizeHtml(section.html(), {
    allowedTags: ['div','span','p','h2','h3','h4','h5','h6','ul','ol','li','blockquote','strong','b','em','i','u','s','a','br','hr','img','figure','figcaption','table','thead','tbody','tr','th','td','code','pre'],
    allowedAttributes: { a:['href','title'], img:['src','alt','width','height','loading'], th:['colspan','rowspan'],td:['colspan','rowspan'] },
    allowedSchemes: ['http','https','mailto'],
  });
  if (load(html).text().replace(/[\s\u200b]+/g, '') !== sourceText) throw new Error('Text changed during sanitization: ' + url);
  const slug = new URL(url).pathname.split('/').pop();
  const categories = categoryPosts.has(url) ? ['trust-is-the-operating-system'] : [];
  const post = {
    slug, title:metadata.headline, description:metadata.description, author:metadata.author?.name || '2Nspira',
    datePublished:metadata.datePublished, dateModified:metadata.dateModified,
    source:url, categories, image:await localImage(metadata.image?.url || ''), html,
    sourceTextHash:createHash('sha256').update(sourceText).digest('hex'),
  };
  await writeFile(root + 'src/content/posts/' + slug + '.json', JSON.stringify(post, null, 2) + '\n');
  const summary = Object.fromEntries(Object.entries(post).filter(([key]) => key !== "html" && key !== "sourceTextHash"));
  posts.push(summary);
  console.log('Imported', posts.length + '/' + urls.length, slug);
}
posts.sort((a,b) => b.datePublished.localeCompare(a.datePublished));
await writeFile(root + 'src/content/posts/index.json', JSON.stringify(posts, null, 2) + '\n');
console.log('Imported', posts.length, 'posts and', imageCache.size, 'local images');
