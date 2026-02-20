/* =============================================
   DDC — main.js  (shared across all pages)
   ============================================= */

(function () {
  /* ── 1. NAVBAR SCROLL ANIMATION ─────────────── */
  const nav = document.getElementById("mainNav");
  if (nav) {
    let lastY = window.scrollY;
    let isCollapsed = false;
    let hoverExpanded = false;
    const THRESHOLD = 80; // px before collapsing starts

    function collapse() {
      if (isCollapsed) return;
      isCollapsed = true;
      nav.classList.add("nav-collapsed");
    }

    function expand() {
      if (!isCollapsed) return;
      isCollapsed = false;
      nav.classList.remove("nav-collapsed");
    }

    window.addEventListener(
      "scroll",
      () => {
        const currentY = Math.max(0, window.scrollY);
        const scrollingDown = currentY > lastY;

        if (currentY <= THRESHOLD) {
          // Always fully expanded near the top
          expand();
        } else if (scrollingDown && !hoverExpanded) {
          collapse();
        } else if (!scrollingDown) {
          // Scrolling up — re-expand
          expand();
        }

        lastY = currentY;
      },
      { passive: true },
    );

    /* Hover: temporarily expand while mouse is over the collapsed nav */
    nav.addEventListener("mouseenter", () => {
      if (isCollapsed) {
        hoverExpanded = true;
        nav.classList.remove("nav-collapsed");
      }
    });

    nav.addEventListener("mouseleave", () => {
      if (hoverExpanded) {
        hoverExpanded = false;
        // Only re-collapse if we're still scrolled down
        if (window.scrollY > THRESHOLD) {
          nav.classList.add("nav-collapsed");
        }
      }
    });
  }

  /* ── 2. MOBILE MENU TOGGLE ───────────────────── */
  window.toggleMenu = function() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
        document.body.style.overflow = "";
      } else {
        mobileMenu.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }
  };

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMobileMenu = document.getElementById("closeMobileMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuBg = document.getElementById("mobileMenuBg");

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.remove("hidden");
  }
  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.add("hidden");
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMenu);
  if (closeMobileMenu) closeMobileMenu.addEventListener("click", closeMenu);
  if (mobileMenuBg) mobileMenuBg.addEventListener("click", closeMenu);

  /* ── 3. VIDEO — PLAY ON SIGHT ────────────────── */
  const video = document.getElementById("solutionVideo");
  if (video) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 },
    );
    videoObserver.observe(video);
  }

  /* ── 4. EXPANDING IMAGE SCROLL ───────────────── */
  const triggerSection = document.getElementById("expand-trigger");
  const expandingImage = document.getElementById("expanding-image");
  const imageCaption = document.getElementById("image-caption");

  if (triggerSection && expandingImage) {
    window.addEventListener(
      "scroll",
      () => {
        const rect = triggerSection.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        const distanceFromTop = -rect.top;

        if (distanceFromTop > 0 && distanceFromTop < scrollableDistance) {
          const progress = distanceFromTop / scrollableDistance;
          expandingImage.style.width = `${50 + progress * 50}%`;
          if (imageCaption)
            imageCaption.classList.toggle("opacity-0", progress <= 0.8);
        } else if (distanceFromTop <= 0) {
          expandingImage.style.width = "50%";
          if (imageCaption) imageCaption.classList.add("opacity-0");
        } else {
          expandingImage.style.width = "100%";
          if (imageCaption) imageCaption.classList.remove("opacity-0");
        }
      },
      { passive: true },
    );
  }

  /* ── 5. CARD MENU TOGGLE ─────────────────────── */
  const cardButtons = document.querySelectorAll(".card__button");
  cardButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = button.closest(".card__article");
      const menu = parent.querySelector(".card__menu");
      menu.classList.toggle("show-menu");
      button.classList.toggle("show-icon");
      cardButtons.forEach((other) => {
        if (other !== button) {
          other
            .closest(".card__article")
            .querySelector(".card__menu")
            .classList.remove("show-menu");
          other.classList.remove("show-icon");
        }
      });
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".card__actions")) {
      document
        .querySelectorAll(".card__menu")
        .forEach((m) => m.classList.remove("show-menu"));
      document
        .querySelectorAll(".card__button")
        .forEach((b) => b.classList.remove("show-icon"));
    }
  });

  /* ── 6. REVEAL ON SCROLL (IntersectionObserver) ─ */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }
})();
