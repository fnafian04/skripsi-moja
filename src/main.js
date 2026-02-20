import "./style.css";

const candiData = {
  brahu: {
    title: "Candi Brahu",
    img: "/assets/candi-brahu.png",
    lokasi: "Trowulan, Jawa Timur",

    desc: "Candi Brahu dibangun pada abad ke-10, peninggalan Kerajaan Majapahit yang digunakan sebagai tempat upacara keagamaan.",

    q1: "Candi Brahu terletak di?",
    a1: "trowulan",

    q2: "Peninggalan kerajaan apa?",
    a2: "majapahit",
  },

  bajang: {
    title: "Candi Bajang Ratu",
    img: "/assets/candi-bajang.png",
    lokasi: "Trowulan, Mojokerto",

    desc: "Gapura Bajang Ratu adalah pintu gerbang megah peninggalan Majapahit yang masih kokoh berdiri.",

    q1: "Bajang Ratu adalah sebuah?",
    a1: "gapura",

    q2: "Bahan utamanya adalah?",
    a2: "batu bata",
  },

  tikus: {
    title: "Candi Tikus",
    img: "/assets/candi-tikus.png",
    lokasi: "Trowulan, Jawa Timur",

    desc: "Candi Tikus merupakan situs petirtaan atau pemandian kuno yang berbentuk miniatur gunung.",

    q1: "Candi Tikus berfungsi sebagai?",
    a1: "petirtaan",

    q2: "Ditemukan di dalam?",
    a2: "tanah",
  },

  gentong: {
    title: "Candi Gentong",
    img: "/assets/candi-gentong.png",
    lokasi: "Trowulan, Mojokerto",

    desc: "Candi ini dinamakan Gentong karena saat ditemukan banyak terdapat fragmen gentong di sekitarnya.",

    q1: "Terletak dekat dengan Candi?",
    a1: "brahu",

    q2: "Peninggalan abad ke-?",
    a2: "14",
  },

  minakjinggo: {
    title: "Candi Minak Jinggo",
    img: "/assets/candi-minakjinggo.png",
    lokasi: "Trowulan, Jawa Timur",

    desc: "Satu-satunya candi di Trowulan yang menggunakan kombinasi batu andesit dan bata merah.",

    q1: "Terbuat dari batu?",
    a1: "andesit",

    q2: "Tokoh legendanya adalah?",
    a2: "minak jinggo",
  },

  wringinlawang: {
    title: "Candi Wringin Lawang",
    img: "/assets/candi-wringinlawang.png",
    lokasi: "Trowulan, Jawa Timur",

    desc: "Gapura Wringin Lawang diyakini sebagai pintu masuk utama menuju ibu kota Kerajaan Majapahit.",

    q1: "Artinya dalam bahasa Indonesia?",
    a1: "pintu beringin",

    q2: "Bertipe gapura?",
    a2: "bentar",
  },

  jedong: {
    title: "Candi Jedong",
    img: "/assets/candi-jedong.png",
    lokasi: "Ngoro, Mojokerto",

    desc: "Candi Jedong berupa dua buah gapura paduraksa yang terletak di lereng Gunung Penanggungan.",

    q1: "Terletak di lereng gunung?",
    a1: "penanggungan",

    q2: "Berbentuk bangunan?",
    a2: "gapura",
  },

  kedaton: {
    title: "Candi Kedaton",
    img: "/assets/candi-kedaton.png",
    lokasi: "Trowulan, Jawa Timur",

    desc: "Situs Kedaton diduga merupakan kompleks pemukiman bangsawan atau istana pada masa Majapahit.",

    q1: "Kedaton artinya tempat?",
    a1: "raja",

    q2: "Banyak ditemukan sisa?",
    a2: "lantai",
  },
};

let currentCandiId = null;

// Sidebar Logic
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");

if (hamburger) {
  hamburger.onclick = () => {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  };
}
if (overlay)
  overlay.onclick = () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  };

// Quiz Logic
window.openQuiz = (id) => {
  currentCandiId = id;
  const data = candiData[id];
  document.getElementById("book-title").innerText = data.title;
  document.getElementById("book-img").src = data.img;
  document.getElementById("book-desc").innerText = data.desc;
  document.getElementById("book-lokasi").innerText = data.lokasi;
  document.getElementById("q1-text").innerText = "1. " + data.q1;
  document.getElementById("q2-text").innerText = "2. " + data.q2;
  document.getElementById("popup-book").classList.remove("hidden");
};

window.closeQuiz = () => {
  document.getElementById("popup-book").classList.add("hidden");
  resetForm("ans1");
  resetForm("ans2");
};

window.checkAllAnswers = () => {
  const data = candiData[currentCandiId];
  validate("ans1", data.a1);
  validate("ans2", data.a2);
};

function validate(id, correct) {
  const el = document.getElementById(id);
  if (el.value.toLowerCase().includes(correct)) {
    el.className = "w-full p-3 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 font-bold";
  } else {
    el.className = "w-full p-3 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 font-bold";
    Swal.fire({ icon: "error", title: "Jawaban Salah! ❌", toast: true, position: "top-end", showConfirmButton: false, timer: 1500 });
  }
}

