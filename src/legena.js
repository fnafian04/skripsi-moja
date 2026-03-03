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

let checkedAksaraIds = new Set();
let savedDrawings = {};

// Array untuk menandai halaman yang sudah diselesaikan (berhasil menebali)
let completedPages = new Array(aksaraData.length).fill(false);

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
    <div class="page-left flex-1 w-1/2 p-3 md:p-5 flex flex-col items-center bg-[#fdf5e6] overflow-y-auto">
      <div class="book-banner w-[80%] py-1.5 md:py-2 text-center mb-5 z-10 flex-shrink-0">
        <h2 class="text-[13px] md:text-lg font-serif font-bold tracking-wide">Aksara Dasar</h2>
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
      <div class="book-banner w-[80%] mx-auto py-1.5 md:py-2 text-center mb-5 z-10 flex-shrink-0" style="background: linear-gradient(to bottom, #A1887F, #5D4037);">
        <h3 class="font-serif text-[11px] md:text-lg font-bold text-[#FFF3E0]">Latihan Nulis</h3>
      </div>
      <p class="text-[9px] md:text-[13px] text-center italic text-[#5D4037] mb-5 font-serif flex-shrink-0">"Pilih maksimal 2 aksara kanggo latihan"</p>
      
      <div class="flex flex-col w-full items-center flex-1" style="gap: 10px;">
        <div class="flex flex-row justify-center w-full" style="gap: 10px;">${createCheckbox(items[0])}${createCheckbox(items[1])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 10px;">${createCheckbox(items[2])}${createCheckbox(items[3])}</div>
        <div class="flex flex-row justify-center w-full" style="gap: 10px;">${createCheckbox(items[4])}</div>
      </div>
      
      <div class="w-[80%] mt-5 mb-4 flex-shrink-0">
        <button onclick="startTracing()" class="btn-modern-3d w-full py-2 md:py-2.5 text-[10px] md:text-[13px] font-bold tracking-widest shadow-lg hover:scale-[1.02] transition-transform">MULAI NEBALI ✍️</button>
      </div>
      
      <div class="w-full flex justify-between items-center mt-auto pt-3 border-t border-dashed border-[#5D4037]/30 flex-shrink-0">
        <button onclick="prevPage()" class="btn-modern-3d text-[9px] md:text-[11px] font-bold tracking-wider" style="padding: 6px 16px;" ${currentPage === 0 ? "disabled" : ""}>
          <span style="display: flex; gap: 4px; align-items: center;"><span>⬅</span><span>BALENI</span></span>
        </button>
        <span class="text-[#3E2723] font-bold text-[9px] md:text-[11px]">Hal ${currentPage + 1}/4</span>
        <button onclick="nextPage()" class="btn-modern-3d text-[9px] md:text-[11px] font-bold tracking-wider" style="padding: 6px 16px;" ${currentPage === aksaraData.length - 1 || !completedPages[currentPage] ? "disabled" : ""}>
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
};

let canvases = [];
let contexts = [];

window.startTracing = () => {
  const checked = Array.from(document.querySelectorAll(".aksara-checkbox:checked"));

  if (checked.length !== 2) {
    return Swal.fire({
      icon: "warning",
      title: "Pilih 2 Aksara!",
      text: "Sampeyan kudu milih pas 2 aksara kanggo latihan nebali",
      confirmButtonColor: "#3E2723",
      customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" },
    });
  }

  const modal = document.getElementById("canvas-modal");
  const container = document.getElementById("canvas-container");
  container.innerHTML = "";
  canvases = [];
  contexts = [];

  checked.forEach((cb, index) => {
    container.innerHTML += `
      <div class="bg-[#fdf5e6] flex-shrink-0" style="display: flex; flex-direction: column; align-items: center; padding: 1.25rem; border-radius: 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border: 2px solid #5D4037;">
        <h3 class="font-serif text-[#3E2723] bg-white" style="font-weight: bold; font-size: 0.875rem; margin-bottom: 1.25rem; padding: 0.25rem 1.5rem; border-radius: 999px; border: 1px solid rgba(62,39,35,0.3); box-shadow: 0 2px 4px rgba(0,0,0,0.05);">Aksara ${cb.getAttribute(
          "data-name"
        )}</h3>
        <div class="bg-white touch-none overflow-hidden" style="position: relative; display: flex; align-items: center; justify-content: center; border: 2px dashed rgba(93,64,55,0.5); border-radius: 0.75rem; width: 180px; height: 180px;">
          <img src="${cb.getAttribute("data-img")}" class="pointer-events-none" style="position: absolute; width: 120px; height: 120px; object-fit: contain; opacity: 0.25; filter: grayscale(100%);" alt="Watermark" />
          <canvas id="board-${index}" width="180" height="180" class="cursor-crosshair" style="position: absolute; top: 0; left: 0; z-index: 10;"></canvas>
        </div>
      </div>
    `;
  });

  modal.classList.remove("hidden");

  setTimeout(() => {
    checked.forEach((cb, index) => {
      const cvs = document.getElementById(`board-${index}`);
      const ctx = cvs.getContext("2d", { willReadFrequently: true });
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#3E2723";
      canvases.push(cvs);
      contexts.push(ctx);

      const aksaraId = cb.value;
      if (savedDrawings[aksaraId]) {
        let img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = savedDrawings[aksaraId];
      }

      let isDrawing = false;
      const start = (e) => {
        isDrawing = true;
        draw(e);
      };
      const end = () => {
        isDrawing = false;
        ctx.beginPath();
      };
      const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const rect = cvs.getBoundingClientRect();
        const scaleX = cvs.width / rect.width,
          scaleY = cvs.height / rect.height;
        const x = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) * scaleX;
        const y = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top) * scaleY;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      };
      cvs.addEventListener("mousedown", start);
      cvs.addEventListener("mouseup", end);
      cvs.addEventListener("mousemove", draw);
      cvs.addEventListener("touchstart", start, { passive: false });
      cvs.addEventListener("touchend", end);
      cvs.addEventListener("touchmove", draw, { passive: false });
    });
  }, 100);
};

