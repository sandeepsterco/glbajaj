export function InitStercoTabs(root: HTMLElement): () => void {
    const cleanups: (() => void)[] = [];
  
    root.querySelectorAll<HTMLElement>(".sterco_tabs_sec").forEach((section) => {
      const tabButtons = Array.from(section.querySelectorAll<HTMLElement>(".sterco_tab_btn"));
      const tabPanels = Array.from(section.querySelectorAll<HTMLElement>(".sterco_tab_panel"));
      const accordionButtons = Array.from(section.querySelectorAll<HTMLElement>(".sterco_accordion_btn"));
      const accordionContents = Array.from(section.querySelectorAll<HTMLElement>(".sterco_accordion_content"));
  
      tabButtons[0]?.classList.add("active");
      tabPanels[0]?.classList.add("active");
      accordionButtons[0]?.classList.add("active");
      accordionContents[0]?.classList.add("active");
  
      tabButtons.forEach((button) => {
        const handler = () => {
          const target = button.getAttribute("data-tab");
          const activePanel = target ? section.querySelector<HTMLElement>(`#${CSS.escape(target)}`) : null;
          if (!activePanel || activePanel.classList.contains("active")) return;
  
          const currentPanel = section.querySelector<HTMLElement>(".sterco_tab_panel.active");
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
          currentPanel?.classList.remove("active");
          requestAnimationFrame(() => activePanel.classList.add("active"));
        };
        button.addEventListener("click", handler);
        cleanups.push(() => button.removeEventListener("click", handler));
      });
  
      accordionButtons.forEach((button) => {
        const handler = () => {
          const content = button.parentElement?.nextElementSibling as HTMLElement | null;
          const isAlreadyActive = button.classList.contains("active");
          accordionButtons.forEach((btn) => btn.classList.remove("active"));
          accordionContents.forEach((c) => c.classList.remove("active"));
          if (!isAlreadyActive) {
            button.classList.add("active");
            content?.classList.add("active");
          }
        };
        button.addEventListener("click", handler);
        cleanups.push(() => button.removeEventListener("click", handler));
      });
    });
  
    return () => cleanups.forEach((fn) => fn());
  }