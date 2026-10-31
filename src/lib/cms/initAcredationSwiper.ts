// import type Swiper from "swiper";

// const SELECTOR = ".acredation_swiper:not([data-swiper-init])";

// export async function InitAcredationSwiper(root: HTMLElement): Promise<() => void> {
//   const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
//   if (!sliders.length) return () => {};

//   const [{ default: SwiperCore }, { Navigation }] = await Promise.all([
//     import("swiper"),
//     import("swiper/modules"),
//   ]);
//   await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

//   const instances: Swiper[] = [];
//   sliders.forEach((slider) => {
//     if (slider.dataset.swiperInit) return;
//     slider.dataset.swiperInit = "true";
//     if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

//     const nextEl = slider.querySelector<HTMLElement>(".swiper_next_custom");
//     const prevEl = slider.querySelector<HTMLElement>(".swiper_prev_custom");

//     instances.push(
//       new SwiperCore(slider, {
//         modules: [Navigation],
//         slidesPerView: 1.2,
//         spaceBetween: 20,
//         centeredSlides: false,
//         loop: false,
//         navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
//         breakpoints: {
//           768: { slidesPerView: 2.5, spaceBetween: 15 },
//           1200: { slidesPerView: 3.35, spaceBetween: 25 },
//         },
//       })
//     );
//   });

//   return () => instances.forEach((s) => s.destroy(true, true));
// }


import type Swiper from "swiper";

const SELECTOR = ".acredation_swiper:not([data-swiper-init])";

// Walk up from the slider until an ancestor contains the button
function findNearest(slider: HTMLElement, selector: string): HTMLElement | null {
  let node: HTMLElement | null = slider;
  while (node) {
    const found = node.querySelector<HTMLElement>(selector);
    if (found) return found;
    node = node.parentElement;
  }
  return null;
}

export async function InitAcredationSwiper(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

  const instances: { swiper: Swiper; el: HTMLElement }[] = [];

  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;
    slider.dataset.swiperInit = "true";

    const nextEl = findNearest(slider, ".swiper_next_custom");
    const prevEl = findNearest(slider, ".swiper_prev_custom");

    const swiper = new SwiperCore(slider, {
      modules: [Navigation],
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
      breakpoints: {
        768: { slidesPerView: 2.5, spaceBetween: 15 },
        1200: { slidesPerView: 3.35, spaceBetween: 25 },
      },
    });

    instances.push({ swiper, el: slider });
  });

  return () =>
    instances.forEach(({ swiper, el }) => {
      swiper.destroy(true, true);
      delete el.dataset.swiperInit;
    });
}