function resetForm(id) {
  const el = document.getElementById(id);
  el.value = "";
  el.className = "w-full p-3 rounded-xl border-2 border-gray-300 bg-white";
}

// ==========================================
// FITUR EDIT (GESER + UKURAN) - FIX DRAG
// ==========================================
const btnEdit = document.getElementById('btn-edit');
const btnSave = document.getElementById('btn-save-json');
const btnScaleUp = document.getElementById('btn-scale-up');
const btnScaleDown = document.getElementById('btn-scale-down');

let isEditMode = false;
let activeHotspot = null; // Candi yang dipilih (buat di-resize)
let isDragging = false;   // Status apakah sedang ditahan/digeser

if (btnEdit && btnSave) {
  btnEdit.onclick = () => {
    isEditMode = !isEditMode;
    if (isEditMode) {
      btnEdit.innerText = "❌ Keluar Edit";
      btnEdit.classList.replace('bg-blue-600', 'bg-red-600');
      btnSave.classList.remove('hidden');
      btnScaleUp.classList.remove('hidden');
      btnScaleDown.classList.remove('hidden');
      enableDrag();
      Swal.fire('Mode Edit Aktif!', '1. Klik candi untuk memilihnya (menyala merah).\n2. Tahan dan geser posisinya.\n3. Pakai ➕ / ➖ untuk ubah ukuran.', 'info');
    } else {
      btnEdit.innerText = "🛠️ Mode Edit";
      btnEdit.classList.replace('bg-red-600', 'bg-blue-600');
      btnSave.classList.add('hidden');
      btnScaleUp.classList.add('hidden');
      btnScaleDown.classList.add('hidden');
      if (activeHotspot) activeHotspot.classList.remove('edit-active');
      activeHotspot = null;
      isDragging = false;
      disableDrag();
    }
  };

  btnScaleUp.onclick = () => scaleHotspot(5);
  btnScaleDown.onclick = () => scaleHotspot(-5);

  btnSave.onclick = () => {
    const hotspots = document.querySelectorAll('.hotspot');
    const result = {};
    hotspots.forEach(h => {
      const id = h.getAttribute('data-id');
      const img = h.querySelector('img');
      if (id) {
        result[id] = { 
          left: h.style.left, 
          top: h.style.top,
          width: img.style.width || window.getComputedStyle(img).width
        };
      }
    });
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    Swal.fire('JSON Disalin! 📋', 'Paste hasilnya di chat AI.', 'success');
  };
}

function scaleHotspot(amount) {
  if (!activeHotspot) return Swal.fire('Pilih Candi Dulu!', 'Klik salah satu candi yang mau diubah ukurannya.', 'warning');
  const img = activeHotspot.querySelector('img');
  let currentWidth = parseInt(img.style.width || window.getComputedStyle(img).width);
  img.style.width = (currentWidth + amount) + 'px';
}

function enableDrag() {
  const mapContainer = document.querySelector('.map-image').parentElement;
  const hotspots = document.querySelectorAll('.hotspot');
  
  hotspots.forEach(hotspot => {
    hotspot.style.cursor = 'move';
    if (hotspot.getAttribute('onclick')) {
      hotspot.setAttribute('data-onclick', hotspot.getAttribute('onclick'));
      hotspot.removeAttribute('onclick');
    }

    const startDrag = (e) => {
      if (!isEditMode) return;
      if (activeHotspot) activeHotspot.classList.remove('edit-active');
      
      activeHotspot = hotspot;
      activeHotspot.classList.add('edit-active'); 
      isDragging = true; // TANDAI MULAI DITARIK
      
      if(e.cancelable) e.preventDefault(); 
    };

    hotspot.onmousedown = startDrag;
    hotspot.ontouchstart = startDrag;
  });

  const doDrag = (e) => {
    // HANYA GESER KALAU isDragging TRUE
    if (!isEditMode || !isDragging || !activeHotspot) return;
    e.preventDefault();
    
    const rect = mapContainer.getBoundingClientRect();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let leftPct = ((clientX - rect.left) / rect.width) * 100;
    let topPct = ((clientY - rect.top) / rect.height) * 100;

    activeHotspot.style.left = Math.max(0, Math.min(100, leftPct)).toFixed(2) + '%';
    activeHotspot.style.top = Math.max(0, Math.min(100, topPct)).toFixed(2) + '%';
  };

  const stopDrag = () => {
    isDragging = false; // BERHENTI DITARIK SAAT DILEPAS
  };

  document.onmousemove = doDrag;
  document.ontouchmove = doDrag;
  document.onmouseup = stopDrag;
  document.ontouchend = stopDrag;
}

function disableDrag() {
  const hotspots = document.querySelectorAll('.hotspot');
  hotspots.forEach(hotspot => {
    hotspot.style.cursor = 'pointer';
    if (hotspot.hasAttribute('data-onclick')) {
      hotspot.setAttribute('onclick', hotspot.getAttribute('data-onclick'));
    }
    hotspot.onmousedown = null;
    hotspot.ontouchstart = null;
  });
  document.onmousemove = null;
  document.ontouchmove = null;
  document.onmouseup = null;
  document.ontouchend = null;
}