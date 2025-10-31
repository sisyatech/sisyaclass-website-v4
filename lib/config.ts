// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sisyaclass.xyz';

// API Endpoints
export const API_ENDPOINTS = {
  // Course related
  GET_BIG_COURSE_BY_GRADE: '/student/get_big_course_web_by_grade',
  GET_CLASS_CARD: '/student/get_class_card',
  
  // Mentor related
  GET_MENTOR_DETAILS: '/student/get_mentor_details_web',
  GET_MENTOR_RATING: '/student/get_mentor_rating',
  
  // User related
  LOGIN_USER: '/student/login_user',
  VERIFY_OTP: '/student/verify_otp_login_user',
  COMPLETE_REGISTRATION: '/student/complete_user_reg',
  GET_USER: '/student/user',
  
  // Blog related
  GET_ALL_BLOGS: '/student/get_all_blogs',
  GET_BLOG_BY_ID: '/student/get_blog_by_id',
  TOGGLE_LIKE_BLOG: '/student/toggle_like_blog',
  ADD_COMMENT: '/student/add_comment',
  UPDATE_BLOG_READ_COUNT: '/student/update_blog_read_count',
  GET_ALL_TAGS: '/student/get_all_tags',
  GET_NESTED_COMMENTS: '/student/get_nested_comments',
  GET_TRENDING_BLOGS: '/student/get_trending_blogs',
  GENERATE_BLOG_ASSET_UPLOAD_URL: '/student/gen_blog_asset_upload_url',
  
  // News related
  GET_ALL_NEWS: '/student/get_all_news',
  GET_NEWS_BY_ID: '/student/get_news_by_id',
  GET_TRENDING_NEWS: '/student/get_trending_news',
  
  // Other
  GET_TESTIMONIAL_CARD: '/student/get_testimonial_card',
  GET_TESTIMONIAL_REEL: '/student/get_testimonial_reel',
  GET_WEB_LINKS: '/student/get_web_links',
  GET_ALL_FEATURE_SHOWCASE_SECTION: '/student/get_all_feature_showcase_section',
  GET_ALL_FACULTY_MEMBER_CARD: '/student/get_all_faculty_member_card',
  CREATE_MERRITTO_LEAD: '/student/create_merrito_lead',
  // Web banners/videos
  GET_ALL_WEB_BANNERS: '/student/get_all_web_banners',
  GET_ALL_WEB_VIDEOS: '/student/get_all_web_videos',
};

// Image URLs
export const IMAGE_URLS = {
  MENTOR_COVER: (mentorId: number) => `${API_BASE_URL}/student/thumbs/mentors/cover/${mentorId}.jpg`,
  MENTOR_PROFILE: (mentorId: number) => `${API_BASE_URL}/student/thumbs/mentors/${mentorId}.jpg`,
  USER_PROFILE: (userId: string) => `${API_BASE_URL}/student/thumbs/users/${userId}.jpg`,
};
