"use client";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Image from "next/image";

interface MediaItem {
    image?: string | null;
    date?: string | null;
    title?: string | null;
    alt?:string;
}

interface MediaYearGroup {
    year: number;
    items: MediaItem[];
}

export default function MediaGrid({ items, pageName }: { items: MediaYearGroup[]; pageName:string; }) {
    const renderItems = (yearItems: MediaItem[]) => {
        const openGallery = (index: number) => {
            if (typeof Fancybox === "undefined") return;

            const gallery = yearItems
                .filter((item) => item.image)
                .map((item) => ({
                    src: item.image as string,
                    type: "image" as const,
                }));

            // Re-map index in case some items had no image and were filtered out
            const withImages = yearItems.filter((item) => item.image);
            const clickedItem = yearItems[index];
            const adjustedIndex = withImages.indexOf(clickedItem);

            Fancybox.show(gallery, {
                startIndex: adjustedIndex === -1 ? 0 : adjustedIndex,
            });
        };

        return (
            <div className="media_grid">
                {yearItems.map((item, idx) => (
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
                            <Image src={item.image || "/images/default/placeholder.webp"} width={400} height={328} loading="lazy" className="img-fluid" alt={item.alt || pageName} />
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
    };

    return (
        <>
            {items.map(({ year, items: yearItems }) => (
                <section key={year} className="media_coverage_year">
                    <h4 className="title24">{year}</h4>
                    {renderItems(yearItems)}
                </section>
            ))}
        </>
    );
}