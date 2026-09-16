type BlanketWrapper = HTMLElement & {
    __applyBlanketContent?: (slide: Element) => void;
  };
  
  export function InitBlanketList(root: HTMLElement): () => void {
    const wrappers = root.querySelectorAll<BlanketWrapper>(
      ".blanket-list1:not([data-blanket-init])"
    );
    const cleanups: (() => void)[] = [];
  
    wrappers.forEach((wrapper) => {
      wrapper.setAttribute("data-blanket-init", "1");
  
      const scope = wrapper.closest(".container") ?? wrapper.parentElement;
      const blanketBox = scope?.querySelector(".blanket-box");
      if (!blanketBox) return;
  
      const titleEl = blanketBox.querySelector<HTMLElement>(".blanket-text .activeTitle");
      const descEl = blanketBox.querySelector<HTMLElement>(".blanket-text .activeDesc");
      const imgEl = blanketBox.querySelector<HTMLImageElement>(".blanket-img .activeImg");
  
      function readSlideData(slide: Element) {
        const h3 = slide.querySelector("h3");
        const p = slide.querySelector(".blanket-desc");
        const img = slide.querySelector("img");
        return {
          title: h3?.innerHTML ?? "",
          description: p?.innerHTML ?? "",
          image: img?.getAttribute("src") ?? "",
          alt: img?.getAttribute("alt") ?? "",
        };
      }
  
      function applyContent(slide: Element) {
        const data = readSlideData(slide);
        if (titleEl) titleEl.innerHTML = data.title;
        if (descEl) descEl.innerHTML = data.description;
        if (imgEl) {
          imgEl.setAttribute("src", data.image);
          if (data.alt) imgEl.setAttribute("alt", data.alt);
        }
        wrapper.querySelectorAll(".swiper-slide").forEach((s) => s.classList.remove("blanket-active"));
        slide.classList.add("blanket-active");
      }
  
      const onClick = (e: MouseEvent) => {
        const slide = (e.target as HTMLElement)?.closest(".swiper-slide");
        if (slide && wrapper.contains(slide)) applyContent(slide);
      };
  
      wrapper.addEventListener("click", onClick);
      wrapper.__applyBlanketContent = applyContent;
  
      cleanups.push(() => {
        wrapper.removeEventListener("click", onClick);
        delete wrapper.__applyBlanketContent;
      });
    });
  
    return () => cleanups.forEach((fn) => fn());
  }