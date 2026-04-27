import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

const MessageComponent = ({data}:{data:any})=>{
    return(
        <section className="administration_section">
                <div className="container25">
                    <div className="administration_grid">
                        {data?.data?.map((item:any, idx:number)=>(
                            <div key={idx} className="administration_Bx">
                                <figure>
                                    <img src={item.image} className="img-fluid" alt="Sunil Dutt" />
                                </figure>
                                <h5>Sunil Dutt</h5>
                                <p>Registrar</p>
                                <a href="mailto:registrar@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> registrar@glbitm.ac.in</a>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </section>
    )
}

export default function LeadershipList({ data }: { data: any }) {
    return (
        <>
            <MessageComponent data={data?.leadership} />

            <section className="administration_section">
                <div className="container25">
                    <div className="administration_grid">
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/sunil-dutt.webp" className="img-fluid" alt="Sunil Dutt" />
                            </figure>
                            <h5>Sunil Dutt</h5>
                            <p>Registrar</p>
                            <a href="mailto:registrar@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> registrar@glbitm.ac.in</a>
                        </div>
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/aditya-saraswat.webp" className="img-fluid" alt="Aditya Saraswat" />
                            </figure>
                            <h5>Aditya Saraswat</h5>
                            <p>Chief Administrative Officer</p>
                            <a href="mailto:cao@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> cao@glbitm.ac.in</a>
                        </div>
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/sanjeev-khandelwal.webp" className="img-fluid" alt="Sanjeev Khandelwal" />
                            </figure>
                            <h5>Sanjeev Khandelwal</h5>
                            <p>Chief Operating Officer</p>
                            <a href="mailto:coo@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> coo@glbitm.ac.in</a>
                        </div>
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/rejeev-sharma.webp" className="img-fluid" alt="Rajeev Sharma" />
                            </figure>
                            <h5>Rajeev Sharma</h5>
                            <p>Deputy Registrar</p>
                            <a href="mailto:rajeev.sharma@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> rajeev.sharma@glbitm.ac.in</a>
                        </div>


                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/kp-singh.webp" className="img-fluid" alt="KP Singh" />
                            </figure>
                            <h5>KP Singh</h5>
                            <p>Account Officer</p>
                            <a href="mailto:accounts@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> accounts@glbitm.ac.in</a>
                        </div>
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/narendra-kumar.webp" className="img-fluid" alt="Narender Kumar" />
                            </figure>
                            <h5>Narender Kumar</h5>
                            <p>System Administrator</p>
                            <a href="mailto:system.admin@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> system.admin@glbitm.ac.in</a>
                        </div>
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/arun-kumar-biswas.webp" className="img-fluid" alt="Arun Kumar Biswal" />
                            </figure>
                            <h5>Arun Kumar Biswal</h5>
                            <p>Librarian</p>
                            <a href="mailto:librarian@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> librarian@glbitm.ac.in</a>
                        </div>
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/barun-singh.webp" className="img-fluid" alt="Barun Singh" />
                            </figure>
                            <h5>Barun Singh</h5>
                            <p>Admin Officer</p>
                            <a href="mailto:ao1@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> ao1@glbitm.ac.in</a>
                        </div>
                        <div className="administration_Bx">
                            <figure>
                                <img src="assets/images/santosh-rana.webp" className="img-fluid" alt="Santosh Rana" />
                            </figure>
                            <h5>Santosh Rana</h5>
                            <p>Admin Officer</p>
                            <a href="mailto:ao2@glbitm.ac.in"><img src="assets/images/icons/contact-mail.svg" alt="mail" className="imf-fluid" /> ao2@glbitm.ac.in</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}