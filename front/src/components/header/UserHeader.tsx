import Logo from "@/assets/logo.svg";
import {
    useDeleteAllNotificationsMutation,
    useLogoutLazyQuery,
} from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import { useToast } from "../ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Crown, Bell, Circle, Trash } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import FormUserUrl from "../FormUserUrl";
import { useState } from "react";
import { Pricing } from "@/components/subscription/Pricing";
import Notification from "../custom/Notification";
import { useNotificationsQuery } from "@/generated/graphql-types";
import useSocketStore from "@/stores/webSocketStore";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { GET_NOTIFICATIONS } from "@/graphql/queries";

type NavigationList = {
    id: number;
    name: string;
    path?: string;
};

const navigationList: NavigationList[] = [
    {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        id: 2,
        name: "Ajouter une URL",
    },
    /* Ajouter la suite de la navigation ici; si dialog : pas de path */
];

export default function UserHeader() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openPricing, setOpenPricing] = useState<boolean>(false);

    // Logout
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const [logoutQuery, { loading }] = useLogoutLazyQuery();
    const logout = useAuthStore((state) => state.logout);
    const { toast } = useToast();

    const handleLogout = () => {
        logoutQuery({
            onCompleted() {
                logout();
            },
            onError() {
                toast({
                    variant: "destructive",
                    description: "La déconnexion a échouée",
                });
            },
        });
    };

    // Notifications
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

    return (
        <div className="w-full flex justify-between items-center">
            <section className="flex items-center gap-2">
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => navigate("/")}
                />
                <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                    {navigationList.map((item) =>
                        item.path ? (
                            <NavLink
                                key={item.id}
                                to={item.path || ""}
                                className={({ isActive }) =>
                                    `${isActive && "text-primary"} text-sm font-medium transition-colors hover:text-primary`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ) : (
                            <Dialog
                                open={openDialog}
                                onOpenChange={setOpenDialog}
                                key={item.id}
                            >
                                <DialogTrigger asChild>
                                    <button className="text-sm font-medium transition-colors hover:text-primary">
                                        {item.name}
                                    </button>
                                </DialogTrigger>
                                <FormUserUrl
                                    openDialog={openDialog}
                                    setOpenDialog={setOpenDialog}
                                />
                            </Dialog>
                        ),
                    )}
                </nav>
            </section>
            <section className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer h-6 w-6 relative">
                            <Bell className="hover:text-primary transition-colors" />
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
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 lg:w-fit" align="end">
                        <DropdownMenuLabel className="flex justify-between items-center">
                            <p>Notifications</p>
                            <button type="button" onClick={hDeleteAll}>
                                <Trash className="h-5 w-5" />
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
                                <p className="w-56">Aucune notifications</p>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer w-8 h-8 bg-primary hover:bg-primary/90 rounded-full flex justify-center items-center">
                            <p className="text-lg text-white">
                                {user.username?.slice(0, 1)}
                            </p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setOpenPricing(true)}
                            className="cursor-pointer"
                        >
                            <Crown className="mr-2 h-4 w-4" />
                            <p>{loading ? "Chargement ..." : "Abonnements"}</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <p>{loading ? "Chargement..." : "Déconnexion"}</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>
            <Pricing
                openPricing={openPricing}
                setOpenPricing={setOpenPricing}
            />
        </div>
    );
}
