import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

export default function BlogGrid({ data, slug }: { data: any; slug: string }) {
  return (
    <div className="blog_Bx">
      <figure className="flash-effect-2">
        <Image
          src={data?.image || "/images/blog-listing-placeholder.webp"}
          className="img-fluid"
          alt={data?.title || "blog"}
          width={400}
          height={250}
        />
      </figure>
      <div className="blog_Bx_cnt">
        {data?.date && (
          <div className="date">
            {new Date(data.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        )}
        {data?.category && <h4>{data.category}</h4>}
        {data?.title && <h5>{data.title}</h5>}
        {data?.description && (
          <figcaption>
            <p>{data.description}</p>
            <span>
              <img
                src="/images/icons/arrow-right.svg"
                alt="arrow"
                className="img-fluid"
              />
            </span>
          </figcaption>
        )}
      </div>
      <img
        src="/images/blog-pattern-bottom.webp"
        className="img-fluid"
        alt="pattern"
      />
      {data?.slug && (
        <Link href={`${BASE_URL}${slug}/${data.slug}`} className="strech_link" />
      )}
    </div>
  );
}