"use client"
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

type PaginationWrapperProps = {
    currentPage: number;
    totalPages: number;
    pageKey?: string;
    basePath?: string;
    onPageChange?: (page: number) => void;
};

function PaginationControls({
    currentPage,
    totalPages,
    pageKey = "page",
    basePath,
    onPageChange,
}: PaginationWrapperProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
            return;
        }

        if (basePath) {
            const path = basePath.replace(/\/$/, "");
            const params = new URLSearchParams(searchParams.toString());

            params.delete(pageKey);
            const qs = params.toString();
            const target = page === 1 ? path : `${path}/${page}`

            router.push(qs ? `${target}?${qs}` : target);
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set(pageKey, String(page));
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

export default function PaginationWrapper(props: PaginationWrapperProps) {
    return (
        <Suspense fallback={null}>
            <PaginationControls {...props} />
        </Suspense>
    )
}
