import { apiFetch } from "@/src/lib/api";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";

export default async function SearchPageListing({ searchQuery }: { searchQuery: any }) {

  const { data, error } = await apiFetch(`global-search?q=${searchQuery}`);

  const searchResult = data?.data || [];

  return (
    <main className="site_main">

      <section className="search_listing_section">
        <div className="container25">
          {/* ✅ Dynamic heading with real query and count */}
          <h2 className="search-heading">
            Search Results for : {data?.query} ({searchResult.length})
          </h2>

          {searchResult.length === 0 ? (
            <p className="no-results">
              {data?.query
                ? `No results found for "${data.query}".`
                : "Enter a search term to get results."}
            </p>
          ) : (
            <ul className="results-list">
              {searchResult.map(
                (
                  item: any,
                  idx: number,
                ) => (
                  <li key={idx} className="result-item" data-aos="fade-up" data-aos-delay="200">
                    <Link href={`${item?.path}`} className="result_link">
                      <div className="result-content">
                        {item?.title && (
                          <h3 className="result-title">{item.title}</h3>
                        )}
                        {item?.description && (
                          <p className="result-description">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="result-arrow">
                          <figure>
                            <img alt="see more icon" loading="lazy" decoding="async" src="/images/home/slide_arrow_right.svg" />
                          </figure>
                        {/* <FaChevronRight /> */}
                      </div>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
} 