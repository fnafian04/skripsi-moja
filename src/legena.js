import "./legena.css";

const aksaraData = [
  [
    { id: "ha", name: "Ha", img: "/assets/aksara-ha.png" },
    { id: "na", name: "Na", img: "/assets/aksara-na.png" },
    { id: "ca", name: "Ca", img: "/assets/aksara-ca.png" },
    { id: "ra", name: "Ra", img: "/assets/aksara-ra.png" },
    { id: "ka", name: "Ka", img: "/assets/aksara-ka.png" },
  ],
  [
    { id: "da", name: "Da", img: "/assets/aksara-da.png" },
    { id: "ta", name: "Ta", img: "/assets/aksara-ta.png" },
    { id: "sa", name: "Sa", img: "/assets/aksara-sa.png" },
    { id: "wa", name: "Wa", img: "/assets/aksara-wa.png" },
    { id: "la", name: "La", img: "/assets/aksara-la.png" },
  ],
  [
    { id: "pa", name: "Pa", img: "/assets/aksara-pa.png" },
    { id: "dha", name: "Dha", img: "/assets/aksara-dha.png" },
    { id: "ja", name: "Ja", img: "/assets/aksara-ja.png" },
    { id: "ya", name: "Ya", img: "/assets/aksara-ya.png" },
    { id: "nya", name: "Nya", img: "/assets/aksara-nya.png" },
  ],
  [
    { id: "ma", name: "Ma", img: "/assets/aksara-ma.png" },
    { id: "ga", name: "Ga", img: "/assets/aksara-ga.png" },
    { id: "ba", name: "Ba", img: "/assets/aksara-ba.png" },
    { id: "tha", name: "Tha", img: "/assets/aksara-tha.png" },
    { id: "nga", name: "Nga", img: "/assets/aksara-nga.png" },
  ],
];

let currentPage = 0;
const bookLayout = document.getElementById("book-layout");

let checkedAksaraIds = new Set(JSON.parse(localStorage.getItem("legena_checked_ids") || "[]"));
let savedDrawings = JSON.parse(localStorage.getItem("legena_drawings") || "{}");

// Array untuk menandai halaman yang sudah diselesaikan (berhasil menebali)
let completedPages = JSON.parse(localStorage.getItem("legena_completed_pages") || JSON.stringify(new Array(aksaraData.length).fill(false)));

window.selectAksaraCard = (el) => {
  document.querySelectorAll(".aksara-card").forEach((card) => card.classList.remove("aksara-card-selected"));
  el.classList.add("aksara-card-selected");
};

function createCard(item) {
  // UKURAN DIPERKECIL: width 75px, height 90px (sebelumnya 85x100)
  return `
    <div onclick="selectAksaraCard(this)" class="aksara-card flex flex-col items-center justify-center bg-white rounded-xl cursor-pointer flex-shrink-0" style="width: 75px; height: 90px; padding: 8px;">
      <img src="${item.img}" style="width: 38px; height: 38px; object-fit: contain; margin-bottom: 4px;" class="drop-shadow-sm pointer-events-none" alt="Aksara ${item.name}" />
      <span style="font-size: 10px; font-weight: 900; color: #3E2723; text-transform: uppercase;">${item.name}</span>
    </div>
  `;
}

function createCheckbox(item) {
  const isChecked = checkedAksaraIds.has(item.id) ? "checked" : "";
  // UKURAN DIPERKECIL: width 125px, gap 8px (sebelumnya 140px, gap 12px)
  return `
    <label class="checkbox-label flex items-center bg-white border-b-4 border-r-4 border-[#5d4037]/30 rounded-xl cursor-pointer hover:bg-[#FFF3E0] hover:-translate-y-1 shadow-sm transition flex-shrink-0" style="width: 125px; height: 40px; gap: 8px; padding-left: 12px;">
      <input type="checkbox" class="aksara-checkbox" value="${item.id}" data-name="${item.name}" data-img="${item.img}" onchange="handleCheck(this)" ${isChecked}>
      <span style="font-weight: 800; color: #3E2723; font-size: 11px;">Aksara ${item.name}</span>
    </label>
  `;
}

function renderBook() {
  const items = aksaraData[currentPage];

  let leftHTML = `
    <div class="page-left flex-1 w-1/2 p-2 pl-3 pr-4 md:p-4 md:pl-8 md:pr-10 flex flex-col items-center pointer-events-auto justify-start" style="transform: scale(0.88); transform-origin: top center;">
      <div class="book-banner w-[85%] py-1 md:py-1.5 text-center mb-4 z-10 flex-shrink-0 mt-0">
        <h2 class="text-[12px] md:text-base font-serif font-bold tracking-wide leading-none">Aksara Dasar</h2>
      </div>
      <div class="flex flex-col w-full items-center mt-1" style="gap: 12px;">
        <div class="flex flex-row justify-center w-full" style="gap: 16px;">${createCard(items[0])}${createCard(items[1])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 16px;">${createCard(items[2])}${createCard(items[3])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 16px;">${createCard(items[4])}</div>
      </div>
    </div>
  `;

  let rightHTML = `
    <div class="page-right flex-1 w-1/2 p-2 pr-3 pl-4 md:p-4 md:pr-8 md:pl-10 flex flex-col items-center pointer-events-auto relative justify-start" style="transform: scale(0.88); transform-origin: top center;">
      <div class="book-banner w-[85%] mx-auto py-1 md:py-1.5 text-center mb-1 z-10 flex-shrink-0 mt-0" style="background: linear-gradient(to bottom, #A1887F, #5D4037);">
        <h3 class="font-serif text-[11px] md:text-base font-bold text-[#FFF3E0] leading-none">Latihan Nulis</h3>
      </div>
      <p class="text-[9px] md:text-[11px] text-center italic text-[#5D4037] mb-3 font-serif flex-shrink-0">"Pilih maksimal 2 aksara kanggo latihan"</p>
      
      <div class="flex flex-col w-full items-center mt-1" style="gap: 12px;">
        <div class="flex flex-row justify-center w-full" style="gap: 12px;">${createCheckbox(items[0])}${createCheckbox(items[1])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 12px;">${createCheckbox(items[2])}${createCheckbox(items[3])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 12px;">${createCheckbox(items[4])}</div>
      </div>
      
      <div class="w-[85%] mt-5 mb-2 flex-shrink-0">
        <button onclick="startTracing()" class="btn-modern-3d w-full py-1.5 md:py-2 text-[10px] md:text-[12px] font-bold tracking-widest shadow-lg hover:scale-[1.02] transition-transform">MULAI NEBALI ✍️</button>
      </div>
      
      <div class="w-full flex justify-between items-center mt-auto pt-2 border-t border-dashed border-[#5D4037]/30 flex-shrink-0">
        <button onclick="prevPage()" class="btn-modern-3d text-[9px] md:text-[11px] font-bold tracking-wider" style="padding: 4px 12px;" ${currentPage === 0 ? "disabled" : ""}>
          <span style="display: flex; gap: 4px; align-items: center;"><span>⬅</span><span>BALENI</span></span>
        </button>
        <span class="text-[#3E2723] font-bold text-[9px] md:text-[11px]">Hal ${currentPage + 1}/4</span>
        <button onclick="nextPage()" class="btn-modern-3d text-[9px] md:text-[11px] font-bold tracking-wider" style="padding: 4px 12px;" ${currentPage === aksaraData.length - 1 || !completedPages[currentPage] ? "disabled" : ""}>
          <span style="display: flex; gap: 4px; align-items: center;"><span>LANJUT</span><span>➡</span></span>
        </button>
      </div>
    </div>
  `;

  bookLayout.innerHTML = leftHTML + rightHTML;
}

