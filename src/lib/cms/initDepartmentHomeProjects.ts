import type Swiper from "swiper";

const SELECTOR = ".department_home_projects:not([data-swiper-init])";

export async function InitDepartmentHomeProjects(root: HTMLElement): Promise<() => void> {
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

    const nextEl = slider.querySelector<HTMLElement>(".department_home_projects_next");
    const prevEl = slider.querySelector<HTMLElement>(".department_home_projects_prev");

    instances.push(
      new SwiperCore(slider, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: false,
        loop: false,
        navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
      })
    );
  });

  return () => instances.forEach((s) => s.destroy(true, true));
}