import { useParams } from "react-router-dom";
import ListUrl from "@/components/dashboard/ListUrl";
import ListHistories from "@/components/dashboard/ListHistories";
import Overview from "@/components/dashboard/Overview";
import ListUrlHistories from "@/components/ListUrlHistories";

export default function Dashboard({ element }: { element: string }) {

    const { id } = useParams();

    return (
        <div className="pt-24">
            <div className="">
                {element === "overview" && <Overview />}
                {element === "urls" && <ListUrl />}
                {element === "histories" && <ListHistories />}
                {(element === "urlHistories" && id) && 
                    <ListUrlHistories urlId={id}/>
                }
            </div>
        </div>
    );
}
