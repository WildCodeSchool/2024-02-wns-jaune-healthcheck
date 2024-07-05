import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Url = {
    id: UUID;
    name: string;
    path: string;
    created_at: string;
    history: {
        id: UUID;
        created_at: string;
        status_code: number;
        response: string;
    }[];
};

const data: Url = {
    id: "e1755ee2-901e-4a7d-a813-946f1d561428",
    name: "Facebook",
    path: "https://facebook.com/",
    created_at: "2024-07-04T12:50:22Z",
    history: [
        {
            id: "f17fe86d-e8fc-4e44-8140-38da4cd0df63",
            created_at: "2024-07-04T12:50:22Z",
            status_code: 200,
            response: "Hello World !",
        },
        {
            id: "f17fe86d-e8fc-4e44-8140-38da4cd0df64",
            created_at: "2024-07-04T11:50:22Z",
            status_code: 200,
            response: "Hello World !",
        },
        {
            id: "f17fe86d-e8fc-4e44-8140-38da4cd0df65",
            created_at: "2024-07-04T10:50:22Z",
            status_code: 401,
            response: "Error !",
        },
        {
            id: "f17fe86d-e8fc-4e44-8140-38da4cd0df66",
            created_at: "2024-07-04T09:50:22Z",
            status_code: 401,
            response: "Error !",
        },
        {
            id: "f17fe86d-e8fc-4e44-8140-38da4cd0df67",
            created_at: "2024-07-04T05:50:22Z",
            status_code: 401,
            response: "Error !",
        },
    ],
};

export default function UrlHistory() {
    const [url, setUrl] = useState<Url>();
    const { id } = useParams();

    useEffect(() => {
        setUrl(data);
    }, []);

    if (!url) return <div>En attente...</div>;
    return (
        <div className="h-screen flex flex-col gap-y-4 justify-center place-items-center overflow-hidden">
            <span className="text-2xl font-semibold">URL {id} :</span>
            <div className="bg-neutral-300 w-10/12 h-5/6 flex flex-row flex-wrap gap-2 content-start px-6 py-4 rounded-lg overflow-y-auto">
                {url.history.map((history, index) => (
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
