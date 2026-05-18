import "./legena.css"; 

import { pasanganData } from "../../data/pasangan-data.js";

let currentPage = 0;
const bookLayout = document.getElementById('book-layout');

let checkedAksaraIds = new Set(); 
let savedDrawings = {}; 

// Array untuk menandai halaman yang sudah diselesaikan (berhasil menebali)
let completedPages = new Array(pasanganData.length).fill(false);

window.selectAksaraCard = (el) => {
  document.querySelectorAll('.aksara-card').forEach(card => card.classList.remove('aksara-card-selected'));
  el.classList.add('aksara-card-selected');
};

function createCard(item) {
  // PERBAIKAN: Gambar di dalam buku di-ZOOM dari 38px jadi 55px
  return `
    <div onclick="selectAksaraCard(this)" class="aksara-card flex flex-col items-center justify-center bg-white rounded-xl cursor-pointer flex-shrink-0" style="width: 75px; height: 90px; padding: 8px;">
      <img src="${item.img}" style="width: 55px; height: 55px; object-fit: contain; margin-bottom: 2px;" class="drop-shadow-sm pointer-events-none" alt="Pasangan ${item.name}" />
      <span style="font-size: 10px; font-weight: 900; color: #795548; text-transform: uppercase;">${item.name}</span>
    </div>
  `;
}

function createCheckbox(item) {
  const isChecked = checkedAksaraIds.has(item.id) ? 'checked' : '';
  return `
    <label class="checkbox-label flex items-center bg-white border-b-4 border-r-4 border-[#5d4037]/30 rounded-xl cursor-pointer hover:bg-[#FFF3E0] hover:-translate-y-1 shadow-sm transition flex-shrink-0" style="width: 125px; height: 40px; gap: 8px; padding-left: 12px;">
      <input type="checkbox" class="aksara-checkbox" value="${item.id}" data-name="${item.name}" data-img="${item.img}" onchange="handleCheck(this)" ${isChecked}>
      <span style="font-weight: 800; color: #795548; font-size: 11px;">Pasangan ${item.name}</span>
    </label>
  `;
}

function renderBook() {
  const items = pasanganData[currentPage];

  let leftHTML = `
    <div class="page-left flex-1 w-1/2 p-3 md:p-5 flex flex-col items-center bg-[#fdf5e6] overflow-y-auto">
      <div class="book-banner w-[80%] py-1.5 md:py-2 text-center mb-5 z-10 flex-shrink-0">
        <h2 class="text-[13px] md:text-lg font-serif font-bold tracking-wide">Pasangan Dasar</h2>
      </div>
      <div class="flex flex-col w-full items-center flex-1 justify-center" style="gap: 12px;">
        <div class="flex flex-row justify-center w-full" style="gap: 12px;">${createCard(items[0])}${createCard(items[1])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 12px;">${createCard(items[2])}${createCard(items[3])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 12px;">${createCard(items[4])}</div>
      </div>
    </div>
  `;

  let rightHTML = `
    <div class="page-right flex-1 w-1/2 p-3 md:p-5 flex flex-col items-center bg-[#fdf5e6]/50 overflow-y-auto">
      <div class="book-banner w-[80%] mx-auto py-1.5 md:py-2 text-center mb-5 z-10 flex-shrink-0" style="background: linear-gradient(to bottom, #795548, #A1887F); border: 2px solid #03A9F4; box-shadow: 0 4px 0 #03A9F4;">
        <h3 class="font-serif text-[11px] md:text-lg font-bold text-[#FFFFFF]">Latihan Nulis</h3>
      </div>
      <p class="text-[9px] md:text-[13px] text-center italic text-[#A1887F] mb-5 font-serif flex-shrink-0">"Pilih maksimal 2 pasangan kanggo latihan"</p>
      
      <div class="flex flex-col w-full items-center flex-1" style="gap: 10px;">
        <div class="flex flex-row justify-center w-full" style="gap: 10px;">${createCheckbox(items[0])}${createCheckbox(items[1])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 10px;">${createCheckbox(items[2])}${createCheckbox(items[3])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 10px;">${createCheckbox(items[4])}</div>
      </div>
      
      <div class="w-[80%] mt-5 mb-4 flex-shrink-0">
        <button onclick="startTracing()" class="btn-modern-3d w-full py-2 md:py-2.5 text-[10px] md:text-[13px] font-bold tracking-widest shadow-lg hover:scale-[1.02] transition-transform">MULAI NEBALI ✍️</button>
      </div>
      
      <div class="w-full flex justify-between items-center mt-auto pt-3 border-t border-dashed border-[#A1887F]/30 flex-shrink-0">
        <button onclick="prevPage()" class="btn-modern-3d text-[9px] md:text-[11px] font-bold tracking-wider" style="padding: 6px 16px;" ${currentPage === 0 ? 'disabled' : ''}>
          <span style="display: flex; gap: 4px; align-items: center;"><span>⬅</span><span>BALENI</span></span>
        </button>
        <span class="text-[#795548] font-bold text-[9px] md:text-[11px]">Hal ${currentPage + 1}/4</span>
        <button onclick="nextPage()" class="btn-modern-3d text-[9px] md:text-[11px] font-bold tracking-wider" style="padding: 6px 16px;" ${currentPage === pasanganData.length-1 || !completedPages[currentPage] ? 'disabled' : ''}>
          <span style="display: flex; gap: 4px; align-items: center;"><span>LANJUT</span><span>➡</span></span>
        </button>
      </div>
    </div>
  `;

  bookLayout.innerHTML = leftHTML + rightHTML;
}

