import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

export default async function DepartmentHomeAchievement({data}:{data:any}) {
  const DepartmentHomeAchievementData = data?.modular?.["achivements"]?.slice(0, 3) ?? [];

  return (
    <div className="achivent_grid">
      {DepartmentHomeAchievementData.map((item:any, idx:number)=>(
        <div key={idx} className="achivecard">
          <figure className="flash-effect-2"><Image src={item?.image} alt={item.title} className="img-fluid w-100" width="600" height="443" loading="lazy" data-aos="fade-up" data-aos-delay="200" /></figure>
          <div className="achiv_caption">
            <p data-aos="fade-up" data-aos-delay="400" dangerouslySetInnerHTML={{__html:item.title}} />
          </div>
          <Link className="strech_link" href={`${BASE_URL}why-glbitm/achievements/${item.slug}`} ></Link>
        </div>
      ))}
    </div>
  );
}