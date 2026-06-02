"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import { SkeletonGroup } from "../ui/Skeleton";

const fetchDepartmentLabsData = async (slug: string) => {
  const { data, error } = await apiFetch(`department/ceo-and-activity-level/${slug}`);
  if (error) throw new Error(error);
  return data;
};

export default function DepartmentLabsGrids() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).slice(-2, -1)[0] ?? "";;

  const { data, isLoading } = useQuery({
    queryKey: ["department_advance_labs", slug],
    queryFn: () => fetchDepartmentLabsData(slug),
  });

  const labsData = data?.ceoAndAdvanceLevel ?? {};

  if (isLoading) {
    return (
      <div className="container25">
        <SkeletonGroup
        wrapperClassName="!mt-[3rem] !block"
        count={1}
        className="bg-gray-300 h-[30rem] w-full"
      />
      </div>
      
    );
  }

  if (labsData?.data?.length === 0) return null;

  return (
    <section className="media_coverage affiliations-sec">
    <div className="container25">
        <div className="media_grid">
            {labsData?.data?.length > 0 && labsData.data.map((item:any, idx:number)=>(
              <div key={idx} className="media_grid_Bx2 relative">
                <figure>
                    <Image src={item.image} className="img-fluid w-100" width="850" height="600" loading="lazy" alt={item.title} />
                </figure>
                {item?.title && (
                  <div className="media_txt">
                    <p>{item.title}</p>
                  </div>
                )}
                {item.slug && (
                  <Link className="strech_link" href={`labs/${item.slug}`} />
                )}
              </div>
            ))}
            
            
        </div>
    </div>
</section>
  );
}