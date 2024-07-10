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
import { registerSchema } from "@/constants/validator";

export default function FormRegister() {
    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values);
    };

    return (
        <DialogContent className="sm:max-w-md space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">Créer un compte</DialogTitle>
                <DialogDescription>
                    Vous aurez accès à des fonctionnalitées avancées de
                    monitoring.
                </DialogDescription>
            </DialogHeader>
            <Form {...registerForm}>
                <form
                    onSubmit={registerForm.handleSubmit(onSubmit)}
                    className="space-y-6 flex flex-col"
                    role="register-form"
                >
                    <div className="space-y-4">
                        <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Pseudo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Choisissez votre pseudo"
                                                role="username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={registerForm.control}
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
                            control={registerForm.control}
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="mr-auto"
                            >
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit">S'enregistrer</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
