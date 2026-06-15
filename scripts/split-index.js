/**
 * split-index.js --- One-time script to split monolithic index.html into modular structure ---
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function between(startMarker, endMarker, includeMarkers = false) {
  const start = html.indexOf(startMarker);
  if (start === -1) throw new Error(`Start marker not found: ${startMarker}`);
  const end = html.indexOf(endMarker, start + startMarker.length);
  if (end === -1) throw new Error(`End marker not found after: ${startMarker}`);
  const sliceEnd = end + (includeMarkers ? endMarker.length : 0);
  return html.substring(includeMarkers ? start : start + startMarker.length, sliceEnd).trim();
}

function betweenStyle(afterMarker) {
  const start = html.indexOf('<style>', html.indexOf(afterMarker));
  const end = html.indexOf('</style>', start);
  return html.substring(start + '<style>'.length, end).trim();
}

function betweenScript(afterMarker) {
  const start = html.indexOf('<script>', html.indexOf(afterMarker));
  const end = html.indexOf('</script>', start);
  return html.substring(start + '<script>'.length, end).trim();
}

function ensureDir(relativePath) {
  const full = path.join(ROOT, relativePath);
  fs.mkdirSync(full, { recursive: true });
  return full;
}

function write(relativePath, content) {
  const full = path.join(ROOT, relativePath);
  ensureDir(path.dirname(relativePath));
  fs.writeFileSync(full, content, 'utf8');
  console.log('  wrote', relativePath);
}

// ── CSS ──
write('assets/css/base.css', between('<style>', '</style>', false).split('\n').slice(0, 45).join('\n').trim() || betweenStyle(''));
// base.css from first style block in head
const headStyleStart = html.indexOf('<style>');
const headStyleEnd = html.indexOf('</style>', headStyleStart);
write('assets/css/base.css', html.substring(headStyleStart + 7, headStyleEnd).trim());

write('assets/css/navigation.css', betweenStyle('<!-- Navigation -->'));
write('assets/css/marquee.css', betweenStyle('<!-- Marquee Section -->'));

const chatStyleStart = html.indexOf('<!-- ═══ CHAT WIDGET ═══ -->');
write('assets/css/chat-widget.css', betweenStyle('<!-- ═══ CHAT WIDGET ═══ -->'));

// ── JS config ──
const tailwindStart = html.indexOf('<script id="tailwind-config">');
const tailwindEnd = html.indexOf('</script>', tailwindStart);
write('assets/js/config/tailwind-config.js', html.substring(tailwindStart + 28, tailwindEnd).trim());

write('assets/js/components/sun-logo-scene.js', betweenScript('#celestial-group, #panel-tilt'));
write('assets/js/main.js', between('<!-- ═══ ENHANCEMENTS SCRIPT ═══ -->', '<!-- ═══ CHAT WIDGET ═══ -->').replace(/^<script>\s*/,'').replace(/\s*<\/script>$/,'').trim() || betweenScript('<!-- ═══ ENHANCEMENTS SCRIPT ═══ -->'));
write('assets/js/components/chat-widget.js', betweenScript('let chatOpen = false'));
write('assets/js/components/custom-cursor.js', betweenScript('const cursor = document.getElementById'));

// ── HTML partials ──
write('assets/partials/navigation.html', between('<!-- Navigation -->', '<!-- Mobile Menu -->').replace(/^<style>[\s\S]*?<\/style>\s*/,'').trim());
write('assets/partials/mobile-menu.html', between('<!-- Mobile Menu -->', '<main class="max-w-[1728px] mx-auto w-full">').trim());

const mainStart = html.indexOf('<main class="max-w-[1728px] mx-auto w-full">');
const mainEnd = html.indexOf('</main>', mainStart);
write('assets/partials/main-content.html', html.substring(mainStart, mainEnd + '</main>'.length).trim());

write('assets/partials/contact.html', between('<!-- Contact Section -->', '<!-- Footer -->').trim());
write('assets/partials/footer.html', between('<!-- Footer -->', '<!-- Back to Top Button -->').trim() + '\n\n' + between('<!-- Back to Top Button -->', '<!-- ═══ ENHANCEMENTS SCRIPT ═══ -->').trim());

const chatHtmlStart = html.indexOf('<div id="chat-widget">');
const chatHtmlEnd = html.indexOf('</div>\n\n<script>\n  let chatOpen', chatHtmlStart);
write('assets/partials/chat-widget.html', html.substring(chatHtmlStart, chatHtmlEnd + '</div>'.length).trim());

// ── partials loader ──
write('assets/js/partials-loader.js', `/**
 * partials-loader.js --- Loads HTML partials into placeholder elements on page init ---
 */
const PARTIAL_SLOTS = [
  { id: 'site-navigation', path: 'assets/partials/navigation.html' },
  { id: 'site-mobile-menu', path: 'assets/partials/mobile-menu.html' },
  { id: 'site-main', path: 'assets/partials/main-content.html' },
  { id: 'site-contact', path: 'assets/partials/contact.html' },
  { id: 'site-footer', path: 'assets/partials/footer.html' },
  { id: 'site-chat-widget', path: 'assets/partials/chat-widget.html' },
];

async function loadPartials() {
  await Promise.all(
    PARTIAL_SLOTS.map(async ({ id, path: partialPath }) => {
      const slot = document.getElementById(id);
      if (!slot) return;
      const response = await fetch(partialPath);
      if (!response.ok) throw new Error('Failed to load ' + partialPath);
      slot.innerHTML = await response.text();
    })
  );
  document.dispatchEvent(new CustomEvent('partials:loaded'));
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials().catch((error) => console.error('Partial load error:', error));
});
`);

// ── new index.html ──
const newIndex = `<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Horizon - Build Limitless Apps</title>

  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/navigation.css">
  <link rel="stylesheet" href="assets/css/marquee.css">
  <link rel="stylesheet" href="assets/css/chat-widget.css">

  <script src="assets/js/config/tailwind-config.js"></script>
</head>
<body class="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">

  <div id="site-navigation"></div>
  <div id="site-mobile-menu"></div>
  <div id="site-main"></div>
  <div id="site-contact"></div>
  <div id="site-footer"></div>
  <div id="site-chat-widget"></div>

  <div id="custom-cursor"></div>

  <script src="assets/js/partials-loader.js"></script>
  <script src="assets/js/components/sun-logo-scene.js" defer></script>
  <script src="assets/js/main.js" defer></script>
  <script src="assets/js/components/chat-widget.js" defer></script>
  <script src="assets/js/components/custom-cursor.js" defer></script>
</body>
</html>
`;

// Backup original
if (!fs.existsSync(path.join(ROOT, 'index.original.html'))) {
  fs.copyFileSync(path.join(ROOT, 'index.html'), path.join(ROOT, 'index.original.html'));
  console.log('  backup: index.original.html');
}

write('index.html', newIndex);
console.log('\nDone. Run: node server.js');
