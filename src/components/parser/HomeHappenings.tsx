"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

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
        <div key={singleIdx} className={`single_grid ${!item?.image && item?.image=="" ? 'no_image' : ''}`}>
          {item?.image && (
            <figure>
              <img src={item.image} alt="happening image" className="img-fluid w-100 " />
            </figure>
          )}
          {/* <div className="content" style={{backgroundColor:item?.bg_color}}> */}
          <div className="content" >

              <div className="bottom_data">
                {item?.date && (
                  <p className="date">{item.date}</p>
                )}
                {item?.description && (
                  <p className="desc">{item.description}</p>
                )}
                {item?.subtitle && (
                  <h4 className="sub_title">{item.subtitle}</h4>
                )}
              </div>
          </div>
      </div>
      ))}
  </div>
  );
}
