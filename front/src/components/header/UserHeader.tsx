import { useLogoutLazyQuery } from "@/generated/graphql-types";
import clsx from "clsx";
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
import { useState } from "react";
import { Pricing } from "@/components/subscription/Pricing";
import { Roles } from "@/types/user";

export default function UserHeader() {
    const [openPricing, setOpenPricing] = useState<boolean>(false);

    const user = useAuthStore((state) => state.user);

    const [logoutQuery, { loading }] = useLogoutLazyQuery();
    const logout = useAuthStore((state) => state.logout);
    const { toast } = useToast();

    const isPremium = user.role === Roles.PREMIUM || user.role === Roles.ADMIN;

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
        <header 
            className={clsx(
                "fixed top-0 z-50", 
                "backdrop-blur-lg bg-white bg-opacity-60",
                "w-full flex justify-end items-center p-4"
            )}
        >
            <section className="flex items-center gap-4">
                {/* Emplacement pour l'abonnement */}
                <div className="flex flex-col items-end italic">
                    <span className="font-semibold leading-[16px]">
                        Abonnement
                    </span>
                    <span className="text-sm text-primary">
                        {isPremium ? Premium : Gratuit}
                    </span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer w-10 h-10 bg-primary hover:bg-primary/90 rounded-full flex justify-center items-center relative">
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
        </header>
    );
}
