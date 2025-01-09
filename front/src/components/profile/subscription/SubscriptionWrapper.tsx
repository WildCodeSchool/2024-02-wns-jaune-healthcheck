import { useState } from "react";
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
import { Separator } from "../../ui/separator";
import StripeProvider from "./StripeProvider";
import { PricingStates, UpdateTierStates } from "@/types/subscription";
import CancelForm from "@/components/profile/subscription/CancelForm.tsx";
import UpdateTierForm from "@/components/profile/subscription/UpdateTierForm.tsx";

export function SubscriptionWrapper() {
    const [openPricing, setOpenPricing] = useState<PricingStates>({
        free: false,
        tier: false,
        premium: false,
    });
    const [openUpdateTier, setOpenUpdateTier] = useState<UpdateTierStates>({
        tier: false,
        premium: false,
    });

    const user = useAuthStore((state) => state.user);

    const isFree = user.role === Roles.FREE;
    const isTier = user.role === Roles.TIER;
    const isPremium = user.role === Roles.PREMIUM;

    const handleOpenPricing = (key: string) => {
        switch (user.role) {
            case Roles.FREE:
                if (key === Roles.TIER) {
                    setOpenPricing({ ...openPricing, tier: true });
                }
                if (key === Roles.PREMIUM) {
                    setOpenPricing({ ...openPricing, premium: true });
                }
                return;
            case Roles.TIER:
                if (key === Roles.PREMIUM) {
                    setOpenUpdateTier({ ...openUpdateTier, premium: true });
                }
                return;
            case Roles.PREMIUM:
                if (key === Roles.TIER) {
                    setOpenUpdateTier({ ...openUpdateTier, tier: true });
                }
                return;
            default:
                return;
        }
    };

    const closePricing = () => {
        setOpenPricing({
            free: false,
            tier: false,
            premium: false,
        });
    };

    const closeUpdateTier = () => {
        setOpenUpdateTier({
            tier: false,
            premium: false,
        });
    };

    // TODO : Modal pour Update le Tier avec confirmation et précision que le prorata sera facturé immédiatement

    return (
        <div className="w-full h-fit m-auto">
            <section className="py-4">
                <h1 className="font-semibold text-2xl mb-[1px]">
                    Gérez votre abonnement et vos avantages
                </h1>
                <h2 className="mb-4 text-sm text-gray-500">
                    Séléctionnez la formule la plus adaptée à votre utilisation.
                </h2>
            </section>

            <section className="flex flex-col lg:flex-row justify-center items-center gap-3">
                <Card className="w-full xl:w-1/3 h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Gratuit</CardTitle>
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
                                    Ajoutez jusqu'à{" "}
                                    <span className="font-bold">5</span> URL
                                    Privées
                                </p>
                            </li>
                            <li className="flex items-center gap-2">
                                <X className="w-4 h-4 text-red-500" />
                                <p className="text-left">
                                    Changer l'interval de vérification des URL
                                </p>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            disabled={isFree}
                            onClick={() =>
                                setOpenPricing({ ...openPricing, free: true })
                            }
                        >
                            {isFree ? "Actif" : "Passer à l'abonnement gratuit"}
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="w-full xl:w-1/3 h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Tier</CardTitle>
                        <CardDescription>
                            Le basique, mais en 10x mieux.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-2xl md:text-4xl mb-2">
                            3€{" "}
                            <span className="text-sm font-medium text-gray-600">
                                / mois
                            </span>
                        </p>
                        <Separator className="my-6" />
                        <ul className="flex flex-col gap-2 py-2">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <p className="text-left">
                                    Ajoutez jusqu'à{" "}
                                    <span className="font-bold">50</span> URL
                                    Privées
                                </p>
                            </li>
                            <li className="flex items-center gap-2">
                                <X className="w-4 h-4 text-red-500" />
                                <p className="text-left">
                                    Changer l'interval de vérification des URL
                                </p>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            disabled={isTier}
                            onClick={() => handleOpenPricing(Roles.TIER)}
                        >
                            {isTier ? "Actif" : "S'abonner"}
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="w-full xl:w-1/3 h-full flex flex-col">
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
                                    <span className="font-bold">Illimité</span>
                                </p>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <p className="text-left">
                                    Changer l'interval de vérification des URL
                                </p>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            disabled={isPremium}
                            onClick={() => handleOpenPricing(Roles.PREMIUM)}
                        >
                            {isPremium ? "Actif" : "S'abonner"}
                        </Button>
                    </CardFooter>
                </Card>

                {(openPricing.tier || openPricing.premium) && (
                    <StripeProvider
                        showTier={openPricing.tier}
                        showPremium={openPricing.premium}
                        closePricing={closePricing}
                    />
                )}
                {openPricing.free && (
                    <CancelForm
                        showFree={openPricing.free}
                        closePricing={closePricing}
                    />
                )}
                {openUpdateTier.tier ||
                    (openUpdateTier.premium && (
                        <UpdateTierForm
                            tier={openUpdateTier.tier}
                            premium={openUpdateTier.premium}
                            closeUpdateTier={closeUpdateTier}
                        />
                    ))}
            </section>
        </div>
    );
}
