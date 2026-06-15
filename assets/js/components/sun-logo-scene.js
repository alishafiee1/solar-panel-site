/**
 * sun-logo-scene.js --- Animated sun/moon logo synced with page scroll ---
 * انیمیشن لوگوی خورشید/ماه همگام با اسکرول صفحه
 */
(function initializeSunLogoScene() {
  const logoSvg = document.querySelector('#sun-logo-svg');
  if (!logoSvg) return;

  function queryLogo(selector) {
    return logoSvg.querySelector(selector);
  }

  function updateSunScene() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = documentHeight > 0 ? Math.min(scrollTop / documentHeight, 1) : 0;

    const positionX = 7 + (73 - 7) * scrollProgress;
    const horizonY = 24;
    const topY = 5;
    const positionY = horizonY - (horizonY - topY) * Math.sin(Math.PI * scrollProgress);

    const celestialGroup = queryLogo('#celestial-group');
    if (celestialGroup) {
      celestialGroup.setAttribute('transform', `translate(${positionX},${positionY})`);
    }

    const noonIntensity = Math.sin(Math.PI * scrollProgress);
    const moonPhase = Math.max(0, (scrollProgress - 0.75) / 0.25);
    const sunPhase = 1 - moonPhase;

    const sunCore = queryLogo('#sun-core');
    const sunInner = queryLogo('#sun-inner');
    const moonGroup = queryLogo('#moon-group');
    const sunRays = queryLogo('#sun-rays');

    if (sunCore) sunCore.style.opacity = sunPhase;
    if (sunInner) sunInner.style.opacity = sunPhase * 0.7;
    if (sunRays) sunRays.style.opacity = Math.max(0, noonIntensity * sunPhase);
    if (moonGroup) moonGroup.style.opacity = moonPhase;

    ['sr1', 'sr2', 'sr3', 'sr4', 'sr5', 'sr6', 'sr7', 'sr8'].forEach((rayId) => {
      const ray = queryLogo(`#${rayId}`);
      if (ray) ray.style.opacity = noonIntensity * sunPhase;
    });

    const skyTopElement = queryLogo('#skyTop');
    const skyBottomElement = queryLogo('#skyBot');
    if (skyTopElement && skyBottomElement) {
      if (moonPhase > 0) {
        const nightRed = Math.round(15 + 41 * (1 - moonPhase));
        const nightGreen = Math.round(25 + 75 * (1 - moonPhase));
        const nightBlue = Math.round(60 + 120 * (1 - moonPhase));
        skyTopElement.setAttribute('stop-color', `rgb(${nightRed},${nightGreen},${nightBlue})`);
        skyTopElement.setAttribute('stop-opacity', 0.5 + moonPhase * 0.4);
        skyBottomElement.setAttribute('stop-color', '#0a1628');
        skyBottomElement.setAttribute('stop-opacity', moonPhase * 0.3);
      } else if (scrollProgress < 0.15) {
        const dawnBlend = scrollProgress / 0.15;
        skyTopElement.setAttribute(
          'stop-color',
          `rgb(${Math.round(255 * dawnBlend + 56 * (1 - dawnBlend))},${Math.round(160 * dawnBlend + 189 * (1 - dawnBlend))},${Math.round(80 * dawnBlend + 248 * (1 - dawnBlend))})`
        );
        skyTopElement.setAttribute('stop-opacity', 0.25);
        skyBottomElement.setAttribute('stop-color', '#FF8C42');
        skyBottomElement.setAttribute('stop-opacity', dawnBlend * 0.15);
      } else {
        skyTopElement.setAttribute('stop-color', '#38BDF8');
        skyTopElement.setAttribute('stop-opacity', 0.15 + noonIntensity * 0.1);
        skyBottomElement.setAttribute('stop-color', '#C084FC');
        skyBottomElement.setAttribute('stop-opacity', 0.06);
      }
    }

    const starsGroup = queryLogo('#stars-group');
    if (starsGroup) starsGroup.style.opacity = moonPhase;

    const beamOpacity = noonIntensity * sunPhase * 0.85;
    const beamColor = noonIntensity > 0.7 ? '#FFD700' : '#FFB347';
    const panelAngle = -25 + scrollProgress * 50;

    [1, 2, 3].forEach((panelIndex) => {
      const beam = queryLogo(`#panel-beam-${panelIndex}`);
      if (beam) {
        beam.style.opacity = beamOpacity;
        beam.setAttribute('stroke', beamColor);
      }
      const panelTilt = queryLogo(`#panel-tilt-${panelIndex}`);
      if (panelTilt) panelTilt.setAttribute('transform', `rotate(${panelAngle})`);
    });

    const arcPath = queryLogo('#arc-path');
    if (arcPath) {
      arcPath.setAttribute('stroke', moonPhase > 0.5 ? '#8888cc' : '#FF5E3A');
      arcPath.setAttribute('stroke-opacity', 0.15 + noonIntensity * 0.15);
    }
  }

  window.addEventListener('scroll', updateSunScene, { passive: true });
  window.addEventListener('resize', updateSunScene, { passive: true });
  window.addEventListener('load', updateSunScene);
  requestAnimationFrame(updateSunScene);
})();
