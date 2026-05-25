"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const fetchDigitalPathshalaData = async () => {
  const { data, error } = await apiFetch(`glb-pathshala`);

  if (error) throw new Error(error);
  return data?.GLBPathshala;
}

export default function DigitalPathshalaVideoGrid() {

  const { data, isLoading } = useQuery({
    queryKey: ['glb_pathshala'],
    queryFn: () => fetchDigitalPathshalaData(),
  })

  const pathshalaData = data?.data;

  return (
    <div className="digital-pathshala-grid">
      {pathshalaData && pathshalaData?.length > 0 && pathshalaData.map((item:any, idx:number)=>(
        <div key={idx} className=" digital-patsala" data-src="assets/images/digital-pathshala-banner.webp"
        data-caption="Principle of Programming Language by Dr. Saurabh Goel">
          <figure>
            <Image src={item?.thumbnail} className="img-fluid w-100" width={603} height={506} alt={item?.title ?? 'digital pathshala'} loading="lazy" />
            <span><img src="/images/plybtn.svg" className="img-fluid" alt="video play" /></span>
            <figcaption>
              <h3>Principle of Programming Language by Dr. Saurabh Goel</h3>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
