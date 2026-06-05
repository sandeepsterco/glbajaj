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
    const section = document.querySelector(".why_glb_section:not([data-customjs-init])");
    if (!section) return false;
    section.setAttribute("data-customjs-init", "1");

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
    const headers = document.querySelectorAll(".accordion-header:not([data-customjs-init])");
    if (!headers.length) return false;

    headers.forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
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
    document.querySelectorAll(".acc-header:not([data-customjs-init])").forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
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
  function resolveNavEl(root, selector) {
    if (!selector || typeof selector !== "string") return selector;
    const scopes = [root, root.parentElement, root.closest("section"), document];
    for (let i = 0; i < scopes.length; i++) {
      const scope = scopes[i];
      if (!scope || !scope.querySelector) continue;
      const node = scope.querySelector(selector);
      if (node && node.nodeType === 1) return node;
    }
    return null;
  }

  function createSwiper(selector, options) {
    const el = document.querySelector(selector);
    if (!el || el.nodeType !== 1) return null;

    // Skip React-managed Swipers (e.g. AboutLeadership on /about)
    if (
      el.hasAttribute("data-swiper-react") ||
      el.closest("[data-swiper-react]") ||
      (el.classList.contains("leadership_slider") &&
        !el.classList.contains("swiper") &&
        el.querySelector(".swiper"))
    ) {
      return null;
    }

    const opts = Object.assign({}, options);
    if (opts.navigation && typeof opts.navigation === "object") {
      const nextEl = resolveNavEl(el, opts.navigation.nextEl);
      const prevEl = resolveNavEl(el, opts.navigation.prevEl);
      if (nextEl || prevEl) {
        opts.navigation = Object.assign({}, opts.navigation, {
          ...(nextEl && { nextEl }),
          ...(prevEl && { prevEl }),
        });
      } else {
        delete opts.navigation;
      }
    }

    try {
      return new Swiper(el, opts);
    } catch (err) {
      console.warn("[custom.js] Swiper init skipped for", selector, err);
      return null;
    }
  }

  function initSwipers() {
    if (typeof Swiper === "undefined") return false;

    // Destroy any existing instances before re-init
    [
      ".award_ranking",
      ".studentsSwiper",
      ".companySwiper",
      ".home_placement_student_slider",
      ".home_recruiters_slider",
      ".home_placement_company_slider",
      ".courses_slider_wrapper",
      ".leadership_slider",
      ".acredation_swiper",
      // ".cse_faculties_slider",
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

    createSwiper(".award_ranking", {
      loop: false, // recommended with grid
      spaceBetween: 0,
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
        0: {
          slidesPerView: 2,
          grid: {
            rows: 3,
            fill: "row",
          },
        },
        991: {
          slidesPerView: 3,
          grid: {
            rows: 2,
          },
        },
        1200: {
          slidesPerView: 5,
          grid: {
            rows: 1,
          },
        },
      },
    });

    createSwiper(".studentsSwiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
    });

    createSwiper(".companySwiper", {
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

    createSwiper(".home_placement_student_slider", {
      slidesPerView: 3,
      spaceBetween: 27,
      autoplay:true,
      loop: true,
      navigation: {
        nextEl: ".right_slider .next_swiper_btn",
        prevEl: ".right_slider .prev_swiper_btn",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 27,
        },
      },
    });

    createSwiper(".home_recruiters_slider", {
      slidesPerView: 1,
      spaceBetween: 15,
      loop: true,
      autoplay: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
      },
    });

    createSwiper(".home_placement_company_slider", {
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
      breakpoints: {
        0: {
          slidesPerView: 2.3,
          spaceBetween: 5,
        },

        480: {
          slidesPerView: 2.3,
          spaceBetween: 5,
        },

        640: {
          slidesPerView: 3,
          spaceBetween: 5,
        },

        992: {
          slidesPerView: 3.4,
          spaceBetween: 5,
        },

        1200: {
          slidesPerView: 5,
          spaceBetween: 0,
        },

        1400: {
          slidesPerView: 5,
          spaceBetween: 0,
        },
      },
    });

    createSwiper(".courses_slider_wrapper", {
      slidesPerView: 8,
      spaceBetween: 20,
      loop: true,

      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".courses_header .next_swiper_btn",
        prevEl: ".courses_header .prev_swiper_btn",
      },

      breakpoints: {
        0: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },

        480: {
          slidesPerView: 3.5,
          spaceBetween: 12,
        },

        768: {
          slidesPerView: 4.3,
          spaceBetween: 15,
        },

        992: {
          slidesPerView: 5,
          spaceBetween: 18,
        },

        1200: {
          slidesPerView: 6,
          spaceBetween: 20,
        },

        1400: {
          slidesPerView: 8,
          spaceBetween: 20,
        },
      },
    });

    createSwiper(".leadership_slider", {
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

    createSwiper(".acredation_swiper", {
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



    // new Swiper(".cse_faculties_slider", {
    //   slidesPerView: 1.2,
    //   spaceBetween: 20,
    //   centeredSlides: false,
    //   loop: true,
    //   autoplay: false,
    //   navigation: {
    //     nextEl: ".department_faculty_next",
    //     prevEl: ".department_faculty_prev",
    //   },
    //   breakpoints: {
    //     768: { slidesPerView: 2.5, spaceBetween: 15 },
    //     1200: { slidesPerView: 4.5, spaceBetween: 40 },
    //   },
    // });

    createSwiper(".cse_research_slider", {
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

    const hodSwiperEl = document.querySelector(".hod_profile_slider");

    if (hodSwiperEl) {
      createSwiper(".hod_profile_slider", {
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
        on: {
          init(swiper) {
            const navBtn = hodSwiperEl.closest(".hod_profile_bx")?.querySelector(".navigation_btn");
            if (navBtn) {
              navBtn.style.visibility = swiper.isLocked ? "hidden" : "";
              navBtn.style.pointerEvents = swiper.isLocked ? "none" : "";
            }
          }
        }
      });
    }



    createSwiper(".workshop_slider_wrapper", {
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

    createSwiper(".sport_facilities", {
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

    createSwiper(".ncc_rank_ceremony", {
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

    createSwiper(".AKTU_Swiper", {
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

    // cse_lab_slider
    createSwiper(".cse_lab_slider", {
      // 3 slides poori aur 4th slide thodi si dikhegi
      slidesPerView: 1.2, // Mobile ke liye
      spaceBetween: 20,
      centeredSlides: false, // Left se start karne ke liye false rakhein
      loop: true,
      autoplay: false,
      navigation: {
        nextEl: ".swiper_next_custom",
        prevEl: ".swiper_prev_custom",
      },
      breakpoints: {
        // Jab screen 768px se badi ho (Tablets)
        768: {
          slidesPerView: 2.5,
          spaceBetween: 15,
        },
        // Jab screen 1200px se badi ho (Desktop - XD Match)
        1200: {
          slidesPerView: 2.25, // 3 full + 0.5 next slide
          spaceBetween: 40,
        },
      },
    });

    return true;
  }

  // ─── Tab + Accordion (generic) ────────────────────────────────────────────────
  function tabContent() {
    // TAB CLICK (desktop)
    document.querySelectorAll(".tab-btn:not([data-customjs-init])").forEach((button) => {
      button.setAttribute("data-customjs-init", "1");
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
    document.querySelectorAll(".acc-header:not([data-customjs-init])").forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
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
            const target = this.getAttribute("href");

            // Query-string hrefs (e.g. ?tab=all) are server-side navigation —
            // let the browser follow them normally; do NOT preventDefault.
            if (!target || !target.startsWith("#")) return;

            // Hash-based tabs (#tab1, etc.) are handled client-side.
            event.preventDefault();

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

            // FIX: Only look up by hash selector — guard against non-hash hrefs
            const matchLink = container.querySelector(`.tabs a[href="#${currId}"]`);
            if (matchLink) matchLink.classList.add("active");
          });
        });
      }
    });
  }

  function toggleReadMore() {
    document.querySelectorAll(".toggle-btn:not([data-readmore-init])").forEach(function (btn) {
      btn.setAttribute("data-readmore-init", "1");
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

  function initYTModal() {
    const overlay = document.getElementById("ytModalOverlay");
    const iframe = document.getElementById("ytModalIframe");
    const closeBtn = document.getElementById("ytModalClose");
    const playBtn = document.querySelector(".home_about_glb_section .thumbnail");

    if (!overlay || !iframe || !closeBtn || !playBtn) return;

    const rawSrc = iframe.getAttribute("src");
    iframe.removeAttribute("src");

    function isYouTubeUrl(url) {
        return url.includes("youtube.com") || url.includes("youtu.be");
    }

    function toEmbedUrl(url) {
        // Handle YouTube URLs
        if (isYouTubeUrl(url)) {
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
        }
        // For direct video URLs (mp4, webm, etc.) — return as-is
        return url;
    }

    function isDirectVideo(url) {
        return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
    }

    function openModal() {
        const embedUrl = toEmbedUrl(rawSrc);

        if (isDirectVideo(rawSrc)) {
            // Replace iframe with a <video> element
            const existingVideo = overlay.querySelector("video");
            if (!existingVideo) {
                const video = document.createElement("video");
                video.setAttribute("controls", "");
                video.setAttribute("autoplay", "");
                video.setAttribute("playsinline", "");
                video.style.width = "100%";
                video.style.height = "100%";
                video.src = rawSrc;
                iframe.replaceWith(video);
            } else {
                existingVideo.src = rawSrc;
                existingVideo.play();
            }
        } else {
            iframe.src = embedUrl;
        }

        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";

        // Stop iframe
        const currentIframe = overlay.querySelector("iframe");
        if (currentIframe) currentIframe.removeAttribute("src");

        // Stop video
        const video = overlay.querySelector("video");
        if (video) {
            video.pause();
            video.src = "";
        }
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

  function initXTabs() {
    document.querySelectorAll(".xtabs_sec:not([data-customjs-init])").forEach((section) => {
      section.setAttribute("data-customjs-init", "1");
      const tabBtns = section.querySelectorAll(".xtab_btn");
      const panels = section.querySelectorAll(".xtab_panel");
      const accBtns = section.querySelectorAll(".xacc_btn");

      // set first active
      if (tabBtns.length) tabBtns[0].classList.add("active");
      if (panels.length) panels[0].classList.add("active");

      // desktop tabs
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-xtab");
          tabBtns.forEach((b) => b.classList.remove("active"));
          panels.forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          section.querySelector("#" + target)?.classList.add("active");
        });
      });

      // mobile accordion
      accBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const panel = btn.closest(".xtab_panel");
          const isActive = panel.classList.contains("active");
          panels.forEach((p) => p.classList.remove("active"));
          if (!isActive) panel.classList.add("active");
        });
      });
    });
  }

  function initPolicyAccordion() {
    const policyheaders = document.querySelectorAll(".ppolicy_header:not([data-customjs-init])");
    if (!policyheaders.length) return;

    const firstItem = document.querySelector(".ppolicy_item:not([data-customjs-opened])");
    if (firstItem) {
      firstItem.setAttribute("data-customjs-opened", "1");
      firstItem.classList.add("active");
      const firstBody = firstItem.querySelector(".ppolicy_body");
      if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + "px";
    }

    policyheaders.forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
      header.addEventListener("click", () => {
        const currentItem = header.parentElement;
        const currentBody = currentItem.querySelector(".ppolicy_body");
        currentItem.classList.toggle("active");

        if (currentBody) {
          if (currentItem.classList.contains("active")) {
            currentBody.style.maxHeight = currentBody.scrollHeight + "px";
          } else {
            currentBody.style.maxHeight = null;
          }
        }
      });
    });
  }

  function initFooterModals() {
    document.querySelectorAll(".footer-trigger:not([data-customjs-init])").forEach((trigger) => {
      trigger.setAttribute("data-customjs-init", "1");
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();

        const modalClass = [...trigger.classList].find((cls) => cls.startsWith("modal"));
        const modal = document.querySelector(`.modal-new.${modalClass}`);
        if (!modal) return;

        const isOpen = modal.classList.contains("show");
        document.querySelectorAll(".modal-new.show").forEach((m) => m.classList.remove("show"));
        document.querySelectorAll(".footer-trigger.active").forEach((t) => t.classList.remove("active"));

        if (!isOpen) {
          modal.classList.add("show");
          trigger.classList.add("active");
        }
      });
    });
  }

  function initDropMenus() {
    document.querySelectorAll(".drop_btn:not([data-customjs-init])").forEach((btn) => {
      btn.setAttribute("data-customjs-init", "1");
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const submenu = this.nextElementSibling;

        document.querySelectorAll(".submenu").forEach((menu) => {
          if (menu !== submenu) {
            menu.style.maxHeight = null;
            menu.parentElement.classList.remove("active");
          }
        });

        if (submenu.style.maxHeight) {
          submenu.style.maxHeight = null;
          this.parentElement.classList.remove("active");
        } else {
          submenu.style.maxHeight = submenu.scrollHeight + "px";
          this.parentElement.classList.add("active");
        }
      });
    });
  }

  // ─── View More Button ──────────────────────────────────────────────────────────
 // ─── View More Button ──────────────────────────────────────────────────────────
 function initViewMore() {
    document.querySelectorAll(".view_more_btn:not([data-viewmore-init])").forEach((btn) => {
      btn.setAttribute("data-viewmore-init", "1");
      
      const description = btn.parentElement.querySelector(".vm-description");
      if (!description) return;

      if (description.scrollHeight <= 200) {
        btn.style.display = "none";
        return;
      }

      btn.addEventListener("click", function () {
        const icon = this.querySelector("i");
        description.classList.toggle("expanded");
        icon.classList.toggle("bi-plus-lg");
        icon.classList.toggle("bi-dash-lg");
      });
    });
  }

  // ✅ Fix default open (first item)
  window.addEventListener("load", () => {
    document.querySelectorAll(".ppolicy_item.active").forEach((item) => {
      const body = item.querySelector(".ppolicy_body");
      body.style.maxHeight = body.scrollHeight + "px";
    });
  });



  // ─── Main Init ────────────────────────────────────────────────────────────────
  function initAll() {
    adjustMaxContent();

    initWhyGlbSection();
    initAccordion();
    initYTModal();
    initStercoTabs();
    initPolicyAccordion();
    initFooterModals();
    initDropMenus();

    if (!initSwipers()) {
      window.addEventListener("load", initSwipers, { once: true });
    }

    tabContent();
    gridPopup();
    tabControl();
    toggleReadMore();
    initXTabs();
    initViewMore();
  }

  let initScheduledTimer;
  function scheduleInitAll() {
    clearTimeout(initScheduledTimer);
    initScheduledTimer = setTimeout(function () {
      requestAnimationFrame(initAll);
    }, 150);
  }

  window.addEventListener("resize", adjustMaxContent);

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(tabControl, 250);
  }); 

  window.__initCustomJS = initAll;
  window.__scheduleInitCustomJS = scheduleInitAll;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", adjustMaxContentEarly, { once: true });
    document.addEventListener("DOMContentLoaded", initAll, { once: true });
  } else {
    adjustMaxContentEarly();
    initAll();
  }
})

();