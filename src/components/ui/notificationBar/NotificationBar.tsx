import { apiFetch } from "@/src/lib/api";
import NotificationBarClient from "./NotificationBarClient";

type Notification = {
  title: string;
  url?: string;
};

async function getNotifications(): Promise<Notification[]> {
  const { data, error } = await apiFetch(`notifications`);
  if (error) throw new Error(error);
  return data?.notifications ?? [];
}

export default async function NotificationBar() {
  const notifications = await getNotifications();

  if (!notifications.length) return null;

  return <NotificationBarClient notifications={notifications} />;
}