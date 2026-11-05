import { getPageSEO } from "@/src/lib/seo";
import GalleryListing from "@/src/components/gallery/GalleryListing";

export async function generateMetadata() {
    return getPageSEO("happenings/gallery");
}

export default async function GalleryPage() {
    return <GalleryListing page={1} />
}
