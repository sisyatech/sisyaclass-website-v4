import sitemap from "../sitemap";

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';
const URLSET_OPEN =
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
const URLSET_CLOSE = "</urlset>";

const formatDate = (date?: string | Date) => {
  if (!date) return undefined;
  return typeof date === "string" ? date : date.toISOString();
};

const createUrlEntry = (entry: Awaited<ReturnType<typeof sitemap>>[number]) => {
  const parts = [
    "  <url>",
    `    <loc>${entry.url}</loc>`,
  ];

  const lastMod = formatDate(entry.lastModified);
  if (lastMod) {
    parts.push(`    <lastmod>${lastMod}</lastmod>`);
  }

  if (entry.changeFrequency) {
    parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
  }

  if (typeof entry.priority === "number") {
    parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
  }

  if (entry.images?.length) {
    entry.images.forEach((image) => {
      parts.push("    <image:image>");
      parts.push(`      <image:loc>${image}</image:loc>`);
      parts.push("    </image:image>");
    });
  }

  parts.push("  </url>");

  return parts.join("\n");
};

export async function GET() {
  const entries = await sitemap();
  const body = [
    XML_HEADER,
    URLSET_OPEN,
    ...entries.map(createUrlEntry),
    URLSET_CLOSE,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}


