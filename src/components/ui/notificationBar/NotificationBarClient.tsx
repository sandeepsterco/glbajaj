"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import "./notificationBar.css";
import { BASE_URL } from "@/src/config/config";

type Notification = {
  title: string;
  url?: string;
};

interface NotificationBarClientProps {
  notifications: Notification[];
}

export default function NotificationBarClient({ notifications }: NotificationBarClientProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Duplicate for seamless loop
  const loopItems = [...notifications, ...notifications];

  return (
    <div className="hero_notificationmain">
      <div className="container-fluid">
        <div className="col-lg-9 m-auto">
          <div className="hero_nofi_card">
            <h5 className="notifi_title">Notifications</h5>

            <div className="notifi_text">
              <div className="ticker-track">
                {loopItems.map((n, i) => (
                  <Link key={i} href={`${BASE_URL}happenings${n.url}` || "#"} className="ticker-item">
                    <span>{n.title}</span>
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