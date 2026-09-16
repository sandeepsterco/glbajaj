export function InitTabContent(root: HTMLElement): () => void {
    const listeners: [HTMLElement, string, EventListener][] = [];
  
    root.querySelectorAll<HTMLElement>(".tab-btn:not([data-customjs-init])").forEach((button) => {
      button.setAttribute("data-customjs-init", "1");
      const handler = function (this: HTMLElement) {
        root.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
        root.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
        this.classList.add("active");
        const tab = this.dataset.tab;
        if (tab) root.querySelector(`#${CSS.escape(tab)}`)?.classList.add("active");
      };
      button.addEventListener("click", handler as EventListener);
      listeners.push([button, "click", handler as EventListener]);
    });
  
    const firstBtn = root.querySelector<HTMLElement>(".tab-btn");
    if (firstBtn) {
      firstBtn.classList.add("active");
      const firstTabId = firstBtn.dataset.tab;
      if (firstTabId) root.querySelector(`#${CSS.escape(firstTabId)}`)?.classList.add("active");
    }
  
    const tabBtns = Array.from(root.querySelectorAll<HTMLElement>(".careerTabsX_btn"));
    const panes = Array.from(root.querySelectorAll<HTMLElement>(".careerTabsX_pane"));
    const accHeaders = Array.from(root.querySelectorAll<HTMLElement>(".careerTabsX_accHeader"));
  
    if (tabBtns.length && panes.length) {
      tabBtns[0].classList.add("active");
      panes[0].classList.add("active");
      const firstBody = panes[0].querySelector<HTMLElement>(".careerTabsX_accBody");
      if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + "px";
    }
  
    tabBtns.forEach((btn) => {
      const handler = () => {
        if (window.innerWidth <= 768) return;
        const target = btn.getAttribute("data-tab");
        tabBtns.forEach((b) => b.classList.remove("active"));
        panes.forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        root.querySelector(`.careerTabsX_pane#${CSS.escape(target ?? "")}`)?.classList.add("active");
      };
      btn.addEventListener("click", handler);
      listeners.push([btn, "click", handler]);
    });
  
    accHeaders.forEach((header) => {
      const handler = () => {
        if (window.innerWidth > 768) return;
        const pane = header.parentElement!;
        panes.forEach((p) => {
          if (p !== pane) {
            p.classList.remove("active");
            const otherBody = p.querySelector<HTMLElement>(".careerTabsX_accBody");
            if (otherBody) otherBody.style.maxHeight = "";
          }
        });
        pane.classList.toggle("active");
        const body = pane.querySelector<HTMLElement>(".careerTabsX_accBody");
        if (body) body.style.maxHeight = pane.classList.contains("active") ? body.scrollHeight + "px" : "";
      };
      header.addEventListener("click", handler);
      listeners.push([header, "click", handler]);
    });
  
    root.querySelectorAll<HTMLElement>(".acc-header:not([data-customjs-init])").forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
      const handler = function (this: HTMLElement) {
        const parent = this.parentElement!;
        root.querySelectorAll(".tab-content").forEach((item) => {
          if (item !== parent) item.classList.remove("active");
        });
        parent.classList.toggle("active");
      };
      header.addEventListener("click", handler as EventListener);
      listeners.push([header, "click", handler as EventListener]);
    });
  
    return () => listeners.forEach(([el, evt, fn]) => el.removeEventListener(evt, fn));
  }