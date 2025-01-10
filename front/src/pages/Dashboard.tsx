import RecentHistories from "@/components/dashboard/RecentHistories";
import RecentUrls from "@/components/dashboard/RecentUrls";
import CountPrivatesUrlsCard from "@/components/dashboard/charts/CountPrivatesUrlsCard";
import HistoriesByStatusChart from "@/components/dashboard/charts/HistoriesByStatutChart";
import UrlsByStatusChart from "@/components/dashboard/charts/UrlsByStatusChart";

export default function Dashboard() {
    return (
        <div className="w-full h-fit m-auto">
            <section className="pb-4">
                <h1 className="font-semibold text-2xl mb-[1px]">
                    Dashboard
                </h1>
                <h2 className="mb-4 text-sm text-gray-500">
                    Visualisez vos données et suivi des statistiques.
                </h2>
            </section>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                        <div className="col-span-12 xl:col-span-5 h-full">
                            <CountPrivatesUrlsCard />
                        </div>
                        <div className="col-span-12 xl:col-span-7">
                            <HistoriesByStatusChart />
                        </div>
                    </div>
                    <UrlsByStatusChart />
                </div>

                <div className="col-span-1 flex flex-col gap-4">
                    <RecentUrls />
                    <RecentHistories />
                </div>
            </div>
        </div>
    );
}
