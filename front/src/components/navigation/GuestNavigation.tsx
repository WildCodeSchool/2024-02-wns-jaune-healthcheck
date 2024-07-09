import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function GuestNavigation() {
    /* TODO: Open dialog pour ouvrir les formulaires d'inscription/connexion */
    return (
        <div className="w-full max-w-6xl mx-auto">
            <NavigationMenu className="ml-auto">
                <NavigationMenuList className="flex gap-2">
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    console.log("Open dialog for register")
                                }
                            >
                                S'inscrire
                            </Button>
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
