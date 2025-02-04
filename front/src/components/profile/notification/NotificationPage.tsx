import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    const [initialInterval, setInitialInterval] = useState<string>("");
    const { data } = useQuery(GET_NOTIF_FREQUENCIES);
    const [updateUserNotifFrequency] = useMutation(UPDATE_USER_NOTIF_FREQUENCY);

    useEffect(() => {
        setInterval(data?.getUserNotifFrequency);
        setInitialInterval(data?.getUserNotifFrequency);
    }, [data]);

    const changeFrequency = async (interval: string) => {
        try {
            await updateUserNotifFrequency({
                variables: { frequency: interval },
                refetchQueries: [{ query: GET_NOTIF_FREQUENCIES }],
            });
            toast({
                title: "Succès",
                description: "Votre récurrence a bien été sauvegardée.",
            });
        } catch {
            toast({
                title: "Erreur",
                description: "Erreur lors de la sauvegarde de la récurrence !",
                variant: "destructive",
            });
        }
    };

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
            <section className="flex flex-col w-1/2 lg:w-1/5 justify-start items-start gap-6">
                <Select
                    defaultValue={interval}
                    onValueChange={(value) => setInterval(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={interval} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                Récurrence des notifications par email
                            </SelectLabel>
                            {data?.notifFrequencies.map(
                                (freq: NotifFrequency) => (
                                    <SelectItem
                                        key={freq.id}
                                        value={freq.interval}
                                        className={
                                            freq.interval === interval
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {freq.interval}
                                    </SelectItem>
                                ),
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button
                    className="w-fit"
                    onClick={() => changeFrequency(interval)}
                    disabled={interval === initialInterval}
                >
                    Sauvegarder la récurrence
                </Button>
            </section>
        </div>
    );
};

export default NotificationPage;
