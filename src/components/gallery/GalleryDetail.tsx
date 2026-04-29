"use client"
import { apiFetch } from '@/src/lib/api';
import Script from 'next/script';
import { useMemo, useRef, useState } from 'react'
import { SkeletonGroup } from '../ui/Skeleton';

declare const Fancybox: any

interface GalleryItem {
    gallery_urls: string
    description: string
}

export default function GalleryDetailPage({ data, slug }: { data: any, slug: string }) {
    const galleryRef = useRef<HTMLDivElement>(null);

    const [galleryUrls, setGalleryUrls] = useState<GalleryItem[]>(data?.mapping_items?.items ?? []);
    const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos'>('all');
    const [isLoading, setIsLoading] = useState(false);

    const galleryItems = useMemo(() => {
        return galleryUrls.map((item: GalleryItem) => {
            const isVideo = /\.(mp4|webm|ogg)$/i.test(item.gallery_urls ?? '');
            return {
                src: item.gallery_urls,      // ← fix: was `url` (the whole object)
                type: isVideo ? 'video' : 'image',
                caption: item.description ?? '',
            };
        });
    }, [galleryUrls]);

    const openGallery = (index: number) => {
        if (typeof Fancybox === 'undefined') return;

        const items = galleryRef.current?.querySelectorAll('.gallery_details');
        if (!items) return;

        const gallery: any[] = [];

        items.forEach((el) => {
            const isVideo = el.getAttribute('data-type') === 'video';
            const src = el.getAttribute('data-src') ?? '';
            const caption = el.getAttribute('data-caption') ?? '';

            if (isVideo) {
                gallery.push({
                    src: `<video controls autoplay playsinline style="max-width:100%;max-height:90vh;"><source src="${src}" />Your browser does not support the video tag.</video>`,
                    type: 'html',
                    caption,
                });
            } else {
                gallery.push({
                    src,
                    type: 'image',
                    caption,
                });
            }
        });

        Fancybox.show(gallery, {
            startIndex: index,
            Thumbs: false,
        });
    };

    const applyFilter = async (type: 'all' | 'images' | 'videos') => {
        if (activeFilter === type || isLoading) return;
        setActiveFilter(type);

        if (type === 'all') {
            setGalleryUrls(data?.mapping_items?.items ?? []);
            return;
        }

        try {
            setIsLoading(true);
            const { data: filteredData, error } = await apiFetch(`gallery/${slug}?filter=${type}`);
            if (error || !filteredData) throw new Error('Failed to fetch gallery data');

            // Adjust key to match filtered API response shape
            const items: GalleryItem[] = filteredData?.gallery_details?.mapping_items?.items ?? [];
            setGalleryUrls(items);
        } catch (error) {
            console.error((error as Error).message);
            alert('Failed to fetch gallery data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="gallery_list_section">
                <div className="container25">
                    <div className="gallery_list_header">
                        {data?.title && <h1>{data.title}</h1>}
                        <div className="gallery_tab">
                            {activeFilter !== 'all' && (
                                <button
                                    type="button"
                                    className="resetBtn cursor-pointer"
                                    onClick={() => applyFilter('all')}
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                            )}
                            <span
                                className={`${activeFilter === 'images' ? 'active' : ''} ${isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                onClick={() => applyFilter('images')}
                            >
                                Photos
                                <figure><img src="/images/icons/yellow-gallery.svg" alt="icon" className="img-fluid" /></figure>
                            </span>
                            <span
                                className={`${activeFilter === 'videos' ? 'active' : ''} ${isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                onClick={() => applyFilter('videos')}
                            >
                                Video
                                <figure><img src="/images/icons/yellow-video.svg" alt="icon" className="img-fluid" /></figure>
                            </span>
                        </div>
                    </div>

                    <div className="gallery_list" ref={galleryRef}>
                        {isLoading ? (
                            <SkeletonGroup count={6} wrapperClassName="grid gap-[3rem]" className="w-full h-[50rem]" />
                        ) : (
                            galleryItems.map((item, idx) => (
                                <div
                                    key={`${item.src}-${idx}`}
                                    className="gallery_details"
                                    data-src={item.src}
                                    data-type={item.type}
                                    data-caption={item.caption}
                                    onClick={() => openGallery(idx)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <figure>
                                        {item.type === 'video' ? (
                                            <>
                                                <video
                                                    src={item.src}
                                                    muted
                                                    playsInline
                                                    preload="metadata"
                                                    className="img-fluid"
                                                    onLoadedMetadata={(e) => {
                                                        (e.target as HTMLVideoElement).currentTime = 0.1;
                                                    }}
                                                />
                                                <span>
                                                    <img
                                                        src="/images/icons/play-button.svg"
                                                        className="img-fluid"
                                                        alt="video play"
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            <img
                                                src={item.src}
                                                className="img-fluid"
                                                alt={item.caption || `Gallery image ${idx + 1}`}
                                            />
                                        )}
                                    </figure>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}