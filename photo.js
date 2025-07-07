// Photo page JS: display photos as polaroids
// Example photos array
const photos = [
  {
    src: "media/places/cagliari.jpg",
    caption: "Cagliari, my hometown"
  },
  // Add more photos here
];

const gallery = document.querySelector('.polaroid-gallery');
if (gallery && photos.length) {
  gallery.innerHTML = '';
  photos.forEach(ph => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.innerHTML = `
      <img src="${ph.src}" alt="${ph.caption}">
      <div class="caption">${ph.caption}</div>
    `;
    // Random rotation for scattered effect
    polaroid.style.transform = `rotate(${Math.random()*6-3}deg)`;
    gallery.appendChild(polaroid);
  });
}
