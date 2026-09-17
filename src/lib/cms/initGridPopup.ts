export async function InitGridPopup(root: HTMLElement): Promise<() => void> {
    const items = root.querySelectorAll<HTMLElement>(".media_grid_Bx:not([data-grid-popup-init])");
    if (!items.length) return () => {};
  
    const { Fancybox } = await import("@fancyapps/ui");
    await import("@fancyapps/ui/dist/fancybox/fancybox.css");
  
    const allItems = Array.from(root.querySelectorAll<HTMLElement>(".media_grid_Bx"));
    const listeners: [HTMLElement, () => void][] = [];
  
    items.forEach((item, index) => {
      item.setAttribute("data-grid-popup-init", "1");
      const handler = () => {
        const gallery = allItems.map((el) => ({
          src: el.getAttribute("data-src") ?? "",
          type: "image" as const,
        }));
        Fancybox.show(gallery, { startIndex: index });
      };
      item.addEventListener("click", handler);
      listeners.push([item, handler]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }