import { apiFetch } from "@/src/lib/api";

const getConferenceLists = async () => {
  const { data, error } = await apiFetch(`placement`);

  if (error) throw new Error(error);
  return data;
};

export default async function PlacementRecord() {
  const data = await getConferenceLists();

  const batch_groups = data?.placement;

  return (
    <div className="placement_wrapper">
      {batch_groups &&
        batch_groups.map((group: any, groupIdx: number) => (
          <div key={group?.batch ?? groupIdx} className="placement_batch_section">
            <h3
              className="font36"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Batch {group?.batch}
            </h3>

            <div className="placement_grid">
              {group?.placements?.map((item: any, idx: number) => (
                <div
                  key={item?.id ?? idx}
                  className="place_box relative"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div className="place_imgbox">
                    <figure className="flash-effect-2">
                      <img
                        src={item.image ?? ""}
                        alt={item?.name}
                        data-aos="fade-up"
                        data-aos-delay="200"
                      />
                    </figure>
                    {item?.logo_image && (
                      <div className="place_complog">
                        <figure>
                          <img src={item?.logo_image ?? ""} alt="company logo" />
                        </figure>
                      </div>
                    )}
                  </div>
                  <div className="place_infobox">
                    <h3 data-aos="fade-up" data-aos-delay="400">
                      {item.name}
                    </h3>
                    <p data-aos="fade-up" data-aos-delay="600">
                      {item?.course && (
                        <>
                          <strong>{item?.course}</strong> |
                        </>
                      )}{" "}
                      {item?.batch && (
                        <>
                          Batch <strong>{item.batch}</strong>
                        </>
                      )}{" "}
                    </p>

                    {item?.package && (
                      <div className="place_pkg">
                        <h3
                          className="font36"
                          data-aos="fade-up"
                          data-aos-delay="800"
                        >
                          Package ₹<strong>{item.package}</strong>
                        </h3>
                      </div>
                    )}
                  </div>
                  {/* <Link
                    className="strech_link"
                    href={`${BASE_URL}placement-record/${item?.slug ?? "#"}`}
                  /> */}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}