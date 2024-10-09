import Logo from "@/assets/logo.svg";
import { useLogoutLazyQuery } from "@/generated/graphql-types";
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
import { LogOut, Crown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import FormUserUrl from "../FormUserUrl";
import { useState } from "react";
import { Pricing } from "@/components/subscription/Pricing";

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
                                <FormUserUrl setOpenDialog={setOpenDialog} />
                            </Dialog>
                        ),
                    )}
                </nav>
            </section>
            <section className="flex items-center gap-4">
                {/* Emplacement pour l'abonnement */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer w-8 h-8 bg-primary hover:bg-primary/90 rounded-full flex justify-center items-center relative">
                            {user.premium && (
                                <Crown
                                    strokeWidth={3}
                                    className="h-4 w-4 absolute left-[-2px] top-[-5px] text-amber-300"
                                />
                            )}
                            <p className="text-lg text-white">
                                {user.username?.slice(0, 1)}
                            </p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
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
