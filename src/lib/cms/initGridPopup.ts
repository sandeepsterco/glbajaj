import { Fancybox } from "./fancyboxCore";

export async function InitGridPopup(root: HTMLElement): Promise<() => void> {
  const listeners: [HTMLElement, () => void][] = [];

  const bind = (item: HTMLElement, index: number, allItems: HTMLElement[]) => {
    item.setAttribute("data-grid-popup-init", "1");
    const handler = () => {
      const gallery = allItems
        .map((el) => el.getAttribute("data-src"))
        .filter((src): src is string => !!src)
        .map((src) => ({ src, type: "image" as const }));

      const validIndex = allItems
        .filter((el) => el.getAttribute("data-src"))
        .indexOf(item);

      Fancybox.show(gallery, { startIndex: validIndex === -1 ? 0 : validIndex });
    };
    item.addEventListener("click", handler);
    listeners.push([item, handler]);
  };

  const wireAll = () => {
    const allItems = Array.from(root.querySelectorAll<HTMLElement>(".media_grid_Bx"));
    const fresh = allItems.filter((el) => !el.hasAttribute("data-grid-popup-init"));
    fresh.forEach((item) => bind(item, allItems.indexOf(item), allItems));
  };

  wireAll();

  // Re-wire automatically if new .media_grid_Bx nodes appear later
  // (e.g. pagination that re-renders without remounting CmsEnhancer)
  const observer = new MutationObserver(() => wireAll());
  observer.observe(root, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  };
}