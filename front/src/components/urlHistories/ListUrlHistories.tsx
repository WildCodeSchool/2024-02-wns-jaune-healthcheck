import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUrlQuery } from "@/generated/graphql-types";
import { Check } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    List,
    ListItem,
    CardStatus,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useSocketStore from "@/stores/webSocketStore";
import {
    usePaginatesHistoriesQuery,
    useCheckUrlMutation,
    useHistoryWithResponseQuery } from "@/generated/graphql-types";
import FilterBar from "../custom/FilterBar";
import { PaginatesHistories } from "@/generated/graphql-types";
import CustomPagination from "../custom/CustomPagination";
import HistoryResponseModal from "./HistoryResponseModal";
import ButtonLoader from "../custom/ButtonLoader";

type ListUrlHistoriesProps = {
    urlId: string;
};


const ListUrlHistories: React.FC<ListUrlHistoriesProps> = ({
  urlId
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { error, data, refetch } = usePaginatesHistoriesQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
            currentPage: Number(searchParams?.get("currentPage")) || 1,
            privateHistories: true,
            urlId: urlId,
        },
        fetchPolicy: "cache-and-network",
    });

    const { 
        data: historyData, 
        refetch: refectchHistoryResponse 
    } = useHistoryWithResponseQuery({
        variables: {
            historyWithResponseUrlId: urlId!,
        }
    });

    const [PaginateHistories, setPaginateHistories] =
        useState<PaginatesHistories>({
            histories: [],
            totalPages: 1,
            currentPage: 1,
            previousPage: 1,
            nextPage: 2,
        });

    const { 
        totalPages, 
        currentPage, 
        previousPage, 
        nextPage } = PaginateHistories;
        

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

    const { 
        data: urlData, 
        loading, 
        error: urlError } = useUrlQuery({
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

    if (loading) return <div>En attente...</div>;
    if (error || urlError) return <div>Erreur : {error?.message || urlError?.message}</div>;

    return (
        <>
            <div className="flex-grow">
                <div className="flex items-start justify-between mb-6">
                    <div
                      className="me-4"
                    >
                      <h1 
                        className="text-lg font-semibold leading-[15px]"
                      >{urlData?.url.name}
                          
                      </h1>
                      <h4
                        className="leading-[20px]"
                      >
                        {urlData?.url.path}
                      </h4>
                    </div>
                    <div className="flex space-x-2">
                        <HistoryResponseModal
                            statusCode={String(historyData?.historyWithResponse.status_code) || ""}
                            path={urlData?.url.path || ""}
                            response={historyData?.historyWithResponse.response || ""}
                        />
                        {
                            !checkUrlLoading ?
                            <Button 
                                variant="ghost"
                                onClick={handleCheckUrl} 
                            >
                            <Check size={20} className="me-2"/>
                                Lancer une analyse
                            </Button> :
                            <ButtonLoader 
                                variant="ghost"
                            />
                        }
                    </div>
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
                    {PaginateHistories && PaginateHistories.histories.map((history) => (
                        <ListItem key={history.id}>
                            <Card>
                                <CardHeader className="p-4">
                                    <CardTitle 
                                      className="flex text-md"
                                      title={history.id}
                                    >
                                        <CardStatus
                                            statusCode={history.status_code}
                                        />
                                        <span className="ml-2">
                                            {history.url.name}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <div>{history.response}</div>
                                <CardContent className="flex justify-end p-4 pt-0">
                                    <div className="flex flex-col items-end">
                                        <p className="text-sm">
                                            Statut {history.status_code}
                                        </p>
                                        <span className="text-sm">
                                            {new Date(
                                                history.created_at,
                                            ).toLocaleDateString()}{" "}
                                            à{" "}
                                            {new Date(
                                                history.created_at,
                                            ).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
                <div className="mt-8">
                    <CustomPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default ListUrlHistories;
