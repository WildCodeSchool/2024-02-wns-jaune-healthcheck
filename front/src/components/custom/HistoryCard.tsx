import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardStatus,
    CardTitle,
    ListItem, CardFooter
} from '@/components/ui/card.tsx';

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
                        <p className="text-sm font-medium">Status {item.status_code}</p>
                    </section>
                </CardContent>
                <CardFooter>
                    <section className="flex flex-col">
                        <p className="font-light italic text-muted-foreground text-sm">Testée le{" "}
                        </p>
                        <p className="font-medium">{new Date(item.created_at).toLocaleDateString()} à{" "}
                            {new Date(item.created_at).toLocaleTimeString()}
                        </p>
                    </section>
                </CardFooter>
            </Card>
        </ListItem>
    );
}
