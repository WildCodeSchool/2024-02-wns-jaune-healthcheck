import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { UPDATE_USER_NOTIF_FREQUENCY } from "@/graphql/mutation";
import { GET_NOTIF_FREQUENCIES } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

type NotifFrequency = {
    id: string;
    interval: string;
};

const NotificationPage = () => {
    const [interval, setInterval] = useState<string>("");
    const { data } = useQuery(GET_NOTIF_FREQUENCIES);
    const [updateUserNotifFrequency] = useMutation(UPDATE_USER_NOTIF_FREQUENCY);

    useEffect(() => {
        setInterval(data?.getUserNotifFrequency);
    }, [data]);

    return (
        <div className="w-full h-fit m-auto">
            <section className="py-4">
                <h1 className="font-semibold text-2xl mb-[1px]">
                    Gérez vos notifications
                </h1>
                <h2 className="mb-4 text-sm text-gray-500">
                    Séléctionnez la récurrence de vos notifications.
                </h2>
            </section>
            <section className="flex flex-col lg:flex-row w-full justify-center items-center gap-3">
                <Card className="w-2/3 h-full flex flex-col border-2 border-primary">
                    <CardHeader>
                        <CardTitle>Récurrence</CardTitle>
                        <CardDescription>
                            Liste des récurrences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                        {data?.notifFrequencies.map((freq: NotifFrequency) => (
                            <Button
                                key={freq.interval}
                                className={`${interval === freq.interval && "outline outline-primary outline-offset-2"} w-full`}
                                onClick={() => setInterval(freq.interval)}
                            >
                                {freq.interval}
                            </Button>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={async () => {
                                try {
                                    await updateUserNotifFrequency({
                                        variables: { frequency: interval },
                                    });
                                    toast({
                                        title: "Succès",
                                        description:
                                            "Votre récurrence a bien été sauvegardée.",
                                    });
                                } catch {
                                    toast({
                                        title: "Erreur",
                                        description:
                                            "Erreur lors de la sauvegarde de la récurrence !",
                                        variant: "destructive",
                                    });
                                }
                            }}
                        >
                            Sauvegarder ma récurrence
                        </Button>
                    </CardFooter>
                </Card>
            </section>
        </div>
    );
};

export default NotificationPage;
