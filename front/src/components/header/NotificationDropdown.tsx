import { useDeleteAllNotificationsMutation } from "@/generated/graphql-types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, Circle, Moon, Sun, Trash } from 'lucide-react';
import Notification from "../custom/Notification";
import { useNotificationsQuery } from "@/generated/graphql-types";
import useSocketStore from "@/stores/webSocketStore";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { GET_NOTIFICATIONS } from "@/graphql/queries";
import { Button } from '@/components/ui/button.tsx';

export default function NotificationDropdown() {
    const {
        loading: loadingNotification,
        data,
        refetch,
    } = useNotificationsQuery();
    const messages = useSocketStore((state) => state.messages);

    useEffect(() => {
        refetch();
    }, [messages, refetch]);

    const [deleteNotification] = useDeleteAllNotificationsMutation();

    const hDeleteAll = () => {
        deleteNotification({
            refetchQueries: [
                {
                    query: GET_NOTIFICATIONS,
                },
            ],
        });
    };

    // TODO: Verifier taille Circle notif non lue
    // TODO: les text-red plus clair en dark

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <div className="cursor-pointer relative">
                        <Bell className="h-[1.4rem] w-[1.4rem]" />
                        {data && (
                            <Circle
                                fill="rgb(239 68 68)"
                                className={`absolute -top-1 right-0 h-3 w-3 text-red-500 ${
                                    data!.notifications.some(
                                        (notification) =>
                                            notification.is_read === false,
                                    )
                                        ? "block"
                                        : "hidden"
                                }`}
                            />
                        )}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 lg:w-fit" align="end">
                <DropdownMenuLabel className="flex justify-between items-center">
                    <p>Notifications</p>
                    <button type="button" onClick={hDeleteAll}>
                        <Trash className="h-[1.2rem] w-[1.2rem]" />
                    </button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent">
                    {loadingNotification ? (
                        <Skeleton />
                    ) : data && data.notifications.length > 0 ? (
                        <ul className="flex flex-col">
                            {data.notifications.map((notification) => (
                                <Notification
                                    key={notification.id}
                                    data={notification}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="w-56">Aucune notification</p>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
