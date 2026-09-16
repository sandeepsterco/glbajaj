import type Swiper from "swiper";

const SELECTOR = ".AKTU_Swiper:not([data-swiper-init])";

export async function InitAktuSwiper(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

  const instances: Swiper[] = [];
  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

    const nextEl = slider.querySelector<HTMLElement>(".swiper_next_custom");
    const prevEl = slider.querySelector<HTMLElement>(".swiper_prev_custom");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation],
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: false,
        loop: false,
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
        breakpoints: {
          768: { slidesPerView: 1, spaceBetween: 15 },
          1200: { slidesPerView: 1, spaceBetween: 23 },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}