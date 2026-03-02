       const NavigationMenu = {
            config: {
                brand: "DP_01",
                defaultImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
                links: [
                    { title: "Who We Are", url: "about.html", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" },
                    { title: "What We Build", url: "product.html", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" },
                    { title: "Signature Series", url: "tech.html", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop" },
                    { title: "News / Media", url: "blog.html", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" }
                ],
                secondaryLinks: [
                    { title: "Safety", url: "product.html#why-ddc" },
                    { title: "Journal", url: "menu/journal.html" },
                    { title: "Booking", url: "menu/booking.html" },
                    { title: "Press Room", url: "menu/press.html" }
                ]
            },

            init(containerId) {
                this.container = document.getElementById(containerId);
                this.renderStyles();
                this.renderHTML();
                this.setupEventListeners();
            },

            renderStyles() {
                const style = document.createElement('style');
                style.textContent = `
                    .menu-transition { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease; }
                    .nav-link-item:hover .arrow-circle { background-color: rgba(255, 255, 255, 0.5); transform: scale(1.05); }
                    #menu-display-image { transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `;
                document.head.appendChild(style);
            },

            renderHTML() {
                this.container.innerHTML = `
                    <!-- Main Navigation Trigger -->
                    <nav id="mainNav" class="fixed top-6 left-1/2 -translate-x-1/2 z-40 rounded-full px-2 py-2 md:px-8 md:py-3 transition-all duration-300 flex items-center justify-between gap-8 md:gap-12 w-[95%] max-w-5xl md:min-w-fit shadow-lg shadow-emerald-900/5 bg-[#3a3f3f]/80 backdrop-blur-md text-white">
                        
                    <!-- Left Links Wrapper -->
                    <div class="nav-section hidden md:flex items-center gap-6 text-sm font-medium">
                      <!-- FEATURES DROPDOWN -->
                      <div class="relative group">
                        <a href="menu/about.html" class="nav-item-link transition-colors animate-fade-in-words delay-200 whitespace-nowrap hover:text-emerald-400">
                            Who We Are
                        </a>

                        <div class="dropdown-menu absolute left-1/2 -translate-x-1/2 mt-4 bg-[#474d4d] text-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] py-3 flex flex-col text-sm">
                            <a href="menu/about.html" class="dropdown-item px-4 py-2 hover:bg-white/10 transition-colors">About Us</a>
                            <a href="menu/journey.html" class="dropdown-item px-4 py-2 hover:bg-white/10 transition-colors">Journey</a>
                        </div>
                      </div>

                      <a href="product.html" class="nav-item-link transition-colors animate-fade-in-words delay-200 whitespace-nowrap hover:text-emerald-400">
                        What We Build
                      </a>

                      <!-- SIGNATURE SERIES DROPDOWN -->
                      <div class="relative group">
                        <a href="technology.html" class="nav-item-link transition-colors animate-fade-in-words delay-100 whitespace-nowrap hover:text-emerald-400">
                            Signature Series
                        </a>

                        <div class="dropdown-menu absolute left-1/2 -translate-x-1/2 mt-4 bg-[#474d4d] text-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] py-3 flex flex-col text-sm">
                            <a href="menu/swapping.html" class="dropdown-item px-4 py-2 hover:bg-white/10 transition-colors">Battery Swapping</a>
                            <a href="technology.html" class="dropdown-item px-4 py-2 hover:bg-white/10 transition-colors">Features</a>
                        </div>
                      </div>
                    </div>

                    <!-- Center Logo -->
                    <div class="logo-container z-10 flex items-center gap-2">
                        <div class="logo-icon flex items-center justify-center">
                            <a href="index.html" aria-label="Go to Home" class="flex items-center justify-center">
                                <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" class="h-8 md:h-12 w-auto drop-shadow-lg">
                                  <!-- DEFINITIONS -->
                                  <defs>
                                    <!-- Gold Gradient -->
                                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%"  stop-color="#fff6b7"/>
                                      <stop offset="20%" stop-color="#f7e27a"/>
                                      <stop offset="40%" stop-color="#d4af37"/>
                                      <stop offset="60%" stop-color="#b8962e"/>
                                      <stop offset="80%" stop-color="#f7e27a"/>
                                      <stop offset="100%" stop-color="#fff6b7"/>
                                    </linearGradient>

                                    <!-- Shine Gradient -->
                                    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="rgba(255,255,255,0.8)"/>
                                      <stop offset="50%" stop-color="rgba(255,255,255,0.1)"/>
                                      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                                    </linearGradient>

                                    <!-- Glow Effect -->
                                    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                                      <feGaussianBlur stdDeviation="3" result="blur"/>
                                      <feMerge>
                                        <feMergeNode in="blur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                      </feMerge>
                                    </filter>
                                  </defs>

                                  <!-- Outer Shape -->
                                  <path 
                                    d="M40.9 4H99.1L136 40.9V99.1L99.1 136H40.9L4 99.1V40.9L40.9 4Z"
                                    stroke="url(#goldGradient)"
                                    stroke-width="6"
                                    fill="none"
                                    filter="url(#goldGlow)"
                                  />

                                  <!-- Letters -->
                                  <g font-family="Nanum Myeongjo, serif" text-anchor="middle">
                                    <!-- Left D -->
                                    <text x="48" y="95" font-size="73" fill="url(#goldGradient)" filter="url(#goldGlow)">
                                      D
                                    </text>
                                    <!-- C -->
                                    <text x="94" y="95" font-size="73" fill="url(#goldGradient)" filter="url(#goldGlow)">
                                      C
                                    </text>
                                    <!-- Center D -->
                                    <text 
                                      x="70" y="107"
                                      font-size="110"
                                      fill="url(#goldGradient)"
                                      stroke="#3a3a3a"
                                      stroke-width="2"
                                      paint-order="stroke"
                                      filter="url(#goldGlow)">
                                      D
                                    </text>
                                  </g>

                                  <!-- Shine Overlay -->
                                  <path 
                                    d="M40.9 4H99.1L136 40.9V60H4V40.9L40.9 4Z"
                                    fill="url(#shine)"
                                    opacity="0.4"
                                  />
                                </svg>
                            </a>
                        </div>
                        <a href="index.html" class="logo-text tracking-widest cursor-pointer whitespace-nowrap z-10" style="font-size: clamp(12px, 1.3vw, 24px);color: #f1e498;">
                            DP_01
                        </a>
                    </div>

                    <!-- Right Links Wrapper -->
                    <div class="nav-section hidden md:flex items-center gap-4 text-sm font-medium">
                        <a href="menu/blog.html" class="nav-item-link transition-colors animate-fade-in-words delay-200 whitespace-nowrap hover:text-emerald-400">
                            NEWS/media
                        </a>

                        <a href="menu/tutorial.html" class="nav-item-link transition-colors animate-fade-in-words delay-200 whitespace-nowrap hover:text-emerald-400">
                            hop on go
                        </a>
                        <a href="menu/contact.html" class="bg-emerald-500 text-white px-5 py-2 rounded-full hover:bg-emerald-800 transition-all animate-fade-in-words delay-300 text-xs tracking-wide uppercase font-bold whitespace-nowrap">Contact Us</a>
                    </div>

                    <!-- Mobile Menu Button (Triggers the overlay menu) -->
                    <button class="md:hidden text-emerald-500 px-4 hover:text-emerald-400 transition-colors" id="mobileMenuBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    </nav>

                    <!-- Overlay Menu -->
                    <div id="open-state" class="fixed inset-0 bg-[#f0fff9]/90 backdrop-blur-xl z-[60] overflow-hidden hidden opacity-0 menu-transition">
                        <div class="flex h-full w-full flex-col md:flex-row">
                            
                            <!-- LEFT PANEL -->
                            <div class="w-full md:w-[45%] lg:w-[40%] h-full overflow-y-auto no-scrollbar flex flex-col px-6 md:px-12 py-8 bg-transparent">
                                <div class="flex justify-between items-center mb-12">
                                    <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800/60">Menu</span>
                                    <div class="flex items-center bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-xl border border-white/20">
                                        <button id="close-btn" class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-white transition-all active:scale-95">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                        <div class="px-4 text-[10px] font-bold tracking-tighter leading-tight text-gray-900 border-l border-gray-200/50 ml-1">
                                            DP<br>01
                                        </div>
                                    </div>
                                </div>

                                <nav class="space-y-6 md:space-y-8 mb-12">
                                    ${this.config.links.map(link => `
                                        <a href="${link.url}" class="nav-link-item flex justify-between items-center group" data-image="${link.image}">
                                            <span class="text-3xl md:text-4xl font-normal text-gray-900 group-hover:text-emerald-700 transition-colors">${link.title}</span>
                                            <div class="arrow-circle w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/5 flex items-center justify-center transition-all group-hover:border-emerald-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                            </div>
                                        </a>
                                    `).join('')}
                                </nav>

                                <div class="mb-12">
                                    <a href="menu/contact.html" class="inline-flex items-center gap-3 bg-emerald-400 px-10 py-5 rounded-full text-black font-bold text-xs tracking-widest hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-200/50">
                                        Contact Us
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </a>
                                </div>

                                <!-- Footer Sub-Links -->
                                <div class="grid grid-cols-2 gap-y-6 pt-10 border-t border-emerald-900/10 mt-auto pb-10">
                                    ${this.config.secondaryLinks.map(link => `
                                        <a href="${link.url}" class="text-sm font-medium text-gray-800 hover:text-emerald-600 flex items-center gap-1 transition-colors">
                                            ${link.title} 
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </a>
                                    `).join('')}
                                    
                                </div>
                                <div class="flex gap-6"style="flex-direction: row;  width: fit-content; item-size: 40px; justify-content: space-between; align-items: center;">
                                    <span class="text-[15px] font-black uppercase tracking-widest text-emerald-800/40">Follow Us</span>
                                    <a href="#" class="text-gray-900 hover:text-emerald-500 transition-colors">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                    <a href="#" class="text-gray-900 hover:text-emerald-500 transition-colors">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    </a>
                                </div>  
                            </div>

                            <!-- RIGHT PANEL -->
                            <div class="hidden md:block md:w-[55%] lg:w-[60%] p-6">
                                <div class="w-full h-full rounded-[40px] overflow-hidden relative group shadow-2xl bg-emerald-900/10">
                                    <img id="menu-display-image" src="${this.config.defaultImage}" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            },

            setupEventListeners() {
                const openState = document.getElementById('open-state');
                const openBtn = document.getElementById('mobileMenuBtn');
                const closeBtn = document.getElementById('close-btn');
                const displayImage = document.getElementById('menu-display-image');
                const navItems = document.querySelectorAll('.nav-link-item');

                const toggleMenu = (isOpen) => {
                    if (isOpen) {
                        openState.classList.remove('hidden');
                        setTimeout(() => {
                            openState.classList.remove('opacity-0');
                            openState.classList.add('opacity-100');
                        }, 10);
                        document.body.style.overflow = 'hidden';
                    } else {
                        openState.classList.add('opacity-0');
                        openState.classList.remove('opacity-100');
                        setTimeout(() => {
                            openState.classList.add('hidden');
                            displayImage.src = this.config.defaultImage;
                        }, 400);
                        document.body.style.overflow = '';
                    }
                };

                navItems.forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        const newSrc = item.getAttribute('data-image');
                        displayImage.style.opacity = '0';
                        displayImage.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            displayImage.src = newSrc;
                            displayImage.style.opacity = '1';
                            displayImage.style.transform = 'scale(1)';
                        }, 200);
                    });
                });

                openBtn.addEventListener('click', () => toggleMenu(true));
                closeBtn.addEventListener('click', () => toggleMenu(false));
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && !openState.classList.contains('hidden')) toggleMenu(false);
                });
            }
        };

        // Initialize the component
        NavigationMenu.init('nav-container');
