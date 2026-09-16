import type Swiper from "swiper";

const SELECTOR = ".award_ranking:not([data-swiper-init])";

export async function InitAwardRanking(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation, Autoplay, Grid }] =
    await Promise.all([import("swiper"), import("swiper/modules")]);
  await Promise.all([
    import("swiper/css"),
    import("swiper/css/grid"),
    import("swiper/css/navigation"),
  ]);

  const instances: Swiper[] = [];

  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";

    // nav buttons live in a sibling wrapper, not inside .award_ranking itself
    const navScope =
      slider.closest(".award_swipr_main") ?? root;
    const nextEl = navScope.querySelector<HTMLElement>(".swiper-button-next");
    const prevEl = navScope.querySelector<HTMLElement>(".swiper-button-prev");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation, Autoplay, Grid],
        loop: false,
        spaceBetween: 0,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
        breakpoints: {
          0: {
            slidesPerView: 2,
            grid: { rows: 3, fill: "row" },
          },
          991: {
            slidesPerView: 3,
            grid: { rows: 2 },
          },
          1200: {
            slidesPerView: 6,
            grid: { rows: 1 },
          },
        },
      })
    );
  });

  return () => {
    instances.forEach((s) => s.destroy(true, true));
  };
}