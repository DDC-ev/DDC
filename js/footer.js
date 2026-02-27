/**
 * DDC ANIMATED FOOTER — footer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Injects the full animated footer into every page and runs the GSAP
 * wheel-collision → full-screen expand → page-navigate animation.
 *
 * USAGE (one line per page, before closing </body>):
 *   <script src="js/footer.js" data-next="technology.html"></script>
 *   (for menu/ subfolder pages, use "../js/footer.js")
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

  /* ── 2. Wheel SVG helper ─────────────────────────────────────────────── */
  function wheelSVG() {
    return `<svg viewBox="0 0 200 200" class="w-full h-full text-accent drop-shadow-[0_0_12px_rgba(153,239,240,0.25)]">
      <circle cx="100" cy="100" r="96" fill="#050505" stroke="#111" stroke-width="8"/>
      <g class="wheel-inner">
        <circle cx="100" cy="100" r="86" fill="#151718" stroke="#222" stroke-width="3"/>
        <circle cx="100" cy="100" r="78" fill="#202324"/>
        <g fill="#050505">
          <path d="M105 85 L125 30 A 75 75 0 0 1 155 50 L112 95 Z"/>
          <path d="M105 85 L125 30 A 75 75 0 0 1 155 50 L112 95 Z" transform="rotate(72 100 100)"/>
          <path d="M105 85 L125 30 A 75 75 0 0 1 155 50 L112 95 Z" transform="rotate(144 100 100)"/>
          <path d="M105 85 L125 30 A 75 75 0 0 1 155 50 L112 95 Z" transform="rotate(216 100 100)"/>
          <path d="M105 85 L125 30 A 75 75 0 0 1 155 50 L112 95 Z" transform="rotate(288 100 100)"/>
        </g>
        <g fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6" stroke-linecap="round">
          <path d="M105 85 L125 30"/>
          <path d="M105 85 L125 30" transform="rotate(72 100 100)"/>
          <path d="M105 85 L125 30" transform="rotate(144 100 100)"/>
          <path d="M105 85 L125 30" transform="rotate(216 100 100)"/>
          <path d="M105 85 L125 30" transform="rotate(288 100 100)"/>
        </g>
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="1 6" opacity="0.4"/>
        <circle cx="100" cy="100" r="22" fill="#151718" stroke="#111" stroke-width="2"/>
        <circle cx="100" cy="100" r="14" fill="#0a0a0a"/>
        <polygon points="100,92 107,104 93,104" fill="currentColor" opacity="0.8"/>
      </g>
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

  <!-- ░░ FULL-SCREEN FLASH OVERLAY (shown when wheels expand) ░░ -->
  <div class="next-page-reveal" style="
    position: absolute; inset: 0; z-index: 60;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; background: #050505;">
    <span style="color: #d3e4df; letter-spacing: 0.5em; font-size: clamp(0.75rem, 2vw, 1.25rem);
                 font-family: 'Outfit', sans-serif; text-transform: uppercase; margin-bottom: 1rem; opacity: 0.7;">Welcome to</span>
    <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 12vw, 8rem);
               color: #99eff0; font-weight: 700; letter-spacing: 0.15em;
               text-shadow: 0 0 15px rgba(153,239,240,0.5);">DDC</h2>
  </div>

  <!-- ░░ MAIN FOOTER CONTENT ░░ -->
  <div class="footer-content relative z-20 w-full max-w-7xl mx-auto"
       style="padding-top: clamp(80px, 12vw, 140px);">

    <!-- Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem;
                border-bottom: 1px solid rgba(153,239,240,0.15); padding-bottom: 2.5rem;">

      <!-- Brand -->
      <div>
        <div style="font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 0.5rem;">DDC</div>
        <p style="font-size: 0.875rem; opacity: 0.75; line-height: 1.6;">The New Celestial Beginning</p>
        <p style="font-size: 0.7rem; opacity: 0.5; margin-top: 0.5rem;">Founder: Aditya Purushotham</p>
      </div>

      <!-- Innovation -->
      <div>
        <h4 style="font-weight: 700; margin-bottom: 1rem; letter-spacing: 0.05em;">Innovation</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.875rem; opacity: 0.8;">
          <li><a href="${_rel('product.html', nextPage)}" style="color: inherit; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#99eff0'" onmouseout="this.style.color='inherit'">Battery Swapping</a></li>
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
                     color: #d3e4df; font-family: 'Outfit', sans-serif; width: 100%;"
              onfocus="this.style.borderBottomColor='#99eff0'" onblur="this.style.borderBottomColor='rgba(153,239,240,0.4)'"
              placeholder="EMAIL ADDRESS">
            <input type="text" name="message" placeholder="MESSAGE"
              style="background: transparent; border: none; border-bottom: 1px solid rgba(153,239,240,0.4);
                     padding: 0.4rem 0; font-size: 0.75rem; letter-spacing: 0.12em; outline: none;
                     color: #d3e4df; font-family: 'Outfit', sans-serif; width: 100%;"
              onfocus="this.style.borderBottomColor='#99eff0'" onblur="this.style.borderBottomColor='rgba(153,239,240,0.4)'"
              placeholder="MESSAGE">
            <button type="submit" style="background: none; border: none; color: #99eff0; font-size: 0.7rem;
                     letter-spacing: 0.2em; font-weight: 700; text-transform: uppercase; cursor: pointer;
                     align-self: flex-start; padding: 0; font-family: 'Outfit', sans-serif;
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
    // Detect if we're inside the menu/ subfolder by checking the script src
    const src = (scriptTag && scriptTag.getAttribute('src')) || '';
    const isInMenu = src.startsWith('../') || window.location.pathname.includes('/menu/');
    if (isInMenu && !target.startsWith('http') && !target.startsWith('/')) {
      // Already in menu/ — strip "menu/" prefix if present, add ../
      if (target.startsWith('menu/')) {
        return target.replace('menu/', '');
      }
      return '../' + target;
    }
    return target;
  }

  /* ── 5. Inject footer just before </body> ────────────────────────────── */
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ── 6. Icon-btn base styles (injected once) ─────────────────────────── */
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
        background: rgba(153,239,240,0.08);
        transform: scale(1.1);
      }
      /* Newsletter form placeholder colour fix */
      #ddc-footer input::placeholder { color: rgba(211,228,223,0.35); }
      /* Page-exit fade */
      body.ddc-exiting { opacity: 0 !important; transition: opacity 0.35s ease !important; }
    `;
    document.head.appendChild(style);
  }

  /* ── 7. Run GSAP animation once GSAP + ScrollTrigger are loaded ──────── */
  function initWheelAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Retry in 120ms — GSAP may not yet be loaded
      setTimeout(initWheelAnimation, 120);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const footer    = document.getElementById('ddc-footer');
    const leftWheel = footer.querySelector('.left-wheel');
    const rightWheel = footer.querySelector('.right-wheel');
    const reveal    = footer.querySelector('.next-page-reveal');
    const content   = footer.querySelector('.footer-content');

    if (!leftWheel || !rightWheel) return;

    /* Initial positions (GSAP takes over from here) */
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
      /* Phase 1 (0–2s): wheels roll in from corners toward centre */
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

      /* Phase 1b (0.25–1.75s): fade-out footer text while wheels travel */
      .to(content, {
        opacity: 0,
        y: 40,
        scale: 0.94,
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0.25)

      /* Phase 2 (2–4.5s): both wheels EXPAND to fill viewport */
      .to([leftWheel, rightWheel], {
        scale: 50,
        duration: 2.5,
        ease: 'power3.inOut',
        force3D: true
      }, 2)

      /* Phase 2b: fade spokes out as wheels balloon */
      .to(footer.querySelectorAll('.wheel-inner'), {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.inOut'
      }, 2)

      /* Phase 3 (3.5–4.4s): reveal "Welcome to DDC" text over black screen */
      .to(reveal, {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out'
      }, 3.5)

      /* Phase 4 (4.5s): navigate — called after scrub completes naturally */
      .call(() => {
        // Only navigate if the user has truly scrolled to the end
        const st = tl.scrollTrigger;
        if (st && st.progress >= 0.995) {
          document.body.classList.add('ddc-exiting');
          setTimeout(() => {
            window.location.href = nextPage;
          }, 380);
        }
      }, null, 4.45);
  }

  /* Start wiring up after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWheelAnimation);
  } else {
    // Already loaded (script is deferred or at bottom)
    setTimeout(initWheelAnimation, 0);
  }

})();
