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
                            <p className="text-muted-foreground">{url.path}</p>
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
            {!data.recentPrivateUrls.length && (
                <li className="flex items-center text-sm">
                    <div className="ml-4 space-y-1">
                        <p className="font-medium leading-none">Aucune URL</p>
                    </div>
                </li>
            )}
        </ul>
    );
}
