// Wait for all dependencies to load
function waitForDependencies() {
  return new Promise((resolve) => {
    const checkDependencies = () => {
      if (
        typeof createClient !== "undefined" &&
        typeof SUPABASE_URL !== "undefined" &&
        typeof SUPABASE_ANON_KEY !== "undefined"
      ) {
        resolve(true);
      } else {
        setTimeout(checkDependencies, 50);
      }
    };
    checkDependencies();
  });
}

// Initialize Supabase with error handling
function initializeSupabase() {
  try {
    if (typeof createClient === "undefined") {
      throw new Error("Supabase client library not loaded");
    }

    if (
      typeof SUPABASE_URL === "undefined" ||
      typeof SUPABASE_ANON_KEY === "undefined"
    ) {
      throw new Error("Supabase configuration not found");
    }

    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (error) {
    console.error("Failed to initialize Supabase:", error);
    return null;
  }
}

// Get Supabase client with fallback
async function getSupabaseClient() {
  if (typeof supabase !== "undefined") {
    return supabase;
  }

  // Wait for dependencies to load
  try {
    await waitForDependencies();
    const client = initializeSupabase();
    if (client) {
      window.supabase = client;
      return client;
    }
  } catch (error) {
    console.error("Failed to initialize Supabase:", error);
  }

  return null;
}

// Password visibility toggle
function togglePasswordVisibility(inputId, button) {
  const input = document.getElementById(inputId);
  const eyeIcon = button.querySelector(".eye-icon");

  if (input.type === "password") {
    input.type = "text";
    eyeIcon.innerHTML =
      '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/><path d="M2 2l20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
  } else {
    input.type = "password";
    eyeIcon.innerHTML =
      '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>';
  }
}

// Contact form handling
async function handleContactSubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const loadingSpinner = document.getElementById("loadingSpinner");

  // Show loading state
  submitBtn.disabled = true;
  submitText.style.display = "none";
  loadingSpinner.style.display = "inline";

  try {
    // Get form data
    const formData = new FormData(event.target);
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      newsletter: formData.get("newsletter") === "yes",
    };

    // Save to Supabase database
    const supabaseClient = await getSupabaseClient();
    if (!supabaseClient) {
      throw new Error(
        "Database service is not available. Please try again later."
      );
    }

    const { data, error } = await supabaseClient
      .from("contact_messages")
      .insert([contactData]);

    if (error) {
      throw new Error("خطا در ذخیره پیام: " + error.message);
    }

    // Send email via EmailJS
    const emailParams = {
      to_email: "hesarimahdi261@gmail.com", // Your email
      from_name: contactData.name,
      from_email: contactData.email,
      subject: contactData.subject,
      phone: contactData.phone,
      message: contactData.message,
      newsletter: contactData.newsletter ? "بله" : "خیر",
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams);

    // Success message
    showNotification("پیام شما با موفقیت ارسال شد!", "success");
    event.target.reset();
  } catch (error) {
    console.error("Error:", error);
    showNotification("خطا در ارسال پیام. لطفاً دوباره تلاش کنید.", "error");
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitText.style.display = "inline";
    loadingSpinner.style.display = "none";
  }
}

