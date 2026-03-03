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
document.addEventListener('DOMContentLoaded', addCompletionBadges);