window.prevPage = () => { 
  if(currentPage > 0) { 
    bookLayout.classList.add('flip-out-prev');
    setTimeout(() => {
      currentPage--; 
      renderBook(); 
      bookLayout.classList.remove('flip-out-prev');
      bookLayout.classList.add('flip-in-prev');
      setTimeout(() => bookLayout.classList.remove('flip-in-prev'), 400);
    }, 400); 
  } 
};

window.nextPage = () => { 
  if(currentPage < pasanganData.length-1 && completedPages[currentPage]) { 
    bookLayout.classList.add('flip-out-next');
    setTimeout(() => {
      currentPage++; 
      renderBook(); 
      bookLayout.classList.remove('flip-out-next');
      bookLayout.classList.add('flip-in-next');
      setTimeout(() => bookLayout.classList.remove('flip-in-next'), 400);
    }, 400);
  } 
};

window.handleCheck = (cb) => {
  const checked = document.querySelectorAll('.aksara-checkbox:checked');
  if(checked.length > 2) {
    cb.checked = false; 
    Swal.fire({ icon: 'warning', title: 'Kebak!', text: 'Maksimal milih 2 pasangan ae yo!', confirmButtonColor: '#795548', customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }});
    return;
  }
  if (cb.checked) {
    checkedAksaraIds.add(cb.value);
  } else {
    checkedAksaraIds.delete(cb.value);
  }
};

let canvases = [];
let contexts = [];

