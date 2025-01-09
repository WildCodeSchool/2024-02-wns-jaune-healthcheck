import { useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { formatLocalDate } from "@/constants/globalFunction";
import { useRecentPrivateHistoriesQuery } from "@/generated/graphql-types";
import useSocketStore from "@/stores/webSocketStore";
import { CardStatus } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function RecentHistories() {
    const { loading, error, data, refetch } = useRecentPrivateHistoriesQuery();
    const messages = useSocketStore((state) => state.messages);

    // Refetch after socket message (cron job)
    useEffect(() => {
        refetch();
    }, [messages, refetch]);

    if (loading && !data) {
        return (
            <Skeleton className="w-full h-[400px] p-5" />
        );
    } 
  
    if (error) return <div>Erreur</div>;
    
    return (
        <Card className="shadow-md shadow-muted">
        <CardHeader className="w-full">
            <CardTitle className="text-lg mr-auto">
                Historiques privés récents
            </CardTitle>
            <CardDescription className="mr-auto">
                Voici les 5 derniers historiques privés lancé.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-6">
                {loading ? (
                    <p>Loading</p>
                ) : (
                    data?.recentPrivateHistories.map((history) => (
                        <li key={history.id} className="flex items-center text-sm">
                            <CardStatus
                                statusCode={
                                    history.status_code ? history.status_code : null
                                }
                            />
                            <div className="ml-4 space-y-1">
                                <p className="font-medium leading-none">
                                    {history.url.name}
                                </p>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger
                                            className="text-muted-foreground max-w-72 truncate"
                                        >
                                            {history.url.path}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{history.url.path}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="ml-auto">
                                <p className="font-light italic text-muted-foreground">
                                    Ajoutée le
                                </p>
                                <p className="font-medium">
                                    {formatLocalDate(history.created_at)}
                                </p>
                            </div>
                        </li>
                    ))
                )}
                {!data?.recentPrivateHistories.length && (
                  <li className="flex items-center text-sm">
                      <div className="ml-4 space-y-1">
                          <p className="font-medium leading-none">
                              Aucun historique
                          </p>
                      </div>
                  </li>
              )}
            </ul>
        </CardContent>
        </Card>
    );
}
