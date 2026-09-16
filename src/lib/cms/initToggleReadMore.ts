export function InitToggleReadMore(root: HTMLElement): () => void {
    const listeners: [HTMLElement, () => void][] = [];
  
    root.querySelectorAll<HTMLElement>(".toggle-btn:not([data-readmore-init])").forEach((btn) => {
      btn.setAttribute("data-readmore-init", "1");
      const handler = function (this: HTMLElement) {
        const content = this.closest(".content")!;
        const moreText = content.querySelector<HTMLElement>(".more-text")!;
  
        if (moreText.classList.contains("show")) {
          moreText.classList.remove("show");
          this.innerHTML = '<i class="bi bi-plus-lg"></i>';
          this.classList.remove("active");
        } else {
          moreText.classList.add("show");
          this.innerHTML = '<i class="bi bi-dash-lg"></i>';
          this.classList.add("active");
        }
      };
      btn.addEventListener("click", handler);
      listeners.push([btn, handler]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }