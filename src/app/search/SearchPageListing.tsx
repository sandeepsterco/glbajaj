import { apiFetch } from "@/src/lib/api";
import Link from "next/link";

export default async function SearchPageListing({
  searchQuery,
}: {
  searchQuery: string;
}) {
  if (!searchQuery) {
    return (
      <div className="site_main">
        <section className="search_listing_section">
          <div className="container25">
            <h2 className="search-heading">Search</h2>
            <p className="no-results">Enter a search term to get results.</p>
          </div>
        </section>
      </div>
    );
  }

  const { data, error } = await apiFetch(
    `global-search?q=${encodeURIComponent(searchQuery)}`,
    { cache: "no-store" }
  );

  const searchResult = data?.data || [];
  const displayQuery = data?.query || searchQuery;

  return (
    <div className="site_main">
      <section className="search_listing_section">
        <div className="container25">
          <h2 className="search-heading">
            Search Results for : {displayQuery} ({searchResult.length})
          </h2>

          {error ? (
            <p className="no-results">
              Something went wrong while searching. Please try again.
            </p>
          ) : searchResult.length === 0 ? (
            <p className="no-results">
              No results found for &quot;{displayQuery}&quot;.
            </p>
          ) : (
            <ul className="results-list">
              {searchResult.map((item: any, idx: number) => (
                <li
                  key={item?.path ?? idx}
                  className="result-item"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <Link href={`${item?.path}`} className="result_link">
                    <div className="result-content">
                      {item?.title && (
                        <h3 className="result-title">{item.title}</h3>
                      )}
                      {item?.description && (
                        <p className="result-description">{item.description}</p>
                      )}
                    </div>
                    <div className="result-arrow">
                      <figure>
                        <img
                          alt="see more icon"
                          loading="lazy"
                          decoding="async"
                          src="/images/home/slide_arrow_right.svg"
                        />
                      </figure>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}