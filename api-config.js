/**
 * API Configuration File
 *
 * This file contains all API endpoint configurations and settings
 * for the Building Classification website
 */

// API Base Configuration
export const API_CONFIG = {
  // Base URL for API requests
  baseUrl: "https://api.buildinginfo.ir/v1",

  // Alternative base URL for development
  devBaseUrl: "http://localhost:3000/api/v1",

  // Timeout for API requests (in milliseconds)
  timeout: 10000,

  // Retry configuration
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
  },
};

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  loginInitiate: "/auth/login/initiate",
  login: "/auth/login",
  logout: "/auth/logout",
  registerInitiate: "/auth/register/initiate",
  register: "/auth/register",
  refreshToken: "/auth/refresh",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/auth/verify-email",
};

// Analytics Endpoints
export const ANALYTICS_ENDPOINTS = {
  pageView: "/analytics/pageview",
  scroll: "/analytics/scroll",
  timeOnPage: "/analytics/time-on-page",
  articleClick: "/analytics/article/click",
  categoryClick: "/analytics/category/click",
  socialClick: "/analytics/social/click",
  footerClick: "/analytics/footer/click",
  authorConnect: "/analytics/author/connect",
  externalLink: "/analytics/external-link",
  tableInteraction: "/analytics/table-interaction",
  downloadClick: "/analytics/download/click",
  videoPlay: "/analytics/video/play",
  formInteraction: "/analytics/form/interaction",
};

// Content Endpoints
export const CONTENT_ENDPOINTS = {
  articles: "/articles",
  articleById: (id) => `/articles/${id}`,
  categories: "/categories",
  categoryById: (id) => `/categories/${id}`,
  search: "/search",
  relatedArticles: (id) => `/articles/${id}/related`,
  popularArticles: "/articles/popular",
  recentArticles: "/articles/recent",
};

// Newsletter Endpoints
export const NEWSLETTER_ENDPOINTS = {
  subscribe: "/newsletter/subscribe",
  unsubscribe: "/newsletter/unsubscribe",
  preferences: "/newsletter/preferences",
  verify: "/newsletter/verify",
};

// Tools Endpoints
export const TOOLS_ENDPOINTS = {
  access: "/tools/access",
  quakeScout: "/tools/quakescout",
  buildingCalculator: "/tools/building-calculator",
  riskAssessment: "/tools/risk-assessment",
};

// User Endpoints
export const USER_ENDPOINTS = {
  profile: "/user/profile",
  updateProfile: "/user/profile/update",
  preferences: "/user/preferences",
  bookmarks: "/user/bookmarks",
  history: "/user/history",
  notifications: "/user/notifications",
};

// Comment Endpoints
export const COMMENT_ENDPOINTS = {
  list: (articleId) => `/articles/${articleId}/comments`,
  create: "/comments/create",
  update: (id) => `/comments/${id}/update`,
  delete: (id) => `/comments/${id}/delete`,
  like: (id) => `/comments/${id}/like`,
  report: (id) => `/comments/${id}/report`,
};

// Contact Endpoints
export const CONTACT_ENDPOINTS = {
  submit: "/contact/submit",
  support: "/support/ticket",
  feedback: "/feedback/submit",
};

// HTTP Headers Configuration
export const HTTP_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Accept-Language": "fa-IR",
  "X-Client-Version": "1.0.0",
  "X-Platform": "web",
};

// Error Messages (Persian)
export const ERROR_MESSAGES = {
  network:
    "خطا در برقراری ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
  timeout: "زمان درخواست به پایان رسید. لطفاً دوباره تلاش کنید.",
  unauthorized: "دسترسی غیرمجاز. لطفاً وارد حساب کاربری خود شوید.",
  forbidden: "شما اجازه دسترسی به این منبع را ندارید.",
  notFound: "منبع مورد نظر یافت نشد.",
  serverError: "خطای سرور. لطفاً بعداً تلاش کنید.",
  badRequest: "درخواست نامعتبر. لطفاً اطلاعات را بررسی کنید.",
  default: "خطایی رخ داده است. لطفاً دوباره تلاش کنید.",
};

// Success Messages (Persian)
export const SUCCESS_MESSAGES = {
  login: "ورود با موفقیت انجام شد",
  logout: "خروج با موفقیت انجام شد",
  register: "ثبت‌نام با موفقیت انجام شد",
  newsletterSubscribe: "عضویت در خبرنامه با موفقیت انجام شد",
  profileUpdate: "پروفایل با موفقیت به‌روزرسانی شد",
  commentPosted: "نظر شما با موفقیت ثبت شد",
  bookmarkAdded: "به لیست نشان‌شده‌ها اضافه شد",
  bookmarkRemoved: "از لیست نشان‌شده‌ها حذف شد",
  feedbackSubmitted: "بازخورد شما با موفقیت ارسال شد",
};

// API Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  authToken: "authToken",
  refreshToken: "refreshToken",
  userId: "userId",
  userEmail: "userEmail",
  userName: "userName",
  preferences: "userPreferences",
  recentSearches: "recentSearches",
  bookmarks: "bookmarks",
  darkMode: "darkMode",
  language: "language",
};

// Rate Limiting Configuration
export const RATE_LIMIT = {
  maxRequests: 100,
  windowMs: 60000, // 1 minute
  message:
    "تعداد درخواست‌های شما از حد مجاز گذشته است. لطفاً چند دقیقه صبر کنید.",
};

// Cache Configuration
export const CACHE_CONFIG = {
  enabled: true,
  ttl: 300000, // 5 minutes in milliseconds
  maxSize: 50, // Maximum number of cached items
};

// Feature Flags
export const FEATURE_FLAGS = {
  enableAnalytics: true,
  enableComments: true,
  enableBookmarks: true,
  enableDarkMode: true,
  enablePWA: false,
  enableOfflineMode: false,
  enableSearch: true,
  enableNotifications: true,
};

// Environment Detection
export const getEnvironment = () => {
  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "development";
  } else if (hostname.includes("staging") || hostname.includes("test")) {
    return "staging";
  } else {
    return "production";
  }
};

// Get appropriate API base URL based on environment
export const getApiBaseUrl = () => {
  const env = getEnvironment();
  return env === "development" ? API_CONFIG.devBaseUrl : API_CONFIG.baseUrl;
};

// Export all configurations
export default {
  API_CONFIG,
  AUTH_ENDPOINTS,
  ANALYTICS_ENDPOINTS,
  CONTENT_ENDPOINTS,
  NEWSLETTER_ENDPOINTS,
  TOOLS_ENDPOINTS,
  USER_ENDPOINTS,
  COMMENT_ENDPOINTS,
  CONTACT_ENDPOINTS,
  HTTP_HEADERS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  HTTP_STATUS,
  STORAGE_KEYS,
  RATE_LIMIT,
  CACHE_CONFIG,
  FEATURE_FLAGS,
  getEnvironment,
  getApiBaseUrl,
};
