# راهنمای نصب و راه‌اندازی

این راهنما شما را قدم به قدم در نصب و راه‌اندازی وبسایت طبقه‌بندی ساختمان‌ها همراهی می‌کند.

## پیش‌نیازها

### برای اجرای وبسایت (Frontend)

- مرورگر وب مدرن (Chrome, Firefox, Safari, Edge)
- (اختیاری) یک وب سرور محلی مانند Live Server

### برای اجرای سرور (Backend)

- Node.js نسخه 14 یا بالاتر
- npm نسخه 6 یا بالاتر

## روش اول: اجرای ساده وبسایت (بدون سرور)

این روش برای مشاهده و تست سریع وبسایت مناسب است.

### مرحله 1: باز کردن فایل HTML

1. فایل `index.html` را در مرورگر خود باز کنید:

   - دابل کلیک روی فایل، یا
   - کلیک راست و "Open with" > انتخاب مرورگر

2. وبسایت باید به طور کامل نمایش داده شود.

**نکته:** در این حالت، API calls به کنسول مرورگر لاگ می‌شوند و خطای CORS ممکن است مشاهده شود (طبیعی است).

## روش دوم: اجرا با Live Server

این روش برای توسعه و تست بهتر است.

### مرحله 1: نصب Live Server

#### با استفاده از npm:

```bash
npm install -g live-server
```

#### با استفاده از VS Code Extension:

1. در VS Code به بخش Extensions بروید
2. "Live Server" را جستجو کنید
3. نصب کنید

### مرحله 2: اجرای سرور

#### با npm:

```bash
cd path/to/project
live-server
```

#### با VS Code:

1. فایل `index.html` را باز کنید
2. روی "Go Live" در پایین راست کلیک کنید

وبسایت روی `http://localhost:5500` (یا پورت دیگری) باز می‌شود.

## روش سوم: اجرای کامل با Backend

این روش برای تست کامل با API واقعی مناسب است.

### مرحله 1: نصب Dependencies

```bash
cd path/to/project
npm install
```

این دستور تمام dependencies مورد نیاز را نصب می‌کند:

- express
- cors
- body-parser
- nodemon (برای development)
- live-server

### مرحله 2: اجرای Backend Server

```bash
npm start
```

یا برای development با auto-reload:

```bash
npm run dev
```

سرور روی `http://localhost:3000` اجرا می‌شود.

### مرحله 3: اجرای Frontend

در یک ترمینال جدید:

```bash
npm run serve
```

وبسایت روی `http://localhost:8080` باز می‌شود.

### مرحله 4: اتصال Frontend به Backend

در فایل `script.js`، مطمئن شوید که API base URL به درستی تنظیم شده:

```javascript
const API_BASE_URL = "http://localhost:3000/api/v1";
```

## تنظیمات پیشرفته

### تغییر پورت سرور

در فایل `server-example.js`:

```javascript
const PORT = process.env.PORT || 3000; // پورت دلخواه را اینجا قرار دهید
```

یا از متغیر محیطی استفاده کنید:

```bash
PORT=5000 npm start
```

### تنظیم محیط Development

فایل `.env` ایجاد کنید:

```env
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000/api/v1
```

### فعال/غیرفعال کردن Features

در فایل `api-config.js`:

```javascript
export const FEATURE_FLAGS = {
  enableAnalytics: true, // ترکینگ Analytics
  enableComments: true, // سیستم نظرات
  enableBookmarks: true, // نشانه‌گذاری مقالات
  enableDarkMode: false, // حالت تاریک
  enablePWA: false, // Progressive Web App
  enableOfflineMode: false, // حالت آفلاین
  enableSearch: true, // جستجو
  enableNotifications: true, // نوتیفیکیشن‌ها
};
```

## تست کردن وبسایت

### تست در مرورگرهای مختلف

1. Chrome/Edge: `Ctrl + Shift + I` برای باز کردن DevTools
2. Firefox: `F12` برای باز کردن Developer Tools
3. Safari: `Cmd + Option + I` (پس از فعال کردن Developer Menu)

### بررسی API Calls

1. Console را باز کنید (F12)
2. به تب "Network" بروید
3. فیلتر "XHR" را فعال کنید
4. اکشن‌های مختلف را در وبسایت انجام دهید
5. درخواست‌های API را مشاهده کنید

### تست Responsive Design

1. DevTools را باز کنید
2. دکمه "Toggle device toolbar" را کلیک کنید (Ctrl + Shift + M)
3. دستگاه‌های مختلف را انتخاب کنید

## رفع مشکلات رایج

### مشکل 1: API calls کار نمی‌کنند

**علت:** Backend server اجرا نشده یا CORS فعال نیست

**راه حل:**

