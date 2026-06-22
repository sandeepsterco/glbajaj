"use client"
import Image from "next/image";
import { useState, useCallback } from "react";
import { SkeletonGroup } from "../../ui/Skeleton";
import { API_URL, BASE_URL } from "@/src/config/config";
import Link from "next/link";
import CourseSearch from "../../parser/CourseSearch";

interface MenuItem {
    type?: string;
    title?: string;
    data?: {
        name?: string;
    };
    slug: string | null;
    target_blank_url: string | null;
    display_order: string;
    position: string | null;
    has_children: boolean;
    children: MenuItem[];
}

interface MenuResponse {
    status: boolean;
    menuItems: MenuItem[];
}

// Renders a group of menu items at the same level, tracks which one is open
function MenuList({ items, depth = 0 }: { items: MenuItem[]; depth?: number }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <>
            {items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const href = item.target_blank_url || (item.slug ? `/${item.slug}` : "#");
                const isExternal = !!item.target_blank_url;
                const hasChildren = item.has_children && item.children && item.children.length > 0;

                if (hasChildren) {
                    return (
                        <li key={`${depth}-${idx}-${item.title}`} className={`drop_down ${isOpen ? "active" : ""}`}>
                            <a
                                href={href}
                                className="drop_btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenIndex(isOpen ? null : idx);
                                }}
                            >
                                {item.title}
                            </a>
                            <ul className={`submenu ${isOpen ? "open" : ""}`}>
                                <MenuList items={item.children} depth={depth + 1} />
                            </ul>
                        </li>
                    );
                }

                return (
                    <li key={`${depth}-${idx}-${item.title}`}>
                        <a
                            href={href}
                            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                            {item.title ?? item?.data?.name ?? ''}
                        </a>
                    </li>
                );
            })}
        </>
    );
}

type ModalKey = "modal1" | "modal2" | "modal3" | "modal4";



