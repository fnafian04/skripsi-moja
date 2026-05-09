import "./peta.css";
import { candiData } from "../../data/candi-data.js";

window.openIntroCover = () => {
  const wrapper = document.getElementById("intro-book-wrapper");
  const frontCover = document.getElementById("intro-front-cover");
  const introCover = document.getElementById("map-cover-intro");
  
  if(wrapper && frontCover && introCover) {
    // 1. Buka sampul depan
    frontCover.style.transform = "rotateY(-130deg) translateZ(2px)";
    
    // 2. Zoom moderat ke isi buku (peta di dalam)
    setTimeout(() => {
      // Bawa buku ke depan dan buat agak datar agar peta terlihat jelas
      wrapper.style.transform = "rotateY(0deg) rotateX(0deg) scale(1.5) translateY(5%)";
      
      setTimeout(() => {
        // 3. Tampilkan Peta Dora (Botol) di atas buku
        // Hilangkan background intro agar tidak numpuk
        introCover.style.backgroundColor = "transparent";
        introCover.style.pointerEvents = "none";
        
        const doraMap = document.getElementById("dora-map-overlay");
        const doraContent = document.getElementById("dora-map-content");
        if(doraMap && doraContent) {
          doraMap.classList.remove("hidden");
          void doraMap.offsetWidth;
          doraMap.classList.remove("opacity-0");
          doraContent.classList.remove("scale-0", "translate-y-20");
          doraContent.classList.add("scale-100", "translate-y-0");
        }
      }, 800);
    }, 1000);
  }
};

