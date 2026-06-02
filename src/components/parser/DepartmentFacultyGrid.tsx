"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import FacultyList from "../faculty/FacultyList";
import FacultyTabular from "../faculty/FacultyTabular";
import { SkeletonGroup } from "../ui/Skeleton";


const fetchDepartmentFaculty = async (slug: string, page: number) => {
  const query = new URLSearchParams({
    department: slug,
    page: String(page),
  }).toString();

  const { data, error } = await apiFetch(`faculty?${query}`);
  if (error) throw new Error(error);
  return data;
};

export default function DepartmentFacultyGrid() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = pathname.split("/").filter(Boolean).slice(-2, -1)[0] ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["department_faculty", slug, currentPage],
    queryFn: () => fetchDepartmentFaculty(slug, currentPage),
  });

  const facultyType = data?.type;
  const facultyData = data?.data?.data ?? [];
  const paginationData = data?.data;

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
    <>
      {facultyType === "Grid" ? (
        <FacultyList
          data={paginationData}
          currentPage={currentPage}
          pageKey="page"
        />
      ) : (
        <FacultyTabular
          data={paginationData}
          currentPage={currentPage}
          pageKey="page"
        />
      )}
    </>
  );
}