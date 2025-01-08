import { CancelProviderProps } from "@/types/subscription";
import { Button } from "../ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "../ui/card";
import { useSubscribeMutation } from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import { Roles } from "@/types/user";
import { FormEvent, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "../ui/use-toast";

export default function CancelForm({
    showCancel,
    setShowCancel,
    clientSecret,
}: CancelProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const [subscribe] = useSubscribeMutation();
    const me = useAuthStore((state) => state.me);

    const unsubscribeHandler = () => {
        subscribe({
            variables: {
                role: Roles.FREE,
            },
            onCompleted: (data) => {
                me(data.subscribe);
                setShowCancel(false);
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    description:
                        "Le désabonnement a échoué, veuillez réessayer.",
                });
            },
        });
    };

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            setLoading(true);

            // TODO : Use clientSecret to refoke payment instance
            // const result = await stripe.confirmPayment({
            //     elements,
            //     redirect: "if_required",
            // });

            // if (result.error) {
            //     toast({
            //         variant: "destructive",
            //         description:
            //             "Le désabonnement a échoué, veuillez réessayer.",
            //     });
            // } else {
            //     unsubscribeHandler();
            // }

            unsubscribeHandler();
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
        <Card
            className={
                showCancel
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
                    Non
                </Button>
                <Button
                    variant="destructive"
                    className="w-1/2"
                    onClick={(e) => handleSubmit(e)}
                >
                    Résilier
                </Button>
            </CardFooter>
        </Card>
    );
}
