
    document.addEventListener('DOMContentLoaded', () => {
      
      // I customized the Zoox template text to match your DP_01 site structure!
      const menuHTML = `
        <!-- Open Menu State (Overlay) -->
        <div id="open-state" class="fixed inset-0 bg-white z-50 overflow-y-auto text-black hidden">
          
          <div class="max-w-[480px] mx-auto w-full min-h-screen flex flex-col relative bg-white">
            
            <!-- Header Area -->
            <header class="relative pt-8 pb-10 px-6 flex justify-center items-start">
              <span class="absolute left-6 top-12 text-[#d1d1d1] font-bold tracking-[0.15em] text-[10px] uppercase">
                Menu
              </span>

              <!-- Floating Pill with Close Button and customized DP_01 Logo -->
              <div class="flex items-center bg-white rounded-full p-[5px] shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-gray-100 z-10 mt-1">
                <button id="close-btn" aria-label="Close menu" class="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-800">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div class="px-[18px] font-bold text-[10.5px] leading-[1.1] tracking-[0.25em] text-black">
                  <div class="flex justify-between w-[28px] mb-[1px]">
                    <span>D</span><span>P</span>
                  </div>
                  <div class="flex justify-between w-[28px]">
                    <span>0</span><span>1</span>
                  </div>
                </div>
              </div>
            </header>

            <!-- Primary Navigation Links from your nav -->
            <nav class="px-6 flex flex-col gap-[22px] mb-14">
              <a href="menu/about.html" class="flex justify-between items-center group cursor-pointer">
                <span class="text-[32px] font-normal tracking-[-0.02em] text-[#1a1a1a] group-hover:text-gray-500 transition-colors">Who We Are</span>
                <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-black group-hover:border-gray-400 group-hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="ml-0.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </a>
              <a href="product.html" class="flex justify-between items-center group cursor-pointer">
                <span class="text-[32px] font-normal tracking-[-0.02em] text-[#1a1a1a] group-hover:text-gray-500 transition-colors">What We Build</span>
                <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-black group-hover:border-gray-400 group-hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="ml-0.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </a>
              <a href="technology.html" class="flex justify-between items-center group cursor-pointer">
                <span class="text-[32px] font-normal tracking-[-0.02em] text-[#1a1a1a] group-hover:text-gray-500 transition-colors">Signature Series</span>
                <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-black group-hover:border-gray-400 group-hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="ml-0.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </a>
              <a href="menu/blog.html" class="flex justify-between items-center group cursor-pointer">
                <span class="text-[32px] font-normal tracking-[-0.02em] text-[#1a1a1a] group-hover:text-gray-500 transition-colors">NEWS / Media</span>
                <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-black group-hover:border-gray-400 group-hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="ml-0.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </a>
            </nav>

            <!-- Call To Action Button -->
            <div class="px-6 mb-16 flex justify-center">
              <a href="menu/tutorial.html" class="bg-[#70e0b3] hover:bg-[#5cd5a4] active:bg-[#4bc795] text-black font-semibold text-[13px] tracking-[0.1em] px-8 py-[18px] rounded-[24px] flex items-center gap-3 transition-colors">
                HOP ON GO
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
            </div>

            <!-- Secondary Navigation Links (Dropdown items & Contact) -->
            <nav class="px-6 flex flex-col mb-12">
              <a href="menu/about.html" class="flex justify-between items-center py-5 group cursor-pointer">
                <span class="text-[17px] font-normal text-[#1a1a1a] group-hover:text-gray-500 transition-colors">About Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
              <a href="menu/journey.html" class="flex justify-between items-center py-5 group cursor-pointer border-t border-gray-100">
                <span class="text-[17px] font-normal text-[#1a1a1a] group-hover:text-gray-500 transition-colors">Journey</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
              <a href="technology.html" class="flex justify-between items-center py-5 group cursor-pointer border-t border-gray-100">
                <span class="text-[17px] font-normal text-[#1a1a1a] group-hover:text-gray-500 transition-colors">Battery Swapping</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
              <a href="technology.html" class="flex justify-between items-center py-5 group cursor-pointer border-t border-gray-100">
                <span class="text-[17px] font-normal text-[#1a1a1a] group-hover:text-gray-500 transition-colors">Features</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
              <a href="menu/contact.html" class="flex justify-between items-center py-5 group cursor-pointer border-t border-gray-100">
                <span class="text-[17px] font-normal text-[#1a1a1a] group-hover:text-emerald-500 transition-colors">Contact Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black group-hover:translate-x-1 transition-transform group-hover:text-emerald-500"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
            </nav>

          </div>
        </div>
      `;

      // Inject the overlay HTML into the body
      document.body.insertAdjacentHTML('beforeend', menuHTML);

      // Element References
      const openState = document.getElementById('open-state');
      const openBtn = document.getElementById('mobileMenuBtn'); // Hooked to your Nav's hamburger button
      const closeBtn = document.getElementById('close-btn');

      // Open Menu Event
      openBtn.addEventListener('click', () => {
        openState.classList.remove('hidden');
        openState.classList.add('block');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
      });

      // Close Menu Event
      closeBtn.addEventListener('click', () => {
        openState.classList.add('hidden');
        openState.classList.remove('block');
        document.body.style.overflow = ''; // Restores background scrolling
      });
    });