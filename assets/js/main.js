
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

  /* ==========================================
   ECLYRA — BEHIND THE FILM SLIDERS
========================================== */

document.querySelectorAll('.esy-eclyra-behind-slider').forEach((slider) => {

  new Swiper(slider, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,

    pagination: {
      el: slider.querySelector('.swiper-pagination'),
      clickable: true
    }
  });

});


/* ==========================================
   AUREON — THE IDEA
   STATIC CITY / SCROLL TIME EFFECTS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(".esy-aureon-idea");

  // 다른 프로젝트 페이지에서는 실행하지 않음
  if (!section) return;

  const panels = [
    ...section.querySelectorAll(".esy-aureon-idea__panel")
  ];

  const progressFill = section.querySelector(
    ".esy-aureon-idea__progress-fill"
  );

  const phases = [
    "normal",
    "slow",
    "fast",
    "freeze",
    "reveal"
  ];

  if (panels.length !== phases.length) return;

  let currentStep = -1;
  let ticking = false;

  /* ======================================
     CHANGE ACTIVE PHASE
  ======================================= */

  function setPhase(step) {

    if (step === currentStep) return;

    currentStep = step;

    // 현재 시간 단계
    section.dataset.phase = phases[step];

    // 중앙 텍스트 전환
    panels.forEach((panel, index) => {
      const isActive = index === step;

      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });

  }

  /* ======================================
     SCROLL PROGRESS
  ======================================= */

  function updateScroll() {

    ticking = false;

    const rect = section.getBoundingClientRect();

    const scrollDistance =
      section.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0) return;

    // 0 ~ 1 사이의 진행률
    const progress = Math.max(
      0,
      Math.min(1, -rect.top / scrollDistance)
    );

    // 5개 시간 단계로 나누기
    const step = Math.min(
      phases.length - 1,
      Math.floor(progress * phases.length)
    );

    setPhase(step);

    // 오른쪽 진행 표시
    if (progressFill) {
      progressFill.style.height = `${progress * 100}%`;
    }

  }

  /* ======================================
     PERFORMANCE OPTIMIZATION
  ======================================= */

  function requestUpdate() {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(updateScroll);

  }

  /* ======================================
     EVENT LISTENERS
  ======================================= */

  window.addEventListener(
    "scroll",
    requestUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestUpdate
  );

  // 최초 화면 상태 설정
  requestUpdate();

});



/* ==========================================
   AUREON — FINAL FILM
   COUNTDOWN / GOLD REVEAL / AUTOPLAY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(".esy-aureon-film");
  if (!section) return;

  const videoWrap = section.querySelector(
    ".esy-aureon-film-video"
  );

  const countdown = section.querySelector(
    ".esy-aureon-film-countdown"
  );

  const number = section.querySelector(
    ".esy-aureon-film-number"
  );

  const video = section.querySelector(
    ".esy-aureon-film-video video"
  );

  if (!videoWrap || !countdown || !number || !video) return;

  let hasStarted = false;
  let hasFinished = false;

  /* ======================================
     AUTOPLAY PREPARATION
  ======================================= */

  // 브라우저 자동 재생 정책 대응
  video.muted = true;
  video.playsInline = true;
  video.autoplay = false;

  /* ======================================
     COUNTDOWN NUMBER
  ======================================= */

  function changeNumber(value) {

    number.classList.remove("is-changing");

    void number.offsetWidth;

    number.textContent = value;
    number.classList.add("is-changing");

  }

  /* ======================================
     COUNTDOWN SEQUENCE
  ======================================= */

  function startCountdown() {

    if (hasStarted || hasFinished) return;

    hasStarted = true;

    videoWrap.classList.add("is-counting");

    changeNumber("03");

    setTimeout(() => {
      changeNumber("02");
    }, 1000);

    setTimeout(() => {
      changeNumber("01");
    }, 2000);

    setTimeout(() => {
      changeNumber("00");
    }, 3000);

    // 골드 플래시 시작
    setTimeout(() => {
      videoWrap.classList.add("is-flashing");
    }, 4000);

    // 영상 공개 + 자동 재생
    setTimeout(() => {

      videoWrap.classList.add("is-revealed");
      videoWrap.classList.remove("is-counting");

      hasFinished = true;

      video.currentTime = 0;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn(
            "AUREON autoplay was blocked:",
            error
          );
        });
      }

    }, 4800);

  }

  /* ======================================
     INTERSECTION OBSERVER
  ======================================= */

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting && !hasStarted) {
          startCountdown();
          observer.disconnect();
        }

      });

    },
    {
      threshold: 0.45
    }
  );

  
  /* ======================================
    SOUND ON / OFF
  ======================================= */

  const soundButton = section.querySelector(
    ".esy-aureon-film-sound"
  );

  const soundText = section.querySelector(
    ".esy-aureon-film-sound-text"
  );

  function updateSoundButton() {
    if (!soundButton || !soundText) return;

    const soundEnabled = !video.muted && video.volume > 0;

    soundText.textContent = soundEnabled
      ? "SOUND OFF"
      : "SOUND ON";

    soundButton.setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );

    soundButton.setAttribute(
      "aria-label",
      soundEnabled ? "영상 소리 끄기" : "영상 소리 켜기"
    );
  }

  if (soundButton) {
    soundButton.addEventListener("click", () => {
      if (video.muted || video.volume === 0) {
        video.volume = 1;
        video.muted = false;
      } else {
        video.muted = true;
      }

      updateSoundButton();
    });

    // 기본 영상 컨트롤에서 음량을 바꿔도 버튼 동기화
    video.addEventListener("volumechange", updateSoundButton);

    updateSoundButton();
  }
  observer.observe(videoWrap);

});