window.closeDoraMap = () => {
  const doraMap = document.getElementById("dora-map-overlay");
  const doraContent = document.getElementById("dora-map-content");
  const introCover = document.getElementById("map-cover-intro");
  const wrapper = document.getElementById("intro-book-wrapper");

  if(doraMap && doraContent) {
    // 1. Zoom in sangat besar pada botol peta seolah menembus ke dalamnya
    doraContent.style.transform = "scale(8) translateY(-10%)";
    doraContent.style.opacity = "0";
    doraMap.style.backgroundColor = "transparent";
    
    // Ikut zoom wrapper bukunya juga biar sinkron
    if(wrapper) {
      wrapper.style.transform = "scale(20)";
      wrapper.style.opacity = "0";
    }
    
    setTimeout(() => {
      doraMap.classList.add("hidden");
      if(introCover) introCover.classList.add("hidden");
      
      // 2. Munculkan Peta Utama & Hotspot dengan efek fade-in
      const mainWrapper = document.getElementById("main-map-wrapper");
      if(mainWrapper) {
        mainWrapper.classList.remove("opacity-0", "pointer-events-none");
        mainWrapper.classList.add("opacity-100");
      }
    }, 800);
  }
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
  let finishedCount = 0;
  for (let key in userProgress) {
    if (userProgress[key].status === 'success') {
      updateCandiGlow(key, 'success');
      finishedCount++;
    } else if (userProgress[key].status === 'error') {
      updateCandiGlow(key, 'error');
    } else if (userProgress[key].status === 'zonk') {
      updateCandiGlow(key, 'zonk');
      finishedCount++;
    }
  }

  const total = Object.keys(candiData).length;
  if (finishedCount === total) {
    const actionBtns = document.getElementById("finished-actions");
    if(actionBtns) actionBtns.style.display = 'flex';
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
          icon: "error",
          title: "Kesempatan Telas!",
          text: "Sampeyan wis 3 kali salah ing candhi iki, ayoo deleng katrangane alon-alon, iki wangsulan kang bener!",
          confirmButtonColor: "#03A9F4",
          customClass: { popup: "swal-paper", confirmButton: "swal-paper-confirm" },
        }).then(() => {
          let ans1Str = Array.isArray(data.a1) ? data.a1[1] || data.a1[0] : data.a1;
          let ans2Str = Array.isArray(data.a2) ? data.a2[1] || data.a2[0] : data.a2;
          
          prog.ans1 = ans1Str;
          prog.ans2 = ans2Str;
          prog.q1State = "correct";
          prog.q2State = "correct";
          prog.status = "zonk";
          
          document.getElementById("ans1").value = ans1Str;
          document.getElementById("ans2").value = ans2Str;
          applyFeedbackState("ans1", "feedback1", "correct");
          applyFeedbackState("ans2", "feedback2", "correct");
          
          updateCandiGlow(id, "zonk");
          saveProgress();
          checkFinishAll();
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
  hotspot.classList.remove("candi-error", "candi-success", "candi-zonk");
  if (status === "error") hotspot.classList.add("candi-error");
  if (status === "success") hotspot.classList.add("candi-success");
  if (status === "zonk") hotspot.classList.add("candi-zonk");
}

function checkFinishAll() {
  const total = Object.keys(candiData).length;
  const finished = Object.values(userProgress).filter((p) => p.status === "success" || p.status === "zonk").length;

  if (finished === total) {
    let score = 0;
    Object.values(userProgress).forEach((p) => {
      if (p.status === "success") {
        score += (100 / total); // 12.5 points per success
      }
    });
    score = Math.round(score);
    if (score < 0) score = 0;

    // Show floating button block
    const actionBtns = document.getElementById("finished-actions");
    if(actionBtns) actionBtns.style.display = 'flex';

    sessionStorage.setItem('completed_pasinaon', 'true');

    setTimeout(() => {
      document.getElementById("popup-book").classList.add("hidden");
      showFinalResultModal(score);
    }, 1000);
  }
}

window.showFinalResult = () => {
  let score = 0;
  const total = Object.keys(candiData).length;
  Object.values(userProgress).forEach((p) => {
    if (p.status === "success") {
      score += (100 / total);
    }
  });
  score = Math.round(score);
  showFinalResultModal(score);
};

window.showFinalResultModal = (score) => {
  let msg;
  if (score >= 70) {
    msg = { icon: "success", title: "Luar Biasa!", text: "Misi wis rampung! Sampeyan pancen pinter ngerjakake kabeh teka-teki candhi iki" };
  } else if (score >= 50) {
    msg = { icon: "info", title: "Sae!", text: "Misi wis rampung, ananging taksih ana sawetara wangsulan sing kurang pas, ayo sinau maneh!" };
  } else if (score >= 25) {
    msg = { icon: "warning", title: "Kudu Sregep Sinau!", text: "Biji panjenengan isih kurang, coba sinau aksara Jawa maneh kanthi luwih tliti" };
  } else if (score > 0) {
    msg = { icon: "error", title: "Aduh, Kirang Pas!", text: "Akeh wangsulan sing luput, ojo nyerah, ayo waca maneh panjelasan saben candhi!" };
  } else {
    msg = { icon: "error", title: "Aduh, Coba Maneh!", text: "Kabeh wangsulan isih luput, ora apa-apa, ayo dicoba maneh saka awal ben luwih paham!" };
  }
  
  let color = score >= 50 ? "#166534" : "#d32f2f";

  Swal.fire({
    icon: msg.icon,
    title: msg.title,
    html: `${msg.text}<br><br><b>Skor Final Panjenengan: <span style="font-size: 2.5em; color: ${color}; display: block; margin-top: 10px;">${score}</span></b>`,
    confirmButtonText: "Tutup",
    allowOutsideClick: false,
    customClass: {
      popup: "swal-paper",
      title: "swal-paper-title",
      confirmButton: "swal-paper-confirm",
    },
  });
};

window.restartGame = () => {
  Swal.fire({
    title: "Apa panjenengan yakin?",
    text: "Menapa panjenengan saestu badhe mbaleni kuis iki? Kabeh wangsulan lan biji panjenengan bakal dibusak",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Nggih, Baleni!",
    cancelButtonText: "Batal",
    customClass: {
      popup: "swal-paper",
      title: "swal-paper-title",
    }
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem(PROGRESS_KEY);
      sessionStorage.removeItem('completed_pasinaon');
      location.reload();
    }
  });
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