window.closeCanvas = () => document.getElementById("canvas-modal").classList.add("hidden");
window.clearCanvas = () => canvases.forEach((cvs, i) => contexts[i].clearRect(0, 0, cvs.width, cvs.height));

window.checkCanvas = () => {
  let empty = false,
    messy = false,
    incomplete = false;

  canvases.forEach((cvs, i) => {
    const ctx = contexts[i];
    const imgElement = document.querySelectorAll("#canvas-container img")[i];

    const hitCvs = document.createElement("canvas");
    hitCvs.width = cvs.width;
    hitCvs.height = cvs.height;
    const hitCtx = hitCvs.getContext("2d", { willReadFrequently: true });
    const offset = (cvs.width - 120) / 2;

    hitCtx.shadowColor = "black";
    hitCtx.shadowBlur = 15;
    for (let k = 0; k < 3; k++) hitCtx.drawImage(imgElement, offset, offset, 120, 120);

    const tempCvs = document.createElement("canvas");
    tempCvs.width = cvs.width;
    tempCvs.height = cvs.height;
    const tempCtx = tempCvs.getContext("2d", { willReadFrequently: true });
    tempCtx.drawImage(imgElement, offset, offset, 120, 120);

    const userData = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    const hitData = hitCtx.getImageData(0, 0, hitCvs.width, hitCvs.height).data;
    const tempData = tempCtx.getImageData(0, 0, tempCvs.width, tempCvs.height).data;

    let userPixels = 0,
      strayPixels = 0,
      templatePixels = 0,
      coveredPixels = 0;

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

    if (templatePixels === 0) {
      if (userPixels < 100) empty = true;
      if (userPixels > 4000) messy = true;
      return;
    }

    if (userPixels < 100) {
      empty = true;
    } else if (strayPixels / userPixels > 0.35) {
      messy = true;
    } else if (coveredPixels / templatePixels < 0.25) {
      incomplete = true;
    }
  });

  if (empty) {
    Swal.fire({ icon: "warning", title: "Dereng Rampung!", text: "Wonten aksara ingkang dereng sampeyan tebali. Ayoo diselesaino!", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } });
  } else if (messy) {
    Swal.fire({ icon: "error", title: "Coretan Ngawur!", text: "Waduh, sampeyan ojo nulis ngawur/metu garis. Sing rapi ya!", confirmButtonColor: "#3E2723", customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" } });
  } else if (incomplete) {
    Swal.fire({
      icon: "warning",
      title: "Kurang Pas!",
      text: "Coretane durung nutupi bentuk aksarane. Coba ditebali kabeh ojo sepotong!",
      confirmButtonColor: "#3E2723",
      customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" },
    });
  } else {
    const checkedBoxes = Array.from(document.querySelectorAll(".aksara-checkbox:checked"));
    canvases.forEach((cvs, i) => {
      savedDrawings[checkedBoxes[i].value] = cvs.toDataURL();
    });

    // Tandai halaman ini sebagai selesai
    completedPages[currentPage] = true;

    // Simpan status selesai ke sessionStorage
    if (currentPage === aksaraData.length - 1) {
      sessionStorage.setItem('completed_legena', 'true');
    }

    Swal.fire({
      icon: "success",
      title: "Sae Pisann! ✨",
      text: "Tulisanmu apik lan rapi, mantepp!",
      confirmButtonColor: "#3E2723",
      customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }
    }).then(() => {
      closeCanvas();
      // Jika bukan halaman terakhir, langsung lanjut ke halaman berikutnya
      if (currentPage < aksaraData.length - 1) {
        nextPage();
      } else {
        // Jika halaman terakhir, langsung ke beranda
        Swal.fire({
          icon: "success",
          title: "Mantepp!",
          html: "Sampeyan wis ngrampungake kabeh aksara Legena!",
          confirmButtonText: "Lanjut →",
          confirmButtonColor: "#3E2723",
          customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" }
        }).then(() => {
          window.location.href = "beranda.html";
        });
      }
    });
  }
};

renderBook();