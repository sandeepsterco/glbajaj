"use client"
import Link from "next/link";
import { useState } from "react";

export default function ProgramTabs({ undergraduate, postgraduate }: { undergraduate: any, postgraduate: any }) {
    const [activeTab, setActiveTab] = useState('undergraduate');

    const tabs = [
        {
            id: "undergraduate",
            label: "Undergraduate Courses",
            programs: undergraduate,
        },
        {
            id: "postgraduate",
            label: "Postgraduate Courses",
            programs: postgraduate,
        },
    ];

    return (
        <section className="program-sec department_program_page">
            <div className="container25">
                <div className="col-lg-12">
                    <div className="cus-tab">
                        <div className="tabbed-content">
                            <nav className="tabs">
                                <ul>
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <a
                                                href={`#${tab.id}`}
                                                className={`${activeTab == tab.id ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveTab(tab.id);
                                                }}
                                            >{tab.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {tabs.map((tab) => (
                                <div id={tab.id} className={`item ${activeTab == tab.id ? 'active' : ''}`} data-title={tab.label}>
                                    <div className="item-content">
                                        <div className="program-list">
                                            {/* <h5>Computer Science and Engineering</h5> */}
                                            {tab?.programs?.map((singleTab:any, idx:number)=>(
                                                <div key={idx} className="program-box">
                                                    <div className="program-text">
                                                        <h6><Link href="#">{singleTab.name}</Link></h6>
                                                    </div>
                                                    <div className="program-right">
                                                        <div className="duration">
                                                            <p>Duration</p>
                                                            <span>{singleTab?.duration || '--'}</span>
                                                        </div>

                                                        <div className="affiliation">
                                                            <p>Affiliation</p>
                                                            <span>{singleTab?.affiliation || '--'}</span>
                                                        </div>
                                                        <div className="apply-btn">
                                                            <a href="#">Apply Now</a>
                                                        </div>
                                                        <div className="program-btn">
                                                            <Link href="#">
                                                                <span>
                                                                    <img src="/images/icons/right-arrow.svg" alt="arrow icon" />
                                                                </span>
                                                            </Link>

                                                        </div>
                                                    </div>


                                                </div>
                                            ))}
                                            


                                        </div>



                                    </div>
                                </div>
                            ))}



                        </div>

                    </div>

                </div>


            </div>
        </section>
    )
}