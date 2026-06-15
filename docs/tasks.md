<div dir="rtl" style="text-align:right;">

# tasks — فارسی‌سازی سایت Rodi

## فاز ۱ — زیرساخت

- [x] 1.1 `index.html`: `lang="fa"`, `dir="rtl"`, متا SEO و Open Graph
- [x] 1.2 فونت Vazirmatn در `tailwind-config.js`
- [x] 1.3 ایجاد `assets/css/rtl.css` و `site-config.js`
- [x] 1.4 **فاز done:** صفحه راست‌چین با فونت فارسی لود می‌شود

## فاز ۲ — محتوا

- [x] 2.1 Hero، slogan، CTA — متن خورشیدی فارسی
- [x] 2.2 navigation و mobile-menu فارسی
- [x] 2.3 feature-01/02، pricing، footer، contact
- [x] 2.4 FAQ فارسی در `main.js`
- [x] 2.5 showcase اخبار فارسی
- [x] 2.6 chat-widget فارسی
- [x] 2.7 **فاز done:** هیچ متن Horizon/SaaS در UI نیست

## فاز ۳ — اعتماد و تبدیل

- [x] 3.1 دکمهٔ شناور واتساپ + لینک در فرم تماس
- [x] 3.2 بلوک اعتماد در Hero (سال، کیلووات، پروژه)
- [x] 3.3 فرم → باز شدن واتساپ با پیام ساختاریافته
- [ ] 3.4 جایگزینی placeholderهای `site-config.js` با اطلاعات واقعی *(کاربر)*

## فاز ۴ — تست و مستندات

- [ ] 4.1 تست دستی موبایل ۳۷۵px، تبلت، دسکتاپ
- [ ] 4.2 تست حالت تاریک — خوانایی فارسی
- [x] 4.3 `docs/design.md` و همین `tasks.md`
- [ ] 4.4 **فاز done:** `node server.js` — بدون اسکرول افقی و لینک‌های منو کار کنند

## بعداً (اختیاری)

- [ ] ماشین‌حساب صرفه‌جویی برق در Hero
- [ ] بخش نمونه کار با عکس واقعی
- [ ] سوییچ FA/EN
- [ ] اتصال فرم به ایمیل یا n8n به‌جای فقط واتساپ

</div>

<style>
body, p, h1, h2, h3, h4, h5, h6, li, ul, ol {
  font-family: 'Segoe UI', Segoe, Tahoma, Geneva, Verdana, sans-serif !important;
  direction: rtl;
  text-align: right;
}
pre, code { direction: ltr; text-align: left; }
.task-list-item input[type="checkbox"] { margin: 0 0.5em 0 0 !important; }
</style>
