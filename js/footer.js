/**
 * DDC ANIMATED FOOTER — footer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Injects the full animated footer into every page and runs the GSAP
 * wheel-collision → full-screen expand → page-navigate animation.
 *
 * USAGE (one line per page, before closing </body>):
 * <script src="js/footer.js" data-next="technology.html"></script>
 * (for menu/ subfolder pages, use "../js/footer.js")
 *
 * The data-next attribute on the <script> tag tells the footer which page to
 * navigate to when the wheels collide and fully expand.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── 1. Resolve next-page URL from this <script> tag's data-next attr ── */
  const scriptTag = document.currentScript ||
    document.querySelector('script[src*="footer.js"]');
  const nextPage = (scriptTag && scriptTag.getAttribute('data-next')) || '#';

  /* ── 2. Futuristic EV Wheel SVG ──────────────────────────────────────── */
  function wheelSVG() {
    return `
    <svg viewBox="0 0 200 200" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Tyre gradient for depth -->
        <radialGradient id="tyreGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%"   stop-color="#2a2a2a"/>
          <stop offset="100%" stop-color="#080808"/>
        </radialGradient>

        <!-- Rim face gradient -->
        <radialGradient id="rimGrad" cx="48%" cy="42%" r="52%">
          <stop offset="0%"   stop-color="#212629"/>
          <stop offset="100%" stop-color="#0b0d0e"/>
        </radialGradient>

        <!-- Spoke glow filter -->
        <filter id="spokeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <!-- Center cap glow -->
        <filter id="capGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- ── TYRE ── -->
      <circle cx="100" cy="100" r="98" fill="url(#tyreGrad)"/>
      <!-- Subtle tread ring -->
      <circle cx="100" cy="100" r="94" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-dasharray="3 3"/>
      <circle cx="100" cy="100" r="90" fill="none" stroke="#222" stroke-width="0.5"/>

      <!-- ── RIM OUTER RING (class=wheel-rim — fades on zoom) ── -->
      <g class="wheel-rim">
        <!-- Rim barrel -->
        <circle cx="100" cy="100" r="82" fill="url(#rimGrad)"/>
        
        <!-- Inner rim step -->
        <circle cx="100" cy="100" r="78" fill="none" stroke="#2a3035" stroke-width="2"/>

        <!-- Brake Disc behind spokes -->
        <circle cx="100" cy="100" r="74" fill="#181a1b" stroke="#282d30" stroke-width="6"/>
        <circle cx="100" cy="100" r="62" fill="none" stroke="#1f2326" stroke-width="0.5"/>
        <circle cx="100" cy="100" r="50" fill="none" stroke="#1f2326" stroke-width="0.5"/>

        <!-- Brake Caliper (Right side) -->
        <path d="M 162,75 Q 172,100 162,125 L 175,128 Q 185,100 175,72 Z" fill="#121415" stroke="#2a3035" stroke-width="1"/>

        <!-- 5 CYBER-SPOKES (Asymmetrical Y-Split based on reference) -->
        <g>
          ${[0, 72, 144, 216, 288].map(angle => `
          <g transform="rotate(${angle} 100 100)">
            <!-- Left branch (Lighter Metallic) -->
            <polygon points="100,65 85,25 70,30 85,75" fill="#3a4146"/>
            <!-- Left branch bevel highlight -->
            <line x1="85" y1="25" x2="100" y2="65" stroke="#525c63" stroke-width="1"/>
            
            <!-- Right branch (Darker Metallic) -->
            <polygon points="100,65 110,22 125,28 110,75" fill="#202427"/>
            <!-- Right branch inner shadow -->
            <line x1="110" y1="22" x2="100" y2="65" stroke="#15181a" stroke-width="1"/>
            
            <!-- Center base junction -->
            <polygon points="85,75 110,75 100,65" fill="#111315"/>
            
            <!-- Cyan Accent Hook (On the outer trailing edge) -->
            <path d="M 70,30 L 80,26 L 82,30 L 74,33 L 87,72 L 83,74 Z" fill="#99eff0" filter="url(#spokeGlow)" opacity="0.95"/>
          </g>
          `).join('')}
        </g>

        <!-- Inner Hub Cover -->
        <circle cx="100" cy="100" r="32" fill="#16191b" stroke="#2a3035" stroke-width="1.5"/>

        <!-- Lug Nuts -->
        <g>
          ${[0, 72, 144, 216, 288].map(angle => `
          <circle cx="100" cy="80" r="3" fill="#0a0a0a" stroke="#222" stroke-width="1" transform="rotate(${angle} 100 100)"/>
          `).join('')}
        </g>

        <!-- ── CENTER CAP (inside .wheel-rim — hides on zoom) ── -->
        <circle cx="100" cy="100" r="16" fill="#0d1113" stroke="#99eff0" stroke-width="0.8" opacity="0.9"/>
        <circle cx="100" cy="100" r="14" fill="#111618"/>

        <!-- DDC Typographic Interlocking Logo -->
        <g text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900">
          <!-- Main center D -->
          <text x="100" y="106" font-size="16" fill="#99eff0" opacity="0.95">D</text>
          
          <!-- Background strokes for interlocking cutout effect (matches cap background) -->
          <text x="91" y="100" font-size="9" fill="#111618" stroke="#111618" stroke-width="2" stroke-linejoin="round">D</text>
          <text x="109" y="100" font-size="9" fill="#111618" stroke="#111618" stroke-width="2" stroke-linejoin="round">C</text>
          
          <!-- Smaller interlocking D and C -->
          <text x="91" y="100" font-size="9" fill="#99eff0" opacity="0.95">D</text>
          <text x="109" y="100" font-size="9" fill="#99eff0" opacity="0.95">C</text>
        </g>

        <!-- Subtle center glow under the text -->
        <circle cx="100" cy="100" r="3" fill="#99eff0" opacity="0.15" filter="url(#capGlow)"/>
      </g>
      <!-- END .wheel-rim -->
    </svg>`;
  }

  /* ── 3. Build footer HTML ────────────────────────────────────────────── */
  const footerHTML = `
<footer id="ddc-footer"
  class="relative w-full bg-dark text-primary border-t border-accent overflow-hidden"
  style="min-height: clamp(500px, 100vh, 900px); display: flex; align-items: center; justify-content: center; padding: 0 1rem;">

  <!-- ░░ LEFT WHEEL ░░ -->
  <div class="footer-wheel left-wheel absolute rounded-full z-40 bg-[#050505] flex items-center justify-center will-change-transform"
       style="width: clamp(80px, 9vw, 144px); height: clamp(80px, 9vw, 144px);
              top: 0; left: clamp(10%, 15%, 25%);
              transform: translate(50%,-50%);">
    ${wheelSVG()}
  </div>

  <!-- ░░ RIGHT WHEEL ░░ -->
  <div class="footer-wheel right-wheel absolute rounded-full z-40 bg-[#050505] flex items-center justify-center will-change-transform"
       style="width: clamp(80px, 9vw, 144px); height: clamp(80px, 9vw, 144px);
              top: 0; right: clamp(10%, 15%, 25%);
              transform: translate(50%,-50%);">
    ${wheelSVG()}
  </div>

  <!-- ░░ FULL-SCREEN FLASH OVERLAY ░░ -->
  <div class="next-page-reveal" style="
    position: absolute; inset: 0; z-index: 60;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; background: #050505;">
    <span style="color: #d3e4df; letter-spacing: 0.5em; font-size: clamp(0.75rem, 2vw, 1.25rem);
                 font-family: var(--font-outfit); text-transform: uppercase; margin-bottom: 1rem; opacity: 0.7;"></span>
    <h2 style="font-family: var(--font-playfair); font-size: clamp(3.5rem, 12vw, 8rem);
               color: #99eff0; font-weight: 700; letter-spacing: 0.15em;
               text-shadow: 0 0 15px rgba(153,239,240,0.5);"></h2>
  </div>

  <!-- ░░ MAIN FOOTER CONTENT ░░ -->
  <div class="footer-content relative z-20 w-full max-w-7xl mx-auto"
       style="padding-top: clamp(80px, 12vw, 140px);">

    <!-- Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(140px, 100%), 1fr)); gap: clamp(1.5rem, 4vw, 3rem);
                border-bottom: 1px solid rgba(153,239,240,0.15); padding-bottom: 2.5rem;">

      <!-- Brand -->
      <div>
        <div style="font-family: var(--font-playfair); font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 0.5rem;">DDC</div>
        <p style="font-size: 0.875rem; opacity: 0.75; line-height: 1.6;">The New Celestial Beginning</p>
        <p style="font-size: 0.7rem; opacity: 0.5; margin-top: 0.5rem;">Founder: Aditya Purushotham</p>
      </div>

      <!-- Innovation -->
      <div>
        <h4 style="font-weight: 700; margin-bottom: 1rem; letter-spacing: 0.05em;">Innovation</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.875rem; opacity: 0.8;">
          <li><a href="${_rel('menu/swapping.html', nextPage)}" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Battery Swapping</a></li>
          <li><a href="${_rel('technology.html', nextPage)}" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Crab-Walk Steering</a></li>
          <li><a href="${_rel('product.html', nextPage)}" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Retrofitting</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 style="font-weight: 700; margin-bottom: 1rem; letter-spacing: 0.05em;">Company</h4>
        <ul style="list-style: none; padding: 0; margin: 0 0 1rem; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.875rem; opacity: 0.8;">
          <li><a href="${_rel('menu/about.html', nextPage)}" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Our Story</a></li>
          <li><a href="${_rel('menu/contact.html', nextPage)}" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Invest</a></li>
        </ul>
        <div style="display: flex; gap: 0.75rem; margin-top: 0.75rem;">
          <a href="#" class="ddc-icon-btn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#" class="ddc-icon-btn"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="ddc-icon-btn"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>

      <!-- Newsletter -->
      <div>
        <h4 style="font-weight: 700; margin-bottom: 0.5rem; letter-spacing: 0.05em;">Stay Updated</h4>
        <p style="font-size: 0.85rem; opacity: 0.75; margin-bottom: 1rem;">Join the movement towards a greener future.</p>
        <form class="newsletter-form" id="ddc-newsletter-form">
          <input type="hidden" name="type" value="newsletter">
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <input type="email" name="email" placeholder="EMAIL ADDRESS" required
              style="background: transparent; border: none; border-bottom: 1px solid rgba(153,239,240,0.4);
                     padding: 0.4rem 0; font-size: 0.75rem; letter-spacing: 0.12em; outline: none;
                     color: #d3e4df; font-family: var(--font-outfit); width: 100%;"
              onfocus="this.style.borderBottomColor='#99eff0'" onblur="this.style.borderBottomColor='rgba(153,239,240,0.4)'"
              placeholder="EMAIL ADDRESS">
            <input type="text" name="message" placeholder="MESSAGE"
              style="background: transparent; border: none; border-bottom: 1px solid rgba(153,239,240,0.4);
                     padding: 0.4rem 0; font-size: 0.75rem; letter-spacing: 0.12em; outline: none;
                     color: #d3e4df; font-family: var(--font-outfit); width: 100%;"
              onfocus="this.style.borderBottomColor='#99eff0'" onblur="this.style.borderBottomColor='rgba(153,239,240,0.4)'"
              placeholder="MESSAGE">
            <button type="submit" style="background: none; border: none; color: #99eff0; font-size: 0.7rem;
                     letter-spacing: 0.2em; font-weight: 700; text-transform: uppercase; cursor: pointer;
                     align-self: flex-start; padding: 0; font-family: var(--font-outfit);
                     transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#99eff0'">
              Join →
            </button>
          </div>
          <div style="display: none;"><input type="text" name="website_url" tabindex="-1" autocomplete="off"></div>
        </form>
      </div>
    </div>

    <!-- Bottom strip -->
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;
                padding: 1.5rem 0; gap: 1rem; font-size: 0.7rem; opacity: 0.5; letter-spacing: 0.08em;">
      <p>© 2026 Dark Dragons Caelestis Pvt Ltd. All rights reserved.</p>
      <div style="display: flex; gap: 1.5rem;">
        <a href="#" style="color: inherit; text-decoration: none;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Privacy Policy</a>
        <a href="#" style="color: inherit; text-decoration: none;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Terms of Service</a>
      </div>
    </div>
  </div>

</footer>`;

  /* ── 4. Helper: resolve URL relative to current page ─────────────────── */
  function _rel(target, currentNextPage) {
    const src = (scriptTag && scriptTag.getAttribute('src')) || '';
    const isInMenu = src.startsWith('../') || window.location.pathname.includes('/menu/');
    if (isInMenu && !target.startsWith('http') && !target.startsWith('/')) {
      if (target.startsWith('menu/')) {
        return target.replace('menu/', '');
      }
      return '../' + target;
    }
    return target;
  }

  /* ── 5. Inject footer just before </body> ────────────────────────────── */
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ── 6. Icon-btn base styles ─────────────────────────────────────────── */
  if (!document.getElementById('ddc-footer-styles')) {
    const style = document.createElement('style');
    style.id = 'ddc-footer-styles';
    style.textContent = `
      .ddc-icon-btn {
        display: inline-flex; align-items: center; justify-content: center;
        width: 2.25rem; height: 2.25rem; border-radius: 50%;
        border: 1px solid rgba(153,239,240,0.25);
        color: rgba(211,228,223,0.6); text-decoration: none;
        font-size: 0.85rem; transition: all 0.25s;
      }
      .ddc-icon-btn:hover {
        border-color: #99eff0; color: #99eff0;
        background: rgba(83, 87, 87, 0.08);
        transform: scale(1.1);
      }

      /* Wheel rim — transitions out smoothly during zoom */
      .footer-wheel .wheel-rim {
        transition: opacity 0.3s ease;
        transform-origin: center;
      }

      #ddc-footer input::placeholder { color: rgba(155, 174, 169, 0.35); }
      body.ddc-exiting { opacity: 0 !important; transition: opacity 0.1s ease !important; }

      @media (min-width: 769px) {
        .footer-wheel { display: flex !important; visibility: visible !important; opacity: 1 !important; }
      }

      @media (max-width: 768px) {
        #ddc-footer { min-height: clamp(auto, 100vh, 100vh) !important; padding: 2rem 1rem !important; }
        .footer-wheel { display: none !important; visibility: hidden !important; }
        .footer-content { padding-top: 2rem !important; }
        .footer-content > div > div { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        .next-page-reveal h2 { font-size: clamp(2.5rem, 8vw, 4rem) !important; }
      }

      @media (max-width: 640px) {
        .footer-wheel { width: 64px !important; height: 64px !important; display: none !important; }
        .left-wheel { left: 15% !important; }
        .right-wheel { right: 15% !important; }
        .ddc-icon-btn { width: 2rem !important; height: 2rem !important; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── 7. GSAP animation ───────────────────────────────────────────────── */
  function initWheelAnimation() {
    const isMobile = window.innerWidth <= 768;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initWheelAnimation, 120);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const footer      = document.getElementById('ddc-footer');
    const leftWheel   = footer.querySelector('.left-wheel');
    const rightWheel  = footer.querySelector('.right-wheel');
    const reveal      = footer.querySelector('.next-page-reveal');
    const content     = footer.querySelector('.footer-content');

    /* Grab all .wheel-rim groups from both wheels */
    const rimGroups   = footer.querySelectorAll('.wheel-rim');

    if (isMobile) return;
    if (!leftWheel || !rightWheel) return;

    gsap.set(leftWheel,  { xPercent: -50, yPercent: 0 });
    gsap.set(rightWheel, { xPercent:  50, yPercent: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ddc-footer',
        start: 'top top',
        end: '+=280%',
        pin: true,
        pinSpacing: true,
        scrub: 1.4,
        anticipatePin: 1,
      }
    });

    tl
      /* Phase 1 (0–2s): wheels roll toward centre */
      .to(leftWheel, {
        left: '50%', top: '50%',
        rotation: 720,
        duration: 2,
        ease: 'power2.inOut',
        force3D: true
      }, 0)
      .to(rightWheel, {
        right: '50%', top: '50%',
        rotation: -720,
        duration: 2,
        ease: 'power2.inOut',
        force3D: true
      }, 0)

      /* Phase 1b: fade footer text */
      .to(content, {
        opacity: 0,
        y: 40,
        scale: 0.94,
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0.25)

      /* Phase 2 (2–4.5s): wheels EXPAND to fill viewport */
      .to([leftWheel, rightWheel], {
        scale: 50,
        duration: 2.5,
        ease: 'power3.inOut',
        force3D: true
      }, 2)

      /*
       * Phase 2b: fade out ONLY the rim/spokes as the wheel expands —
       * the tyre fill + center cap remain, giving a clean dark flood-fill.
       * Starts at t=2.2 (just after expansion begins) and completes by t=3.2.
       */
      .to(rimGroups, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      }, 2.2)

      /* Phase 3 (3.5–4.4s): reveal overlay text */
      .to(reveal, {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out'
      }, 3.5)

      /* Phase 4: navigate */
      .call(() => {
        const st = tl.scrollTrigger;
        // Check progress slightly earlier (0.90) instead of right at the end (0.995)
        if (st && st.progress >= 0.90) {
          document.body.classList.add('ddc-exiting');
          setTimeout(() => {
            window.location.href = nextPage;
          }, 100); // Reduced this timeout from 380ms to 100ms
        }
      }, null, 4.2); // Evaluate Phase 4 earlier in the timeline (was 4.45)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWheelAnimation);
  } else {
    setTimeout(initWheelAnimation, 0);
  }

})();