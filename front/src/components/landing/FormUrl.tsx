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
import ButtonLoader from "../custom/ButtonLoader";

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
            variables: { urlData: urlInput, isPrivate: false },
            onCompleted() {
                toast({
                    variant: "default",
                    description: `${values.name} a bien été ajoutée`,
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
                        currentPage:
                            Number(searchParams?.get("currentPage")) || 1,
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
                {!loading ? (
                    <Button variant="default" type="submit" className="ml-auto">
                        Ajouter
                    </Button>
                ) : (
                    <div className="ml-auto">
                        <ButtonLoader variant="default" />
                    </div>
                )}
            </form>
        </Form>
    );
}
