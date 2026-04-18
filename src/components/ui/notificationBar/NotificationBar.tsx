"use client";
import { useState } from "react";
import { NOTIFICATIONS } from "@/src/data/homepage/heroSliderData";
import { IoMdClose } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import './notificationBar.css'

export default function NotificationBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const items = Array.isArray(NOTIFICATIONS)
  ? NOTIFICATIONS
  : [NOTIFICATIONS];

  return (
    <>
      <div className="hero_notificationmain">
        <div className="container">
          <div className="inner_center_container">
            <div className="hero_nofi_card">
              <h5 className="notifi_title">Notifications</h5>

                <div className="notifi_text">
                  <div className="ticker-track flex gap-16 animate-ticker">
                    {items.map((n, i) => (
                      <p
                        key={i}
                      >
                        {n}
                      </p>
                    ))}
                  </div>
                  <div className="icon">
                  <FaChevronRight fontSize={12} />
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

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker p {
          animation: ticker 35s linear infinite;
        }
        .animate-ticker p:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
