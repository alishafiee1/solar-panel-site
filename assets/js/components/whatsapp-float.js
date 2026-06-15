/**
 * whatsapp-float.js --- Sets WhatsApp link from site config ---
 * تنظیم لینک واتساپ از پیکربندی سایت
 */
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('whatsapp-float');
  if (!button || typeof SITE_CONFIG === 'undefined') return;

  const text = encodeURIComponent(SITE_CONFIG.whatsappMessage);
  button.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
});
