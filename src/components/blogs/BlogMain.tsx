import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

export default function BlogMain({ data, slug }: { data: any; slug: string }) {
  if (!data) return null;

  return (
    <section className="blog_section">
      <div className="container">
        <div className="col-xl-10">
          <div className="front_news">
            <div className="news_left">
              <figure>
                <Image
                  src={data?.image || "/images/blog-list-banner.webp"}
                  alt={data?.title || "GL Bajaj"}
                  className="img-fluid w-100"
                  width={850}
                  height={519}
                />
              </figure>
            </div>
            <div className="blog_right">
              <div className="blog_cnt">
                {data?.date && (
                  <div className="date">
                    {new Date(data.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
                {data?.tags && <h3 className="">{data.tags}</h3>}
                {data?.title && (
                  <blockquote className="title36">{data.title}</blockquote>
                )}
                {data?.description && <p>{data.description}</p>}
                {data?.slug && (
                  <Link href={`${BASE_URL}${slug}/${data.slug}`}>
                    <img
                      src="/images/icons/arrow-right.svg"
                      alt="arrow"
                      className="img-fluid"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}