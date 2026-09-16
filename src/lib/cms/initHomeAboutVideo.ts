import type Swiper from "swiper";

const SELECTOR = ".home_about_video:not([data-swiper-init])";

export async function InitHomeAboutVideo(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Autoplay }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await import("swiper/css");

  const instances: Swiper[] = [];
  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

    instances.push(
      new SwiperCore(slider, {
        modules: [Autoplay],
        slidesPerView: 4,
        spaceBetween: 15,
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          992: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}