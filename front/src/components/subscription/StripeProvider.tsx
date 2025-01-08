import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { SubscriptionProviderProps } from "@/types/subscription";
import { useCreateSubscriptionMutation } from "@/generated/graphql-types";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import CancelForm from "./CancelForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function StripeProvider({
    showCheckout,
    setShowCheckout,
    showCancel,
    setShowCancel,
}: SubscriptionProviderProps) {
    const [createSubscriptionMutation] = useCreateSubscriptionMutation();
    const [loading, setLoading] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string>("");

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                setLoading(true);
                const { data } = await createSubscriptionMutation();

                if (data && data.createSubscription) {
                    setClientSecret(data.createSubscription);
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Erreur lors de la communication avec Stripe",
                });
            } finally {
                setLoading(false);
            }
        };

        if (showCheckout || showCancel) {
            fetchClientSecret();
        }
    }, [showCheckout, showCancel, createSubscriptionMutation]);

    return (
        <div
            className={
                showCheckout || showCancel
                    ? "flex justify-center align-middle min-h-40 w-full"
                    : "hidden"
            }
        >
            {loading && (
                <div className="m-auto">
                    <Loader2 className="animate-spin text-primary" />
                </div>
            )}
            {!loading && clientSecret && showCheckout && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                        showCheckout={showCheckout}
                        setShowCheckout={setShowCheckout}
                    />
                </Elements>
            )}
            {!loading && clientSecret && showCancel && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CancelForm
                        showCancel={showCancel}
                        setShowCancel={setShowCancel}
                        clientSecret={clientSecret}
                    />
                </Elements>
            )}
        </div>
    );
}
