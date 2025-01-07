import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import RecentHistories from "@/components/dashboard/RecentHistories";
import RecentUrls from "@/components/dashboard/RecentUrls";
import HistoriesByStatusChart from "@/components/charts/HistoriesByStatutChart";
import UrlsByStatusChart from "@/components/charts/UrlsByStatusChart";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="col-span-1 flex flex-col gap-4">
                <UrlsByStatusChart />
                <HistoriesByStatusChart />
            </div>

            <div className="col-span-1 flex flex-col gap-4">
                <Card className="shadow-md shadow-muted">
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
                <Card className="shadow-md shadow-muted">
                    <CardHeader className="w-full">
                        <CardTitle className="text-lg mr-auto">
                            Historiques privés récents
                        </CardTitle>
                        <CardDescription className="mr-auto">
                            Voici les 5 derniers historiques privés lancé.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentHistories />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
