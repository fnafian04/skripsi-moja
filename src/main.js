import "./style.css";

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
if (overlay) {
  overlay.onclick = () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  };
}

// =========================================================
// HIDE-ON-SCROLL NAVBAR (mobile only, lg: tidak terpengaruh)
// Mendukung dua pola layout:
// - Layout A: scroll di body/window (beranda, beranda-pasinaon)
// - Layout B: scroll di div flex-inner (legena, peta, pasangan)
// =========================================================
function setupHideOnScroll() {
  const header = document.querySelector('header.lg\\:hidden');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;
  const THRESHOLD = 8; // px minimal sebelum hide/show

  function onScroll(currentY) {
    if (!ticking) {
      requestAnimationFrame(() => {
        const isSidebarOpen = sidebar && !sidebar.classList.contains('-translate-x-full');
        // Jangan hide kalau sidebar sedang terbuka
        if (!isSidebarOpen) {
          if (currentY > lastScrollY + THRESHOLD && currentY > 50) {
            // Scroll ke bawah → sembunyikan navbar
            header.classList.add('navbar-hidden');
          } else if (currentY < lastScrollY - THRESHOLD || currentY <= 0) {
            // Scroll ke atas → tampilkan navbar
            header.classList.remove('navbar-hidden');
          }
        }
        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }

  // Deteksi container scroll
  const mainScrollArea = document.getElementById('main-scroll-area');
  const scrollContainer = header.parentElement;

  // 1. Prioritas ID spesifik (Legena, Peta, Pasangan)
  if (mainScrollArea) {
    mainScrollArea.addEventListener('scroll', () => onScroll(mainScrollArea.scrollTop), { passive: true });
  } 
  
  // 2. Fallback ke Parent (Layout B)
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => onScroll(scrollContainer.scrollTop), { passive: true });
  }

  // 3. Fallback ke Window (Layout A: Beranda)
  window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

  // Munculkan kembali navbar saat sidebar dibuka
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      header.classList.remove('navbar-hidden');
    });
  }
}

// Fungsi untuk menambahkan centang pada menu yang sudah diselesaikan
function addCompletionBadges() {
  // Cari link menu berdasarkan href
  const legenaLink = document.querySelector('a[href="legena.html"]');
  const pasanganLink = document.querySelector('a[href="pasangan.html"]');
  const pasinaonLink = document.querySelector('a[href="beranda-pasinaon.html"]') || document.querySelector('a[href="peta.html"]');
  
  // Tambahkan centang jika sudah selesai
  if (legenaLink && sessionStorage.getItem('completed_legena') === 'true') {
    // Cek apakah sudah ada span centang, jika belum tambahkan
    if (!legenaLink.querySelector('.completion-badge')) {
      const span = document.createElement('span');
      span.className = 'completion-badge ml-2 text-green-600 font-bold text-lg';
      span.textContent = '✓';
      legenaLink.appendChild(span);
    }
  }
  
  if (pasanganLink && sessionStorage.getItem('completed_pasangan') === 'true') {
    if (!pasanganLink.querySelector('.completion-badge')) {
      const span = document.createElement('span');
      span.className = 'completion-badge ml-2 text-green-600 font-bold text-lg';
      span.textContent = '✓';
      pasanganLink.appendChild(span);
    }
  }

  if (pasinaonLink && sessionStorage.getItem('completed_pasinaon') === 'true') {
    if (!pasinaonLink.querySelector('.completion-badge')) {
      const span = document.createElement('span');
      span.className = 'completion-badge ml-2 text-green-600 font-bold text-lg';
      span.textContent = '✓';
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
            icon: 'warning',
            title: 'Puter HP Panjenengan!',
            text: 'Aplikasi pasinaon iki dirancang nganggo tampilan layar mujur',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3E2723',
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
              popup: 'swal-paper',
              title: 'swal-paper-title',
              confirmButton: 'swal-paper-confirm'
            }
          }).then(() => {
            // Coba paksa fullscreen dan lock orientasi landscape
            try {
              let docEl = document.documentElement;
              let requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
              
              if (requestFS) {
                requestFS.call(docEl).then(() => {
                  if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock("landscape").catch(e => console.log("Gagal lock orientasi:", e));
                  }
                }).catch(e => console.log("Gagal request fullscreen:", e));
              }
            } catch (error) {
              console.log("Browser tidak mendukung force landscape:", error);
            }

            landscapeAlertShown = false;
            setTimeout(enforceLandscape, 1500); // Beri waktu lebih lama sebelum cek ulang agar efek rotate terasa
          });
        };

        // Jika Swal belum diload (misal di halaman index), muat dulu via script
        if (typeof Swal === 'undefined') {
          const script = document.createElement('script');
          script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
          script.onload = showWarning;
          document.head.appendChild(script);
        } else {
          showWarning();
        }
      }
    } else {
      // Jika diputar ke landscape, tutup alert-nya
      if (landscapeAlertShown && typeof Swal !== 'undefined') {
        Swal.close();
        landscapeAlertShown = false;
      }
    }
  } else {
    // Layar besar (Laptop) aman
    if (landscapeAlertShown && typeof Swal !== 'undefined') {
      Swal.close();
      landscapeAlertShown = false;
    }
  }
}

window.addEventListener('resize', enforceLandscape);
window.addEventListener('orientationchange', enforceLandscape);

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  addCompletionBadges();
  setupHideOnScroll();
  enforceLandscape();
});