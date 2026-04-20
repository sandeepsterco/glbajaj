import Link from 'next/link';
import './PageHeader.css';

export default async function PageHeader({data, slug}:{data:any, slug:string}){
    const currentPage = data.tabs.find((tab:any)=>tab.slug === slug)

    return(
        <>
            <div className="about_menu_bar">
                <div className="about_top">
                    <div className="container">
                        <div className="inner-box">
                        <div className="about_flex">
                                <div>
                                    <p className="about_glbim_p">{currentPage?.title}</p>
                                </div>
                                <div className="about_breadcrumb">
                                    <p className="breadcrumb_main about_breadcrump_text">About Us</p>
                                    <i className="fa-solid fa-angle-right breadcrumb_icon"></i>
                                    <p className="breadcrumb_sub about_breadcrump_text">About GLBITM</p>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom_menus'>
                    <div className="container">
                        <div className="inner-box">
                        <div className="">
                            <div className="about_menu_container">
                                <div className="about_menu_label paragraph">{data?.heading}</div>
                                <ul className="about_menu_links">
                                    {data?.tabs.length > 0 && data.tabs.map((item:any, itemIdx:number)=>(
                                        <li key={itemIdx}>
                                            <Link href={item.slug} className={`paragraph ${item.slug === slug ? 'active' : ''}`}>{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}