/* ==========================================
   AUREON — BEHIND THE FILM
   SWIPER / GLIGHTBOX / REWIND / REPLAY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(".esy-aureon-behind");

  // 해당 섹션이 없는 페이지에서는 실행하지 않음
  if (!section) return;


  /* ======================================
     SWIPER — PRODUCTION GALLERIES
  ======================================= */

  const galleries = section.querySelectorAll(
    ".esy-aureon-behind-gallery.swiper"
  );

  if (typeof Swiper !== "undefined") {

    galleries.forEach((gallery) => {

      // 다른 코드에서 이미 초기화한 경우 중복 방지
      if (gallery.swiper) return;

      const slides = gallery.querySelectorAll(".swiper-slide");
      const pagination = gallery.querySelector(".swiper-pagination");

      const hasMultipleSlides = slides.length > 1;

      new Swiper(gallery, {

        slidesPerView: 1,
        spaceBetween: 0,
        speed: 650,

        loop: hasMultipleSlides,

        grabCursor: hasMultipleSlides,
        allowTouchMove: hasMultipleSlides,
        simulateTouch: hasMultipleSlides,

        pagination: {
          el: pagination,
          clickable: hasMultipleSlides
        },

        a11y: {
          enabled: true
        }

      });

      // 이미지가 한 장이면 페이지네이션 숨김
      if (!hasMultipleSlides && pagination) {
        pagination.style.display = "none";
      }

    });

  } else {
    console.warn("AUREON BEHIND: Swiper is not loaded.");
  }


  /* ======================================
     GLIGHTBOX — IMAGE ZOOM
  ======================================= */

  if (typeof GLightbox !== "undefined") {

    GLightbox({
      selector: ".esy-aureon-behind .glightbox",
      touchNavigation: true,
      loop: false,
      autoplayVideos: false
    });

  } else {
    console.warn("AUREON BEHIND: GLightbox is not loaded.");
  }


  /* ======================================
     REWIND TIMELINE
  ======================================= */

  const rewind = section.querySelector(
    ".esy-aureon-behind-rewind"
  );

  if (!rewind) return;

  const replayButton = rewind.querySelector(
    ".esy-aureon-behind-replay"
  );

  const progress = rewind.querySelector(
    ".esy-aureon-behind-rewind-progress"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let hasRewound = false;


  /* ======================================
     PLAY / REPLAY
  ======================================= */

  function playRewind() {

    if (!progress) return;

    // 움직임 최소화 설정 시 애니메이션 생략
    if (prefersReducedMotion) {
      rewind.classList.add("is-active");
      return;
    }

    // 기존 애니메이션 제거
    rewind.classList.remove("is-active");

    // 브라우저가 초기 상태를 반영하도록 강제
    void progress.offsetWidth;

    // 애니메이션 다시 시작
    rewind.classList.add("is-active");

  }


  /* ======================================
     REPLAY BUTTON
  ======================================= */

  if (replayButton) {

    replayButton.addEventListener("click", () => {
      playRewind();
    });

  }


  /* ======================================
     FIRST SCROLL ACTIVATION
  ======================================= */

  function startRewind() {

    // 자동 재생은 최초 한 번만
    if (hasRewound) return;

    hasRewound = true;
    playRewind();

  }


  /* ======================================
     REDUCED MOTION
  ======================================= */

  if (prefersReducedMotion) {
    startRewind();
    return;
  }


  /* ======================================
     INTERSECTION OBSERVER
  ======================================= */

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            startRewind();
            observer.disconnect();

          }

        });

      },
      {
        threshold: 0.35
      }
    );

    observer.observe(rewind);

  } else {

    // 미지원 브라우저에서는 바로 실행
    startRewind();

  }

});


/* ==========================================
   AUREON — WELL, I THINK...
   THE MOMENT TIME STOPS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(
    ".esy-aureon-conclusion"
  );

  if (!section) return;

  const clockHand = section.querySelector(
    ".esy-aureon-conclusion-clock-hand"
  );

  const twist = section.querySelector(
    ".esy-aureon-conclusion-twist"
  );

  if (!clockHand || !twist) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let hasPlayed = false;

  /* ==========================================
     INITIAL STATE
  ========================================== */

  if (!reduceMotion) {

    twist.style.opacity = "0";
    twist.style.transform = "translateY(18px)";

  }

  /* ==========================================
     CLOCK ANIMATION
  ========================================== */

  function playConclusion() {

    if (hasPlayed) return;

    hasPlayed = true;

    if (reduceMotion) {
      twist.style.opacity = "1";
      twist.style.transform = "none";
      return;
    }

    /* CLOCK HAND — ROTATE AND STOP */

    clockHand.animate(
      [
        {
          transform:
            "translate(-50%, -100%) rotate(0deg)"
        },
        {
          transform:
            "translate(-50%, -100%) rotate(720deg)"
        }
      ],
      {
        duration: 2400,
        easing: "cubic-bezier(.35, 0, .15, 1)",
        fill: "forwards"
      }
    );

    /* TWIST — APPEAR AFTER CLOCK STOPS */

    window.setTimeout(() => {

      twist.animate(
        [
          {
            opacity: 0,
            transform: "translateY(18px)"
          },
          {
            opacity: 1,
            transform: "translateY(0)"
          }
        ],
        {
          duration: 900,
          easing: "ease-out",
          fill: "forwards"
        }
      );

      twist.style.opacity = "1";
      twist.style.transform = "none";

    }, 2500);

  }

  /* ==========================================
     SCROLL OBSERVER
  ========================================== */

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            playConclusion();
            observer.disconnect();

          }

        });

      },
      {
        threshold: 0.35
      }
    );

    observer.observe(section);

  } else {

    playConclusion();

  }

});




})();