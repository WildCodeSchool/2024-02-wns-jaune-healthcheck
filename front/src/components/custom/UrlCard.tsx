import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardStatus,
    CardTitle,
    ListItem,
} from "@/components/ui/card.tsx";

type Url = {
    id: string;
    name: string;
    path: string;
    histories: Array<{ status_code: number | null }>;
};

interface UrlCardProps {
    item: Url;
}

export default function UrlCard({ item }: UrlCardProps) {
    return (
        <ListItem
            key={item.id}
            className="flex justify-center items-start w-full"
        >
            <a
                href={`/url/${item.id}`}
                rel="noopener noreferrer"
                className="w-full max-w-lg"
            >
                <Card className="w-full hover:border hover:border-primary">
                    <CardHeader>
                        <CardTitle className="truncate" title={item.name}>
                            {item.name}
                        </CardTitle>
                        <CardDescription className="truncate" title={item.path}>
                            {item.path}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex">
                        <CardStatus
                            statusCode={
                                item.histories[0]
                                    ? item.histories[0].status_code
                                    : null
                            }
                        />
                        <p className="text-sm font-medium">
                            {item.histories[0]
                                ? `Statut ${item.histories[0].status_code}`
                                : ""}
                        </p>
                    </CardContent>
                </Card>
            </a>
        </ListItem>
    );
}
