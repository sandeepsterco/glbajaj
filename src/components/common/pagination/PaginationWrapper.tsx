"use client"
import { usePathname, useRouter } from "next/navigation";
import Pagination from "./Pagination";

export default function PaginationWrapper({ currentPage, totalPages }: {
    currentPage: number;
    totalPages: number;
}) {

    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page:number) => {
        router.push(`${pathname}?page=${page}`)
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