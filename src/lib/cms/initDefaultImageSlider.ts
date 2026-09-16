import type Swiper from "swiper";

export async function InitDefaultImageSlider(root: HTMLElement): Promise<() => void> {
  const single = root.querySelectorAll<HTMLElement>(
    ".default_image_slider:not([data-swiper-init])"
  );
  const double = root.querySelectorAll<HTMLElement>(
    ".default_image_slider2:not([data-swiper-init])"
  );
  if (!single.length && !double.length) return () => {};

  const [{ default: SwiperCore }, { Autoplay }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await import("swiper/css");

  const instances: Swiper[] = [];

  single.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

    instances.push(
      new SwiperCore(slider, {
        modules: [Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        autoplay: { delay: 2000, disableOnInteraction: false },
      })
    );
  });

  double.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";
    if (slider.querySelectorAll(".swiper-slide").length <= 1) return;

    instances.push(
      new SwiperCore(slider, {
        modules: [Autoplay],
        slidesPerView: 2,
        spaceBetween: 25,
        loop: false,
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 0 },
          992: { slidesPerView: 2, spaceBetween: 25 },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}