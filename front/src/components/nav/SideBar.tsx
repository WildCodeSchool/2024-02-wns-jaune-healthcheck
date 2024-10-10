import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { 
  Dialog, 
  DialogTrigger } from "@radix-ui/react-dialog";
import clsx from "clsx";
import { 
  CircleGauge, 
  Link as IconLink,
  History,
  UserRoundCheck,
  Plus } from "lucide-react";
import FormUserUrl from "../FormUserUrl";
import useScreenDimensions from "@/hooks/useScreenDimensions";


type NavItemProps = {
  path: string,
  icon: React.ReactNode,
  children: React.ReactNode,
}

const NavItem: React.FC<NavItemProps> = ({
  path,
  icon,
  children
}) => {

  const location = useLocation();
  const { width } = useScreenDimensions();
  const isActive = location.pathname === path;
  
  return (
    <li 
    title={width > 1280 ? "" : children?.toString()}
    className={clsx(
      "transition duration-200 ease-in-out",
      "hover:text-primary",
      isActive && "text-primary bg-primary/10 rounded-full xl:rounded-md"
    )}>
      <Link 
        className={clsx(
          "py-[10.5px] px-[10.5px] xl:px-3 xl:py-2",
          "flex xl:space-x-4 items-center",
          
        )}
        to={path}
      >
        { icon }
        <span
          className="text-md font-normal"
        >
          { width > 1280 && children }
        </span>
      </Link>
    </li>
  )
};

const SideBar: React.FC = () => {
  const { width } = useScreenDimensions();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <aside
      className={clsx(
        "h-[100vh]",
        "sticky top-0 pt-24",
        "flex flex-col justify-start items-start"
      )}
    >
        <Dialog
          open={openDialog}
          onOpenChange={() =>
              setOpenDialog(!openDialog)
          }
      >
          <DialogTrigger asChild>
              <Button
                  size={width > 1280 ? "default" : "icon"}
                  className={clsx(
                    "xl:w-full mb-3 space-x-2",
                    "rounded-full xl:rounded-md"
                  )}
              >
                  <Plus 
                    size={width > 1280 ? 18 : 20}
                  />
                  {width > 1280 && 
                    <span>Ajouter une URL</span>
                  }
              </Button>
          </DialogTrigger>
          <FormUserUrl
              setOpenDialog={setOpenDialog}
              openDialog={openDialog}
          />
      </Dialog>
      <nav className="xl:w-full">
        <ul className="space-y-1">
          <NavItem 
            path="/dashboard/overview"
            icon={<CircleGauge size={20}/>}
          >
            Tableau de bord
          </NavItem>
          <NavItem 
            path="/dashboard/urls"
            icon={<IconLink size={20}/>}
          >
            Mes urls
          </NavItem>
          <NavItem 
            path="/dashboard/histories"
            icon={<History size={20}/>}
          >
            Mes historiques
          </NavItem>
          <NavItem 
            path="/dashboard/subscribe"
            icon={<UserRoundCheck size={20}/>}
          >
            Abonnements
          </NavItem>
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar;