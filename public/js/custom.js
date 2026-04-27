(function () {
  "use strict";

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
  
  
  // ✅ ADD NEW FUNCTION HERE — between initWhyGlbSection and initSwipers
  function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    if (!headers.length) return false;

    headers.forEach(header => {
      header.addEventListener("click", () => {
        const currentItem = header.parentElement;
        const currentBody = currentItem.querySelector(".accordion-body");

        // Close all others
        document.querySelectorAll(".accordion-item").forEach(item => {
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

    return true;
  }

  function initSwipers() {
    if (typeof Swiper === "undefined") return false;

    // Destroy any existing instances before re-init
    [".award_ranking", ".studentsSwiper", ".companySwiper", ".home_placement_student_slider", ".home_placement_company_slider", ".courses_slider_wrapper"].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el?.swiper) el.swiper.destroy(true, true);
    });

    //-====Ranking and Award Slider -js -start--//
    new Swiper(".award_ranking", {
      loop: true,
      spaceBetween: 20,
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
    //-====Ranking and Award Slider -js -end--//

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

    // home add on course slider

    new Swiper(".courses_slider_wrapper", {
      slidesPerView: 6,
      // spaceBetween: 21,
      loop: true,
      autoplay: {
          delay: 2000,
      },
      navigation: {
          nextEl: ".courses_header .next_swiper_btn",
          prevEl: ".courses_header .prev_swiper_btn",
      },
    });

    return true;
  }

  function initAll() {
    initWhyGlbSection();
    initAccordion();
    if (!initSwipers()) {
      window.addEventListener("load", initSwipers, { once: true });
    }
  }

  // Expose for Next.js client-side re-init
  window.__initCustomJS = initAll;

  // Initialize DOM-based interactions as soon as possible.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll, { once: true });
  } else {
    initAll();
  }

})();
