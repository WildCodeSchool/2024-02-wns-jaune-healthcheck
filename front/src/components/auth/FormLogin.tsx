import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/constants/validator";
import { useLoginMutation } from "@/generated/graphql-types";

type FormLoginProps = {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FormLogin({ setOpenDialog }: FormLoginProps) {
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [login, { loading }] = useLoginMutation();

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        login({
            variables: {
                email: values.email,
                password: values.password,
            },
            onCompleted() {
                console.log("Connexion réussie");
                setOpenDialog(false);
            },
            onError(error) {
                console.log(error);
            },
        });
    };

    return (
        <DialogContent className="sm:max-w-md space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">Connexion</DialogTitle>
                <DialogDescription>
                    Profitez de fonctionnalités de monitoring avancées.
                </DialogDescription>
            </DialogHeader>
            <Form {...loginForm}>
                <form
                    onSubmit={loginForm.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col"
                    role="register-form"
                >
                    <div className="space-y-4">
                        <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: healthchecker@gmail.com"
                                                type="email"
                                                role="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                type="password"
                                                role="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
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
                        <Button type="submit" disabled={loading}>
                            {loading ? "Chargement..." : "Connexion"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
