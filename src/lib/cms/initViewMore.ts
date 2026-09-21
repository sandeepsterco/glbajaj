export function InitViewMore(root: HTMLElement): () => void {
    const listeners: [HTMLElement, () => void][] = [];
  
    root.querySelectorAll<HTMLElement>(".view_more_btn:not([data-viewmore-init])").forEach((btn) => {
      btn.setAttribute("data-viewmore-init", "1");
      const description = btn.parentElement?.querySelector<HTMLElement>(".vm-description");
      if (!description) return;
  
      if (description.offsetHeight <= 240) {
        btn.style.display = "none";
        return;
      }
      description.style.maxHeight = "240px";
  
      const handler = function (this: HTMLElement) {
        description.classList.toggle("expanded");
        this.classList.toggle("expanded");
        
      };
      btn.addEventListener("click", handler);
      listeners.push([btn, handler]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }