import "./peta.css";

export const candiData = {
  brahu: {
    title: "Candi Brahu",
    img: "/assets/candi-brahu.png",
    imgSoal: "",
    lokasi: "Candi Brahu, Trowulan",
    desc: "Candi Brahu dumunung ing tlatah Trowulan. Bangunane kagawe saka tatanan bata abang lan diprakirakake fungsine minangka papan suci keagamaan.",
    q1: "Candi Brahu dumunung ing tlatah?",
    a1: ["trowulan", "ꦠ꧀ꦫꦺꦴꦮꦸꦭꦤ꧀"],
    q2: "Bangunane kagawe saka tatanan watu?",
    a2: ["bata abang", "ꦧꦠ ꦲꦧꦤ꧀ꦒ꧀"],
  },
  bajang: {
    title: "Candi Bajang Ratu",
    img: "/assets/candi-bajang.png",
    imgSoal: "",
    lokasi: "Candi Bajang Ratu, Trowulan",
    desc: "Candi Bajang Ratu minangka gapura paduraksa mawa atap tilaran jaman Majapahit. Bangunan iki kagawe saka bata abang sing ditata rapet tanpa semen.",
    q1: "Candi Bajang Ratu minangka wujud gapura?",
    a1: ["paduraksa", "ꦥꦢꦸꦫꦏ꧀ꦱ"],
    q2: "Bangunan iki kagawe saka watu?",
    a2: ["bata abang", "ꦧꦠ ꦲꦧꦤ꧀ꦒ꧀"],
  },
  tikus: {
    title: "Candi Tikus",
    img: "/assets/candi-tikus.png",
    imgSoal: "",
    lokasi: "Candi Tikus, Trowulan",
    desc: "Candi Tikus minangka situs patirtan suci sing wujude miniatur gunung. Nalika sepisanan ditemokake, situs iki kakubur ing ngisor lemah.",
    q1: "Candi Tikus minangka wujud situs?",
    a1: ["patirtan", "ꦥꦠꦶꦂꦠꦤ꧀"],
    q2: "Nalika sepisanan ditemokake, situs iki kakubur ing ngisor?",
    a2: ["lemah", "ꦭꦺꦩꦃ"],
  },
  gentong: {
    title: "Candi Gentong",
    img: "/assets/candi-gentong.png",
    imgSoal: "",
    lokasi: "Candi Gentong, Trowulan",
    desc: "Candi Gentong manggon cedhak banget karo Candi Brahu. Situs iki dijenengi mangkono amarga akeh ditemokake pecahan gentong ing sakiwa-tengene.",
    q1: "Situs iki manggon cedhak banget karo Candi?",
    a1: ["brahu", "ꦧ꧀ꦫꦲꦸ"],
    q2: "Dijenengi mangkono amarga akeh ditemokake pecahan?",
    a2: ["gentong", "ꦒꦺꦤ꧀ꦠꦺꦴꦤ꧀ꦒ꧀"],
  },
  minakjinggo: {
    title: "Candi Minak Jinggo",
    img: "/assets/candi-minakjinggo.png",
    imgSoal: "",
    lokasi: "Candi Minak Jinggo, Trowulan",
    desc: "Candi iki unik amarga dadi siji-sijine bangunan ing Trowulan sing nganggo hiasan saka watu andesit, dudu mung bata abang biasa.",
    q1: "Candi iki unik amarga nganggo hiasan saka watu?",
    a1: ["andesit", "ꦲꦤ꧀ꦢꦺꦱꦶꦠ꧀"],
    q2: "Bangunan liyane ing Trowulan lumrahe nganggo bata?",
    a2: ["abang", "ꦲꦧꦤ꧀ꦒ꧀"],
  },
  wringinlawang: {
    title: "Candi Wringin Lawang",
    img: "/assets/candi-wringinlawang.png",
    imgSoal: "",
    lokasi: "Candi Wringin Lawang, Trowulan",
    desc: "Candi Wringin Lawang minangka gapura bentar utawa gerbang sing melah. Ing basa Jawa, jeneng Wringin Lawang nduweni teges lawang wringin.",
    q1: "Candi Wringin Lawang minangka wujud gapura?",
    a1: ["bentar", "ꦧꦼꦤ꧀ꦠꦂ"],
    q2: "Ing basa Jawa, jeneng iku nduweni teges lawang?",
    a2: ["wringin", "ꦮ꧀ꦫꦶꦤ꧀ꦒꦶꦤ꧀"],
  },
  jedong: {
    title: "Candi Jedong",
    img: "/assets/candi-jedong.png",
    imgSoal: "",
    lokasi: "Candi Jedong, Ngoro",
    desc: "Candi Jedong wujude bangunan gapura sing dumunung ing lereng Gunung Penanggungan. Bangunan iki dipercaya minangka lawang mlebu menyang desa perdikan.",
    q1: "Candi Jedong dumunung ing lereng Gunung?",
    a1: ["penanggungan", "ꦥꦼꦤꦁꦒꦸꦔꦤ꧀"],
    q2: "Candi iki wujude minangka bangunan?",
    a2: ["gapura", "ꦒꦥꦸꦫ"],
  },
  kedaton: {
    title: "Candi Kedaton",
    img: "/assets/candi-kedaton.png",
    imgSoal: "",
    lokasi: "Candi Kedaton, Trowulan",
    desc: "Situs Kedaton dipercaya minangka bekas keraton utawa papan dununge para bangsawan. Ing papan iki akeh ditemokake sumur kuna lan sisa lantai bata.",
    q1: "Situs Kedaton dipercaya minangka bekas papan dununge bangsawan utawa?",
    a1: ["keraton", "ꦏꦺꦫꦠꦺꦴꦤ꧀"],
    q2: "Ing papan iki akeh ditemokake sumur kuna lan sisa?",
    a2: ["lantai", "ꦭꦤ꧀ꦠꦻ"],
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
const userProgress = {};
for (let key in candiData) {
  userProgress[key] = {
    ans1: "",
    ans2: "",
    q1State: "none",
    q2State: "none",
    attempts: 0,
    status: "none",
  };
}

window.openQuiz = (id) => {
  currentCandiId = id;
  const data = candiData[id];
  const prog = userProgress[id];

  document.getElementById("book-title").innerText = data.title;
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
};

window.closeQuiz = () => {
  // Simpan ketikan yang belum di-cek saat buku ditutup
  if (currentCandiId) {
    userProgress[currentCandiId].ans1 = document.getElementById("ans1").value;
    userProgress[currentCandiId].ans2 = document.getElementById("ans2").value;
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
    checkFinishAll();
  } else if (prog.q1State === "wrong" || prog.q2State === "wrong") {
    prog.status = "error";
    prog.attempts += 1;
    updateCandiGlow(id, "error");

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
          updateCandiGlow(id, "none"); // Matikan lampu merah
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
    feedback.innerText = "Jawaban Benar! ✅";
    feedback.classList.add("feedback-correct");
    input.classList.add("border-green-500", "bg-green-50");
  } else if (state === "wrong") {
    feedback.innerText = "Jawaban Salah! ❌";
    feedback.classList.add("feedback-wrong");
    input.classList.add("border-red-500", "bg-red-50");
  } else if (state === "empty") {
    feedback.innerText = "Sek Kosong! ⚠️";
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

    setTimeout(() => {
      document.getElementById("popup-book").classList.add("hidden");
      Swal.fire({
        title: "Luar Biasa!",
        html: `Misi wis rampung! Kabeh teka-teki candhi wis ditanggulangi<br><br><b>Skor Final Panjenengan: <span style="font-size: 2.5em; color: #166534; display: block; margin-top: 10px;">${score}</span></b>`,
        confirmButtonText: "Dolan Maneh?",
        allowOutsideClick: false,
        // Ini yang bikin modalnya jadi kertas abstrak kuno!
        customClass: {
          popup: "swal-paper",
          title: "swal-paper-title",
          confirmButton: "swal-paper-confirm",
        },
      }).then(() => {
        location.reload();
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