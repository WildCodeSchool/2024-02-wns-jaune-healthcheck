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
        if (visibility === "all") {
            return undefined;
        }
        return visibility === "private";
    };

    const { loading, error, data } = usePaginatesHistoriesQuery({
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
        if (!data) {
            return;
        }
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

    if (loading && !PaginateHistories.histories.length) {
        return Array.from({ length: 10 }, (_, index) => {
            return (
                <div className="w-full mt-24" key={index}>
                    <Skeleton className="h-[40px] rounded-lg" />
                </div>
            );
        });
    }

    if (error) {
        return "Error";
    }

    return (
        <div className="w-full h-fit m-auto">
            <section className="pb-4">
                <h1 className="font-semibold text-2xl mb-[1px]">
                    Historique de vos URLs
                </h1>
                <h2 className="mb-4 text-sm text-gray-500">
                    Filtrez les comme bon vous semble.
                </h2>
            </section>
            <section className="flex flex-col gap-4">
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
                        {PaginateHistories.histories.map((item) => (
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
                                            <div className="flex w-40">
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
                                                Ajoutée le :{" "}
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
                        ))}
                        {!loading &&
                            !data?.paginatesHistories.histories.length && (
                                <p className="text-center text-muted-foreground">
                                    Aucun historique
                                </p>
                            )}
                    </List>
                </div>
                {PaginateHistories.histories.length &&
                PaginateHistories.totalPages > 1 &&
                PaginateHistories.totalPages !== 0 ? (
                    <CustomPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        onPageChange={handlePageChange}
                    />
                ) : null}
            </section>
        </div>
    );
};

export default ListUserHistories;
