import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { formatLocalDate } from "@/constants/globalFunction";
import { useRecentPrivateUrlsQuery } from "@/generated/graphql-types";
import { CardStatus } from "../ui/card";

export default function RecentUrls() {
    const { loading, error, data } = useRecentPrivateUrlsQuery();

    if (error || !data) return "Erreur";
    return (
        <ul className="space-y-8">
            {loading ? (
                <p>Loading</p>
            ) : (
                data.recentPrivateUrls.map((url) => (
                    <li key={url.id} className="flex items-center text-sm">
                        <CardStatus
                            statusCode={
                                url.histories[0]
                                    ? url.histories[0].status_code
                                    : null
                            }
                        />
                        <div className="ml-4 space-y-1">
                            <p className="font-medium leading-none">
                                {url.name}
                            </p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger
                                        className="text-muted-foreground max-w-72 truncate"
                                    >
                                        {url.path}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{url.path}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="ml-auto">
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
        </ul>
    );
}
