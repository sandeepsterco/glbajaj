import type Swiper from "swiper";

const SELECTOR = ".alumni_achievement_slider:not([data-swiper-init])";

export async function InitAlumniAchievementSlider(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation, Autoplay }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

  const instances: Swiper[] = [];
  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

    const nextEl = slider.querySelector<HTMLElement>(".alumni_achievement_right");
    const prevEl = slider.querySelector<HTMLElement>(".alumni_achievement_left");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: false,
        loop: false,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}