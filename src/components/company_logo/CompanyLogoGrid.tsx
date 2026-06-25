"use client";

interface DataInterface {
  image: string;
  alt: string;
  slug: string;
}

interface CompanyLogosProps {
  data: DataInterface[];
}

export default function CompanyLogoGrid({ data }: CompanyLogosProps) {

  return (
    <section className="our_recruiters">
      <div className="container25">
        <ul className="our_recruiters-grid">
          {data.map((item, idx) => (
            <li key={idx}>
              <figure>
                <img
                  alt={item?.alt}
                  className="img-fluid w-100 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  loading="lazy"
                  src={item?.image}
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}