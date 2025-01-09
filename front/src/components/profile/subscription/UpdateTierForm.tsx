import { UpdateFormProps } from "@/types/subscription";
import { Button } from "../../ui/button";
import { useChangeSubscriptionTierMutation } from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import { FormEvent, useState } from "react";
import { toast } from "../../ui/use-toast";
import { Check, X } from "lucide-react";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Dialog,
    DialogContent,
} from "@/components/ui/dialog.tsx";
import { Roles } from '@/constants/role.ts';
import ButtonLoader from '@/components/custom/ButtonLoader.tsx';

export default function UpdateTierForm({
    tier,
    premium,
    closeUpdateTier,
}: UpdateFormProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isUpdateValid, setIsUpdateValid] = useState<boolean>(false);

    const [changeSubscriptionTier] = useChangeSubscriptionTierMutation();
    const me = useAuthStore((state) => state.me);

    const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            setIsUpdateValid(true);

            const newTierKey = premium ? Roles.PREMIUM : Roles.TIER;

            await changeSubscriptionTier({
                variables: {
                    newPriceKey: newTierKey,
                },
                onCompleted: (data) => {
                    me(data.changeSubscriptionTier);
                    setTimeout(() => {
                        setIsUpdateValid(true);
                        closeUpdateTier();
                        toast({
                            variant: 'default',
                            title: 'Merci pour votre confiance !',
                            description: 'Votre abonnement a été mis à jour.'
                        });
                    }, 3500);
                },
                onError: () => {
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
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                {premium ? (
                                    <p className="text-left">
                                        Nombre d'URL Privées{" "}
                                        <span className="font-bold">
                                            Illimité
                                        </span>
                                    </p>
                                ) : (
                                    <p className="text-left">
                                        Ajoutez jusqu'à{" "}
                                        <span className="font-bold">50</span>{" "}
                                        URL Privées
                                    </p>
                                )}
                            </li>
                            <li className="flex items-center gap-2">
                                {premium ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <X className="w-4 h-4 text-red-500" />
                                )}
                                <p className="text-left">
                                    Changer l'interval de vérification des URL
                                </p>
                            </li>
                        </ul>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
