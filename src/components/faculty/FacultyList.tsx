import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

export default function FacultyList({data}:{data:any}){
    return(
        <section className="faculty_section">
            <div className="container25">
                <div className="faculty_header">
                    <select className="form-select" aria-label="Default select example" defaultValue="">
                        <option value="">Select Department</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>                    
                    
                    <select className="form-select sort_by" aria-label="Default select example" defaultValue="">
                        <option value="">Sort A - Z</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="faculty_grid">
                    {data?.data.map((item:any, idx:number)=>(
                        <div key={idx} className="faculty_Bx">
                            <figure>
                                <Image src={item.image || ''} width={255} height={287} className="img-fluid w-100" loading="lazy" alt={item.name || 'faculty image'} />
                            </figure>
                            {item?.name && (
                                <h5>{item.name}</h5>
                            )}
                            {item?.type && (
                                <p>{item.type}</p>
                            )}
                            {item?.slug && (
                                <Link href={`${BASE_URL}faculty/${item.slug}`} className="strech_link" />
                            )}
                            
                        </div> 
                    ))}
                                  
                </div>
            </div>
        </section>
    )
}