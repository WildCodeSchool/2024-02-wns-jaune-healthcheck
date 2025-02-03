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
import { Separator } from "../../ui/separator";
import { PricingStates, UpdateTierStates } from "@/types/subscription";
import { subscriptions } from "@/constants/subscription.ts";
import { Roles } from "@/constants/role.ts";
import StripeProvider from "@/components/profile/subscription/StripeProvider.tsx";
import CancelForm from "@/components/profile/subscription/CancelForm.tsx";
import UpdateTierForm from "@/components/profile/subscription/UpdateTierForm.tsx";
import { renderSubscriptionFeatureText } from "@/constants/globalFunction.tsx";

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

    const handleOpenPricing = (key: Roles) => {
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
                if (key === Roles.FREE) {
                    setOpenPricing({ ...openPricing, free: true });
                }
                if (key === Roles.PREMIUM) {
                    setOpenUpdateTier({ ...openUpdateTier, premium: true });
                }
                return;
            case Roles.PREMIUM:
                if (key === Roles.FREE) {
                    setOpenPricing({ ...openPricing, free: true });
                }
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

    const getButtonText = (subscriptionId: Roles) => {
        if (user.role === subscriptionId) {
            return "Actif";
        }
        if (subscriptionId === Roles.FREE) {
            return "Passer à l'abonnement gratuit";
        }
        return "S'abonner";
    };

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
                {subscriptions.map((subscription) => (
                    <Card
                        key={subscription.id}
                        className={`w-full xl:w-1/3 h-full flex flex-col ${
                            user.role === subscription.id &&
                            "border-2 border-primary"
                        }`}
                    >
                        <CardHeader>
                            <CardTitle>{subscription.title}</CardTitle>
                            <CardDescription>
                                {subscription.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-2xl md:text-4xl mb-2">
                                {subscription.price}€{" "}
                                <span className="text-sm font-medium text-gray-600">
                                    / mois
                                </span>
                            </p>
                            <Separator className="my-6" />
                            <ul className="flex flex-col gap-2 py-2">
                                {subscription.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        {feature.included ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <X className="w-4 h-4 text-red-500" />
                                        )}
                                        <p className="text-left">
                                            {renderSubscriptionFeatureText(
                                                feature,
                                            )}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                disabled={user.role === subscription.id}
                                onClick={() =>
                                    handleOpenPricing(subscription.id)
                                }
                            >
                                {getButtonText(subscription.id)}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
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
                {(openUpdateTier.tier || openUpdateTier.premium) && (
                    <UpdateTierForm
                        tier={openUpdateTier.tier}
                        premium={openUpdateTier.premium}
                        closeUpdateTier={closeUpdateTier}
                    />
                )}
            </section>
        </div>
    );
}
