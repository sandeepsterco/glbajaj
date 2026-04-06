(function () {
  "use strict";
  const swiper = new Swiper(".home_awards_slider", {
    slidesPerView: 5,
    // spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: ".nav-next",
      prevEl: ".nav-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });

  new Swiper(".studentsSwiper", {
    slidesPerView: "3",
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
})();
