import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlQuery } from "@/generated/graphql-types";
import { useMutation } from "@apollo/client";
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
import { toast } from "@/components/ui/use-toast";
import { CHECK_URL } from "@/graphql/mutation";
import useSocketStore from "@/stores/webSocketStore";

type ListUrlHistoriesProps = {
    urlId: string;
};

const ListUrlHistories: React.FC<ListUrlHistoriesProps> = ({ urlId }) => {
    const navigate = useNavigate();
    const { data, loading, error, refetch } = useUrlQuery({
        variables: {
            urlId: urlId!,
        },
    });

    const [checkUrl, { loading: checkUrlLoading }] = useMutation(CHECK_URL);
    const messages = useSocketStore((state) => state.messages);

    // Refetch after socket message (cron job)
    useEffect(() => {
        refetch();
    }, [messages, refetch]);

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
    if (error) return <div>Erreur : {error.message}</div>;

    return (
        <>
            <div className="flex-grow">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="flex items-center text-4xl font-bold">
                        <Button
                            className="w-8 h-8 center text-xl pb-2.5 mt-0.5 mr-4"
                            onClick={() => navigate(-1)}
                        >{`<`}</Button>
                        <span className="text-primary">{data?.url.name} </span>{" "}
                        - {data?.url.path}
                    </h1>
                    <Button onClick={handleCheckUrl} disabled={checkUrlLoading}>
                        {checkUrlLoading ? "Analyse..." : "Lancer une analyse"}
                    </Button>
                </div>
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
};

export default ListUrlHistories;