// --- LOGIKA ANIMASI BALIK HALAMAN ---
window.prevPage = () => {
  if (currentPage > 0) {
    bookLayout.classList.add("flip-out-prev");
    setTimeout(() => {
      currentPage--;
      renderBook();
      bookLayout.classList.remove("flip-out-prev");

      bookLayout.classList.add("flip-in-prev");
      setTimeout(() => bookLayout.classList.remove("flip-in-prev"), 400);
    }, 400);
  }
};

window.nextPage = () => {
  if (currentPage < aksaraData.length - 1 && completedPages[currentPage]) {
    bookLayout.classList.add("flip-out-next");
    setTimeout(() => {
      currentPage++;
      renderBook();
      bookLayout.classList.remove("flip-out-next");

      bookLayout.classList.add("flip-in-next");
      setTimeout(() => bookLayout.classList.remove("flip-in-next"), 400);
    }, 400);
  }
};

window.handleCheck = (cb) => {
  const checked = document.querySelectorAll(".aksara-checkbox:checked");
  if (checked.length > 2) {
    cb.checked = false;
    Swal.fire({ icon: "warning", title: "Kebak!", text: "Maksimal milih 2 aksara ae yo!", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } });
    return;
  }

  if (cb.checked) {
    checkedAksaraIds.add(cb.value);
  } else {
    checkedAksaraIds.delete(cb.value);
  }
  localStorage.setItem("legena_checked_ids", JSON.stringify(Array.from(checkedAksaraIds)));
};

