import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { Roles } from "@/types/user";
import { Separator } from "../ui/separator";
import StripeProvider from "./StripeProvider";

interface PricingProps {
    openPricing: boolean;
    setOpenPricing: (value: boolean) => void;
}

export function Pricing(props: PricingProps) {
    const { openPricing, setOpenPricing } = props;
    const [openCheckout, setOpenCheckout] = useState<boolean>(false);
    const [openCancel, setOpenCancel] = useState<boolean>(false);

    const user = useAuthStore((state) => state.user);
    const isPremium = user.role === Roles.PREMIUM;

    /* TODO: Tout reset si close modal */

    return (
        <Dialog open={openPricing} onOpenChange={setOpenPricing}>
            <DialogContent className="w-screen h-screen sm:h-fit md:w-2/3 lg:min-w-max">
                <DialogHeader>
                    <DialogTitle className="text-left">Abonnements</DialogTitle>
                    <DialogDescription className="flex flex-col sm:flex-row justify-center items-center py-4 gap-3">
                        <Card
                            className={
                                "w-full sm:w-1/2 sm:h-full lg:w-1/2 lg:h-full flex flex-col " +
                                (openCheckout || openCancel
                                    ? " hidden"
                                    : "block")
                            }
                        >
                            <CardHeader>
                                <CardTitle>Basique</CardTitle>
                                <CardDescription>
                                    Accédez aux fonctionnalitées de base.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="font-bold text-2xl md:text-4xl mb-2">
                                    0€{" "}
                                    <span className="text-sm font-medium text-gray-600">
                                        / mois
                                    </span>
                                </p>
                                <Separator className="my-6" />
                                <ul className="flex flex-col gap-2 py-2">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <p className="text-left">
                                            Ajoutez jusqu'à 5 URL Privées
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X className="w-4 h-4 text-red-500" />
                                        <p className="text-left">
                                            Changer l'interval de vérification
                                            des URL
                                        </p>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    disabled={!isPremium}
                                    onClick={() => setOpenCancel(true)}
                                >
                                    {isPremium
                                        ? "Annuler votre abonnement"
                                        : "Actif"}
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card
                            className={
                                "w-full sm:w-1/2 sm:h-full lg:w-1/2 lg:h-full flex flex-col " +
                                (openCheckout || openCancel
                                    ? " hidden"
                                    : "block")
                            }
                        >
                            <CardHeader>
                                <CardTitle>Premium</CardTitle>
                                <CardDescription>
                                    Utilisez nos services en illimité.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="font-bold text-2xl md:text-4xl mb-2">
                                    10€{" "}
                                    <span className="text-sm font-medium text-gray-600">
                                        / mois
                                    </span>
                                </p>
                                <Separator className="my-6" />
                                <ul className="flex flex-col gap-2 py-2">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <p className="text-left">
                                            Nombre d'URL Privées{" "}
                                            <span className="font-bold">
                                                Illimité
                                            </span>
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <p className="text-left">
                                            Changer l'interval de vérification
                                            des URL
                                        </p>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    disabled={isPremium}
                                    onClick={() => setOpenCheckout(true)}
                                >
                                    {isPremium
                                        ? "Vous êtes abonné"
                                        : "S'abonner"}
                                </Button>
                            </CardFooter>
                        </Card>
                        {(openCheckout || openCancel) && (
                            <section className="w-full min-h-40">
                                <StripeProvider
                                    showCheckout={openCheckout}
                                    setShowCheckout={setOpenCheckout}
                                    showCancel={openCancel}
                                    setShowCancel={setOpenCancel}
                                />
                            </section>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
