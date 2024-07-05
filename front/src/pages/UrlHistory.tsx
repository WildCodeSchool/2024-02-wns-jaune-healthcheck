import { useParams } from "react-router-dom";
import { useUrlQuery } from "@/generated/graphql-types";

export default function UrlHistory() {
    const { id } = useParams();
    const { data, loading } = useUrlQuery({
        variables: {
            urlId: id!,
        },
    });

    if (loading) return <div>En attente...</div>;
    return (
        <div className="h-screen flex flex-col gap-y-4 justify-center place-items-center overflow-hidden">
            <span className="text-2xl font-semibold">
                {data?.url.name} - {data?.url.path} :
            </span>
            <div className="bg-neutral-300 w-10/12 h-5/6 flex flex-row flex-wrap gap-2 content-start px-6 py-4 rounded-lg overflow-y-auto">
                {data?.url.histories.map((history, index) => (
                    <div
                        key={index}
                        className="bg-neutral-200 h-min flex flex-col px-6 py-4 rounded-lg"
                    >
                        <span>ID de l'historique : {history.id}</span>
                        <span>Date de création : {history.created_at}</span>
                        <span>
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
                        </span>
                        <span>Réponse : {history.response}</span>{" "}
                    </div>
                ))}
            </div>
        </div>
    );
}
