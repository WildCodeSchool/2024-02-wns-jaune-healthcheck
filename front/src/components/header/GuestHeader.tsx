import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import FormRegister from "../auth/FormRegister";
import FormLogin from "../auth/FormLogin";
import { useState } from "react";
import Logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function GuestHeader() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-6xl mx-auto flex items-center">
            <img
                src={Logo}
                alt="Logo"
                className="w-8 h-8 cursor-pointer"
                onClick={() => navigate("/")}
            />
            <NavigationMenu className="ml-auto">
                <NavigationMenuList className="flex gap-2">
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size={"sm"}>
                                        S'inscrire
                                    </Button>
                                </DialogTrigger>
                                <FormRegister />
                            </Dialog>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Dialog
                                open={openDialog}
                                onOpenChange={setOpenDialog}
                            >
                                <DialogTrigger asChild>
                                    <Button variant="outline" size={"sm"}>
                                        Connexion
                                    </Button>
                                </DialogTrigger>
                                <FormLogin
                                    setOpenDialog={setOpenDialog}
                                />
                            </Dialog>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
