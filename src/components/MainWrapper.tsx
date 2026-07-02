"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const getSlugClass = (pathname:any, typeOnly:any) => {
  if (!pathname) return "home";

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "home";
  if (segments.length === 1) return segments[0];

  const first = segments[0];
  const last = segments[segments.length - 1];
  const full = segments.join("-");

  return typeOnly === "true"
    ? `${first}-${last} ${first}-page ${full}`
    : `${first}-${last}`;
};

export default function MainWrapper({ children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const pathname = usePathname();
  // const slugClass = getSlugClass(pathname);
  const typeClass = getSlugClass(pathname, "true");

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <div className={`main-container ${typeClass}`}>{children}</div>;
}
