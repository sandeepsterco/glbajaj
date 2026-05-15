import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import Link from "next/link";

export default async function DepartmentAboutPage(){
    const slug = await getSlug();

    

    return(
        <section className="program-sec">
            <div className="container25">
                <div className="col-lg-12">
                    <div className="cus-tab">
                        <div className="tabbed-content">
                            <nav className="tabs">
                                <ul>
                                    <li><a href="#tab1" className="active">Undergraduate Courses</a></li>
                                    <li><a href="#tab2">Postgraduate Courses</a></li>

                                </ul>
                            </nav>

                            <div id="tab1" className="item active" data-title="Tab 1">
                                <div className="item-content">
                                    <div className="program-list">
                                        <h5>Computer Science and Engineering</h5>
                                        <div className="program-box">
                                            <div className="program-text">
                                                <h6><Link href="/program/btech"> B.Tech in Computer Science and Engineering</Link></h6>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>
                                         <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Computer Science and Engineering (Hindi)</a></h6>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>


                                    </div>

                                      <div className="program-list">
                                        <h5>Computer Sc. & Engg. (AI)</h5>
                                        <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Computer Sc. & Engg. (AI)</a></h6>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>
                                    
                                    </div>

                                    
                                      <div className="program-list">
                                        <h5>Computer Sc. & Engg. (AIML)</h5>
                                        <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Computer Sc. & Engg. (AIML)</a></h6>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>
                                    
                                    </div>

                                    <div className="program-list">
                                        <h5>Computer Sc. & Engg. (Data Science)</h5>
                                        <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Computer Sc. & Engg. (Data Science)</a></h6>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>
                                    
                                    </div>


                                <div className="program-list">
                                        <h5>Electronics & Communication Engg.</h5>
                                        <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Electronics & Communication Engg.</a></h6>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>
                                    
                                    </div>


                                 


                                       <div className="program-list">
                                        <h5>Mechanical Engineering</h5>
                                        <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Mechanical Engineering</a></h6>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>

                                        <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Mechanical Engineering</a></h6>
                                                <p>with Specialisation in Industrial Robotics</p>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>

                                         <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Mechanical Engineering</a></h6>
                                                <p>with Specialisation in Industrial Mechatronics and Industry 4.0</p>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>

                                             <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Mechanical Engineering</a></h6>
                                                <p>with Specialisation in Industrial Robotics</p>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>

                                         <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Mechanical Engineering</a></h6>
                                                <p>with Specialisation in Industrial Mechatronics and Industry 4.0</p>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>

                                             <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Mechanical Engineering</a></h6>
                                                <p>with Specialisation in Industrial Robotics</p>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU" />
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>

                                         <div className="program-box">
                                            <div className="program-text">
                                                <h6><a href="#"> B.Tech in Mechanical Engineering</a></h6>
                                                <p>with Specialisation in Industrial Mechatronics and Industry 4.0</p>
                                            </div>
                                            <div className="program-right">
                                                <div className="duration">
                                                    <p>Duration</p>
                                                    <span>4 years</span>
                                                </div>

                                                <div className="affiliation">
                                                    <p>Affiliation</p>
                                                    <span>AKTU</span>
                                                </div>
                                                <div className="apply-btn">
                                                    <a href="#">Apply Now</a>
                                                </div>
                                                <div className="program-btn">
                                                    <a href="#">
                                                        <span>
                                                            <img src="/images/icons/right-arrow.svg" alt="GEU"/>
                                                        </span>
                                                    </a>

                                                </div>
                                            </div>


                                        </div>




                                    
                                    </div>



                                </div>
                            </div>
                            <div id="tab2" className="item" data-title="Tab 2">
                                <div className="item-content">

                                </div>
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </section>
    )
}