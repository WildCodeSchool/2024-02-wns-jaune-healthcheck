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
import { LogOut } from "lucide-react";

export default function UserHeader() {
    const user = useAuthStore((state) => state.user);

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
        <div className="w-full mx-auto flex items-center">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
            <section className="ml-auto flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer w-10 h-10 bg-primary hover:bg-primary/90 rounded-full flex justify-center items-center">
                            <p className="text-lg text-white">
                                {user.username?.slice(0, 1)}
                            </p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <button type="button" onClick={handleLogout}>
                                {loading ? "Chargement..." : "Déconnexion"}
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>
        </div>
    );
}
