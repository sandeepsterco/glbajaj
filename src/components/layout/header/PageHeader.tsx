import './PageHeader.css'

export default function PageHeader(){
    return(
        <>
            <div className="about_menu_bar">
                <div className="about_top">
                    <div className="container">
                        <div className="inner-box">
                        <div className="about_content_padding about_flex">
                                <div>
                                    <p className="about_glbim_p">About GLBITM</p>
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
                        <div className="about_content_padding">
                            <div className="about_menu_container">
                                <div className="about_menu_label paragraph">About Us</div>
                                <ul className="about_menu_links">
                                    <li><a href="#" className="paragraph">About GLBITM</a></li>
                                    <li><a href="#" className="paragraph">The Group</a></li>
                                    <li><a href="#" className="paragraph">Messages</a></li>
                                    <li><a href="#" className="paragraph">Administration</a></li>
                                    <li><a href="#" className="paragraph">Governance and Advisory Boards</a></li>
                                    <li><a href="#" className="paragraph">CSR & Activities</a></li>
                                    <li><a href="#" className="paragraph">Policies</a></li>
                                    <li><a href="#" className="paragraph">News Letter - BUZZ</a></li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}