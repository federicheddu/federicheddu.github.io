
// Travel page JS: Leaflet map and cards
// Example places array
const places = [
  {
    name: "Cagliari, Italy",
    lat: 39.2238,
    lng: 9.1217,
    img: "media/places/cagliari.jpg",
    desc: "My hometown and where I study."
  },
  {
    name: "Rome, Italy",
    lat: 41.9028,
    lng: 12.4964,
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    desc: "The Eternal City, rich in history and culture."
  },
  {
    name: "Milan, Italy",
    lat: 45.4642,
    lng: 9.19,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Milano_Duomo_2016.jpg",
    desc: "Italy's fashion and design capital."
  },
  {
    name: "Naples, Italy",
    lat: 40.8518,
    lng: 14.2681,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Napoli_Bay.jpg",
    desc: "Famous for pizza and its vibrant atmosphere."
  },
  {
    name: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
    desc: "The city of lights and romance."
  },
  {
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/AcropolisAthens.JPG",
    desc: "Cradle of Western civilization."
  },
  {
    name: "Budapest, Hungary",
    lat: 47.4979,
    lng: 19.0402,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Budapest_Parliament.jpg",
    desc: "The Pearl of the Danube."
  },
  {
    name: "Florence, Italy",
    lat: 43.7696,
    lng: 11.2558,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Florence_Duomo_from_Michelangelo_hill.jpg",
    desc: "Birthplace of the Renaissance."
  },
  {
    name: "Verona, Italy",
    lat: 45.4384,
    lng: 10.9916,
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Verona_Panorama.jpg",
    desc: "City of Romeo and Juliet."
  },
  {
    name: "Mont Saint-Michel, France",
    lat: 48.6361,
    lng: -1.5115,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Mont_Saint-Michel_Abbey_01.jpg",
    desc: "A magical island topped by a gravity-defying abbey."
  },
  {
    name: "Lugano, Switzerland",
    lat: 46.0037,
    lng: 8.9511,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Lugano_view.jpg",
    desc: "A lakeside city with Swiss-Italian charm."
  },
  {
    name: "Corte, France (Corsica)",
    lat: 42.3061,
    lng: 9.1500,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Corte_vue_g%C3%A9n%C3%A9rale.jpg",
    desc: "Historic town in the heart of Corsica."
  },
  {
    name: "Venice, Italy",
    lat: 45.4408,
    lng: 12.3155,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Venice_Canal_Grande.jpg",
    desc: "The floating city of canals."
  },
  {
    name: "Annecy, France",
    lat: 45.8992,
    lng: 6.1296,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Annecy_vue_du_chateau.jpg",
    desc: "The Venice of the Alps."
  },
  {
    name: "Tokyo, Japan",
    lat: 35.6895,
    lng: 139.6917,
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Tokyo_Tower_and_around_Skyscrapers.jpg",
    desc: "Japan's bustling capital."
  },
  {
    name: "Kyoto, Japan",
    lat: 35.0116,
    lng: 135.7681,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Kiyomizu-dera_in_Kyoto.jpg",
    desc: "Famous for its classical Buddhist temples and gardens."
  },
  {
    name: "Osaka, Japan",
    lat: 34.6937,
    lng: 135.5023,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Osaka_Castle_02bs3200.jpg",
    desc: "Known for modern architecture and street food."
  },
  {
    name: "Matsumoto, Japan",
    lat: 36.2381,
    lng: 137.9717,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Matsumoto_Castle_in_Matsumoto%2C_Nagano_Prefecture%2C_Japan.jpg",
    desc: "Home to one of Japan's most beautiful castles."
  },
  {
    name: "Takayama, Japan",
    lat: 36.1467,
    lng: 137.2517,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Takayama_Old_Town.jpg",
    desc: "A beautifully preserved old town."
  },
  {
    name: "Kanazawa, Japan",
    lat: 36.5613,
    lng: 136.6562,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kanazawa_Kenrokuen_Garden.jpg",
    desc: "Known for Kenrokuen Garden and samurai districts."
  },
  {
    name: "Nara, Japan",
    lat: 34.6851,
    lng: 135.8048,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Nara_Park_and_Todaiji_Temple.jpg",
    desc: "Famous for its free-roaming deer and temples."
  },
  {
    name: "Shirakawa-go, Japan",
    lat: 36.2608,
    lng: 136.8996,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Shirakawa-go_Gassho_Zukuri.jpg",
    desc: "A UNESCO World Heritage village with traditional farmhouses."
  },
  {
    name: "Sydney, Australia",
    lat: -33.8688,
    lng: 151.2093,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Sydney_Opera_House_-_Dec_2008.jpg",
    desc: "Famous for its Opera House and stunning harbour."
  }
];

let mapInstance = null;
function initMap() {
  const mapDiv = document.getElementById('map');
  if (!mapDiv) return;
  // Remove any previous map instance
  if (mapDiv._leaflet_id) {
    mapDiv._leaflet_id = null;
    mapDiv.innerHTML = '';
  }
  // Default: show the world (from North America to New Zealand)
  mapInstance = L.map('map');
  mapInstance.fitBounds([
    [70, -130],   // Alaska/Canada (northwest)
    [-50, 180]    // New Zealand (southeast)
  ]);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapInstance);
  places.forEach((p, i) => {
    const marker = L.marker([p.lat, p.lng]).addTo(mapInstance);
    marker.on('click', () => showPlaceCard(i));
    marker.bindPopup(`<b>${p.name}</b>`);
  });
}

function setupMapButtons() {
  const btnEurope = document.getElementById('btn-europe');
  const btnJapan = document.getElementById('btn-japan');
  const btnAustralia = document.getElementById('btn-australia');
  const btnWorld = document.getElementById('btn-world');
  if (btnEurope) {
    btnEurope.onclick = () => {
      if (mapInstance) {
        // Fit from Iceland to Baghdad
        mapInstance.fitBounds([
          [66, -25],   // Iceland (northwest)
          [33, 45]     // Baghdad (southeast)
        ]);
      }
    };
  }
  if (btnJapan) {
    btnJapan.onclick = () => {
      if (mapInstance) mapInstance.setView([36.2, 138.2], 5); // Japan
    };
  }
  if (btnAustralia) {
    btnAustralia.onclick = () => {
      if (mapInstance) mapInstance.setView([-25, 134], 4); // Australia
    };
  }
  if (btnWorld) {
    btnWorld.onclick = () => {
      if (mapInstance) {
        // Fit from North America to New Zealand
        mapInstance.fitBounds([
          [70, -130],   // Alaska/Canada (northwest)
          [-50, 180]    // New Zealand (southeast)
        ]);
      }
    };
  }
}

function showPlaceCard(idx) {
  // Do nothing: keep all place cards visible
}

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  setupMapButtons();
  // Show all places as cards by default
  const cards = document.querySelector('.places-cards');
  if (cards) {
    cards.innerHTML = places.map(p => `
      <div class="place-card">
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
      </div>
    `).join('');
  }
});
