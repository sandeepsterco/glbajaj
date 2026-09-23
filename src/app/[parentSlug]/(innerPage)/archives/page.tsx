import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryList from "@/src/components/gallery/GalleryList";
import MainGallery from "@/src/components/gallery/MainGallery";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function ArchivePage({
    params,
    searchParams,
  }: {
    params: Promise<{ parentSlug: string }>;
    searchParams: Promise<{ page?: string }>;
  }){
    const { parentSlug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentSlug = 'archives'

  const { data, error } = await apiFetch(`archive?page=${currentPage}`);

  if (error) {
    return <ApiErrorFallback heading="Couldn't load Archive" message={error} />;
  }

  return (
    <InnerPageLayoutWrapper
      slug={currentSlug}
      pathname={`/${parentSlug}/${currentSlug}`}
      tabs={null}
      mainClass="happenings_page"
      showTabs={true}
    >
      <MainGallery data={data?.featured} currentPage="workshops" parentSlug={parentSlug} />
      <GalleryList data={data?.others} currentPage="workshops" parentSlug={parentSlug} />
    </InnerPageLayoutWrapper>
  );
}