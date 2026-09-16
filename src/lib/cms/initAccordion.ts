export function InitAccordion(root: HTMLElement): () => void {
    const headers = root.querySelectorAll<HTMLElement>(".accordion-header:not([data-customjs-init])");
    const listeners: [HTMLElement, () => void][] = [];
  
    headers.forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
      const handler = () => {
        const currentItem = header.parentElement!;
        const currentBody = currentItem.querySelector<HTMLElement>(".accordion-body")!;
  
        root.querySelectorAll(".accordion-item").forEach((item) => {
          if (item !== currentItem) {
            item.classList.remove("active");
            const body = item.querySelector<HTMLElement>(".accordion-body");
            if (body) body.style.maxHeight = "";
            const icon = item.querySelector(".icon");
            if (icon) icon.textContent = "+";
          }
        });
  
        currentItem.classList.toggle("active");
        const icon = header.querySelector(".icon");
        if (currentItem.classList.contains("active")) {
          currentBody.style.maxHeight = currentBody.scrollHeight + "px";
          if (icon) icon.textContent = "−";
        } else {
          currentBody.style.maxHeight = "";
          if (icon) icon.textContent = "+";
        }
      };
      header.addEventListener("click", handler);
      listeners.push([header, handler]);
    });
  
    headers[0]?.click();
  
    const mobileHeaders = root.querySelectorAll<HTMLElement>(".acc-header:not([data-customjs-init])");
    mobileHeaders.forEach((header) => {
      header.setAttribute("data-customjs-init", "1");
      const handler = function (this: HTMLElement) {
        const parent = this.parentElement!;
        root.querySelectorAll(".tab-content").forEach((item) => {
          if (item !== parent) item.classList.remove("active");
        });
        parent.classList.toggle("active");
      };
      header.addEventListener("click", handler);
      listeners.push([header, handler as any]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn));
  }