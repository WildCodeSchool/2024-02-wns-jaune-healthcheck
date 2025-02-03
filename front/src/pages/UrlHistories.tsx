import { useParams } from "react-router-dom";
import ListUrlHistories from "@/components/url-histories/ListUrlHistories";
import useAuthStore from "@/stores/authStore.tsx";

export default function UrlHistories() {
    const { id } = useParams();
    const isLogged = useAuthStore((state) => state.isLogged);

    return (
        <div className={!isLogged ? "w-full max-w-6xl m-auto" : ""}>
            <ListUrlHistories urlId={id!} />
        </div>
    );
}
