import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { SubscriptionProviderProps } from "@/types/subscription";
import { useCreateStripeSetupIntentMutation } from "@/generated/graphql-types";
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
    const [loading, setLoading] = useState<boolean>(false);
    const [setupIntentSecret, setSetupIntentSecret] = useState<string>("");

    const [createStripeSetupIntent] = useCreateStripeSetupIntentMutation();

    useEffect(() => {
        const initializeStripeSetupIntent = async () => {
            try {
                setLoading(true);
                const { data } = await createStripeSetupIntent();

                if (data && data.createStripeSetupIntent) {
                    setSetupIntentSecret(data.createStripeSetupIntent);
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

        if (showCheckout) {
            initializeStripeSetupIntent();
        }
    }, [showCheckout, createStripeSetupIntent]);

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
            {!loading && setupIntentSecret && showCheckout && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: setupIntentSecret,
                        paymentMethodCreation: "manual",
                    }}
                >
                    <CheckoutForm
                        showCheckout={showCheckout}
                        setShowCheckout={setShowCheckout}
                    />
                </Elements>
            )}
            {!loading && showCancel && (
                <CancelForm
                    showCancel={showCancel}
                    setShowCancel={setShowCancel}
                />
            )}
        </div>
    );
}
