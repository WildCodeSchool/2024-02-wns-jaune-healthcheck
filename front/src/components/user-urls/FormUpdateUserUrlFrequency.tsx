import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFrequencySchema } from '@/constants/validator.ts';
import { useUpdateCheckFrequencyMutation } from '@/generated/graphql-types.ts';
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog.tsx";
import { FormUpdateUserUrlFrequencyProps } from '@/types/form';
import { useSearchParams } from "react-router-dom";
import ButtonLoader from "../custom/ButtonLoader.tsx";
import SelectCheckFrequency from '@/components/custom/SelectCheckFrequency.tsx';

export default function FormUpdateUserUrlFrequency({
    openDialog,
    closeDialog,
    urlId,
    currentName,
}: FormUpdateUserUrlFrequencyProps) {
    const newFrequencyForm = useForm<z.infer<typeof updateFrequencySchema>>({
        resolver: zodResolver(updateFrequencySchema),
        mode: "onChange",
        defaultValues: { checkFrequency: "" },
    });

    const [searchParams] = useSearchParams();
    const [updateFrequency, { loading }] = useUpdateCheckFrequencyMutation();
    const { toast } = useToast();

    const onSubmit = (values: z.infer<typeof updateFrequencySchema>) => {
        updateFrequency({
            variables: {
                checkFrequencyId: values.checkFrequency,
                id: urlId,
            },
            onCompleted() {
                toast({
                    variant: "default",
                    title: `${currentName}`,
                    description: `Fréquence de vérification mise à jour avec succès.`
                });
                newFrequencyForm.reset();
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
            newFrequencyForm.reset();
        }
    }, [openDialog, newFrequencyForm]);

    return (
        <DialogContent className="sm:max-w-md space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">
                    Modifier la fréquence de vérification de {currentName}
                </DialogTitle>
            </DialogHeader>
            <Form {...newFrequencyForm}>
                <form
                    onSubmit={newFrequencyForm.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col"
                    role="update-url-frequency-form"
                >
                    <FormField
                        control={newFrequencyForm.control}
                        name="checkFrequency"
                        render={({ field }) => {
                            return (
                              <FormItem>
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
                                variant="default"
                                type="submit"
                                className="ml-auto"
                            >
                                Modifier
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
