"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const fetchHappeningsData=async()=>{
  const {data, error} = await apiFetch(`modular/home`);

  if (error) throw new Error(error);
  return data;
}

export default function HomeHappenings() {
  const {data, isLoading} = useQuery({
    queryKey:['home_happenings'],
    queryFn:fetchHappeningsData,
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
          <Link href={`${BASE_URL}news-events/${item.slug}`} className="strech_link" />
      </div>
      ))}
  </div>
  );
}
