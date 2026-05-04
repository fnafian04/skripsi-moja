import "./peta.css";

window.openIntroCover = () => {
  const wrapper = document.getElementById("intro-book-wrapper");
  const frontCover = document.getElementById("intro-front-cover");
  const introCover = document.getElementById("map-cover-intro");
  
  if(wrapper && frontCover && introCover) {
    // 1. Hanya buka sampul depannya saja seperti membuka kotak/cover
    // Biarkan wrapper (halaman tebalnya) tetap pada posisi tilt aslinya tanpa bergerak sedikitpun
    frontCover.style.transform = "rotateY(-120deg) translateZ(2px)";
    
    // 2. Tunggu sebentar agar user melihat isinya, lalu zoom in ke peta
    setTimeout(() => {
      // Zoom in menembus ke dalam halaman sambil mempertahankan tilt 3D-nya
      wrapper.style.transform = "rotateY(15deg) rotateX(10deg) scale(15)";
      wrapper.style.opacity = "0";
      introCover.style.opacity = "0";
      introCover.style.pointerEvents = "none";
      
      setTimeout(() => {
        introCover.classList.add("hidden");
        
        // Tampilkan Peta Dora
        const doraMap = document.getElementById("dora-map-overlay");
        const doraContent = document.getElementById("dora-map-content");
        if(doraMap && doraContent) {
          doraMap.classList.remove("hidden");
          // Trigger reflow
          void doraMap.offsetWidth;
          doraMap.classList.remove("opacity-0");
          doraContent.classList.remove("scale-0", "translate-y-20");
          doraContent.classList.add("scale-100", "translate-y-0");
        }
      }, 1500);
    }, 1200);
  }
};

window.closeDoraMap = () => {
  const doraMap = document.getElementById("dora-map-overlay");
  const doraContent = document.getElementById("dora-map-content");
  if(doraMap && doraContent) {
    doraContent.classList.remove("scale-100", "translate-y-0");
    doraContent.classList.add("scale-150", "translate-y-20", "opacity-0"); // Zoom in effect
    doraMap.classList.add("opacity-0");
    
    setTimeout(() => {
      doraMap.classList.add("hidden");
    }, 800);
  }
};

