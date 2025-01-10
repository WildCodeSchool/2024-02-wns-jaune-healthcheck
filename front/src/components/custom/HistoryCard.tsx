import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardStatus,
    CardTitle,
    ListItem,
} from "@/components/ui/card.tsx";

type History = {
    id: string;
    status_code: number;
    url: {
        name: string;
        path: string;
    };
    response: string | null;
    created_at: string;
};

interface HistoryCardProps {
    item: History;
}

export default function HistoryCard({ item }: HistoryCardProps) {
    return (
        <ListItem
            key={item.id}
            className="flex justify-center items-start w-full"
        >
            <Card className="w-full hover:border hover:border-primary">
                <CardHeader>
                    <CardTitle className="truncate" title={item.url.name}>
                        {item.url.name}
                    </CardTitle>
                    <CardDescription className="truncate" title={item.url.path}>
                        {item.url.path}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                    <section className="flex">
                        <CardStatus statusCode={item.status_code} />
                        <p className="text-sm">Status {item.status_code}</p>
                    </section>
                    <section className="flex">
                        <p className="text-sm">Testée le{" "}
                            <span className="font-semibold">{new Date(item.created_at).toLocaleDateString()}</span> à{" "}
                            <span className="font-semibold">{new Date(item.created_at).toLocaleTimeString()}</span>
                        </p>
                    </section>
                </CardContent>
            </Card>
        </ListItem>
    );
}
