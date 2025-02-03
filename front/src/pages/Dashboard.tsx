import RecentHistories from "@/components/dashboard/RecentHistories";
import RecentUrls from "@/components/dashboard/RecentUrls";
import CountPrivatesUrlsCard from "@/components/dashboard/charts/CountPrivatesUrlsCard";
import HistoriesByStatusChart from "@/components/dashboard/charts/HistoriesByStatutChart";
import UrlsByStatusChart from "@/components/dashboard/charts/UrlsByStatusChart";

export default function Dashboard() {
    return (
        <div className="w-full h-fit m-auto">
            <section className="pb-4">
                <h1 className="font-semibold text-2xl mb-[1px]">Dashboard</h1>
                <h2 className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Visualisez vos données privées et suivi des statistiques.
                </h2>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 h-full">
                    <div className="h-full">
                        <UrlsByStatusChart />
                    </div>
                </div>
                <div className="lg:col-span-4 h-full">
                    <div className="h-full">
                        <HistoriesByStatusChart />
                    </div>
                </div>
                <div className="lg:col-span-4 h-full">
                    <div className="h-full">
                        <CountPrivatesUrlsCard />
                    </div>
                </div>
                <div className="lg:col-span-8 h-full">
                    <div className="grid grid-cols-1 gap-4 h-full">
                        <RecentUrls />
                        <RecentHistories />
                    </div>
                </div>
            </section>
        </div>
    );
}
