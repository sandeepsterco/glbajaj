"use client";

import { useState } from "react";

export type Platform = "facebook" | "whatsapp" | "x" | "instagram" | "linkedin" | "email";

const ICONS: Record<Platform, { src: string; alt: string }> = {
  facebook: { src: "/images/icons/f.svg", alt: "Facebook" },
  whatsapp: { src: "/images/icons/whatsapp-logo.webp", alt: "WhatsApp" },
  x: { src: "/images/icons/x.svg", alt: "X" },
  instagram: { src: "/images/icons/instagram-lcon.svg", alt: "Instagram" },
  linkedin: { src: "/images/icons/in.svg", alt: "LinkedIn" },
  email: { src: "/images/icons/email_icons.svg", alt: "Email" },
};

export default function SocialShare({
  title,
  options = ["facebook", "whatsapp", "x", "instagram", "linkedin", "email"],
}: {
  title: string;
  options?: Platform[];
}) {
  const [showSocialMenus, setShowSocialMenus] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [pageTitle, setPageTitle] = useState(title);

  const shareTitle = title || pageTitle;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const shareLinks: Record<Platform, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${currentUrl}`)}`,
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    instagram: "https://www.instagram.com/",
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  return (
    <figure>
      <button
        type="button"
        aria-label="Share this page"
        aria-expanded={showSocialMenus}
        className="share_btn cursor-pointer"
        onClick={() => {
          setCurrentUrl(window.location.href);
          if (!title) setPageTitle(document.title || "");
          setShowSocialMenus((state) => !state);
        }}
      >
        <img src="/images/icons/share.svg" className="img-fluid" alt="share" />
      </button>

      <div className={`social_buttons ${showSocialMenus ? "active" : ""}`}>
        {options.map((option) => (
          <a
            key={option}
            className={`fbtn share ${option}`}
            href={shareLinks[option]}
            target={option === "email" ? undefined : "_blank"}
            rel="noreferrer"
          >
            <img src={ICONS[option].src} alt={ICONS[option].alt} className="img-fluid" />
          </a>
        ))}
      </div>
    </figure>
  );
}