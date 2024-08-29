import { useEffect } from "react";
import { formatLocalDate } from "@/constants/globalFunction";
import { useRecentPrivateHistoriesQuery } from "@/generated/graphql-types";
import useSocketStore from "@/stores/webSocketStore";
import { CardStatus } from "../ui/card";

export default function RecentHistories() {
    const { loading, error, data, refetch } = useRecentPrivateHistoriesQuery();
    const messages = useSocketStore((state) => state.messages);

    useEffect(() => {
        console.log("messages", messages);
        refetch();
    }, [messages]);

    if (error || !data) return "Erreur";
    return (
        <ul className="space-y-8">
            {loading ? (
                <p>Loading</p>
            ) : (
                data.recentPrivateHistories.map((history) => (
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
                            <p className="text-muted-foreground">
                                {history.url.path}
                            </p>
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
        </ul>
    );
}
