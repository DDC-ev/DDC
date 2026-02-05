// ============================================
// DDC MASTER SCRIPT - Consolidated JavaScript
// All functionality for the website
// ============================================

// ============================================
// 1. MOBILE MENU HANDLER
// ============================================
function initMobileMenu() {
    const body = document.body;
    const mobileMenu = document.querySelector('.mobile-menu');

    // Delegated clicks
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.menu-toggle');
        if (toggle) {
            toggle.classList.toggle('active');
            if (mobileMenu) mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            return;
        }

        if (mobileMenu && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-toggle')) {
            const mt = document.querySelector('.menu-toggle');
            if (mt) mt.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close when a mobile link is clicked
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            const mt = document.querySelector('.menu-toggle');
            if (mt) mt.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mt = document.querySelector('.menu-toggle');
            if (mt) mt.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// ============================================
// 2. CUSTOM CURSOR FUNCTIONALITY
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');

    if (!cursor || !dot) return;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 12) + 'px';
        cursor.style.top = (e.clientY - 12) + 'px';
        dot.style.left = (e.clientX - 2) + 'px';
        dot.style.top = (e.clientY - 2) + 'px';
    });

    // Hover effects on interactive elements
    document.querySelectorAll('a, button, .btn-nav, .mobile-link, .back-button, .nav-logo, .flip-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.borderColor = 'var(--accent-blue)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--text-main)';
        });
    });
}

// ============================================
// 3. IMAGE SLIDER (Contact Page)
// ============================================
function initImageSlider() {
    const imageSlider = document.getElementById('imageSlider');
    if (!imageSlider) return;

    let currentImageSlide = 0;
    const sliderItems = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.dot');
    let touchStartX = 0;
    let touchEndX = 0;

    function showImageSlide(n) {
        if (n >= sliderItems.length) currentImageSlide = 0;
        if (n < 0) currentImageSlide = sliderItems.length - 1;

        sliderItems.forEach(item => {
            item.style.opacity = '0';
            item.style.display = 'none';
        });

        sliderItems[currentImageSlide].style.display = 'block';
        setTimeout(() => {
            sliderItems[currentImageSlide].style.opacity = '1';
        }, 10);

        dots.forEach((dot, index) => {
            if (index === currentImageSlide) {
                dot.style.background = '#10B981';
                dot.style.boxShadow = '0 0 10px rgba(16,185,129,0.6)';
            } else {
                dot.style.background = 'rgba(255,255,255,0.4)';
                dot.style.boxShadow = 'none';
            }
        });
    }

    window.goToSlide = function (n) {
        currentImageSlide = n;
        showImageSlide(currentImageSlide);
    };

    window.nextSlide = function () {
        currentImageSlide++;
        showImageSlide(currentImageSlide);
    };

    window.prevSlide = function () {
        currentImageSlide--;
        showImageSlide(currentImageSlide);
    };

    // Touch swipe functionality
    imageSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    imageSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            window.nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            window.prevSlide();
        }
    }, false);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') window.prevSlide();
        if (e.key === 'ArrowRight') window.nextSlide();
    });

    // Initialize
    showImageSlide(currentImageSlide);
}

// ============================================
// 4. VIDEO SLIDER (Technology Page)
// ============================================
function initVideoSlider() {
    const videoSlider = document.getElementById('videoSlider');
    if (!videoSlider) return;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.video-slide');
    const dotIndicators = document.querySelectorAll('.dot-indicator');
    let touchStartX = 0;
    let touchEndX = 0;

    const slideData = [
        { title: '60-Second Swapping', desc: 'Eliminate downtime with hot-swap battery technology' },
        { title: 'Crab Walk', desc: 'Independent 4-wheel steering with 90-degree lateral movement' },
        { title: '98% Efficiency', desc: 'Level 5 autonomous driving platform with industry-leading efficiency' }
    ];

    // Show slide function
    function showSlide(n) {
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;

        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.display = 'none';
        });

        // Show current slide
        slides[currentSlide].style.display = 'block';
        setTimeout(() => {
            slides[currentSlide].style.opacity = '1';
        }, 10);

        // Update dot indicators
        dotIndicators.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.style.background = '#10B981';
                dot.style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';
            } else {
                dot.style.background = 'rgba(255,255,255,0.4)';
                dot.style.boxShadow = 'none';
            }
        });

        // Update title and description
        const slideTitle = document.getElementById('slideTitle');
        const slideDesc = document.getElementById('slideDesc');
        if (slideTitle) slideTitle.textContent = slideData[currentSlide].title;
        if (slideDesc) slideDesc.textContent = slideData[currentSlide].desc;
    }

    // Go to slide function
    window.goToVideoSlide = function (n) {
        currentSlide = n;
        showSlide(currentSlide);
    };

    // Next slide
    window.nextVideoSlide = function () {
        currentSlide++;
        showSlide(currentSlide);
    };

    // Previous slide
    window.prevVideoSlide = function () {
        currentSlide--;
        showSlide(currentSlide);
    };

    // Touch swipe functionality
    videoSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    videoSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            window.nextVideoSlide();
        } else if (touchEndX - touchStartX > 50) {
            window.prevVideoSlide();
        }
    }, false);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') window.prevVideoSlide();
        if (e.key === 'ArrowRight') window.nextVideoSlide();
    });

    // Button event listeners
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (nextBtn) nextBtn.onclick = window.nextVideoSlide;
    if (prevBtn) prevBtn.onclick = window.prevVideoSlide;

    // Initialize
    showSlide(currentSlide);
}

