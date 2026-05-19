(function () {
  "use strict";

  let frozenWidth = null;

  // ─── Max Content Width ────────────────────────────────────────────────────────
  function adjustMaxContent() {
    const container = document.querySelector(".container25");
    if (!container) return;

    const windowWidth = window.innerWidth;
    const containerOffset = container.getBoundingClientRect().left + window.scrollX;
    const containerWidth = container.offsetWidth;
    const rightEdge_calc = containerOffset + containerWidth;

    let rightEdge = rightEdge_calc;

    if (windowWidth >= 2550) {
      if (!frozenWidth) {
        frozenWidth = rightEdge_calc;
      }
      rightEdge = frozenWidth;
    } else {
      frozenWidth = null;
    }

    document
      .querySelectorAll(
        ".max-content, .max-content-sm, .max-content-md, .max-content-lg, .max-content-xl, .max-content-xxl"
      )
      .forEach((el) => (el.style.maxWidth = rightEdge + "px"));
  }

  // ─── Why GLB Section Tabs ─────────────────────────────────────────────────────
  function initWhyGlbSection() {
    const section = document.querySelector(".why_glb_section");
    if (!section) return false;

    const tabs = Array.from(section.querySelectorAll(".tabs li"));
    const contents = Array.from(section.querySelectorAll(".tab_content"));
    const images = Array.from(section.querySelectorAll(".bg_image"));
    const btnPrev = section.querySelector(".btn-prev");
    const btnNext = section.querySelector(".btn-next");

    const total = Math.min(tabs.length, contents.length, images.length);
    if (total === 0) return false;

    let current = 0;

    function setActive(index) {
      const safeIndex = ((index % total) + total) % total;

      tabs.forEach((el) => el.classList.remove("active"));
      contents.forEach((el) => el.classList.remove("active"));
      images.forEach((el) => el.classList.remove("active"));

      tabs[safeIndex]?.classList.add("active");
      contents[safeIndex]?.classList.add("active");
      images[safeIndex]?.classList.add("active");

      current = safeIndex;
    }

    tabs.slice(0, total).forEach((tab, i) => {
      tab.addEventListener("click", () => setActive(i));
    });

    btnPrev?.addEventListener("click", () => setActive(current - 1));
    btnNext?.addEventListener("click", () => setActive(current + 1));

    setActive(0);
    return true;
  }

  // ─── Accordion ────────────────────────────────────────────────────────────────
  function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    if (!headers.length) return false;

    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const currentItem = header.parentElement;
        const currentBody = currentItem.querySelector(".accordion-body");

        // Close all others
        document.querySelectorAll(".accordion-item").forEach((item) => {
          if (item !== currentItem) {
            item.classList.remove("active");
            const body = item.querySelector(".accordion-body");
            body.style.maxHeight = null;
            item.querySelector(".icon").textContent = "+";
          }
        });

        // Toggle current
        currentItem.classList.toggle("active");

        if (currentItem.classList.contains("active")) {
          currentBody.style.maxHeight = currentBody.scrollHeight + "px";
          header.querySelector(".icon").textContent = "−";
        } else {
          currentBody.style.maxHeight = null;
          header.querySelector(".icon").textContent = "+";
        }
      });
    });

    headers[0].click();

    // ACCORDION (mobile)
    document.querySelectorAll(".acc-header").forEach((header) => {
      header.addEventListener("click", function () {
        let parent = this.parentElement;
        document.querySelectorAll(".tab-content").forEach((item) => {
          if (item !== parent) item.classList.remove("active");
        });
        parent.classList.toggle("active");
      });
    });

    return true;
  }

  // ─── Media Grid Popup ─────────────────────────────────────────────────────────
  function gridPopup() {
    const items = document.querySelectorAll(".media_grid_Bx");

    items.forEach((item, index) => {
      item.addEventListener("click", function () {
        let gallery = [];

        items.forEach((el) => {
          gallery.push({
            src: el.getAttribute("data-src"),
            type: "image",
          });
        });

        Fancybox.show(gallery, {
          startIndex: index,
        });
      });
    });

    return true;
  }

  // ─── Swipers ──────────────────────────────────────────────────────────────────
  function initSwipers() {
    if (typeof Swiper === "undefined") return false;

    // Destroy any existing instances before re-init
    [
      ".award_ranking",
      ".studentsSwiper",
      ".companySwiper",
      ".home_placement_student_slider",
      ".home_placement_company_slider",
      ".courses_slider_wrapper",
      ".leadership_slider",
      ".acredation_swiper",
      ".cse_faculties_slider",
      ".cse_research_slider",
      ".hod_profile_slider",
      ".sport_facilities",
      ".ncc_rank_ceremony",
      ".AKTU_Swiper",
      ".workshop_slider_wrapper",
    ].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el?.swiper) el.swiper.destroy(true, true);
    });

    new Swiper(".award_ranking", {
      slidesPerView: 5,
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".award_swipr_main .swiper-button-next",
        prevEl: ".award_swipr_main .swiper-button-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      },
    });

    new Swiper(".studentsSwiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
    });

    new Swiper(".companySwiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".next2",
        prevEl: ".prev2",
      },
      breakpoints: {
        0: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 5 },
      },
    });

    new Swiper(".home_placement_student_slider", {
      slidesPerView: 3,
      spaceBetween: 27,
      loop: true,
      navigation: {
        nextEl: ".home_placement_static_card .next_swiper_btn",
        prevEl: ".home_placement_static_card .prev_swiper_btn",
      },
    });

    new Swiper(".home_placement_company_slider", {
      slidesPerView: 5,
      spaceBetween: 28,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      navigation: {
        nextEl: ".home_placement_companies .next_swiper_btn",
        prevEl: ".home_placement_companies .prev_swiper_btn",
      },
    });

    new Swiper(".courses_slider_wrapper", {
      slidesPerView: 6.6,
      loop: true,
      autoplay: { delay: 2000 },
      navigation: {
        nextEl: ".courses_header .next_swiper_btn",
        prevEl: ".courses_header .prev_swiper_btn",
      },
    });

    new Swiper(".leadership_slider", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: ".swiper_next_custom",
        prevEl: ".swiper_prev_custom",
      },
      breakpoints: {
        768: { slidesPerView: 2.5, spaceBetween: 15 },
        1200: { slidesPerView: 3.5, spaceBetween: 23 },
      },
    });

    new Swiper(".acredation_swiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: ".swiper_next_custom",
        prevEl: ".swiper_prev_custom",
      },
      breakpoints: {
        768: { slidesPerView: 2.5, spaceBetween: 15 },
        1200: { slidesPerView: 3.35, spaceBetween: 25 },
      },
    });

    new Swiper(".cse_faculties_slider", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: true,
      autoplay: false,
      navigation: {
        nextEl: ".department_faculty_next",
        prevEl: ".department_faculty_prev",
      },
      breakpoints: {
        768: { slidesPerView: 2.5, spaceBetween: 15 },
        1200: { slidesPerView: 4.5, spaceBetween: 40 },
      },
    });

    new Swiper(".cse_research_slider", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: true,
      autoplay: false,
      navigation: {
        nextEl: ".department_research_next",
        prevEl: ".department_research_prev",
      },
      breakpoints: {
        768: { slidesPerView: 2.5, spaceBetween: 15 },
        1200: { slidesPerView: 3.35, spaceBetween: 20 },
      },
    });

    new Swiper(".hod_profile_slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: ".vision_hod_next",
        prevEl: ".vision_hod_prev",
      },
      watchOverflow: true,
      breakpoints: {
        768: { slidesPerView: 1, spaceBetween: 15 },
        1200: { slidesPerView: 1, spaceBetween: 23 },
      },
    });

    new Swiper(".workshop_slider_wrapper", {
      slidesPerView: 1.2,
      spaceBetween: 21,
      centeredSlides: false,
      loop: true,
      autoplay: { delay: 2000 },
      navigation: {
        nextEl: ".next_swiper_btn",
        prevEl: ".prev_swiper_btn",
      },
      breakpoints: {
        768: { slidesPerView: 2.5, spaceBetween: 30 },
        1200: { slidesPerView: 3.5, spaceBetween: 30 },
      },
    });

    new Swiper(".sport_facilities", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: ".swiper_next_custom",
        prevEl: ".swiper_prev_custom",
      },
      breakpoints: {
        768: { slidesPerView: 1, spaceBetween: 15 },
        1200: { slidesPerView: 1, spaceBetween: 23 },
      },
    });

    new Swiper(".ncc_rank_ceremony", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: ".swiper_next_custom",
        prevEl: ".swiper_prev_custom",
      },
      breakpoints: {
        768: { slidesPerView: 1, spaceBetween: 15 },
        1200: { slidesPerView: 1, spaceBetween: 23 },
      },
    });

    new Swiper(".AKTU_Swiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: ".swiper_next_custom",
        prevEl: ".swiper_prev_custom",
      },
      breakpoints: {
        768: { slidesPerView: 1, spaceBetween: 15 },
        1200: { slidesPerView: 1, spaceBetween: 23 },
      },
    });

    return true;
  }

  // ─── Tab + Accordion (generic) ────────────────────────────────────────────────
  function tabContent() {
    // TAB CLICK (desktop)
    document.querySelectorAll(".tab-btn").forEach((button) => {
      button.addEventListener("click", function () {
        document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));
        this.classList.add("active");
        document.getElementById(this.dataset.tab)?.classList.add("active");
      });
    });

    // Activate first tab on load
    const firstBtn = document.querySelector(".tab-btn");
    if (firstBtn) {
      firstBtn.classList.add("active");
      const firstTabId = firstBtn.dataset.tab;
      if (firstTabId) {
        document.getElementById(firstTabId)?.classList.add("active");
      }
    }

    // ─── Career Guidance Page Tabs ─────────────────────────────────────────────
    const tabBtns = document.querySelectorAll(".careerTabsX_btn");
    const panes = document.querySelectorAll(".careerTabsX_pane");
    const accHeaders = document.querySelectorAll(".careerTabsX_accHeader");

    if (tabBtns.length > 0 && panes.length > 0) {
      tabBtns[0].classList.add("active");
      panes[0].classList.add("active");

      const firstBody = panes[0].querySelector(".careerTabsX_accBody");
      if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + "px";
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (window.innerWidth > 768) {
          const target = btn.getAttribute("data-tab");
          tabBtns.forEach((b) => b.classList.remove("active"));
          panes.forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          const targetPane = document.querySelector(`.careerTabsX_pane#${target}`);
          if (targetPane) targetPane.classList.add("active");
        }
      });
    });

    accHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          const pane = header.parentElement;
          panes.forEach((p) => {
            if (p !== pane) {
              p.classList.remove("active");
              const otherBody = p.querySelector(".careerTabsX_accBody");
              if (otherBody) otherBody.style.maxHeight = null;
            }
          });
          pane.classList.toggle("active");
          const body = pane.querySelector(".careerTabsX_accBody");
          if (body) {
            body.style.maxHeight = pane.classList.contains("active")
              ? body.scrollHeight + "px"
              : null;
          }
        }
      });
    });

    // ACCORDION (mobile)
    document.querySelectorAll(".acc-header").forEach((header) => {
      header.addEventListener("click", function () {
        let parent = this.parentElement;
        document.querySelectorAll(".tab-content").forEach((item) => {
          if (item !== parent) item.classList.remove("active");
        });
        parent.classList.toggle("active");
      });
    });

    return true;
  }

  // ─── Tab Control (tabbed-content) ─────────────────────────────────────────────
  function tabControl() {
    const tabbedContent = document.querySelectorAll(".tabbed-content");

    tabbedContent.forEach((container) => {
      const tabs = container.querySelector(".tabs");
      if (!tabs) return;

      const isTabsVisible = tabs.offsetParent !== null;

      if (isTabsVisible) {
        tabs.querySelectorAll("a").forEach((link) => {
          const newLink = link.cloneNode(true);
          link.parentNode.replaceChild(newLink, link);

          newLink.addEventListener("click", function (event) {
            event.preventDefault();
            const target = this.getAttribute("href");
            const buttons = tabs.querySelectorAll("a");
            const items = container.querySelectorAll(".item");

            buttons.forEach((btn) => btn.classList.remove("active"));
            items.forEach((item) => item.classList.remove("active"));

            this.classList.add("active");
            document.querySelector(target)?.classList.add("active");
          });
        });
      } else {
        container.querySelectorAll(".item").forEach((item) => {
          const newItem = item.cloneNode(true);
          item.parentNode.replaceChild(newItem, item);

          newItem.addEventListener("click", function () {
            const currId = this.getAttribute("id");
            const items = container.querySelectorAll(".item");

            container.querySelectorAll(".tabs a").forEach((btn) => btn.classList.remove("active"));
            items.forEach((i) => i.classList.remove("active"));

            this.classList.add("active");
            container.querySelector(`.tabs a[href$="#${currId}"]`)?.classList.add("active");
          });
        });
      }
    });
  }

  // ─── Toggle Read More ─────────────────────────────────────────────────────────
  function toggleReadMore() {
    document.querySelectorAll(".toggle-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        let content = this.closest(".content");
        let dots = content.querySelector(".dots");
        let moreText = content.querySelector(".more-text");

        if (moreText.classList.contains("show")) {
          dots.style.display = "inline";
          moreText.classList.remove("show");
          this.innerHTML = '<i class="bi bi-plus-lg"></i>';
          this.classList.remove("active");
        } else {
          dots.style.display = "none";
          moreText.classList.add("show");
          this.innerHTML = '<i class="bi bi-dash-lg"></i>';
          this.classList.add("active");
        }
      });
    });
  }

  // ─── YouTube Modal ────────────────────────────────────────────────────────────
  function initYTModal() {
    const overlay = document.getElementById("ytModalOverlay");
    const iframe = document.getElementById("ytModalIframe");
    const closeBtn = document.getElementById("ytModalClose");
    const playBtn = document.querySelector(".home_about_glb_section .thumbnail");

    if (!overlay || !iframe || !closeBtn || !playBtn) return;

    const rawSrc = iframe.getAttribute("src");
    iframe.removeAttribute("src");

    function toEmbedUrl(url) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) {
        return "https://www.youtube.com/embed/" + match[1] + "?autoplay=1&rel=0";
      }
      if (url.includes("/embed/")) {
        const base = url.split("?")[0];
        const params = new URLSearchParams(url.split("?")[1] || "");
        params.set("autoplay", "1");
        params.set("rel", "0");
        return base + "?" + params.toString();
      }
      return url;
    }

    function openModal() {
      iframe.src = toEmbedUrl(rawSrc);
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      overlay.classList.remove("active");
      iframe.removeAttribute("src");
      document.body.style.overflow = "";
    }

    playBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("active")) closeModal();
    });
  }

  // ─── Sterco Tabs (tab + accordion, scoped per section) ───────────────────────
  // FIX: moved inside initAll so it re-runs on every Next.js client-side navigation
  function initStercoTabs() {
    document.querySelectorAll(".sterco_tabs_sec").forEach((section) => {
      const tabButtons = section.querySelectorAll(".sterco_tab_btn");
      const tabPanels = section.querySelectorAll(".sterco_tab_panel");
      const accordionButtons = section.querySelectorAll(".sterco_accordion_btn");
      const accordionContents = section.querySelectorAll(".sterco_accordion_content");

      // Set first items active
      if (tabButtons.length > 0) tabButtons[0].classList.add("active");
      if (tabPanels.length > 0) tabPanels[0].classList.add("active");
      if (accordionButtons.length > 0) accordionButtons[0].classList.add("active");
      if (accordionContents.length > 0) accordionContents[0].classList.add("active");

      // Desktop tab click
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const target = button.getAttribute("data-tab");

          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabPanels.forEach((panel) => panel.classList.remove("active"));

          button.classList.add("active");

          const activePanel = section.querySelector("#" + target);
          if (activePanel) activePanel.classList.add("active");
        });
      });

      // Mobile accordion click
      accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const content = button.parentElement.nextElementSibling;
          const isAlreadyActive = button.classList.contains("active");

          accordionButtons.forEach((btn) => btn.classList.remove("active"));
          accordionContents.forEach((c) => c.classList.remove("active"));

          if (!isAlreadyActive) {
            button.classList.add("active");
            if (content) content.classList.add("active");
          }
        });
      });
    });
  }

  // ─── Early Max-Content (before DOMContentLoaded) ──────────────────────────────
  function adjustMaxContentEarly() {
    if (document.querySelector(".container25")) {
      adjustMaxContent();
    }
  }

  // ─── Main Init (called on load AND by Next.js after route change) ─────────────
  function initAll() {
    adjustMaxContent();

    initWhyGlbSection();
    initAccordion();
    initYTModal();
    initStercoTabs(); // ← FIX: now runs on every re-init

    if (!initSwipers()) {
      window.addEventListener("load", initSwipers, { once: true });
    }

    tabContent();
    gridPopup();
    tabControl();
    toggleReadMore();
  }

  // ─── Resize Handlers (attached once, not re-attached on re-init) ──────────────
  window.addEventListener("resize", adjustMaxContent);

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(tabControl, 250);
  });

  // ─── Expose for Next.js client-side re-init ───────────────────────────────────
  // Call window.__initCustomJS() from a useEffect after react-parser renders HTML
  //
  // Example usage in your Next.js component:
  //
  //   useEffect(() => {
  //     if (typeof window.__initCustomJS === "function") {
  //       window.__initCustomJS();
  //     }
  //   }, [pathname, htmlContent]);
  //
  window.__initCustomJS = initAll;

  // ─── Bootstrap ───────────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", adjustMaxContentEarly, { once: true });
    document.addEventListener("DOMContentLoaded", initAll, { once: true });
  } else {
    adjustMaxContentEarly();
    initAll();
  }
})();