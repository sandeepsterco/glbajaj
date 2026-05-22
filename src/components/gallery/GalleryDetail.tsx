"use client"
import { apiFetch } from '@/src/lib/api';
import { useMemo, useState } from 'react'
import { SkeletonGroup } from '../ui/Skeleton';
import Image from 'next/image';

declare const Fancybox: any

function getYoutubeThumbnail(embedUrl: string): string {
    const match = embedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (match?.[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return '/images/icons/video-placeholder.svg';
}

interface GalleryItem {
    gallery_urls: string | null;
    description: string;
    embed_url: string | null;
}

export default function GalleryDetailPage({ gallery_data, slug }: { gallery_data: any, slug: string }) {
    const data = gallery_data?.data;

    const [galleryUrls, setGalleryUrls] = useState<GalleryItem[]>(data?.mapping_items?.items ?? []);
    const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos'>('all');
    const [isLoading, setIsLoading] = useState(false);

    const galleryItems = useMemo(() => {
        return galleryUrls.map((item: GalleryItem) => {
            if (item.embed_url) {
                return {
                    src: getYoutubeThumbnail(item.embed_url),
                    embedUrl: item.embed_url,
                    type: 'youtube' as const,
                    caption: item.description ?? '',
                };
            }
            const isVideo = /\.(mp4|webm|ogg)$/i.test(item.gallery_urls ?? '');
            return {
                src: item.gallery_urls ?? '',
                embedUrl: '',
                type: isVideo ? 'video' as const : 'image' as const,
                caption: item.description ?? '',
            };
        });
    }, [galleryUrls]);

    const openGallery = (index: number) => {
        if (typeof Fancybox === 'undefined') return;

        const clickedItem = galleryItems[index];

        if (clickedItem.type === 'youtube') {
            // Open YouTube solo — never mix html-type with image-type in one show() call
            const autoplaySrc = clickedItem.embedUrl.includes('?')
                ? `${clickedItem.embedUrl}&autoplay=1`
                : `${clickedItem.embedUrl}?autoplay=1`;
            Fancybox.show([
                {
                    src: `<iframe src="${autoplaySrc}" style="width:100%;height:90vh;border:none;" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
                    type: 'html',
                    caption: clickedItem.caption,
                },
            ], { Thumbs: false });
            return;
        }

        if (clickedItem.type === 'video') {
            // Open mp4/webm video solo
            Fancybox.show([
                {
                    src: `<video controls autoplay playsinline style="max-width:100%;max-height:90vh;"><source src="${clickedItem.src}" />Your browser does not support the video tag.</video>`,
                    type: 'html',
                    caption: clickedItem.caption,
                },
            ], { Thumbs: false });
            return;
        }

        // For images: build a gallery of ONLY image items so Fancybox never
        // sees an html-type src and tries to construct a URL from it.
        const imageOnlyItems = galleryItems
            .filter((item) => item.type === 'image')
            .map((item) => ({
                src: item.src,
                type: 'image',
                caption: item.caption,
            }));

        // Find the correct startIndex within the image-only subset
        const imageStartIndex = galleryItems
            .slice(0, index)
            .filter((item) => item.type === 'image').length;

        Fancybox.show(imageOnlyItems, {
            startIndex: imageStartIndex,
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

                    <div className="gallery_list">
                        {isLoading ? (
                            <SkeletonGroup count={6} wrapperClassName="grid gap-[3rem]" className="w-full h-[50rem]" />
                        ) : (
                            galleryItems.map((item, idx) => (
                                <div
                                    key={`${item.src}-${idx}`}
                                    className="gallery_details"
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
                                                    <img src="/images/icons/play-button.svg" className="img-fluid" alt="video play" />
                                                </span>
                                            </>
                                        ) : item.type === 'youtube' ? (
                                            <>
                                                <img
                                                    src={item.src}
                                                    className="img-fluid"
                                                    alt={item.caption || `YouTube video ${idx + 1}`}
                                                />
                                                <span>
                                                    <img src="/images/icons/play-button.svg" className="img-fluid" alt="video play" />
                                                </span>
                                            </>
                                        ) : (
                                            <Image
                                                width={392}
                                                height={261}
                                                loading='lazy'
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