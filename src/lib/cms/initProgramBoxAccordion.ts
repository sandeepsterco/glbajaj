export function InitProgramBoxAccordion(root: HTMLElement): () => void {
    const cleanups: (() => void)[] = [];
  
    root.querySelectorAll<HTMLElement>(".program-box-outer:not([data-pbacc-init])").forEach((outer) => {
      outer.setAttribute("data-pbacc-init", "1");
      const inner = outer.querySelector<HTMLElement>(".program-box-inner");
      if (!inner) return;
  
      const programBox = outer.querySelector<HTMLElement>(".program-box");
      const programRight = programBox?.querySelector<HTMLElement>(".program-right");
      if (!programBox || !programRight) return;
  
      inner.style.maxHeight = "0";
      inner.style.overflow = "hidden";
      inner.style.transition = "max-height 0.3s ease";
  
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "pbacc-toggle-btn";
      toggleBtn.type = "button";
      toggleBtn.innerHTML = `<span class="pbacc-icon">+</span>`;
      programRight.appendChild(toggleBtn);
  
      const handler = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const isActive = outer.classList.contains("active");
  
        outer.parentElement
          ?.querySelectorAll<HTMLElement>(".program-box-outer[data-pbacc-init]")
          .forEach((sib) => {
            if (sib === outer) return;
            sib.classList.remove("active");
            const sibInner = sib.querySelector<HTMLElement>(".program-box-inner");
            const sibIcon = sib.querySelector<HTMLElement>(".pbacc-icon");
            if (sibInner) sibInner.style.maxHeight = "0";
            if (sibIcon) sibIcon.textContent = "+";
          });
  
        const icon = toggleBtn.querySelector<HTMLElement>(".pbacc-icon");
        if (!isActive) {
          outer.classList.add("active");
          inner.style.maxHeight = inner.scrollHeight + "px";
          if (icon) icon.textContent = "−";
        } else {
          outer.classList.remove("active");
          inner.style.maxHeight = "0";
          if (icon) icon.textContent = "+";
        }
      };
      toggleBtn.addEventListener("click", handler);
      cleanups.push(() => {
        toggleBtn.removeEventListener("click", handler);
        toggleBtn.remove();
      });
    });
  
    // Open first accordion per parent group by default
    const parentsSeen = new Set<Element>();
    root.querySelectorAll<HTMLElement>(".program-box-outer[data-pbacc-init]").forEach((outer) => {
      const parent = outer.parentElement;
      if (!parent || parentsSeen.has(parent)) return;
      parentsSeen.add(parent);
  
      const firstOuter = parent.querySelector<HTMLElement>(".program-box-outer[data-pbacc-init]");
      const inner = firstOuter?.querySelector<HTMLElement>(".program-box-inner");
      const icon = firstOuter?.querySelector<HTMLElement>(".pbacc-icon");
      if (!firstOuter || !inner) return;
  
      firstOuter.classList.add("active");
      inner.style.maxHeight = inner.scrollHeight + "px";
      if (icon) icon.textContent = "−";
    });
  
    return () => cleanups.forEach((fn) => fn());
  }