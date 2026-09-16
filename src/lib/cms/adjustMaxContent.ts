let frozenWidth: number | null = null;

export function adjustMaxContent(root: HTMLElement) {
  if (!root.querySelector(".container25")) return;

  const windowWidth = window.innerWidth;
  const mainContainerWidth = Math.min(1800, windowWidth * 0.818181818);
  const leftGap = (windowWidth - mainContainerWidth) / 2;
  let width = windowWidth - leftGap;

  if (windowWidth >= 2550) {
    if (!frozenWidth) frozenWidth = width;
    width = frozenWidth;
  } else {
    frozenWidth = null;
  }

  root
    .querySelectorAll<HTMLElement>(
      ".max-content, .max-content-sm, .max-content-md, .max-content-lg, .max-content-xl, .max-content-xxl"
    )
    .forEach((el) => {
      el.style.maxWidth = `${width}px`;
    });
}

export function InitMaxContent(root: HTMLElement): () => void {
  adjustMaxContent(root);

  let timer: number;
  const onResize = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => adjustMaxContent(root), 150);
  };
  window.addEventListener("resize", onResize);

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("resize", onResize);
  };
}