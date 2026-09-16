export async function InitGalleryDetailsPopup(root: HTMLElement): Promise<() => void> {
    const items = root.querySelectorAll<HTMLElement>(".gallery_details1:not([data-gallery-init])");
    if (!items.length) return () => {};
  
    const { Fancybox } = await import("@fancyapps/ui/dist/fancybox/");
    await import("@fancyapps/ui/dist/fancybox/fancybox.css");
  
    const allItems = Array.from(root.querySelectorAll<HTMLElement>(".gallery_details1"));
    const listeners: [HTMLElement, () => void][] = [];
  
    items.forEach((item) => {
      item.setAttribute("data-gallery-init", "1");
      const handler = () => {
        const index = allItems.indexOf(item);
        const gallery = allItems.map((el) => ({
          src: el.getAttribute("data-src") ?? "",
          type: "image" as const,
          caption: el.getAttribute("data-caption") ?? "",
        }));
        Fancybox.show(gallery, {
          startIndex: index,
          Carousel: { Thumbs: false },
        });
      };
      item.addEventListener("click", handler);
      listeners.push([item, handler]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }