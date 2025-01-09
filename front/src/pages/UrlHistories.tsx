import { useParams } from "react-router-dom";
import ListUrlHistories from "@/components/url-histories/ListUrlHistories";

export default function UrlHistories() {
    const { id } = useParams();
    return <ListUrlHistories urlId={id!} />;
}