export const candiData = {
  brahu: {
    title: "Candi Brahu",
    img: "/assets/candi-brahu.png",
    imgSoal: "",
    lokasi: "Candi Brahu, Trowulan",
    desc: "Candi Brahu dumunung ing tlatah Trowulan. Bangunane kagawe saka tatanan bata abang lan diprakirakake fungsine minangka papan suci keagamaan.",
    q1: "Bangunane digawe saka apa?",
    a1: ["bata", "ꦧꦠ"],
    q2: "Werna batane apa?",
    a2: ["abang", "ꦄꦧꦁ"],
  },
  bajang: {
    title: "Candi Bajang Ratu",
    img: "/assets/candi-bajang.png",
    imgSoal: "",
    lokasi: "Candi Bajang Ratu, Trowulan",
    desc: "Candi Bajang Ratu minangka gapura paduraksa mawa atap tilaran jaman Majapahit. Bangunan iki kagawe saka bata abang sing ditata rapet tanpa semen.",
    q1: "Bajang Ratu iku bangunan apa?",
    a1: ["gapura", "ꦒꦥꦸꦫ"],
    q2: "Bangunan iki saka apa?",
    a2: ["bata", "ꦧꦠ"],
  },
  tikus: {
    title: "Candi Tikus",
    img: "/assets/candi-tikus.png",
    imgSoal: "",
    lokasi: "Candi Tikus, Trowulan",
    desc: "Candi Tikus minangka situs patirtan suci sing wujude miniatur gunung. Nalika sepisanan ditemokake, situs iki kakubur ing ngisor lemah.",
    q1: "Candi Tikus iku situs apa?",
    a1: ["patirtan", "ꦥꦠꦶꦂꦠꦤ"],
    q2: "Nalika ditemokake, ana ing ngendi?",
    a2: ["lemah", "ꦭꦼꦩꦃ"],
  },
  gentong: {
    title: "Candi Gentong",
    img: "/assets/candi-gentong.png",
    imgSoal: "",
    lokasi: "Candi Gentong, Trowulan",
    desc: "Candi Gentong manggon cedhak banget karo Candi Brahu. Situs iki dijenengi mangkono amarga akeh ditemokake pecahan gentong ing sakiwa-tengene.",
    q1: "Candi Gentong cedhak karo candi apa?",
    a1: ["brahu", "ꦧꦿꦲꦸ"],
    q2: "Jeneng \"Gentong\" dijupuk saka apa?",
    a2: ["gentong", "ꦒꦺꦤ꧀ꦠꦺꦴꦁ"],
  },
  minakjinggo: {
    title: "Candi Minak Jinggo",
    img: "/assets/candi-minakjinggo.png",
    imgSoal: "",
    lokasi: "Candi Minak Jinggo, Trowulan",
    desc: "Candi iki unik amarga dadi siji-sijine bangunan ing Trowulan sing nganggo hiasan saka watu andesit, dudu mung bata abang biasa.",
    q1: "Hiasane digawe saka apa?",
    a1: ["watu", "ꦮꦠꦸ"],
    q2: "Dudu saka bahan apa?",
    a2: ["bata", "ꦧꦠ"],
  },
  wringinlawang: {
    title: "Candi Wringin Lawang",
    img: "/assets/candi-wringinlawang.png",
    imgSoal: "",
    lokasi: "Candi Wringin Lawang, Trowulan",
    desc: "Candi Wringin Lawang minangka gapura bentar utawa gerbang sing melah. Ing basa Jawa, jeneng Wringin Lawang nduweni teges lawang wringin.",
    q1: "Wringin Lawang iku bangunan apa?",
    a1: ["gapura", "ꦒꦥꦸꦫ"],
    q2: "Wringin Lawang uga diarani apa?",
    a2: ["gerbang", "ꦒꦺꦫ꧀ꦧꦁ"],
  },
  jedong: {
    title: "Candi Jedong",
    img: "/assets/candi-jedong.png",
    imgSoal: "",
    lokasi: "Candi Jedong, Ngoro",
    desc: "Candi Jedong wujude bangunan gapura sing dumunung ing lereng Gunung Penanggungan. Bangunan iki dipercaya minangka lawang mlebu menyang desa perdikan.",
    q1: "Candi Jedong wujude apa?",
    a1: ["gapura", "ꦒꦥꦸꦫ"],
    q2: "Dumunung ing ngendi?",
    a2: ["gunung", "ꦒꦸꦤꦸꦁ"],
  },
  kedaton: {
    title: "Candi Kedaton",
    img: "/assets/candi-kedaton.png",
    imgSoal: "",
    lokasi: "Candi Kedaton, Trowulan",
    desc: "Situs Kedaton dipercaya minangka bekas keraton utawa papan dununge para bangsawan. Ing papan iki akeh ditemokake sumur kuna lan sisa lantai bata.",
    q1: "Panggonané kanggo sapa?",
    a1: ["bangsawan", "ꦧꦁꦱꦮꦤ"],
    q2: "Ing kono akeh ditemokake apa?",
    a2: ["sumur", "ꦱꦸꦩꦸꦂ"],
  },
};

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

// ==========================================
// SISTEM KUIS ULTIMATE (Simpan State & Modal Abstrak)
// ==========================================
let currentCandiId = null;

// Menyimpan progres: jawaban, status tiap soal (none/empty/correct/wrong), jumlah salah, status candi
const PROGRESS_KEY = 'pasinaon_progress';
const userProgress = {};

// Init: coba load dari sessionStorage dulu (reset otomatis saat browser ditutup)
const savedProgress = sessionStorage.getItem(PROGRESS_KEY);
if (savedProgress) {
  const parsed = JSON.parse(savedProgress);
  for (let key in candiData) {
    userProgress[key] = parsed[key] ?? { ans1: "", ans2: "", q1State: "none", q2State: "none", attempts: 0, status: "none" };
  }
} else {
  for (let key in candiData) {
    userProgress[key] = { ans1: "", ans2: "", q1State: "none", q2State: "none", attempts: 0, status: "none" };
  }
}

function saveProgress() {
  sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(userProgress));
}

