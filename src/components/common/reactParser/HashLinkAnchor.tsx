// src/components/common/reactParser/HashLinkAnchor.tsx
"use client";

import { scrollToHashWhenReady } from "@/src/lib/scrollToHash";

export default function HashLinkAnchor({
  href,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }) {
  return (
    <a
      {...rest}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", href!);
        scrollToHashWhenReady(href!, { behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}