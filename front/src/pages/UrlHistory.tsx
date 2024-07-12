import { useParams } from "react-router-dom";
import { useUrlQuery } from "@/generated/graphql-types";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    List,
    ListItem,
    CardStatus,
    CardContent,
} from "@/components/ui/card";

export default function UrlHistory() {
    const { id } = useParams();
    const { data, loading, error } = useUrlQuery({
        variables: {
            urlId: id!,
        },
    });

    if (loading) return <div>En attente...</div>;
    if (error) return <div>Erreur : {error.message}</div>;
    return (
        <>
            <div className="flex-grow">
                <h1 className="text-4xl font-bold mb-10">
                    <span className="text-primary">{data?.url.name} </span> -{" "}
                    {data?.url.path}
                </h1>
                <List
                    data-testid="histories-container"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-0"
                >
                    {data?.url.histories.map((history) => (
                        <ListItem key={history.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle title={history.id}>
                                        Date :{" "}
                                        {new Date(
                                            history.created_at,
                                        ).toLocaleDateString()}{" "}
                                        à{" "}
                                        {new Date(
                                            history.created_at,
                                        ).toLocaleTimeString()}
                                    </CardTitle>
                                    <CardDescription
                                        title={history.response}
                                        className="max-h-20 overflow-scroll bg-accent"
                                    >
                                        {history.response}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-row">
                                    <CardStatus
                                        statusCode={history.status_code}
                                    />
                                    <p className="text-sm">
                                        Code de réponse :{" "}
                                        <span
                                            className={`${
                                                history.status_code >= 400
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            {history.status_code}
                                        </span>
                                    </p>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </div>
        </>
    );
}
