export function InitTabControl(root: HTMLElement): () => void {
    const cleanups: (() => void)[] = [];
  
    function bind() {
      root.querySelectorAll<HTMLElement>(".tabbed-content").forEach((container) => {
        const tabs = container.querySelector<HTMLElement>(".tabs");
        if (!tabs) return;
  
        const isTabsVisible = tabs.offsetParent !== null;
  
        if (isTabsVisible) {
          tabs.querySelectorAll("a").forEach((link) => {
            const newLink = link.cloneNode(true) as HTMLAnchorElement;
            link.parentNode?.replaceChild(newLink, link);
  
            const handler = (event: MouseEvent) => {
              const target = newLink.getAttribute("href");
              if (!target || !target.startsWith("#")) return;
              event.preventDefault();
  
              const buttons = tabs.querySelectorAll("a");
              const items = container.querySelectorAll(".item");
              buttons.forEach((btn) => btn.classList.remove("active"));
              items.forEach((item) => item.classList.remove("active"));
              newLink.classList.add("active");
              container.querySelector(target)?.classList.add("active");
            };
            newLink.addEventListener("click", handler);
            cleanups.push(() => newLink.removeEventListener("click", handler));
          });
        } else {
          container.querySelectorAll(".item").forEach((item) => {
            const newItem = item.cloneNode(true) as HTMLElement;
            item.parentNode?.replaceChild(newItem, item);
  
            const handler = function (this: HTMLElement) {
              const currId = this.getAttribute("id");
              const items = container.querySelectorAll(".item");
              container.querySelectorAll(".tabs a").forEach((btn) => btn.classList.remove("active"));
              items.forEach((i) => i.classList.remove("active"));
              this.classList.add("active");
              const matchLink = container.querySelector(`.tabs a[href="#${CSS.escape(currId ?? "")}"]`);
              matchLink?.classList.add("active");
            };
            newItem.addEventListener("click", handler as EventListener);
            cleanups.push(() => newItem.removeEventListener("click", handler as EventListener));
          });
        }
      });
    }
  
    bind();
  
    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(bind, 250);
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));
  
    return () => cleanups.forEach((fn) => fn());
  }