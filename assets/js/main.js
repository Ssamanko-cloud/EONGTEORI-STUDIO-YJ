
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);


  /**
   * EONGTEORI STUDIO - BROKEN REEL
   */
  function initEsyBrokenReel() {
    const reel = document.querySelector(".esy-reel-swiper");

    if (!reel || typeof Swiper === "undefined") return;

    const counter = document.querySelector(".esy-reel-counter");

    new Swiper(reel, {
      slidesPerView: 1.15,
      spaceBetween: 18,
      speed: 750,
      loop: false,
      grabCursor: true,
      slideToClickedSlide: true,

      navigation: {
        nextEl: ".esy-reel-next",
        prevEl: ".esy-reel-prev"
      },

      breakpoints: {
        576: {
          slidesPerView: 1.3,
          spaceBetween: 22
        },
        768: {
          slidesPerView: 1.45,
          spaceBetween: 26
        },
        992: {
          slidesPerView: 1.25,
          spaceBetween: 32
        }
      },

      on: {
        slideChange: function () {
          const current = String(this.activeIndex + 1).padStart(2, "0");

          if (counter) {
            counter.textContent = `FRAME ${current} / 06`;
          }
        }
      }
    });
  }

  window.addEventListener("load", initEsyBrokenReel);


  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

    
  /**
   * EONGTEORI STUDIO - Mouse Interaction
   */

  const esyHero = document.querySelector(".esy-hero");
  const esyDeco1 = document.querySelector(".esy-deco-1");
  const esyDeco2 = document.querySelector(".esy-deco-2");

  if (esyHero && esyDeco1 && esyDeco2) {

    const esyMouseEnabled = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const esyReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (esyMouseEnabled.matches && !esyReducedMotion.matches) {

      esyHero.addEventListener("pointermove", function(event) {

        const rect = esyHero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        esyDeco1.style.translate = `${x * 200}px ${y * 200}px`;
        esyDeco2.style.translate = `${x * -250}px ${y * -250}px`;

      });

      esyHero.addEventListener("pointerleave", function() {
        esyDeco1.style.translate = "0px 0px";
        esyDeco2.style.translate = "0px 0px";
      });

    }
  }


  /**
   * EONGTEORI STUDIO - CREATIVE ARCHIVE
   */
  function initEsyCreativeArchive() {
    const library = document.querySelector(".esy-toolkit-library");
    if (!library) return;

    const books = library.querySelectorAll(".esy-archive-object");
    const info = library.querySelector(".esy-toolkit-book-info");
    const number = library.querySelector(".esy-book-info-number");
    const title = library.querySelector(".esy-book-info-title");
    const tools = library.querySelector(".esy-book-info-tools");

    if (!info || !number || !title || !tools) return;

    const archiveData = {
      "01": {
        title: "DESIGN & UI",
        tools: "Photoshop · Illustrator · Figma"
      },
      "02": {
        title: "VIDEO & MOTION",
        tools: "Premiere Pro · After Effects"
      },
      "03": {
        title: "AI IMAGE",
        tools: "Nano Banana · ChatGPT Images"
      },
      "04": {
        title: "AI VIDEO",
        tools: "Kling AI · Google Flow · Seedance · WAN"
      },
      "05": {
        title: "AI MUSIC & AUDIO",
        tools: "Suno · Mureka · Google AI Studio"
      },
      "06": {
        title: "WEB DEVELOPMENT",
        tools: "HTML5 · CSS3 · JavaScript · Bootstrap · VS Code"
      }
    };

    books.forEach((book) => {
      book.addEventListener("click", () => {
        const id = book.dataset.book;
        const data = archiveData[id];
        if (!data) return;

        const isOpen = book.getAttribute("aria-expanded") === "true";

        books.forEach((item) => {
          item.setAttribute("aria-expanded", "false");
          item.classList.remove("esy-archive-active");
        });

        if (isOpen) {
          info.hidden = true;
          return;
        }

        number.textContent = `VOL. ${id}`;
        title.textContent = data.title;
        tools.textContent = data.tools;

        book.setAttribute("aria-expanded", "true");
        book.classList.add("esy-archive-active");
        info.hidden = false;
      });
    });
  }

  window.addEventListener("load", initEsyCreativeArchive);


  /* SAGYE — Independent Process Sliders */

  document.querySelectorAll(".esy-sagye-process-slider").forEach((slider) => {
    new Swiper(slider, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true
      }
    });
  });


  /* ==================================================
    K-CULTURE / THE IDEA
    Scroll Reveal
  ================================================== */

  document.addEventListener("DOMContentLoaded", () => {
      const thoughts = document.querySelectorAll(".esy-kc-thought");

      if (!thoughts.length) return;

      // 애니메이션 축소 설정 또는 미지원 브라우저 대응
      if (
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          !("IntersectionObserver" in window)
      ) {
          thoughts.forEach(card => card.classList.add("is-visible"));
          return;
      }

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add("is-visible");
                  observer.unobserve(entry.target);
              }
          });
      }, {
          threshold: 0.2,
          rootMargin: "0px 0px -40px 0px"
      });

      thoughts.forEach(card => observer.observe(card));
  });


  /* ==================================================
    K-CULTURE / YELLOW RIBBON SCROLL
  ================================================== */

  document.addEventListener("DOMContentLoaded", () => {

      const bridge = document.querySelector("#kc-yellow-bridge");
      if (!bridge) return;

      const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
      );

      let ticking = false;

      function updateYellowRibbon() {

          if (reducedMotion.matches) {
              bridge.style.setProperty("--kc-ribbon-progress", 1);
              return;
          }

          const rect = bridge.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // 리본 영역이 화면 아래에서 등장하기 시작해
          // 화면 위로 지나갈 때까지 0 → 1 진행
          const start = viewportHeight * 0.85;
          const end = viewportHeight * 0.15;

          const progress = Math.max(
              0,
              Math.min(
                  1,
                  (start - rect.top) /
                  (rect.height + start - end)
              )
          );

          bridge.style.setProperty(
              "--kc-ribbon-progress",
              progress.toFixed(4)
          );
      }

      function requestRibbonUpdate() {
          if (ticking) return;

          ticking = true;

          requestAnimationFrame(() => {
              updateYellowRibbon();
              ticking = false;
          });
      }

      window.addEventListener("scroll", requestRibbonUpdate, {
          passive: true
      });

      window.addEventListener("resize", requestRibbonUpdate);

      updateYellowRibbon();
  });


  
  /* ==================================================
    K-CULTURE / RED RIBBON SCROLL
  ================================================== */

  document.addEventListener("DOMContentLoaded", () => {

      const bridge = document.querySelector("#kc-red-bridge");
      if (!bridge) return;

      const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
      );

      let ticking = false;

      function updateRedRibbon() {

          if (reducedMotion.matches) {
              bridge.style.setProperty("--kc-red-progress", 1);
              return;
          }

          const rect = bridge.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const start = viewportHeight * 0.85;
          const end = viewportHeight * 0.15;

          const progress = Math.max(
              0,
              Math.min(
                  1,
                  (start - rect.top) /
                  (rect.height + start - end)
              )
          );

          bridge.style.setProperty(
              "--kc-red-progress",
              progress.toFixed(4)
          );
      }

      function requestRedRibbonUpdate() {
          if (ticking) return;

          ticking = true;

          requestAnimationFrame(() => {
              updateRedRibbon();
              ticking = false;
          });
      }

      window.addEventListener("scroll", requestRedRibbonUpdate, {
          passive: true
      });

      window.addEventListener("resize", requestRedRibbonUpdate);

      updateRedRibbon();
  });

  
  /* ==================================================
    K-CULTURE / BLACK RIBBON SCROLL
  ================================================== */

  document.addEventListener("DOMContentLoaded", () => {

      const bridge = document.querySelector("#kc-black-bridge");
      if (!bridge) return;

      const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
      );

      let ticking = false;

      function updateBlackRibbon() {

          if (reducedMotion.matches) {
              bridge.style.setProperty("--kc-black-progress", 1);
              return;
          }

          const rect = bridge.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const start = viewportHeight * 0.85;
          const end = viewportHeight * 0.15;

          const progress = Math.max(
              0,
              Math.min(
                  1,
                  (start - rect.top) /
                  (rect.height + start - end)
              )
          );

          bridge.style.setProperty(
              "--kc-black-progress",
              progress.toFixed(4)
          );
      }

      function requestBlackRibbonUpdate() {
          if (ticking) return;

          ticking = true;

          requestAnimationFrame(() => {
              updateBlackRibbon();
              ticking = false;
          });
      }

      window.addEventListener("scroll", requestBlackRibbonUpdate, {
          passive: true
      });

      window.addEventListener("resize", requestBlackRibbonUpdate);

      updateBlackRibbon();
  });

  
  /* ==================================================
    K-CULTURE / BLUE RIBBON SCROLL
  ================================================== */

  document.addEventListener("DOMContentLoaded", () => {

      const bridge = document.querySelector("#kc-blue-bridge");
      if (!bridge) return;

      const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
      );

      let ticking = false;

      function updateBlueRibbon() {

          if (reducedMotion.matches) {
              bridge.style.setProperty("--kc-blue-progress", 1);
              return;
          }

          const rect = bridge.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const start = viewportHeight * 0.85;
          const end = viewportHeight * 0.15;

          const progress = Math.max(
              0,
              Math.min(
                  1,
                  (start - rect.top) /
                  (rect.height + start - end)
              )
          );

          bridge.style.setProperty(
              "--kc-blue-progress",
              progress.toFixed(4)
          );
      }

      function requestBlueRibbonUpdate() {
          if (ticking) return;

          ticking = true;

          requestAnimationFrame(() => {
              updateBlueRibbon();
              ticking = false;
          });
      }

      window.addEventListener("scroll", requestBlueRibbonUpdate, {
          passive: true
      });

      window.addEventListener("resize", requestBlueRibbonUpdate);

      updateBlueRibbon();
  });


  /* ==================================================
    K-CULTURE / BEHIND THE FILM SLIDERS
  ================================================== */

  document.addEventListener("DOMContentLoaded", () => {

      // Process image sliders
      if (typeof Swiper !== "undefined") {
          document.querySelectorAll(".esy-kc-process-slider")
              .forEach((slider) => {

                  new Swiper(slider, {
                      loop: false,
                      slidesPerView: 1,
                      spaceBetween: 0,
                      pagination: {
                          el: slider.querySelector(".swiper-pagination"),
                          clickable: true
                      }
                  });

              });
      }

      
      // S2U — Process image sliders
      if (typeof Swiper !== "undefined") {
          document.querySelectorAll(".esy-s2u-process-slider")
              .forEach((slider) => {

                  new Swiper(slider, {
                      loop: false,
                      slidesPerView: 1,
                      spaceBetween: 0,
                      pagination: {
                          el: slider.querySelector(".swiper-pagination"),
                          clickable: true
                      }
                  });

              });
      }


      // Process image lightbox
      if (typeof GLightbox !== "undefined") {
          GLightbox({
              selector: "#kc-behind .glightbox",
              loop: false
          });
      }

  });


  /* ==========================================
    ON BOARD — IDEA COLLISION
  ========================================== */

  const onboardCards = document.querySelectorAll(
    ".esy-onboard-collision-card"
  );

  if (onboardCards.length && "IntersectionObserver" in window) {

    const onboardObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const card = entry.target;

          card.classList.add("is-visible");

          observer.unobserve(card);

        });

      },
      {
        threshold: 0.2
      }
    );

    onboardCards.forEach((card) => {
      onboardObserver.observe(card);
    });

  }



})();