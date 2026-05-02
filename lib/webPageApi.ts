import axios from "axios";

export interface WebPage {
  id: string;
  title: string;
  banner: string;
  des: string;
  content: any;
  authorName: string;
  authorProfile: string;
  slug: string;
  type: string;
  publishedAt: string;
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
  bannerAlt?: string;
  canonicalUrl?: string;
  isIndexable?: boolean;
  robotsTag?: string;
  openGraph?: any;
}

const API_BASE_URL = "https://sisyaclass.xyz/student";

export const getWebPageBySlug = async (slug: string): Promise<WebPage> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/get_web_page_by_id`, {
      slug,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching web page:", error);
    throw error;
  }
};
