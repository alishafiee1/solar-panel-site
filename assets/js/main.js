/**
 * main.js --- Site interactions: navigation, theme, FAQ, contact form ---
 * تعاملات سایت: ناوبری، تم، سوالات متداول، فرم تماس
 */

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Scroll Events ──
window.addEventListener('scroll', () => {
  // Back to top visibility
  const btn = document.getElementById('back-to-top');
  if (window.scrollY > 400) { btn.style.opacity='1'; btn.style.pointerEvents='all'; }
  else { btn.style.opacity='0'; btn.style.pointerEvents='none'; }

  // Navbar: مات در ابتدا، شفاف بعد از scroll
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Active nav link highlight
  const sections = ['hero','features','showcase','pricing','faq','contact'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id) || document.querySelector(`[id="${id}"], span[id="${id}"]`);
    if (el && window.scrollY >= el.getBoundingClientRect().top + window.scrollY - 120) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── Dark Mode Toggle ──
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  document.getElementById('dark-icon').textContent = isDark ? 'light_mode' : 'dark_mode';
  localStorage.setItem('rodi-theme', isDark ? 'dark' : 'light');
}
// Restore saved theme
if (localStorage.getItem('rodi-theme') === 'dark') {
  document.documentElement.classList.add('dark');
  const darkIcon = document.getElementById('dark-icon');
  if (darkIcon) darkIcon.textContent = 'light_mode';
}

// ── Mobile Menu ──
let mobileOpen = false;
function toggleMobileMenu() {
  mobileOpen = !mobileOpen;
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  menu.style.opacity = mobileOpen ? '1' : '0';
  menu.style.pointerEvents = mobileOpen ? 'all' : 'none';
  menu.style.transform = mobileOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(8px)';
  icon.textContent = mobileOpen ? 'close' : 'menu';
}
function closeMobileMenu() {
  mobileOpen = false;
  const menu = document.getElementById('mobile-menu');
  menu.style.opacity = '0';
  menu.style.pointerEvents = 'none';
  menu.style.transform = 'translateX(-50%) translateY(8px)';
  document.getElementById('menu-icon').textContent = 'menu';
}

// ── FAQ Accordion ──
const faqs = [
  { q: 'What is Rodi?', a: 'Rodi is an AI-powered platform that transforms simple prompts into fully functional web applications — complete with pages, authentication, data, and workflows.' },
  { q: 'How does Rodi work?', a: 'Describe the app you want to build, and Rodi automatically generates the UI, backend logic, and infrastructure. No traditional coding required.' },
  { q: 'Can I export my code?', a: 'Yes! You can export your project as clean, production-ready HTML, CSS, and JavaScript files at any time from your dashboard.' },
  { q: 'Is there a free trial?', a: 'Absolutely. The Basic plan is free forever with up to 3 projects. No credit card required to get started.' },
  { q: 'How secure is my data?', a: 'We use enterprise-grade encryption for all data at rest and in transit. Your projects and user data are fully isolated and protected.' },
  { q: 'Can I collaborate with my team in real-time?', a: 'Yes, the Scale and Enterprise plans include real-time collaboration, letting multiple team members work on the same project simultaneously.' },
  { q: 'Do you offer custom enterprise solutions?', a: 'Yes. Our Enterprise plan includes custom SLAs, dedicated account management, on-premise deployment options, and priority support. Contact our sales team to discuss your needs.' },
  { q: 'What support is available on the free plan?', a: 'Free plan users have access to our community forum and documentation. Paid plans include email and priority support.' },
];

const faqList = document.getElementById('faq-list');
faqs.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'border-b border-outline-variant/30';
  div.innerHTML = `
    <button onclick="toggleFaq(${i})" class="w-full py-5 flex justify-between items-center gap-4 text-left group">
      <h3 class="text-xl font-light text-on-surface group-hover:text-primary transition-colors">${item.q}</h3>
      <span id="faq-icon-${i}" class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-all flex-shrink-0">add</span>
    </button>
    <div id="faq-body-${i}" class="overflow-hidden max-h-0 transition-all duration-300 ease-in-out">
      <p class="pb-5 text-on-surface-variant font-body-md text-body-md leading-relaxed">${item.a}</p>
    </div>`;
  faqList.appendChild(div);
});

let openFaq = null;
function toggleFaq(i) {
  const body = document.getElementById('faq-body-' + i);
  const icon = document.getElementById('faq-icon-' + i);
  if (openFaq !== null && openFaq !== i) {
    document.getElementById('faq-body-' + openFaq).style.maxHeight = '0';
    document.getElementById('faq-icon-' + openFaq).textContent = 'add';
  }
  if (openFaq === i) {
    body.style.maxHeight = '0'; icon.textContent = 'add'; openFaq = null;
  } else {
    body.style.maxHeight = body.scrollHeight + 'px'; icon.textContent = 'remove'; openFaq = i;
  }
}

// ── Contact Form ──
function submitContact(btn) {
  btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>';
  setTimeout(() => {
    btn.innerHTML = '<span class="material-symbols-outlined text-[18px] text-green-500">check_circle</span><span>Message Sent!</span>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><span class="material-symbols-outlined text-[18px]">send</span>';
      btn.disabled = false;
    }, 3000);
  }, 1500);
}