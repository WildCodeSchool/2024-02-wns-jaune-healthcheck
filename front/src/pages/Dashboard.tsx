import RecentHistories from "@/components/dashboard/RecentHistories";
import RecentUrls from "@/components/dashboard/RecentUrls";
import HistoriesByStatusChart from "@/components/dashboard/charts/HistoriesByStatutChart";
import UrlsByStatusChart from "@/components/dashboard/charts/UrlsByStatusChart";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="col-span-1 flex flex-col gap-4">
                <UrlsByStatusChart />
                <HistoriesByStatusChart />
            </div>

            <div className="col-span-1 flex flex-col gap-4">
                <RecentUrls />
                <RecentHistories />
            </div>
        </div>
    );
}