// Restore glow visual candi setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  for (let key in userProgress) {
    if (userProgress[key].status === 'success') updateCandiGlow(key, 'success');
    else if (userProgress[key].status === 'error') updateCandiGlow(key, 'error');
  }

  // Tambahkan efek toel saat gambar candi di dalam buku diklik
  const bookImg = document.getElementById("book-img");
  if (bookImg) {
    bookImg.style.cursor = "pointer";
    bookImg.addEventListener("click", () => {
      const wrapper = bookImg.parentElement;
      wrapper.classList.remove("animate-duarr-1", "play-toel-wrapper");
      void wrapper.offsetWidth; // Trigger reflow agar animasi bisa diulang
      wrapper.classList.add("play-toel-wrapper");
    });
  }
});

window.openQuiz = (id) => {
  currentCandiId = id;
  const data = candiData[id];
  const prog = userProgress[id];

  const hotspot = document.querySelector(`.hotspot[data-id="${id}"]`);
  if (hotspot) {
    hotspot.classList.add("animate-toel");
    setTimeout(() => hotspot.classList.remove("animate-toel"), 300);
  }

  setTimeout(() => {
    const titleEl = document.getElementById("book-title");
    if (titleEl) titleEl.innerText = data.title;
    // Logika Pintar: Jika imgSoal ada isinya, pakai itu. Jika kosong, pinjam gambar ikon peta.
    document.getElementById("book-img").src = data.imgSoal ? data.imgSoal : data.img;
    document.getElementById("book-desc").innerText = data.desc;
    document.getElementById("book-lokasi").innerText = data.lokasi;
    document.getElementById("q1-text").innerText = "1. " + data.q1;
    document.getElementById("q2-text").innerText = "2. " + data.q2;

    // Kembalikan teks jawaban
    document.getElementById("ans1").value = prog.ans1;
    document.getElementById("ans2").value = prog.ans2;

    // Kembalikan status tooltips (Benar/Salah/Kosong)
    applyFeedbackState("ans1", "feedback1", prog.q1State);
    applyFeedbackState("ans2", "feedback2", prog.q2State);

    document.getElementById("popup-book").classList.remove("hidden");
  }, 250);
};

window.closeQuiz = () => {
  // Simpan ketikan yang belum di-cek saat buku ditutup
  if (currentCandiId) {
    userProgress[currentCandiId].ans1 = document.getElementById("ans1").value;
    userProgress[currentCandiId].ans2 = document.getElementById("ans2").value;
    saveProgress();
  }
  document.getElementById("popup-book").classList.add("hidden");
};

window.checkAllAnswers = () => {
  const id = currentCandiId;
  const data = candiData[id];
  const prog = userProgress[id];

  const v1 = document.getElementById("ans1").value.trim().toLowerCase();
  const v2 = document.getElementById("ans2").value.trim().toLowerCase();

  prog.ans1 = document.getElementById("ans1").value;
  prog.ans2 = document.getElementById("ans2").value;

  // FUNGSI PINTAR: Cek jawaban (Bisa baca format Array maupun Teks biasa)
  const validateAnswer = (input, answerData) => {
    if (input === "") return "empty";
    // Jika jawabannya ada 2 bahasa (Array)
    if (Array.isArray(answerData)) {
      return answerData.some((ans) => input.includes(ans.toLowerCase())) ? "correct" : "wrong";
    }
    // Jika jawabannya cuma teks biasa (String)
    return input.includes(answerData.toLowerCase()) ? "correct" : "wrong";
  };

  // Eksekusi validasi
  prog.q1State = validateAnswer(v1, data.a1);
  prog.q2State = validateAnswer(v2, data.a2);

  // Tampilkan Tooltips "Benar/Salah/Kosong"
  applyFeedbackState("ans1", "feedback1", prog.q1State);
  applyFeedbackState("ans2", "feedback2", prog.q2State);

  // Logika Cek Status Candi & Hitung Kesalahan
  if (prog.q1State === "correct" && prog.q2State === "correct") {
    prog.status = "success";
    updateCandiGlow(id, "success");
    saveProgress();
    checkFinishAll();
  } else if (prog.q1State === "wrong" || prog.q2State === "wrong") {
    prog.status = "error";
    prog.attempts += 1;
    updateCandiGlow(id, "error");
    saveProgress();

    if (prog.attempts >= 3) {
      setTimeout(() => {
        Swal.fire({
          icon: "warning",
          title: "Kesempatan pun Telas!",
          text: "Sampeyan wis 3 kali salah ing candhi iki, ayoo deleng katrangane alon2!",
          confirmButtonColor: "#3E2723",
          customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" },
        }).then(() => {
          prog.attempts = 0;
          prog.ans1 = "";
          prog.ans2 = "";
          prog.q1State = "none";
          prog.q2State = "none";
          document.getElementById("ans1").value = "";
          document.getElementById("ans2").value = "";
          applyFeedbackState("ans1", "feedback1", "none");
          applyFeedbackState("ans2", "feedback2", "none");
          updateCandiGlow(id, "none");
          saveProgress();
        });
      }, 500);
    }
  }
};

