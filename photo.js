// Photo page JS: display photos as polaroids
// Example photos array
const photos = [
  { src: "media/photos/P1080829.jpg", caption: "Dangerous" },
  { src: "media/photos/P1080832.jpg", caption: "Surfin'" },
  { src: "media/photos/P1080930.jpg", caption: "Waves" },
  { src: "media/photos/P1080951_2.jpg", caption: "Night Opera" },
  { src: "media/photos/P1090006.jpg", caption: "Reflection" },
  { src: "media/photos/P1090034.jpg", caption: "Giorgio" },
  { src: "media/photos/P1090052.jpg", caption: "Pietro & Giovanni" },
  { src: "media/photos/P1090060.jpg", caption: "Chill" },
];

const gallery = document.querySelector('.polaroid-gallery');
if (gallery && photos.length) {
  gallery.innerHTML = '';
  // Make gallery relative for absolute positioning
  gallery.style.position = 'relative';
  gallery.style.minHeight = '600px';
  photos.forEach(ph => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    const img = document.createElement('img');
    img.src = ph.src;
    img.alt = ph.caption;
    // Set aspect ratio after image loads
    img.addEventListener('load', function() {
      if (img.naturalHeight > img.naturalWidth) {
        img.style.aspectRatio = '3 / 4';
      } else {
        img.style.aspectRatio = '4 / 3';
      }
    });
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = ph.caption;
    polaroid.appendChild(img);
    polaroid.appendChild(caption);
    // Random rotation for scattered effect
    polaroid.style.transform = `rotate(${Math.random()*6-3}deg)`;

    // Make polaroid draggable
    polaroid.style.cursor = 'grab';
    polaroid.style.position = 'absolute';
    // Place randomly in the gallery area
    polaroid.style.left = Math.random() * 60 + 10 + '%';
    polaroid.style.top = Math.random() * 40 + 10 + '%';

    let offsetX, offsetY, isDragging = false;

    function onPointerDown(e) {
      isDragging = true;
      polaroid.style.cursor = 'grabbing';
      const rect = polaroid.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
      // For touch
      document.addEventListener('touchmove', onPointerMove, {passive: false});
      document.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      if (e.preventDefault) e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const galleryRect = gallery.getBoundingClientRect();
      let left = clientX - galleryRect.left - offsetX;
      let top = clientY - galleryRect.top - offsetY;
      // Clamp within gallery
      left = Math.max(0, Math.min(left, galleryRect.width - polaroid.offsetWidth));
      top = Math.max(0, Math.min(top, galleryRect.height - polaroid.offsetHeight));
      polaroid.style.left = left + 'px';
      polaroid.style.top = top + 'px';
    }

    function onPointerUp() {
      isDragging = false;
      polaroid.style.cursor = 'grab';
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    }

    polaroid.addEventListener('pointerdown', onPointerDown);
    polaroid.addEventListener('touchstart', onPointerDown);

    gallery.appendChild(polaroid);
  });
}
