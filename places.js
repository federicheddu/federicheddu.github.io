// Travel page JS: Leaflet map and cards

// Removed inline places array; now loaded from places.json
let places = [];

let mapInstance = null;
let markers = [];

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
  markers = [];
  places.forEach((p, i) => {
    const marker = L.marker([p.lat, p.lng]).addTo(mapInstance);
    marker._placeIndex = i;
    markers[i] = marker;
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
  const card = document.querySelector(`.place-card[data-index="${idx}"]`);
  if (card) {
    card.scrollIntoView({behavior:'smooth', block:'center'});
    card.classList.add('card-highlight');
    setTimeout(()=>card.classList.remove('card-highlight'), 2200);
  }
  // Open marker popup and pan map
  const m = markers[idx];
  if (m && mapInstance) {
    mapInstance.setView(m.getLatLng(), Math.max(mapInstance.getZoom(), 5));
    m.openPopup();
  }
}

// Minimal continent mapping for places present in places.json
const countryToContinent = {
  'Italy':'Europe', 'France':'Europe', 'Greece':'Europe', 'Hungary':'Europe', 'Vatican City':'Europe',
  'Switzerland':'Europe', 'Austria':'Europe', 'Poland':'Europe',
  'Japan':'Asia', 'United Arab Emirates':'Asia', 'UAE':'Asia', 'Egypt':'Africa',
  'Australia':'Oceania', 'Vanuatu':'Oceania'
};

// Emoji map for countries (used by card rendering)
const countryEmoji = {
  'Italy':'🇮🇹','France':'🇫🇷','Greece':'🇬🇷','Hungary':'🇭🇺','Vatican City':'🇻🇦',
  'Switzerland':'🇨🇭','Austria':'🇦🇹','Poland':'🇵🇱','Japan':'🇯🇵','United Arab Emirates':'🇦🇪',
  'UAE':'🇦🇪','Egypt':'🇪🇬','Australia':'🇦🇺','Vanuatu':'🇻🇺'
};

function renderPlaceCards(){
  const container = document.getElementById('places-cards');
  if (!container || !places.length) return;
  // Group by continent then country
  const groups = {};
  places.forEach((p, i)=>{
    let country = p.name.includes(',') ? p.name.split(',')[1].trim() : p.name.trim();
    country = country.replace(/\(.*?\)/g,'').trim();
    const continent = countryToContinent[country] || 'Other';
    groups[continent] = groups[continent] || {};
    groups[continent][country] = groups[continent][country] || [];
    groups[continent][country].push({ place: p, idx:i });
  });

  // Order continents: Europe, Asia, Oceania, Africa — then any others alphabetically
  const desiredOrder = ['Europe','Asia','Oceania','Africa'];
  const present = Object.keys(groups);
  const others = present.filter(c=>!desiredOrder.includes(c)).sort();
  const continents = desiredOrder.filter(c=>groups[c]).concat(others);
  const html = continents.map(cont=>{
    const countries = Object.keys(groups[cont]).sort();
    const countryHtml = countries.map(country=>{
      const cards = groups[cont][country].map(item=>{
        const p = item.place;
        return `
          <article class="place-card" data-index="${item.idx}" tabindex="0">
            <img src="${p.img}" alt="${p.name}">
            <div class="place-info">
              <div class="place-name">${p.name.split(',')[0].trim()}</div>
              <div class="place-desc">${p.desc || ''}</div>
            </div>
          </article>`;
      }).join('');
      const cEmoji = countryEmoji[country] ? countryEmoji[country] + ' ' : '';
      return `<div class="country-group"><div class="country-title">${cEmoji}${country}</div><div class="places-grid">${cards}</div></div>`;
    }).join('');
    return `<section class="continent-section"><h4 class="continent-title">${cont}</h4>${countryHtml}</section>`;
  }).join('');

  container.innerHTML = html;

  // Wire up click handlers on cards
  container.querySelectorAll('.place-card').forEach(el=>{
    el.addEventListener('click', ()=>{
      const idx = Number(el.getAttribute('data-index'));
      if (!Number.isNaN(idx)) {
        const m = markers[idx];
        if (m && mapInstance) {
          mapInstance.setView(m.getLatLng(), Math.max(mapInstance.getZoom(), 5));
          m.openPopup();
        }
        el.classList.add('card-highlight');
        setTimeout(()=>el.classList.remove('card-highlight'),2200);
      }
    });
  });
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
    'Egypt': 1_010_408,
    'Poland': 312_679,
    'Australia': 7_692_024,
    'Vanuatu': 12_189,
    'Austria': 83_879, // added
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
    'Egypt':'🇪🇬',
    'Poland':'🇵🇱',
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
        renderPlaceCards();
    })
    .catch(err => {
      console.error('Failed loading places.json', err);
    });
});
// End of file