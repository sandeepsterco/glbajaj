import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import Link from "next/link";

const getConferenceLists = async () => {
    const { data, error } = await apiFetch(`intern`);

    if (error) throw new Error(error);
    return data;
}

export default async function IntershipRecord({params}:{params:any}) {
    const data = await getConferenceLists();
    const {parentSlug, innerSlug} = await params; 

    const placement_data = data?.intern;

    return (
        <div className="placement_grid">
            {placement_data && placement_data?.map((item:any, idx:number)=>(
                <div key={idx} className="place_box relative">
                    <div className="place_imgbox" data-aos="fade-up" data-aos-delay="400">
                        <figure className="flash-effect-2">
                            <img src={item.image ?? ''} alt={item?.name} />
                        </figure>
                        {item?.logo_image && (
                            <div className="place_complog">
                                <figure>
                                    <img src={item?.logo_image ?? ''} alt="company logo" />
                                </figure>
                            </div>
                        )}
                        
                    </div>
                    <div className="place_infobox">
                        <h3 data-aos="fade-up" data-aos-delay="400">{item.name}</h3>
                        <p data-aos="fade-up" data-aos-delay="600">{item?.course && <><strong>{item?.course}</strong> |</>} {item?.batch && <>Batch <strong>{item.batch}</strong></>} </p>

                        {item?.package && (
                            <div className="place_pkg">
                                <h3 className="font36" data-aos="fade-up" data-aos-delay="800">Package ₹<strong>{item.package}</strong></h3>
                            </div> 
                        )}
                        
                    </div>
                    <Link className="strech_link" href={`${BASE_URL}${parentSlug}/${innerSlug}/${item?.slug ?? '#'}`} />
                </div>
            ))}
            

        </div>
    )
}