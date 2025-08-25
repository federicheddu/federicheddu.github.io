/* Photos page script placeholder
   The previous polaroid/drag functionality has been removed while the page is rebuilt from scratch. */

// Film canisters data and interactive gallery (similar structure to music.js)
const films = [
  { name: 'Kodak Ektar 100', src: 'media/film/Ektar_100.svg', frames: ['media/photos/P1080829.jpg','media/photos/P1080832.jpg','media/photos/P1080930.jpg'] },
  { name: 'Fujifilm Pro 400H', src: 'media/film/Fuji_Pro_400H.svg', frames: ['media/photos/P1080951_2.jpg','media/photos/P1090006.jpg','media/photos/P1090034.jpg'] },
  { name: 'Fujifilm Superia 200', src: 'media/film/Fuji_Superia_200.svg', frames: ['media/photos/P1090052.jpg','media/photos/P1090060.jpg','media/photos/P1080829.jpg'] },
  { name: 'Ilford Delta 100', src: 'media/film/Ilford_Delta_100.svg', frames: ['media/photos/P1080832.jpg','media/photos/P1080930.jpg','media/photos/P1080951_2.jpg'] },
  { name: 'Ilford FP4', src: 'media/film/Ilford_FP4.svg', frames: ['media/photos/P1090006.jpg','media/photos/P1090034.jpg','media/photos/P1090052.jpg'] },
  { name: 'Kodak Portra 160', src: 'media/film/Kodak_Portra_160.svg', frames: ['media/photos/P1090060.jpg','media/photos/P1080829.jpg','media/photos/P1080832.jpg'] },
];

const filmGallery = document.querySelector('.film-gallery');
if (filmGallery && films.length) {
  filmGallery.innerHTML = '';
  films.forEach((film) => {
    const card = document.createElement('div');
    card.className = 'film-card';
    const framesHtml = (film.frames || []).slice(0,3).map(src => `
        <div class="film-frame"><img src="${src}" alt="Frame" loading="lazy" decoding="async"></div>
    `).join('');
    card.innerHTML = `
      <div class="film-canister" role="button" tabindex="0" aria-pressed="false" aria-label="${film.name}">
        <img src="${film.src}" alt="${film.name}">
        <div class="film-strip" aria-hidden="true">${framesHtml}</div>
      </div>
      <div class="film-title">${film.name}</div>
    `;

    const canister = card.querySelector('.film-canister');
    const strip = card.querySelector('.film-strip');

    const layoutStrip = () => {
      if (!card.classList.contains('active')) return;
      const galleryRect = filmGallery.getBoundingClientRect();
      const canRect = canister.getBoundingClientRect();
      const rightSpace = Math.max(0, galleryRect.right - canRect.right - 8);
      strip.style.width = `${rightSpace}px`;

      const cs = getComputedStyle(strip);
      const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const gap = parseFloat(cs.columnGap || cs.gap || '0');
      const frames = Array.from(strip.querySelectorAll('.film-frame'));
      const available = Math.max(0, strip.clientWidth - pad - gap * (frames.length - 1));
      const frameW = frames.length ? available / frames.length : 0;
      frames.forEach(f => { f.style.width = `${frameW}px`; });
    };

    const openCard = (targetCard) => {
      // Close any other open card
      document.querySelectorAll('.film-card.active').forEach(c => {
        if (c !== targetCard) {
          c.classList.remove('active');
          const btn = c.querySelector('.film-canister');
          if (btn) btn.setAttribute('aria-pressed', 'false');
        }
      });
      // Toggle target
      const can = targetCard.querySelector('.film-canister');
      const wasActive = targetCard.classList.contains('active');
      if (wasActive) {
        targetCard.classList.remove('active');
        if (can) can.setAttribute('aria-pressed', 'false');
        return;
      }

      // Add measuring state first to reserve space and avoid jank
      targetCard.classList.add('measuring');
      requestAnimationFrame(() => {
        // Now activate and layout
        targetCard.classList.add('active');
        targetCard.classList.remove('measuring');
        if (can) can.setAttribute('aria-pressed', 'true');
        requestAnimationFrame(() => {
          layoutStrip();
        });
      });
    };

    const canisterClick = () => openCard(card);

    canister.addEventListener('click', canisterClick);
    canister.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        canisterClick();
      }
    });

    window.addEventListener('resize', layoutStrip);

    filmGallery.appendChild(card);
  });
}
