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
import { deleteUrlSchema } from "@/constants/validator.ts";
import { useDeleteUrlMutation } from "@/generated/graphql-types.ts";
import {
    GET_ALL_URLS,
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
import { FormUpdateUserUrlDeleteProps } from "@/types/form";
import { useSearchParams } from "react-router-dom";
import ButtonLoader from "../custom/ButtonLoader.tsx";

export default function FormDeleteUserUrl({
    openDialog,
    closeDialog,
    urlId,
    urlPath,
}: FormUpdateUserUrlDeleteProps) {
    const deleteForm = useForm<z.infer<typeof deleteUrlSchema>>({
        resolver: zodResolver(deleteUrlSchema),
        mode: "onChange",
        defaultValues: { path: "" },
    });

    const [searchParams] = useSearchParams();
    const [deleteUrl, { loading }] = useDeleteUrlMutation();
    const { toast } = useToast();

    const isSubmitDisabled = deleteForm.watch("path") !== urlPath;

    const onSubmit = () => {
        deleteUrl({
            variables: {
                id: urlId,
            },
            onCompleted() {
                toast({
                    variant: "default",
                    description: `${urlPath} a bien été supprimé.`,
                });
                deleteForm.reset();
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
            ],
        });
    };

    useEffect(() => {
        if (!openDialog) {
            deleteForm.reset();
        }
    }, [openDialog, deleteForm]);

    return (
        <DialogContent className="space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">Supprimer l'URL</DialogTitle>
                <DialogDescription>
                    Tous les historiques liés à cette URL seront supprimés
                    aussi.
                </DialogDescription>
            </DialogHeader>
            <Form {...deleteForm}>
                <form
                    onSubmit={deleteForm.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col"
                    role="delete-url-form"
                >
                    <FormField
                        control={deleteForm.control}
                        name="path"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez l'URL ici"
                                            role="path"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="italic">
                                        Veuillez confirmer la suppression en
                                        entrant le chemin de l'URL :{" "}
                                        <span className="underline text-red-600 dark:text-rose-400 text-wrap break-all">
                                            {urlPath}
                                        </span>
                                        .
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
                                variant="destructive"
                                type="submit"
                                className="ml-auto"
                            >
                                Supprimer l'URL
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
