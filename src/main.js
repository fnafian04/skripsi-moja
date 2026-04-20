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

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  addCompletionBadges();
  setupHideOnScroll();
});