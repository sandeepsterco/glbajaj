"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const fetchHappeningsData=async(slug:string)=>{
  const {data, error} = await apiFetch(`department/${slug}/home`);

  if (error) throw new Error(error);
  return data?.data;
}

export default function DepartmentHomeHappenings() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';

  const {data, isLoading} = useQuery({
    queryKey:['department_home_happenings'],
    queryFn:()=>fetchHappeningsData(slug),
  })

  const happeningsData = data?.modular?.["news-events"];

  return (
    <div className="grid_data">
      {happeningsData && happeningsData.length > 0 && happeningsData.map((item:any, singleIdx:number)=>(
        <div key={singleIdx} className={`single_grid ${!item?.image && item?.image=="" ? 'no_image' : ''}`} data-aos="fade-up" data-aos-delay="200">
          {item?.image && (
            <figure>
              <img src={item.image} alt="happening image" className="img-fluid w-100 " data-aos="fade-up" data-aos-delay="200"/>
            </figure>
          )}
          {/* <div className="content" style={{backgroundColor:item?.bg_color}}> */}
          <div className="content" >
              <div className="bottom_data">
                {item?.date && (
                  <p className="date" data-aos="fade-up" data-aos-delay="200">{item.date}</p>
                )}
                {item?.description && (
                  <p className="desc" data-aos="fade-up" data-aos-delay="200">{item.description}</p>
                )}
                {item?.subtitle && (
                  <h4 className="sub_title" data-aos="fade-up" data-aos-delay="200">{item.subtitle}</h4>
                )}
              </div>
          </div>
      </div>
      ))}
    </div>
  );
}
