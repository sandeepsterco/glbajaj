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
        const icon = this.querySelector("i");
        description.classList.toggle("expanded");
        icon?.classList.toggle("bi-plus-lg");
        icon?.classList.toggle("bi-dash-lg");
      };
      btn.addEventListener("click", handler);
      listeners.push([btn, handler]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }