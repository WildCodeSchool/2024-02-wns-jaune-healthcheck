import { useState, useEffect } from "react";
import {
    Card,
    List,
    ListItem,
    CardStatus,
    CardContent,
} from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../custom/FilterBarPrivate";
import { useGetAllURlsQuery } from "@/generated/graphql-types";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginateUrls } from "@/generated/graphql-types";
import CustomPagination from "../custom/CustomPagination";

const URLList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isPrivate, setIsPrivate] = useState(true);
    const { error, data } = useGetAllURlsQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
            currentPage: Number(searchParams?.get("currentPage")) || 1,
            privateUrls: isPrivate,
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
                isPrivate={isPrivate}
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                onIsPrivateChange={setIsPrivate}
            />
            <div className="w-full flex-grow">
                <List className="w-full">
                    {data
                        ? data.urls.urls.map((item) => (
                              <ListItem
                                  key={item.id}
                                  className="flex justify-center items-start w-full"
                              >
                                  <a
                                      href={`/url/${item.id}`}
                                      rel="noopener noreferrer"
                                      className="w-full"
                                  >
                                      <Card className="hover:border hover:border-primary">
                                          <CardContent className="h-full py-3 flex flex-row justify-between items-center">
                                              <div className="flex">
                                                  <CardStatus
                                                      statusCode={
                                                          item.histories[0]
                                                              ? item
                                                                    .histories[0]
                                                                    .status_code
                                                              : null
                                                      }
                                                  />
                                                  <p>{item.name}</p>
                                              </div>
                                              <p className="font-extralight text-sm">
                                                  Url : {item.path}
                                              </p>
                                              <p>
                                                  Créé le :{" "}
                                                  {new Date(
                                                      item.createdAt,
                                                  ).toLocaleDateString()}
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

export default URLList;
