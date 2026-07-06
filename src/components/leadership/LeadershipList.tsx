import { BASE_URL } from "@/src/config/config";
import { getSlug } from "@/src/lib/getSlug";
import Image from "next/image";
import Link from "next/link";

const MessageComponent = async ({ data }: { data: any }) => {
    const slug = await getSlug();
    return (
        <section className="administration_section messages_section">
            <div className="container25">
                <h4 className="innerPage_title" data-aos="fade-up" data-aos-delay="200">Messages</h4>
                <div className="administration_grid messages_grid">
                    {data?.map((item: any, idx: number) => (   
                        <div key={idx} className="administration_Bx" data-aos="fade-up" data-aos-delay="400">
                            <figure className="flash-effect">
                                <Image src={item.image || '/images/default/leadership.webp'} width={567} height={387} className="img-fluid" alt={item.name ?? 'leadership image'} />
                            </figure>
                            <div className="admini_msg_info"> 
                                <div className="adini_msg_namsec">
                                    {item?.name && (
                                        <h5>{item.name}</h5>
                                    )}
                                    {item?.designation && (
                                        <p>{item.designation}</p>
                                    )}
                                </div>
                                <div className="admin_arr_icon">
                                    <img src="/images/icons/arrow.svg" alt="mail" className="imf-fluid" />
                                </div>
                            </div>
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

const AdministrationComponent = ({ data }: { data: any }) => {
    return (
        <section className="administration_section admi_btm">
            <div className="container25">
                <h4 className="innerPage_title" data-aos="fade-up" data-aos-delay="200">Administration</h4>
                <div className="administration_grid">
                    {data?.data?.map((item: any, idx: number) => (
                        <div key={idx} className="administration_Bx" data-aos="fade-up" data-aos-delay="400">
                            <figure  className="flash-effect">
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
            {/* <MessageComponent data={data?.leadership} /> */}
            <AdministrationComponent data={data?.administrator} />
        </>
    )
}