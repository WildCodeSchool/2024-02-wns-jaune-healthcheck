import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { PaginateUrls } from "@/generated/graphql-types";
import CustomPagination from "../custom/CustomPagination";

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
        if (!data) return;
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

    if (error) return "Error";
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
                    {data
                        ? data.urls.urls.map((item) => (
                              <ListItem
                                  key={item.id}
                                  className="flex justify-center items-start w-full"
                              >
                                  <a
                                      href={`/url/${item.id}`}
                                      rel="noopener noreferrer"
                                      className="w-full max-w-lg"
                                  >
                                      <Card className="w-full hover:border hover:border-primary">
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
                                                          ? item.histories[0]
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
                          ))
                        : Array.from({ length: 16 }, (_, index) => {
                              return (
                                  <Skeleton
                                      key={index}
                                      className="h-[143px] rounded-lg"
                                  />
                              );
                          })}
                </List>
            </div>
            <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                previousPage={previousPage}
                nextPage={nextPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default URLList;
