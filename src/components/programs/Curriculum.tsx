"use client"
import { useState } from "react";

export default function ProgramCurriculum() {
  return(
    <section className="program-detailsec1">
            <div className="container25">
                <div className="curriculum-img">
                    <figure>
                        <img src="/images/curriculum-img.png" alt="Curriculum" />
                    </figure>
                </div>

                <div className="curriculum-text">
                    <h5>Curriculum Details/Modules</h5>

                </div>
                <div className="curriculum-list">
                    <div className="curriculum-semt">
                        <p><a href="#"><img src="/images/icons/pdf.svg" /> Semester 1 & 2 Syllabus</a></p>

                    </div>
                    <div className="curriculum-semt">
                        <p><a href="#"><img src="/images/icons/pdf.svg" /> Semester 3 & 4 Syllabus</a></p>

                    </div>

                    <div className="curriculum-semt">
                        <p><a href="#"><img src="/images/icons/pdf.svg" /> Semester 5 & 6 Syllabus</a></p>

                    </div>

                    <div className="curriculum-semt">
                        <p><a href="#"><img src="/images/icons/pdf.svg" /> Semester 7 & 8 Syllabus</a></p>

                    </div>

                </div>

                <div className="eligibility">
                    <div className="eligibility-list">
                        <div className="eligibility-text">
                            <h5>Eligibility Criteria</h5>
                        </div>

                        <div className="eligibility-box">
                            <div className="eligibility-boxs">
                                <div className="counseling-heading">
                                    <h6>UPCET Counseling</h6>
                                </div>
                                <div className="counseling-text">
                                    <p>Eligibility For Admission Through UPCET Counselling</p>
                                </div>
                            </div>
                            <div className="border"></div>

                            <div className="eligibility-boxs">
                                <div className="counseling-heading">
                                    <h6>Direct Admission</h6>
                                </div>
                                <div className="counseling-text admission-text">
                                    <p><strong>For admission to the first year of B. Tech:</strong></p>
                                    <p>The candidate must have passed the intermediate examination of U.P. Board or 10+2
                                        level examination from any recognized board/university;</p>

                                    <div className="securing-box">
                                        <p>Securing minimum</p>
                                        <h4>45% (40% for SC/ST)</h4>
                                        <p>marks in total of required subject combination (two compulsory & one optional
                                            subject).</p>
                                    </div>

                                </div>
                            </div>




                        </div>

                    </div>

                    <div className="application">
                        <div className="application-text">
                            <h5>Application Process</h5>
                        </div>
                        <div className="process-text">
                            <ol>
                                <li>Register on portal by filling & submitting Registration Form.</li>
                                <li>Please take a note of Email ID and Phone Number used during registration.</li>
                                <li>Email ID submitted at the time of registration will be used for all communication
                                    until application is completed.</li>
                                <li>To login, enter phone number provided at time of registration, you will receive an
                                    OTP. Enter OTP to login.</li>
                                <li>Once registered on portal, you can log into portal to start your application.</li>
                                <li>You can always continue your application from where you have left.</li>
                                <li>Students need to upload document & pay Admission Fee to confirm their admission.
                                </li>
                            </ol>


                        </div>



                    </div>

                    <div className="eligibility-btn">
                        <a href="#" className="cus-btn">Apply Now</a>
                    </div>

                </div>



            </div>

        </section>
  )
}