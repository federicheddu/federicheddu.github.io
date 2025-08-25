// Travel page JS: Leaflet map and cards
// Example places array
const places = [
  {
    name: "Cagliari, Italy",
    lat: 39.2238,
    lng: 9.1217,
    img: "https://www.rossocorallo.info/wp-content/uploads/2019/09/hotel-panorama-cagliari-centro-in-sardegna11.jpg",
    desc: "My hometown and university city."
  },
  {
    name: "Rome, Italy",
    lat: 41.9028,
    lng: 12.4964,
    img: "https://media-cdn.tripadvisor.com/media/photo-s/11/4c/3a/10/panorama-da-roma-dal.jpg",
    desc: "History, culture, and ancient ruins."
  },
  {
    name: "Milan, Italy",
    lat: 45.4642,
    lng: 9.19,
    img: "https://www.shutterstock.com/image-photo/drone-photography-duomo-cathedral-sunrise-600nw-2313454157.jpg",
    desc: "Fashion, design, and vibrant life."
  },
  {
    name: "Naples, Italy",
    lat: 40.8518,
    lng: 14.2681,
    img: "https://www.napolidavivere.it/wp-content/uploads/bfi_thumb/Bar-ristoranti-e-botteghe-artigianali-sotto-il-colonnato-di-Piazza-del-Plebiscito-a-Napoli-640x360-6ge1yeh065tnx8d42pej56w4ye8wzslnoxmb89f8fxw.jpg",
    desc: "Pizza, sea, and lively streets."
  },
  {
    name: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    img: "https://hshnet-cdn2.hosiho.net/en/images/655-vue-aerienne-de-la-tour-eiffel-vue-du-champ-de-mars-en-ete-paris-france-2078893-80-airbuzz.jpg",
    desc: "Eiffel Tower, romance, and art."
  },
  {
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    img: "https://www.shutterstock.com/image-photo/acropolis-greece-parthenon-athens-aerial-600nw-2422091405.jpg",
    desc: "Acropolis, history, and philosophy."
  },
  {
    name: "Budapest, Hungary",
    lat: 47.4979,
    lng: 19.0402,
    img: "https://www.shutterstock.com/image-photo/hungary-danube-river-city-budapest-600nw-2524447201.jpg",
    desc: "Danube, bridges, and thermal baths."
  },
  {
    name: "Vatican City",
    lat: 41.9029,
    lng: 12.4534,
    img: "https://st3.idealista.it/news/archivie/styles/fullwidth_xl/public/2024-11/images/vista_dalla_cupola_della_basilica_di_san_pietro.jpg",
    desc: "Pope, basilica, and tiny state."
  },
  {
    name: "Florence, Italy",
    lat: 43.7696,
    lng: 11.2558,
    img: "https://www.shutterstock.com/image-photo/aerial-view-florence-cathedral-duomo-600nw-2373587937.jpg",
    desc: "Renaissance, art, and Duomo."
  },
  {
    name: "Pisa, Italy",
    lat: 43.7228,
    lng: 10.4017,
    img: "https://www.shutterstock.com/shutterstock/videos/1092222331/thumb/7.jpg",
    desc: "Leaning Tower and university city."
  },
  {
    name: "Verona, Italy",
    lat: 45.4384,
    lng: 10.9916,
    img: "https://www.shutterstock.com/image-photo/aerial-view-verona-historical-city-600nw-1686555913.jpg",
    desc: "Romeo, Juliet, and old city."
  },
  {
    name: "Mont Saint-Michel, France",
    lat: 48.6361,
    lng: -1.5115,
    img: "https://www.shutterstock.com/shutterstock/videos/3505839691/thumb/1.jpg",
    desc: "Island, abbey, and tidal views."
  },
  {
    name: "Lugano, Switzerland",
    lat: 46.0037,
    lng: 8.9511,
    img: "https://www.shutterstock.com/shutterstock/videos/3522378029/thumb/1.jpg",
    desc: "Lake, Swiss-Italian charm."
  },
  {
    name: "Corte, France (Corsica)",
    lat: 42.3061,
    lng: 9.1500,
    img: "https://www.shutterstock.com/image-photo/aerial-view-corte-old-town-600nw-2447562587.jpg",
    desc: "Corsica, history, and mountains."
  },
  {
    name: "Venice, Italy",
    lat: 45.4408,
    lng: 12.3155,
    img: "https://www.shutterstock.com/image-photo/aerial-view-venice-near-saint-600nw-2417910893.jpg",
    desc: "Canals, gondolas, and art."
  },
  {
    name: "Annecy, France",
    lat: 45.8992,
    lng: 6.1296,
    img: "https://www.shutterstock.com/image-photo/france-travel-landmarks-romantic-beautiful-600nw-2251109699.jpg",
    desc: "Alps, canals, and old town."
  },
  {
    name: "Tokyo, Japan",
    lat: 35.6895,
    lng: 139.6917,
    img: "https://www.shutterstock.com/image-photo/shibuya-crossing-twilight-tokyo-japan-600nw-1608796999.jpg",
    desc: "Skyscrapers, crossing, and nightlife."
  },
  {
    name: "Kyoto, Japan",
    lat: 35.0116,
    lng: 135.7681,
    img: "https://www.shutterstock.com/shutterstock/videos/3826478109/thumb/1.jpg",
    desc: "Temples, gardens, and traditions."
  },
  {
    name: "Osaka, Japan",
    lat: 34.6937,
    lng: 135.5023,
    img: "https://media.istockphoto.com/id/1181423366/photo/osaka-castle-in-osaka-japan.jpg?s=612x612&w=0&k=20&c=FYVWbNddBNjubil8rtN1Mm4wFI9fRu9s5k9tNCadVsQ=",
    desc: "Castle, food, and modern city."
  },
  {
    name: "Matsumoto, Japan",
    lat: 36.2381,
    lng: 137.9717,
    img: "https://www.shutterstock.com/shutterstock/videos/1110383129/thumb/1.jpg",
    desc: "Castle, history, and mountains."
  },
  {
    name: "Takayama, Japan",
    lat: 36.1467,
    lng: 137.2517,
    img: "https://media.istockphoto.com/id/521890621/photo/takayama.jpg?s=612x612&w=0&k=20&c=x0Q6bwEHGEdt8cUjXx8E03GwWWN5wF4yOK-f-O3x_XU=",
    desc: "Old town, tradition, and charm."
  },
  {
    name: "Kanazawa, Japan",
    lat: 36.5613,
    lng: 136.6562,
    img: "https://www.shutterstock.com/shutterstock/videos/3709168243/thumb/1.jpg",
    desc: "Garden, samurai, and culture."
  },
  {
    name: "Nara, Japan",
    lat: 34.6851,
    lng: 135.8048,
    img: "https://media.gettyimages.com/id/675938976/video/asian-deer-during-cherry-blossom-season-japan.jpg?s=640x640&k=20&c=Xw9hS13lAslOkt5NoZI52cQgepiP0xZtccqYOi90vNU=",
    desc: "Deer, temples, and parks."
  },
  {
    name: "Shirakawa-go, Japan",
    lat: 36.2608,
    lng: 136.8996,
    img: "https://www.shutterstock.com/shutterstock/videos/3653593975/thumb/1.jpg",
    desc: "Farmhouses, heritage, and snow."
  },
  {
    name: "Abu Dhabi, UAE",
    lat: 24.4539,
    lng: 54.3773,
    img: "https://www.shutterstock.com/image-photo/23-january-2025-abu-dhabi-600nw-2599222721.jpg",
    desc: "Just the airport :("
  },
  {
    name: "Sydney, Australia",
    lat: -33.8688,
    lng: 151.2093,
    img: "https://www.shutterstock.com/image-photo/busy-morning-around-sydney-opera-600nw-2333401423.jpg",
    desc: "Opera House, harbour, and city."
  },
  {
    name: "Port Vila, Vanuatu",
    lat: -17.7333,
    lng: 168.3167,
    img: "https://static.ffx.io/images/$zoom_1%2C$multiply_0.7546%2C$ratio_1.777778%2C$width_1972%2C$x_28%2C$y_136/t_crop_custom/q_62%2Cf_auto/50c446ddc7fa35d6eff52c60023b8b2d9511a8da",
    desc: "Capital, harbour, and islands."
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
  // Button order changed in HTML (Italy now first); IDs unchanged so logic below still valid.
  const btnEurope = document.getElementById('btn-europe');
  const btnItaly = document.getElementById('btn-italy');
  const btnJapan = document.getElementById('btn-japan');
  const btnOceania = document.getElementById('btn-oceania');
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
  if (btnItaly) {
    btnItaly.onclick = () => {
      if (mapInstance) {
        // Bounds roughly covering mainland Italy + islands (Sardinia, Sicily)
        mapInstance.fitBounds([
          [47.3, 6.0],   // NW near Alps / France
          [36.4, 19.0]   // SE including Sicily heel/toe and Adriatic
        ]);
      }
    };
  }
  if (btnJapan) {
    btnJapan.onclick = () => {
      if (mapInstance) mapInstance.setView([36.2, 138.2], 5); // Japan
    };
  }
  if (btnOceania) {
    btnOceania.onclick = () => {
      if (mapInstance) {
        // Bounds covering Australia + Vanuatu
        mapInstance.fitBounds([
          [-8, 110],   // NW (near Indonesia)
          [-50, 180]   // SE (south of NZ, east Pacific edge)
        ]);
      }
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
