/**
 * main.js --- Site interactions: navigation, theme, FAQ, contact form ---
 * تعاملات سایت: ناوبری، تم، سوالات متداول، فرم تماس
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

window.addEventListener('scroll', () => {
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    if (window.scrollY > 400) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.pointerEvents = 'all';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.pointerEvents = 'none';
    }
  }

  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    if (window.scrollY > 60) mainNav.classList.add('scrolled');
    else mainNav.classList.remove('scrolled');
  }

  const sectionIds = ['hero', 'features', 'showcase', 'pricing', 'faq', 'contact'];
  let currentSection = '';
  sectionIds.forEach(sectionId => {
    const sectionElement = document.getElementById(sectionId) || document.querySelector(`[id="${sectionId}"], span[id="${sectionId}"]`);
    if (sectionElement && window.scrollY >= sectionElement.getBoundingClientRect().top + window.scrollY - 120) {
      currentSection = sectionId;
    }
  });
  document.querySelectorAll('.nav-link').forEach(navLink => {
    navLink.classList.toggle('active', navLink.getAttribute('href') === '#' + currentSection);
  });
});

function toggleDark() {
  const htmlElement = document.documentElement;
  const isDark = htmlElement.classList.toggle('dark');
  const darkIcon = document.getElementById('dark-icon');
  if (darkIcon) darkIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
  localStorage.setItem('rodi-theme', isDark ? 'dark' : 'light');
}

if (localStorage.getItem('rodi-theme') === 'dark') {
  document.documentElement.classList.add('dark');
  const darkIcon = document.getElementById('dark-icon');
  if (darkIcon) darkIcon.textContent = 'light_mode';
}

let mobileMenuOpen = false;

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  if (!mobileMenu || !menuIcon) return;
  mobileMenu.style.opacity = mobileMenuOpen ? '1' : '0';
  mobileMenu.style.pointerEvents = mobileMenuOpen ? 'all' : 'none';
  mobileMenu.style.transform = mobileMenuOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(8px)';
  menuIcon.textContent = mobileMenuOpen ? 'close' : 'menu';
}

function closeMobileMenu() {
  mobileMenuOpen = false;
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  if (!mobileMenu || !menuIcon) return;
  mobileMenu.style.opacity = '0';
  mobileMenu.style.pointerEvents = 'none';
  mobileMenu.style.transform = 'translateX(-50%) translateY(8px)';
  menuIcon.textContent = 'menu';
}

const faqItems = [
  {
    q: 'آیا پنل خورشیدی برای من صرفه اقتصادی دارد؟',
    a: 'بسته به مصرف ماهانه برق، مساحت بام و تعرفه برق منطقه شما متفاوت است. بعد از بازدید رایگان، تیم Rodi تخمین بازگشت سرمایه و کاهش قبض را به شما می‌دهد.',
  },
  {
    q: 'مدت نصب چقدر طول می‌کشد؟',
    a: 'برای یک سیستم خانگی معمولاً بین ۲ تا ۵ روز کاری (بسته به ظرفیت و شرایط محل). پروژه‌های صنعتی بسته به مقیاس، برنامه‌ریزی جداگانه دارند.',
  },
  {
    q: 'عمر پنل و گارانتی چقدر است؟',
    a: 'پنل‌های استاندارد معمولاً ۲۵ تا ۳۰ سال عمر مفید دارند. گارانتی محصول بسته به برند سازنده متفاوت است؛ جزئیات در پیش‌فاکتور و قرارداد نوشته می‌شود.',
  },
  {
    q: 'یارانه یا تسهیلات دولتی شامل من می‌شود؟',
    a: 'برنامه‌های حمایتی هر سال به‌روز می‌شوند. در مشاوره رایگان، وضعیت یارانه و وام‌های مرتبط با نصب خانگی برای شما بررسی می‌شود.',
  },
  {
    q: 'نگهداری سالانه چه کارهایی لازم دارد؟',
    a: 'پنل‌ها نیاز کمی به نگهداری دارند: تمیزکاری دوره‌ای سطح، بازرسی اتصالات و بررسی عملکرد اینورتر. می‌توانید قرارداد سرویس سالانه هم داشته باشید.',
  },
  {
    q: 'اتصال به شبکه برق چگونه است؟',
    a: 'سیستم به شبکه سراسری وصل می‌شود (on-grid). برق تولیدی ابتدا مصرف داخلی را تأمین می‌کند؛ مازاد طبق قوانین و قرارداد اداره برق محاسبه می‌شود.',
  },
  {
    q: 'آیا برای کسب‌وکارهای کوچک هم مناسب است؟',
    a: 'بله. مغازه، کارگاه و واحدهای تجاری با مصرف روزانه بالا معمولاً بازگشت سرمایه بهتری دارند. پکیج صنعتی و تجاری را جداگانه بررسی می‌کنیم.',
  },
  {
    q: 'چطور مشاوره رایگان بگیرم؟',
    a: 'فرم تماس را پر کنید، از واتساپ پیام دهید، یا با شمارهٔ درج‌شده در سایت تماس بگیرید. هماهنگی بازدید در اسرع وقت انجام می‌شود.',
  },
];

function renderFaqList() {
  const faqListElement = document.getElementById('faq-list');
  if (!faqListElement) return;

  faqItems.forEach((item, index) => {
    const faqRow = document.createElement('div');
    faqRow.className = 'border-b border-outline-variant/30';
    faqRow.innerHTML = `
      <button onclick="toggleFaq(${index})" class="w-full py-5 flex justify-between items-center gap-4 text-start group">
        <h3 class="text-lg md:text-xl font-medium text-on-surface group-hover:text-primary transition-colors">${item.q}</h3>
        <span id="faq-icon-${index}" class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-all flex-shrink-0">add</span>
      </button>
      <div id="faq-body-${index}" class="overflow-hidden max-h-0 transition-all duration-300 ease-in-out">
        <p class="pb-5 text-on-surface-variant font-body-md text-body-md leading-relaxed">${item.a}</p>
      </div>`;
    faqListElement.appendChild(faqRow);
  });
}

let openFaqIndex = null;

function toggleFaq(faqIndex) {
  const faqBody = document.getElementById('faq-body-' + faqIndex);
  const faqIcon = document.getElementById('faq-icon-' + faqIndex);
  if (!faqBody || !faqIcon) return;

  if (openFaqIndex !== null && openFaqIndex !== faqIndex) {
    const previousBody = document.getElementById('faq-body-' + openFaqIndex);
    const previousIcon = document.getElementById('faq-icon-' + openFaqIndex);
    if (previousBody) previousBody.style.maxHeight = '0';
    if (previousIcon) previousIcon.textContent = 'add';
  }

  if (openFaqIndex === faqIndex) {
    faqBody.style.maxHeight = '0';
    faqIcon.textContent = 'add';
    openFaqIndex = null;
  } else {
    faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
    faqIcon.textContent = 'remove';
    openFaqIndex = faqIndex;
  }
}

function applySiteConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  const whatsappLink = document.getElementById('contact-whatsapp-link');
  if (whatsappLink) {
    const message = encodeURIComponent(SITE_CONFIG.whatsappMessage);
    whatsappLink.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
  }

  const footerPhone = document.getElementById('footer-phone');
  const footerEmail = document.getElementById('footer-email');
  const footerAddress = document.getElementById('footer-address');
  if (footerPhone) footerPhone.textContent = SITE_CONFIG.phoneDisplay;
  if (footerEmail) footerEmail.textContent = SITE_CONFIG.email;
  if (footerAddress) footerAddress.textContent = SITE_CONFIG.address;
}

function submitContact(submitButton) {
  const nameInput = document.getElementById('contact-name');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');

  const customerName = nameInput?.value.trim() || '';
  const customerPhone = phoneInput?.value.trim() || '';
  const customerMessage = messageInput?.value.trim() || '';

  if (!customerName || !customerPhone) {
    alert('لطفاً نام و شماره موبایل را وارد کنید.');
    return;
  }

  submitButton.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>';
  submitButton.disabled = true;

  const whatsappText = encodeURIComponent(
    `درخواست مشاوره پنل خورشیدی\nنام: ${customerName}\nموبایل: ${customerPhone}\nپیام: ${customerMessage || '—'}`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG?.whatsappNumber || '989123456789'}?text=${whatsappText}`;

  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    submitButton.innerHTML = '<span class="material-symbols-outlined text-[18px] text-green-500">check_circle</span><span>ارسال شد — واتساپ باز شد</span>';
    setTimeout(() => {
      submitButton.innerHTML = '<span>ارسال درخواست</span><span class="material-symbols-outlined text-[18px] icon-rtl-flip">send</span>';
      submitButton.disabled = false;
    }, 3000);
  }, 800);
}

document.addEventListener('partials:loaded', () => {
  renderFaqList();
  applySiteConfig();
});

if (document.getElementById('faq-list')) {
  renderFaqList();
  applySiteConfig();
}
