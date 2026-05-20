"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

export default function PaginationWrapper({ currentPage, totalPages }: {
    currentPage: number;
    totalPages: number;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();    

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString()); // ← copies type + all other params
        params.set("page", String(page));
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxVisiblePages={5}
        />
    )
}