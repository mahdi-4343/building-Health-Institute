# وبسایت طبقه‌بندی ساختمان‌ها در برابر زلزله

یک وبسایت مدرن و حرفه‌ای به زبان فارسی برای ارائه اطلاعات در مورد طبقه‌بندی ساختمان‌ها در برابر زلزله.

## ویژگی‌ها

### طراحی و رابط کاربری

- ✨ طراحی مدرن و زیبا با گرادیانت‌های جذاب
- 📱 کاملاً ریسپانسیو (موبایل، تبلت، دسکتاپ)
- 🌐 پشتیبانی کامل از RTL برای زبان فارسی
- 🎨 استفاده از فونت Vazirmatn برای خوانایی بهتر
- 🎯 UX بهینه با انیمیشن‌های نرم و طبیعی
- 🖼️ تصاویر با کیفیت و طراحی جذاب

### ساختار محتوا

- 📊 جداول تعاملی برای نمایش طبقه‌بندی‌های زلزله
- 📝 مقاله جامع با بخش‌های مختلف
- 🔖 سیستم breadcrumb برای ناوبری بهتر
- 👤 بخش معرفی نویسنده
- 📰 مقالات مرتبط و پیشنهادی
- 📧 فرم عضویت در خبرنامه
- 🔗 لینک‌های سریع به دسته‌بندی‌ها

### قابلیت‌های فنی

- 🚀 API requests برای تمام اکشن‌های کاربر
- 📈 ترکینگ کامل رفتار کاربر:
  - Page views
  - Scroll depth
  - Time on page
  - Click tracking
  - External link tracking
  - Table interactions
- 🔔 سیستم نوتیفیکیشن زیبا
- 💾 ذخیره‌سازی توکن احراز هویت در localStorage
- 🎯 Error handling پیشرفته
- 📱 Smooth scrolling
- ⚡ بهینه‌سازی عملکرد

### بخش‌های مختلف

- 🏠 Header با منوی کامل
- 🍞 Breadcrumb navigation
- 📄 محتوای اصلی مقاله
- 📊 جداول طبقه‌بندی
- 📌 Sidebar با ویجت‌های مختلف:
  - عضویت در خبرنامه
  - دسته‌بندی‌های محبوب
  - مقالات اخیر
  - ابزار QuakeScout
- 👣 Footer جامع با لینک‌های مفید

## نحوه استفاده

### اجرای پروژه

فایل `index.html` را در مرورگر خود باز کنید.

```bash
# یا با استفاده از Live Server
npx live-server
```

### تنظیم API

API endpoint ها در فایل `script.js` تعریف شده‌اند. برای تغییر آدرس API:

```javascript
const API_BASE_URL = "https://api.buildinginfo.ir/v1";
```

### API Endpoints

تمامی اکشن‌های کاربر به API ارسال می‌شوند:

#### احراز هویت

- `POST /auth/login/initiate` - شروع فرآیند ورود
- `POST /auth/register/initiate` - شروع فرآیند ثبت‌نام

#### Analytics

- `POST /analytics/pageview` - ترکینگ بازدید صفحه
- `POST /analytics/scroll` - ترکینگ عمق اسکرول
- `POST /analytics/time-on-page` - زمان صرف شده در صفحه
- `POST /analytics/article/click` - کلیک روی مقالات
- `POST /analytics/category/click` - کلیک روی دسته‌بندی‌ها
- `POST /analytics/social/click` - کلیک روی شبکه‌های اجتماعی
- `POST /analytics/footer/click` - کلیک روی لینک‌های فوتر
- `POST /analytics/author/connect` - اتصال با نویسنده
- `POST /analytics/external-link` - کلیک روی لینک‌های خارجی
- `POST /analytics/table-interaction` - تعامل با جداول

#### خبرنامه

- `POST /newsletter/subscribe` - عضویت در خبرنامه

#### ابزارها

- `POST /tools/access` - دسترسی به ابزارهای تخصصی

#### جستجو

- `POST /search` - جستجوی محتوا

## ساختار فایل‌ها

```
project/
│
├── index.html          # صفحه اصلی (مقاله طبقه‌بندی زلزله)
├── about.html          # صفحه درباره ما
├── services.html       # صفحه خدمات
├── resources.html      # صفحه منابع و ابزارها
├── blog.html          # صفحه وبلاگ (لیست مقالات)
├── contact.html       # صفحه تماس با ما
├── styles.css         # استایل‌های CSS کامل
├── script.js          # لاجیک JavaScript و API calls
├── api-config.js      # تنظیمات API
├── server-example.js  # سرور نمونه Node.js
├── package.json       # Dependencies
├── .gitignore        # Git ignore
├── README.md         # این فایل
├── SETUP.md          # راهنمای نصب
└── QUICKSTART.md     # راهنمای شروع سریع
```

## صفحات وبسایت

### 1. صفحه اصلی (index.html)

