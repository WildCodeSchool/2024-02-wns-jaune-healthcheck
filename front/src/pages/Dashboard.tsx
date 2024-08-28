import RecentUrls from "@/components/dashboard/RecentUrls";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
    return (
        <>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Contenu du Dashboard : Chart, derniers historiques */}
                <Card className="col-span-3 shadow-md shadow-muted">
                    <CardHeader className="w-full">
                        <CardTitle className="text-lg mr-auto">
                            URL privées récentes
                        </CardTitle>
                        <CardDescription className="mr-auto">
                            Voici les 5 dernières URL privées que vous avez
                            ajouté(e).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentUrls />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
