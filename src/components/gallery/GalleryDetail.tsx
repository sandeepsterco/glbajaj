"use client"
import { apiFetch } from '@/src/lib/api';
import { useMemo, useState } from 'react'
import { SkeletonGroup } from '../ui/Skeleton';
import Image from 'next/image';

import '@/src/styles/fancybox.css'

declare const Fancybox: any

function getYoutubeThumbnail(url: string): string {
    const match = url.match(
        /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^&?/]+)/
    );
    if (match?.[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return '/images/icons/video-placeholder.svg';
}

interface GalleryItem {
    files: string | null;
    description: string;
    embed_url: string | null;
}

function isVideoItem(item: GalleryItem): boolean {
    if (item.embed_url) return true; // YouTube = video
    const url = item.files ?? '';
    return /\.(mp4|webm|ogg)$/i.test(url);
}

function isImageItem(item: GalleryItem): boolean {
    return !isVideoItem(item);
}

export default function GalleryDetailPage({ gallery_data, slug }: { gallery_data: any, slug: string }) {
    const data = gallery_data?.data;
    const allItems: GalleryItem[] = data?.mapping_items?.items ?? [];

    const [galleryUrls, setGalleryUrls] = useState<GalleryItem[]>(allItems);
    const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos'>('all');
    const [isLoading, setIsLoading] = useState(false);

    // Check what types are available to conditionally show filter buttons
    const hasImages = allItems.some(isImageItem);
    const hasVideos = allItems.some(isVideoItem);

    const galleryItems = useMemo(() => {
        return galleryUrls.map((item: GalleryItem) => {
            if (item.embed_url) {
                return {
                    src: getYoutubeThumbnail(item.embed_url),
                    embedUrl: item.embed_url,
                    type: 'iframe' as const,
                    caption: item.description ?? '',
                };
            }

            const url = item.files ?? '';
            const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

            return {
                src: url,
                type: isVideo ? 'video' as const : 'image' as const,
                caption: item.description ?? '',
                embedUrl: undefined,
            };
        });
    }, [galleryUrls]);

    const openGallery = (index: number) => {
        if (typeof Fancybox === 'undefined') return;

        const items = galleryItems.map((item) => {
            if (item.type === 'iframe') {
                return {
                    src: item.embedUrl,
                    type: 'iframe',
                    caption: item.caption,
                };
            }

            if (item.type === 'video') {
                return {
                    src: item.src,
                    type: 'html5video', // ✅ Fix: use html5video not video
                    caption: item.caption,
                    html5video: {
                        tpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" src="%s"></video>`,
                    },
                };
            }

            return {
                src: item.src,
                type: 'image',
                caption: item.caption,
            };
        });

        Fancybox.show(items, {
            startIndex: index,
            Thumbs: false,
        });
    };

    const applyFilter = async (type: 'all' | 'images' | 'videos') => {
        if (activeFilter === type || isLoading) return;

        // ✅ For 'all', just reset from original data — no API call needed
        if (type === 'all') {
            setGalleryUrls(allItems);
            setActiveFilter('all');
            return;
        }

        // ✅ Client-side filtering first (instant, no API needed)
        // Remove this block and keep only API call if server-side filtering is required
        const filtered = allItems.filter((item) =>
            type === 'images' ? isImageItem(item) : isVideoItem(item)
        );

        setGalleryUrls(filtered);
        setActiveFilter(type); // ✅ Set active only after we have data

        // ✅ Uncomment below if you need server-side filtering instead:
        // try {
        //     setIsLoading(true);
        //     const { data: filteredData, error } = await apiFetch(`gallery/${slug}?filter=${type}`);
        //     if (error || !filteredData) throw new Error('Failed to fetch gallery data');
        //     const items: GalleryItem[] = filteredData?.gallery_details?.mapping_items?.items ?? [];
        //     setGalleryUrls(items);
        //     setActiveFilter(type);
        // } catch (error) {
        //     console.error((error as Error).message);
        //     alert('Failed to fetch gallery data');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <>
            <section className="gallery_list_section">
                <div className="container25">
                    <div className="gallery_list_header">
                        {data?.title && <h1>{data.title}</h1>}
                        <div className="gallery_tab">
                            {/* ✅ Reset button only when filter is active */}
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

                            {/* ✅ Only show Photos tab if images exist */}
                            {hasImages && (
                                <span
                                    className={`${activeFilter === 'images' ? 'active' : ''} ${isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                    onClick={() => applyFilter('images')}
                                >
                                    Photos
                                    <figure>
                                        <img src="/images/icons/yellow-gallery.svg" alt="icon" className="img-fluid" loading='lazy' />
                                    </figure>
                                </span>
                            )}

                            {/* ✅ Only show Videos tab if videos exist */}
                            {hasVideos && (
                                <span
                                    className={`${activeFilter === 'videos' ? 'active' : ''} ${isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                    onClick={() => applyFilter('videos')}
                                >
                                    Video
                                    <figure>
                                        <img src="/images/icons/yellow-video.svg" alt="icon" className="img-fluid" loading='lazy' />
                                    </figure>
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="gallery_list">
                        {isLoading ? (
                            <SkeletonGroup count={6} wrapperClassName="grid gap-[3rem]" className="w-full h-[50rem]" />
                        ) : galleryItems.length === 0 ? (
                            // ✅ Empty state when filter returns nothing
                            <p className="text-center py-10 text-gray-500">No items found.</p>
                        ) : (
                            galleryItems.map((item, idx) => (
                                <div
                                    key={`${item.src}-${idx}`}
                                    className="gallery_details"
                                    onClick={() => openGallery(idx)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <figure className="flash-effect-2">
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
                                                    <img src="/images/icons/play-button.svg" className="img-fluid" alt="video play" loading='lazy' />
                                                </span>
                                            </>
                                        ) : item.type === 'iframe' ? (
                                            <>
                                                <Image
                                                    src={item.src}
                                                    className="img-fluid"
                                                    alt={item.caption || `YouTube video ${idx + 1}`}
                                                    width={640}
                                                    height={426}
                                                    loading='lazy'
                                                    style={{
                                                        height: "186px",
                                                        objectFit: "cover",
                                                      }}
                                                />
                                                <span>
                                                    <img src="/images/icons/play-button.svg" className="img-fluid" alt="video play" loading='lazy' />
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