import "./style.css";

export const candiData = {
  brahu: {
    title: "Candi Brahu",
    img: "/assets/candi-brahu.png",
    imgSoal: "",
    lokasi: "Candi Brahu, Trowulan",
    desc: "Candi Brahu terletak di kawasan Trowulan. Bangunannya terbuat dari susunan batu bata merah dan diperkirakan berfungsi sebagai tempat suci keagamaan.",
    q1: "Candi Brahu terletak di kawasan?",
    a1: ["trowulan", "ꦠꦿꦺꦴꦮꦸꦭꦤ꧀"],
    q2: "Bangunannya terbuat dari batu?",
    a2: ["bata merah", "ꦧꦠꦩꦺꦫꦃ"],
  },
  bajang: {
    title: "Candi Bajang Ratu",
    img: "/assets/candi-bajang.png",
    imgSoal: "",
    lokasi: "Candi Bajang Ratu, Trowulan",
    desc: "Candi Bajang Ratu adalah sebuah gapura paduraksa beratap peninggalan Majapahit. Bangunan ini terbuat dari batu bata merah yang disusun rapat tanpa semen.",
    q1: "Candi Bajang Ratu adalah sebuah gapura?",
    a1: ["paduraksa", "ꦥꦢꦸꦫꦏ꧀ꦱ"],
    q2: "Bangunan ini terbuat dari batu?",
    a2: ["bata merah", "ꦧꦠꦩꦺꦫꦃ"],
  },
  tikus: {
    title: "Candi Tikus",
    img: "/assets/candi-tikus.png",
    imgSoal: "",
    lokasi: "Candi Tikus, Trowulan",
    desc: "Candi Tikus merupakan sebuah situs pemandian suci berbentuk miniatur gunung. Saat awal ditemukan, situs ini terkubur di bawah tanah.",
    q1: "Candi Tikus merupakan sebuah situs?",
    a1: ["pemandian", "ꦥꦼꦩꦤ꧀ꦢꦶꦪꦤ꧀"],
    q2: "Saat awal ditemukan, situs ini terkubur di bawah?",
    a2: ["tanah", "ꦠꦤꦃ"],
  },
  gentong: {
    title: "Candi Gentong",
    img: "/assets/candi-gentong.png",
    imgSoal: "",
    lokasi: "Candi Gentong, Trowulan",
    desc: "Candi Gentong terletak sangat berdekatan dengan Candi Brahu. Situs ini dinamakan demikian karena banyak ditemukan pecahan gentong di sekitarnya.",
    q1: "Situs ini sangat berdekatan dengan Candi?",
    a1: ["brahu", "ꦧꦿꦲꦸ"],
    q2: "Dinamakan demikian karena banyak ditemukan pecahan?",
    a2: ["gentong", "ꦒꦼꦤ꧀ꦠꦺꦴꦁ"],
  },
  minakjinggo: {
    title: "Candi Minak Jinggo",
    img: "/assets/candi-minakjinggo.png",
    imgSoal: "",
    lokasi: "Candi Minak Jinggo, Trowulan",
    desc: "Candi ini unik karena menjadi satu-satunya bangunan di Trowulan yang menggunakan hiasan dari batu andesit, bukan sekadar bata merah biasa.",
    q1: "Candi ini unik karena menggunakan hiasan dari batu?",
    a1: ["andesit", "ꦲꦤ꧀ꦢꦺꦱꦶꦠ꧀"],
    q2: "Bangunan lain di Trowulan umumnya memakai bata?",
    a2: ["merah", "ꦩꦺꦫꦃ"],
  },
  wringinlawang: {
    title: "Candi Wringin Lawang",
    img: "/assets/candi-wringinlawang.png",
    imgSoal: "",
    lokasi: "Candi Wringin Lawang, Trowulan",
    desc: "Candi Wringin Lawang adalah sebuah gapura bentar atau gerbang terbelah. Dalam bahasa Jawa, nama Wringin Lawang memiliki arti pintu beringin.",
    q1: "Candi Wringin Lawang adalah sebuah gapura?",
    a1: ["bentar", "ꦧꦼꦤ꧀ꦠꦂ"],
    q2: "Dalam bahasa Jawa, artinya adalah pintu?",
    a2: ["beringin", "ꦧꦼꦫꦶꦔꦶꦤ꧀"],
  },
  jedong: {
    title: "Candi Jedong",
    img: "/assets/candi-jedong.png",
    imgSoal: "",
    lokasi: "Candi Jedong, Ngoro",
    desc: "Candi Jedong berupa bangunan gapura yang terletak di lereng Gunung Penanggungan. Bangunan ini dipercaya sebagai pintu masuk ke desa perdikan.",
    q1: "Candi Jedong terletak di lereng Gunung?",
    a1: ["penanggungan", "ꦥꦼꦤꦁꦒꦸꦔꦤ꧀"],
    q2: "Candi ini berupa bangunan?",
    a2: ["gapura", "ꦒꦥꦸꦫ"],
  },
  kedaton: {
    title: "Candi Kedaton",
    img: "/assets/candi-kedaton.png",
    imgSoal: "",
    lokasi: "Candi Kedaton, Trowulan",
    desc: "Situs Kedaton dipercaya sebagai bekas istana atau kediaman para bangsawan. Di lokasi ini banyak ditemukan sumur kuno dan sisa lantai bata.",
    q1: "Situs Kedaton dipercaya sebagai bekas kediaman bangsawan atau?",
    a1: ["istana", "ꦲꦶꦱ꧀ꦠꦤ"],
    q2: "Di lokasi ini banyak ditemukan sumur kuno dan sisa?",
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
          title: "Kesempatan Habis!",
          text: "Kamu sudah salah 3 kali di candi ini, ayoo baca lagi deskripsinya!",
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
    feedback.innerText = "Benar! ✅";
    feedback.classList.add("feedback-correct");
    input.classList.add("border-green-500", "bg-green-50");
  } else if (state === "wrong") {
    feedback.innerText = "Salah! ❌";
    feedback.classList.add("feedback-wrong");
    input.classList.add("border-red-500", "bg-red-50");
  } else if (state === "empty") {
    feedback.innerText = "Kosong! ⚠️";
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
        html: `Misi selesai! Semua teka-teki candi telah terpecahkan.<br><br><b>Skor Akhirmu: <span style="font-size: 2.5em; color: #166534; display: block; margin-top: 10px;">${score}</span></b>`,
        confirmButtonText: "Main Lagi ⚔️",
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
// FITUR EDIT (GESER + UKURAN) - FIX DRAG
// ==========================================
const btnEdit = document.getElementById("btn-edit");
const btnSave = document.getElementById("btn-save-json");
const btnScaleUp = document.getElementById("btn-scale-up");
const btnScaleDown = document.getElementById("btn-scale-down");

let isEditMode = false;
let activeHotspot = null; // Candi yang dipilih (buat di-resize)
let isDragging = false; // Status apakah sedang ditahan/digeser

if (btnEdit && btnSave) {
  btnEdit.onclick = () => {
    isEditMode = !isEditMode;
    if (isEditMode) {
      btnEdit.innerText = "❌ Keluar Edit";
      btnEdit.classList.replace("bg-blue-600", "bg-red-600");
      btnSave.classList.remove("hidden");
      btnScaleUp.classList.remove("hidden");
      btnScaleDown.classList.remove("hidden");
      enableDrag();
      Swal.fire("Mode Edit Aktif!", "1. Klik candi untuk memilihnya (menyala merah).\n2. Tahan dan geser posisinya.\n3. Pakai ➕ / ➖ untuk ubah ukuran.", "info");
    } else {
      btnEdit.innerText = "🛠️ Mode Edit";
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
    Swal.fire("JSON Disalin! 📋", "Paste hasilnya di chat AI.", "success");
  };
}

function scaleHotspot(amount) {
  if (!activeHotspot) return Swal.fire("Pilih Candi Dulu!", "Klik salah satu candi yang mau diubah ukurannya.", "warning");
  const img = activeHotspot.querySelector("img");
  let currentWidth = parseInt(img.style.width || window.getComputedStyle(img).width);
  img.style.width = currentWidth + amount + "px";
}

function enableDrag() {
  const mapContainer = document.querySelector(".map-image").parentElement;
  const hotspots = document.querySelectorAll(".hotspot");

  hotspots.forEach((hotspot) => {
    hotspot.style.cursor = "move";
    if (hotspot.getAttribute("onclick")) {
      hotspot.setAttribute("data-onclick", hotspot.getAttribute("onclick"));
      hotspot.removeAttribute("onclick");
    }

    const startDrag = (e) => {
      if (!isEditMode) return;
      if (activeHotspot) activeHotspot.classList.remove("edit-active");

      activeHotspot = hotspot;
      activeHotspot.classList.add("edit-active");
      isDragging = true; // TANDAI MULAI DITARIK

      if (e.cancelable) e.preventDefault();
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

    activeHotspot.style.left = Math.max(0, Math.min(100, leftPct)).toFixed(2) + "%";
    activeHotspot.style.top = Math.max(0, Math.min(100, topPct)).toFixed(2) + "%";
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
  const hotspots = document.querySelectorAll(".hotspot");
  hotspots.forEach((hotspot) => {
    hotspot.style.cursor = "pointer";
    if (hotspot.hasAttribute("data-onclick")) {
      hotspot.setAttribute("onclick", hotspot.getAttribute("data-onclick"));
    }
    hotspot.onmousedown = null;
    hotspot.ontouchstart = null;
  });
  document.onmousemove = null;
  document.ontouchmove = null;
  document.onmouseup = null;
  document.ontouchend = null;
}
