import ListUrl from "@/components/dashboard/ListUrl";
import ListHistories from "@/components/dashboard/ListHistories";
import Overview from "@/components/dashboard/Overview";

export default function Dashboard({ element }: { element: string }) {

    return (
        <div className="pt-24">
            <div className="">
                {element === "overview" && <Overview />}
                {element === "urls" && <ListUrl />}
                {element === "histories" && <ListHistories />}
            </div>
        </div>
    );
}