window.startTracing = () => {
  const checked = Array.from(document.querySelectorAll('.aksara-checkbox:checked'));
  
  if(checked.length !== 2) {
    return Swal.fire({ 
      icon: 'warning', 
      title: 'Pilih 2 Pasangan!', 
      text: 'Sampeyan kudu milih pas 2 pasangan kanggo latihan nebali', 
      confirmButtonColor: '#795548', 
      customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } 
    });
  }

  const modal = document.getElementById('canvas-modal');
  const container = document.getElementById('canvas-container');
  container.innerHTML = ''; canvases = []; contexts = [];
  const NS = "http://www.w3.org/2000/svg";

  checked.forEach((cb, index) => {
    const img = cb.getAttribute('data-img');
    const area = document.createElement('div');
    area.className = 'flex-shrink-0 w-[200px] sm:w-[250px] md:w-[280px] bg-white touch-none overflow-hidden';
    area.style.cssText = 'position:relative;aspect-ratio:1/1;border:2px dashed rgba(93,64,55,.5);border-radius:.75rem;box-shadow:inset 0 0 10px rgba(0,0,0,0.05);';

    const h3 = document.createElement('div');
    h3.innerHTML = `<span style="font-family: serif; font-weight: bold; font-size: 0.75rem; color: #795548; background: rgba(253, 245, 230, 0.95); padding: 4px 12px; border-radius: 999px; border: 1px solid rgba(62,39,35,0.3); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Pasangan ${cb.getAttribute('data-name')}</span>`;
    h3.style.cssText = 'position: absolute; top: 12px; left: 50%; transform: translateX(-50%); z-index: 20; pointer-events: none; white-space: nowrap;';
    area.appendChild(h3);

    const innerScaleWrap = document.createElement('div');
    innerScaleWrap.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;transform:scale(1.35);transform-origin:center;';

    const wm = document.createElement('img');
    wm.src = img;
    wm.style.cssText = 'position:absolute;left:16%;top:16%;width:68%;height:68%;object-fit:contain;opacity:.18;filter:grayscale(100%);pointer-events:none;z-index:1;';
    innerScaleWrap.appendChild(wm);

    const cvs = document.createElement('canvas');
    cvs.id = `board-${index}`;
    cvs.width = 180; cvs.height = 180;
    cvs.className = 'cursor-crosshair';
    cvs.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;touch-action:none;';
    innerScaleWrap.appendChild(cvs);

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 180 180');
    svg.style.cssText = 'position:absolute;top:0;left:0;z-index:5;pointer-events:none;';
    innerScaleWrap.appendChild(svg);

    area.appendChild(innerScaleWrap);
    container.appendChild(area);
  });

  modal.classList.remove('hidden');

  setTimeout(() => {
    checked.forEach((cb, index) => {
      const cvs = document.getElementById(`board-${index}`);
      const ctx = cvs.getContext('2d', { willReadFrequently: true });
      ctx.lineWidth = 2; 
      ctx.lineCap = "round"; 
      ctx.lineJoin = "round"; 
      ctx.strokeStyle = "#795548";
      canvases.push(cvs); contexts.push(ctx);

      const aksaraId = cb.value;
      if (savedDrawings[aksaraId]) {
        let img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = savedDrawings[aksaraId];
      }

      let isDrawing = false;
      const start = (e) => { isDrawing = true; draw(e); };
      const end = () => { isDrawing = false; ctx.beginPath(); };
      const draw = (e) => {
        if(!isDrawing) return;
        e.preventDefault();
        const rect = cvs.getBoundingClientRect();
        const scaleX = cvs.width / rect.width, scaleY = cvs.height / rect.height;
        const x = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) * scaleX;
        const y = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top) * scaleY;
        ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y);
      };
      cvs.addEventListener("mousedown", start); cvs.addEventListener("mouseup", end); cvs.addEventListener("mousemove", draw);
      cvs.addEventListener("touchstart", start, {passive: false}); cvs.addEventListener("touchend", end); cvs.addEventListener("touchmove", draw, {passive: false});
    });
  }, 100);
};

window.closeCanvas = () => document.getElementById('canvas-modal').classList.add('hidden');
window.clearCanvas = () => canvases.forEach((cvs, i) => contexts[i].clearRect(0, 0, cvs.width, cvs.height));

