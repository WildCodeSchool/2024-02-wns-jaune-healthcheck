import { Outlet, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserSideBar from "@/components/nav/UserSideBar";
import UserBreadcrumb from "@/components/nav/UserBreadcrumb";


const UserLayout: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <UserSideBar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <UserBreadcrumb path={location.pathname} />
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default UserLayout;