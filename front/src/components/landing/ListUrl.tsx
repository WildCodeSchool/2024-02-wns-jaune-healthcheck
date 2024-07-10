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

export default function URLList() {
    const { loading, error, data } = useGetAllURlsQuery();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState("createdAt");
    const itemsPerPage = 24;

    const filteredAndSortedUrls = useMemo(() => {
        if (!data) return [];

        let urls = data.urls.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.path.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        urls = urls.sort((a, b) => {
            if (sortKey === "name") {
                return a.name.localeCompare(b.name);
            } else if (sortKey === "status_code") {
                return (
                    (a.histories[0]?.status_code || 0) -
                    (b.histories[0]?.status_code || 0)
                );
            } else if (sortKey === "createdAt") {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            }
            return 0;
        });

        return urls;
    }, [data, searchQuery, sortKey]);

    const totalPages = Math.ceil(filteredAndSortedUrls.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleSortChange = (key: string) => {
        setSortKey(key);
    };

    if (error) return "Error";
    return (
        <div className="flex flex-col gap-8">
            <FilterBar
                searchQuery={searchQuery}
                sortKey={sortKey}
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
                                        className="flex justify-center items-center w-full"
                                    >
                                        <a
                                            href={`/url/${item.id}`}
                                            rel="noopener noreferrer"
                                            className="w-full max-w-lg"
                                        >
                                            <Card className="w-full">
                                                <CardHeader>
                                                    <CardTitle>
                                                        {item.name}
                                                    </CardTitle>
                                                    <CardDescription>
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
}
