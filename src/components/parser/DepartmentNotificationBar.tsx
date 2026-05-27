"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { SkeletonGroup } from "../ui/Skeleton";
import Link from "next/link";
import { APPLY_NOW } from "@/src/config/config";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import '@/src/components/ui/notificationBar/notificationBar.css'
import { usePathname } from "next/navigation";

const getNotifications = async (slug:string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data?.modular?.notifications;
}

export default function DepartmentNotificationBar() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';
  
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['department-notification', slug],
    queryFn: ()=>getNotifications(slug)
  });

  if (dismissed) return null;
  if (isLoading || isError || !data?.length) return null;

  // Duplicate for seamless loop
  const loopItems = [...data, ...data, ...data];

  if (!loopItems || loopItems.length === 0) {
    return;
  }

  return (
    <div className="hero_notificationmain">
      <div className="container-fluid">
        <div className="col-lg-9 m-auto">
          <div className="hero_nofi_card">
            <h5 className="notifi_title">Notifications</h5>

            <div className="notifi_text">
              {/* ✅ Animation lives on the TRACK, not individual items */}
              <div className="ticker-track">
                {loopItems?.map((n, i) => (
                  <Link key={i} href={n.url ?? '#'} className="ticker-item" target="_blank">
                    <span>{n.title}</span>
                    <FaChevronRight fontSize={10} />
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss notifications"
              className="close_btn cursor-pointer"
            >
              <IoMdClose color="red" fontSize={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}