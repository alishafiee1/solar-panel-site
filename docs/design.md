<div dir="rtl" style="text-align:right;">

# طراحی — فارسی‌سازی و برند Rodi

**یک خط:** سایت لندینگ از قالب انگلیسی Horizon به تجربهٔ فارسی راست‌چین با محتوای پنل خورشیدی تبدیل شد؛ ساختار partialها و لوگوی متحرک خورشید حفظ شده است.

---

## تصویر کلی

بازدیدکننده صفحهٔ تک‌صفحه‌ای فارسی می‌بیند: Hero با CTA مشاوره، بلوک اعتماد، خدمات، اخبار، پکیج‌ها، FAQ، تماس و CTA پایانی. منوی بالا به بخش‌های داخلی لنگر می‌زند؛ یک لینک خارجی به کاتالوگ DMEGC دارد.

تنظیمات برند و تماس در [`assets/js/config/site-config.js`](../assets/js/config/site-config.js) متمرکز شده — شماره واتساپ، ایمیل و آدرس placeholder تا جایگزینی نهایی.

---

## RTL و فونت

- `html`: `lang="fa"` و `dir="rtl"`
- فونت: Vazirmatn در Tailwind و CSS
- [`assets/css/rtl.css`](../assets/css/rtl.css): موقعیت چت، واتساپ، دکمه بازگشت بالا، marquee

---

## فرم تماس

فیلدها: نام، موبایل (الزامی)، ایمیل اختیاری، پیام. با کلیک «ارسال درخواست»، پیام از طریق واتساپ (`wa.me`) با متن از پیش‌ساخته باز می‌شود. دکمهٔ جداگانهٔ واتساپ در فرم و دکمهٔ شناور کنار چت.

---

## چت ویجت

پشتیبان فارسی؛ اتصال اختیاری به webhook n8n (همان قبل). پیشنهادهای سریع: پکیج‌ها، هزینه، بازدید رایگان.

---

## فایل‌های محتوا

| بخش | فایل |
|-----|------|
| Hero + اعتماد | `assets/partials/sections/hero.html` |
| شعار | `slogan.html` |
| خدمات | `feature-01.html`, `feature-02.html` |
| اخبار | `showcase.html` |
| پکیج | `pricing.html` |
| FAQ | `faq.html` + `main.js` |
| تماس | `contact.html` |
| CTA | `cta.html` |

---

## چیزهایی که عمداً نماند

- متن Horizon / SaaS
- قیمت دلاری $0 / $20
- منوی کامل DMEGC به‌جای منوی داخلی

</div>

<style>
body, p, h1, h2, h3, h4, h5, h6, li, ul, ol {
  font-family: 'Segoe UI', Segoe, Tahoma, Geneva, Verdana, sans-serif !important;
  direction: rtl;
  text-align: right;
}
pre, code { direction: ltr; text-align: left; }
</style>