// Authentication Modal Functions
function openAuthModal(type) {
  const overlay = document.getElementById(`${type}Overlay`);
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeAuthModal(type) {
  const overlay = document.getElementById(`${type}Overlay`);
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function switchAuthModal(type) {
  // Close all modals first
  closeAuthModal("signIn");
  closeAuthModal("signUp");

  // Open the requested modal
  setTimeout(() => {
    openAuthModal(type);
  }, 100);
}

// Authentication functions (now handled by modals)
// These functions are kept for backward compatibility but redirect to modals
async function handleLogin() {
  openAuthModal("signIn");
}

async function handleCreateAccount() {
  openAuthModal("signUp");
}

// Sign In Form Handler
async function handleSignIn(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById("signInText");
  const loadingSpinner = document.getElementById("signInLoading");

  // Show loading state
  submitBtn.disabled = true;
  submitText.style.display = "none";
  loadingSpinner.style.display = "inline";

  try {
    const supabaseClient = await getSupabaseClient();
    if (!supabaseClient) {
      throw new Error(
        "سرویس احراز هویت در دسترس نیست. لطفاً دوباره تلاش کنید."
      );
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Handle email confirmation error specifically
      if (
        error.message.includes("Email not confirmed") ||
        error.message.includes("email_not_confirmed")
      ) {
        showNotification(
          "لطفاً ابتدا ایمیل خود را تأیید کنید. ایمیل تأیید به آدرس شما ارسال شده است.",
          "error"
        );
        // Offer to resend confirmation email
        const resend = confirm("آیا می‌خواهید ایمیل تأیید دوباره ارسال شود؟");
        if (resend) {
          await handleResendConfirmation(email);
        }
        return;
      }
      throw error;
    }

    showNotification("ورود موفقیت‌آمیز!", "success");
    updateAuthUI(data.user);
    closeAuthModal("signIn");
    form.reset();
  } catch (error) {
    showNotification("خطا در ورود: " + error.message, "error");
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitText.style.display = "inline";
    loadingSpinner.style.display = "none";
  }
}

// Sign Up Form Handler
async function handleSignUp(event) {
  event.preventDefault();

  const form = event.target;
  const fullName = form.fullName.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  // Validate passwords match
  if (password !== confirmPassword) {
    showNotification("رمزهای عبور مطابقت ندارند", "error");
    return;
  }

  // Validate password strength
  if (password.length < 6) {
    showNotification("رمز عبور باید حداقل 6 کاراکتر باشد", "error");
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById("signUpText");
  const loadingSpinner = document.getElementById("signUpLoading");

  // Show loading state
  submitBtn.disabled = true;
  submitText.style.display = "none";
  loadingSpinner.style.display = "inline";

  try {
    const supabaseClient = await getSupabaseClient();
    if (!supabaseClient) {
      throw new Error(
        "سرویس احراز هویت در دسترس نیست. لطفاً دوباره تلاش کنید."
      );
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    // Check if email confirmation is required
    if (data.user && !data.user.email_confirmed_at) {
      showNotification(
        "حساب کاربری ایجاد شد! لطفاً ایمیل تأیید ارسال شده به آدرس شما را بررسی کنید و روی لینک تأیید کلیک کنید.",
        "success"
      );
      // Show additional help
      setTimeout(() => {
        showNotification(
          "توجه: پس از تأیید ایمیل، می‌توانید وارد حساب کاربری خود شوید.",
          "info"
        );
      }, 3000);
    } else {
      showNotification("حساب کاربری ایجاد شد!", "success");
    }

    closeAuthModal("signUp");
    form.reset();
  } catch (error) {
    showNotification("خطا در ایجاد حساب: " + error.message, "error");
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitText.style.display = "inline";
    loadingSpinner.style.display = "none";
  }
}

// Forgot Password Handler
async function handleForgotPassword() {
  const email = prompt("ایمیل خود را وارد کنید:");

  if (email) {
    try {
      const supabaseClient = await getSupabaseClient();
      if (!supabaseClient) {
        throw new Error(
          "سرویس احراز هویت در دسترس نیست. لطفاً دوباره تلاش کنید."
        );
      }

      const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

      if (error) throw error;

      showNotification(
        "لینک بازیابی رمز عبور به ایمیل شما ارسال شد",
        "success"
      );
    } catch (error) {
      showNotification("خطا در ارسال ایمیل: " + error.message, "error");
    }
  }
}

// Resend Confirmation Email Handler
async function handleResendConfirmation(email) {
  try {
    const supabaseClient = await getSupabaseClient();
    if (!supabaseClient) {
      throw new Error(
        "سرویس احراز هویت در دسترس نیست. لطفاً دوباره تلاش کنید."
      );
    }

    const { error } = await supabaseClient.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) throw error;

    showNotification(
      "ایمیل تأیید دوباره ارسال شد. لطفاً صندوق ورودی ایمیل خود را بررسی کنید.",
      "success"
    );
  } catch (error) {
    showNotification("خطا در ارسال ایمیل تأیید: " + error.message, "error");
  }
}

// Resend Confirmation Email from Form
async function handleResendConfirmationFromForm() {
  const email = prompt("ایمیل خود را وارد کنید:");
  if (email) {
    await handleResendConfirmation(email);
  }
}

// Update UI based on auth state
function updateAuthUI(user) {
  const loginBtn = document.querySelector(".btn-outline");
  const createBtn = document.querySelector(".btn-primary");

  if (user) {
    // Show user name instead of "خروج"
    const userName =
      user.user_metadata?.full_name || user.email?.split("@")[0] || "کاربر";
    loginBtn.innerHTML = `
      <span class="user-name">${userName}</span>
      <span class="logout-text" style="font-size: 0.8em; opacity: 0.8;">(خروج)</span>
    `;
    loginBtn.onclick = handleLogout;
    createBtn.style.display = "none";

    // Store user info globally for other functions
    window.currentUser = user;
  } else {
    loginBtn.innerHTML = "ورود";
    loginBtn.onclick = () => openAuthModal("signIn");
    createBtn.style.display = "inline-block";

    // Clear user info
    window.currentUser = null;
  }
}

async function handleLogout() {
  const supabaseClient = await getSupabaseClient();
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  showNotification("خروج موفقیت‌آمیز!", "success");
  updateAuthUI(null);
}

// Check auth state on page load
document.addEventListener("DOMContentLoaded", async function () {
  // Wait a bit for all scripts to load
  setTimeout(async () => {
    const supabaseClient = await getSupabaseClient();
    if (supabaseClient) {
      supabaseClient.auth.onAuthStateChange((event, session) => {
        updateAuthUI(session?.user || null);
      });
    }
  }, 100);
});

// Mock API request function - no longer makes actual requests
async function makeApiRequest(endpoint, method = "GET", data = null) {
  console.log(`Mock API call: ${method} ${endpoint}`, data);
  // Return a mock success response
  return { success: true, message: "Analytics disabled" };
}

// Notification System
function showNotification(message, type = "success") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${
              type === "success" ? "✓" : "✕"
            }</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideUp 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-icon {
        font-weight: bold;
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);

// User Authentication Actions - Removed duplicate handleLogin function
// The correct handleLogin function is defined earlier in the file

// Removed duplicate handleCreateAccount function
// The correct handleCreateAccount function is defined earlier in the file

// Newsletter Subscription
async function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;

  // Simple success message without API call
  showNotification("عضویت شما با موفقیت انجام شد!", "success");
  form.reset();
}

// Article Actions - Simplified without analytics
async function handleArticleClick(articleId) {
  console.log(`Navigating to article: ${articleId}`);
}

// Category Navigation - Simplified without analytics
async function handleCategoryClick(category) {
  event.preventDefault();
  showNotification(`در حال نمایش مقالات دسته‌بندی: ${category}`, "success");
}

// Tool Access - Simplified without analytics
async function handleToolAccess() {
  showNotification("در حال انتقال به ابزار QuakeScout...", "success");
}

// Social Media Clicks - With proper URL redirects
async function handleSocialClick(platform) {
  event.preventDefault();

  const urls = {
    instagram: "https://www.instagram.com/buildinghealthinstitute/",
    linkedin: "https://www.linkedin.com/in/mahdi-hesari-3141a826a",
    telegram: "https://t.me/Mahdi_hs43",
  };

  if (urls[platform]) {
    window.open(urls[platform], "_blank");
    console.log(`Opening ${platform} profile: ${urls[platform]}`);
  } else {
    console.log(`Unknown platform: ${platform}`);
  }
}

// Footer Navigation - Simplified without analytics
async function handleFooterClick(section) {
  event.preventDefault();
  console.log(`Navigating to footer section: ${section}`);
}

// Connect with Author - Simplified without analytics
async function handleConnect() {
  showNotification("در حال انتقال به پروفایل لینکدین...", "success");
}

// Page View Tracking - Removed API calls
async function trackPageView() {
  // Tracking removed - no longer needed
}

// Scroll Depth Tracking - Removed API calls
let maxScrollDepth = 0;
let scrollTrackingTimer = null;

function trackScrollDepth() {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

  if (scrollPercentage > maxScrollDepth) {
    maxScrollDepth = scrollPercentage;
    // Tracking removed - no longer needed
  }
}

// Time on Page Tracking - Removed API calls
let pageLoadTime = Date.now();

async function trackTimeOnPage() {
  const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000); // in seconds
  // Tracking removed - no longer needed
}

// Search Functionality - Simplified without API calls
async function handleSearch(query) {
  console.log("Search query:", query);
  showNotification("جستجو در حال توسعه...", "info");
  return { results: [] };
}

// Initialize Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Track page view on load
  trackPageView();

  // Track scroll depth
  window.addEventListener("scroll", trackScrollDepth);

  // Track time on page when leaving
  window.addEventListener("beforeunload", trackTimeOnPage);

  // Track clicks on external links
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.addEventListener("click", async (e) => {
      const url = link.getAttribute("href");
      try {
        await makeApiRequest("/analytics/external-link", "POST", {
          url: url,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
        });
      } catch (error) {
        console.error("External link tracking error:", error);
      }
    });
  });

  // Track table interactions
  document.querySelectorAll("table").forEach((table) => {
    table.addEventListener("click", async (e) => {
      const row = e.target.closest("tr");
      if (row) {
        try {
          await makeApiRequest("/analytics/table-interaction", "POST", {
            table: "classification-table",
            rowIndex: row.rowIndex,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
          });
        } catch (error) {
          console.error("Table interaction tracking error:", error);
        }
      }
    });
  });

  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Mobile menu toggle (if needed)
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      const nav = document.querySelector(".main-nav");
      nav.classList.toggle("active");
    });
  }

  console.log("Website initialized successfully");
  console.log("API tracking enabled for all user actions");
});

