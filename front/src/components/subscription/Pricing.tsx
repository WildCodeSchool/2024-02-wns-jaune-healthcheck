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

import { useSubscribeMutation } from "@/generated/graphql-types";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

interface PricingProps {
    openPricing: boolean;
    setOpenPricing: (value: boolean) => void;
}

export function Pricing(props: PricingProps) {
    const { openPricing, setOpenPricing } = props;
    const [subscribe] = useSubscribeMutation();
    const me = useAuthStore((state) => state.me);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const subscribeHandler = () => {
        subscribe({
            onCompleted: (data) => {
                me(data.subscribe);
                navigate("/dashboard/subscribe");
                setOpenPricing(false);
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <Dialog open={openPricing} onOpenChange={setOpenPricing}>
            <DialogContent className="min-w-max">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Abonnements
                    </DialogTitle>
                    <DialogDescription className="flex flex-col md:flex-row justify-center items-center py-5 gap-3">
                        <Card className="w-[250px] h-[300px]">
                            <CardHeader>
                                <CardTitle>Gratuit</CardTitle>
                                <CardDescription>
                                    Profitez gratuitement d'Health Checker
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <ul className="flex flex-col gap-2 py-2">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <p>Ajoutez jusqu'à 5 URL Privées</p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X className="w-4 h-4 text-red-500" />
                                        <p>Changer l'interval de check d'URL</p>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" disabled>
                                    Par défaut
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="w-[250px] h-[300px]">
                            <CardHeader>
                                <CardTitle>Premium - 10€</CardTitle>
                                <CardDescription>
                                    Levez les limitations de la version gratuite
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="flex flex-col gap-2 py-2">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <p>
                                            Nombre d'URL Privées{" "}
                                            <span className="font-bold">
                                                Illimité
                                            </span>
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <p>Changer l'interval de check d'URL</p>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    disabled={user.premium}
                                    onClick={() => subscribeHandler()}
                                >
                                    {user.premium
                                        ? "Vous êtes abonné"
                                        : "S'abonner"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
