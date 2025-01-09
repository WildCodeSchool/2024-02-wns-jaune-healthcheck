import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { SubscriptionProviderProps } from '@/types/subscription';
import { useCreateStripeSetupIntentMutation } from '@/generated/graphql-types';
import { useEffect, useState } from 'react';
import { toast } from '../../ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function StripeProvider({
                                         showTier,
                                         showPremium,
                                         closePricing
                                       }: SubscriptionProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [setupIntentSecret, setSetupIntentSecret] = useState<string>('');

  const [createStripeSetupIntent] = useCreateStripeSetupIntentMutation();

  useEffect(() => {
    const initializeStripeSetupIntent = async () => {
      try {
        setLoading(true);
        const {data} = await createStripeSetupIntent();

        if (data && data.createStripeSetupIntent) {
          setSetupIntentSecret(data.createStripeSetupIntent);
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'Erreur lors de la communication avec Stripe'
        });
      } finally {
        setLoading(false);
      }
    };

    if (showTier || showPremium) {
      initializeStripeSetupIntent();
    }
  }, [showTier, showPremium, createStripeSetupIntent]);

  return (
    <Dialog open={showTier || showPremium} onOpenChange={closePricing}>
      <DialogContent className="w-full">
        {loading && (
          <div className="flex justify-center align-middle w-full min-h-40">
            <Loader2 className="m-auto animate-spin text-primary"/>
          </div>
        )}
        {!loading && setupIntentSecret && (showTier || showPremium) && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: setupIntentSecret,
              paymentMethodCreation: 'manual'
            }}
          >
            <CheckoutForm
              showPremium={showPremium}
              closePricing={closePricing}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
