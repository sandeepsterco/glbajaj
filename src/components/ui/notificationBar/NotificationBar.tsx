"use client";
import { useState } from "react";
import { NOTIFICATIONS } from "@/src/data/homepage/heroSliderData";
import { IoMdClose } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import "./notificationBar.css";

// Update your NOTIFICATIONS data to this shape:
// { text: string; href: string }[]
// If it's still plain strings, the fallback href="#" is used below.

export default function NotificationBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const items = (Array.isArray(NOTIFICATIONS) ? NOTIFICATIONS : [NOTIFICATIONS]).map(
    (n) => (typeof n === "string" ? { text: n, href: "#" } : n)
  );

  // Duplicate for seamless loop
  const loopItems = [...items, ...items];

  return (
    <div className="hero_notificationmain">
      <div className="container-fluid">
        <div className="col-lg-9 m-auto">
          <div className="hero_nofi_card">
            <h5 className="notifi_title">Notifications</h5>

            <div className="notifi_text">
              {/* ✅ Animation lives on the TRACK, not individual items */}
              <div className="ticker-track">
                {loopItems.map((n, i) => (
                  <Link key={i} href={n.href} className="ticker-item" target="_blank">
                    <span>{n.text}</span>
                    <FaChevronRight fontSize={10} />
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss notifications"
              className="close_btn"
            >
              <IoMdClose color="red" fontSize={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}