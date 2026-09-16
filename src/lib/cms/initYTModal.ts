function isYouTubeUrl(url: string) {
    return url.includes("youtube.com") || url.includes("youtu.be");
  }
  function toEmbedUrl(url: string) {
    if (isYouTubeUrl(url)) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
      if (url.includes("/embed/")) {
        const [base, query] = url.split("?");
        const params = new URLSearchParams(query ?? "");
        params.set("autoplay", "1");
        params.set("rel", "0");
        return `${base}?${params.toString()}`;
      }
    }
    return url;
  }
  function isDirectVideo(url: string) {
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
  }
  
  export function InitYTModal(root: HTMLElement): () => void {
    const overlay = root.querySelector<HTMLElement>("#ytModalOverlay");
    const iframeEl = root.querySelector<HTMLIFrameElement>("#ytModalIframe");
    const closeBtn = root.querySelector<HTMLElement>("#ytModalClose");
    const playBtns = root.querySelectorAll<HTMLElement>(".home_about_glb_section .thumbnail");
    if (!overlay || !iframeEl || !closeBtn || !playBtns.length) return () => {};
  
    function openModal(rawSrc: string) {
      if (isDirectVideo(rawSrc)) {
        const existingVideo = overlay!.querySelector("video");
        if (!existingVideo) {
          const video = document.createElement("video");
          video.setAttribute("controls", "");
          video.setAttribute("autoplay", "");
          video.setAttribute("playsinline", "");
          video.style.width = "100%";
          video.style.height = "100%";
          video.src = rawSrc;
          iframeEl!.replaceWith(video);
        } else {
          (existingVideo as HTMLVideoElement).src = rawSrc;
          (existingVideo as HTMLVideoElement).play();
        }
      } else {
        const liveIframe = overlay!.querySelector("iframe");
        if (liveIframe) liveIframe.src = toEmbedUrl(rawSrc);
      }
      overlay!.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  
    function closeModal() {
      overlay!.classList.remove("active");
      document.body.style.overflow = "";
      overlay!.querySelector("iframe")?.removeAttribute("src");
      const video = overlay!.querySelector("video") as HTMLVideoElement | null;
      if (video) {
        video.pause();
        video.src = "";
      }
    }
  
    const playHandlers: [HTMLElement, () => void][] = [];
    playBtns.forEach((btn) => {
      const handler = () => {
        const rawSrc = btn.getAttribute("data-video");
        if (rawSrc) openModal(rawSrc);
      };
      btn.addEventListener("click", handler);
      playHandlers.push([btn, handler]);
    });
  
    closeBtn.addEventListener("click", closeModal);
  
    const onOverlayClick = (e: MouseEvent) => {
      if (e.target === overlay) closeModal();
    };
    overlay.addEventListener("click", onOverlayClick);
  
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && overlay!.classList.contains("active")) closeModal();
    };
    document.addEventListener("keydown", onKeydown);
  
    return () => {
      playHandlers.forEach(([el, fn]) => el.removeEventListener("click", fn));
      closeBtn.removeEventListener("click", closeModal);
      overlay.removeEventListener("click", onOverlayClick);
      document.removeEventListener("keydown", onKeydown);
    };
  }