import { useParams } from "react-router-dom";
import ListUrlHistories from "@/components/ListUrlHistories";

export default function UrlHistory() {
    const { id } = useParams();
    return <ListUrlHistories urlId={id!} />;
}
