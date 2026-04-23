

import { use } from "react";
import type { Metadata } from "next";
import { getNewsById } from "@/lib/newsApi";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { NewsBreadcrumb } from "@/components/news/NewsBreadcrumb";
import NewsDetailContent from "@/components/news/newsdetailspage/NewsDetailContent";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";
interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function NewsDetailPageContent({ slug }: { slug: string }) {
  // You can fetch the news title here based on the id
  // For now, using a placeholder
  const newsTitle = "News Article Title";

  return (
    <Container>
      <Navbar />
      <NewsBreadcrumb newsTitle={newsTitle} />
      <div className="w-full">
        <NewsDetailContent newsId={slug} />
      </div>
      
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

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const unwrappedParams = use(params);
  
  return (
    <MobileMenuProvider>
      <NewsDetailPageContent slug={unwrappedParams.slug} />
    </MobileMenuProvider>
  );
}

// Social share metadata (OG/Twitter) for News detail page
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  try {
    const news = await getNewsById(unwrappedParams.slug);
    const imageUrl = news.banner?.startsWith("http") ? news.banner : `https://sisyaclass-website-v4.vercel.app/blogs/blogimage.svg`;
    return {
      title: `${news.title} - Sisya Class News`,
      description: news.des || "Latest update from Sisya Class",
      openGraph: {
        title: news.title,
        description: news.des || "Latest update from Sisya Class",
        url: `https://sisyaclass-website-v4.vercel.app/news/${unwrappedParams.slug}`,
        images: [{ url: imageUrl, width: 1200, height: 630, alt: news.title }],
        type: "article",
        siteName: "Sisya Class",
      },
      twitter: {
        card: "summary_large_image",
        title: news.title,
        description: news.des || "Latest update from Sisya Class",
        images: [imageUrl],
      },
    };
  } catch (e) {
    return {
      title: "News - Sisya Class",
      description: "Latest update from Sisya Class",
    };
  }
}
