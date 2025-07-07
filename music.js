// Music page JS: dynamically add playlists with vinyl pop-out effect
const playlists = [
  {
    name: "Springhericheddu '25",
    cover: "media/playlists/springhericheddu25.jpeg",
    url: "https://open.spotify.com/playlist/0rdyzucI3vRwkyxmyR4tuY"
  },
  {
    name: "Summericheddu '24",
    cover: "media/playlists/summericheddu24.jpeg",
    url: "https://open.spotify.com/playlist/1edAbnS5TWqvnsrxZ1rLKU"
  },
  {
    name: "Summericheddu '24 B-Side",
    cover: "media/playlists/summericheddu24b.jpeg",
    url: "https://open.spotify.com/playlist/2xV3lK2nk0uOQaYVIDhhSt"
  },
  {
    name: "Wintericheddu '24",
    cover: "media/playlists/wintericheddu24.jpeg",
    url: "https://open.spotify.com/playlist/7kJ1JynbwOotzogT2qcYOb"
  },
  {
    name: "Wrapped 2024",
    cover: "media/playlists/wrapped2024.jpg",
    url: "https://open.spotify.com/playlist/37i9dQZF1FoCoHwpdrDqG0"
  },
  {
    name: "Summericheddu '23",
    cover: "media/playlists/summericheddu23.jpeg",
    url: "https://open.spotify.com/playlist/13HVY9EBbrg7CghYaTgyeB"
  },
  {
    name: "Wintericheddu '23",
    cover: "media/playlists/wintericheddu23.jpeg",
    url: "https://open.spotify.com/playlist/0dkOQb1JE3u187vZIvAymf"
  },
  {
    name: "Wintericheddu '23 B-Side",
    cover: "media/playlists/wintericheddu23b.jpeg",
    url: "https://open.spotify.com/playlist/3wvjbIXoNtohEmHDx597UK"
  },
  {
    name: "Wrapped 2023",
    cover: "media/playlists/wrapped2023.jpg",
    url: "https://open.spotify.com/playlist/37i9dQZF1FajSuDPhFLS3W"
  }
];

const gallery = document.querySelector('.vinyl-gallery');
if (gallery && playlists.length) {
  gallery.innerHTML = '';
  playlists.forEach(pl => {
    const card = document.createElement('div');
    card.className = 'vinyl-card';
    card.innerHTML = `
      <div class="vinyl">
        <img src="${pl.cover}" alt="${pl.name} Cover" class="vinyl-cover-square">
        <img src="https://i.ibb.co/8D4rZrWJ/vinyl-6.png" alt="Vinyl" class="vinyl-disc-img">
      </div>
      <div class="playlist-info">
        <h4>${pl.name}</h4>
        <a href="${pl.url}" target="_blank">
          <img src="https://img.shields.io/badge/Open%20on%20Spotify-1DB954?style=flat&logo=spotify&logoColor=white" alt="Spotify">
        </a>
      </div>
    `;
    gallery.appendChild(card);
  });
}