import type Swiper from "swiper";

const SELECTOR = ".workshop_slider_wrapper:not([data-swiper-init])";

export async function InitWorkshopSlider(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const { default: SwiperCore } = await import("swiper");
  await import("swiper/css");

  const instances: Swiper[] = [];
  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

    instances.push(
      new SwiperCore(slider, {
        slidesPerView: 1.2,
        spaceBetween: 21,
        centeredSlides: false,
        breakpoints: {
          768: { slidesPerView: 2.5, spaceBetween: 30 },
          1200: { slidesPerView: 3.5, spaceBetween: 30 },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}