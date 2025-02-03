import { useState, useEffect } from "react";
import { CardStatus } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "@/components/custom/FilterBarPrivate";
import {
    PaginatesHistories,
    usePaginatesHistoriesQuery,
} from "@/generated/graphql-types";
import { Skeleton } from "@/components/ui/skeleton";
import CustomPagination from "@/components/custom/CustomPagination";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr";

const ListUserHistories: React.FC = () => {
    TimeAgo.addLocale(fr);

    const [searchParams, setSearchParams] = useSearchParams();
    const [visibility, setVisibility] = useState<"private" | "public" | "all">(
        "all",
    );
    const navigate = useNavigate();

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
                <h2 className="mb-4 text-sm text-gray-500 dark:text-gray-400">
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Privée</TableHead>
                            <TableHead className="text-right">
                                Vérifié
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {PaginateHistories.histories && (
                        <TableBody>
                            {PaginateHistories.histories.map((item) => (
                                <TableRow
                                    key={item.id}
                                    onClick={() =>
                                        navigate(`/history-url/${item.url.id}`)
                                    }
                                    className="hover:cursor-pointer"
                                >
                                    <TableCell>
                                        <CardStatus
                                            statusCode={item.status_code}
                                        />
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        {item.url.name}
                                    </TableCell>
                                    <TableCell>{item.url.path}</TableCell>
                                    <TableCell>
                                        {item.url.private ? "Oui" : "Non"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ReactTimeAgo
                                            date={new Date(item.created_at)}
                                            locale="fr"
                                            className="text-muted-foreground italic first-letter:uppercase"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                    {!loading && !PaginateHistories.histories.length && (
                        <TableFooter className="bg-transparent">
                            <TableCell
                                className="text-center text-sm font-normal text-muted-foreground italic"
                                colSpan={5}
                            >
                                Aucun historique disponible.
                            </TableCell>
                        </TableFooter>
                    )}
                </Table>
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
