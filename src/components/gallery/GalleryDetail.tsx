export default function GalleryDetailPage({ data }: { data: any }) {
    return (
        <section className="gallery_list_section">
            <div className="container25">
                <div className="gallery_list_header">
                    {data?.title && (
                        <h1>{data.title}</h1>
                    )}
                    <div className="gallery_tab">
                        <span>
                            Photos
                            <figure><img src="/images/icons/yellow-gallery.svg" alt="icon" className="img-fulid" /></figure>
                        </span>
                        <span>
                            Video
                            <figure><img src="/images/icons/yellow-video.svg" alt="icon" className="img-fulid" /></figure>
                        </span>
                    </div>
                </div>
                <div className="gallery_list">
                    {data?.gallery_urls?.map((item:any, idx:number)=>{
                        if(item){}
                        return (
                            <div key={idx} className="gallery_details" data-src="assets/images/gallery-list_01.webp" data-caption="Donec vitae sapien ut libero venenatis faucibus. Sed consequat, leo eget bibendum sodales, augue velit. Vestibulum purus quam">
                                <figure>
                                    <video
                                        src={item}
                                    />
                                    {/* <img src="assets/images/gallery-list_01.webp" className="img-fluid" alt="alt" /> */}
                                </figure>
                            </div>
                        )
                    })}
                    

                </div>
            </div>
        </section>
    )
}