// ================================================================
// STROKE DATA - KOORDINAT JALUR TIAP AKSARA (NEBALI BERTAHAP)
// Data diambil dari stroke-editor.html (freehand tracing asli)
// Canvas size: 180×180 | Koordinat sudah dalam ruang 0–180
// ================================================================
const strokeData = {
  ha: { strokes: [
    { points: [[66,110],[66,83],[67,79],[71,76],[75,75],[77,76],[79,80],[79,85],[78,101],[79,107],[89,108],[91,103],[91,98],[90,93],[90,83],[90,77],[91,75],[93,75],[99,75],[100,79],[100,107]] },
    { points: [[99,108],[100,78],[111,77],[112,109]], segments: [[99,98,98,87],[101,73,110,74],[113,85,111,98]] }
  ]},
  na: { strokes: [
    { points: [[69,109],[71,81],[81,76],[81,108]], segments: [[69,100,71,91],[70,71,80,69],[82,87,80,98]] },
    { points: [[82,92],[94,91],[100,100],[93,110]], segments: [[87,90,88,88],[100,94,100,94],[100,105,95,106]] },
    { points: [[94,109],[93,84],[106,75],[109,87],[109,109]], segments: [[93,101,93,92],[93,72,103,70],[110,80,109,73],[109,98,109,102]] }
  ]},
  ca: { strokes: [
    { points: [[69,109],[69,80],[81,82],[82,103],[74,105],[81,96],[97,108]], segments: [[69,100,68,89],[70,71,80,72],[81,89,84,96],[80,110,73,108],[75,101,73,95],[89,97,91,105]] },
    { points: [[100,107],[100,84],[93,79],[112,79],[112,109]], segments: [[100,100,102,93],[98,75,89,80],[96,77,113,67],[110,89,112,99]] }
  ]},
  ra: { strokes: [
    { points: [[69,80],[80,76],[81,108]], segments: [[72,78,79,71],[82,89,80,101]] },
    { points: [[80,108],[80,83],[99,78],[99,108]], segments: [[80,100,79,92],[80,75,99,72],[97,88,98,99]] }
  ]},
  ka: { strokes: [
    { points: [[64,109],[65,79],[78,84],[77,107]], segments: [[64,99,62,87],[68,70,78,74],[77,93,77,99]] },
    { points: [[77,107],[79,91],[94,97],[87,107],[90,77],[102,79],[102,108]], segments: [[77,102,72,91],[99,91,92,91],[98,105,85,113],[90,100,86,85],[93,68,102,76],[101,90,103,99]] },
    { points: [[101,109],[103,83],[115,81],[115,108]], segments: [[103,99,101,94],[104,71,115,72],[115,89,114,100]] }
  ]},
  da: { strokes: [
    { points: [[69,110],[70,81],[82,85],[81,108]], segments: [[69,100,69,91],[71,70,83,73],[80,94,81,101]] },
    { points: [[82,108],[99,98],[94,109],[95,80],[109,82],[110,108]], segments: [[87,104,97,94],[101,103,95,115],[93,102,92,95],[96,68,109,73],[109,94,110,100]] }
  ]},
  ta: { strokes: [
    { points: [[68,109],[69,77],[78,87],[78,104],[96,109]], segments: [[68,98,66,82],[71,71,80,73],[76,100,78,80],[77,112,89,108]] },
    { points: [[95,109],[96,93],[88,89],[95,74],[103,82],[103,109]], segments: [[95,103,98,99],[93,86,87,93],[89,81,90,74],[100,73,101,72],[105,92,101,100]] },
    { points: [[103,108],[104,78],[115,86],[114,107]], segments: [[103,98,101,91],[104,72,116,72],[114,96,115,101]] }
  ]},
  sa: { strokes: [
    { points: [[67,110],[69,78],[84,83],[83,108]], segments: [[68,100,66,88],[73,67,84,76],[84,92,84,99]] },
    { points: [[83,107],[76,108],[78,94],[94,108],[98,76],[109,85],[108,107]], segments: [[80,107,78,111],[74,103,72,94],[83,94,87,113],[101,102,93,83],[104,67,108,77],[109,96,110,99]] }
  ]},
  wa: { strokes: [
    { points: [[69,110],[69,80],[71,76],[72,75],[74,74],[79,75],[80,76],[81,82],[81,101],[80,108],[87,108],[94,108],[98,107]], segments: [[69,100,68,91],[70,69,70,78],[71,74,71,75],[73,74,72,74],[76,74,77,74],[80,75,79,74],[81,78,80,74],[81,90,80,93],[81,109,78,105],[82,110,82,108],[91,108,90,108],[98,108,97,107]] },
    { points: [[97,108],[98,101],[98,84],[97,80],[93,78],[101,75],[107,73],[109,75],[110,79],[109,94],[109,109]] }
  ]},
  la: { strokes: [
    { points: [[67,110],[68,80],[76,83],[77,109]], segments: [[67,100,65,89],[70,70,75,73],[77,92,76,100]] },
    { points: [[76,108],[76,80],[82,74],[84,74],[86,75],[87,77],[86,86],[85,98],[85,103],[86,107],[88,108],[90,109],[95,109],[97,104],[99,82],[100,75],[108,75],[109,77],[110,81],[109,92],[109,108]] }
  ]},
  pa: { strokes: [
    { points: [[70,110],[70,93],[69,88],[69,83],[70,77],[74,75],[76,75],[80,78],[80,80],[79,96],[81,106],[86,110],[90,110],[95,109],[96,107],[97,98],[97,76],[104,74],[106,74],[107,76],[108,83],[106,89],[106,96],[108,107]] }
  ]},
  dha: { strokes: [
    { points: [[69,109],[69,84],[69,80],[71,76],[75,74],[80,75],[81,82],[82,108],[91,101]], segments: [[69,101,68,93],[69,75,68,82],[70,77,69,77],[72,74,72,74],[78,74,78,72],[81,77,80,71],[82,92,81,101],[82,112,89,103]] },
    { points: [[90,102],[92,106],[92,108],[93,110],[97,109],[100,108],[101,93],[100,87],[100,79],[94,76],[109,77],[110,108]], segments: [[90,103,91,103],[92,108,91,107],[92,109,91,109],[95,110,95,109],[99,108,98,112],[101,103,101,100],[101,86,100,91],[99,82,101,82],[98,76,91,77],[97,75,107,72],[112,85,110,98]] }
  ]},
  ja: { strokes: [
    { points: [[68,110],[68,82],[69,78],[77,74],[79,75],[80,77],[83,84],[81,95],[81,106],[85,109],[91,110],[100,110]] },
    { points: [[99,109],[96,106],[96,97],[97,95],[97,90],[96,88],[96,78],[98,76],[102,75],[111,74],[109,78],[103,84],[98,92],[105,100],[110,108]] }
  ]},
  ya: { strokes: [
    { points: [[65,109],[66,102],[65,80],[71,76],[74,81],[76,89],[74,107],[82,107],[84,96],[83,87],[85,81],[86,76],[87,74],[90,74]] },
    { points: [[89,73],[93,76],[94,81],[93,106],[95,108],[100,108],[102,107],[104,101],[103,85],[104,79],[106,77],[110,76],[113,86],[113,106]] }
  ]},
  nya: { strokes: [
    { points: [[61,109],[60,87],[62,76],[63,74],[65,73],[69,73],[70,75],[72,80],[73,91],[73,99],[72,103],[72,108],[81,108],[85,106],[85,104],[80,104]] },
    { points: [[81,80],[82,73],[84,71],[86,71],[88,77],[88,79],[90,76],[91,74],[94,74],[97,77],[97,82],[96,87],[95,102],[96,107]] },
    { points: [[96,108],[96,93],[97,83],[100,75],[102,74],[104,74],[106,75],[109,82],[109,90],[108,95],[108,106]] },
    { points: [[108,106],[108,94],[110,77],[111,73],[115,72],[117,73],[120,82],[118,109]] }
  ]},
  ma: { strokes: [
    { points: [[70,109],[70,89],[71,83],[74,77],[82,74],[86,74],[84,78],[81,82],[83,84],[85,84],[89,84],[82,91],[80,95],[81,102],[83,106],[87,109],[91,110],[97,108]] },
    { points: [[97,106],[97,103],[98,100],[98,87],[100,78],[101,76],[105,74],[106,75],[110,86],[110,107]] }
  ]},
  ga: { strokes: [
    { points: [[69,78],[73,75],[77,75],[77,85],[76,89],[76,99],[77,107]] },
    { points: [[78,107],[79,82],[81,78],[82,76],[88,75],[91,75],[94,80],[94,88],[93,95],[92,107]] },
    { points: [[91,106],[94,95],[94,87],[93,85],[94,78],[100,76],[103,76],[105,76],[108,88],[106,100],[106,106]] }
  ]},
  ba: { strokes: [
    { points: [[69,110],[68,99],[70,76],[71,74],[73,73],[77,74],[80,82],[81,95],[79,106],[81,109],[87,109],[93,107],[92,105],[89,104]] },
    { points: [[90,80],[90,76],[92,74],[94,75],[95,79],[97,75],[99,74],[101,75],[103,83],[103,109]] },
    { points: [[102,76],[106,74],[110,73],[112,73],[113,75],[114,82],[114,91],[113,96],[112,108]] }
  ]},
  tha: { strokes: [
    { points: [[69,109],[69,81],[73,75],[78,75],[80,83],[81,90],[80,94],[80,107],[84,109],[86,109]] },
    { points: [[86,107],[90,106],[95,102],[95,100],[93,99],[91,99],[87,105],[87,109],[88,113],[91,116],[95,117],[97,116],[98,112]] },
    { points: [[94,81],[94,73],[99,73],[101,74],[102,81],[105,75],[107,75],[109,75],[110,77],[111,81],[111,108]] }
  ]},
  nga: { strokes: [
    { points: [[69,109],[70,97],[70,84],[72,76],[75,73],[78,75],[79,79],[80,98],[79,107],[83,109],[87,108],[93,104],[89,102],[86,102]] },
    { points: [[93,81],[93,76],[95,74],[97,73],[98,75],[99,81],[101,75],[102,74],[106,74],[108,75],[109,92],[108,109]] }
  ]}
};

