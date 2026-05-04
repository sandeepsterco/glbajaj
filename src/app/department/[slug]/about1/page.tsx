import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function DepartmentAboutPage(){
    const slug = await getSlug();


    return(
        <section className="chairman_section">
            <div className="container25">
                <div className="chairman_grid">
                    <div className="chairman_left">
                        <h3>Shri pankaj agarwal, a dynamic and forward-thinking leader, serves as the vice chairman of the group.</h3>
                        <p>Under his visionary guidance and progressive leadership, the group’s institutions have earned widespread recognition and accolades from prominent media houses and reputed organizations such as cyber media, india today, the times of india, competition success review, assocham, star news, jagran publications, the week, and careers360, among others. Consequently, the group has established itself as one of the most preferred and sought-after destinations for higher education in north india.</p>
                        <div className="hod_details">
                            <h4>Shri Pankaj Agarwal</h4>
                            <p>Vice Chairman</p>
                        </div>                    
                    </div>
                    <div className="chairman_right">
                        <figure>
                            <img src="assets/images/shri-pankaj-agarwal.webp" className="img-fluid" alt="hod" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}