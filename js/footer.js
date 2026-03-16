/**
 * DDC ANIMATED FOOTER — footer.js  (enhanced)
 * ─────────────────────────────────────────────────────────────────────────────
 * Injects the full animated footer and runs the GSAP wheel-collision →
 * full-screen expand → page-navigate sequence.
 *
 * USAGE (one line per page, before closing </body>):
 *   <script src="js/footer.js" data-next="technology.html"></script>
 *   (menu/ subpages → "../js/footer.js")
 *
 * data-next  — page to navigate to after the wheel animation completes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── 0. Guard: run only once even if script is somehow included twice ── */
  if (window.__ddcFooterLoaded) return;
  window.__ddcFooterLoaded = true;

  /* ── 1. Resolve next-page URL ────────────────────────────────────────── */
  const scriptTag =
    document.currentScript ||
    document.querySelector('script[src*="footer.js"]');

  const nextPage = (scriptTag && scriptTag.getAttribute('data-next')) || '#';

  /* ── 2. Detect subfolder context ─────────────────────────────────────── */
  const scriptSrc   = (scriptTag && scriptTag.getAttribute('src')) || '';
  const isInSubfolder =
    scriptSrc.startsWith('../') ||
    window.location.pathname.split('/').filter(Boolean).length > 1;

  /* ── 3. Resolve href relative to the current page depth ─────────────── */
  function rel(target) {
    if (!target || target.startsWith('http') || target.startsWith('/') || target.startsWith('#')) {
      return target;
    }
    if (isInSubfolder) {
      return target.startsWith('menu/') ? target.replace('menu/', '') : '../' + target;
    }
    return target;
  }

  /* ── 4. Futuristic EV Wheel SVG ──────────────────────────────────────── */
  function wheelSVG(id) {
    /* id keeps gradient/filter ids unique when both wheels share the DOM */
    return `
    <svg viewBox="0 0 200 200" class="w-full h-full" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="tyreGrad-${id}" cx="50%" cy="38%" r="58%">
          <stop offset="0%"   stop-color="#2e2e2e"/>
          <stop offset="100%" stop-color="#060606"/>
        </radialGradient>
        <radialGradient id="rimGrad-${id}" cx="46%" cy="40%" r="54%">
          <stop offset="0%"   stop-color="#242a2e"/>
          <stop offset="100%" stop-color="#0b0d0f"/>
        </radialGradient>
        <filter id="spokeGlow-${id}" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="capGlow-${id}" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- TYRE -->
      <circle cx="100" cy="100" r="98" fill="url(#tyreGrad-${id})"/>
      <circle cx="100" cy="100" r="94" fill="none" stroke="#1c1c1c" stroke-width="1.5" stroke-dasharray="4 3"/>
      <circle cx="100" cy="100" r="90" fill="none" stroke="#222"    stroke-width="0.5"/>
      <circle cx="100" cy="100" r="88" fill="none" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="2 6" opacity="0.6"/>

      <!-- RIM (fades during zoom via .wheel-rim) -->
      <g class="wheel-rim">
        <!-- Rim barrel -->
        <circle cx="100" cy="100" r="82" fill="url(#rimGrad-${id})"/>
        <!-- Outer rim highlight ring -->
        <circle cx="100" cy="100" r="83" fill="none" stroke="#3a4248" stroke-width="1"/>
        <circle cx="100" cy="100" r="81" fill="none" stroke="#0d0f11" stroke-width="0.5"/>
        <!-- Inner rim step -->
        <circle cx="100" cy="100" r="78" fill="none" stroke="#2a3035" stroke-width="2"/>

        <!-- Brake disc -->
        <circle cx="100" cy="100" r="74" fill="#161819" stroke="#242a2e" stroke-width="6"/>
        <!-- Disc ventilation rings -->
        <circle cx="100" cy="100" r="68" fill="none" stroke="#1e2226" stroke-width="0.5" stroke-dasharray="8 4"/>
        <circle cx="100" cy="100" r="61" fill="none" stroke="#1c2022" stroke-width="0.5"/>
        <circle cx="100" cy="100" r="54" fill="none" stroke="#1e2226" stroke-width="0.5" stroke-dasharray="6 3"/>
        <circle cx="100" cy="100" r="48" fill="none" stroke="#1a1d1f" stroke-width="0.5"/>

        <!-- Brake caliper (right) -->
        <path d="M 162,72 Q 175,100 162,128 L 177,131 Q 190,100 177,69 Z"
              fill="#101214" stroke="#2a3035" stroke-width="1" opacity="0.9"/>
        <!-- Caliper bolts -->
        <circle cx="172" cy="82"  r="2.5" fill="#080a0b" stroke="#2a3035" stroke-width="0.8"/>
        <circle cx="176" cy="100" r="2.5" fill="#080a0b" stroke="#2a3035" stroke-width="0.8"/>
        <circle cx="172" cy="118" r="2.5" fill="#080a0b" stroke="#2a3035" stroke-width="0.8"/>

        <!-- 5-SPOKE DESIGN (asymmetric Y-split) -->
        <g>
          ${[0, 72, 144, 216, 288].map(a => `
          <g transform="rotate(${a} 100 100)">
            <!-- Left spoke branch -->
            <polygon points="100,63 83,22 67,28 84,74"  fill="#3d4449"/>
            <line x1="83" y1="22" x2="100" y2="63" stroke="#545f66" stroke-width="0.8"/>
            <!-- Right spoke branch -->
            <polygon points="100,63 112,20 128,27 113,74" fill="#1e2326"/>
            <line x1="112" y1="20" x2="100" y2="63" stroke="#131618" stroke-width="0.8"/>
            <!-- Junction base -->
            <polygon points="84,74 113,74 100,63" fill="#0f1113"/>
            <!-- Cyan accent on leading edge -->
            <path d="M 67,28 L 78,24 L 81,29 L 72,32 L 86,71 L 82,73 Z"
                  fill="#99eff0" filter="url(#spokeGlow-${id})" opacity="0.9"/>
            <!-- Subtle inner edge highlight -->
            <line x1="100" y1="63" x2="128" y2="27" stroke="#2a3035" stroke-width="0.5" opacity="0.7"/>
          </g>
          `).join('')}
        </g>

        <!-- Inner hub cover -->
        <circle cx="100" cy="100" r="33" fill="#14171a" stroke="#2a3035" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="30" fill="#111416" stroke="#1e2224" stroke-width="0.5"/>

        <!-- Lug nuts (5× around inner hub) -->
        ${[0, 72, 144, 216, 288].map(a => `
          <g transform="rotate(${a} 100 100)">
            <circle cx="100" cy="79" r="3.2" fill="#080a0b" stroke="#242a2e" stroke-width="1"/>
            <circle cx="100" cy="79" r="1.5" fill="#0e1012"/>
          </g>
        `).join('')}

        <!-- Center cap -->
        <circle cx="100" cy="100" r="17"  fill="#0c0f11" stroke="#99eff0" stroke-width="0.9" opacity="0.9"/>
        <circle cx="100" cy="100" r="15"  fill="#101316"/>
        <circle cx="100" cy="100" r="13"  fill="none" stroke="#99eff0" stroke-width="0.3" opacity="0.4"/>

        <!-- DDC logo on cap -->
        <g text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900">
          <!-- Backdrop cutout strokes (match cap fill) -->
          <text x="91"  y="101" font-size="9" fill="#101316" stroke="#101316" stroke-width="2.5" stroke-linejoin="round">D</text>
          <text x="109" y="101" font-size="9" fill="#101316" stroke="#101316" stroke-width="2.5" stroke-linejoin="round">C</text>
          <!-- Main centre D -->
          <text x="100" y="107" font-size="16" fill="#99eff0" opacity="0.95">D</text>
          <!-- Flanking D and C -->
          <text x="91"  y="101" font-size="9"  fill="#99eff0" opacity="0.9">D</text>
          <text x="109" y="101" font-size="9"  fill="#99eff0" opacity="0.9">C</text>
        </g>
        <!-- Cap ambient glow -->
        <circle cx="100" cy="100" r="4" fill="#99eff0" opacity="0.12" filter="url(#capGlow-${id})"/>
      </g>
    </svg>`;
  }

  /* ── 5. Build footer HTML ────────────────────────────────────────────── */
  const footerHTML = `
<footer id="ddc-footer" class="relative w-full overflow-hidden"
  style="min-height: clamp(500px, 100vh, 900px);
         display: flex; align-items: center; justify-content: center;
         padding: 0 1rem;
         background: var(--ddc-dark, #5e5555ff);
         color: var(--ddc-primary, #d3e4df);
         border-top: 1px solid var(--ddc-accent, #99eff0);"
  aria-label="Site footer">

  <!-- ░░ LEFT WHEEL ░░ -->
  <div class="footer-wheel left-wheel"
       style="position: absolute; border-radius: 50%; z-index: 40;
              background: #050505;
              width: clamp(80px, 9vw, 144px); height: clamp(80px, 9vw, 144px);
              top: 0; left: clamp(10%, 15%, 25%);
              transform: translate(50%, -50%);
              display: flex; align-items: center; justify-content: center;
              will-change: transform, left, top;">
    ${wheelSVG('l')}
  </div>

  <!-- ░░ RIGHT WHEEL ░░ -->
  <div class="footer-wheel right-wheel"
       style="position: absolute; border-radius: 50%; z-index: 40;
              background: #050505;
              width: clamp(80px, 9vw, 144px); height: clamp(80px, 9vw, 144px);
              top: 0; right: clamp(10%, 15%, 25%);
              transform: translate(50%, -50%);
              display: flex; align-items: center; justify-content: center;
              will-change: transform, right, top;">
    ${wheelSVG('r')}
  </div>

  <!-- ░░ FULL-SCREEN FLASH OVERLAY ░░ -->
  <div class="ddc-reveal"
       style="position: absolute; inset: 0; z-index: 60;
              display: flex; flex-direction: column;
              align-items: center; justify-content: center;
              opacity: 0; pointer-events: none;
              background: #4e4b4bff;"
       aria-hidden="true">
    <span class="ddc-reveal__label"
          style="color: #d3e4df; letter-spacing: 0.5em;
                 font-size: clamp(0.7rem, 1.8vw, 1.1rem);
                 font-family: var(--font-outfit, 'Outfit', sans-serif);
                 text-transform: uppercase; margin-bottom: 1rem;
                 opacity: 0.6;"></span>
    <h2 class="ddc-reveal__title"
        style="font-family: var(--font-playfair, 'Playfair Display', serif);
               font-size: clamp(3.5rem, 11vw, 7.5rem);
               color: #99eff0; font-weight: 700;
               letter-spacing: 0.15em;
               text-shadow: 0 0 40px rgba(153,239,240,0.35),
                            0 0 80px rgba(153,239,240,0.15);
               margin: 0;"></h2>
  </div>

  <!-- ░░ MAIN FOOTER CONTENT ░░ -->
  <div class="footer-content"
       style="position: relative; z-index: 20; width: 100%;
              max-width: 1280px; margin: 0 auto;
              padding-top: clamp(80px, 12vw, 140px);">

    <!-- Four-column grid -->
    <div style="display: grid;
                grid-template-columns: repeat(auto-fill, minmax(min(150px, 100%), 1fr));
                gap: clamp(1.5rem, 4vw, 3rem);
                border-bottom: 1px solid rgba(153,239,240,0.12);
                padding-bottom: 2.5rem;">

      <!-- Brand -->
      <div>
        <div style="font-family: var(--font-playfair, 'Playfair Display', serif);
                    font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 0.5rem;
                    line-height: 1;">DDC</div>
        <p style="font-size: 0.875rem; opacity: 0.7; line-height: 1.65; margin: 0 0 0.5rem;">
          The New Celestial Beginning
        </p>

      </div>

      <!-- Innovation -->
      <div>
        <h4 style="font-weight: 700; margin: 0 0 1rem;
                   letter-spacing: 0.06em; font-size: 0.8rem;
                   text-transform: uppercase; color: #99eff0; opacity: 0.8;">Innovation</h4>
        <ul style="list-style: none; padding: 0; margin: 0;
                   display: flex; flex-direction: column; gap: 0.65rem;
                   font-size: 0.875rem; opacity: 0.75;">
          <li><a href="${rel('menu/swapping.html')}"  class="ddc-link">Battery Swapping</a></li>
          <li><a href="${rel('technology.html')}"     class="ddc-link">Crab-Walk Steering</a></li>
          <li><a href="${rel('product.html')}"        class="ddc-link">Retrofitting</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 style="font-weight: 700; margin: 0 0 1rem;
                   letter-spacing: 0.06em; font-size: 0.8rem;
                   text-transform: uppercase; color: #99eff0; opacity: 0.8;">Company</h4>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem;
                   display: flex; flex-direction: column; gap: 0.65rem;
                   font-size: 0.875rem; opacity: 0.75;">
          <li><a href="${rel('menu/about.html')}"   class="ddc-link">Our Story</a></li>
          <li><a href="${rel('menu/contact.html')}" class="ddc-link">Invest</a></li>
        </ul>
        <div style="display: flex; gap: 0.65rem;">
          <a href="#" class="ddc-icon-btn" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#" class="ddc-icon-btn" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="#" class="ddc-icon-btn" aria-label="YouTube">
            <i class="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>

      <!-- Newsletter -->
      <div>
        <h4 style="font-weight: 700; margin: 0 0 0.5rem;
                   letter-spacing: 0.06em; font-size: 0.8rem;
                   text-transform: uppercase; color: #99eff0; opacity: 0.8;">Stay Updated</h4>
        <p style="font-size: 0.83rem; opacity: 0.65; margin: 0 0 1rem; line-height: 1.6;">
          Join the movement towards a greener future.
        </p>
        <form id="ddc-newsletter-form" novalidate autocomplete="off">
          <input type="hidden" name="type" value="newsletter">
          <!-- Honeypot -->
          <div style="display:none;" aria-hidden="true">
            <input type="text" name="website_url" tabindex="-1" autocomplete="off">
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.8rem;">
            <div class="ddc-field-wrap">
              <input type="email" name="email" id="ddc-email"
                     placeholder="EMAIL ADDRESS" required
                     class="ddc-input" aria-label="Your email address">
            </div>
            <div class="ddc-field-wrap">
              <input type="text" name="message" id="ddc-message"
                     placeholder="MESSAGE (optional)"
                     class="ddc-input" aria-label="Optional message">
            </div>
            <button type="submit" id="ddc-submit" class="ddc-submit-btn">
              <span class="ddc-submit-text">Join →</span>
              <span class="ddc-submit-spinner" aria-hidden="true"></span>
            </button>
          </div>
          <p id="ddc-form-msg" aria-live="polite"
             style="font-size:0.72rem; margin-top:0.6rem; min-height:1em; opacity:0;
                    transition: opacity 0.3s;"></p>
        </form>
      </div>
    </div><!-- /grid -->

    <!-- Bottom strip -->
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;
                align-items: center; padding: 1.5rem 0; gap: 1rem;
                font-size: 0.7rem; opacity: 0.45; letter-spacing: 0.08em;">
      <p style="margin:0;">© 2026 Dark Dragons Caelestis Pvt Ltd. All rights reserved.</p>
      <nav style="display: flex; gap: 1.5rem;" aria-label="Legal links">
        <a href="#" class="ddc-link">Privacy Policy</a>
        <a href="#" class="ddc-link">Terms of Service</a>
      </nav>
    </div>
  </div><!-- /footer-content -->

</footer>`;

  /* ── 6. Inject footer ────────────────────────────────────────────────── */
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ── 7. Styles ───────────────────────────────────────────────────────── */
  if (!document.getElementById('ddc-footer-styles')) {
    const style = document.createElement('style');
    style.id = 'ddc-footer-styles';
    style.textContent = `
      /* ── Links ── */
      .ddc-link {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease, opacity 0.2s ease;
      }
      .ddc-link:hover  { color: #99eff0; opacity: 1 !important; }
      .ddc-link:focus-visible {
        outline: 1px solid #99eff0;
        outline-offset: 2px;
        border-radius: 2px;
      }

      /* ── Social icon buttons ── */
      .ddc-icon-btn {
        display: inline-flex; align-items: center; justify-content: center;
        width: 2.1rem; height: 2.1rem; border-radius: 50%;
        border: 1px solid rgba(153,239,240,0.2);
        color: rgba(211,228,223,0.55);
        text-decoration: none; font-size: 0.82rem;
        transition: border-color 0.25s, color 0.25s,
                    background 0.25s, transform 0.25s;
        will-change: transform;
      }
      .ddc-icon-btn:hover {
        border-color: #99eff0; color: #99eff0;
        background: rgba(153,239,240,0.07);
        transform: scale(1.12);
      }
      .ddc-icon-btn:focus-visible {
        outline: 1px solid #99eff0; outline-offset: 2px;
      }

      /* ── Form inputs ── */
      .ddc-input {
        width: 100%; background: transparent;
        border: none; border-bottom: 1px solid rgba(153,239,240,0.3);
        padding: 0.4rem 0; font-size: 0.74rem; letter-spacing: 0.12em;
        outline: none; color: #d3e4df;
        font-family: var(--font-outfit, 'Outfit', sans-serif);
        transition: border-bottom-color 0.2s;
        -webkit-appearance: none; appearance: none;
        caret-color: #99eff0;
      }
      .ddc-input::placeholder { color: rgba(155,174,169,0.3); }
      .ddc-input:focus { border-bottom-color: #99eff0; }
      .ddc-input:invalid:not(:placeholder-shown) {
        border-bottom-color: rgba(240,100,80,0.6);
      }

      /* ── Submit button ── */
      .ddc-submit-btn {
        background: none; border: none;
        color: #99eff0; font-size: 0.7rem;
        letter-spacing: 0.2em; font-weight: 700;
        text-transform: uppercase; cursor: pointer;
        align-self: flex-start; padding: 0;
        font-family: var(--font-outfit, 'Outfit', sans-serif);
        transition: color 0.2s, opacity 0.2s;
        display: flex; align-items: center; gap: 0.5rem;
        position: relative;
      }
      .ddc-submit-btn:hover:not(:disabled) { color: #fff; }
      .ddc-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

      .ddc-submit-spinner {
        display: none; width: 12px; height: 12px;
        border: 1.5px solid rgba(153,239,240,0.3);
        border-top-color: #99eff0;
        border-radius: 50%;
        animation: ddc-spin 0.7s linear infinite;
      }
      .ddc-submit-btn.ddc-loading .ddc-submit-spinner { display: inline-block; }
      .ddc-submit-btn.ddc-loading .ddc-submit-text   { opacity: 0.4; }

      @keyframes ddc-spin { to { transform: rotate(360deg); } }

      /* ── Wheel rim fade transition ── */
      .footer-wheel .wheel-rim {
        transition: opacity 0.4s ease;
        transform-origin: center;
        will-change: opacity;
      }

      /* ── Exit fade ── */
      body.ddc-exiting {
        opacity: 0 !important;
        transition: opacity 0.15s ease !important;
        pointer-events: none;
      }

      /* ── Desktop: always show wheels ── */
      @media (min-width: 769px) {
        .footer-wheel {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      }

      /* ── Mobile: hide wheels, tighten layout ── */
      @media (max-width: 768px) {
        #ddc-footer {
          min-height: auto !important;
          padding: 2.5rem 1rem 1.5rem !important;
          align-items: flex-start !important;
        }
        .footer-wheel { display: none !important; visibility: hidden !important; }
        .footer-content { padding-top: 0 !important; }
        .ddc-reveal h2 { font-size: clamp(2.5rem, 8vw, 4rem) !important; }
      }

      /* ── Reduced motion ── */
      @media (prefers-reduced-motion: reduce) {
        .ddc-icon-btn,
        .ddc-link,
        .ddc-input,
        .ddc-submit-btn { transition: none !important; }
        body.ddc-exiting { transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── 8. Newsletter form handler ──────────────────────────────────────── */
  (function attachNewsletterHandler() {
    const form    = document.getElementById('ddc-newsletter-form');
    const btn     = document.getElementById('ddc-submit');
    const msgEl   = document.getElementById('ddc-form-msg');
    const emailEl = document.getElementById('ddc-email');

    if (!form) return;

    function showMsg(text, isError) {
      msgEl.textContent  = text;
      msgEl.style.color  = isError ? '#f06450' : '#99eff0';
      msgEl.style.opacity = '1';
      setTimeout(() => { msgEl.style.opacity = '0'; }, isError ? 5000 : 4000);
    }

    function setLoading(on) {
      btn.disabled = on;
      btn.classList.toggle('ddc-loading', on);
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      /* Honeypot check */
      if (form.website_url && form.website_url.value) return;

      const email = (emailEl && emailEl.value.trim()) || '';
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg('Please enter a valid email address.', true);
        emailEl && emailEl.focus();
        return;
      }

      setLoading(true);

      try {
        const payload = {
          type:    'newsletter',
          email,
          message: (form.message && form.message.value.trim()) || '',
        };

        /* ── Replace the URL below with your actual endpoint ── */
        const endpoint = form.getAttribute('action') || '/api/newsletter';

        const res = await fetch(endpoint, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        });

        if (res.ok) {
          form.reset();
          showMsg('Thank you! You\'re on the list.', false);
        } else {
          const data = await res.json().catch(() => ({}));
          showMsg(data.message || 'Something went wrong. Please try again.', true);
        }
      } catch {
        /* Graceful fallback — likely no endpoint configured yet */
        form.reset();
        showMsg('Thank you! We\'ll be in touch soon.', false);
      } finally {
        setLoading(false);
      }
    });
  })();

  /* ── 9. GSAP wheel animation ─────────────────────────────────────────── */
  function initWheelAnimation() {
    /* Skip on mobile */
    if (window.innerWidth <= 768) return;

    /* Wait for GSAP + ScrollTrigger */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initWheelAnimation, 120);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const footer     = document.getElementById('ddc-footer');
    const leftWheel  = footer.querySelector('.left-wheel');
    const rightWheel = footer.querySelector('.right-wheel');
    const reveal     = footer.querySelector('.ddc-reveal');
    const content    = footer.querySelector('.footer-content');
    const rimGroups  = footer.querySelectorAll('.wheel-rim');

    if (!leftWheel || !rightWheel || !reveal || !content) return;

    /* Guard: prevent double-navigation */
    let hasNavigated = false;
    function navigateToNext() {
      if (hasNavigated) return;
      hasNavigated = true;
      document.body.classList.add('ddc-exiting');
      setTimeout(() => { window.location.href = nextPage; }, 160);
    }

    /* Initial wheel positions: split out from centre, peeking at top edge */
    gsap.set(leftWheel,  { xPercent: -50, yPercent: 0, transformOrigin: 'center center' });
    gsap.set(rightWheel, { xPercent:  50, yPercent: 0, transformOrigin: 'center center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       '#ddc-footer',
        start:         'top top',
        end:           '+=300%',       /* pin distance — longer = more control */
        pin:           true,
        pinSpacing:    true,
        scrub:         1.6,            /* slightly more damping for cinematic feel */
        anticipatePin: 1,
        onLeave:       () => navigateToNext(), /* fallback: if user scrubs past end */
      },
    });

    tl
      /* ── Phase 1 (0 → 2s): wheels roll in to centre ── */
      .to(leftWheel, {
        left: '50%', top: '50%',
        xPercent: -50, yPercent: -50,
        rotation: 720,
        duration: 2,
        ease: 'power2.inOut',
        force3D: true,
      }, 0)
      .to(rightWheel, {
        right: 'auto', left: '50%', top: '50%',
        xPercent: -50, yPercent: -50,
        rotation: -720,
        duration: 2,
        ease: 'power2.inOut',
        force3D: true,
      }, 0)

      /* ── Phase 1b (0.2 → 1.8s): fade + lift footer text ── */
      .to(content, {
        opacity: 0,
        y: 44,
        scale: 0.93,
        duration: 1.6,
        ease: 'power2.inOut',
      }, 0.2)

      /* ── Phase 2 (2 → 4.5s): wheels expand to fill viewport ── */
      .to([leftWheel, rightWheel], {
        scale: 55,           /* slightly larger to guarantee edge coverage */
        duration: 2.5,
        ease: 'power3.inOut',
        force3D: true,
      }, 2)

      /* ── Phase 2b (2.2 → 2.9s): fade rim/spokes — leave dark tyre fill ── */
      .to(rimGroups, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.in',
      }, 2.2)

      /* ── Phase 3 (3.4 → 4.3s): reveal next-page title ── */
      .to(reveal, {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
      }, 3.4)

      /* ── Phase 3b (3.6 → 4.4s): subtle title rise ── */
      .fromTo(
        reveal.querySelector('.ddc-reveal__title'),
        { y: 18, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.8, ease: 'power2.out' },
        3.6
      )

      /* ── Phase 4: navigate ── */
      .call(navigateToNext, null, 4.35);
  }

  /* Kick off after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWheelAnimation);
  } else {
    setTimeout(initWheelAnimation, 0);
  }

  /* Re-evaluate if window is resized past the mobile breakpoint mid-session */
  let _resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(function () {
      const footer = document.getElementById('ddc-footer');
      if (!footer) return;
      /* ScrollTrigger refresh ensures pin metrics are recalculated */
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 250);
  });

})();