// ============================================
// 5. FLIP CARD ANIMATIONS
// ============================================
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        // Already has onclick toggle handler in HTML
        // Just ensure hover state for desktop
    });
}

// ============================================
// 6. SCROLL REVEAL ANIMATIONS (About Page)
// ============================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
}

// ============================================
// 7. CONTACT FORM HANDLER
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you! Your message has been received.');
            this.reset();
        });
    }
}

// ============================================
// 8. GSAP ANIMATIONS (Index & Booking)
// ============================================
function initGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero text entrance for index page
    gsap.from(".hero-text > *", {
        y: 30, opacity: 0, stagger: 0.2, duration: 1, ease: "power3.out"
    });

    // Impact Counters
    const startCounter = (id, target) => {
        let obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2.5,
            scrollTrigger: {
                trigger: "#impact",
                start: "top 80%"
            },
            onUpdate: () => {
                const el = document.getElementById(id);
                if (el) {
                    el.innerText = Math.floor(obj.val) + (id === 'stat3' ? 'M+' : '+');
                }
            }
        });
    };

    startCounter('stat1', 0);
    startCounter('stat2', 50);
    startCounter('stat3', 2);
    startCounter('stat4', 15);

    // Hero Shutter Logic (Booking Page)
    window.addEventListener('load', () => {
        const heroShutter = document.getElementById('hero-shutter');
        if (heroShutter) {
            const tl = gsap.timeline();
            tl.from(heroShutter, {
                clipPath: "inset(0% 50% 0% 50%)",
                duration: 1.8,
                ease: "expo.inOut"
            })
                .from(heroShutter.querySelector('img'), {
                    scale: 1.4,
                    duration: 2,
                    ease: "expo.out"
                }, "-=1.5");
        }

        // Scroll Triggered Shutter Reveals
        const shutters = document.querySelectorAll('.reveal-shutter');
        shutters.forEach(shutter => {
            const img = shutter.querySelector('img');
            gsap.fromTo(shutter,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.4,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: shutter,
                        start: "top 70%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            if (img) {
                gsap.fromTo(img,
                    { scale: 1.4 },
                    {
                        scale: 1,
                        duration: 1.4,
                        ease: "power4.inOut",
                        scrollTrigger: {
                            trigger: shutter,
                            start: "top 70%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });
    });
}

// ============================================
// 8B. THREE.JS VISUALIZATION (Index Page)
// ============================================
let scene, camera, renderer, podGroup;

function createPod() {
    if (typeof THREE === 'undefined') return null;

    const group = new THREE.Group();

    // Chassis
    const bodyGeo = new THREE.BoxGeometry(3, 1.2, 2);
    const bodyMat = new THREE.MeshPhongMaterial({
        color: 0xf0f0f0,
        shininess: 100,
        specular: 0x0066ff
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.5;
    group.add(body);

    // Windows
    const winGeo = new THREE.BoxGeometry(2.8, 0.6, 1.8);
    const winMat = new THREE.MeshPhongMaterial({ color: 0x333333, transparent: true, opacity: 0.8 });
    const win = new THREE.Mesh(winGeo, winMat);
    win.position.y = 0.8;
    group.add(win);

    // Sensors (LiDAR)
    const sensorGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x0066ff });
    const s1 = new THREE.Mesh(sensorGeo, sensorMat);
    s1.position.set(1.4, 1.1, 0);
    group.add(s1);

    return group;
}

function init3D() {
    if (typeof THREE === 'undefined') return;

    const container = document.getElementById('hero-canvas');
    if (!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 1.2);
    directional.position.set(5, 10, 7);
    scene.add(directional);

    podGroup = createPod();
    if (podGroup) scene.add(podGroup);

    camera.position.set(6, 4, 8);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        if (podGroup) {
            podGroup.rotation.y += 0.003;
            podGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (container && camera && renderer) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// ============================================
// 8C. INTERACTIVE LOGO (Index Page)
// ============================================
function initLogoSplit() {
    const navLogo = document.querySelector('.nav-logo');
    if (!navLogo) return;

    document.addEventListener('mousemove', (e) => {
        const rect = navLogo.getBoundingClientRect();
        const logoX = rect.left + rect.width / 2;
        const logoY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - logoX, e.clientY - logoY);

        if (distance < 80) {
            navLogo.classList.add('split');
        } else {
            navLogo.classList.remove('split');
        }
    });

    navLogo.addEventListener('mouseenter', () => {
        navLogo.classList.add('split');
    });
    navLogo.addEventListener('mouseleave', () => {
        navLogo.classList.remove('split');
    });
}

// ============================================
// 9. LUCIDE ICONS (About Page)
// ============================================
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ============================================
// 10. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCustomCursor();
    initImageSlider();
    initVideoSlider();
    initFlipCards();
    initScrollReveal();
    initContactForm();
    initGSAPAnimations();
    initLucideIcons();
    initLogoSplit();
});

window.addEventListener('load', () => {
    initMobileMenu();
    init3D();
});
