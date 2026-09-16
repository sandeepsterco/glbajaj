function updateSwiperInPanel(panel: HTMLElement) {
    const swiperEl = panel.querySelector<HTMLElement & { swiper?: any }>(
      ".sport_facilities.swiper, .sport_facilities"
    );
    if (!swiperEl?.swiper) return;
    requestAnimationFrame(() => {
      swiperEl.swiper.update();
      swiperEl.swiper.navigation?.update?.();
    });
  }
  
  export function InitXTabs(root: HTMLElement, onPanelActivate?: () => void): () => void {
    const cleanups: (() => void)[] = [];
  
    root.querySelectorAll<HTMLElement>(".xtabs_sec:not([data-customjs-init])").forEach((section) => {
      section.setAttribute("data-customjs-init", "1");
      const tabBtns = Array.from(section.querySelectorAll<HTMLElement>(".xtab_btn"));
      const panels = Array.from(section.querySelectorAll<HTMLElement>(".xtab_panel"));
      const accBtns = Array.from(section.querySelectorAll<HTMLElement>(".xacc_btn"));
  
      tabBtns[0]?.classList.add("active");
      panels[0]?.classList.add("active");
  
      function activate(panel: HTMLElement | null) {
        if (!panel) return;
        updateSwiperInPanel(panel);
        onPanelActivate?.();
      }
  
      tabBtns.forEach((btn) => {
        const handler = () => {
          const target = btn.getAttribute("data-xtab");
          tabBtns.forEach((b) => b.classList.remove("active"));
          panels.forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          const panel = target ? section.querySelector<HTMLElement>(`#${CSS.escape(target)}`) : null;
          panel?.classList.add("active");
          activate(panel);
        };
        btn.addEventListener("click", handler);
        cleanups.push(() => btn.removeEventListener("click", handler));
      });
  
      accBtns.forEach((btn) => {
        const handler = () => {
          const panel = btn.closest<HTMLElement>(".xtab_panel");
          if (!panel) return;
          const isActive = panel.classList.contains("active");
          panels.forEach((p) => p.classList.remove("active"));
          if (!isActive) {
            panel.classList.add("active");
            activate(panel);
          }
        };
        btn.addEventListener("click", handler);
        cleanups.push(() => btn.removeEventListener("click", handler));
      });
  
      activate(panels[0] ?? null);
    });
  
    return () => cleanups.forEach((fn) => fn());
  }