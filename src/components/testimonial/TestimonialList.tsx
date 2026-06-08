import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

export default function TestimonialList({data, slug, type}:{data:any; slug:string; type?:string}){
    return(
        <section className="faculty_section">
            <div className="container25">

                <div className="faculty_grid">
                    {data.map((item:any, idx:number)=>(
                        <div key={idx} className="faculty_Bx">
                            <figure className="flash-effect-2"> 
                                <Image src={item.image || ''} width={255} height={287} className="img-fluid" alt={item.name || 'faculty image'} loading="lazy" />
                            </figure>
                            {item?.name && (
                                <h5>{item.name}</h5>
                            )}
                            {item?.branch && (
                                <p>{item.branch}</p>
                            )}
                            {type != 'alumni' && item?.type && (
                                <p>{item.type}</p>
                            )}
                            {item?.slug && (
                                <Link href={`${BASE_URL}${slug}/${item.slug}`} className="strech_link" />
                            )}
                            
                        </div> 
                    ))}
                                  
                </div>
            </div>
        </section>
    )
}