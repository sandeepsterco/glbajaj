import type Swiper from "swiper";
import { resolveNavEl } from "./swiperHelpers";

const SELECTOR = ".studentsSwiper:not([data-swiper-init])";

export async function InitStudentsSwiper(root: HTMLElement): Promise<() => void> {
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

    const nextEl = resolveNavEl(slider, ".next");
    const prevEl = resolveNavEl(slider, ".prev");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation],
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}