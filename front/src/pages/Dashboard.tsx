import RecentHistories from "@/components/dashboard/RecentHistories";
import RecentUrls from "@/components/dashboard/RecentUrls";
import HistoriesByStatusChart from "@/components/charts/HistoriesByStatutChart";
import UrlsByStatusChart from "@/components/charts/UrlsByStatusChart";
import CountPrivatesUrlsCard from "@/components/custom/countPrivatesUrlsCard";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="col-span-1 flex flex-col gap-4">
                <div
                    className="grid grid-cols-1 gap-4 xl:grid-cols-12"
                >
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
    );
}
