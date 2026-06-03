import { Metadata } from "next";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { BlogBreadcrumb } from "@/components/blogs/BlogBreadcrumb";
import BlogDetailContent from "@/components/blogs/blogsdetailspage/BlogDetailContent";
import BlogAuthorComments from "@/components/blogs/blogsdetailspage/BlogAuthorComments";
import { getBlogBySlug } from "@/lib/blogApi";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";
import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for social sharing
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  
  try {
    const blog = await getBlogBySlug(unwrappedParams.slug);

    const fallbackTitle = `${blog.title} - Sisya Class`;
    const fallbackDes = blog.des || "Check out this amazing blog post on Sisya Class";
    
    const imageUrl = blog.banner?.startsWith("http")
      ? blog.banner
      : `https://sisyaclass-website-v4.vercel.app/blogs/blogimage.svg`;
    
    const title = blog.metaTitle || fallbackTitle;
    const description = blog.metaDescription || fallbackDes;
    
    const ogTitle = blog.openGraph?.title || title;
    const ogDescription = blog.openGraph?.description || description;
    const ogImage = blog.openGraph?.image || imageUrl;
    
    return {
      title,
      description,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `https://sisyaclass-website-v4.vercel.app/blogs/${unwrappedParams.slug}`,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: blog.bannerAlt || blog.title,
          },
        ],
        type: "article",
        siteName: blog.openGraph?.site_name || "Sisya Class",
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
      },
      ...(blog.canonicalUrl ? { alternates: { canonical: blog.canonicalUrl } } : {}),
      robots: {
        index: blog.isIndexable !== false,
        follow: blog.robotsTag ? blog.robotsTag.includes('follow') : true,
      }
    };
  } catch (error) {
    //console.error('Error generating metadata:', error);
    
    return {
      title: "Blog Post - Sisya Class",
      description: "Check out this amazing blog post on Sisya Class",
    };
  }
}

function BlogDetailPageContent({ slug, blogData }: { slug: string; blogData: any }) {
  const actualBlogId = slug; 

  return (
    <Container>
      <Navbar />
      <BlogBreadcrumb blogTitle={blogData?.title || "Blog Post Title"} />
      <div className="w-full">
        <BlogDetailContent blogId={actualBlogId} blogData={blogData} />
      </div>
      
      {/* Author & Comments Section - Separate from BlogDetailContent */}
      <div className="w-full py-6 sm:py-8 md:py-10">
        <BlogAuthorComments blogId={actualBlogId} />
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

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const unwrappedParams = await params;
  
  // Parallel fetch for content + schemas
  const [blogData, schemas] = await Promise.all([
    getBlogBySlug(unwrappedParams.slug).catch(() => null),
    getPageSchemas('blog', unwrappedParams.slug)
  ]);
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <BlogDetailPageContent slug={unwrappedParams.slug} blogData={blogData} />
    </MobileMenuProvider>
  );
}
