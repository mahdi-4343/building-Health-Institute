// config.js - Configuration file for Supabase and EmailJS
// Replace these with your actual credentials

const SUPABASE_URL = "https://qoxfhbhwzdmqgtcrvgaz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveGZoYmh3emRtcWd0Y3J2Z2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMTUyMDQsImV4cCI6MjA3NTg5MTIwNH0.J6wS9CgHxEA4N6Luz0nD3QrsgQ8U2zLsl0ckFfUBgMI";
const EMAILJS_SERVICE_ID = "service_3hasp77";
const EMAILJS_TEMPLATE_ID = "template_d5ys0lz";
const EMAILJS_PUBLIC_KEY = "fuo-hTuLQ5il-5WFs";

// Initialize Supabase with error handling
let supabase = null;
try {
  // The UMD bundle exposes createClient under window.supabase.createClient
  const createClient = window.supabase?.createClient || window.createClient;

  if (typeof createClient !== "undefined") {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase initialized successfully");
  } else {
    console.warn("Supabase createClient function not available yet");
  }
} catch (error) {
  console.error("Failed to initialize Supabase:", error);
}

// Initialize EmailJS with error handling
try {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log("EmailJS initialized successfully");
  } else {
    console.warn("EmailJS not available yet");
  }
} catch (error) {
  console.error("Failed to initialize EmailJS:", error);
}

// Export for use in other files
window.supabase = supabase;
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
window.EMAILJS_SERVICE_ID = EMAILJS_SERVICE_ID;
window.EMAILJS_TEMPLATE_ID = EMAILJS_TEMPLATE_ID;
