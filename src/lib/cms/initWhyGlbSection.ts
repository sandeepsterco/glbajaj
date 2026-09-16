export function InitWhyGlbSection(root: HTMLElement): () => void {
    const section = root.querySelector<HTMLElement>(".why_glb_section:not([data-customjs-init])");
    if (!section) return () => {};
    section.setAttribute("data-customjs-init", "1");
  
    const tabs = Array.from(section.querySelectorAll<HTMLElement>(".tabs li"));
    const contents = Array.from(section.querySelectorAll<HTMLElement>(".tab_content"));
    const images = Array.from(section.querySelectorAll<HTMLElement>(".bg_image_group"));
    const btnPrev = section.querySelector<HTMLElement>(".btn-prev");
    const btnNext = section.querySelector<HTMLElement>(".btn-next");
  
    const total = Math.min(tabs.length, contents.length, images.length);
    if (total === 0) return () => {};
  
    let current = 0;
    const listeners: [HTMLElement, () => void][] = [];
  
    function setActive(index: number) {
      const safeIndex = ((index % total) + total) % total;
      tabs.forEach((el) => el.classList.remove("active"));
      contents.forEach((el) => el.classList.remove("active"));
      images.forEach((el) => el.classList.remove("active"));
      tabs[safeIndex]?.classList.add("active");
      contents[safeIndex]?.classList.add("active");
      images[safeIndex]?.classList.add("active");
      current = safeIndex;
    }
  
    tabs.slice(0, total).forEach((tab, i) => {
      const handler = () => setActive(i);
      tab.addEventListener("click", handler);
      listeners.push([tab, handler]);
    });
  
    if (btnPrev) {
      const handler = () => setActive(current - 1);
      btnPrev.addEventListener("click", handler);
      listeners.push([btnPrev, handler]);
    }
    if (btnNext) {
      const handler = () => setActive(current + 1);
      btnNext.addEventListener("click", handler);
      listeners.push([btnNext, handler]);
    }
  
    setActive(0);
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }