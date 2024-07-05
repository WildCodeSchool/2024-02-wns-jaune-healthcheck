import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUrlSchema } from "@/constants/validator";
import { useAddUrlMutation } from "@/generated/graphql-types";

export default function FormUrl() {
    const newUrlForm = useForm<z.infer<typeof newUrlSchema>>({
        resolver: zodResolver(newUrlSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            path: "",
        },
    });

    const [createNewUrl, { loading }] = useAddUrlMutation();

    const onSubmit = (values: z.infer<typeof newUrlSchema>) => {
        const urlInput = {
            name: values.name,
            path: values.path,
        };

        createNewUrl({
            variables: { urlData: urlInput },
            onCompleted() {
                console.log("Url ajoutée");
            },
            onError(error) {
                console.log(error);
            },
        });
    };

    return (
        <Form {...newUrlForm}>
            <form
                onSubmit={newUrlForm.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                        control={newUrlForm.control}
                        name="name"
                        render={({ field }) => {
                            return (
                                <>
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Entrez un nom"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="italic">
                                            C'est le nom public pour l'URL
                                        </FormDescription>
                                    </FormItem>
                                    <FormMessage />
                                </>
                            );
                        }}
                    />
                    <FormField
                        control={newUrlForm.control}
                        name="path"
                        render={({ field }) => {
                            return (
                                <>
                                    <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="URL"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="italic">
                                            URL que vous dont vous souhaitez
                                            vérifier le statut
                                        </FormDescription>
                                    </FormItem>
                                    <FormMessage />
                                </>
                            );
                        }}
                    />
                </div>
                <Button variant="default" type="submit" disabled={loading}>
                    {loading ? "Ajout en cours" : "Ajouter"}
                </Button>
            </form>
        </Form>
    );
}
