"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import ApiError from "../ui/ApiError";
import { useEffect, useState } from "react";

const fetchHappeningsData=async()=>{
  const {data, error} = await apiFetch(`modular/home`);

  if (error) throw new Error(error);
  return data;
}

export default function HomeHappenings() {
  const [isMobile, setIsMobile] = useState(false);
  const {data, isLoading, isError} = useQuery({
    queryKey:['home_happenings'],
    queryFn:fetchHappeningsData,
  })

  useEffect(()=>{
    if(window.innerWidth < 768){
      setIsMobile(true);
    }
  }, [])

  if(isLoading){
    return isMobile ? <SkeletonGroup count={2} wrapperClassName="!block" className="w-full h-[25rem] !mb-[1rem]" /> : <SkeletonGroup count={8} wrapperClassName="grid-cols-4" className="w-full h-[38rem]" />
  }

  if(isError){
    return <ApiError />
  }

  const happeningsData = data?.modular?.["news-events"] ?? [];
  const updatedData = isMobile ? happeningsData.filter((item:any, idx:number)=>idx < 2) : happeningsData

  return (
    <div className="grid_data">
      {updatedData && updatedData.length > 0 && updatedData.map((item:any, singleIdx:number)=>(
        <div key={singleIdx} className={`single_grid ${!item?.image && item?.image=="" ? 'no_image' : ''}`} data-aos="fade-up" data-aos-delay="200">
          {item?.image && (
            <figure>
              <Image src={item.image} alt="happening image" className="img-fluid w-100 " width={636} height={443} loading="lazy" data-aos="fade-up" data-aos-delay="200"/>
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
