"use client"
import { apiFetch } from '@/src/lib/api';
import '@/src/styles/fancybox.css'
import Script from 'next/script';
import { useMemo, useRef, useState } from 'react'
import { SkeletonGroup } from '../ui/Skeleton';

declare const Fancybox: any

export default function GalleryDetailPage({ data, slug }: { data: any, slug:string }) {
    const galleryRef = useRef<HTMLDivElement>(null);

    // galleryUrls holds the current list — starts from prop, updates on filter
    const [galleryUrls, setGalleryUrls] = useState<string[]>(data?.gallery_urls ?? []);
    const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos'>('all');
    const [isLoading, setIsLoading] = useState(false)

    const galleryItems = useMemo(() => {
        return galleryUrls.map((url: string) => {
            const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
            return {
                src: url,
                type: isVideo ? 'video' : 'image',
                caption: data?.caption ?? '',
            };
        });
    }, [galleryUrls, data?.caption]);

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
                // For direct mp4/webm files, use type:'html' with a <video> element
                // type:'video' is only for YouTube/Vimeo embed URLs
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

    const applyFilter = async(type:'all' | 'images' | 'videos')=>{
        if (activeFilter === type) return;
        setActiveFilter(type);

        if(type == 'all'){
            setGalleryUrls(data?.gallery_urls ?? []);
            return;
        }

        try{
            setIsLoading(true);
            const {data:filteredData, error} = await apiFetch(`gallery/${slug}?filter=${type}`);
            if(error || !filteredData){
                throw new Error('failed to fetch gallery data');
            };
            const urls: string[] = filteredData?.gallery_details?.gallery_urls ?? [];
            setGalleryUrls(urls);
        }catch(error){
            console.log((error as Error).message || 'Failed to fetch gallery data') ;
            alert('Failed to fetch gallery data');
        }finally{
            setIsLoading(false);
        }

    }

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"
                strategy="afterInteractive"
            />
            <section className="gallery_list_section">
                <div className="container25">
                    <div className="gallery_list_header">
                        {data?.title && <h1>{data.title}</h1>}
                        <div className="gallery_tab">
                            
                            {activeFilter !== 'all' && (
                                <button
                                    type='reset'
                                    className='resetBtn cursor-pointer'
                                    onClick={()=>applyFilter('all')}
                                >Reset</button>
                            )}
                            <span
                                className={` ${activeFilter == 'images' ? 'active' : ''} ${isLoading ? 'pointer-event-none opacity-50':'cursor-pointer'}`}
                                onClick={()=>applyFilter('images')}
                                aria-disabled
                            >
                                Photos
                                <figure><img src="/images/icons/yellow-gallery.svg" alt="icon" className="img-fluid" /></figure>
                            </span>
                            <span
                                className={`${activeFilter == 'videos' ? 'active' : ''} ${isLoading ? 'pointer-event-none opacity-50':'cursor-pointer'}`} 
                                onClick={()=>applyFilter('videos')}
                                aria-disabled    
                            >
                                Video
                                <figure><img src="/images/icons/yellow-video.svg" alt="icon" className="img-fluid" /></figure>
                            </span>
                        </div>
                    </div>

                    <div className="gallery_list" ref={galleryRef}>
                        {isLoading ? (
                            <div>
                                <SkeletonGroup  count={6} wrapperClassName="grid gap-[3rem]" className='w-full h-[50rem]' />
                            </div>
                        ) : (
                            galleryItems?.map((item: any, idx: number) => (
                                <div
                                    key={idx}
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