// Page Navigation Tracking
async function trackNavigation(targetPage) {
  try {
    await makeApiRequest("/analytics/navigation/click", "POST", {
      targetPage: targetPage,
      sourcePage: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Navigation tracking error:", error);
  }
}

// Track all navigation link clicks
document.addEventListener("DOMContentLoaded", () => {
  // Existing initialization...

  // Track navigation clicks
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", async (e) => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#")) {
        await trackNavigation(href);
      }
    });
  });
});

// Export functions for use in HTML onclick handlers
window.handleLogin = handleLogin;
window.handleCreateAccount = handleCreateAccount;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.handleArticleClick = handleArticleClick;
window.handleCategoryClick = handleCategoryClick;
window.handleToolAccess = handleToolAccess;
window.handleSocialClick = handleSocialClick;
window.handleFooterClick = handleFooterClick;
window.handleConnect = handleConnect;
window.handleSearch = handleSearch;
window.trackNavigation = trackNavigation;

// Certification Request Handler - Simplified without API calls
async function handleCertificationRequest() {
  showNotification(
    "درخواست شما با موفقیت ثبت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.",
    "success"
  );

  // Redirect to contact form or certification form
  setTimeout(() => {
    window.location.href = "contact.html?type=certification";
  }, 2000);
}

// Consultation Request Handler - Simplified without API calls
async function handleConsultation() {
  showNotification(
    "درخواست مشاوره رایگان شما ثبت شد. به زودی با شما تماس می‌گیریم.",
    "success"
  );

  // Redirect to contact form
  setTimeout(() => {
    window.location.href = "contact.html?type=consultation";
  }, 2000);
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

// Website content database for search
const searchDatabase = {
  pages: [
    {
      title: "خانه",
      url: "index.html",
      keywords: [
        "خانه",
        "صفحه اصلی",
        "گواهینامه",
        "برنز",
        "نقره",
        "طلا",
        "رتبه بندی",
      ],
      description:
        "صفحه اصلی مرکز سلامت ساختمانی - گواهینامه رتبه‌بندی لرزه‌ای",
      category: "اصلی",
    },
    {
      title: "درباره ما",
      url: "about.html",
      keywords: ["درباره", "معرفی", "تیم", "تاریخچه", "ماموریت", "چشم انداز"],
      description: "معرفی مرکز سلامت ساختمانی و تیم متخصص ما",
      category: "اطلاعات",
    },
    {
      title: "خدمات",
      url: "services.html",
      keywords: ["خدمات", "ارزیابی", "بازرسی", "مشاوره", "گزارش", "تحلیل"],
      description: "خدمات ارزیابی و بازرسی ساختمان",
      category: "خدمات",
    },
    {
      title: "گواهینامه ها",
      url: "certification.html",
      keywords: [
        "گواهینامه",
        "رتبه بندی",
        "برنز",
        "نقره",
        "طلا",
        "لرزه ای",
        "زلزله",
      ],
      description: "گواهینامه رتبه‌بندی لرزه‌ای ساختمان - برنز، نقره، طلا",
      category: "گواهینامه",
    },
    {
      title: "منابع",
      url: "resources.html",
      keywords: ["منابع", "مقالات", "راهنما", "آموزش", "دانلود", "اسناد"],
      description: "منابع آموزشی و مقالات تخصصی",
      category: "آموزش",
    },
    {
      title: "وبلاگ",
      url: "blog.html",
      keywords: ["وبلاگ", "مقالات", "اخبار", "مطالب", "تحلیل"],
      description: "آخرین مقالات و اخبار تخصصی",
      category: "محتوا",
    },
    {
      title: "تماس با ما",
      url: "contact.html",
      keywords: ["تماس", "ارتباط", "آدرس", "تلفن", "ایمیل", "فرم"],
      description: "راه‌های ارتباطی با مرکز سلامت ساختمانی",
      category: "ارتباط",
    },
    {
      title: "طبقه‌بندی زلزله",
      url: "EarthquakeClassification.html",
      keywords: [
        "زلزله",
        "طبقه بندی",
        "لرزه",
        "ساختمان",
        "مقاومت",
        "استاندارد",
      ],
      description: "طبقه‌بندی ساختمان‌ها در برابر زلزله",
      category: "مقاله",
    },
  ],
  topics: [
    {
      title: "ارزیابی لرزه‌ای",
      keywords: ["ارزیابی", "لرزه ای", "زلزله", "بازرسی"],
    },
    {
      title: "کدهای ساختمانی",
      keywords: ["کد", "استاندارد", "مقررات", "ساختمان"],
    },
    { title: "مقاومت سازه", keywords: ["مقاومت", "سازه", "استحکام", "ایمنی"] },
    { title: "بیمه املاک", keywords: ["بیمه", "املاک", "پوشش", "خسارت"] },
    { title: "آتش سوزی", keywords: ["آتش", "حریق", "ایمنی", "پیشگیری"] },
  ],
};

// Toggle search overlay
function toggleSearch() {
  const overlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");

  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus on input after animation
    setTimeout(() => {
      if (searchInput) {
        searchInput.focus();
      }
    }, 300);

    // Track search open
    makeApiRequest("/analytics/search/open", "POST", {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    }).catch((error) => console.error("Search tracking error:", error));
  }
}

