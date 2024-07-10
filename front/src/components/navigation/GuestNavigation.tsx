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

export default function GuestNavigation() {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <NavigationMenu className="ml-auto">
                <NavigationMenuList className="flex gap-2">
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost">S'inscrire</Button>
                                </DialogTrigger>
                                <FormRegister />
                            </Dialog>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Connexion</Button>
                                </DialogTrigger>
                                <FormLogin />
                            </Dialog>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
