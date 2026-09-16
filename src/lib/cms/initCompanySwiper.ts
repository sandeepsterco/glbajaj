import type Swiper from "swiper";
import { resolveNavEl } from "./swiperHelpers";

const SELECTOR = ".companySwiper:not([data-swiper-init])";

export async function InitCompanySwiper(root: HTMLElement): Promise<() => void> {
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

    const nextEl = resolveNavEl(slider, ".next2");
    const prevEl = resolveNavEl(slider, ".prev2");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation],
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
        breakpoints: {
          0: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          900: { slidesPerView: 5 },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}