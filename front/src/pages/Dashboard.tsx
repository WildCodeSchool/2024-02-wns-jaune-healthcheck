import ListUrl from "@/components/dashboard/ListUrl";
import Overview from "@/components/dashboard/Overview";
import FormUserUrl from "@/components/FormUserUrl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ element }: { element: string }) {
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Contenu du Dashboard : Chart, derniers historiques */}
                <Card className="col-span-1 h-min w-2/3 shadow-md shadow-muted">
                    <CardContent>
                        <Command className="mt-6">
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="">
                                    <Dialog
                                        open={openDialog}
                                        onOpenChange={() =>
                                            setOpenDialog(!openDialog)
                                        }
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                className="w-full mb-6"
                                                onClick={() =>
                                                    navigate("/dashboard")
                                                }
                                            >
                                                Ajouter une URL
                                            </Button>
                                        </DialogTrigger>
                                        <FormUserUrl
                                            setOpenDialog={setOpenDialog}
                                            openDialog={openDialog}
                                        />
                                    </Dialog>
                                    <div
                                        onClick={() =>
                                            navigate("/dashboard/overview")
                                        }
                                    >
                                        <CommandItem
                                            className={`${element === "overview" ? "text-indigo-600 underline" : ""} cursor-pointer`}
                                        >
                                            Tableau de bord
                                        </CommandItem>
                                    </div>
                                    <div
                                        onClick={() =>
                                            navigate("/dashboard/urls")
                                        }
                                    >
                                        <CommandItem
                                            className={`${element === "urls" ? "text-indigo-600 underline" : ""} cursor-pointer`}
                                        >
                                            Mes URLs
                                        </CommandItem>
                                    </div>
                                    <div
                                        onClick={() =>
                                            navigate("/dashboard/histories")
                                        }
                                    >
                                        <CommandItem
                                            className={`${element === "histories" ? "text-indigo-600 underline" : ""} cursor-pointer`}
                                        >
                                            Mon historique
                                        </CommandItem>
                                    </div>
                                    <div
                                        onClick={() =>
                                            navigate("/dashboard/subscribe")
                                        }
                                    >
                                        <CommandItem
                                            className={`${element === "subscribe" ? "text-indigo-600 underline" : ""} cursor-pointer`}
                                        >
                                            Abonnement
                                        </CommandItem>
                                    </div>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </CardContent>
                </Card>

                <div className="col-span-2">
                    {element === "overview" && <Overview />}
                    {element === "urls" && <ListUrl />}
                </div>
            </div>
        </>
    );
}
