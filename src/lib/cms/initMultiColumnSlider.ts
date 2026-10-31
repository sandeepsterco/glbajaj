import type Swiper from "swiper";

const SELECTOR = ".multi_column_slider:not([data-swiper-init])";

export async function InitMultiColumnSlider(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation, Pagination }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation"), import("swiper/css/pagination")]);

  const instances: Swiper[] = [];

  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

    const nextEl = slider.querySelector<HTMLElement>(".swiper_next_custom");
    const prevEl = slider.querySelector<HTMLElement>(".swiper_prev_custom");
    const paginationEl = slider.querySelector<HTMLElement>(".swiper-pagination");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: false,
        loop: false,
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
        pagination:paginationEl ? {el:paginationEl, clickable:true} : false
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}