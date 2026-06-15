/**
 * partials-loader.js --- Loads HTML partials and dependent scripts on page init ---
 * بارگذاری بخش‌های HTML و اسکریپت‌های وابسته هنگام شروع صفحه
 */
const PARTIAL_SLOTS = [
  { id: 'site-navigation', path: 'assets/partials/navigation.html' },
  { id: 'site-mobile-menu', path: 'assets/partials/mobile-menu.html' },
  { id: 'site-contact', path: 'assets/partials/contact.html' },
  { id: 'site-footer', path: 'assets/partials/footer.html' },
  { id: 'site-chat-widget', path: 'assets/partials/chat-widget.html' },
];

const MAIN_SECTIONS = [
  'assets/partials/sections/hero.html',
  'assets/partials/sections/slogan.html',
  'assets/partials/sections/feature-01.html',
  'assets/partials/sections/feature-02.html',
  'assets/partials/sections/showcase.html',
  'assets/partials/sections/pricing.html',
  'assets/partials/sections/faq.html',
  'assets/partials/sections/cta.html',
];

const DEPENDENT_SCRIPTS = [
  'assets/js/components/sun-logo-scene.js',
  'assets/js/main.js',
  'assets/js/components/chat-widget.js',
];

async function fetchPartial(partialPath) {
  const response = await fetch(partialPath);
  if (!response.ok) throw new Error(`Failed to load ${partialPath}`);
  return response.text();
}

function loadScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptPath;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${scriptPath}`));
    document.body.appendChild(script);
  });
}

async function loadMainSections() {
  const mainSlot = document.getElementById('site-main');
  if (!mainSlot) return;

  const sectionContents = await Promise.all(MAIN_SECTIONS.map(fetchPartial));
  mainSlot.innerHTML = `<main class="max-w-[1728px] mx-auto w-full">\n${sectionContents.join('\n')}\n</main>`;
}

async function loadPartials() {
  await Promise.all([
    loadMainSections(),
    ...PARTIAL_SLOTS.map(async ({ id, path: partialPath }) => {
      const slot = document.getElementById(id);
      if (!slot) return;
      slot.innerHTML = await fetchPartial(partialPath);
    }),
  ]);

  for (const scriptPath of DEPENDENT_SCRIPTS) {
    await loadScript(scriptPath);
  }

  document.dispatchEvent(new CustomEvent('partials:loaded'));
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials().catch((error) => console.error('Partial load error:', error));
});
