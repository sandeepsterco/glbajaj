import type Swiper from "swiper";

const SELECTOR = ".home_recruiters_slider:not([data-swiper-init])";

export async function InitHomeRecruitersSlider(root: HTMLElement): Promise<() => void> {
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

    // Single-slide guard, mirroring createSwiperOnElement's behavior in custom.js
    const slideCount = slider.querySelectorAll(".swiper-slide").length;
    if (slideCount <= 1) return;

    instances.push(
      new SwiperCore(slider, {
        modules: [Autoplay],
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 1, spaceBetween: 15 },
          992: { slidesPerView: 1, spaceBetween: 15 },
        },
      })
    );
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
  };
}