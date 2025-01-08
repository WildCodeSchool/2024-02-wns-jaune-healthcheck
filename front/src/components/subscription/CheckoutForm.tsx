import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useCreateSubscriptionMutation } from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { CheckoutProviderProps } from "@/types/subscription";
import { FormEvent, useState } from "react";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { toast } from "../ui/use-toast";
import { Check } from "lucide-react";

export default function CheckoutForm({
    showCheckout,
    setShowCheckout,
}: CheckoutProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isPaymentValid, setIsPaymentValid] = useState<boolean>(false);

    const stripe = useStripe();
    const elements = useElements();

    const [createSubscription] = useCreateSubscriptionMutation();
    const me = useAuthStore((state) => state.me);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            setLoading(true);

            const { error: submitError } = await elements.submit();
            if (submitError) {
                throw submitError;
            }

            const { paymentMethod, error: pmError } =
                await stripe.createPaymentMethod({
                    elements,
                    params: {
                        type: "card",
                    },
                });

            if (pmError) {
                throw new Error("Payment error");
            }

            setLoading(false);
            setIsPaymentValid(true);

            await createSubscription({
                variables: {
                    paymentMethodId: paymentMethod.id,
                },
                onCompleted: (data) => {
                    me(data.createSubscription);
                    setTimeout(() => {
                        setIsPaymentValid(false);
                        setShowCheckout(false);
                    }, 3500);
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        description:
                            "Erreur, veuillez contacter un administrateur.",
                    });
                },
            });
        } catch (error) {
            if (error === "Payment error") {
                toast({
                    variant: "destructive",
                    description: "Le paiement a échoué, veuillez réessayer.",
                });
            } else {
                toast({
                    variant: "destructive",
                    description: "Erreur lors de la communication avec Stripe",
                });
            }
        }
    };

    const handleFormChange = (event: StripePaymentElementChangeEvent) => {
        setIsFormValid(event.complete);
    };

    return (
        <>
            <Card
                className={
                    showCheckout && !isPaymentValid
                        ? "block w-full border-none shadow-none"
                        : "hidden"
                }
            >
                <CardHeader className="px-0 pt-1 pb-6">
                    <CardTitle>Souscrire à la formule Premium ?</CardTitle>
                    <CardDescription>
                        Vos avantages seront actifs immediatement.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    <form onSubmit={handleSubmit}>
                        <PaymentElement onChange={handleFormChange} />
                        <CardFooter className="mt-4 px-0 pb-0 flex gap-2">
                            <Button
                                variant="outline"
                                className="w-1/2"
                                type="button"
                                onClick={() => setShowCheckout(false)}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                variant="default"
                                disabled={!stripe || !isFormValid || loading}
                                className="w-1/2"
                            >
                                Payer
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Card
                className={
                    isPaymentValid && !loading
                        ? "flex flex-col justify-between align-middle w-full border-none shadow-none"
                        : "hidden"
                }
            >
                <CardHeader className="px-0 py-1">
                    <CardTitle>Votre paiment a été validé</CardTitle>
                    <CardDescription>
                        Vos avantages sont entrain d'être débloqués, veuillez
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
                            <Check className="w-4 h-4 text-green-500" />
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
