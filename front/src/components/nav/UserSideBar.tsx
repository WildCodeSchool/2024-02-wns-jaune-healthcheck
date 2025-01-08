import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
    AudioWaveform,
    ChevronsUpDown,
    Command,
    GalleryVerticalEnd,
    LogOut,
    CircleGauge,
    Link as IconLink,
    History,
    Crown,
    CirclePlus,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useSidebar } from "@/components/ui/sidebar";
import Logo from "@/assets/logo.svg";
import useAuthStore from "@/stores/authStore";
import { useLogoutLazyQuery } from "@/generated/graphql-types";
import { Roles } from "@/types/user";
import { Pricing } from "@/components/subscription/Pricing";
import FormUserUrl from "../FormUserUrl";

const data = {
    about: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navigation: [
        {
            name: "Tableau de bord",
            url: "/dashboard",
            icon: CircleGauge,
        },
        {
            name: "Mes urls",
            url: "/urls",
            icon: IconLink,
        },
        {
            name: "Mes historiques",
            url: "/histories",
            icon: History,
        },
    ],
};

const UserSideBar: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const { open } = useSidebar();
    const logout = useAuthStore((state) => state.logout);
    const [openPricing, setOpenPricing] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [logoutQuery, { loading }] = useLogoutLazyQuery();
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

    // Clean up cookie on unmount
    useEffect(() => {
        return () => {
            document.cookie = `sidebar:state=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        };
    }, []);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                        <img
                                            src={Logo}
                                            alt="Logo"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            Health Checker
                                        </span>
                                        <span className="truncate text-xs">
                                            Monitoring service
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                align="start"
                                side="bottom"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-muted-foreground">
                                    A propos
                                </DropdownMenuLabel>
                                {data.about.map((team, index) => (
                                    <DropdownMenuItem
                                        key={team.name}
                                        className="gap-2 p-2"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-sm border">
                                            <team.logo className="size-4 shrink-0" />
                                        </div>
                                        {team.name}
                                        <DropdownMenuShortcut>
                                            ⌘{index + 1}
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Dialog
                                open={openDialog}
                                onOpenChange={() => setOpenDialog(!openDialog)}
                            >
                                <DialogTrigger asChild>
                                    <SidebarMenuButton
                                        className="hover:cursor-pointer h-9"
                                        variant="outline"
                                        asChild
                                        tooltip="Ajouter une url"
                                    >
                                        <div>
                                            <CirclePlus />
                                            <span className="mb-[0.5px]">
                                                Ajouter une url
                                            </span>
                                        </div>
                                    </SidebarMenuButton>
                                </DialogTrigger>
                                <FormUserUrl
                                    setOpenDialog={setOpenDialog}
                                />
                            </Dialog>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navigation.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild tooltip={item.name}>
                                    <Link to={item.url}>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    {isPremium && (
                                        <Crown
                                            strokeWidth={3}
                                            fill="rgb(252 211 77)"
                                            className={clsx(
                                                "h-4 w-4 text-amber-300",
                                                "-left-[6px] -top-[6px]",
                                                "transition-transform duration-200 ease-in-out",
                                                open &&
                                                    "translate-x-2 translate-y-2",
                                                "absolute",
                                            )}
                                        />
                                    )}
                                    <div
                                        className={clsx(
                                            "aspect-square cursor-pointer",
                                            "h-8 w-8 bg-primary hover:bg-primary/90",
                                            "rounded-full flex justify-center items-center",
                                        )}
                                    >
                                        <p className="text-lg text-white">
                                            {user.username?.slice(0, 1)}
                                        </p>
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user.username}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel>
                                    <p>Profil</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => setOpenPricing(true)}
                                        className="cursor-pointer"
                                    >
                                        <Crown className="mr-2 h-4 w-4" />
                                        <p>
                                            {loading
                                                ? "Chargement ..."
                                                : "Abonnements"}
                                        </p>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <p>
                                        {loading
                                            ? "Chargement..."
                                            : "Déconnexion"}
                                    </p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
            <Pricing
                openPricing={openPricing}
                setOpenPricing={setOpenPricing}
            />
        </Sidebar>
    );
};

export default UserSideBar;