function applyFeedbackState(inputId, feedbackId, state) {
  const input = document.getElementById(inputId);
  const feedback = document.getElementById(feedbackId);

  // Bersihkan semua class
  feedback.classList.remove("feedback-correct", "feedback-wrong", "feedback-empty", "show");
  input.classList.remove("border-green-500", "border-red-500", "border-yellow-500", "bg-green-50", "bg-red-50", "bg-yellow-50");

  if (state === "none") return;

  feedback.classList.add("show");
  if (state === "correct") {
    feedback.innerText = "Wangsulan Bener! ✅";
    feedback.classList.add("feedback-correct");
    input.classList.add("border-green-500", "bg-green-50");
  } else if (state === "wrong") {
    feedback.innerText = "Wangsulan Salah! ❌";
    feedback.classList.add("feedback-wrong");
    input.classList.add("border-red-500", "bg-red-50");
  } else if (state === "empty") {
    feedback.innerText = "Isih Kosong! ⚠️";
    feedback.classList.add("feedback-empty");
    input.classList.add("border-yellow-500", "bg-yellow-50");
  }
}

function updateCandiGlow(id, status) {
  const hotspot = document.querySelector(`.hotspot[data-id="${id}"]`);
  if (!hotspot) return;
  hotspot.classList.remove("candi-error", "candi-success");
  if (status === "error") hotspot.classList.add("candi-error");
  if (status === "success") hotspot.classList.add("candi-success");
}

function checkFinishAll() {
  const total = Object.keys(candiData).length;
  const finished = Object.values(userProgress).filter((p) => p.status === "success").length;

  if (finished === total) {
    let totalKesalahan = 0;
    Object.values(userProgress).forEach((p) => (totalKesalahan += p.attempts));

    let score = 100 - totalKesalahan * 5;
    if (score < 20) score = 20;

    // Simpan status selesai ke sessionStorage agar sinkron dengan progress
    sessionStorage.setItem('completed_pasinaon', 'true');

    setTimeout(() => {
      document.getElementById("popup-book").classList.add("hidden");
      Swal.fire({
        title: "Luar Biasa!",
        html: `Misi wis rampung! Kabeh teka-teki candhi wis ditanggulangi<br><br><b>Skor Final Panjenengan: <span style="font-size: 2.5em; color: #166534; display: block; margin-top: 10px;">${score}</span></b>`,
        confirmButtonText: "Lanjut →",
        allowOutsideClick: false,
        customClass: {
          popup: "swal-paper",
          title: "swal-paper-title",
          confirmButton: "swal-paper-confirm",
        },
      }).then(() => {
        window.location.href = "beranda.html";
      });
    }, 1000);
  }
}

// ==========================================
// FITUR EDIT (GESER + UKURAN) - SUPER SMOOTH DRAG
// ==========================================
const btnEdit = document.getElementById("btn-edit");
const btnSave = document.getElementById("btn-save-json");
const btnScaleUp = document.getElementById("btn-scale-up");
const btnScaleDown = document.getElementById("btn-scale-down");

let isEditMode = false;
let activeHotspot = null; 
let isDragging = false; 

