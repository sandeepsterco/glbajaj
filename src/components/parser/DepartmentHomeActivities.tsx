"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const fetchDepartmentActivitiesData=async(slug:string)=>{
  const {data, error} = await apiFetch(`department/${slug}/home`);

  if (error) throw new Error(error);
  return data?.data;
}

export default function DepartmentHomeActivities() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';

  const {data, isLoading} = useQuery({
    queryKey:['department_home_activities'],
    queryFn:()=>fetchDepartmentActivitiesData(slug),
  })

  const activitiesData = data?.modular?.["department-activities"];

  return (
    <div className="activies_grid">
      {activitiesData && activitiesData.length > 0 && activitiesData.map((item:any, singleIdx:number)=>(
        <div className="activies_col">
          <figure><Image src={item.image} width="380" height="275"  alt={item.title} /></figure>
          <div className="activities_caption">
              <p>{item.title}</p>
          </div>
          {item?.slug && (
            <Link className="strech_link" href={BASE_URL + "department/" + slug +"/" +item.slug} />
          )}
      </div>
      ))}
    </div>
  );
}
