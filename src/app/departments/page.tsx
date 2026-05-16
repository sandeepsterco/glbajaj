import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import Image from "next/image";
import Link from "next/link";

export default async function DepartmentsPage() {
    const slug = await getSlug();
    const {data, error} = await apiFetch(`cms/${slug}`, { cache:'no-store'});
    const {data:departmentData, error:departmentError} = await apiFetch(`departments`, { cache:'no-store'});


    return (
        <main>
            {data?.data && <PageHeader data={data.data} slug={slug} showTabs={false} />}
            
            {departmentError && <ApiErrorFallback heading="Couldn't load Departments Page" message={departmentError} />}

            <section className="dept_gridmain">
                <div className="container25">
                    {/* <h1>testing</h1> */}
                    
                    <div className="dept_maingrid">
                        {departmentData?.data && departmentData.data.map((item:any, idx:number)=>(
                            <div key={idx} className="dept_gbox relative">
                                <figure>
                                    <Image src={item?.image ?? '/images/default/department-project.webp'} alt={item.name} height={600} width={850} />
                                </figure>
                                <h3 className="font24">{item.name}</h3>
                                <Link className="strech_link" href={`${BASE_URL}department/${item.slug}`} />
                            </div>
                        ))}
                        
                    </div>
                </div>
            </section>
        </main>
    )
}