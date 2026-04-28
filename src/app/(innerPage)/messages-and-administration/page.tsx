import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import LeadershipList from "@/src/components/leadership/LeadershipList";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { getSlug } from "@/src/lib/getSlug";

export default async function MessagesAdministrationPage({searchParams}:{searchParams:Promise<{page?:string}>}){
    const {page} = await searchParams;
    const currentPage = Number(page) || 1;
    const {data, error} = await apiFetch(`leadership`);
    const slug = await getSlug();

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
        )
    }

    const pagination = data?.leadership;

    return(
        <>
            <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
                <LeadershipList data={data} />
            </InnerPageLayoutWrapper>
            {/* <PaginationWrapper
                currentPage={pagination?.current_page || 1}
                totalPages={pagination?.last_page || 1}
            /> */}
        </>
    )
}