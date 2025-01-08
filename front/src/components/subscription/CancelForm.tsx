import { CancelProviderProps } from "@/types/subscription";
import { Button } from "../ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
    CardContent,
} from "../ui/card";
import { useCancelSubscriptionMutation } from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import { FormEvent, useState } from "react";
import { toast } from "../ui/use-toast";
import { Check, X } from "lucide-react";

export default function CancelForm({
    showCancel,
    setShowCancel,
}: CancelProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isCancelationValid, setIsCancelationValid] =
        useState<boolean>(false);

    const [unsubscribe] = useCancelSubscriptionMutation();
    const me = useAuthStore((state) => state.me);

    const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            setIsCancelationValid(true);

            unsubscribe({
                onCompleted: (data) => {
                    me(data.cancelSubscription);
                    setTimeout(() => {
                        setIsCancelationValid(true);
                        setShowCancel(false);
                    }, 3500);
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        description:
                            "Le désabonnement a échoué, veuillez réessayer.",
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
        <>
            <Card
                className={
                    showCancel && !isCancelationValid
                        ? "flex flex-col justify-between align-middle w-full border-none shadow-none"
                        : "hidden"
                }
            >
                <CardHeader className="px-0 py-1">
                    <CardTitle>
                        Êtes-vous sur de vouloir résilier votre abonnement ?
                    </CardTitle>
                    <CardDescription>
                        Vos avantages seront supprimés immediatement.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="px-0 pb-0 flex gap-2">
                    <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => setShowCancel(false)}
                    >
                        Ne pas résilier
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-1/2"
                        disabled={loading || isCancelationValid}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Résilier
                    </Button>
                </CardFooter>
            </Card>
            <Card
                className={
                    isCancelationValid
                        ? "flex flex-col justify-between align-middle w-full border-none shadow-none"
                        : "hidden"
                }
            >
                <CardHeader className="px-0 py-1">
                    <CardTitle>Votre résiliation a été validé</CardTitle>
                    <CardDescription>
                        Vos avantages sont entrain d'être retirés, veuillez
                        patienter quelques secondes.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    <ul className="flex flex-col gap-2 py-2 animate-pulse">
                        <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <p className="text-left">
                                Nombre d'URL Privées{" "}
                                <span className="font-bold">Illimité</span>
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
            </Card>
        </>
    );
}
