import "./style.css";

// Sidebar Logic - REMOVED (Hamburger menu no longer used)
// All pages now have direct Home button navigation instead

// =========================================================
// HIDE-ON-SCROLL NAVBAR (mobile only, lg: tidak terpengaruh)
// Mendukung dua pola layout:
// - Layout A: scroll di body/window (beranda, beranda-pasinaon)
// - Layout B: scroll di div flex-inner (legena, peta, pasangan)
// =========================================================
function setupHideOnScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;
  const THRESHOLD = 8; // px minimal sebelum hide/show

  function onScroll(currentY) {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (currentY > lastScrollY + THRESHOLD && currentY > 50) {
          // Scroll ke bawah → sembunyikan navbar
          header.classList.add("navbar-hidden");
        } else if (currentY < lastScrollY - THRESHOLD || currentY <= 0) {
          // Scroll ke atas → tampilkan navbar
          header.classList.remove("navbar-hidden");
        }
        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }

  // Deteksi container scroll
  const mainScrollArea = document.getElementById("main-scroll-area");
  const scrollContainer = header.parentElement;

  // 1. Prioritas ID spesifik (Legena, Peta, Pasangan)
  if (mainScrollArea) {
    mainScrollArea.addEventListener("scroll", () => onScroll(mainScrollArea.scrollTop), { passive: true });
  }

  // 2. Fallback ke Parent (Layout B)
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => onScroll(scrollContainer.scrollTop), { passive: true });
  }

  // 3. Fallback ke Window (Layout A: Beranda)
  window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });

  // === Tambahan: Deteksi Swipe untuk layar yang tidak bisa di-scroll ===
  let touchStartY = 0;
  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      if (diff > 30) {
        // Swipe Up -> Sembunyikan navbar
        header.classList.add("navbar-hidden");
      } else if (diff < -30) {
        // Swipe Down -> Tampilkan navbar
        header.classList.remove("navbar-hidden");
      }
    },
    { passive: true },
  );
}

// Fungsi untuk menambahkan centang pada menu yang sudah diselesaikan
function addCompletionBadges() {
  // Cari link menu berdasarkan href
  const legenaLink = document.querySelector('a[href="legena.html"]');
  const pasinaonLink = document.querySelector('a[href="beranda-pasinaon.html"]') || document.querySelector('a[href="peta.html"]');

  // Tambahkan centang jika sudah selesai
  if (legenaLink && sessionStorage.getItem("completed_legena") === "true") {
    // Cek apakah sudah ada span centang, jika belum tambahkan
    if (!legenaLink.querySelector(".completion-badge")) {
      const span = document.createElement("span");
      span.className = "completion-badge ml-2 text-green-600 font-bold text-lg";
      span.textContent = "✓";
      legenaLink.appendChild(span);
    }
  }

  if (pasinaonLink && sessionStorage.getItem("completed_pasinaon") === "true") {
    if (!pasinaonLink.querySelector(".completion-badge")) {
      const span = document.createElement("span");
      span.className = "completion-badge ml-2 text-green-600 font-bold text-lg";
      span.textContent = "✓";
      pasinaonLink.appendChild(span);
    }
  }
}

// =========================================================
// LANDSCAPE ENFORCER (Mencegah Mode Portrait Pakai SweetAlert)
// =========================================================
let landscapeAlertShown = false;

function enforceLandscape() {
  if (window.innerWidth < 1024) {
    if (window.innerHeight > window.innerWidth) {
      if (!landscapeAlertShown) {
        landscapeAlertShown = true;

        // Fungsi untuk memanggil Swal
        const showWarning = () => {
          Swal.fire({
            icon: "warning",
            title: "Puter HP Panjenengan!",
            text: "Aplikasi pasinaon iki dirancang nganggo tampilan layar mujur",
            confirmButtonText: "OK",
            confirmButtonColor: "#03A9F4",
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
              popup: "swal-paper",
              title: "swal-paper-title",
              confirmButton: "swal-paper-confirm",
            },
          }).then(() => {
            landscapeAlertShown = false;
            setTimeout(enforceLandscape, 500); // Cek ulang kalau user ngeyel klik OK
          });
        };

        // Jika Swal belum diload (misal di halaman index), muat dulu via script
        if (typeof Swal === "undefined") {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
          script.onload = showWarning;
          document.head.appendChild(script);
        } else {
          showWarning();
        }
      }
    } else {
      // Jika diputar ke landscape, tutup alert-nya
      if (landscapeAlertShown && typeof Swal !== "undefined") {
        Swal.close();
        landscapeAlertShown = false;
      }
    }
  } else {
    // Layar besar (Laptop) aman
    if (landscapeAlertShown && typeof Swal !== "undefined") {
      Swal.close();
      landscapeAlertShown = false;
    }
  }
}

window.addEventListener("resize", enforceLandscape);
window.addEventListener("orientationchange", enforceLandscape);

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  addCompletionBadges();
  setupHideOnScroll();
  enforceLandscape();
});
