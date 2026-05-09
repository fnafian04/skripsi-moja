import "./sandhangan.css";

const pages = [
  '/assets/sandhangan.jpeg',
  '/assets/sandhangan panyigeg.jpeg',
  '/assets/sandhangan mandaswara.jpeg'
];

let currentPage = 0;
const bookLayout = document.getElementById("book-layout");

window.openSandhanganCover = () => {
  const wrapper = document.getElementById("sandhangan-intro-book-wrapper");
  const frontCover = document.getElementById("sandhangan-intro-front-cover");
  const introCover = document.getElementById("sandhangan-cover-intro");
  
  if(wrapper && frontCover && introCover) {
    frontCover.style.transform = "rotateY(-120deg) translateZ(2px)";
    
    setTimeout(() => {
      wrapper.style.transform = "rotateY(15deg) rotateX(10deg) scale(15)";
      wrapper.style.opacity = "0";
      introCover.style.opacity = "0";
      introCover.style.pointerEvents = "none";
      
      setTimeout(() => {
        introCover.classList.add("hidden");
        renderBook();
      }, 1500);
    }, 1200);
  }
};

function renderBook() {
  const imgUrl = pages[currentPage];

  let leftHTML = `
    <div class="page-left flex-1 w-1/2 flex flex-col pointer-events-none relative perspective-container" style="perspective: 1200px;">
      <div class="page-content-wrapper w-full h-full flex flex-col items-center pointer-events-auto justify-center" style="transform: scale(0.92); transform-origin: center right;">
        
        <!-- Kiri Gambar -->
        <div class="absolute top-[8%] md:top-[12%] bottom-[15%] right-0 left-[8%] md:left-[12%] rounded-l-xl bg-white/90 z-0 shadow-[-5px_5px_15px_rgba(0,0,0,0.15)]" style="background-image: url('${imgUrl}'); background-size: 200% 100%; background-position: left center; background-repeat: no-repeat; border: 4px solid white; border-right: none;"></div>

        <!-- Navigasi Bawah -->
        <div class="w-full flex justify-between items-center flex-shrink-0 absolute bottom-0 left-4 md:left-8 pr-4 md:pr-8 z-[100]">
          <button onclick="prevPage()" class="btn-modern-3d text-[7px] md:text-[11px] font-bold tracking-wider px-1.5 py-1 md:px-3 active:scale-95 transition-transform duration-150" ${currentPage === 0 ? "style='visibility:hidden'" : ""}>
            <span style="display: flex; gap: 2px; align-items: center;"><span>⬅</span><span>BALENI</span></span>
          </button>
        </div>
      </div>
    </div>
  `;

  let rightHTML = `
    <div class="page-right flex-1 w-1/2 flex flex-col pointer-events-none relative perspective-container" style="perspective: 1200px;">
      <div class="page-content-wrapper w-full h-full flex flex-col items-center pointer-events-auto justify-center" style="transform: scale(0.92); transform-origin: center left;">
        
        <!-- Kanan Gambar -->
        <div class="absolute top-[8%] md:top-[12%] bottom-[15%] left-0 right-[8%] md:right-[12%] rounded-r-xl bg-white/90 z-0 shadow-[5px_5px_15px_rgba(0,0,0,0.15)]" style="background-image: url('${imgUrl}'); background-size: 200% 100%; background-position: right center; background-repeat: no-repeat; border: 4px solid white; border-left: none;"></div>

        <!-- Navigasi Bawah -->
        <div class="w-full flex justify-end items-center flex-shrink-0 absolute bottom-0 right-4 md:right-8 gap-2 md:gap-4 z-[100]">
          <span class="text-[#795548] font-bold text-[8px] md:text-[12px] font-serif bg-white/80 px-2 py-0.5 rounded shadow-sm border border-[#5D4037]/20">Hal ${currentPage + 1}/${pages.length}</span>
          <button onclick="nextPage()" class="btn-modern-3d text-[7px] md:text-[11px] font-bold tracking-wider px-1.5 py-1 md:px-3 active:scale-95 transition-transform duration-150" ${currentPage === pages.length - 1 ? "style='visibility:hidden'" : ""}>
            <span style="display: flex; gap: 2px; align-items: center;"><span>LANJUT</span><span>➡</span></span>
          </button>
        </div>
      </div>
    </div>
  `;

  if(bookLayout) {
    bookLayout.innerHTML = leftHTML + rightHTML;
  }
}

window.prevPage = () => {
  if (currentPage > 0) {
    const pageRight = bookLayout.querySelector('.page-right');
    const pageLeft = bookLayout.querySelector('.page-left');
    
    if(pageLeft) pageLeft.classList.add("page-turn-left-out");
    if(pageRight) {
      pageRight.style.transition = "opacity 0.4s ease-in";
      pageRight.style.opacity = "0";
    }

    setTimeout(() => {
      currentPage--;
      renderBook();
      
      const newPageLeft = bookLayout.querySelector('.page-left');
      const newPageRight = bookLayout.querySelector('.page-right');
      
      if(newPageRight) newPageRight.classList.add("page-turn-right-in");
      if(newPageLeft) {
         newPageLeft.style.opacity = "0";
         newPageLeft.style.transition = "opacity 0.4s ease-out";
         setTimeout(() => newPageLeft.style.opacity = "1", 50);
      }

      setTimeout(() => {
        if(newPageRight) newPageRight.classList.remove("page-turn-right-in");
      }, 400);
    }, 400);
  }
};

window.nextPage = () => {
  if (currentPage < pages.length - 1) {
    const pageRight = bookLayout.querySelector('.page-right');
    const pageLeft = bookLayout.querySelector('.page-left');
    
    if(pageRight) pageRight.classList.add("page-turn-right-out");
    if(pageLeft) {
      pageLeft.style.transition = "opacity 0.4s ease-in";
      pageLeft.style.opacity = "0";
    }

    setTimeout(() => {
      currentPage++;
      renderBook();
      
      const newPageLeft = bookLayout.querySelector('.page-left');
      const newPageRight = bookLayout.querySelector('.page-right');
      
      if(newPageLeft) newPageLeft.classList.add("page-turn-left-in");
      if(newPageRight) {
         newPageRight.style.opacity = "0";
         newPageRight.style.transition = "opacity 0.4s ease-out";
         setTimeout(() => newPageRight.style.opacity = "1", 50);
      }

      setTimeout(() => {
        if(newPageLeft) newPageLeft.classList.remove("page-turn-left-in");
      }, 400);
    }, 400);
  }
};
