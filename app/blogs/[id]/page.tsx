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
import { getBlogById } from "@/lib/blogApi";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for social sharing
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  
  try {
    const blog = await getBlogById(unwrappedParams.id);
    
    return {
      title: `${blog.title} - Sisya Class`,
      description: blog.des || "Check out this amazing blog post on Sisya Class",
      openGraph: {
        title: blog.title,
        description: blog.des || "Check out this amazing blog post on Sisya Class",
        url: `https://sisyaclass.xyz/blogs/${unwrappedParams.id}`,
        images: [
          {
            url: blog.banner || "/blogs/blogimage.svg",
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        type: "article",
        siteName: "Sisya Class",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.des || "Check out this amazing blog post on Sisya Class",
        images: [blog.banner || "/blogs/blogimage.svg"],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    return {
      title: "Blog Post - Sisya Class",
      description: "Check out this amazing blog post on Sisya Class",
    };
  }
}

function BlogDetailPageContent({ id, blogData }: { id: string; blogData: any }) {
  return (
    <Container>
      <Navbar />
      <BlogBreadcrumb blogTitle={blogData?.title || "Blog Post Title"} />
      <div className="w-full">
        <BlogDetailContent blogId={id} blogData={blogData} />
      </div>
      
      {/* Author & Comments Section - Separate from BlogDetailContent */}
      <div className="w-full py-6 sm:py-8 md:py-10">
        <BlogAuthorComments blogId={id} />
      </div>
      
      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
    </Container>
  );
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const unwrappedParams = await params;
  
  // Fetch blog data on the server side
  let blogData = null;
  try {
    blogData = await getBlogById(unwrappedParams.id);
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }
  
  return (
    <MobileMenuProvider>
      <BlogDetailPageContent id={unwrappedParams.id} blogData={blogData} />
    </MobileMenuProvider>
  );
}

