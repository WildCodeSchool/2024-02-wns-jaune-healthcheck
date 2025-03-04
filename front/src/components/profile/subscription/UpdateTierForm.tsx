import { UpdateFormProps } from "@/types/subscription";
import { Button } from "../../ui/button";
import { useChangeSubscriptionTierMutation } from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import { FormEvent, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { Check, X } from "lucide-react";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Dialog,
    DialogContent,
} from "@/components/ui/dialog.tsx";
import { Roles } from "@/constants/role.ts";
import ButtonLoader from "@/components/custom/ButtonLoader.tsx";
import { subscriptions } from "@/constants/subscription";
import { renderSubscriptionFeatureText } from "@/constants/globalFunction";

export default function UpdateTierForm({
    tier,
    premium,
    closeUpdateTier,
}: UpdateFormProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isUpdateValid, setIsUpdateValid] = useState<boolean>(false);

    const [changeSubscriptionTier] = useChangeSubscriptionTierMutation();
    const me = useAuthStore((state) => state.me);
    const { toast } = useToast();

    const selectedSubscription = premium ? subscriptions[2] : subscriptions[1];

    const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            setLoading(true);

            const newTierKey = premium ? Roles.PREMIUM : Roles.TIER;

            await changeSubscriptionTier({
                variables: {
                    newPriceKey: newTierKey,
                },
                onCompleted: (data) => {
                    setIsUpdateValid(true);
                    me(data.changeSubscriptionTier);
                    setTimeout(() => {
                        setIsUpdateValid(true);
                        closeUpdateTier();
                        toast({
                            variant: "default",
                            title: "Merci pour votre confiance !",
                            description: "Votre abonnement a été mis à jour.",
                        });
                    }, 3500);
                },
                onError: () => {
                    setIsUpdateValid(false);
                    toast({
                        variant: "destructive",
                        description:
                            "La mise à jour de votre abonnement a échoué, veuillez réessayer.",
                    });
                },
            });
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Erreur lors de la communication avec Stripe",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={tier || premium} onOpenChange={closeUpdateTier}>
            <DialogContent>
                {!isUpdateValid && (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                Passer à la formule{" "}
                                {premium ? "Premium" : "Tier"} ?
                            </DialogTitle>
                            <DialogDescription>
                                Vos avantages seront activés immédiatement. Vous
                                recevrez une facture calculée au prorata de la
                                différence de prix entre les deux formules.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="flex flex-col-reverse gap-2">
                            <Button
                                variant="outline"
                                onClick={closeUpdateTier}
                                className="md:mr-auto"
                            >
                                Ne pas changer
                            </Button>

                            {!loading ? (
                                <Button
                                    variant="default"
                                    disabled={loading || isUpdateValid}
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Souscrire
                                </Button>
                            ) : (
                                <ButtonLoader variant="default" />
                            )}
                        </DialogFooter>
                    </>
                )}

                {isUpdateValid && (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                Votre demande de modification a été validée
                            </DialogTitle>
                            <DialogDescription>
                                Vos avantages sont entrain d'être débloqués,
                                veuillez patienter quelques secondes.
                            </DialogDescription>
                        </DialogHeader>

                        <ul className="flex flex-col gap-2 pt-2 animate-pulse">
                            {selectedSubscription.features.map(
                                (feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        {feature.included ? (
                                            <Check className="w-4 h-4 text-green-600 dark:text-teal-400" />
                                        ) : (
                                            <X className="w-4 h-4 text-red-600 dark:text-rose-400" />
                                        )}
                                        <p className="text-left">
                                            {renderSubscriptionFeatureText(
                                                feature,
                                            )}
                                        </p>
                                    </li>
                                ),
                            )}
                        </ul>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
