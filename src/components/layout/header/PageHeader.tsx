import Link from 'next/link';
import { BASE_URL } from '@/src/config/config';
import { FaChevronRight } from "react-icons/fa";


export default async function PageHeader({data, slug}:{data:any, slug:string}){
    const currentPage = data.tabs.find((tab:any)=>tab.slug === slug)

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
                                <p className="breadcrumb_main about_breadcrump_text">Happenings</p>
                                <FaChevronRight color='#fff' size={10} />
                                <p className="breadcrumb_sub about_breadcrump_text">News & Events</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container25">
                    <div className="inner_nav">
                        <div className="about_menu_label paragraph">{data?.heading}</div>
                        <ul className="about_menu_links">
                            {data?.tabs.length > 0 && data.tabs.map((item:any, itemIdx:number)=>(
                                <li key={itemIdx}>
                                    <Link href={BASE_URL+ item.slug} className={`paragraph ${item.slug === slug ? 'active' : ''}`}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>                
                </div>
                
            </div>
        </>
    )
}