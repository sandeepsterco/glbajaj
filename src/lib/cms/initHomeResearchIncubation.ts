import type Swiper from "swiper";
import { resolveNavEl } from "./swiperHelpers";

const SELECTOR = ".home_research_incubation:not([data-swiper-init])";

export async function InitHomeResearchIncubation(root: HTMLElement): Promise<() => void> {
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

    const navScope = slider.closest(".home_research_incubation_section") ?? root;
    const nextEl = navScope.querySelector<HTMLElement>(".next_swiper_btn");
    const prevEl = navScope.querySelector<HTMLElement>(".prev_swiper_btn");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation, Autoplay],
        slidesPerView: 3,
        spaceBetween: 15,
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          992: { slidesPerView: 2.5, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 20 },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}