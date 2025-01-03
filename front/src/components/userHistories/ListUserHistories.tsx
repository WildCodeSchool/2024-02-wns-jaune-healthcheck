import { useState, useEffect } from "react";
import {
    Card,
    List,
    ListItem,
    CardStatus,
    CardContent,
} from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import FilterBar from "@/components/custom/FilterBarPrivate";
import {
    PaginatesHistories,
    usePaginatesHistoriesQuery,
} from "@/generated/graphql-types";
import { Skeleton } from "@/components/ui/skeleton";
import CustomPagination from "@/components/custom/CustomPagination";

const ListUserHistories: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibility, setVisibility] = useState<"private" | "public" | "all">(
        "all",
    );

    const getPrivateHistoriesValue = (
        visibility: string,
    ): boolean | undefined => {
        if (visibility === "all") return undefined;
        return visibility === "private";
    };

    const { error, data } = usePaginatesHistoriesQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
            currentPage: Number(searchParams?.get("currentPage")) || 1,
            privateHistories: getPrivateHistoriesValue(visibility),
        },
        fetchPolicy: "cache-and-network",
    });

    const [PaginateHistories, setPaginateHistories] =
        useState<PaginatesHistories>({
            histories: [],
            totalPages: 1,
            currentPage: 1,
            previousPage: 1,
            nextPage: 2,
        });

    const { totalPages, currentPage, previousPage, nextPage } =
        PaginateHistories;

    useEffect(() => {
        if (!data) return;
        setPaginateHistories(data.paginatesHistories as PaginatesHistories);
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
                        ? data.paginatesHistories.histories.map((item) => (
                              <ListItem
                                  key={item.id}
                                  className="flex justify-center items-start w-full"
                              >
                                  <a
                                      href={`/history-url/${item.url.id}`}
                                      rel="noopener noreferrer"
                                      className="w-full"
                                  >
                                      <Card className="hover:border hover:border-primary">
                                          <CardContent className="h-full py-3 grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
                                              <div className="flex">
                                                  <CardStatus
                                                      statusCode={
                                                          item.status_code
                                                      }
                                                  />
                                                  <p>{item.url.name}</p>
                                              </div>
                                              <p className="font-extralight text-sm">
                                                  Url : {item.url.path}
                                              </p>
                                              <p>
                                                  Créé le :{" "}
                                                  <span>
                                                      {new Date(
                                                          item.created_at,
                                                      ).toLocaleDateString()}
                                                  </span>
                                                  <span>
                                                      {" "}
                                                      {new Date(
                                                          item.created_at,
                                                      ).toLocaleTimeString()}
                                                  </span>
                                              </p>

                                              {/* Modifier quand la requête sera faite (type d'affichage : il y a 5heures / il y a 5minutes) */}
                                              {/* <p>
                                                  Mis à jour le :{" "}
                                                  {item.lastCheckDate || "null"}
                                              </p> */}
                                              <button>:</button>
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

export default ListUserHistories;
