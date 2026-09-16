import type Swiper from "swiper";

const SELECTOR = ".department_home_projects1:not([data-swiper-init])";

export async function InitDepartmentHomeProjects1(root: HTMLElement): Promise<() => void> {
  const sliders = root.querySelectorAll<HTMLElement>(SELECTOR);
  if (!sliders.length) return () => {};

  const [{ default: SwiperCore }, { Navigation, Autoplay }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  await Promise.all([import("swiper/css"), import("swiper/css/navigation")]);

  const instances: Swiper[] = [];
  const THRESHOLD = 2;

  sliders.forEach((slider) => {
    if (slider.dataset.swiperInit) return;
    slider.dataset.swiperInit = "true";

    const wrapper = slider.closest<HTMLElement & { __applyBlanketContent?: (slide: Element) => void }>(
      ".blanket-list1"
    );
    const slideCount = slider.querySelectorAll(".swiper-slide").length;

    if (slideCount <= 1) {
      wrapper?.classList.add("single_slide");
      wrapper?.classList.remove("center-slides");
      slider.parentElement?.closest("section")?.classList.add("no_slide");
      const onlySlide = slider.querySelector(".swiper-slide");
      if (onlySlide) wrapper?.__applyBlanketContent?.(onlySlide);
      return;
    }
    wrapper?.classList.remove("single_slide");

    const isFewSlides = slideCount <= THRESHOLD;
    slider.classList.toggle("center-slides", isFewSlides);
    wrapper?.classList.toggle("center-slides", isFewSlides);

    const nextEl = slider.querySelector<HTMLElement>(".department_home_projects1_next");
    const prevEl = slider.querySelector<HTMLElement>(".department_home_projects1_prev");

    if (isFewSlides && nextEl) nextEl.style.display = "none";
    if (isFewSlides && prevEl) prevEl.style.display = "none";

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 15,
        loop: !isFewSlides,
        centeredSlides: false,
        autoplay: isFewSlides ? false : { delay: 3000, disableOnInteraction: false },
        allowTouchMove: !isFewSlides,
        navigation: !isFewSlides && nextEl && prevEl ? { nextEl, prevEl } : false,
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 32 },
        },
        on: {
          init(swiper) {
            const w = swiper.el.closest<HTMLElement & { __applyBlanketContent?: (slide: Element) => void }>(
              ".blanket-list1"
            );
            w?.__applyBlanketContent?.(swiper.slides[swiper.activeIndex]);
          },
          slideChange(swiper) {
            const w = swiper.el.closest<HTMLElement & { __applyBlanketContent?: (slide: Element) => void }>(
              ".blanket-list1"
            );
            w?.__applyBlanketContent?.(swiper.slides[swiper.activeIndex]);
          },
        },
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}