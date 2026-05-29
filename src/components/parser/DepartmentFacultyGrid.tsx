"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SkeletonGroup } from "../ui/Skeleton";


const fetchDepartmentFacultyGrid = async (slug: string) => {
  const { data, error } = await apiFetch(`department/faculty/${slug}`);
  if (error) throw new Error(error);
  return data?.data;
};

export default function DepartmentFacultyGrid() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).slice(-2, -1)[0] ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["department_faculty_grid", slug],
    queryFn: () => fetchDepartmentFacultyGrid(slug),
  });

  const facultyData = data?.grid ?? [];

  if (isLoading) {
    return (
      <SkeletonGroup
        wrapperClassName="!mt-[3rem] gap-x-[3rem] gap-y-[3rem] grid-cols-4"
        count={8}
        className="bg-gray-300 h-[28.7rem] w-[25.5rem]"
      />
    )
  }

  if (isError || !facultyData?.length) return null;

  return (
    <div className="faculty_grid">
      {facultyData?.length > 0 && facultyData.map((item: any, idx: number) => (
        <div key={idx} className="faculty_Bx">
          <figure>
            <Image src={item.image} className="img-fluid w-100" width="255" height="287" loading="lazy" alt={item.title} />
          </figure>
          {item?.name && (
            <h5>{item.name}</h5>
          )}
          {item?.type && (
            <p>{item.type}</p>
          )}
          {item.slug && (
            <Link className="strech_link" href={`${BASE_URL}faculty/${item.slug}`} />
          )}
        </div>
      ))}


    </div>
  );
}