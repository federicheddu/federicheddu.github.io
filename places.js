
// Travel page JS: Leaflet map and cards
// Example places array
const places = [
  {
    name: "Cagliari, Italy",
    lat: 39.2238,
    lng: 9.1217,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "My hometown and where I study."
  },
  {
    name: "Rome, Italy",
    lat: 41.9028,
    lng: 12.4964,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "The Eternal City, rich in history and culture."
  },
  {
    name: "Milan, Italy",
    lat: 45.4642,
    lng: 9.19,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Italy's fashion and design capital."
  },
  {
    name: "Naples, Italy",
    lat: 40.8518,
    lng: 14.2681,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Famous for pizza and its vibrant atmosphere."
  },
  {
    name: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "The city of lights and romance."
  },
  {
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Cradle of Western civilization."
  },
  {
    name: "Budapest, Hungary",
    lat: 47.4979,
    lng: 19.0402,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "The Pearl of the Danube."
  },
  {
    name: "Florence, Italy",
    lat: 43.7696,
    lng: 11.2558,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Birthplace of the Renaissance."
  },
  {
    name: "Pisa, Italy",
    lat: 43.7228,
    lng: 10.4017,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Famous for its iconic Leaning Tower and historic university."
  },
  {
    name: "Verona, Italy",
    lat: 45.4384,
    lng: 10.9916,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "City of Romeo and Juliet."
  },
  {
    name: "Mont Saint-Michel, France",
    lat: 48.6361,
    lng: -1.5115,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "A magical island topped by a gravity-defying abbey."
  },
  {
    name: "Lugano, Switzerland",
    lat: 46.0037,
    lng: 8.9511,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "A lakeside city with Swiss-Italian charm."
  },
  {
    name: "Corte, France (Corsica)",
    lat: 42.3061,
    lng: 9.1500,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Historic town in the heart of Corsica."
  },
  {
    name: "Venice, Italy",
    lat: 45.4408,
    lng: 12.3155,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "The floating city of canals."
  },
  {
    name: "Annecy, France",
    lat: 45.8992,
    lng: 6.1296,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "The Venice of the Alps."
  },
  {
    name: "Tokyo, Japan",
    lat: 35.6895,
    lng: 139.6917,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Japan's bustling capital."
  },
  {
    name: "Kyoto, Japan",
    lat: 35.0116,
    lng: 135.7681,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Famous for its classical Buddhist temples and gardens."
  },
  {
    name: "Osaka, Japan",
    lat: 34.6937,
    lng: 135.5023,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Known for modern architecture and street food."
  },
  {
    name: "Matsumoto, Japan",
    lat: 36.2381,
    lng: 137.9717,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Home to one of Japan's most beautiful castles."
  },
  {
    name: "Takayama, Japan",
    lat: 36.1467,
    lng: 137.2517,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "A beautifully preserved old town."
  },
  {
    name: "Kanazawa, Japan",
    lat: 36.5613,
    lng: 136.6562,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Known for Kenrokuen Garden and samurai districts."
  },
  {
    name: "Nara, Japan",
    lat: 34.6851,
    lng: 135.8048,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Famous for its free-roaming deer and temples."
  },
  {
    name: "Shirakawa-go, Japan",
    lat: 36.2608,
    lng: 136.8996,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "A UNESCO World Heritage village with traditional farmhouses."
  },
  {
    name: "Abu Dhabi, UAE",
    lat: 24.4539,
    lng: 54.3773,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
    desc: "Capital of the United Arab Emirates, known for its modern architecture and beautiful waterfront."
  },
  {
    name: "Sydney, Australia",
    lat: -33.8688,
    lng: 151.2093,
    img: "https://photographypro.com/wp-content/uploads/2018/01/shoot-panoramic-photos-4@2x.jpg",
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
