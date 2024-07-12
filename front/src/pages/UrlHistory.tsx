import { useNavigate, useParams } from "react-router-dom";
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
import { Button } from "@/components/ui/button";

export default function UrlHistory() {
    const { id } = useParams();
    const { data, loading, error } = useUrlQuery({
        variables: {
            urlId: id!,
        },
    });
    const navigate = useNavigate();

    if (loading) return <div>En attente...</div>;
    if (error) return <div>Erreur : {error.message}</div>;
    return (
        <>
            <div className="flex-grow">
                <h1 className="flex items-center text-4xl font-bold mb-10">
                    <Button
                        className="w-8 h-8 center text-xl pb-2.5 mt-0.5 mr-4"
                        onClick={() => navigate(-1)}
                    >{`<`}</Button>
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