window.checkCanvas = () => {
  let empty = false, messy = false, incomplete = false;

  canvases.forEach((cvs, i) => {
    const ctx = contexts[i];
    const imgElement = document.querySelectorAll('#canvas-container img')[i]; 

    const hitCvs = document.createElement('canvas');
    hitCvs.width = cvs.width; hitCvs.height = cvs.height;
    const hitCtx = hitCvs.getContext('2d', { willReadFrequently: true });
    
    // PERBAIKAN SENSOR: Offset disesuaikan dengan ukuran gambar baru (160px)
    const offset = (cvs.width - 160) / 2; 

    hitCtx.shadowColor = "black";
    hitCtx.shadowBlur = 15; 
    for(let k=0; k<3; k++) hitCtx.drawImage(imgElement, offset, offset, 160, 160);

    const tempCvs = document.createElement('canvas');
    tempCvs.width = cvs.width; tempCvs.height = cvs.height;
    const tempCtx = tempCvs.getContext('2d', { willReadFrequently: true });
    tempCtx.drawImage(imgElement, offset, offset, 160, 160);

    const userData = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    const hitData = hitCtx.getImageData(0, 0, hitCvs.width, hitCvs.height).data;
    const tempData = tempCtx.getImageData(0, 0, tempCvs.width, tempCvs.height).data;

    let userPixels = 0, strayPixels = 0, templatePixels = 0, coveredPixels = 0;

    for (let j = 3; j < userData.length; j += 4) {
      const isUser = userData[j] > 10;     
      const isHitbox = hitData[j] > 10;    
      const isTemplate = tempData[j] > 10; 

      if (isUser) {
        userPixels++;
        if (!isHitbox) strayPixels++; 
      }
      if (isTemplate) {
        templatePixels++;
        if (isUser) coveredPixels++; 
      }
    }

    // --- SENSOR BARU KHUSUS PENA TIPIS ---
    if (templatePixels === 0) {
        if (userPixels < 30) empty = true; // Diturunin dari 100 ke 30
        if (userPixels > 4000) messy = true;
        return;
      }
  
      if (userPixels < 30) { // Diturunin dari 100 ke 30 biar gak dibilang kosong
        empty = true; 
      } else if ((strayPixels / userPixels) > 0.45) { // Dinaikin dikit biar sistem agak toleran sama coretan meleset tipis
        messy = true; 
      } else if ((coveredPixels / templatePixels) < 0.08) { // DIPERKECIL DRASTIS dari 0.25 ke 0.08! Karena pena cuma 2px, 8% ketutup aja udah dianggap rapi.
        incomplete = true; 
      }
  });

  if (empty) {
    Swal.fire({icon: 'warning', title: 'Dereng Rampung!', text: 'Wonten pasangan ingkang dereng sampeyan tebali. Ayoo diselesaino!', confirmButtonColor: '#795548', customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }});
  } else if (messy) {
    Swal.fire({icon: 'error', title: 'Coretan Ngawur!', text: 'Waduh, sampeyan ojo nulis ngawur/metu garis. Sing rapi ya!', confirmButtonColor: '#795548', customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }});
  } else if (incomplete) {
    Swal.fire({icon: 'warning', title: 'Kurang Pas!', text: 'Coretane durung nutupi bentuk pasangan. Coba ditebali kabeh ojo sepotong!', confirmButtonColor: '#795548', customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }});
  } else {
    const checkedBoxes = Array.from(document.querySelectorAll('.aksara-checkbox:checked'));
    canvases.forEach((cvs, i) => {
      savedDrawings[checkedBoxes[i].value] = cvs.toDataURL();
    });

    // Tandai halaman ini sebagai selesai
    completedPages[currentPage] = true;

    // Simpan status selesai ke sessionStorage
    if (currentPage === pasanganData.length - 1) {
      sessionStorage.setItem('completed_pasangan', 'true');
    }

    Swal.fire({icon: 'success', title: 'Sae Pisann! ✨', text: 'Tulisanmu apik lan rapi, mantepp!', confirmButtonColor: '#795548', customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }}).then(() => { 
      closeCanvas(); 
      if(currentPage < pasanganData.length - 1) {
        nextPage();
      } else {
        // Jika halaman terakhir, langsung ke beranda
        Swal.fire({
          icon: "success",
          title: "Mantepp!",
          html: "Sampeyan wis ngrampungake kabeh pasangan aksara!",
          confirmButtonText: "Lanjut →",
          confirmButtonColor: "#03A9F4",
          customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }
        }).then(() => {
          window.location.href = "beranda.html";
        });
      }
    });
  }
};

renderBook();