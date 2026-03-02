       const NavigationMenu = {
            config: {
                brand: "DP_01",
                defaultImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
                links: [
                    { 
                        title: "Who We Are", 
                        url: "menu/about.html", 
                        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                        sublinks: [
                            { title: "About Us", url: "menu/about.html" },
                            { title: "Our Journey", url: "menu/journey.html" },
                            { title: "Vision", url: "menu/about.html#vision" }
                        ]
                    },
                    { 
                        title: "What We Build", 
                        url: "product.html", 
                        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" 
                    },
                    { 
                        title: "Signature Series", 
                        url: "technology.html", 
                        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
                        sublinks: [
                            { title: "Features", url: "technology.html" },
                            { title: "Battery Swapping", url: "menu/swapping.html" },
                            { title: "The Ecosystem", url: "menu/about.html#energy" }
                        ]
                    },
                    { 
                        title: "News / Media", 
                        url: "menu/blog.html", 
                        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                    }
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
                this.basePath = window.location.pathname.includes('/menu/') ? '../' : '';
                this.renderStyles();
                this.renderHTML();
                this.setupEventListeners();
            },

            resolvePath(path) {
                if (!path) return '';
                if (path.startsWith('http')) return path;
                
                // If it already starts with ../ or is an anchor, don't touch
                if (path.startsWith('../') || path.startsWith('#')) return path;
                
                return this.basePath + path;
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
                        
                    <!-- Desktop Links Wrapper -->
                    <div class="nav-section hidden md:flex items-center gap-6 text-sm font-medium">
                        ${this.config.links.map(link => `
                            <div class="relative group">
                                <a href="${this.resolvePath(link.url)}" class="nav-item-link transition-colors animate-fade-in-words whitespace-nowrap hover:text-emerald-400">
                                    ${link.title}
                                </a>
                                ${link.sublinks ? `
                                    <div class="dropdown-menu absolute left-1/2 -translate-x-1/2 mt-4 bg-[#474d4d] text-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] py-3 flex flex-col text-sm">
                                        ${link.sublinks.map(sub => `
                                            <a href="${this.resolvePath(sub.url)}" class="dropdown-item px-4 py-2 hover:bg-white/10 transition-colors">${sub.title}</a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `).slice(0, 3).join('')}
                    </div>

                    <!-- Center Logo -->
                    <div class="logo-container z-10 flex items-center gap-2">
                        <div class="logo-icon flex items-center justify-center">
                            <a href="${this.resolvePath('index.html')}" aria-label="Go to Home" class="flex items-center justify-center">
                                <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" class="h-8 md:h-12 w-auto drop-shadow-lg">
                                  <defs>
                                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%"  stop-color="#fff6b7"/>
                                      <stop offset="20%" stop-color="#f7e27a"/>
                                      <stop offset="40%" stop-color="#d4af37"/>
                                      <stop offset="60%" stop-color="#b8962e"/>
                                      <stop offset="80%" stop-color="#f7e27a"/>
                                      <stop offset="100%" stop-color="#fff6b7"/>
                                    </linearGradient>
                                    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="rgba(255,255,255,0.8)"/>
                                      <stop offset="50%" stop-color="rgba(255,255,255,0.1)"/>
                                      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                                    </linearGradient>
                                    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                                      <feGaussianBlur stdDeviation="3" result="blur"/>
                                      <feMerge>
                                        <feMergeNode in="blur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                      </feMerge>
                                    </filter>
                                  </defs>
                                  <path d="M40.9 4H99.1L136 40.9V99.1L99.1 136H40.9L4 99.1V40.9L40.9 4Z" stroke="url(#goldGradient)" stroke-width="6" fill="none" filter="url(#goldGlow)"/>
                                  <g font-family="Nanum Myeongjo, serif" text-anchor="middle">
                                    <text x="48" y="95" font-size="73" fill="url(#goldGradient)" filter="url(#goldGlow)">D</text>
                                    <text x="94" y="95" font-size="73" fill="url(#goldGradient)" filter="url(#goldGlow)">C</text>
                                    <text x="70" y="107" font-size="110" fill="url(#goldGradient)" stroke="#3a3a3a" stroke-width="2" paint-order="stroke" filter="url(#goldGlow)">D</text>
                                  </g>
                                  <path d="M40.9 4H99.1L136 40.9V60H4V40.9L40.9 4Z" fill="url(#shine)" opacity="0.4"/>
                                </svg>
                            </a>
                        </div>
                        <a href="${this.resolvePath('index.html')}" class="logo-text tracking-widest cursor-pointer whitespace-nowrap z-10" style="font-size: clamp(12px, 1.3vw, 24px);color: #f1e498;">
                            DP_01
                        </a>
                    </div>

                    <!-- Right Links Wrapper -->
                    <div class="nav-section hidden md:flex items-center gap-4 text-sm font-medium">
                        <a href="${this.resolvePath('menu/blog.html')}" class="nav-item-link transition-colors animate-fade-in-words delay-200 whitespace-nowrap hover:text-emerald-400">
                            NEWS/media
                        </a>

                        <a href="${this.resolvePath('menu/tutorial.html')}" class="nav-item-link transition-colors animate-fade-in-words delay-200 whitespace-nowrap hover:text-emerald-400">
                            hop on go
                        </a>
                        <a href="${this.resolvePath('menu/contact.html')}" class="bg-emerald-500 text-white px-5 py-2 rounded-full hover:bg-emerald-800 transition-all animate-fade-in-words delay-300 text-xs tracking-wide uppercase font-bold whitespace-nowrap">Contact Us</a>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button class="md:hidden text-emerald-500 px-4 hover:text-emerald-400 transition-colors" id="mobileMenuBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    </nav>

                    <!-- Overlay Menu -->
                    <div id="open-state" class="fixed inset-0 bg-[#f0fff9]/95 backdrop-blur-2xl z-[60] overflow-hidden hidden opacity-0 menu-transition">
                        <div class="flex h-full w-full flex-col md:flex-row overflow-y-auto no-scrollbar">
                            
                            <!-- IMAGE PANEL (Top on mobile) -->
                            <div class="w-full md:w-[55%] lg:w-[60%] p-4 md:p-10 order-1 md:order-2">
                                <div class="w-full h-[40vh] md:h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group shadow-2xl bg-emerald-900/10">
                                    <img id="menu-display-image" src="${this.config.defaultImage}" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div class="absolute bottom-8 left-8 text-white">
                                        <p class="text-[clamp(10px,1.5vw,14px)] font-bold uppercase tracking-widest opacity-80 mb-2">Signature Series</p>
                                        <h3 class="text-[clamp(24px,4vw,48px)] font-bold">Innovation in Motion</h3>
                                    </div>
                                </div>
                            </div>

                            <!-- LINKS PANEL (Bottom on mobile) -->
                            <div class="w-full md:w-[45%] lg:w-[40%] flex flex-col px-6 md:px-16 py-8 md:py-12 order-2 md:order-1 justify-center">
                                <div class="flex justify-between items-center mb-8 md:mb-16">
                                    <span class="text-[clamp(10px,1.2vw,12px)] font-bold uppercase tracking-[0.3em] text-emerald-800/60">Explore DDC</span>
                                    <button id="close-btn" class="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100 text-emerald-900 hover:bg-emerald-50 shadow-xl transition-all active:scale-90">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                <nav class="space-y-4 md:space-y-6 mb-12">
                                    ${this.config.links.map(link => `
                                        <div class="mobile-nav-group">
                                            <a href="${this.resolvePath(link.url)}" class="nav-link-item flex justify-between items-center group py-2" data-image="${link.image}">
                                                <span class="text-[clamp(1.5rem,3vw,2.5rem)] font-normal text-gray-900 group-hover:text-emerald-700 transition-all group-hover:pl-4">${link.title}</span>
                                                <div class="arrow-circle min-w-[40px] h-[40px] md:w-12 md:h-12 rounded-full border border-emerald-900/5 flex items-center justify-center transition-all group-hover:bg-emerald-100 group-hover:border-emerald-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                                </div>
                                            </a>
                                            ${link.sublinks ? `
                                                <div class="flex flex-wrap gap-x-4 gap-y-2 pl-4 mt-1 opacity-80">
                                                    ${link.sublinks.map(sub => `
                                                        <a href="${this.resolvePath(sub.url)}" class="text-[clamp(0.7rem,1.2vw,0.85rem)] uppercase tracking-widest text-emerald-800 border-b border-transparent hover:border-emerald-500 font-bold transition-all">
                                                            ${sub.title}
                                                        </a>|
                                                    `).join('<span class="text-emerald-200">/</span>')}
                                                </div>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </nav>
                                <a herf="../contact.html">contact us</a>
                                <div class="grid grid-cols-2 gap-x-8 gap-y-4 pt-8 border-t border-emerald-900/10 mb-12">
                                    ${this.config.secondaryLinks.map(link => `
                                        <a href="${this.resolvePath(link.url)}" class="text-[clamp(12px,1vw,14px)] font-medium text-emerald-800/70 hover:text-emerald-600 transition-colors uppercase tracking-wider flex items-center gap-2 hover:translate-x-2">
                                            ${link.title}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </a>
                                    `).join('')}
                                </div>

                                <div class="flex items-center gap-6">
                                    <span class="text-xs font-bold uppercase tracking-widest text-emerald-800/30">Connect</span>
                                    <div class="flex gap-4">
                                        <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-900/5 text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all">
                                            <i class="ri-instagram-line"></i>
                                        </a>
                                        <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-900/5 text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all">
                                            <i class="ri-linkedin-line"></i>
                                        </a>
                                    </div>
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
