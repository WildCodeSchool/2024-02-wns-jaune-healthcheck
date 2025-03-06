import {
    useDeleteNotificationMutation,
    useReadNotificationMutation,
} from "@/generated/graphql-types";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";
import ReactTimeAgo from "react-time-ago";
import { X } from "lucide-react";
import { GET_NOTIFICATIONS } from "@/graphql/queries";
import { NotificationProps } from "@/types/notification";

export default function Notification({ data }: NotificationProps) {
    TimeAgo.addLocale(fr);

    const [readNotification] = useReadNotificationMutation();
    const [deleteNotification] = useDeleteNotificationMutation();

    const hRead = () => {
        if (data.is_read === false) {
            readNotification({
                variables: {
                    notificationId: data.id,
                },
                refetchQueries: [
                    {
                        query: GET_NOTIFICATIONS,
                    },
                ],
            });
        }
    };

    const hDelete = () => {
        deleteNotification({
            variables: {
                notificationId: data.id,
            },
            refetchQueries: [
                {
                    query: GET_NOTIFICATIONS,
                },
            ],
        });
    };

    return (
        <li
            className={`relative flex flex-row justify-between items-center w-full gap-4 p-2 rounded-sm transition-colors ${
                data.is_read === false ? "bg-secondary" : "bg-transparent"
            }`}
            onMouseOver={hRead}
        >
            <div className="flex flex-col gap-1">
                <p className="font-medium">{data.content}</p>
                <ReactTimeAgo
                    date={new Date(data.created_at)}
                    locale="fr"
                    className="text-muted-foreground italic first-letter:uppercase"
                />
            </div>
            <button type="button" onClick={hDelete}>
                <X className="text-muted-foreground hover:text-destructive transition-colors" />
            </button>
        </li>
    );
}
