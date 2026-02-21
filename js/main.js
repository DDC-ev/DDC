
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
        const nav = document.getElementById('mainNav');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = Math.max(0, window.scrollY);

            // Determine direction and threshold
            // If scrolling UP OR within the top 50px -> Expand (Original Size)
            if (currentScrollY < lastScrollY || currentScrollY <= 50) {
                nav.classList.remove('scrolled');
                nav.classList.add('w-[95%]', 'max-w-5xl'); // Restore user's sizing classes
            } 
            // If scrolling DOWN AND past the top 50px -> Contract (Pill Size)
            else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                nav.classList.add('scrolled');
                nav.classList.remove('w-[95%]', 'max-w-5xl'); // Remove to allow min-width fallback to wrap logo
            }

            // Update last scroll position
            lastScrollY = currentScrollY;
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
    