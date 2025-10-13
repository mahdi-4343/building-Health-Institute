/**
 * Example Server Implementation
 *
 * This is a basic example of how to implement the API endpoints
 * for the Building Classification website using Node.js and Express
 *
 * To run this server:
 * 1. Install dependencies: npm install express cors body-parser
 * 2. Run the server: node server-example.js
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Body:", req.body);
  next();
});

// ============================================
// Authentication Endpoints
// ============================================

app.post("/api/v1/auth/login/initiate", (req, res) => {
  console.log("Login initiated:", req.body);
  res.json({
    success: true,
    message: "در حال انتقال به صفحه ورود",
    data: {
      redirectUrl: "/login",
    },
  });
});

app.post("/api/v1/auth/register/initiate", (req, res) => {
  console.log("Registration initiated:", req.body);
  res.json({
    success: true,
    message: "در حال انتقال به صفحه ثبت‌نام",
    data: {
      redirectUrl: "/register",
    },
  });
});

app.post("/api/v1/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Simulate authentication
  if (email && password) {
    res.json({
      success: true,
      message: "ورود با موفقیت انجام شد",
      data: {
        token: "example_jwt_token_12345",
        user: {
          id: 1,
          name: "مهدی حصاری",
          email: email,
        },
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "اطلاعات ورود نامعتبر است",
    });
  }
});

// ============================================
// Analytics Endpoints
// ============================================

app.post("/api/v1/analytics/pageview", (req, res) => {
  console.log("Page view tracked:", req.body);
  res.json({
    success: true,
    message: "Page view recorded",
    data: {
      viewId: Date.now(),
    },
  });
});

app.post("/api/v1/analytics/scroll", (req, res) => {
  console.log("Scroll depth tracked:", req.body);
  res.json({
    success: true,
    message: "Scroll depth recorded",
  });
});

app.post("/api/v1/analytics/time-on-page", (req, res) => {
  console.log("Time on page tracked:", req.body);
  res.json({
    success: true,
    message: "Time on page recorded",
  });
});

app.post("/api/v1/analytics/article/click", (req, res) => {
  console.log("Article click tracked:", req.body);
  res.json({
    success: true,
    message: "Article click recorded",
  });
});

app.post("/api/v1/analytics/category/click", (req, res) => {
  console.log("Category click tracked:", req.body);
  res.json({
    success: true,
    message: "Category click recorded",
  });
});

app.post("/api/v1/analytics/social/click", (req, res) => {
  console.log("Social click tracked:", req.body);
  res.json({
    success: true,
    message: "Social click recorded",
  });
});

app.post("/api/v1/analytics/footer/click", (req, res) => {
  console.log("Footer click tracked:", req.body);
  res.json({
    success: true,
    message: "Footer click recorded",
  });
});

app.post("/api/v1/analytics/author/connect", (req, res) => {
  console.log("Author connect tracked:", req.body);
  res.json({
    success: true,
    message: "Author connect recorded",
  });
});

app.post("/api/v1/analytics/external-link", (req, res) => {
  console.log("External link tracked:", req.body);
  res.json({
    success: true,
    message: "External link click recorded",
  });
});

app.post("/api/v1/analytics/table-interaction", (req, res) => {
  console.log("Table interaction tracked:", req.body);
  res.json({
    success: true,
    message: "Table interaction recorded",
  });
});

app.post("/api/v1/analytics/navigation/click", (req, res) => {
  console.log("Page navigation tracked:", req.body);
  res.json({
    success: true,
    message: "Navigation tracked",
  });
});

// ============================================
// Newsletter Endpoints
// ============================================

app.post("/api/v1/newsletter/subscribe", (req, res) => {
  const { email, timestamp, source } = req.body;

  console.log("Newsletter subscription:", req.body);

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "ایمیل نامعتبر است",
    });
  }

  res.json({
    success: true,
    message: "عضویت در خبرنامه با موفقیت انجام شد",
    data: {
      email: email,
      subscriptionId: Date.now(),
    },
  });
});

// ============================================
// Tools Endpoints
// ============================================

app.post("/api/v1/tools/access", (req, res) => {
  console.log("Tool access requested:", req.body);
  res.json({
    success: true,
    message: "در حال انتقال به ابزار",
    data: {
      tool: req.body.tool,
      accessUrl: `/tools/${req.body.tool}`,
    },
  });
});

// ============================================
// Search Endpoint
// ============================================

app.post("/api/v1/search", (req, res) => {
  const { query } = req.body;

  console.log("Search query:", query);

  // Simulate search results
  const mockResults = [
    {
      id: 1,
      title: "طبقه‌بندی ساختمان‌ها در برابر زلزله",
      excerpt: "راهنمای جامع طبقه‌بندی ساختمان‌ها...",
      url: "/blog/earthquake-classifications",
      category: "زلزله",
    },
    {
      id: 2,
      title: "راهنمای ارزیابی خطر",
      excerpt: "نحوه ارزیابی خطرات املاک...",
      url: "/blog/risk-assessment",
      category: "ارزیابی خطر",
    },
  ];

  res.json({
    success: true,
    data: {
      query: query,
      results: mockResults,
      totalCount: mockResults.length,
    },
  });
});

// ============================================
// Articles Endpoints
// ============================================

app.get("/api/v1/articles", (req, res) => {
  // Mock articles data
  res.json({
    success: true,
    data: {
      articles: [
        {
          id: 1,
          title: "طبقه‌بندی ساختمان‌ها در برابر زلزله",
          excerpt:
            "یک روز - که هیچ کس نمی‌داند کی - یک زلزله بزرگ کشور ما را لرزاند...",
          category: "زلزله",
          author: "مهدی حصاری",
          date: "۱۷ فروردین ۱۴۰۴",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        },
        {
          id: 2,
          title: "راهنمای جامع ارزیابی خطر املاک تجاری",
          excerpt: "ارزیابی خطرات املاک تجاری نیازمند دانش تخصصی است...",
          category: "ارزیابی خطر",
          author: "رضا سلیمانی",
          date: "۱۵ فروردین ۱۴۰۴",
          image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
        },
      ],
      pagination: {
        page: 1,
        perPage: 10,
        total: 2,
      },
    },
  });
});

app.get("/api/v1/articles/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    data: {
      id: id,
      title: "طبقه‌بندی ساختمان‌ها در برابر زلزله",
      content: "محتوای کامل مقاله...",
      author: {
        name: "مهدی حصاری",
        bio: "مهندس عمران و متخصص سازه‌های مقاوم در برابر زلزله",
      },
      publishedAt: "۱۷ فروردین ۱۴۰۴",
      views: 1250,
      likes: 89,
    },
  });
});

// ============================================
// Categories Endpoint
// ============================================

app.get("/api/v1/categories", (req, res) => {
  res.json({
    success: true,
    data: {
      categories: [
        { id: 1, name: "زلزله", slug: "earthquake", count: 15 },
        { id: 2, name: "آتش", slug: "fire", count: 12 },
        { id: 3, name: "املاک تجاری", slug: "commercial", count: 20 },
        { id: 4, name: "بیمه", slug: "insurance", count: 18 },
        { id: 5, name: "کدهای ساختمانی", slug: "building-codes", count: 10 },
      ],
    },
  });
});

// ============================================
// Contact Endpoint
// ============================================

app.post("/api/v1/contact/submit", (req, res) => {
  console.log("Contact form submitted:", req.body);
  res.json({
    success: true,
    message: "پیام شما با موفقیت ارسال شد",
  });
});

// ============================================
// Error Handling
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "خطای سرور رخ داده است",
  });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════════════════╗
    ║                                                   ║
    ║   Building Classification API Server             ║
    ║   Running on: http://localhost:${PORT}             ║
    ║                                                   ║
    ║   Environment: ${
      process.env.NODE_ENV || "development"
    }                        ║
    ║   Time: ${new Date().toLocaleString("fa-IR")}   ║
    ║                                                   ║
    ╚═══════════════════════════════════════════════════╝
    `);
  console.log("\nAvailable endpoints:");
  console.log("  POST /api/v1/auth/login/initiate");
  console.log("  POST /api/v1/auth/register/initiate");
  console.log("  POST /api/v1/auth/login");
  console.log("  POST /api/v1/analytics/*");
  console.log("  POST /api/v1/newsletter/subscribe");
  console.log("  POST /api/v1/tools/access");
  console.log("  POST /api/v1/search");
  console.log("  GET  /api/v1/articles");
  console.log("  GET  /api/v1/articles/:id");
  console.log("  GET  /api/v1/categories");
  console.log("  POST /api/v1/contact/submit");
  console.log("\n");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\nShutting down gracefully...");
  process.exit(0);
});

module.exports = app;
