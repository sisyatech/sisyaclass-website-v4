// Blog API service functions
const API_BASE_URL = 'https://sisyaclass.xyz/student';

// Utility function to safely extract text content for read time calculation
export const extractTextContent = (content: any): string => {
  if (!content) return '';
  
  if (typeof content === 'string') {
    return content;
  } else if (typeof content === 'object' && content !== null) {
    // If content is an object, try to extract text from it
    if (content.content) {
      return typeof content.content === 'string' ? content.content : JSON.stringify(content.content);
    } else if (content.des) {
      return typeof content.des === 'string' ? content.des : JSON.stringify(content.des);
    } else {
      return JSON.stringify(content);
    }
  } else {
    return String(content);
  }
};

// Utility function to fix profile image URLs
export const fixProfileImageUrl = (url: string | undefined): string => {
  if (!url) return "/girl.svg"; // Default fallback
  
  console.log('🔍 Original profile URL:', url);
  
  // If it's already a full URL with /student, return as is
  if (url.includes('/student/')) {
    console.log('✅ URL already has /student, returning as-is');
    return url;
  }
  
  // If it's a full URL without /student, add /student
  if (url.startsWith('https://sisyaclass.xyz/') && !url.includes('/student/')) {
    const fixedUrl = url.replace('https://sisyaclass.xyz/', 'https://sisyaclass.xyz/student/');
    console.log('🔧 Fixed URL:', fixedUrl);
    return fixedUrl;
  }
  
  // If it's a relative path, assume it's already correct
  if (url.startsWith('/')) {
    console.log('📁 Relative path, returning as-is');
    return url;
  }
  
  // For any other case, return as is
  console.log('❓ Unknown URL format, returning as-is');
  return url;
};

// Calculate read time from any content type
export const calculateReadTime = (content: any): string => {
  const textContent = extractTextContent(content);
  if (!textContent) return "1 Min Read";
  
  const wordsPerMinute = 200;
  const wordCount = textContent.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} Min Read`;
};

export interface Blog {
  id: string;
  title: string;
  banner: string;
  des: string;
  content: string;
  authorName: string;
  authorProfile: string;
  publishedAt: string;
  activityLikes: number;
  activityComments: number;
  activityReads: number;
  activityParentComments: number;
  tags: Array<{
    tag: {
      id: string;
      name: string;
    };
  }>;
  likedBy?: Array<{
    userId: string;
  }>;
  comments?: Array<{
    id: string;
    comment: string;
    commentedAt: string;
    isReply: boolean;
    parentId?: string;
    commentedBy: {
      id: string;
      name: string;
      profile?: string;
    };
    children?: Array<{
      id: string;
      comment: string;
      commentedAt: string;
      commentedBy: {
        id: string;
        name: string;
        profile?: string;
      };
    }>;
  }>;
}

export interface BlogListResponse {
  total: number;
  page: number;
  limit: number;
  blogs: Blog[];
  cached?: boolean;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  comment: string;
  commentedAt: string;
  isReply: boolean;
  parentId?: string;
  commentedBy: {
    id: string;
    name: string;
    profile?: string;
  };
  children?: Comment[];
}

// Get all blogs with pagination
export const getAllBlogs = async (page: number = 1, limit: number = 10): Promise<BlogListResponse> => {
  try {
    console.log('🔍 Fetching blogs - Page:', page, 'Limit:', limit);
    console.log('📡 API URL:', `${API_BASE_URL}/get_all_blogs`);
    
    const response = await fetch(`${API_BASE_URL}/get_all_blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page, limit }),
    });

    console.log('📊 Response status:', response.status);
    console.log('✅ Response ok:', response.ok);

    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const data = await response.json();
    console.log('📝 Blogs API Response:', data);
    console.log('📈 Total blogs:', data.total);
    console.log('📄 Blogs count:', data.blogs?.length || 0);
    
    if (data.blogs && data.blogs.length > 0) {
      console.log('📋 Sample blog data:', data.blogs[0]);
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching blogs:', error);
    throw error;
  }
};

// Get blog by ID
export const getBlogById = async (id: string): Promise<Blog> => {
  try {
    console.log('🔍 Fetching blog by ID:', id);
    console.log('📡 API URL:', `${API_BASE_URL}/get_blog_by_id`);
    
    const response = await fetch(`${API_BASE_URL}/get_blog_by_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    console.log('📊 Response status:', response.status);
    console.log('✅ Response ok:', response.ok);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog not found');
      }
      throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📝 Blog by ID API Response:', data);
    console.log('📋 Blog title:', data.title);
    console.log('👤 Blog author:', data.authorName);
    console.log('🏷️ Blog tags:', data.tags?.length || 0);
    
    // Check if the response contains an error
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
    throw error;
  }
};

// Toggle like on blog
export const toggleLikeBlog = async (blogId: string, userId: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/toggle_like_blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle like');
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

// Add comment to blog
export const addComment = async (
  blogId: string,
  comment: string,
  commentedById: string,
  parentId?: string
): Promise<Comment> => {
  try {
    const response = await fetch(`${API_BASE_URL}/add_comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId, comment, commentedById, parentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add comment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Update blog read count
export const updateBlogReadCount = async (blogId: string): Promise<{ success: boolean; updatedReads: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/update_blog_read_count`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId }),
    });

    if (!response.ok) {
      throw new Error('Failed to update read count');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating read count:', error);
    throw error;
  }
};

// Get all tags
export const getAllTags = async (): Promise<Tag[]> => {
  try {
    console.log('🔍 Fetching all tags');
    console.log('📡 API URL:', `${API_BASE_URL}/get_all_tags`);
    
    const response = await fetch(`${API_BASE_URL}/get_all_tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📊 Response status:', response.status);
    console.log('✅ Response ok:', response.ok);

    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }

    const data = await response.json();
    console.log('📝 Tags API Response:', data);
    console.log('🏷️ Total tags:', data.length);
    
    if (data.length > 0) {
      console.log('📋 Sample tags:', data.slice(0, 3));
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching tags:', error);
    throw error;
  }
};

// Get nested comments
export const getNestedComments = async (blogId: string): Promise<{ blogId: string; comments: Comment[]; cached?: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_nested_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Get trending blogs
export const getTrendingBlogs = async (): Promise<{ trending: Blog[]; cached?: boolean }> => {
  try {
    console.log('🔍 Fetching trending blogs');
    console.log('📡 API URL:', `${API_BASE_URL}/get_trending_blogs`);
    
    const response = await fetch(`${API_BASE_URL}/get_trending_blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📊 Response status:', response.status);
    console.log('✅ Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Failed to fetch trending blogs: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📝 Trending blogs API response:', data);
    console.log('🔥 Trending blogs count:', data.trending?.length || 0);
    
    if (data.trending && data.trending.length > 0) {
      console.log('📋 Sample trending blog:', data.trending[0]);
    }
    
    // Check if the response contains an error
    if (data.error) {
      throw new Error(data.error);
    }

    // Ensure the response has the expected structure
    if (!data.trending || !Array.isArray(data.trending)) {
      console.warn('⚠️ Unexpected trending blogs response structure:', data);
      return { trending: [] };
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching trending blogs:', error);
    throw error;
  }
};

// Generate blog asset upload URL
export const generateBlogAssetUploadUrl = async (): Promise<{ uploadUrl: string; filePath: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/gen_blog_asset_upload_url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to generate upload URL');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw error;
  }
};
