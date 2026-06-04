"use client";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import "./notificationBar.css";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

// Update your NOTIFICATIONS data to this shape:
// { text: string; href: string }[]
// If it's still plain strings, the fallback href="#" is used below.

const getNotifications = async()=>{
  const {data, error} = await apiFetch(`notifications`);
  if (error) throw new Error(error);
  return data?.notifications;
}

export default function NotificationBar() {
  const [dismissed, setDismissed] = useState(false);
  
  const {data, isLoading, isError} = useQuery({
    queryKey:['home-notification'],
    queryFn:getNotifications
  });
  
  if (dismissed) return null;
  if (isLoading || isError || !data?.length) return null;

  // Duplicate for seamless loop
  const loopItems = [...data, ...data];

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
                  <Link key={i} href={n.url ?? '#'} className="ticker-item">
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