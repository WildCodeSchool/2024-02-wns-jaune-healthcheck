import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { subscriptions } from "@/constants/subscription.ts";
import { renderSubscriptionFeatureText } from "@/constants/globalFunction.tsx";
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import FormRegister from '@/components/auth/FormRegister.tsx';
import FormLogin from '@/components/auth/FormLogin.tsx';
import { useState } from 'react';

export function SubscriptionList() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

    return (
      <div className="w-full h-fit m-auto space-y-14 flex flex-col align-middle">
          <section className="flex flex-col lg:flex-row justify-center items-center gap-3">
              {subscriptions.map((subscription) => (
                <Card
                  key={subscription.id}
                  className="w-full xl:w-1/3 h-full flex flex-col"
                >
                    <CardHeader>
                        <CardTitle>{subscription.title}</CardTitle>
                        <CardDescription>
                            {subscription.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-2xl md:text-4xl mb-2">
                            {subscription.price}€{" "}
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    / mois
                                </span>
                        </p>
                        <Separator className="my-6"/>
                        <ul className="flex flex-col gap-2 py-2">
                            {subscription.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                  {feature.included ? (
                                    <Check className="w-4 h-4 text-green-600 dark:text-teal-400"/>
                                  ) : (
                                    <X className="w-4 h-4 text-red-600 dark:text-rose-400"/>
                                  )}
                                  <p className="text-left">
                                      {renderSubscriptionFeatureText(
                                        feature,
                                      )}
                                  </p>
                              </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
              ))}
          </section>
        <section className="mx-auto space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                S'inscrire
              </Button>
            </DialogTrigger>
            <FormRegister />
          </Dialog>
          <Dialog
            open={openDialog}
            onOpenChange={setOpenDialog}
          >
            <DialogTrigger asChild>
              <Button variant="default">
                Connexion
              </Button>
            </DialogTrigger>
            <FormLogin
              setOpenDialog={setOpenDialog}
            />
          </Dialog>
        </section>
      </div>
    );
}
