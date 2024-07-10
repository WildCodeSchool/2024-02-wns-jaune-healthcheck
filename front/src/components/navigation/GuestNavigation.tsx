import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import FormRegister from "../auth/FormRegister";

export default function GuestNavigation() {
    /* TODO: Open dialog pour ouvrir les formulaires d'inscription/connexion */
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
                            <Button
                                variant="outline"
                                onClick={() =>
                                    console.log("Open dialog for login")
                                }
                            >
                                Connexion
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
