import { Outlet, useLocation, Navigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import UserSideBar from "@/components/navigation/UserSideBar";
import UserBreadcrumb from "@/components/navigation/UserBreadcrumb";
import useAuthStore from "@/stores/authStore";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import ThemeToggle from "@/components/custom/ThemeToggle.tsx";

const UserLayout: React.FC = () => {
    const location = useLocation();
    const isLogged = useAuthStore((state) => state.isLogged);

    if (!isLogged) {
        return <Navigate to="/home" />;
    }

    return (
        <SidebarProvider>
            <UserSideBar />
            <SidebarInset className="w-[50vw]">
                <header className="dark:bg-sidebar border-b-[1px] flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex w-full justify-between items-center gap-2 px-4">
                        <section className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <UserBreadcrumb path={location.pathname} />
                        </section>
                        <section className="flex items-center gap-2">
                            <ThemeToggle />
                            <NotificationDropdown />
                        </section>
                    </div>
                </header>
                <main className="flex-1 space-y-4 p-4">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default UserLayout;
