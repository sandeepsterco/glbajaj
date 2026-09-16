import type Swiper from "swiper";

const SELECTOR = ".hod_profile_slider:not([data-swiper-init])";

export async function InitHodProfileSlider(root: HTMLElement): Promise<() => void> {
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

    const nextEl = slider.querySelector<HTMLElement>(".vision_hod_next");
    const prevEl = slider.querySelector<HTMLElement>(".vision_hod_prev");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: false,
        loop: false,
        watchOverflow: true,
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
        breakpoints: {
          768: { slidesPerView: 1, spaceBetween: 15 },
          1200: { slidesPerView: 1, spaceBetween: 23 },
        },
        on: {
          init(swiper) {
            const navBtn = slider
              .closest(".hod_profile_bx")
              ?.querySelector<HTMLElement>(".navigation_btn");
            if (navBtn) {
              navBtn.style.visibility = swiper.isLocked ? "hidden" : "";
              navBtn.style.pointerEvents = swiper.isLocked ? "none" : "";
            }
          },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}