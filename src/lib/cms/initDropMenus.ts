export function InitDropMenus(root: HTMLElement): () => void {
    const listeners: [HTMLElement, () => void][] = [];
  
    root.querySelectorAll<HTMLElement>(".drop_btn:not([data-customjs-init])").forEach((btn) => {
      btn.setAttribute("data-customjs-init", "1");
      const handler = function (this: HTMLElement, e: Event) {
        e.preventDefault();
        const submenu = this.nextElementSibling as HTMLElement | null;
        if (!submenu) return;
  
        root.querySelectorAll<HTMLElement>(".submenu").forEach((menu) => {
          if (menu !== submenu) {
            menu.style.maxHeight = "";
            menu.parentElement?.classList.remove("active");
          }
        });
  
        if (submenu.style.maxHeight) {
          submenu.style.maxHeight = "";
          this.parentElement?.classList.remove("active");
        } else {
          submenu.style.maxHeight = submenu.scrollHeight + "px";
          this.parentElement?.classList.add("active");
        }
      };
      btn.addEventListener("click", handler as EventListener);
      listeners.push([btn, handler as unknown as () => void]);
    });
  
    return () => listeners.forEach(([el, fn]) => el.removeEventListener("click", fn as EventListener));
  }