"use client"
import { useState } from "react";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

export default function FaqList({
  data,
}: {
  data: any;
}) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);


  return (
      <section className="institute_faq_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div
                className="tp_accbox"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h5 className="font24">Frequently Asked Questions</h5>

                {data?.data?.map((item: any, idx: number) => (
                  <div key={idx} className={`accordion-item ${activeIndex === idx ? "active" : ""}`}>
                    <div className="accordion-header" onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}>
                      <h3>Q.{idx + 1}. {item.question}</h3>
                      <span className="icon">{activeIndex === idx ? "−" : "+"}</span>
                    </div>

                    <div className="accordion-body" style={{maxHeight: activeIndex === idx ? "none" : "0"}} dangerouslySetInnerHTML={{__html: item.answer}} />
                  </div>
                ))}
              </div>

              <PaginationWrapper
                currentPage={data?.current_page || 1}
                totalPages={data?.last_page || 1}
                />
            </div>
          </div>
        </div>
      </section>
      
  );
}
