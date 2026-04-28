import { BASE_URL } from "@/src/config/config";
import { getSlug } from "@/src/lib/getSlug";
import Image from "next/image";
import Link from "next/link";

const MessageComponent = async({data}:{data:any})=>{
    const slug = await getSlug();
    return(
        <section className="administration_section messages_section">
                <div className="container25">
                    <h4 className="innerPage_title">Messages</h4>
                    <div className="administration_grid messages_grid">
                        {data?.map((item:any, idx:number)=>(
                            <div key={idx} className="administration_Bx">
                                <figure>
                                    <Image src={item.image || '/images/default/leadership.webp'} width={567} height={387} className="img-fluid" alt={item.name ?? 'leadership image'} />
                                </figure>
                                {item?.name && (
                                    <h5>{item.name}</h5>
                                )}
                                {item?.designation && (
                                    <p>{item.designation}</p>
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

const AdministrationComponent = ({data}:{data:any})=>{
    return(
        <section className="administration_section">
                <div className="container25">
                <h4 className="innerPage_title">Administration</h4>
                    <div className="administration_grid">
                        {data?.data?.map((item:any, idx:number)=>(
                            <div key={idx} className="administration_Bx">
                                <figure>
                                    <Image src={item.image || ''} className="img-fluid" alt={item.name} width={255} height={287} />
                                </figure>
                                {item?.name && (
                                    <h5>{item.name}</h5>
                                )}
                                {item?.designation && (
                                    <p>{item.designation}</p>
                                )}
                                {item?.email && (
                                    <Link href={`mailto:${item.email}`}><img src="/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" />{item.email}</Link>
                                )}
                                
                            </div>
                        ))}
                        

                        
                    </div>
                </div>
            </section>
    )
}

export default function LeadershipList({ data }: { data: any }) {
    return (
        <>
            <MessageComponent data={data?.leadership} />
            <AdministrationComponent data={data?.administrator} />
        </>
    )
}