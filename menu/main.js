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
    const menuToggle = document.querySelector('.menu-toggle');

    if (!mobileMenu || !menuToggle) return;

    // Direct toggle click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open', isActive);

        // Prevent background scroll
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
}

// ============================================
// 2. NAV SCROLL HANDLER
// ============================================
function initNavScroll() {
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScrollY && currentScroll > 100) {
            // Scrolling down → hide nav
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling up → show nav
            nav.classList.remove('nav-hidden');
        }

        lastScrollY = currentScroll;
    }, { passive: true });
}

// ============================================
// 3. CUSTOM CURSOR FUNCTIONALITY
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
    const interactiveElements = 'a, button, .btn-nav, .mobile-link, .back-button, .nav-logo, .flip-card, .nav-icon';
    document.querySelectorAll(interactiveElements).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.borderColor = 'var(--accent-blue)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--text-main, #333)';
        });
    });
}

// ============================================
// 4. IMAGE SLIDER (Contact Page)
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

        if (sliderItems[currentImageSlide]) {
            sliderItems[currentImageSlide].style.display = 'block';
            setTimeout(() => {
                sliderItems[currentImageSlide].style.opacity = '1';
            }, 10);
        }

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

    window.goToSlide = n => { currentImageSlide = n; showImageSlide(currentImageSlide); };
    window.nextSlide = () => { currentImageSlide++; showImageSlide(currentImageSlide); };
    window.prevSlide = () => { currentImageSlide--; showImageSlide(currentImageSlide); };

    imageSlider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, false);
    imageSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) window.nextSlide();
        else if (touchEndX - touchStartX > 50) window.prevSlide();
    }, false);

    showImageSlide(currentImageSlide);
}

// ============================================
// 5. VIDEO SLIDER (Technology Page)
// ============================================
function initVideoSlider() {
    const videoSlider = document.getElementById('videoSlider');
    if (!videoSlider) return;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.video-slide');
    const dotIndicators = document.querySelectorAll('.dot-indicator');

    const slideData = [
        { title: '60-Second Swapping', desc: 'Eliminate downtime with hot-swap battery technology' },
        { title: 'Crab Walk', desc: 'Independent 4-wheel steering with 90-degree lateral movement' },
        { title: '98% Efficiency', desc: 'Level 5 autonomous driving platform with industry-leading efficiency' }
    ];

    function showSlide(n) {
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;

        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.display = 'none';
        });

        if (slides[currentSlide]) {
            slides[currentSlide].style.display = 'block';
            setTimeout(() => {
                slides[currentSlide].style.opacity = '1';
            }, 10);
        }

        dotIndicators.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.style.background = '#10B981';
                dot.style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';
            } else {
                dot.style.background = 'rgba(255,255,255,0.4)';
                dot.style.boxShadow = 'none';
            }
        });

        const slideTitle = document.getElementById('slideTitle');
        const slideDesc = document.getElementById('slideDesc');
        if (slideTitle) slideTitle.textContent = slideData[currentSlide].title;
        if (slideDesc) slideDesc.textContent = slideData[currentSlide].desc;
    }

    window.goToVideoSlide = n => { currentSlide = n; showSlide(currentSlide); };
    window.nextVideoSlide = () => { currentSlide++; showSlide(currentSlide); };
    window.prevVideoSlide = () => { currentSlide--; showSlide(currentSlide); };

    showSlide(currentSlide);
}

// ============================================
// 6. GSAP ANIMATIONS
// ============================================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const heroText = document.querySelector('.hero-content h1, .hero-text h1');
    if (heroText) {
        gsap.from(heroText.parentNode.children, {
            y: 30, opacity: 0, stagger: 0.2, duration: 1, ease: "power3.out"
        });
    }

    // Impact Counters (if on page)
    const impactSection = document.getElementById('industries') || document.getElementById('impact');
    if (impactSection) {
        const startCounter = (id, target) => {
            let obj = { val: 0 };
            const el = document.getElementById(id);
            if (!el) return;

            gsap.to(obj, {
                val: target,
                duration: 2.5,
                scrollTrigger: {
                    trigger: impactSection,
                    start: "top 80%"
                },
                onUpdate: () => {
                    el.innerText = Math.floor(obj.val) + (id === 'stat3' ? 'M+' : '+');
                }
            });
        };

        startCounter('stat1', 0);
        startCounter('stat2', 50);
        startCounter('stat3', 2);
        startCounter('stat4', 15);
    }
}

// ============================================
// 7. INTERACTIVE LOGO SPLIT
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

    navLogo.addEventListener('mouseenter', () => navLogo.classList.add('split'));
    navLogo.addEventListener('mouseleave', () => navLogo.classList.remove('split'));
}

// ============================================
// 8. THREE.JS VISUALIZATION
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

    scene.add(new THREE.AmbientLight(0xffffff, 1));
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
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// ============================================
// 9. INITIALIZATION
// ============================================
function initAll() {
    initMobileMenu();
    initNavScroll();
    initCustomCursor();
    initImageSlider();
    initVideoSlider();
    initLogoSplit();
    initGSAPAnimations();
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', initAll);
window.addEventListener('load', init3D);
