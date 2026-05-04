import Link from 'next/link';
import { BASE_URL } from '@/src/config/config';
import { FaChevronRight } from "react-icons/fa";
import { getPathname } from '@/src/lib/getSlug';


export default async function PageHeader({data, slug, showTabs}:{data:any, slug:string, showTabs:boolean}){
    const currentPage = data?.tabs?.find((tab:any)=>tab.slug === data?.active_tab_slug);
    const activeSlug = data?.active_tab_slug;

    const pathname = await getPathname();

    return(
        <>
            <div className="about_menu_bar">
                <div className="about_top">
                    <div className="container25">
                        <div className="about_breadcrumb">
                            <div>
                                <p className="about_glbim_p">{currentPage?.title}</p>
                            </div>
                            <div className="about_breadcrumb">
                                <p className="breadcrumb_main about_breadcrump_text">{data?.tab_title}</p>
                                <FaChevronRight color='#fff' size={10} />
                                <p className="breadcrumb_sub about_breadcrump_text">{currentPage?.title}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {showTabs && (
                    <div className='bottom_menus'>
                        <div className="container25">
                            <div className="inner_nav">
                                <div className="about_menu_label paragraph">{data?.tab_title}</div>
                                <ul className="about_menu_links">
                                    {data?.tabs.length > 0 && data.tabs.map((item:any, itemIdx:number)=>(
                                        <li key={itemIdx}>
                                            <Link href={pathname.includes('department') ? BASE_URL+ 'department/' + item.slug : BASE_URL+ item.slug} className={`paragraph ${item.slug === activeSlug ? 'active' : ''}`}>{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>                
                        </div>
                    </div>
                )}
                
            </div>
        </>
    )
}