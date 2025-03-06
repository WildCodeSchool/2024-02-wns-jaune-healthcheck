import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUrlSchema } from "@/constants/validator.ts";
import { useAddUrlMutation } from "@/generated/graphql-types.ts";
import {
    GET_ALL_URLS,
    GET_RECENT_PRIVATE_URLS,
    GET_PRIVATE_SUM_URLS,
    GET_RECENT_PRIVATE_HISTORIES,
    GET_PRIVATE_URLS_BY_STATUS,
    GET_PRIVATE_HISTORIES_BY_STATUS,
} from "@/graphql/queries.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog.tsx";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox.tsx";
import { FormAddUserUrlProps } from "@/types/form";
import { useSearchParams } from "react-router-dom";
import SelectCheckFrequency from "../custom/SelectCheckFrequency.tsx";
import ButtonLoader from "../custom/ButtonLoader.tsx";
import useAuthStore from "@/stores/authStore.tsx";
import { Roles } from "@/constants/role.ts";

export default function FormUserUrl({
    openDialog,
    setOpenDialog,
}: FormAddUserUrlProps) {
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [isCheckFrequency, setIsCheckFrequency] = useState<boolean>(false);

    const newUrlForm = useForm<z.infer<typeof newUrlSchema>>({
        resolver: zodResolver(newUrlSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            path: "",
            checkFrequency: "",
        },
    });

    const user = useAuthStore((state) => state.user);
    const isPremium = user.role === Roles.PREMIUM;

    // Clean form on modal close
    useEffect(() => {
        if (!openDialog) {
            setIsPrivate(false);
            setIsCheckFrequency(false);
            newUrlForm.reset();
        }
    }, [openDialog, newUrlForm]);

    const [searchParams] = useSearchParams();
    const [createNewUrl, { loading }] = useAddUrlMutation();
    const { toast } = useToast();

    const onSubmit = (values: z.infer<typeof newUrlSchema>) => {
        const urlInput = {
            name: values.name,
            path: values.path,
        };

        createNewUrl({
            variables: {
                urlData: urlInput,
                isPrivate: isPrivate,
                checkFrequencyId: values.checkFrequency,
            },
            onCompleted() {
                toast({
                    variant: "default",
                    description: `${values.name} a bien été ajoutée`,
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
                {
                    query: GET_RECENT_PRIVATE_HISTORIES,
                },
                {
                    query: GET_PRIVATE_URLS_BY_STATUS,
                },
                {
                    query: GET_PRIVATE_HISTORIES_BY_STATUS,
                },
                {
                    query: GET_PRIVATE_SUM_URLS,
                },
            ],
        });
    };

    return (
        <DialogContent className="sm:max-w-md space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">Ajouter une URL</DialogTitle>
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
                                onCheckedChange={() => {
                                    setIsPrivate(!isPrivate);
                                    setIsCheckFrequency(!isCheckFrequency);
                                }}
                            />
                            <label
                                htmlFor="isPrivate"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Ajouter l'URL en privée
                            </label>
                        </div>
                        {isCheckFrequency && isPremium && (
                            <FormField
                                control={newUrlForm.control}
                                name="checkFrequency"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>
                                            Fréquence de vérification de l'url
                                        </FormLabel>
                                        <SelectCheckFrequency
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        />
                                        <FormDescription className="italic">
                                            Fréquence journalière par défaut
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
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
                        {!loading ? (
                            <Button
                                variant="default"
                                type="submit"
                                className="ml-auto"
                            >
                                Ajouter
                            </Button>
                        ) : (
                            <ButtonLoader variant="default" />
                        )}
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
