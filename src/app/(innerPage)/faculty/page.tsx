import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import FacultyList from "@/src/components/faculty/FacultyList";
import { apiFetch } from "@/src/lib/api"

export default async function GalleryPage(){
    const {data, error} = await apiFetch(`faculty`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
        )
    }

    return(
        <>
            <FacultyList data={data?.faculty} />
        </>
    )
}