// News API functions
import { API_BASE_URL, API_ENDPOINTS } from './config';

// Types
export interface News {
  id: string;
  title: string;
  des: string; // description field from API
  content: any;
  authorName: string;
  authorProfile: string;
  publishedAt: string;
  banner: string; // thumbnail field from API is called 'banner'
  category?: string;
  trending?: boolean;
  featured?: boolean;
  activityReads?: number;
  tags?: { tag: { id: string; name: string } }[];
}

export interface Tag {
  id: string;
  name: string;
}

// Utility functions
export const extractTextContent = (content: any): string => {
  if (typeof content === 'string') {
    return content;
  }
  
  if (content && typeof content === 'object') {
    if (content.content) {
      return extractTextContent(content.content);
    }
    if (content.des) {
      return extractTextContent(content.des);
    }
    if (Array.isArray(content)) {
      return content.map(item => extractTextContent(item)).join(' ');
    }
  }
  
  return '';
};

export const calculateReadTime = (content: any): string => {
  const text = extractTextContent(content);
  if (!text) return "1 Min Read";
  
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} Min Read`;
};

export const fixProfileImageUrl = (url: string | undefined): string => {
  if (!url) return '/girl.svg';
  
  // If it's already a complete URL, return as is
  if (url.startsWith('http')) {
    // Fix sisyaclass.xyz profile URLs by adding /student/ path if missing
    if (url.includes('sisyaclass.xyz') && !url.includes('/student/')) {
      const fixedUrl = url.replace('sisyaclass.xyz', 'sisyaclass.xyz/student');
      console.log('🔧 Fixed profile URL:', url, '->', fixedUrl);
      return fixedUrl;
    }
    return url;
  }
  
  // If it's a relative path, return as is
  return url;
};

// API Functions
export const getAllNews = async (page: number = 1, limit: number = 10) => {
  try {
    console.log('📰 getAllNews: Fetching news...', { page, limit });
    
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_NEWS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page, limit }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    console.log('📰 getAllNews: Received response:', data);
    console.log('📰 getAllNews: Sample news data:', data.newsList?.[0]);
    
    // Transform the response to match expected structure
    return {
      total: data.total,
      page: data.page,
      limit: data.limit,
      news: data.newsList || []
    };
  } catch (error) {
    console.error('❌ getAllNews: Error fetching news:', error);
    throw error;
  }
};

export const getNewsById = async (id: string) => {
  try {
    console.log('📰 getNewsById: Fetching news by ID:', id);
    console.log('📰 getNewsById: API URL:', `${API_BASE_URL}${API_ENDPOINTS.GET_NEWS_BY_ID}`);
    
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_NEWS_BY_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    console.log('📰 getNewsById: Response status:', response.status);
    console.log('📰 getNewsById: Response headers:', response.headers.get('content-type'));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('📰 getNewsById: Error response:', errorText);
      
      if (response.status === 404) {
        throw new Error('News not found');
      }
      throw new Error(`Failed to fetch news: ${response.status} - ${errorText.substring(0, 100)}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      console.error('📰 getNewsById: Non-JSON response:', responseText.substring(0, 200));
      throw new Error('Server returned non-JSON response');
    }

    const data = await response.json();
    console.log('📰 getNewsById: Received response:', data);
    
    return data;
  } catch (error) {
    console.error('❌ getNewsById: Error fetching news:', error);
    throw error;
  }
};

export const getAllTags = async () => {
  try {
    console.log('📰 getAllTags: Fetching tags...');
    
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_TAGS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }

    const data = await response.json();
    console.log('📰 getAllTags: Received response:', data);
    console.log('📰 getAllTags: Sample tags:', data.slice(0, 3));
    
    return data;
  } catch (error) {
    console.error('❌ getAllTags: Error fetching tags:', error);
    throw error;
  }
};

export const getTrendingNews = async () => {
  try {
    console.log('📰 getTrendingNews: Fetching trending news...');
    
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_TRENDING_NEWS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trending news');
    }

    const data = await response.json();
    console.log('📰 getTrendingNews: Received response:', data);
    
    // Ensure trending is an array
    if (data && data.trending && Array.isArray(data.trending)) {
      console.log('📰 getTrendingNews: Found trending news:', data.trending.length);
      return data;
    } else {
      console.log('📰 getTrendingNews: No trending news found or invalid format');
      return { trending: [] };
    }
  } catch (error) {
    console.error('❌ getTrendingNews: Error fetching trending news:', error);
    // Return empty array on error
    return { trending: [] };
  }
};
