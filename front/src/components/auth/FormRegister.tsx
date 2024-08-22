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
import { useAddUserMutation } from "@/generated/graphql-types";
import { useToast } from "../ui/use-toast";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

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

    const [registerUser, { loading }] = useAddUserMutation();
    const { toast } = useToast();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        registerUser({
            variables: {
                username: values.username,
                email: values.email,
                password: values.password,
            },
            onCompleted(data) {
                toast({
                    variant: "default",
                    description: `Votre compte a bien été créé`,
                });
                registerForm.reset();
                login(data.createUser);
                navigate("/dashboard");
            },
            onError(error) {
                toast({
                    variant: "destructive",
                    description: `${error}`,
                });
            },
        });
    };

    return (
        <DialogContent className="sm:max-w-md space-y-2">
            <DialogHeader>
                <DialogTitle className="text-2xl">Créer un compte</DialogTitle>
                <DialogDescription>
                    Vous aurez accès à des fonctionnalités avancées de
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
                            {loading ? "Chargement..." : "S'enregistrer"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
