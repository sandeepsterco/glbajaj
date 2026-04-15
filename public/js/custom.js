(function () {
  "use strict";
  //-====Ranking and Award Slider -js -start--//

  var swiper = new Swiper(".award_ranking", {
    slidesPerView: 5,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },  // ← full 5 on desktop
    },
});
//-====Ranking and Award Slider -js -end--//

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
