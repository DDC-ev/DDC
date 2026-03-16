   //-- Tailwind CSS --
   const tailwindScript=document.createElement("script");
tailwindScript.src="https://cdn.tailwindcss.com";
document.head.appendChild(tailwindScript)
 const icon=document.createElement("script");
icon.src="https://unpkg.com/lucide@latest";
document.head.appendChild(icon); 
icon.onload=()=>{
   lucide.createIcons();
}
        // ================= MOBILE MENU LOGIC =================
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMobileBtn = document.getElementById('closeMobileBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        function toggleMobileMenu() {
            if (mobileMenu.classList.contains('hidden')) {
                // Open menu
                mobileMenu.classList.remove('hidden');
                // Small timeout to allow display block to apply before animating transform
                setTimeout(() => {
                    mobileMenu.classList.remove('translate-x-full');
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent scrolling on body
            } else {
                // Close menu
                mobileMenu.classList.add('translate-x-full');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300); // Wait for transition duration
                document.body.style.overflow = ''; // Restore scrolling
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMobileBtn.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when a link inside it is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });

        // ================= DYNAMIC NAVBAR SCROLL =================
        const navbar = document.getElementById('mainNav'); // Unified ID
        let lastScrollY = window.scrollY;
        const SCROLL_THRESHOLD = 10;

        window.addEventListener('scroll', () => {
            if (!navbar) return;
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;

            // Always expand at the very top (Safety Anchor)
            if (currentScrollY <= 50) {
                navbar.classList.remove('minimized');
            }
            // Scrolling DOWN (significantly)
            else if (scrollDelta > SCROLL_THRESHOLD && currentScrollY > 50) {
                navbar.classList.add('minimized');
                // close mobile menu when minimized to avoid floating orphans
                navbar.classList.remove('open');
            }
            // Scrolling UP (significantly)
            else if (scrollDelta < -SCROLL_THRESHOLD) {
                navbar.classList.remove('minimized');
            }

            lastScrollY = currentScrollY;
        }, { passive: true });

        // ================= MOBILE MENU TOGGLE =================
        // Variables mobileMenuBtn and mobileMenu are already declared at the top
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // If using the inline dropdown approach from contact.html (toggling 'open' on nav)
                if (navbar) navbar.classList.toggle('open');
                
                // If using the full-screen overlay approach from index.html
                if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                    setTimeout(() => {
                        mobileMenu.classList.toggle('translate-x-full');
                    }, 10);
                }
            });
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar && !navbar.contains(e.target)) {
                navbar.classList.remove('open');
            }
        });

        // ================= VIDEO SCROLL LOGIC =================
        const video = document.getElementById('solutionVideo');
        if (video) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(e => console.log("Auto-play prevented by browser policy", e));
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.4 }); // Trigger when 40% of the video is visible

            videoObserver.observe(video);
        }

        // ================= EXPANDING IMAGE LOGIC =================
        const triggerSection = document.getElementById('expand-trigger');
        const expandingImage = document.getElementById('expanding-image');
        const imageCaption = document.getElementById('image-caption');

        if (triggerSection && expandingImage) {
            window.addEventListener('scroll', () => {
                const rect = triggerSection.getBoundingClientRect();
                const sectionHeight = rect.height;
                const windowHeight = window.innerHeight;
                
                const scrollableDistance = sectionHeight - windowHeight;
                const distanceFromTop = -rect.top;

                if (distanceFromTop > 0 && distanceFromTop < scrollableDistance) {
                    const progress = distanceFromTop / scrollableDistance;
                    const newWidth = 50 + (progress * 50);
                    expandingImage.style.width = `${newWidth}%`;
                    
                    if (progress > 0.8) {
                        imageCaption.classList.remove('opacity-0');
                    } else {
                        imageCaption.classList.add('opacity-0');
                    }
                } else if (distanceFromTop <= 0) {
                    expandingImage.style.width = '50%';
                    imageCaption.classList.add('opacity-0');
                } else if (distanceFromTop >= scrollableDistance) {
                    expandingImage.style.width = '100%';
                    imageCaption.classList.remove('opacity-0');
                }
            });
        }

        // ================= CARD INTERACTION LOGIC =================
        const cardButtons = document.querySelectorAll('.card__button');

        cardButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();

                const parent = button.closest('.card__article');
                const menu = parent.querySelector('.card__menu');
                
                menu.classList.toggle('show-menu');
                button.classList.toggle('show-icon');

                // Close other open menus
                cardButtons.forEach(otherButton => {
                    if (otherButton !== button) {
                        const otherParent = otherButton.closest('.card__article');
                        const otherMenu = otherParent.querySelector('.card__menu');
                        otherMenu.classList.remove('show-menu');
                        otherButton.classList.remove('show-icon');
                    }
                });
            });
        });

        /* Close menu when clicking outside a card */
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.card__actions')) {
                document.querySelectorAll('.card__menu').forEach(m => m.classList.remove('show-menu'));
                document.querySelectorAll('.card__button').forEach(b => b.classList.remove('show-icon'));
            }
        });
        gsap.registerPlugin(ScrollTrigger);

        // 2. Parallax Grow Animation
        gsap.to("#grow-image-wrapper", {
            width: "100%",
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#who-we-are",
                start: "top 80%",
                end: "center center",
                scrub: 2,
            }
        });

        // 3. Immersive Image Parallax
        gsap.to(".parallax-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: "#horizon",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // 4. Fusion Section Scroll Animation
       