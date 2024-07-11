import { useState, useMemo } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    List,
    ListItem,
    CardStatus,
    CardContent,
} from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../custom/FilterBar";
import { useGetAllURlsQuery } from "@/generated/graphql-types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const URLList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, error, data } = useGetAllURlsQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
        },
        fetchPolicy: "cache-and-network",
    });

    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage = 24;

    const filteredAndSortedUrls = useMemo(() => {
        if (!data) return [];
        return [...data.urls];
    }, [data, searchParams]);

    const totalPages = Math.ceil(filteredAndSortedUrls.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (query: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!query) {
            newSearchParams.delete("searchUrl");
        } else {
            newSearchParams.set("searchUrl", query);
        }
        setSearchParams(newSearchParams);
        setCurrentPage(1);
    };

    const handleSortChange = (field: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!field) {
            newSearchParams.delete("sortField");
        } else {
            newSearchParams.set("sortField", field);
        }
        setSearchParams(newSearchParams);
    };

    if (error) return "Error";
    return (
        <div className="flex flex-col gap-8">
            <FilterBar
                searchQuery={searchParams?.get("searchUrl") || ""}
                sortKey={searchParams?.get("sortField") || ""}
                onSearch={handleSearch}
                onSortChange={handleSortChange}
            />
            {loading ? (
                "Loading"
            ) : (
                <>
                    <div className="flex-grow">
                        <List className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-0">
                            {filteredAndSortedUrls
                                .slice(startIndex, startIndex + itemsPerPage)
                                .map((item) => (
                                    <ListItem
                                        key={item.id}
                                        className="flex justify-center items-start w-full"
                                    >
                                        <a
                                            href={`/url/${item.id}`}
                                            rel="noopener noreferrer"
                                            className="w-full max-w-lg"
                                        >
                                            <Card className="w-full">
                                                <CardHeader>
                                                    <CardTitle
                                                        className="truncate"
                                                        title={item.name}
                                                    >
                                                        {item.name}
                                                    </CardTitle>
                                                    <CardDescription
                                                        className="truncate"
                                                        title={item.path}
                                                    >
                                                        {item.path}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex">
                                                    <CardStatus
                                                        statusCode={
                                                            item.histories[0]
                                                                ? item
                                                                      .histories[0]
                                                                      .status_code
                                                                : null
                                                        }
                                                    />
                                                    <p className="text-sm">
                                                        {item.histories[0]
                                                            ? `Status ${item.histories[0].status_code}`
                                                            : ""}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </a>
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                    <Pagination className="mt-4 mb-2">
                        <PaginationContent>
                            <PaginationPrevious
                                onClick={() =>
                                    handlePageChange(
                                        Math.max(currentPage - 1, 1),
                                    )
                                }
                            >
                                Précédent
                            </PaginationPrevious>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        isActive={currentPage === index + 1}
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationNext
                                onClick={() =>
                                    handlePageChange(
                                        Math.min(currentPage + 1, totalPages),
                                    )
                                }
                            >
                                Suivant
                            </PaginationNext>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </div>
    );
};

export default URLList;
