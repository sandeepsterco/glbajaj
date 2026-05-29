"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import RelatedStories from "../newsEvents/RelatedStories";

const fetchHappeningsData = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);

  if (error) throw new Error(error);
  return data?.data;
}

export default function DepartmentHomeHappenings() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ['department_home_happenings'],
    queryFn: () => fetchHappeningsData(slug),
  })

  const happeningsData = data?.modular?.["news-events"];

  return (
    <>
      {happeningsData?.length > 0 && (
        <RelatedStories data={happeningsData} />
      )}
    </>
  );
}
