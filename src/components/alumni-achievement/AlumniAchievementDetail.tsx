import ReactParser from "../common/reactParser/ReactParser";

export default function AlumniAchievementDetail({ data }: { data: any }) {
  return (
    <div className="alumni-achivement">
      <div className="container25">
      <div className="award-detail-heading"><h4>GL Bajaj CEO Kartikay Agarwal Honoured as the Most Influential Young Leader 2025</h4></div>
        <div className="col-lg-12">
          <div
            className="alumni-achivement-grid aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="alumni-achivement-cnt">
              <h5 className="designation">
                Vinay Chaturvedi, EEE, Batch 2012, Chief Executive Officer,
                MindZvue
              </h5>
              <blockquote>
                <p>
                  Salesforce MVP Hall of Fame and tech entrepreneur will guide
                  mindZvue's evolution into a Salesforce and AI powered
                  enterprise technology leader.
                </p>
              </blockquote>
              <div>
                <p>
                  mindZvue, a Salesforce Summit Partner has appointed Vinay
                  Chaturvedi as Chief Executive Officer, underscoring the
                  convergence of artificial intelligence and Salesforce. His
                  appointment signals the company's intent to evolve beyond its
                  role as a Salesforce Summit Partner into a global innovation
                  leader, blending AI, automation, and Salesforce expertise into
                  what it calls Innovation-as-a-Service.
                  <br />
                  GL Bajaj Family Congratulate Mr. Chaturvedi for being a
                  successful Entrepreneur. Leader. Trailblazer. and bringing
                  pride to us.
                </p>
              </div>
              <figure>
                <img
                  alt="pattern"
                  className="img-fluid w-100"
                  loading="lazy"
                  decoding="async"
                  src="https://glbitm.project-demo.in/assets/img/pages/61/section_1778655580_6a04215c39f92.webp"
                />
              </figure>
            </div>

            <div className="alumni-achivement-img">
              <div className="image_col">
                <figure className="flash-effect-2">
                  <img
                    alt="Achievement"
                    className="img-fluid w-100"
                    loading="lazy"
                    decoding="async"
                    src="https://glbitm.project-demo.in/assets/img/pages/61/section_1785999428_6a743044d3ada.webp"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