export default function MobileMenu() {
    const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
    const [fetched, setFetched] = useState<Partial<Record<ModalKey, boolean>>>({});
    const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
    const [sidebarMenu, setSidebarMenu] = useState<MenuItem[]>([]);
    const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
    const [contactInfo, setContactInfo] = useState([]);
    const [loading, setLoading] = useState<Partial<Record<ModalKey, boolean>>>({});

    const isMobile = window.innerWidth < 991

    if(!isMobile) return;

    const fetchMenu = useCallback(async (location: string): Promise<MenuItem[]> => {
        try {
            const res = await fetch(`${API_URL}menu?location=${location}`);
            if (!res.ok) return [];
            const data: MenuResponse = await res.json();
            return data.status ? data.menuItems : [];
        } catch {
            return [];
        }
    }, []);

    const fetchContactInfo = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}info`);
            if (!res.ok) return [];
            const data = await res.json();
            return data.status ? data.data : [];
        } catch {
            return [];
        }
    }, []);

    const handleModalToggle = useCallback(async (modal: ModalKey) => {
        if (activeModal === modal) {
            setActiveModal(null);
            return;
        }

        setActiveModal(modal);

        if (fetched[modal]) return;

        setFetched((prev) => ({ ...prev, [modal]: true }));
        setLoading((prev) => ({ ...prev, [modal]: true }));

        if (modal === "modal1") {
            const contactData = await fetchContactInfo();
            setContactInfo(contactData);
        }

        if (modal === "modal2") {
            const [contactData, headerItems] = await Promise.all([fetchContactInfo(), fetchMenu("header")])
            setContactInfo(contactData);
            setHeaderMenu(headerItems);
        }

        if (modal === "modal3") {
            const contactData = await fetchContactInfo();
            setContactInfo(contactData);
        }

        if (modal === "modal4") {
            const [headerItems, sidebarItems, footerItems] = await Promise.all([
                fetchMenu("header"),
                fetchMenu("sidebar"),
                fetchMenu("footer"),
            ]);
            setHeaderMenu(headerItems);
            setSidebarMenu(sidebarItems);
            setFooterMenu(footerItems);
        }

        setLoading((prev) => ({ ...prev, [modal]: false }));
    }, [activeModal, fetchMenu, fetched]);

    const getValue = (key: string) => {
        const found = contactInfo?.find((item: any) => item.key == key) ?? { value: null, image: null, url:null };
        return {
            value: found?.value ?? null,
            image: found?.image ?? null,
            url: found?.url ?? null,
        }
    }

    return (
        <div className="fixed-bottom mobile-footer">

            {/* Modal 1 - Programs */}
            <div className={`modal-new modal1 ${activeModal === "modal1" ? "show" : ""}`}>
                <div className="program-drawer">
                    <div className="drawer-track">
                        <div className="drawer-panel" id="panelMain">
                            <div className="pro_menu">
                                <div className="section-heading">Courses</div>
                                <div className="home_courses_section">
                                    <CourseSearch />
                                </div>
                                <div className="courses_Box">
                                    {loading['modal1'] ? (
                                        <SkeletonGroup count={2} wrapperClassName="!block mt-[1rem]" className="w-full h-[30rem] !mb-[1rem]" />
                                    ) : (
                                        <ul className="menu-list">
                                            <li>
                                                <figure>
                                                    <Image src={getValue('under_graduate').image ?? "/images/undergraduate-img.webp"} alt="Undergraduate Course" className="img-fluid" width={335} height={190} loading="lazy" />
                                                </figure>
                                                <div className="course_bx">
                                                    <figcaption dangerouslySetInnerHTML={{__html:getValue('under_graduate')?.value ?? ''}} />
                                                    <span><img src="/images/home/slide_arrow_right.svg" alt="" className="img-fluid" width={50} height={50} /></span>
                                                </div>
                                                <a href={getValue('under_graduate')?.url ?? ''} className="strech_link"></a>
                                            </li>
                                            <li>
                                                <figure>
                                                    <Image src={getValue('post_graduate').image ?? "/images/undergraduate-img.webp"} alt="Undergraduate Course" className="img-fluid" width={335} height={190} loading="lazy" />
                                                </figure>
                                                <div className="course_bx">
                                                    <figcaption dangerouslySetInnerHTML={{__html:getValue('post_graduate')?.value ?? ''}} />
                                                    <span><img src="/images/home/slide_arrow_right.svg" alt="" className="img-fluid" width={50} height={50} /></span>
                                                </div>
                                                <a href={getValue('post_graduate')?.url ?? ''} className="strech_link"></a>
                                            </li>
                                        </ul>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal 2 - Admissions */}
            <div className={`modal-new modal2 ${activeModal === "modal2" ? "show" : ""}`}>
                <div className="mobile_admission_wrapper">
                    {loading["modal2"] ? (
                        <SkeletonGroup count={10} wrapperClassName="!block mt-[1rem]" className="w-full h-[5rem] !mb-[0.5rem]" />
                    ) : (
                        <>
                            <div className="mobile_admission">
                                <h4 className="title28">Admissions {new Date().getFullYear()}</h4>

                                <ul>
                                    {headerMenu?.length > 0 && headerMenu.find((item) => item.title == 'Admission')?.children.map((item, idx) => (
                                        <li key={idx}>
                                            <Link href={item?.target_blank_url ? item.target_blank_url : item.slug ? BASE_URL + item.slug : ''} target={item?.target_blank_url ? '_blank' : '_self'}>{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="m-admission-helpline">
                                <h5>Admissions Helpline</h5>
                                <ul>
                                    <li>
                                        <div className="conatct_svg"><Image src="/images/icons/menu-phone.svg" alt="Icon" width={50} height={50} /></div>
                                        <p><a href={`tel:${getValue('admission_helpline').value}`}>{getValue('admission_helpline').value}</a></p>
                                    </li>
                                    <li>
                                        <div className="conatct_svg"><Image src="/images/icons/menu-mail.svg" alt="Icon" width={50} height={50} /></div>
                                        <p><a href={`mailto:${getValue('email').value}`}>{getValue('email').value}</a></p>
                                    </li>
                                </ul>
                            </div>

                            <div className="m-view">
                                <a href={`${BASE_URL}apply-now`} className="apply_online_btn">Apply Online</a>
                                <a href={getValue('prospectus').image ?? ''} target="_blank" className="download_prospectus_btn">{getValue('prospectus').value}</a>
                            </div>
                        </>
                    )
                    }
                </div>
            </div>

            {/* Modal 3 - Contact */}
            <div className={`modal-new modal3 ${activeModal === "modal3" ? "show" : ""}`}>
                <div className="mobile-contact">
                    <div className="contact-logo">
                        <Image src="/images/logo/colored-logo.png" className="img-fluid" alt="Icon" width={270} height={88} />
                        {getValue('institute_name').value && (
                            <h6>{getValue('institute_name').value}</h6>
                        )}
                    </div>
                    <div className="contact_menu">
                        <ul>
                            {getValue('phone').value && (
                                <li>
                                    <div className="conatct_svg"><Image src="/images/icons/menu-phone.svg" alt="Icon" width={20} height={20} /></div>
                                    <p><a href={`tel:${getValue('phone').value}`}>{getValue('phone').value}</a>, <a href={`tel:${getValue('phone1').value}`}>{getValue('phone1').value}</a></p>
                                </li>
                            )}
                            {getValue('helpline').value && (
                                <li>
                                    <div className="conatct_svg"><Image src="/images/icons/menu-telephone.svg" alt="Icon" width={20} height={20} /></div>
                                    <p><a href={`tel:${getValue('helpline').value}`}>{getValue('helpline').value}</a></p>
                                </li>
                            )}
                            {getValue('email').value && (
                                <li>
                                    <div className="conatct_svg"><Image src="/images/icons/menu-mail.svg" alt="Icon" width={20} height={20} /></div>
                                    <p><a href={`mailto:${getValue('email').value}`}>{getValue('email').value}</a></p>
                                </li>
                            )}
                            {getValue('address').value && (
                                <li>
                                    <div className="conatct_svg"><Image src="/images/icons/menu-location.svg" alt="Icon" width={20} height={20} /></div>
                                    <p>{getValue('address').value}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modal 4 - Menu */}
            <div className={`modal-new modal4 ${activeModal === "modal4" ? "show" : ""}`}>
                <div className="menu_scroll">
                    <div className="mobile_menu">
                        {loading["modal4"] ? (
                            <SkeletonGroup count={6} wrapperClassName="!block" className="w-full h-[5rem] !mb-[0.5rem]" />
                        ) : (
                            <ul>
                                <MenuList items={[...headerMenu, ...sidebarMenu]} depth={0} />
                            </ul>
                        )}
                    </div>

                    <div className="others_mobile_menu">
                        <ul>
                            <li><a href="/quick-links">Quick Links</a></li>
                            {loading["modal4"] ? (
                                <SkeletonGroup count={6} wrapperClassName="!block" className="w-full h-[3rem] !mb-[0.8rem]" />
                            ) : (
                                <MenuList items={footerMenu} depth={0} />
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Tab Nav */}
            <div className="tab-nav mobile-nav">
                <div className={`footer-trigger modal1 ${activeModal === "modal1" ? "active" : ""}`} onClick={() => handleModalToggle("modal1")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27.865" height="18.622" viewBox="0 0 27.865 18.622">
                        <g id="g2946" transform="translate(0.5 0.5)">
                            <g id="g2948" transform="translate(0 0)">
                                <g id="Group_28169" data-name="Group 28169">
                                    <g id="g2956" transform="translate(0 2.064)"><path id="path2958" d="M-571.2,0h1.919a.811.811,0,0,1,.811.811V14.747a.811.811,0,0,1-.811.811h-25.244a.811.811,0,0,1-.811-.811V.811A.811.811,0,0,1-594.521,0h1.919" transform="translate(595.332)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g2960" transform="translate(13.433 0)"><path id="path2962" d="M-253.3-266.079v3.568a.378.378,0,0,1-.378.378h-6.585A4.091,4.091,0,0,0-264-259.7v-14.919a2.7,2.7,0,0,1,2.7-2.7h7.622a.378.378,0,0,1,.378.378v8.973" transform="translate(263.999 277.322)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g2964" transform="translate(2.73)"><path id="path2966" d="M-8.955-359.476H-2.37a4.091,4.091,0,0,1,3.74,2.432v-14.919a2.7,2.7,0,0,0-2.7-2.7H-8.955a.378.378,0,0,0-.378.378v14.433A.378.378,0,0,0-8.955-359.476Z" transform="translate(9.333 374.666)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g2980" transform="translate(15.471 3.783)"><path id="path2982" d="M0,0H6.627" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g2988" transform="translate(15.471 7.759)"><path id="path2990" d="M0,0H6.627" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g2996" transform="translate(15.471 11.736)"><path id="path2998" d="M0,0H6.627" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g3000" transform="translate(4.77 3.782)"><path id="path3002" d="M0,0H6.627" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g3008" transform="translate(4.77 7.759)"><path id="path3010" d="M0,0H6.627" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                    <g id="g3016" transform="translate(4.77 11.736)"><path id="path3018" d="M0,0H6.627" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /></g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span>Programs</span>
                </div>

                <div className={`footer-trigger modal2 ${activeModal === "modal2" ? "active" : ""}`} onClick={() => handleModalToggle("modal2")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.979" height="19.624" viewBox="0 0 20.979 19.624">
                        <g id="Id_card" transform="translate(0.5 0.5)">
                            <g id="Group_28170" data-name="Group 28170" transform="translate(0 0)">
                                <path id="Path_24642" d="M35.069,116h1.524a3.386,3.386,0,0,1,3.386,3.386v8.465a3.386,3.386,0,0,1-3.386,3.386H23.386A3.386,3.386,0,0,1,20,127.852v-8.465A3.386,3.386,0,0,1,23.386,116h1.693" transform="translate(-20 -112.614)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                                <path id="Path_24643" d="M219.386,39.386a1.693,1.693,0,0,1-3.386,0V36h3.386Z" transform="translate(-207.704 -36)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                                <path id="Path_24644" d="M104.91,241.079a1.693,1.693,0,0,1-1.693,1.693h-1.524A1.693,1.693,0,0,1,100,241.079v-3.386A1.693,1.693,0,0,1,101.693,236h1.524a1.693,1.693,0,0,1,1.693,1.693Z" transform="translate(-96.614 -227.535)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                                <line id="Line_1520" x2="5.009" transform="translate(11.649 8.504)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                                <line id="Line_1521" x2="5.009" transform="translate(11.649 11.882)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                                <line id="Line_1522" x2="5.009" transform="translate(11.649 15.261)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                            </g>
                        </g>
                    </svg>
                    <span>Admissions</span>
                </div>

                <div className={`footer-trigger modal3 ${activeModal === "modal3" ? "active" : ""}`} onClick={() => handleModalToggle("modal3")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.015" height="21.054" viewBox="0 0 21.015 21.054">
                        <path id="Icon_feather-phone-call" d="M15.532,5.323A4.778,4.778,0,0,1,19.307,9.1M15.532,1.5a8.6,8.6,0,0,1,7.6,7.588m-.956,7.626v2.867a1.911,1.911,0,0,1-2.083,1.911,18.912,18.912,0,0,1-8.247-2.934,18.635,18.635,0,0,1-5.734-5.734A18.912,18.912,0,0,1,3.176,4.539a1.911,1.911,0,0,1,1.9-2.083H7.944A1.911,1.911,0,0,1,9.856,4.1a12.27,12.27,0,0,0,.669,2.685,1.911,1.911,0,0,1-.43,2.016L8.881,10.015a15.29,15.29,0,0,0,5.734,5.734l1.214-1.214a1.911,1.911,0,0,1,2.016-.43,12.27,12.27,0,0,0,2.685.669A1.911,1.911,0,0,1,22.174,16.714Z" transform="translate(-2.667 -0.948)" fill="rgba(0,0,0,0)" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </svg>
                    <span>Contact Us</span>
                </div>

                <div className={`footer-trigger modal4 ${activeModal === "modal4" ? "active" : ""}`} onClick={() => handleModalToggle("modal4")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16.222" viewBox="0 0 20 16.222">
                        <g id="Hamberger" transform="translate(0 0.5)">
                            <line id="Line_1" x2="20" fill="none" stroke="#000" strokeWidth="1" />
                            <line id="Line_2" x2="16.25" transform="translate(0 7.61)" fill="none" stroke="#000" strokeWidth="1" />
                            <line id="Line_3" x2="20" transform="translate(0 15.222)" fill="none" stroke="#000" strokeWidth="1" />
                        </g>
                    </svg>
                    <span>Menu</span>
                </div>
            </div>
        </div>
    );
}