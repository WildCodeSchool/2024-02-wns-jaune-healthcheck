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
import { GET_ALL_URLS } from "@/graphql/queries";
import { useToast } from "../ui/use-toast";
import { useSearchParams } from "react-router-dom";

export default function FormUrl() {
    const newUrlForm = useForm<z.infer<typeof newUrlSchema>>({
        resolver: zodResolver(newUrlSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            path: "",
        },
    });

    const [searchParams] = useSearchParams();
    const [createNewUrl, { loading }] = useAddUrlMutation();
    const { toast } = useToast();

    const onSubmit = (values: z.infer<typeof newUrlSchema>) => {
        const urlInput = {
            name: values.name,
            path: values.path,
        };

        createNewUrl({
            variables: { urlData: urlInput },
            onCompleted() {
                toast({
                    variant: "default",
                    description: `${values.name} à bien été ajouté`,
                });
                newUrlForm.reset();
            },
            onError(error) {
                toast({
                    variant: "destructive",
                    description: `${error.message}`,
                });
            },
            refetchQueries: [
                {
                    query: GET_ALL_URLS,
                    variables: {
                        searchText: searchParams?.get("searchUrl") || "",
                        sortField: searchParams?.get("sortField") || "",
                    },
                },
            ],
        });
    };

    return (
        <Form {...newUrlForm}>
            <form
                onSubmit={newUrlForm.handleSubmit(onSubmit)}
                className="space-y-6 flex flex-col"
                role="add-url-form"
            >
                <div className="space-y-4">
                    <FormField
                        control={newUrlForm.control}
                        name="name"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez un nom"
                                            role="name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="italic">
                                        C'est le nom public pour l'URL
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={newUrlForm.control}
                        name="path"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="URL"
                                            role="path"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="italic">
                                        URL dont vous souhaitez vérifier le
                                        statut
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>
                <Button
                    variant="default"
                    type="submit"
                    disabled={loading}
                    className="ml-auto"
                >
                    {loading ? "Ajout en cours" : "Ajouter"}
                </Button>
            </form>
        </Form>
    );
}
