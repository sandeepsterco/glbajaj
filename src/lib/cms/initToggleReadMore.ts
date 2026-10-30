export function InitToggleReadMore(root: HTMLElement): () => void {
    const listeners: [HTMLElement, () => void][] = [];
  
    root.querySelectorAll<HTMLElement>(".toggle-btn:not([data-readmore-init])").forEach((btn) => {
      btn.setAttribute("data-readmore-init", "1");
      const handler = function (this: HTMLElement) {
        const content = this.closest(".content")!;
        const moreText = content.querySelector<HTMLElement>(".more-text")!;
  
        if (moreText.classList.contains("show")) {
          moreText.classList.remove("show");
          this.textContent = "+";
          this.classList.remove("active");
        } else {
          moreText.classList.add("show");
          this.textContent = "-";
          this.classList.add("active");
        }
      };
      const moreText = btn.closest(".content")?.querySelector<HTMLElement>(".more-text");
      btn.textContent = moreText?.classList.contains("show") ? "-" : "+";
      btn.addEventListener("click", handler);
      listeners.push([btn, handler]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }