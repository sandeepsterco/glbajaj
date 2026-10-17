import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}/achievements`);
}

export default async function DepartmentAboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/achievements`),
    getPageSEO(`department/${slug}/achievements`),
  ]);
  const pageData = data?.data?.modular?.achivements;

  return (
    <>
      {seoData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.schema),
          }}
        />
      )}

      <section className="achivment_innerpage">
        <div className="container">
          <div className="container25">
            <div className="achivent_grid">
              {pageData && pageData?.length > 0 ? (
                pageData.map((item: any, idx: number) => (
                  <div key={idx} className="achivecard">
                    <figure>
                      <Image
                        src={
                          item?.image ??
                          "/images/default/department-project.webp"
                        }
                        alt={item?.title ?? "Department Achievement"}
                        width={600}
                        height={443}
                        loading="lazy"
                      />
                    </figure>
                    {item?.title && (
                      <div className="achiv_caption">
                        <p dangerouslySetInnerHTML={{ __html: item?.title }} />
                      </div>
                    )}

                    <Link
                      className="strech_link"
                      href={`${BASE_URL}why-glbitm/achievements/${item.slug}`}
                    />
                  </div>
                ))
              ) : (
                <h1>No Data Found</h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
