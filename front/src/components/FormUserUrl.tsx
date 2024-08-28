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
import { GET_ALL_URLS, GET_RECENT_PRIVATE_URLS } from "@/graphql/queries";
import { useToast } from "@/components/ui/use-toast";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { FormLoginProps } from "@/types/form";
import { useSearchParams } from "react-router-dom";

export default function FormUserUrl({ setOpenDialog }: FormLoginProps) {
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

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
            variables: { urlData: urlInput, isPrivate: isPrivate },
            onCompleted() {
                toast({
                    variant: "default",
                    description: `${values.name} à bien été ajouté`,
                });
                newUrlForm.reset();
                setOpenDialog(false);
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
                {
                    query: GET_RECENT_PRIVATE_URLS,
                },
            ],
        });
    };

    return (
        <DialogContent className="sm:max-w-md space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">Ajoutez une URL</DialogTitle>
                <DialogDescription>
                    Vous pouvez être l'unique utilisateur y ayant accès en
                    l'ajoutant en privé.
                </DialogDescription>
            </DialogHeader>
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
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isPrivate"
                                onClick={() => setIsPrivate(!isPrivate)}
                            />
                            <label
                                htmlFor="isPrivate"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Ajouter l'URL en privée
                            </label>
                        </div>
                    </div>
                    <DialogFooter className="pt-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="mr-auto"
                            >
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button
                            variant="default"
                            type="submit"
                            disabled={loading}
                            className="ml-auto"
                        >
                            {loading ? "Ajout en cours" : "Ajouter"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
