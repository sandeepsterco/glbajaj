export function InitPolicyAccordion(root: HTMLElement): () => void {
    const headers = root.querySelectorAll<HTMLElement>(".ppolicy_header:not([data-customjs-init])");
    if (!headers.length) return () => {};
  
    const allItems = root.querySelectorAll<HTMLElement>(".ppolicy_item:not([data-customjs-opened])");
    let firstItem: HTMLElement | null = null;
    for (const item of Array.from(allItems)) {
      const body = item.querySelector(".ppolicy_body");
      if (body && body.children.length > 0) {
        firstItem = item;
        break;
      }
    }
    if (firstItem) {
      firstItem.setAttribute("data-customjs-opened", "1");
      firstItem.classList.add("active");
      const firstBody = firstItem.querySelector<HTMLElement>(".ppolicy_body");
      if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + "px";
    }
  
    const listeners: [HTMLElement, () => void][] = [];
    headers.forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
      const handler = () => {
        const currentItem = header.parentElement!;
        const currentBody = currentItem.querySelector<HTMLElement>(".ppolicy_body");
        currentItem.classList.toggle("active");
        if (currentBody) {
          currentBody.style.maxHeight = currentItem.classList.contains("active")
            ? currentBody.scrollHeight + "px"
            : "";
        }
      };
      header.addEventListener("click", handler);
      listeners.push([header, handler]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }