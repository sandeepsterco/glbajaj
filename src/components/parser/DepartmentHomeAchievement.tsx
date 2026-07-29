"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";

const fetchDepartmentAchievementData = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data;
};

export default function DepartmentHomeAchievement() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["department_home_achievement", slug],
    queryFn: () => fetchDepartmentAchievementData(slug),
  });

  const DepartmentHomeAchievementData = data?.modular?.["achivements"] ?? [];

  if (isLoading || DepartmentHomeAchievementData.length === 0) return null;

  return (
    <div className="achivent_grid">
      {DepartmentHomeAchievementData.map((item:any, idx:number)=>(
        <div key={idx} className="achivecard">
          <figure className="flash-effect-2"><Image src={item?.image} alt={item.title} className="img-fluid w-100" width="600" height="443" loading="lazy" data-aos="fade-up" data-aos-delay="200" /></figure>
          <div className="achiv_caption">
            <p data-aos="fade-up" data-aos-delay="400" dangerouslySetInnerHTML={{__html:item.title}} />
          </div>
          <Link className="strech_link" href={`${BASE_URL}achievements/${item.slug}`} ></Link>
        </div>
      ))}
    </div>
  );
}