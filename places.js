// Travel page JS: Leaflet map and cards

// Removed inline places array; now loaded from places.json
let places = [];

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

function renderTravelStats() {
  const statsEl = document.getElementById('travel-stats');
  const flagsEl = document.getElementById('travel-flags');
  if (!statsEl || !places.length) return;
  const TOTAL_COUNTRIES = 195; // UN members + observers
  // Derive country names
  const countryCounts = {};
  places.forEach(p => {
    let country = p.name.includes(',') ? p.name.split(',')[1].trim() : p.name.trim();
    country = country.replace(/\(.*?\)/g,'').trim();
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });
  const totalPlaces = places.length;
  const countries = Object.keys(countryCounts);
  const visitedCountries = countries.length;

  // World exploration by AREA (km²)
  const WORLD_LAND_AREA = 148_940_000; // Approximate total land area of Earth
  const countryAreas = {
    'Italy': 301_340,
    'France': 551_695,
    'Greece': 131_957,
    'Hungary': 93_028,
    'Vatican City': 0.49,
    'Switzerland': 41_277,
    'Japan': 377_975,
    'UAE': 83_600,
    'Australia': 7_692_024,
    'Vanuatu': 12_189,
    'Austria': 83_879 // added
  };
  // Sum unique visited areas
  const visitedArea = countries.reduce((sum, c) => {
    // Allow for 'United Arab Emirates' vs 'UAE' if needed
    if (countryAreas[c] != null) return sum + countryAreas[c];
    if (c === 'United Arab Emirates' && countryAreas['UAE']) return sum + countryAreas['UAE'];
    return sum;
  }, 0);
  const worldPctArea = (visitedArea / WORLD_LAND_AREA) * 100;
  const worldPct = (Math.round(worldPctArea * 100) / 100).toFixed(2).replace(/\.00$/,'');

  // Farthest place from home (first entry as home)
  const home = places[0];
  const R = 6371;
  function haversine(a, b) {
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  let farthest = { name: '', distKm: 0 };
  places.slice(1).forEach(p => {
    const d = haversine(home, p);
    if (d > farthest.distKm) farthest = { name: p.name, distKm: Math.round(d) };
  });

  const countryFlags = {
    'Italy':'🇮🇹',
    'France':'🇫🇷',
    'Greece':'🇬🇷',
    'Hungary':'🇭🇺',
    'Vatican City':'🇻🇦',
    'Switzerland':'🇨🇭',
    'Japan':'🇯🇵',
    'UAE':'🇦🇪',
    'United Arab Emirates':'🇦🇪',
    'Australia':'🇦🇺',
    'Vanuatu':'🇻🇺',
    'Austria':'🇦🇹' // added
  };
  const statsHtml = `
    <div class="stat"><span class="label">Visited</span><span class="num">${totalPlaces}</span><span class="label">Places</span></div>
    <div class="stat"><span class="label">Visited</span><span class="num">${visitedCountries} / ${TOTAL_COUNTRIES}</span><span class="label">Countries</span></div>
    <div class="stat"><span class="label">Visited</span><span class="num">${worldPct}%</span><span class="label">of World Area</span></div>
    <div class="stat"><span class="label">Farthest place from home</span><span class="num">${farthest.name}</span><span class="label">${farthest.distKm} km away</span></div>
  `;
  statsEl.innerHTML = statsHtml;
  if (flagsEl) {
    const sortedCountries = countries.slice().sort((a,b)=>a.localeCompare(b));
    flagsEl.innerHTML = sortedCountries.map(c=>{
      const flag = countryFlags[c] || '🏳️';
      return `<span class="flag" title="${c}">${flag}</span>`;
    }).join('');
  }
}

// Load places then initialize
document.addEventListener('DOMContentLoaded', () => {
  fetch('places.json')
    .then(r => r.json())
    .then(data => {
      places = data;
      initMap();
      setupMapButtons();
      renderTravelStats();
    })
    .catch(err => {
      console.error('Failed loading places.json', err);
    });
});
// End of file