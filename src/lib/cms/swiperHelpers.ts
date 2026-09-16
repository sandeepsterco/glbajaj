export function resolveNavEl(
    root: HTMLElement,
    selector?: string | null
  ): HTMLElement | null {
    if (!selector) return null;
    const scopes = [
      root,
      root.parentElement,
      root.closest(".spfc_swiper"),
      root.closest("section"),
      document,
    ];
    for (const scope of scopes) {
      if (!scope) continue;
      const node = scope.querySelector<HTMLElement>(selector);
      if (node) return node;
    }
    return null;
  }
  
  export function hideNav(nextEl: HTMLElement | null, prevEl: HTMLElement | null) {
    [nextEl, prevEl].forEach((btn) => {
      if (btn) btn.style.display = "none";
    });
  }