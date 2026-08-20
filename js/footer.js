/* Shared DDC footer. The footer is content-driven and has no wheel animation. */
(function () {
  'use strict';

  if (window.__ddcFooterLoaded) return;
  window.__ddcFooterLoaded = true;

  const scriptTag = document.currentScript || document.querySelector('script[src*="footer.js"]');
  const scriptSrc = (scriptTag && scriptTag.getAttribute('src')) || '';
  const isInSubfolder = scriptSrc.startsWith('../');

  function rel(target) {
    if (!target || target.startsWith('http') || target.startsWith('/') || target.startsWith('#')) return target;
    return isInSubfolder ? (target.startsWith('menu/') ? target.slice(5) : `../${target}`) : target;
  }

  const footer = document.createElement('footer');
  footer.id = 'ddc-footer';
  footer.setAttribute('aria-label', 'Site footer');
  footer.innerHTML = `
    <div class="footer-content">
      <div class="ddc-footer-grid">
        <div class="ddc-footer-brand">
          <div class="ddc-footer-mark">DDC</div>
          <p>The New Celestial Beginning</p>
        </div>

        <div>
          <h4>Innovation</h4>
          <ul>
            <li><a href="${rel('menu/swapping.html')}">Battery Swapping</a></li>
            <li><a href="${rel('technology.html')}">Crab-Walk Steering</a></li>
            <li><a href="${rel('product.html')}">Retrofitting</a></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="${rel('menu/about.html')}">Our Story</a></li>
            <li><a href="${rel('menu/contact.html')}">Contact</a></li>
            <li><a href="${rel('menu/journey.html')}">Our Journey</a></li>
          </ul>
        </div>

        <div>
          <h4>Stay Updated</h4>
          <p>Join the movement towards a greener future.</p>
          <form id="ddc-newsletter-form" novalidate>
            <input type="email" name="email" id="ddc-email" placeholder="EMAIL ADDRESS" required aria-label="Your email address">
            <input type="text" name="message" id="ddc-message" placeholder="MESSAGE (optional)" aria-label="Optional message">
            <button type="submit" id="ddc-submit">Join <span aria-hidden="true">→</span></button>
            <p id="ddc-form-msg" aria-live="polite"></p>
          </form>
        </div>
      </div>

      <div class="ddc-footer-bottom">
        <span>© 2026 Dark Dragons Caelestis Pvt Ltd. All rights reserved.</span>
        <nav aria-label="Legal links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></nav>
      </div>
    </div>`;

  document.body.appendChild(footer);

  const styles = document.createElement('style');
  styles.textContent = `
    #ddc-footer {
      width: 100%;
      margin-top: 0;
      padding: clamp(3rem, 7vw, 5rem) clamp(1rem, 4vw, 3rem) 1.5rem;
      background: #474d4d;
      color: #d3e4df;
      border-top: 1px solid rgba(153,239,240,.35);
    }
    #ddc-footer .footer-content { width: min(100%, 1280px); margin: 0 auto; }
    #ddc-footer .ddc-footer-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: clamp(1.5rem, 4vw, 3rem);
      padding-bottom: 2.25rem;
      border-bottom: 1px solid rgba(153,239,240,.15);
    }
    #ddc-footer .ddc-footer-mark { color: #fff; font: 600 clamp(2rem, 5vw, 3.5rem)/1 var(--font-playfair, serif); }
    #ddc-footer h4 { margin: 0 0 .85rem; color: #99eff0; font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; }
    #ddc-footer p { margin: .6rem 0 0; color: rgba(211,228,223,.7); font-size: .84rem; line-height: 1.65; }
    #ddc-footer ul { display: grid; gap: .55rem; margin: 0; padding: 0; list-style: none; }
    #ddc-footer a { color: inherit; text-decoration: none; transition: color .2s ease, opacity .2s ease; }
    #ddc-footer a:hover { color: #99eff0; }
    #ddc-footer form { display: grid; gap: .7rem; margin-top: .9rem; }
    #ddc-footer input { width: 100%; padding: .45rem 0; border: 0; border-bottom: 1px solid rgba(153,239,240,.3); outline: 0; background: transparent; color: #d3e4df; font: .74rem var(--font-main, sans-serif); letter-spacing: .08em; }
    #ddc-footer input::placeholder { color: rgba(211,228,223,.45); }
    #ddc-footer button { justify-self: start; padding: 0; border: 0; background: none; color: #99eff0; cursor: pointer; font: 700 .7rem var(--font-main, sans-serif); letter-spacing: .18em; text-transform: uppercase; }
    #ddc-footer button:hover { color: #fff; }
    #ddc-footer #ddc-form-msg { min-height: 1em; margin: 0; opacity: 0; font-size: .72rem; }
    #ddc-footer .ddc-footer-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; padding-top: 1.25rem; color: rgba(211,228,223,.5); font-size: .7rem; letter-spacing: .04em; }
    #ddc-footer .ddc-footer-bottom nav { display: flex; gap: 1.25rem; }
    @media (max-width: 760px) {
      #ddc-footer { padding: 3rem 1rem 1.5rem; }
      #ddc-footer .ddc-footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem 1.25rem; }
      #ddc-footer .ddc-footer-bottom { display: grid; }
    }
    @media (max-width: 420px) { #ddc-footer .ddc-footer-grid { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(styles);

  const form = document.getElementById('ddc-newsletter-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = form.querySelector('[name="email"]');
      const message = document.getElementById('ddc-form-msg');
      if (!email || !email.value.trim() || !email.validity.valid) {
        email && email.focus();
        return;
      }
      form.reset();
      message.textContent = "Thank you. We'll be in touch soon.";
      message.style.opacity = '1';
      message.style.color = '#99eff0';
    });
  }
})();
