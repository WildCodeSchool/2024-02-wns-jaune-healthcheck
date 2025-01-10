import { useState, useEffect } from "react";
import { CardStatus } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilterBar from "@/components/custom/FilterBarPrivate";
import { useGetAllURlsQuery } from "@/generated/graphql-types";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginateUrls } from "@/generated/graphql-types";
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
import { EllipsisVertical } from "lucide-react";

const ListUserUrls: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState<"private" | "public" | "all">(
        "all",
    );
    const getPrivateUrlsValue = (visibility: string): boolean | undefined => {
        if (visibility === "all") {
            return undefined;
        }
        return visibility === "private";
    };

    const { loading, error, data } = useGetAllURlsQuery({
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

    if (loading && !PaginateUrls.urls.length) {
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
                    Liste des URLs
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Privée</TableHead>
                            <TableHead>Date d'ajout</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {PaginateUrls.urls && (
                        <TableBody>
                            {PaginateUrls.urls.map((item) => (
                                <TableRow
                                    key={item.id}
                                    onClick={() =>
                                        navigate(`/user-url/${item.id}`)
                                    }
                                    className="hover:cursor-pointer"
                                >
                                    <TableCell>
                                        <CardStatus
                                            statusCode={
                                                item.histories[0].status_code
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>{item.path}</TableCell>
                                    <TableCell>
                                        {item.private ? "Oui" : "Non"}
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-muted-foreground italic first-letter:uppercase">
                                            {new Date(
                                                item.createdAt,
                                            ).toLocaleDateString()}{" "}
                                            {new Date(
                                                item.createdAt,
                                            ).toLocaleTimeString()}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EllipsisVertical
                                            size={16}
                                            className="ml-auto"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                    {!loading && !PaginateUrls.urls.length && (
                        <TableFooter className="bg-transparent">
                            <TableCell
                                className="text-center text-sm font-normal text-muted-foreground italic"
                                colSpan={6}
                            >
                                Aucune URL disponible.
                            </TableCell>
                        </TableFooter>
                    )}
                </Table>
                {PaginateUrls.urls.length &&
                PaginateUrls.totalPages > 1 &&
                PaginateUrls.totalPages !== 0 ? (
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

export default ListUserUrls;
