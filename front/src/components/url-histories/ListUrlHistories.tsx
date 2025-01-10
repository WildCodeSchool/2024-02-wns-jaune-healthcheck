import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUrlQuery } from "@/generated/graphql-types";
import { Check } from "lucide-react";
import { List } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useSocketStore from "@/stores/webSocketStore";
import {
    usePaginatesHistoriesQuery,
    useCheckUrlMutation,
    useHistoryWithResponseQuery,
} from "@/generated/graphql-types";
import FilterBar from "../custom/FilterBar";
import { PaginatesHistories } from "@/generated/graphql-types";
import CustomPagination from "../custom/CustomPagination";
import HistoryResponseModal from "./HistoryResponseModal";
import ButtonLoader from "../custom/ButtonLoader";
import useAuthStore from "@/stores/authStore.tsx";
import { Roles } from "@/constants/role.ts";
import HistoryCard from "@/components/custom/HistoryCard.tsx";

type ListUrlHistoriesProps = {
    urlId: string;
};

const ListUrlHistories: React.FC<ListUrlHistoriesProps> = ({ urlId }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { error, refetch } = usePaginatesHistoriesQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
            currentPage: Number(searchParams?.get("currentPage")) || 1,
            urlId: urlId,
        },
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => {
            setPaginateHistories(data.paginatesHistories as PaginatesHistories);
        },
    });

    const { data: historyData, refetch: refectchHistoryResponse } =
        useHistoryWithResponseQuery({
            variables: {
                historyWithResponseUrlId: urlId!,
            },
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

    const {
        data: urlData,
        loading,
        error: urlError,
    } = useUrlQuery({
        variables: {
            urlId: urlId!,
        },
    });

    const [checkUrl, { loading: checkUrlLoading }] = useCheckUrlMutation();
    const messages = useSocketStore((state) => state.messages);

    // Refetch after socket message (cron job)
    useEffect(() => {
        refetch();
        refectchHistoryResponse();
    }, [messages, refetch, refectchHistoryResponse]);

    const handleCheckUrl = async () => {
        try {
            await checkUrl({
                variables: { id: urlId! },
            });
            await refetch();
            toast({
                title: "L'URL a été vérifiée avec succès",
            });
        } catch (error) {
            toast({
                title: "Error checking URL",
                description: "An error occurred while checking the URL.",
                variant: "destructive",
            });
        }
    };

    const user = useAuthStore((state) => state.user);
    const isPremium = user.role === Roles.PREMIUM;

    if (loading) {
        return <div>En attente...</div>;
    }
    if (error || urlError) {
        return <div>Erreur : {error?.message || urlError?.message}</div>;
    }

    return (
        <div className="w-full h-fit m-auto">
            <div className="pb-4 mb-4 flex justify-between">
                <section>
                    <h1 className="font-semibold text-2xl mb-[1px]">
                        {urlData?.url.name}
                    </h1>
                    <h2 className="text-sm text-gray-500">
                        {urlData?.url.path}
                    </h2>
                </section>
                <section className="flex space-x-2">
                    <HistoryResponseModal
                        statusCode={
                            String(
                                historyData?.historyWithResponse.status_code,
                            ) || ""
                        }
                        path={urlData?.url.path || ""}
                        response={
                            historyData?.historyWithResponse.response || ""
                        }
                        contentType={
                            historyData?.historyWithResponse.content_type || ""
                        }
                    />
                    {isPremium &&
                        (!checkUrlLoading ? (
                            <Button variant="ghost" onClick={handleCheckUrl}>
                                <Check size={20} className="me-2" />
                                Lancer une analyse
                            </Button>
                        ) : (
                            <ButtonLoader variant="ghost" />
                        ))}
                </section>
            </div>
            <FilterBar
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                searchQuery={searchParams?.get("searchUrl") || ""}
                sortKey={searchParams?.get("sortField") || ""}
            />
            <List
                data-testid="histories-container"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-0"
            >
                {PaginateHistories &&
                    PaginateHistories.histories.map((history) => (
                        <HistoryCard item={history} />
                    ))}
                {!PaginateHistories.histories.length && (
                    <p className="text-muted-foreground">Aucun historique</p>
                )}
            </List>
            {PaginateHistories &&
                PaginateHistories.totalPages > 1 &&
                PaginateHistories.totalPages !== 0 && (
                    <div className="mt-8">
                        <CustomPagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            previousPage={previousPage}
                            nextPage={nextPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
        </div>
    );
};

export default ListUrlHistories;
