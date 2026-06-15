/**
 * custom-cursor.js --- Smooth custom cursor for desktop pointer devices ---
 * نشانگر سفارشی نرم برای دستگاه‌های دسکتاپ
 */
const cursor = document.getElementById('custom-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  if (cursor.style.display === 'none') {
    cursor.style.display = 'block';
    cursorX = mouseX;
    cursorY = mouseY;
  }
});

function animateCursor() {
  const deltaX = mouseX - cursorX;
  const deltaY = mouseY - cursorY;

  cursorX += deltaX * 0.2;
  cursorY += deltaY * 0.2;

  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener('mouseenter', () => {
  cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
  cursor.style.display = 'none';
});
