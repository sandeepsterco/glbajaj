"use client"
import Link from "next/link";
import { useState } from "react";

interface CareerItem {
    image: string;
    label: string;
}

interface TabData {
    id: string;
    label: string;
    careers: CareerItem[];
}

const tabs: TabData[] = [
    {
        id: "tab3",
        label: "Entry-Level Positions",
        careers: [
            { image: "/images/data.webp", label: "Data Analyst" },
            { image: "/images/data1.webp", label: "Database Administrator" },
            { image: "/images/data2.webp", label: "Machine Learning Engineer" },
            { image: "/images/data3.webp", label: "Blockchain Developer" },
            { image: "/images/data4.webp", label: "Full Stack Developer" },
            { image: "/images/data4.webp", label: "Data Analyst" },
        ],
    },
    {
        id: "tab4",
        label: "Specialized Roles",
        careers: [],
    },
    {
        id: "tab5",
        label: "Mid-Level Positions",
        careers: [],
    },
    {
        id: "tab6",
        label: "Senior and Leadership Roles",
        careers: [],
    },
];

export default function ProgramCareer() {
    const [activeTab, setActiveTab] = useState("tab3");

    const activeTabData = tabs.find((tab) => tab.id === activeTab);

    return (
        <section className="program-detailsec2">
            <div className="container25">
                <div className="paths-text">
                    <h5>Career Paths</h5>

                    <div className="cus-tab">
                        <div className="tabbed-content">
                            <nav className="tabs">
                                <ul>
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <Link
                                                href={`#${tab.id}`}
                                                className={activeTab === tab.id ? "active" : ""}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveTab(tab.id);
                                                }}
                                            >
                                                {tab.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    id={tab.id}
                                    className={`item ${activeTab === tab.id ? "active" : ""}`}
                                >
                                    <div className="item-content">
                                        <div className="career-list">
                                            {tab.careers.map((career, i) => (
                                                <div className="career-box" key={i}>
                                                    <figure>
                                                        <img src={career.image} alt={career.label} height={275} width={380} />
                                                    </figure>
                                                    <p>{career.label}</p>
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
    );
}