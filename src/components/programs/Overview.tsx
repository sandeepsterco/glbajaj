"use client"
import { useState } from "react";

interface ToggleContentProps {
  text: string;
  wordLimit?: number;
}

function ToggleContent({ text, wordLimit = 50 }: ToggleContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.split(" ");
  const isLong = words.length > wordLimit;

  const previewText = isLong ? words.slice(0, wordLimit).join(" ") + "..." : text;

  return (
    <div className="content">
      <div className="inner">
        <p>{isExpanded ? text : previewText}</p>
      </div>

      {isLong && (
        <button
          className={`toggle-btn ${isExpanded ? "active" : ""}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <i className={`bi ${isExpanded ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
        </button>
      )}
    </div>
  );
}

export default function ProgramOverview() {
  const aboutText = "B.Tech in Computer Science and Engineering at GLBITM, where we are shaping the future of technology and business. In collaboration with India's leading IT Service and Consulting Company, TCS, we offer a specialized four-year B.Tech course titled Computer Science and Business Systems (CSBS). Our mission is to meet the growing demand for engineering talent equipped with both technological expertise and business acumen. B.Tech in Computer Science and Engineering at GLBITM, where we are shaping the future of technology and business. In collaboration with India's leading IT Service and Consulting Company, TCS, we offer a specialized four-year B.Tech course titled Computer Science and Business Systems (CSBS). Our mission is to meet the growing demand for engineering talent equipped with both technological expertise and business acumen.";

  return (
    <section className="program-detailsec">
      <div className="container25">
        <div className="col-lg-12">
          <div className="program-about">
            <div className="program-about-left">

              <div className="program-top">
                <div className="program-duration">
                  <h5>Duration</h5>
                  <h3>4 years</h3>
                  <p>(8 semesters)</p>
                </div>

                <div className="program-intake">
                  <h5>Intake</h5>
                  <h3>240</h3>
                </div>

                <div className="program-approvals">
                  <h5>Approvals</h5>
                  <h3>AICTE</h3>
                </div>
              </div>

              <div className="program-img">
                <figure>
                  <img
                    id="closehumburger"
                    src="./assets/images/program-img.webp"
                    alt=""
                  />
                </figure>
              </div>

            </div>

            <div className="program-form">
              <div className="form-container">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Student Name" />
                  </div>

                  <div className="form-group">
                    <input type="email" placeholder="Student Email ID" />
                  </div>

                  <div className="form-group phone-group">
                    <select>
                      <option>+91</option>
                    </select>
                    <input type="text" placeholder="Student Mobile No." />
                  </div>

                  <div className="row">
                    <div className="form-group">
                      <select>
                        <option>DoB</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <select>
                        <option>City</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <select>
                      <option>Engineering</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select>
                      <option>B.Tech - Computer Science & ...</option>
                    </select>
                  </div>

                  <div className="note">
                    By submitting this form, I agree to receive notifications
                    from the University in the form of SMS/E-mail/Call.
                  </div>

                  <button className="btn">Apply Now</button>

                  <div className="login-text">
                    Already Registered ? <a href="#">Click to Login</a>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="program-about-text">
            <h5>About the Course</h5>
            <ToggleContent text={aboutText} wordLimit={50} />
          </div>

        </div>
      </div>
    </section>
  );
}