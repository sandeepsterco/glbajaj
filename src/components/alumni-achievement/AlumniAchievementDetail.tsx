import Image from "next/image";
import ReactParser from "../common/reactParser/ReactParser";

export default function AlumniAchievementDetail({ data }: { data: any }) {
  const pageData = data?.data ?? null;

  return (
    <div className="alumni-achivement">
      <div className="container25">
      <div className="award-detail-heading"><h4 dangerouslySetInnerHTML={{__html:pageData?.name}} /></div>
        <div className="col-lg-12">
          <div
            className="alumni-achivement-grid aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="alumni-achivement-cnt">
              <blockquote>
                <p dangerouslySetInnerHTML={{__html:pageData?.description}} />
              </blockquote>

              {pageData?.mapping_items && pageData?.mapping_items?.paragraph?.length > 0 && (
                <div>
                  {pageData?.mapping_items?.paragraph.map((item:any, idx:number)=>(
                    <p key={idx} dangerouslySetInnerHTML={{__html:item.para}} />
                  ))}
                </div>
              )}
              
              <figure>
                <Image
                  alt="pattern"
                  className="img-fluid w-100"
                  loading="lazy"
                  width={612}
                  height={119}
                  src="/images/pattern/alumni_achievement.webp"
                />
              </figure>
            </div>

            <div className="alumni-achivement-img">
              <div className="image_col">
                <figure className="flash-effect-2">
                  <Image
                    alt="Achievement"
                    width={475}
                    height={550}
                    className="img-fluid w-100"
                    loading="lazy"
                    src={pageData?.image || ''}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
