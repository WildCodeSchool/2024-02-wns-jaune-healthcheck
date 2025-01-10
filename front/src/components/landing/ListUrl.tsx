import { useState, useEffect } from "react";
import { List } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../custom/FilterBar";
import { useGetAllURlsQuery } from "@/generated/graphql-types";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginateUrls } from "@/generated/graphql-types";
import CustomPagination from "../custom/CustomPagination";
import UrlCard from "@/components/custom/UrlCard.tsx";

const URLList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { error, data } = useGetAllURlsQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
            currentPage: Number(searchParams?.get("currentPage")) || 1,
        },
        fetchPolicy: "cache-and-network",
    });

    const [PaginateUrls, setPaginateUrls] = useState<PaginateUrls>({
        urls: [],
        totalPages: 1,
        currentPage: 1,
        previousPage: 1,
        nextPage: 2,
    });

    const { totalPages, currentPage, previousPage, nextPage } = PaginateUrls;

    useEffect(() => {
        if (!data) {
            return;
        }
        setPaginateUrls(data.urls as PaginateUrls);
    }, [data]);

    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!page) {
            newSearchParams.delete("currentPage");
        } else {
            newSearchParams.set("currentPage", String(page));
        }
        setSearchParams(newSearchParams);
    };

    const handleSearch = (query: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!query) {
            newSearchParams.delete("searchUrl");
        } else {
            newSearchParams.delete("currentPage");
            newSearchParams.set("searchUrl", query);
        }
        setSearchParams(newSearchParams);
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

    if (error) {
        return "Error";
    }
    return (
        <div className="flex flex-col gap-8">
            <FilterBar
                searchQuery={searchParams?.get("searchUrl") || ""}
                sortKey={searchParams?.get("sortField") || ""}
                onSearch={handleSearch}
                onSortChange={handleSortChange}
            />
            <div className="flex-grow">
                <List className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-0">
                    {data && data.urls.urls
                        ? data.urls.urls.map((item) => <UrlCard item={item} />)
                        : Array.from({ length: 16 }, (_, index) => {
                              return (
                                  <Skeleton
                                      key={index}
                                      className="h-[143px] rounded-lg"
                                  />
                              );
                          })}
                    {!data?.urls.urls.length && (
                        <div className="w-full">
                            <p className="text-center text-muted-foreground italic">
                                Aucune URL trouvée.
                            </p>
                        </div>
                    )}
                </List>
            </div>
            {data && data.urls.totalPages > 1 && data.urls.totalPages !== 0 && (
                <CustomPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default URLList;
