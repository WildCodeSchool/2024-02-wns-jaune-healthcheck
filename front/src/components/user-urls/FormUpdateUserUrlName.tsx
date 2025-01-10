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
import { updateNameSchema } from "@/constants/validator.ts";
import { useUpdateUrlNameMutation } from "@/generated/graphql-types.ts";
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
import { FormUpdateUserUrlNameProps } from "@/types/form";
import { useSearchParams } from "react-router-dom";
import ButtonLoader from "../custom/ButtonLoader.tsx";

export default function FormUpdateUserUrlName({
    openDialog,
    closeDialog,
    urlId,
    currentName,
}: FormUpdateUserUrlNameProps) {
    const newNameForm = useForm<z.infer<typeof updateNameSchema>>({
        resolver: zodResolver(updateNameSchema),
        mode: "onChange",
        defaultValues: { name: currentName },
    });

    const [searchParams] = useSearchParams();
    const [updateName, { loading }] = useUpdateUrlNameMutation();
    const { toast } = useToast();

    const isSubmitDisabled = newNameForm.watch("name") === currentName;

    const onSubmit = (values: z.infer<typeof updateNameSchema>) => {
        updateName({
            variables: {
                name: values.name,
                id: urlId,
            },
            onCompleted() {
                toast({
                    variant: "default",
                    description: `${currentName} a bien été renommé en ${values.name}.`,
                });
                newNameForm.reset();
                closeDialog();
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

    useEffect(() => {
        if (!openDialog) {
            newNameForm.reset();
        }
    }, [openDialog, newNameForm]);

    return (
        <DialogContent className="sm:max-w-md space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">
                    Modifier le nom de l'URL
                </DialogTitle>
                <DialogDescription>
                    Le nom doit être comprit entre 3 et 55 caractères.
                </DialogDescription>
            </DialogHeader>
            <Form {...newNameForm}>
                <form
                    onSubmit={newNameForm.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col"
                    role="update-url-name-form"
                >
                    <FormField
                        control={newNameForm.control}
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
                                disabled={isSubmitDisabled}
                                variant="default"
                                type="submit"
                                className="ml-auto"
                            >
                                Renommer
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
