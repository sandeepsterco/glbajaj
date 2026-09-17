"use client";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface MediaItem {
    image?: string | null;
    date?: string | null;
    title?: string | null;
}

export default function MediaGrid({ items }: { items: MediaItem[] }) {
    const openGallery = (index: number) => {
        if (typeof Fancybox === "undefined") return;

        const gallery = items
            .filter((item) => item.image)
            .map((item) => ({
                src: item.image as string,
                type: "image" as const,
            }));

        // Re-map index in case some items had no image and were filtered out
        const withImages = items.filter((item) => item.image);
        const clickedItem = items[index];
        const adjustedIndex = withImages.indexOf(clickedItem);

        Fancybox.show(gallery, {
            startIndex: adjustedIndex === -1 ? 0 : adjustedIndex,
        });
    };

    return (
        <div className="media_grid">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="media_grid_Bx"
                    data-src={item.image || ""}
                    data-aos="fade-up"
                    data-aos-delay="600"
                    onClick={() => openGallery(idx)}
                    style={{ cursor: "pointer" }}
                >
                    <figure>
                        <img src={item.image || "#"} className="img-fluid" alt="media logo" />
                    </figure>
                    <div className="media_txt">
                        {item?.date && (
                            <h5>
                                {new Date(item.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </h5>
                        )}
                        {item?.title && (
                            <p dangerouslySetInnerHTML={{ __html: item.title }} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}