if (btnEdit && btnSave) {
  btnEdit.onclick = () => {
    isEditMode = !isEditMode;
    if (isEditMode) {
      btnEdit.innerHTML = "❌ Keluar Edit";
      btnEdit.classList.replace("bg-blue-600", "bg-red-600");
      btnSave.classList.remove("hidden");
      btnScaleUp.classList.remove("hidden");
      btnScaleDown.classList.remove("hidden");
      enableDrag();
      Swal.fire("Mode Edit Aktif! 🛠️", "1. Klik candi untuk memilihnya (glow merah).\n2. TAHAN lalu GESER posisinya.\n3. Pakai ➕/➖ untuk ubah ukuran.", "info");
    } else {
      btnEdit.innerHTML = "🛠️ Mode Edit Posisi";
      btnEdit.classList.replace("bg-red-600", "bg-blue-600");
      btnSave.classList.add("hidden");
      btnScaleUp.classList.add("hidden");
      btnScaleDown.classList.add("hidden");
      if (activeHotspot) activeHotspot.classList.remove("edit-active");
      activeHotspot = null;
      isDragging = false;
      disableDrag();
    }
  };

  btnScaleUp.onclick = () => scaleHotspot(5);
  btnScaleDown.onclick = () => scaleHotspot(-5);

  btnSave.onclick = () => {
    const hotspots = document.querySelectorAll(".hotspot");
    const result = {};
    hotspots.forEach((h) => {
      const id = h.getAttribute("data-id");
      const img = h.querySelector("img");
      if (id) {
        result[id] = {
          left: h.style.left,
          top: h.style.top,
          width: img.style.width || window.getComputedStyle(img).width,
        };
      }
    });
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    Swal.fire("JSON Disalin! 📋", "Koordinat berhasil di-copy, silakan paste di data candi-mu.", "success");
  };
}

function scaleHotspot(amount) {
  if (!activeHotspot) return Swal.fire("Pilih Candi Dulu!", "Klik candi yang mau diubah ukurannya.", "warning");
  const img = activeHotspot.querySelector("img");
  let currentWidth = parseInt(img.style.width || window.getComputedStyle(img).width);
  img.style.width = (currentWidth + amount) + "px";
}

// --- FUNGSI DRAG INTI ---
function enableDrag() {
  const hotspots = document.querySelectorAll(".hotspot");

  // Bersihkan event global sebelumnya biar gak numpuk
  document.removeEventListener("mousemove", handleMove);
  document.removeEventListener("touchmove", handleMove);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);

  hotspots.forEach((hotspot) => {
    hotspot.style.cursor = "move";
    
    // Matikan klik pop-up kuis sementara saat edit
    if (hotspot.getAttribute("onclick")) {
      hotspot.setAttribute("data-onclick", hotspot.getAttribute("onclick"));
      hotspot.removeAttribute("onclick");
    }

    // JURUS RAHASIA: Matikan fitur drag bawaan browser pada gambar!
    hotspot.ondragstart = () => false;

    // Aksi pas mulai ditahan (Mouse / Jari)
    const startDrag = (e) => {
      if (!isEditMode) return;
      if (activeHotspot) activeHotspot.classList.remove("edit-active");
      
      activeHotspot = hotspot;
      activeHotspot.classList.add("edit-active");
      isDragging = true;
    };

    hotspot.onmousedown = startDrag;
    hotspot.ontouchstart = startDrag;
  });

  // Pantau pergerakan (wajib pakai { passive: false } biar layar ga ikut ke-scroll pas di HP)
  document.addEventListener("mousemove", handleMove, { passive: false });
  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
}

function handleMove(e) {
  if (!isEditMode || !isDragging || !activeHotspot) return;
  
  // Cegah layar nge-scroll pas kita lagi asyik geser candi
  if (e.cancelable) e.preventDefault();

  const mapContainer = document.querySelector(".map-wrapper");
  const rect = mapContainer.getBoundingClientRect();

  // Deteksi ini mouse atau jari HP
  let clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let clientY = e.touches ? e.touches[0].clientY : e.clientY;

  // Hitung persentase posisi agar responsif
  let leftPct = ((clientX - rect.left) / rect.width) * 100;
  let topPct = ((clientY - rect.top) / rect.height) * 100;

  // Update posisi candi
  activeHotspot.style.left = Math.max(0, Math.min(100, leftPct)).toFixed(2) + "%";
  activeHotspot.style.top = Math.max(0, Math.min(100, topPct)).toFixed(2) + "%";
}

function stopDrag() {
  isDragging = false;
}

function disableDrag() {
  const hotspots = document.querySelectorAll(".hotspot");
  hotspots.forEach((hotspot) => {
    hotspot.style.cursor = "pointer";
    // Kembalikan klik pop-up kuis
    if (hotspot.hasAttribute("data-onclick")) {
      hotspot.setAttribute("onclick", hotspot.getAttribute("data-onclick"));
    }
    hotspot.onmousedown = null;
    hotspot.ontouchstart = null;
    hotspot.ondragstart = null;
  });

  document.removeEventListener("mousemove", handleMove);
  document.removeEventListener("touchmove", handleMove);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
}