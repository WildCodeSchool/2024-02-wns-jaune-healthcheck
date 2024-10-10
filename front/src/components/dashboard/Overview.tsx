import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import RecentHistories from "./RecentHistories";
import RecentUrls from "./RecentUrls";

const Overview = () => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="col-span-1 flex flex-col gap-4">
                {/* Contenu du Dashboard : Charts */}
                <Card className="w-full h-[400px] p-5">
                    <CardTitle className="text-lg mr-auto">
                        Chart
                    </CardTitle>
                </Card>
                <Card className="w-full h-[400px] p-5">
                    <CardTitle className="text-lg mr-auto">
                        Chart
                    </CardTitle>
                </Card>
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
};

export default Overview;