// Close search overlay
function closeSearch() {
  const overlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");

  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";

    // Clear search
    if (searchInput) {
      searchInput.value = "";
    }
    clearSearchResults();
  }
}

// Search for a specific term (from suggestions)
function searchFor(term) {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = term;
    performSearch();

    // Track suggestion click
    makeApiRequest("/analytics/search/suggestion", "POST", {
      term: term,
      timestamp: new Date().toISOString(),
    }).catch((error) => console.error("Suggestion tracking error:", error));
  }
}

// Perform search
function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput ? searchInput.value.trim() : "";

  if (query.length < 2) {
    clearSearchResults();
    return;
  }

  const results = searchWebsite(query);
  displaySearchResults(results, query);

  // Track search query
  makeApiRequest("/analytics/search/query", "POST", {
    query: query,
    resultsCount: results.length,
    timestamp: new Date().toISOString(),
  }).catch((error) => console.error("Search query tracking error:", error));
}

// Search website content
function searchWebsite(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];

  // Search pages
  searchDatabase.pages.forEach((page) => {
    let score = 0;

    // Check title
    if (page.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }

    // Check keywords
    page.keywords.forEach((keyword) => {
      if (keyword.toLowerCase().includes(lowerQuery)) {
        score += 5;
      }
    });

    // Check description
    if (page.description.toLowerCase().includes(lowerQuery)) {
      score += 3;
    }

    if (score > 0) {
      results.push({
        ...page,
        score: score,
        type: "page",
      });
    }
  });

  // Search topics
  searchDatabase.topics.forEach((topic) => {
    let score = 0;

    if (topic.title.toLowerCase().includes(lowerQuery)) {
      score += 8;
    }

    topic.keywords.forEach((keyword) => {
      if (keyword.toLowerCase().includes(lowerQuery)) {
        score += 4;
      }
    });

    if (score > 0) {
      results.push({
        title: topic.title,
        description: `موضوعات مرتبط با ${topic.title}`,
        category: "موضوع",
        score: score,
        type: "topic",
      });
    }
  });

  // Sort by score (highest first)
  results.sort((a, b) => b.score - a.score);

  return results;
}

// Display search results
function displaySearchResults(results, query) {
  const resultsContainer = document.getElementById("searchResults");
  const suggestionsContainer = document.getElementById("searchSuggestions");

  if (!resultsContainer) return;

  // Hide suggestions when showing results
  if (suggestionsContainer) {
    suggestionsContainer.style.display = "none";
  }

  resultsContainer.style.display = "block";

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <h3>نتیجه‌ای یافت نشد</h3>
        <p>متاسفانه نتیجه‌ای برای "${query}" پیدا نشد.</p>
        <p>لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
      </div>
    `;
    return;
  }

  let html = `<div class="search-results-header">
    <h4>${results.length} نتیجه برای "${query}"</h4>
  </div>`;

  results.forEach((result) => {
    const highlightedTitle = highlightText(result.title, query);
    const highlightedDesc = highlightText(result.description, query);

    if (result.type === "page") {
      html += `
        <div class="search-result-item" onclick="navigateToResult('${result.url}', '${query}')">
          <div class="result-category">${result.category}</div>
          <h4>${highlightedTitle}</h4>
          <p>${highlightedDesc}</p>
          <div class="result-url">${result.url}</div>
        </div>
      `;
    } else {
      html += `
        <div class="search-result-item topic-result">
          <div class="result-category">${result.category}</div>
          <h4>${highlightedTitle}</h4>
          <p>${highlightedDesc}</p>
        </div>
      `;
    }
  });

  resultsContainer.innerHTML = html;
}

// Highlight search term in text
function highlightText(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// Clear search results
function clearSearchResults() {
  const resultsContainer = document.getElementById("searchResults");
  const suggestionsContainer = document.getElementById("searchSuggestions");

  if (resultsContainer) {
    resultsContainer.innerHTML = "";
    resultsContainer.style.display = "none";
  }

  if (suggestionsContainer) {
    suggestionsContainer.style.display = "flex";
  }
}

// Navigate to search result
function navigateToResult(url, query) {
  // Track result click
  makeApiRequest("/analytics/search/result-click", "POST", {
    url: url,
    query: query,
    timestamp: new Date().toISOString(),
  }).catch((error) => console.error("Result click tracking error:", error));

  // Navigate to page
  window.location.href = url;
}

// Initialize search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    // Real-time search with debounce
    let searchTimeout;
    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch();
      }, 300);
    });

    // Search on Enter key
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  // Close search on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeSearch();
    }
  });
});

// Mobile Menu Toggle Functions
function toggleMobileMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-nav-menu");
  const overlay = document.querySelector(".mobile-nav-overlay");

  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  // Track menu toggle
  makeApiRequest("/analytics/mobile-menu/toggle", "POST", {
    action: mobileMenu.classList.contains("active") ? "open" : "close",
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
  }).catch((error) => {
    console.error("Menu toggle tracking error:", error);
  });
}

function closeMobileMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-nav-menu");
  const overlay = document.querySelector(".mobile-nav-overlay");

  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");

  // Restore body scroll
  document.body.style.overflow = "";
}

// Explorer Bar Navigation
async function navigateToExplorer(section) {
  const routes = {
    home: "index.html",
    services: "services.html",
    certification: "certification.html",
    resources: "resources.html",
    contact: "contact.html",
  };

  try {
    await makeApiRequest("/analytics/explorer/click", "POST", {
      section: section,
      targetPage: routes[section],
      sourcePage: window.location.pathname,
      timestamp: new Date().toISOString(),
    });

    // Update active state
    document.querySelectorAll(".explorer-item").forEach((item) => {
      item.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    // Navigate to the page
    window.location.href = routes[section];
  } catch (error) {
    console.error("Explorer navigation error:", error);
    // Navigate anyway
    window.location.href = routes[section];
  }
}

// Set active explorer item based on current page
function setActiveExplorerItem() {
  const currentPage = window.location.pathname.split("/").pop();
  const explorerItems = document.querySelectorAll(".explorer-item");

  explorerItems.forEach((item) => {
    item.classList.remove("active");
  });

  const pageMapping = {
    "index.html": 0,
    "": 0, // For root path
    "services.html": 1,
    "certification.html": 2,
    "resources.html": 3,
    "contact.html": 4,
  };

  const activeIndex = pageMapping[currentPage];
  if (activeIndex !== undefined && explorerItems[activeIndex]) {
    explorerItems[activeIndex].classList.add("active");
  }
}

// Initialize explorer bar on page load
document.addEventListener("DOMContentLoaded", () => {
  setActiveExplorerItem();

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const mobileMenu = document.querySelector(".mobile-nav-menu");
    const hamburger = document.querySelector(".hamburger-menu");

    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });
});

// Force hamburger menu visibility - BEAUTIFUL UI
function forceHamburgerVisibility() {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  if (hamburgerMenu) {
    hamburgerMenu.style.display = "flex";
    hamburgerMenu.style.flexDirection = "column";
    hamburgerMenu.style.visibility = "visible";
    hamburgerMenu.style.opacity = "1";
    hamburgerMenu.style.position = "relative";
    hamburgerMenu.style.width = "40px";
    hamburgerMenu.style.height = "40px";
    hamburgerMenu.style.background = "rgba(0, 0, 0, 0.05)";
    hamburgerMenu.style.border = "none";
    hamburgerMenu.style.borderRadius = "8px";
    hamburgerMenu.style.padding = "0.5rem";
    hamburgerMenu.style.cursor = "pointer";
    hamburgerMenu.style.zIndex = "999";
    hamburgerMenu.style.justifyContent = "center";
    hamburgerMenu.style.alignItems = "center";
    hamburgerMenu.style.color = "var(--text-color)";
    hamburgerMenu.style.flexDirection = "column";

    // Force span visibility to match search icon
    const spans = hamburgerMenu.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.display = "block";
      span.style.width = "24px";
      span.style.height = "3px";
      span.style.background = "currentColor";
      span.style.margin = "2px 0";
      span.style.opacity = "1";
      span.style.visibility = "visible";
      span.style.borderRadius = "2px";
    });

    console.log("Hamburger menu matches search icon!");
  }
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  forceHamburgerVisibility();

  // Force visibility again after delays
  setTimeout(forceHamburgerVisibility, 100);
  setTimeout(forceHamburgerVisibility, 500);
  setTimeout(forceHamburgerVisibility, 1000);
});

// Expose functions globally
window.handleCertificationRequest = handleCertificationRequest;
window.handleConsultation = handleConsultation;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.toggleSearch = toggleSearch;
window.closeSearch = closeSearch;
window.searchFor = searchFor;
window.performSearch = performSearch;
window.navigateToResult = navigateToResult;
window.navigateToExplorer = navigateToExplorer;
window.forceHamburgerVisibility = forceHamburgerVisibility;
