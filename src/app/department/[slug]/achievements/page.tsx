import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import Image from "next/image";
import Link from "next/link";

export default async function DepartmentAboutPage() {
    const slug = await getSlug(-2);
    const { data, error } = await apiFetch(`department/${slug}/achievements`);
    const pageData = data?.data?.modular?.achivements;


    return (
        <section className="achivment_innerpage">
            <div className="container">
                <div className="container25">
                    <div className="achivent_grid">
                        {pageData && pageData?.length > 0 ? (
                            pageData.map((item: any, idx: number) => (
                                <div key={idx} className="achivecard">
                                    <figure>
                                        <Image src={item?.image ?? '/images/default/department-project.webp'} alt={item?.title ?? 'Department Achievement'} width={600} height={443} loading="lazy" /></figure>
                                    {item?.title && (
                                        <div className="achiv_caption">
                                            <p dangerouslySetInnerHTML={{ __html: item?.title }} />
                                        </div>
                                    )}

                                    <Link className="strech_link" href={`${BASE_URL}achievements/${item.slug}`} />
                                </div>
                            ))
                        ) : (<h1>No Data Found</h1>)}


                    </div>
                </div>
            </div>
        </section>
    )
}