- مقاله کامل طبقه‌بندی زلزله ساختمان‌ها
- جداول تفصیلی طبقه‌بندی‌ها
- استثناها و نکات مهم
- جدول تبدیل طبقه‌بندی‌های قدیمی به جدید
- منابع و محتوای مرتبط

### 2. درباره ما (about.html)

- معرفی مرکز سلامت ساختمانی
- چشم‌انداز و ماموریت
- تاریخچه و داستان سازمان
- ارزش‌های سازمانی
- معرفی تیم
- آمار و دستاوردها

### 3. خدمات (services.html)

- گزارش‌های املاک تجاری
- ابزار QuakeScout
- ارزیابی کلاس‌های حفاظت
- خدمات مشاوره بیمه
- خدمات تکمیلی (6 مورد)
- پکیج‌های خدماتی (پایه، حرفه‌ای، سازمانی)

### 4. منابع (resources.html)

- ابزارهای تخصصی (QuakeScout، ماشین‌حساب، ارزیابی خطر)
- کتابخانه مقالات و راهنماها
- فیلتر بر اساس دسته‌بندی
- ویدیوهای آموزشی
- سوالات متداول
- فرم عضویت خبرنامه

### 5. وبلاگ (blog.html)

- لیست مقالات با تصویر
- مقاله ویژه
- دسته‌بندی مقالات
- جستجو در مقالات
- محبوب‌ترین مقالات
- ابر برچسب‌ها
- صفحه‌بندی

### 6. تماس با ما (contact.html)

- اطلاعات تماس کامل
- فرم تماس با ما
- سوالات متداول
- نقشه موقعیت
- راه‌های جایگزین ارتباطی
- لینک‌های شبکه‌های اجتماعی

````

## ویژگی‌های Responsive

### دسکتاپ (> 1024px)

- Layout دو ستونه (محتوا + sidebar)
- منوی افقی کامل
- تصاویر بزرگ

### تبلت (768px - 1024px)

- Layout تک ستونه
- منوی افقی با wrap
- Sidebar در پایین صفحه

### موبایل (< 768px)

- Layout تک ستونه کامل
- منوی عمودی
- دکمه‌های تمام عرض
- فونت سایزهای بهینه‌تر

## تکنولوژی‌های استفاده شده

- HTML5
- CSS3 (با متغیرهای CSS برای theming)
- Vanilla JavaScript (بدون وابستگی به فریمورک)
- Fetch API برای ارتباط با سرور
- LocalStorage برای ذخیره‌سازی
- Google Fonts (Vazirmatn)
- Unsplash برای تصاویر نمونه

## سفارشی‌سازی

### تغییر رنگ‌های اصلی

در فایل `styles.css`:

```css
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-color: #64748b;
  /* ... */
}
````

### اضافه کردن محتوای جدید

1. محتوای HTML را در `index.html` اضافه کنید
2. استایل‌های مربوطه را در `styles.css` بنویسید
3. توابع JavaScript و API calls را در `script.js` اضافه کنید

### تغییر فونت

فونت Vazirmatn از Google Fonts استفاده شده. برای تغییر:

```html
<!-- در index.html -->
<link href="URL_TO_YOUR_FONT" rel="stylesheet" />
```

```css
/* در styles.css */
body {
  font-family: "YOUR_FONT_NAME", sans-serif;
}
```

## مرورگرهای پشتیبانی شده

- ✅ Chrome (آخرین نسخه)
- ✅ Firefox (آخرین نسخه)
- ✅ Safari (آخرین نسخه)
- ✅ Edge (آخرین نسخه)
- ✅ Opera (آخرین نسخه)

## بهینه‌سازی‌های انجام شده

- 🚀 Lazy loading برای تصاویر
- ⚡ Debouncing برای scroll tracking
- 💾 Efficient DOM manipulation
- 🎯 Event delegation
- 📦 Minification ready
- 🔄 Smooth animations با CSS

## امنیت

- 🔒 HTTPS required برای production
- 🛡️ XSS protection
- 🔐 CORS headers مورد نیاز در سمت سرور
- 🚫 Input validation
- 🔑 Token-based authentication

## توسعه بیشتر

### پیشنهادات برای features آینده:

- [ ] سیستم جستجوی پیشرفته
- [ ] فیلتر و مرتب‌سازی جداول
- [ ] Dark mode
- [ ] چند زبانه
- [ ] PWA support
- [ ] Offline functionality
- [ ] نظرات کاربران
- [ ] اشتراک‌گذاری در شبکه‌های اجتماعی
- [ ] چاپ و PDF export
- [ ] Bookmark functionality

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## پشتیبانی

برای سوالات و مشکلات:

- Email: info@buildinginfo.ir
- تلفن: ۰۲۱-۱۲۳۴۵۶۷۸

---

ساخته شده با ❤️ برای جامعه مهندسی ایران
