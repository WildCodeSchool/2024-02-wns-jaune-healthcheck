import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import useScreenDimensions from "@/hooks/useScreenDimensions";

type CustomPaginationProps = {
    currentPage: number;
    totalPages: number;
    previousPage: number;
    nextPage: number;
    onPageChange: (page: number) => void;
};

type ResponsivePaginationProps = {
    onClick: () => void;
};

const ResponsivePaginationPrevious: React.FC<ResponsivePaginationProps> = ({
    onClick,
}) => {
    const { width } = useScreenDimensions();

    return (
        <>
            {width > 768 ? (
                <PaginationPrevious
                    className="hover:cursor-pointer"
                    onClick={onClick}
                />
            ) : (
                <Button variant="ghost" size="icon" onClick={onClick}>
                    <ChevronLeft className="h-4 w-4 mt-[0.5px]" />
                </Button>
            )}
        </>
    );
};

const ResponsivePaginationNext: React.FC<ResponsivePaginationProps> = ({
    onClick,
}) => {
    const { width } = useScreenDimensions();

    return (
        <>
            {width > 768 ? (
                <PaginationNext
                    className="hover:cursor-pointer"
                    onClick={onClick}
                />
            ) : (
                <Button variant="ghost" size="icon" onClick={onClick}>
                    <ChevronRight className="h-4 w-4 mt-[0.5px]" />
                </Button>
            )}
        </>
    );
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
    currentPage,
    totalPages,
    previousPage,
    nextPage,
    onPageChange,
}) => {
    const { width } = useScreenDimensions();
    const maxVisiblePages = width > 768 ? 2 : 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const generatePaginationItems = () => {
        const items = [];

        const startPage = Math.max(1, currentPage - maxVisiblePages);
        const endPage = Math.min(totalPages, currentPage + maxVisiblePages);

        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        className="hover:cursor-pointer"
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>,
            );
            if (startPage > 2) {
                items.push(<PaginationEllipsis key="ellipsis-start" />);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        className="hover:cursor-pointer"
                        isActive={currentPage === i}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<PaginationEllipsis key="ellipsis-end" />);
            }
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        className="hover:cursor-pointer"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return items;
    };

    return (
        <Pagination className="mt-4 mb-2">
            <PaginationContent>
                <PaginationItem>
                    <ResponsivePaginationPrevious
                        onClick={() => handlePageChange(previousPage)}
                    />
                </PaginationItem>

                {generatePaginationItems()}
                <PaginationItem>
                    <ResponsivePaginationNext
                        onClick={() => handlePageChange(nextPage)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;
