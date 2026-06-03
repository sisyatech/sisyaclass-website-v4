import { Metadata } from "next";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import WebPageDetail from "@/components/webpages/WebPageDetail";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";
import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { getWebPageBySlug, type WebPage } from "@/lib/webPageApi";

interface WebPageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: WebPageProps): Promise<Metadata> {
  const { type, slug } = await params;
  try {
    const page = await getWebPageBySlug(slug);
    const fallbackTitle = `${page.title} - Sisya Class`;
    const fallbackDes = page.des || "Check out this page on Sisya Class";
    
    const imageUrl = page.banner?.startsWith("http")
      ? page.banner
      : `https://sisyaclass-website-v4.vercel.app/blogs/blogimage.svg`;
    
    const title = page.metaTitle || fallbackTitle;
    const description = page.metaDescription || fallbackDes;
    const canonical = page.canonicalUrl || `https://sisyaclass-website-v4.vercel.app/web-pages/${type}/${slug}`;
    const robots = page.robotsTag || (page.isIndexable === false ? "noindex, nofollow" : "index, follow");

    const ogTitle = (page.openGraph as any)?.title || title;
    const ogDescription = (page.openGraph as any)?.description || description;
    const ogImage = (page.openGraph as any)?.image || imageUrl;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: (page.openGraph as any)?.url || `https://sisyaclass-website-v4.vercel.app/web-pages/${type}/${slug}`,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: page.bannerAlt || page.title,
          },
        ],
        type: "article",
        siteName: (page.openGraph as any)?.siteName || "Sisya Class",
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: "Web Page - Sisya Class",
      description: "Sisya Class Web Page",
    };
  }
}

function WebPageContent({ type, slug, initialData }: { type: string; slug: string; initialData: WebPage | null }) {
  return (
    <Container>
      <Navbar />
      <WebPageDetail slug={slug} initialData={initialData} />
      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
      <SocialFab />
      <WhatsAppFab />
    </Container>
  );
}

export default async function WebPage({ params }: WebPageProps) {
  const { type, slug } = await params;
  
  const [webPageData, schemas] = await Promise.all([
    getWebPageBySlug(slug).catch(() => null),
    getPageSchemas('webpage', slug)
  ]);
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <WebPageContent type={type} slug={slug} initialData={webPageData} />
    </MobileMenuProvider>
  );
}
