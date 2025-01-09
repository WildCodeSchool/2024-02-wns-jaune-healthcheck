import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { Button } from '../../ui/button';
import { useCreateSubscriptionMutation } from '@/generated/graphql-types';
import useAuthStore from '@/stores/authStore';
import { CheckoutFormProps } from '@/types/subscription';
import { FormEvent, useState } from 'react';
import { StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { toast } from '../../ui/use-toast';
import { Check, X } from 'lucide-react';
import { Roles } from '@/types/user.ts';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';

export default function CheckoutForm({
                                       showPremium,
                                       closePricing
                                     }: CheckoutFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isPaymentValid, setIsPaymentValid] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const [createSubscription] = useCreateSubscriptionMutation();
  const me = useAuthStore((state) => state.me);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);

      const {error: submitError} = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const {paymentMethod, error: pmError} =
        await stripe.createPaymentMethod({
          elements,
          params: {
            type: 'card'
          }
        });

      if (pmError) {
        throw new Error('Payment error');
      }

      setLoading(false);
      setIsPaymentValid(true);

      const priceKey: string = showPremium ? Roles.PREMIUM : Roles.TIER

      await createSubscription({
        variables: {
          paymentMethodId: paymentMethod.id,
          priceKey: priceKey
        },
        onCompleted: (data) => {
          me(data.createSubscription);
          setTimeout(() => {
            setIsPaymentValid(false);
            closePricing()
          }, 3500);
        },
        onError: () => {
          toast({
            variant: 'destructive',
            description:
              'Erreur, veuillez contacter un administrateur.'
          });
        }
      });
    } catch (error) {
      if (error === 'Payment error') {
        toast({
          variant: 'destructive',
          description: 'Le paiement a échoué, veuillez réessayer.'
        });
      } else {
        toast({
          variant: 'destructive',
          description: 'Erreur lors de la communication avec Stripe'
        });
      }
    }
  };

  const handleFormChange = (event: StripePaymentElementChangeEvent) => {
    setIsFormValid(event.complete);
  };

  return (
    <>
        {!isPaymentValid && (
          <>
            <DialogHeader>
              <DialogTitle>
                Souscrire à la formule {showPremium ? 'Premium' : 'Tier'} ?
              </DialogTitle>
              <DialogDescription>
                Vos avantages seront activés immédiatement.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <PaymentElement onChange={handleFormChange} className="mb-4"/>
                <div className="flex flex-row gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    className="mr-auto"
                    onClick={closePricing}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={!stripe || !isFormValid || loading}
                  >
                    Payer
                  </Button>
                </div>
              </form>
            </DialogFooter>
          </>
        )}

        {isPaymentValid && !loading && (
          <>
            <DialogHeader>
              <DialogTitle>
                Votre paiement a été validé
              </DialogTitle>
              <DialogDescription>
                Vos avantages sont entrain d'être débloqués, veuillez
                patienter quelques secondes.
              </DialogDescription>
            </DialogHeader>

            <ul className="flex flex-col gap-2 py-2 animate-pulse">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500"/>
                {showPremium
                  ? <p className="text-left">
                    Nombre d'URL Privées{' '}
                    <span className="font-bold">Illimité</span>
                  </p>
                  : <p className="text-left">
                    Ajoutez jusqu'à{' '}
                    <span className="font-bold">50</span> URL
                    Privées
                  </p>
                }
              </li>
              <li className="flex items-center gap-2">
                {showPremium
                  ? <Check className="w-4 h-4 text-green-500"/>
                  : <X className="w-4 h-4 text-red-500"/>
                }
                <p className="text-left">
                  Changer l'interval de vérification des URL
                </p>
              </li>
            </ul>
          </>
        )}
    </>
  )
}