// ================================================================
// STATE GLOBAL NEBALI BERTAHAP
// ================================================================
let tracingPanelStates = [];      // { currentStroke, completed, drawn, isDrawing }
let currentlyTrackedStrokes = []; // strokes[] per panel
let canvases     = [];            // fallback free-canvas
let contexts     = [];

let tracingAksaras = [];          // List aksara yang dipilih
let currentTracingIndex = 0;      // Index aksara yang sedang ditebali

// ================================================================
// HELPER: SVG SMOOTH PATH dari array titik
// ================================================================
// segments (optional): [[cp1x,cp1y,cp2x,cp2y], ...] dari stroke editor bezier
function pointsToSmoothPath(pts, segments) {
  if (pts.length < 2) return '';
  // --- Mode cubic bezier (dari stroke editor) ---
  if (segments && segments.length === pts.length - 1) {
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < segments.length; i++) {
      const [cp1x, cp1y, cp2x, cp2y] = segments[i];
      d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${pts[i+1][0]} ${pts[i+1][1]}`;
    }
    return d;
  }
  // --- Fallback: quadratic smooth melalui midpoint ---
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0]} ${pts[i][1]} ${mx} ${my}`;
  }
  d += ` L ${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
  return d;
}

// Jarak titik (px,py) ke segmen garis (ax,ay)-(bx,by)
function distToSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (!lenSq) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

// Hitung seberapa jauh (0–1) jalur yang sudah ditelusuri
function calcStrokeProgress(drawn, pts, thr) {
  if (!drawn.length) return 0;
  let totalLen = 0;
  const cumLens = [0];
  for (let i = 0; i < pts.length - 1; i++) {
    totalLen += Math.hypot(pts[i+1][0]-pts[i][0], pts[i+1][1]-pts[i][1]);
    cumLens.push(totalLen);
  }
  if (!totalLen) return 0;
  let maxCum = 0;
  for (const dp of drawn) {
    for (let i = 0; i < pts.length - 1; i++) {
      const d = distToSeg(dp.x, dp.y, pts[i][0], pts[i][1], pts[i+1][0], pts[i+1][1]);
      if (d < thr && cumLens[i + 1] > maxCum) maxCum = cumLens[i + 1];
    }
  }
  return maxCum / totalLen;
}

// ================================================================
// RENDER PANEL NEBALI (SVG guide + Canvas input)
// ================================================================
function renderGuidedPanel(cb, pi, strokes) {
  const NS   = 'http://www.w3.org/2000/svg';
  const name = cb.getAttribute('data-name');
  const img  = cb.getAttribute('data-img');

  tracingPanelStates[pi]      = { currentStroke: 0, completed: false, drawn: [], isDrawing: false };
  currentlyTrackedStrokes[pi] = strokes;

  // --- Wrapper ---
  const wrap = document.createElement('div');
  wrap.className = 'bg-[#fdf5e6] flex-shrink-0';
  wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;padding:1.25rem;border-radius:1rem;box-shadow:0 5px 15px rgba(0,0,0,0.15);border:2px solid #5D4037;';
  wrap.innerHTML = `
    <h3 class="font-serif text-[#3E2723] bg-white"
        style="font-weight:bold;font-size:.875rem;margin-bottom:.6rem;padding:.25rem 1.5rem;border-radius:999px;border:1px solid rgba(62,39,35,.3);box-shadow:0 2px 4px rgba(0,0,0,.05);">
      Aksara ${name}
    </h3>`;

  // --- Area tracing ---
  const area = document.createElement('div');
  area.style.cssText = 'position:relative;width:250px;height:250px;border:2px dashed rgba(93,64,55,.5);border-radius:.75rem;background:#fff;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;';

  const wm = document.createElement('img');
  wm.src = img;
  wm.style.cssText = 'position:absolute;left:40px;top:40px;width:170px;height:170px;object-fit:contain;opacity:.18;filter:grayscale(100%);pointer-events:none;z-index:1;';
  area.appendChild(wm);

  // SVG layer untuk guide path + hotspot
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '250'); svg.setAttribute('height', '250');
  svg.setAttribute('viewBox', '0 0 180 180'); // MAPPING KOORDINAT TETAP 180x180
  svg.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:2;overflow:visible;';
  svg.id = `tsvg-${pi}`;

  strokes.forEach((stroke, si) => {
    const active = si === 0;
    const pathClr = active ? '#D4956B' : '#C0B49A';
    const hotClr  = active ? '#FFB300' : '#D4C5A9';
    const d  = pointsToSmoothPath(stroke.points, stroke.segments);
    const sp = stroke.points[0];
    const ep = stroke.points[stroke.points.length - 1];

    // Jalur putus-putus (dashed guide)
    const gp = document.createElementNS(NS, 'path');
    gp.setAttribute('d', d); gp.setAttribute('fill', 'none');
    gp.setAttribute('stroke', pathClr); gp.setAttribute('stroke-width', '2.5');
    gp.setAttribute('stroke-dasharray', '7 5'); gp.setAttribute('stroke-linecap', 'round');
    gp.style.opacity = active ? '0.85' : '0.28';
    gp.id = `gp-${pi}-${si}`;
    svg.appendChild(gp);

    // Titik akhir — hanya dot kecil, tanpa angka
    const endDot = document.createElementNS(NS, 'circle');
    endDot.setAttribute('cx', ep[0]); endDot.setAttribute('cy', ep[1]); endDot.setAttribute('r', '3.5');
    endDot.setAttribute('fill', active ? '#D4956B' : '#C0B49A');
    endDot.setAttribute('stroke', '#3E2723'); endDot.setAttribute('stroke-width', '1');
    endDot.style.opacity = active ? '0.9' : '0.28';
    endDot.id = `ge-${pi}-${si}`;
    svg.appendChild(endDot);

    // Ring pulse (hanya hotspot aktif)
    if (active) {
      const ring = document.createElementNS(NS, 'circle');
      ring.setAttribute('cx', sp[0]); ring.setAttribute('cy', sp[1]); ring.setAttribute('r', '15');
      ring.setAttribute('fill', '#FFB30030'); ring.setAttribute('stroke', 'none');
      ring.classList.add('hotspot-ring');
      ring.id = `gr-${pi}-${si}`;
      svg.appendChild(ring);
    }

    // Lingkaran hotspot — lebih kecil
    const hs = document.createElementNS(NS, 'circle');
    hs.setAttribute('cx', sp[0]); hs.setAttribute('cy', sp[1]); hs.setAttribute('r', '8');
    hs.setAttribute('fill', hotClr); hs.setAttribute('stroke', '#3E2723'); hs.setAttribute('stroke-width', '1.5');
    hs.style.opacity = active ? '1' : '0.32';
    hs.id = `gh-${pi}-${si}`;
    svg.appendChild(hs);

    // Angka — hanya tampil di hotspot aktif, ukuran kecil
    if (active) {
      const lbl = document.createElementNS(NS, 'text');
      lbl.setAttribute('x', sp[0]); lbl.setAttribute('y', sp[1] + 4);
      lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('font-size', '9');
      lbl.setAttribute('font-weight', 'bold'); lbl.setAttribute('fill', '#3E2723');
      lbl.setAttribute('font-family', 'sans-serif'); lbl.setAttribute('pointer-events', 'none');
      lbl.textContent = si + 1;
      lbl.id = `gl-${pi}-${si}`;
      svg.appendChild(lbl);
    }
  });

  area.appendChild(svg);

  // Canvas bawah: menyimpan bekas stroke SELESAI (tidak pernah dihapus kecuali reset)
  const doneCvs = document.createElement('canvas');
  doneCvs.width = 250; doneCvs.height = 250;
  doneCvs.style.cssText = 'position:absolute;top:0;left:0;z-index:8;pointer-events:none;touch-action:none;width:100%;height:100%;';
  doneCvs.id = `donecvs-${pi}`;
  area.appendChild(doneCvs);

  const cvs = document.createElement('canvas');
  cvs.width = 250; cvs.height = 250;
  cvs.style.cssText = 'position:absolute;top:0;left:0;z-index:10;cursor:crosshair;touch-action:none;width:100%;height:100%;';
  cvs.id = `ucvs-${pi}`;
  area.appendChild(cvs);

  wrap.appendChild(area);
  setTimeout(() => attachStrokeEvents(cvs, strokes, pi), 80);
  return wrap;
}

// ================================================================
// ATTACH EVENT LISTENER TRACING PER PANEL
// ================================================================
function attachStrokeEvents(cvs, strokes, pi) {
  const ctx  = cvs.getContext('2d');
  ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; // Line width dipertebal
  ctx.strokeStyle = 'rgba(62,39,35,0.85)';

  const SCALE      = 250 / 180; // Faktor skala canvas
  const PROX       = 30;        // toleransi jarak di ruang 180 (px)
  const MIN_PROG   = 0.65;      // minimal 65% jalur harus ditempuh
  const END_R_CHECK = 22;       // radius endpoint di ruang 180

  const getPt = (e) => {
    const r = cvs.getBoundingClientRect();
    const sx = cvs.width / r.width, sy = cvs.height / r.height;
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - r.left) * sx, y: (src.clientY - r.top) * sy };
  };

  const nearPath = (pt, pts) =>
    pts.slice(0, -1).some((_, i) =>
      distToSeg(pt.x, pt.y, pts[i][0], pts[i][1], pts[i+1][0], pts[i+1][1]) < PROX
    );

  let lastPt = null; // posisi terakhir kursor (selalu diperbarui)

  const resetStroke = () => {
    const st = tracingPanelStates[pi];
    if (!st) return;
    ctx.clearRect(0, 0, 180, 180);
    st.drawn = []; st.offCount = 0; lastPt = null;
    cvs.classList.add('shake-tracing');
    setTimeout(() => cvs.classList.remove('shake-tracing'), 600);
  };

  const showNgawur = () => {
    resetStroke();
    Swal.fire({
      icon: 'error', title: 'Ojo Ngawur!',
      text: 'Waduh, coretane metu saka jalure! Tebali sesuai garis putus-putus ya! 🖊️',
      confirmButtonColor: '#3E2723',
      customClass: { popup: 'swal-paper', confirmButton: 'swal-paper-confirm' }
    });
  };

  const onStart = (e) => {
    const st = tracingPanelStates[pi];
    if (!st || st.completed || st.currentStroke >= strokes.length) return;
    e.preventDefault();
    const pt = getPt(e);
    const sp = strokes[st.currentStroke].points[0];

    // Map touch point back to 180 space for comparison with stroke data
    const mappedX = pt.x / SCALE;
    const mappedY = pt.y / SCALE;

    // Harus mulai dekat hotspot awal (radius 30px di ruang 180)
    if (Math.hypot(mappedX - sp[0], mappedY - sp[1]) <= 30) {
      st.isDrawing = true;
      st.drawn    = [];
      st.offCount = 0;
      lastPt      = pt;
      // Hanya clear ucvs (scratchpad) — donecvs tetap
      ctx.clearRect(0, 0, 250, 250);
      ctx.beginPath(); ctx.moveTo(pt.x, pt.y);
    }
  };

  const onMove = (e) => {
    const st = tracingPanelStates[pi];
    if (!st || !st.isDrawing) return;
    e.preventDefault();
    const pt  = getPt(e);
    // Kita harus mapping pt (0-250) balik ke (0-180) untuk komparasi dengan strokeData
    const mappedPt = { x: pt.x / SCALE, y: pt.y / SCALE };
    const pts = strokes[st.currentStroke].points;

    lastPt = pt;

    // Selalu gambar (bisa coret ngawur)
    ctx.lineTo(pt.x, pt.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pt.x, pt.y);

    // Klasifikasikan: dekat jalur atau tidak
    if (nearPath(mappedPt, pts)) {
      st.drawn.push(mappedPt);
    } else {
      st.offCount = (st.offCount || 0) + 1;
    }
  };

  const onEnd = (e) => {
    const st = tracingPanelStates[pi];
    if (!st || !st.isDrawing) return;
    st.isDrawing = false;

    const pts      = strokes[st.currentStroke].points;
    const ep       = pts[pts.length - 1]; // titik akhir stroke
    const onPts    = st.drawn.length;
    const offPts   = st.offCount || 0;
    const totalPts = onPts + offPts;

    // ── 1. Cek ngawur: > 35% titik di luar jalur (berlaku dari 4 titik) ──
    if (totalPts >= 4 && offPts / totalPts > 0.35) {
      return showNgawur();
    }

    // ── 2. Cek endpoint: HARUS ada titik on-path yang masuk area ujung stroke ──
    //    (endpoint = titik akhir jalur; radius 22px; harus betul-betul
    //     menyentuh area ujung jalur, bukan di luar jalur)
    const END_R = 22;
    const endReached = st.drawn.some(pt =>
      Math.hypot(pt.x - ep[0], pt.y - ep[1]) < END_R
    );
    if (!endReached) {
      resetStroke(); return;
    }

    // ── 3. Cek progress: minimal 65% jalur harus ditempuh ──
    const prog = calcStrokeProgress(st.drawn, pts, PROX + 8);
    if (prog >= MIN_PROG) {
      doFinishStroke(pi, strokes);
    } else {
      resetStroke();
    }
  };

  cvs.addEventListener('mousedown',  onStart);
  cvs.addEventListener('mousemove',  onMove);
  cvs.addEventListener('mouseup',    onEnd);
  cvs.addEventListener('mouseleave', onEnd);
  cvs.addEventListener('touchstart', onStart, { passive: false });
  cvs.addEventListener('touchmove',  onMove,  { passive: false });
  cvs.addEventListener('touchend',   onEnd,   { passive: false });
}

// ================================================================
// SELESAI SATU STROKE → AKTIFKAN STROKE BERIKUTNYA
// ================================================================
function doFinishStroke(pi, strokes) {
  const NS = 'http://www.w3.org/2000/svg';
  const st = tracingPanelStates[pi];
  const si = st.currentStroke;
  const el = (id) => document.getElementById(id);

  // Sembunyikan guide path yg sudah selesai (biarkan coretan user terlihat)
  const gp = el(`gp-${pi}-${si}`);
  if (gp) { gp.style.opacity = '0'; gp.style.transition = 'opacity 0.4s'; }
  // Sembunyikan hotspot dan end dot
  const gh = el(`gh-${pi}-${si}`); if (gh) { gh.style.opacity = '0'; gh.style.transition = 'opacity 0.4s'; }
  const gl = el(`gl-${pi}-${si}`); if (gl) { gl.style.opacity = '0'; }
  const ge = el(`ge-${pi}-${si}`); if (ge) { ge.style.opacity = '0'; ge.style.transition = 'opacity 0.4s'; }
  const gr = el(`gr-${pi}-${si}`); if (gr) gr.setAttribute('fill', 'none');

  // TIDAK clear ucvs — salin ke doneCvs, lalu kosongkan ucvs
  const ucvs = el(`ucvs-${pi}`);
  const doneCvs = el(`donecvs-${pi}`);
  if (ucvs && doneCvs) {
    const doneCtx = doneCvs.getContext('2d');
    doneCtx.drawImage(ucvs, 0, 0);
    ucvs.getContext('2d').clearRect(0, 0, 250, 250);
  }
  st.drawn = []; st.offCount = 0;
  st.currentStroke++;

  if (st.currentStroke < strokes.length) {
    const nsi = st.currentStroke;
    const nsp = strokes[nsi].points[0];

    // Aktifkan guide path berikutnya
    const ngp = el(`gp-${pi}-${nsi}`);
    if (ngp) { ngp.setAttribute('stroke', '#D4956B'); ngp.style.opacity = '0.85'; }
    const ngh = el(`gh-${pi}-${nsi}`);
    if (ngh) { ngh.setAttribute('fill', '#FFB300'); ngh.style.opacity = '1'; }
    const nge = el(`ge-${pi}-${nsi}`);
    if (nge) { nge.setAttribute('fill', '#D4956B'); nge.style.opacity = '0.9'; }

    // Tambahkan angka di hotspot berikutnya
    const svg = el(`tsvg-${pi}`);
    if (svg) {
      // Ring pulse
      const ring = document.createElementNS(NS, 'circle');
      ring.setAttribute('cx', nsp[0]); ring.setAttribute('cy', nsp[1]); ring.setAttribute('r', '15');
      ring.setAttribute('fill', '#FFB30030'); ring.setAttribute('stroke', 'none');
      ring.classList.add('hotspot-ring');
      ring.id = `gr-${pi}-${nsi}`;
      const ngh2 = el(`gh-${pi}-${nsi}`);
      if (ngh2) svg.insertBefore(ring, ngh2); else svg.appendChild(ring);

      // Angka
      const existLbl = el(`gl-${pi}-${nsi}`);
      if (!existLbl) {
        const lbl = document.createElementNS(NS, 'text');
        lbl.setAttribute('x', nsp[0]); lbl.setAttribute('y', nsp[1] + 4);
        lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('font-size', '9');
        lbl.setAttribute('font-weight', 'bold'); lbl.setAttribute('fill', '#3E2723');
        lbl.setAttribute('font-family', 'sans-serif'); lbl.setAttribute('pointer-events', 'none');
        lbl.textContent = nsi + 1;
        lbl.id = `gl-${pi}-${nsi}`;
        svg.appendChild(lbl);
      } else {
        existLbl.style.opacity = '1';
      }
    }

    const stepEl = el(`step-ind-${pi}`);
    if (stepEl) stepEl.textContent = `Langkah ${nsi + 1} / ${strokes.length}`;

  } else {
    // Semua stroke selesai!
    st.completed = true;
    
    // Simpan hasil menebali ke local storage
    const ucvs = el(`ucvs-${pi}`);
    const doneCvs = el(`donecvs-${pi}`);
    if (ucvs && doneCvs) {
      const finalCvs = document.createElement('canvas');
      finalCvs.width = 250; finalCvs.height = 250;
      const fctx = finalCvs.getContext('2d');
      fctx.drawImage(doneCvs, 0, 0);
      fctx.drawImage(ucvs, 0, 0); // Gabungkan scratchpad terakhir (walaupun harusnya kosong)
      
      const cb = tracingAksaras[currentTracingIndex];
      if (cb) {
        savedDrawings[cb.value] = finalCvs.toDataURL();
        localStorage.setItem("legena_drawings", JSON.stringify(savedDrawings));
        checkedAksaraIds.add(cb.value); // Pastikan ditandai
      }
    }

    const stepEl = el(`step-ind-${pi}`);
    if (stepEl) { stepEl.textContent = '✅ Selesai!'; stepEl.style.color = '#22c55e'; }
  }
}

// ================================================================
// RESET PANEL KE KONDISI AWAL
// ================================================================
function resetGuidedPanel(pi, strokes) {
  const st = tracingPanelStates[pi];
  if (!st) return;
  st.currentStroke = 0; st.completed = false; st.drawn = []; st.isDrawing = false; st.offCount = 0;

  // Clear kedua canvas
  const ucvs   = document.getElementById(`ucvs-${pi}`);
  const doneCvs = document.getElementById(`donecvs-${pi}`);
  if (ucvs)    ucvs.getContext('2d').clearRect(0, 0, 250, 250);
  if (doneCvs) doneCvs.getContext('2d').clearRect(0, 0, 250, 250);

  strokes.forEach((_, si) => {
    const active = si === 0;
    // Guide path
    const gp = document.getElementById(`gp-${pi}-${si}`);
    if (gp) {
      gp.setAttribute('stroke', active ? '#D4956B' : '#C0B49A');
      gp.setAttribute('stroke-dasharray', '7 5');
      gp.style.transition = '';
      gp.style.opacity = active ? '0.85' : '0.28';
    }
    // Hotspot circle
    const gh = document.getElementById(`gh-${pi}-${si}`);
    if (gh) {
      gh.setAttribute('fill', active ? '#FFB300' : '#D4C5A9');
      gh.style.transition = '';
      gh.style.opacity = active ? '1' : '0.32';
    }
    // End dot
    const ge = document.getElementById(`ge-${pi}-${si}`);
    if (ge) {
      ge.setAttribute('fill', active ? '#D4956B' : '#C0B49A');
      ge.style.transition = '';
      ge.style.opacity = active ? '0.9' : '0.28';
    }
    // Label angka — tampilkan hanya untuk stroke aktif (si=0)
    const gl = document.getElementById(`gl-${pi}-${si}`);
    if (gl) {
      gl.style.opacity = active ? '1' : '0';
      gl.textContent = si + 1;
    }
    // Ring pulse — restore si=0, hapus si>0 yang mungkin sudah dibuat
    const gr = document.getElementById(`gr-${pi}-${si}`);
    if (si === 0 && gr) {
      gr.setAttribute('fill', '#FFB30030');
    } else if (gr) {
      gr.remove();
    }
  });

  const stepEl = document.getElementById(`step-ind-${pi}`);
  if (stepEl) { stepEl.textContent = `Langkah 1 / ${strokes.length}`; stepEl.style.color = '#5D4037'; }
}

// ================================================================
// MAIN FUNCTIONS: startTracing / closeCanvas / clearCanvas / checkCanvas
// ================================================================
window.startTracing = () => {
  const checked = Array.from(document.querySelectorAll(".aksara-checkbox:checked"));
  if (checked.length === 0) {
    return Swal.fire({ icon: "warning", title: "Pilih Aksara!", text: "Sampeyan kudu milih sakora-orane siji aksara kanggo latihan nebali", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } });
  }

  const modal = document.getElementById("canvas-modal");
  tracingAksaras = checked;
  currentTracingIndex = 0;
  
  renderCurrentTracingAksara();
  modal.classList.remove("hidden");
};

function renderCurrentTracingAksara() {
  const container = document.getElementById("canvas-container");
  container.innerHTML = "";
  tracingPanelStates = []; currentlyTrackedStrokes = [];
  canvases = []; contexts = [];

  const cb = tracingAksaras[currentTracingIndex];
  const index = 0; // Karena cuma satu yang tampil

  // Update Judul Modal
  const modalTitle = document.querySelector("#canvas-modal-card h2");
  if (modalTitle) {
    modalTitle.textContent = `Latihan Nebali (${currentTracingIndex + 1}/${tracingAksaras.length})`;
  }

  const data = strokeData[cb.value];
  if (data) {
    // GUIDED TRACING
    const panel = renderGuidedPanel(cb, index, data.strokes);
    container.appendChild(panel);

    // RESTORE SAVED DRAWING
    if (savedDrawings[cb.value]) {
      setTimeout(() => {
        const doneCvs = document.getElementById(`donecvs-0`);
        if (doneCvs) {
          const img = new Image();
          img.onload = () => {
             doneCvs.getContext('2d').drawImage(img, 0, 0);
             // Sembunyikan semua guide karena sudah selesai
             tracingPanelStates[0].completed = true;
             tracingPanelStates[0].currentStroke = data.strokes.length;
             data.strokes.forEach((_, si) => {
               const gp = document.getElementById(`gp-0-${si}`); if (gp) gp.style.opacity = '0';
               const gh = document.getElementById(`gh-0-${si}`); if (gh) gh.style.opacity = '0';
               const gl = document.getElementById(`gl-0-${si}`); if (gl) gl.style.opacity = '0';
               const ge = document.getElementById(`ge-0-${si}`); if (ge) ge.style.opacity = '0';
               const gr = document.getElementById(`gr-0-${si}`); if (gr) gr.setAttribute('fill', 'none');
             });
             const stepEl = document.getElementById(`step-ind-0`);
             if (stepEl) { stepEl.textContent = '✅ Selesai!'; stepEl.style.color = '#22c55e'; }
          };
          img.src = savedDrawings[cb.value];
        }
      }, 150);
    }
  } else {
    // FALLBACK
    tracingPanelStates[index] = { completed: false, isFree: true };
    currentlyTrackedStrokes[index] = null;
    container.innerHTML += `
      <div class="bg-[#fdf5e6] flex-shrink-0" style="display:flex;flex-direction:column;align-items:center;padding:1.25rem;border-radius:1rem;box-shadow:0 5px 15px rgba(0,0,0,0.15);border:2px solid #5D4037;">
        <h3 class="font-serif text-[#3E2723] bg-white" style="font-weight:bold;font-size:.875rem;margin-bottom:1.25rem;padding:.25rem 1.5rem;border-radius:999px;border:1px solid rgba(62,39,35,.3);box-shadow:0 2px 4px rgba(0,0,0,.05);">Aksara ${cb.getAttribute("data-name")}</h3>
        <div class="bg-white touch-none overflow-hidden" style="position:relative;display:flex;align-items:center;justify-content:center;border:2px dashed rgba(93,64,55,.5);border-radius:.75rem;width:250px;height:250px;">
          <img src="${cb.getAttribute("data-img")}" class="pointer-events-none" style="position:absolute;width:170px;height:170px;object-fit:contain;opacity:0.25;filter:grayscale(100%);" alt="Watermark" />
          <canvas id="board-0" width="250" height="250" class="cursor-crosshair" style="position:absolute;top:0;left:0;z-index:10;"></canvas>
        </div>
      </div>`;

    setTimeout(() => {
      const cvs = document.getElementById("board-0");
      if (!cvs) return;
      const ctx = cvs.getContext("2d", { willReadFrequently: true });
      ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#3E2723";
      canvases.push(cvs); contexts.push(ctx);

      // RESTORE SAVED DRAWING (Fallback)
      if (savedDrawings[cb.value]) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = savedDrawings[cb.value];
      }

      let isDrawing = false;
      const drawFn = (e) => { 
        if (!isDrawing) return; 
        e.preventDefault(); 
        const r = cvs.getBoundingClientRect(); 
        const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) * cvs.width / r.width; 
        const y = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) * cvs.height / r.height; 
        ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); 
        
        // Simpan setiap coretan ke local storage (untuk free canvas)
        savedDrawings[cb.value] = cvs.toDataURL();
        localStorage.setItem("legena_drawings", JSON.stringify(savedDrawings));
      };
      cvs.addEventListener("mousedown", (e) => { isDrawing = true; drawFn(e); });
      cvs.addEventListener("mouseup",   () => { isDrawing = false; ctx.beginPath(); });
      cvs.addEventListener("mousemove", drawFn);
      cvs.addEventListener("touchstart", (e) => { isDrawing = true; drawFn(e); }, { passive: false });
      cvs.addEventListener("touchend",   () => { isDrawing = false; ctx.beginPath(); });
      cvs.addEventListener("touchmove",  drawFn, { passive: false });
    }, 100);
  }
}

window.closeCanvas = () => document.getElementById("canvas-modal").classList.add("hidden");

window.clearCanvas = () => {
  // Reset semua guided panel
  tracingPanelStates.forEach((st, pi) => {
    if (st && !st.isFree && currentlyTrackedStrokes[pi]) {
      resetGuidedPanel(pi, currentlyTrackedStrokes[pi]);
    }
  });
  // Clear free canvas fallback
  canvases.forEach((cvs, i) => contexts[i]?.clearRect(0, 0, cvs.width, cvs.height));
};

window.checkCanvas = () => {
  const hasGuided = tracingPanelStates.some(st => st && !st.isFree);

  if (hasGuided) {
    // --- CEK GUIDED TRACING ---
    const allDone = tracingPanelStates.every(st => st && st.completed);
    if (!allDone) {
      return Swal.fire({ icon: "warning", title: "Dereng Rampung!", text: "Ibutake kabeh garis! Tebali saka nomer 1 tekan rampung ya! 🖊️", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } });
    }

    // Jika masih ada aksara berikutnya
    if (currentTracingIndex < tracingAksaras.length - 1) {
      Swal.fire({ 
        icon: "success", 
        title: "Mantap! ✨", 
        text: "Siji maneh yo, ayo diteruske!", 
        confirmButtonColor: "#3E2723", 
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: "swal-paper" } 
      }).then(() => {
        currentTracingIndex++;
        renderCurrentTracingAksara();
      });
      return;
    }

    completedPages[currentPage] = true;
    localStorage.setItem("legena_completed_pages", JSON.stringify(completedPages));
    if (currentPage === aksaraData.length - 1) sessionStorage.setItem('completed_legena', 'true');
    Swal.fire({ icon: "success", title: "Sae Pisann! ✨", text: "Tulisanmu apik lan rapi, mantepp!", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } }).then(() => {
      closeCanvas();
      if (currentPage < aksaraData.length - 1) {
        nextPage();
      } else {
        Swal.fire({ icon: "success", title: "Mantepp!", html: "Sampeyan wis ngrampungake kabeh aksara Legena!", confirmButtonText: "Lanjut →", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } }).then(() => { window.location.href = "beranda.html"; });
      }
    });
    return;
  }

  // --- CEK FREE CANVAS (fallback halaman 2-4) ---
  let empty = false;
  const cvs = canvases[0];
  if (!cvs) return;
  const ctx = contexts[0];
  
  // Deteksi canvas kosong
  const pix = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
  let hasInk = false;
  for (let i = 0; i < pix.length; i += 4) { if (pix[i+3] > 20) { hasInk = true; break; } }
  if (!hasInk) empty = true;

  if (empty) {
    return Swal.fire({ icon: "warning", title: "Kosong!", text: "Aksarane digambar dhisik ya!", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper" } });
  }

  // Jika masih ada aksara berikutnya
  if (currentTracingIndex < tracingAksaras.length - 1) {
    Swal.fire({ 
      icon: "success", 
      title: "Mantap! ✨", 
      text: "Siji maneh yo!", 
      confirmButtonColor: "#3E2723", 
      timer: 1500,
      showConfirmButton: false,
      customClass: { popup: "swal-paper" } 
    }).then(() => {
      currentTracingIndex++;
      renderCurrentTracingAksara();
    });
    return;
  }

  completedPages[currentPage] = true;
  localStorage.setItem("legena_completed_pages", JSON.stringify(completedPages));

  if (currentPage === aksaraData.length - 1) sessionStorage.setItem('completed_legena', 'true');
  
  Swal.fire({ icon: "success", title: "Mantepp! ✨", text: "Halaman iki wis rampung!", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper" } }).then(() => {
    closeCanvas();
    if (currentPage < aksaraData.length - 1) nextPage();
    else window.location.href = "beranda.html";
  });
};

renderBook();