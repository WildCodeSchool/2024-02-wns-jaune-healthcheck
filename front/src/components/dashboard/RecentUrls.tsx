import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatLocalDate } from "@/constants/globalFunction";
import { useRecentPrivateUrlsQuery } from "@/generated/graphql-types";
import { CardStatus } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function RecentUrls() {
    const { loading, error, data } = useRecentPrivateUrlsQuery();

    if (loading && !data) {
        return <Skeleton className="w-full h-[400px] p-5" />;
    }

    if (error) {
        return <div>Erreur</div>;
    }

    return (
        <Card>
            <CardHeader className="w-full">
                <CardTitle className="text-lg mr-auto">
                    URL privées récentes
                </CardTitle>
                <CardDescription className="mr-auto">
                    Voici les 5 dernières URL privées que vous avez ajouté(e).
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-6">
                    {loading ? (
                        <p>Loading</p>
                    ) : (
                        data?.recentPrivateUrls.map((url) => (
                            <li
                                key={url.id}
                                className="flex items-center text-sm"
                            >
                                <CardStatus
                                    statusCode={
                                        url.histories[0]
                                            ? url.histories[0].status_code
                                            : null
                                    }
                                />
                                <div className="ml-4 min-w-0 flex-1 space-y-1">
                                    <p className="font-medium leading-none">
                                        {url.name}
                                    </p>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="text-muted-foreground block w-full truncate text-left">
                                                {url.path}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{url.path}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <p className="font-light italic text-muted-foreground">
                                        Ajoutée le
                                    </p>
                                    <p className="font-medium">
                                        {formatLocalDate(url.createdAt)}
                                    </p>
                                </div>
                            </li>
                        ))
                    )}
                    {!data?.recentPrivateUrls.length && (
                        <li className="flex justify-center items-center text-sm">
                            <p className="text-muted-foreground italic">
                                Aucune URL disponible.
                            </p>
                        </li>
                    )}
                </ul>
            </CardContent>
        </Card>
    );
}
