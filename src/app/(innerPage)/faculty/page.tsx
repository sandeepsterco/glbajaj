import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import FacultyList from "@/src/components/faculty/FacultyList";
import { apiFetch } from "@/src/lib/api"

export default async function GalleryPage({searchParams}:{searchParams:Promise<{page?:string}>}){
    const {page} = await searchParams;
    const currentPage = Number(page) || 1;
    const {data, error} = await apiFetch(`faculty?page=${currentPage}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
        )
    }

    const pagination = data?.faculty;

    return(
        <>
            <FacultyList data={data?.faculty} />
            <PaginationWrapper
                currentPage={pagination?.current_page || 1}
                totalPages={pagination?.last_page || 1}
            />
        </>
    )
}