import type { MetadataRoute } from "next";

import { AVAILABLE_GRADES } from "@/lib/navigation/routes";
import { getAllBlogs } from "@/lib/blogApi";
import { getAllNews } from "@/lib/newsApi";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sisyaclass.com";

const DEFAULT_LAST_MODIFIED = new Date().toISOString();

const staticPaths = [
  "/",
  "/about",
  "/blogs",
  "/news",
  "/contact",
  "/careers",
  "/sip",
  "/10thboards",
  "/10thboards/payment/success",
  "/10thboards/payment/failed",
  "/10thboards/terms-and-conditions",
  "/10xboostercourse",
  "/10xboostercourse/payment/success",
  "/10xboostercourse/payment/failed",
  "/3dayslp",
  "/3dayslp/payment/success",
  "/3dayslp/payment/failed",
  "/3worksheet",
  "/3worksheet/payment/success",
  "/3worksheet/payment/failed",
  "/payment/success",
  "/payment/failed",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
];

const CHANGE_FREQUENCIES = {
  STATIC: "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
  GRADE: "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
  DYNAMIC: "daily" as MetadataRoute.Sitemap[number]["changeFrequency"],
};

const getAlternates = (path: string) => {
  const fullUrl = `${BASE_URL}${path}`;
  return {
    canonical: fullUrl,
    languages: {
      "x-default": fullUrl,
    },
  };
};

const mapToSitemap = (
  items: any[],
  base: string,
  key: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  getImage?: (item: any) => string | undefined
): MetadataRoute.Sitemap =>
  items.map((item) => {
    const path = `${base}/${item[key]}`;
    const imageUrl = getImage ? getImage(item) : undefined;
    return {
      url: `${BASE_URL}${path}`,
      lastModified: item.publishedAt
        ? new Date(item.publishedAt).toISOString()
        : DEFAULT_LAST_MODIFIED,
      changeFrequency,
      priority,
      alternates: getAlternates(path),
      images: imageUrl ? [imageUrl] : undefined,
    };
  });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: DEFAULT_LAST_MODIFIED,
    changeFrequency: CHANGE_FREQUENCIES.STATIC,
    priority: path === "/" ? 1 : 0.9,
    alternates: getAlternates(path),
  }));

  const gradeRoutes = (AVAILABLE_GRADES || []).map((g) => ({
    url: `${BASE_URL}/grade${g}`,
    lastModified: DEFAULT_LAST_MODIFIED,
    changeFrequency: CHANGE_FREQUENCIES.GRADE,
    priority: 0.8,
    alternates: getAlternates(`/grade${g}`),
  }));

  const [blogs, news] = await Promise.all([
    getAllBlogs(1, 50).catch((e) => {
      console.error("[sitemap] Blog error:", e);
      return { blogs: [] };
    }),
    getAllNews(1, 50).catch((e) => {
      console.error("[sitemap] News error:", e);
      return { news: [] };
    }),
  ]);

  const blogRoutes = mapToSitemap(
    blogs.blogs || [],
    "/blogs",
    "id",
    CHANGE_FREQUENCIES.DYNAMIC,
    0.7,
    (item) => item.banner
  );
  const newsRoutes = mapToSitemap(
    news.news || [],
    "/news",
    "id",
    CHANGE_FREQUENCIES.DYNAMIC,
    0.7,
    (item) => item.banner
  );

  return [...staticRoutes, ...gradeRoutes, ...blogRoutes, ...newsRoutes];
}
