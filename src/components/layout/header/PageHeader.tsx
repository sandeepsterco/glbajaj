import Link from 'next/link';
import { FaChevronRight } from "react-icons/fa";
import { getPathname, getSlug } from '@/src/lib/getSlug';
import NavLinks from './NavLinks'; // <-- import client component
import React from 'react';
import { buildBreadcrumbs } from '@/src/lib/buildBreadcrumbs';

export default async function PageHeader({ data, slug }: { data: any; slug: string;  }) {
    const currentPageSlug = await getSlug(-2);
    const currentPage = data?.tabs?.find((tab: any) => tab.slug === data?.active_tab_slug);
    const activeSlug = data?.active_tab_slug;
    const breadcrumbs = await buildBreadcrumbs(data);
    const pathname = await getPathname();

    return (
        <>
            <div className="about_menu_bar">
                <div className="about_top">
                    <div className="container25">
                        <div className="about_breadcrumb">
                            <div>
                                <p className="about_glbim_p">{data?.tab_title ?? data?.page_title}</p>
                            </div>
                            <div className="about_breadcrumb">
                                {breadcrumbs?.map((item:any, idx:number)=>(
                                    <React.Fragment key={idx}>
                                        {item?.slug ? (
                                            <Link href={item?.slug}><p className="breadcrumb_main about_breadcrump_text">{item.label}</p></Link>
                                        ) : 
                                        (
                                            <p className="breadcrumb_main about_breadcrump_text">{item.label}</p>
                                        )}
                                        {idx < breadcrumbs?.length-1 && <FaChevronRight color='#fff' size={10} />}
                                    </React.Fragment>
                                ))}
                                {/* <p className="breadcrumb_main about_breadcrump_text">Home</p>
                                <FaChevronRight color='#fff' size={10} />

                                {data?.tabs && (
                                    <>
                                        <p className="breadcrumb_main about_breadcrump_text">{data?.tab_title}</p>
                                        <FaChevronRight color='#fff' size={10} />
                                    </>
                                )}
                                {data?.tabs ? (
                                    <p className="breadcrumb_sub about_breadcrump_text">{currentPage?.title}</p>
                                ) : (
                                    <p className="breadcrumb_sub about_breadcrump_text">{data?.page_title}</p>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>

                {data?.tabs && (
                    <div className='bottom_menus'>
                        <div className="container25">
                            {/* ✅ Replaced the old <ul> with the client component */}
                            <NavLinks
                                tabs={data.tabs}
                                activeSlug={activeSlug}
                                tabTitle={data?.tab_title}
                                pathname={pathname}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}