1. مطمئن شوید Backend server در حال اجراست
2. در کنسول بررسی کنید که خطای CORS وجود دارد یا خیر
3. در فایل `server-example.js`، `cors()` را چک کنید

### مشکل 2: فونت فارسی نمایش داده نمی‌شود

**علت:** اتصال به Google Fonts برقرار نیست یا فایروال

**راه حل:**

1. اتصال اینترنت را بررسی کنید
2. فونت را به صورت محلی دانلود و در پروژه قرار دهید
3. در `styles.css` مسیر فونت را به فایل محلی تغییر دهید

### مشکل 3: تصاویر نمایش داده نمی‌شوند

**علت:** لینک‌های تصویر از Unsplash به اینترنت نیاز دارند

**راه حل:**

1. تصاویر دلخواه خود را دانلود کنید
2. در پوشه `images/` قرار دهید
3. مسیرهای تصویر در `index.html` را به‌روزرسانی کنید

### مشکل 4: localStorage کار نمی‌کند

**علت:** مرورگر در حالت Private/Incognito است یا localStorage غیرفعال است

**راه حل:**

1. از حالت Private/Incognito خارج شوید
2. تنظیمات مرورگر را بررسی کنید
3. از پروتکل `http://` یا `https://` استفاده کنید (نه `file://`)

### مشکل 5: Console پر از خطاست

**علت:** Backend server در حال اجرا نیست

**راه حل:**
این خطاها طبیعی هستند اگر Backend ندارید. برای حذف خطاها:

1. Backend server را اجرا کنید، یا
2. در `script.js`، تابع `makeApiRequest` را طوری تغییر دهید که خطاها را نادیده بگیرد

## استقرار (Deployment)

### استقرار Frontend

#### Netlify:

1. پوشه پروژه را به GitHub push کنید
2. به [netlify.com](https://netlify.com) بروید
3. "New site from Git" را انتخاب کنید
4. Repository خود را متصل کنید
5. تنظیمات build را خالی بگذارید (static site)
6. Deploy کنید

#### Vercel:

1. پروژه را به GitHub push کنید
2. به [vercel.com](https://vercel.com) بروید
3. "New Project" را انتخاب کنید
4. Repository را انتخاب کنید
5. Deploy کنید

#### GitHub Pages:

1. در GitHub، به Settings > Pages بروید
2. Source را "main branch" انتخاب کنید
3. Save کنید
4. وبسایت روی `https://username.github.io/repo-name` منتشر می‌شود

### استقرار Backend

#### Heroku:

```bash
# نصب Heroku CLI
npm install -g heroku

# ورود
heroku login

# ایجاد app
heroku create app-name

# Deploy
git push heroku main

# باز کردن app
heroku open
```

#### Railway:

1. به [railway.app](https://railway.app) بروید
2. "New Project" را انتخاب کنید
3. "Deploy from GitHub repo" را انتخاب کنید
4. Repository را انتخاب کنید
5. Environment variables را تنظیم کنید
6. Deploy کنید

#### DigitalOcean App Platform:

1. به [DigitalOcean](https://www.digitalocean.com/) بروید
2. "Create App" را انتخاب کنید
3. Repository را متصل کنید
4. تنظیمات را پیکربندی کنید
5. Deploy کنید

### متغیرهای محیطی برای Production

```env
NODE_ENV=production
PORT=443
API_BASE_URL=https://api.yourdomain.com/v1
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://yourdomain.com
```

## بهینه‌سازی برای Production

### 1. Minify کردن فایل‌ها

```bash
# نصب terser برای JavaScript
npm install -g terser

# Minify کردن
terser script.js -o script.min.js

# نصب csso برای CSS
npm install -g csso-cli

# Minify کردن
csso styles.css -o styles.min.css
```

سپس در `index.html`:

```html
<link rel="stylesheet" href="styles.min.css" />
<script src="script.min.js"></script>
```

### 2. فشرده‌سازی تصاویر

از ابزارهایی مانند:

- [TinyPNG](https://tinypng.com/)
- [ImageOptim](https://imageoptim.com/)
- [Squoosh](https://squoosh.app/)

### 3. فعال کردن Caching

در سرور، headers زیر را اضافه کنید:

```javascript
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000");
  next();
});
```

### 4. استفاده از CDN

برای فایل‌های استاتیک از CDN استفاده کنید:

- Cloudflare
- AWS CloudFront
- Fastly

## پشتیبانی و کمک

اگر به مشکلی برخوردید:

1. ابتدا لاگ‌های Console را بررسی کنید
2. مستندات README.md را مطالعه کنید
3. GitHub Issues را چک کنید
4. Issue جدید ایجاد کنید

## منابع مفید

- [MDN Web Docs](https://developer.mozilla.org/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Can I Use](https://caniuse.com/) - بررسی پشتیبانی مرورگرها

---

موفق باشید! 🚀
