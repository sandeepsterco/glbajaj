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
              <figure className="flash-effect-2">
                <Image
                  src={data?.image || "/images/blog-list-banner.webp"}
                  alt={data?.title || "GL Bajaj"}
                  className="img-fluid w-100"
                  width={850}
                  height={520}
                  loading="lazy"
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
                {data?.category && <h3 className="font24">{data.category}</h3>}
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