import type Swiper from "swiper";

const SELECTOR = ".home_placement_company_slider:not([data-swiper-init])";

export async function InitHomePlacementCompanySlider(root: HTMLElement): Promise<() => void> {
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

    const navScope = slider.closest(".home_placement_companies") ?? root;
    const nextEl = navScope.querySelector<HTMLElement>(".next_swiper_btn");
    const prevEl = navScope.querySelector<HTMLElement>(".prev_swiper_btn");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation, Autoplay],
        slidesPerView: 6,
        spaceBetween: 28,
        watchOverflow: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
        breakpoints: {
          0: { slidesPerView: 2.3, spaceBetween: 5 },
          480: { slidesPerView: 2.3, spaceBetween: 5 },
          640: { slidesPerView: 3, spaceBetween: 5 },
          992: { slidesPerView: 3.4, spaceBetween: 5 },
          1200: { slidesPerView: 6, spaceBetween: 0 },
          1400: { slidesPerView: 6, spaceBetween: 0 },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}