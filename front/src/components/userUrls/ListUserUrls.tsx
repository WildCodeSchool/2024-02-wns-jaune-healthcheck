import { useState, useEffect } from "react";
import {
    Card,
    List,
    ListItem,
    CardStatus,
    CardContent,
} from "@/components/ui/card";
import { useSearchParams, Link } from "react-router-dom";
import FilterBar from "@/components/custom/FilterBarPrivate";
import { useGetAllURlsQuery } from "@/generated/graphql-types";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginateUrls } from "@/generated/graphql-types";
import CustomPagination from "@/components/custom/CustomPagination";

const ListUserUrls: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibility, setVisibility] = useState<"private" | "public" | "all">(
        "all",
    );
    const getPrivateUrlsValue = (visibility: string): boolean | undefined => {
        if (visibility === "all") return undefined;
        return visibility === "private";
    };

    const { error, data } = useGetAllURlsQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
            currentPage: Number(searchParams?.get("currentPage")) || 1,
            privateUrls: getPrivateUrlsValue(visibility),
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
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                searchQuery={searchParams.get("searchUrl") || ""}
                sortKey={searchParams.get("sortField") || ""}
                onVisibilityChange={(value) =>
                    setVisibility(value as "private" | "public" | "all")
                }
                visibilityFilter={visibility}
            />
            <div className="w-full flex-grow">
                <List className="w-full">
                    {data
                        ? data.urls.urls.map((item) => (
                              <ListItem
                                  key={item.id}
                                  className="flex justify-center items-start w-full"
                              >
                                  <Link
                                      key={item.id}
                                      to={`/user-url/${item.id}`}
                                      rel="noopener noreferrer"
                                      className="w-full"
                                  >
                                      <Card className="hover:border hover:border-primary">
                                          <CardContent className="h-full py-3 grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
                                              <div className="flex w-40">
                                                  <CardStatus
                                                      statusCode={
                                                          item.histories[0]
                                                              ? item
                                                                    .histories[0]
                                                                    .status_code
                                                              : null
                                                      }
                                                  />
                                                  <p className="truncate">
                                                      {item.name}
                                                  </p>
                                              </div>
                                              <div className="flex items-center">
                                                  <span className="font-extralight text-sm whitespace-nowrap">
                                                      Url :{" "}
                                                  </span>
                                                  <span className="font-extralight text-sm ml-1">
                                                      {item.path}
                                                  </span>
                                              </div>
                                              <p>
                                                  Ajoutée le :{" "}
                                                  {new Date(
                                                      item.createdAt,
                                                  ).toLocaleDateString()}
                                              </p>
                                              <button>:</button>
                                          </CardContent>
                                      </Card>
                                  </Link>
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
                    {!data?.urls.urls.length && (
                        <p className="text-center text-muted-foreground">
                            Aucune URL
                        </p>
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

export default ListUserUrls;
