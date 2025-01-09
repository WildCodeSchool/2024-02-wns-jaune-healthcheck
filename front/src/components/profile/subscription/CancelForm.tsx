import { CancelFormProps } from '@/types/subscription';
import { Button } from '../../ui/button';
import { useCancelSubscriptionMutation } from '@/generated/graphql-types';
import useAuthStore from '@/stores/authStore';
import { FormEvent, useState } from 'react';
import { toast } from '../../ui/use-toast';
import { Check, X } from 'lucide-react';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent
} from '@/components/ui/dialog.tsx';
import ButtonLoader from '@/components/custom/ButtonLoader.tsx';

export default function CancelForm({
                                     showFree,
                                     closePricing
                                   }: CancelFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isCancellationValid, setIsCancellationValid] = useState<boolean>(false);

  const [unsubscribe] = useCancelSubscriptionMutation();
  const me = useAuthStore((state) => state.me);

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setIsCancellationValid(true);

      await unsubscribe({
        onCompleted: (data) => {
          me(data.cancelSubscription);
          setTimeout(() => {
            setIsCancellationValid(true);
            closePricing()
            toast({
              variant: 'default',
              title: 'Au revoir !',
              description: 'Votre abonnement est maintenant désactivé.'
            });
          }, 3500);
        },
        onError: () => {
          toast({
            variant: 'destructive',
            description:
              'Le désabonnement a échoué, veuillez réessayer.'
          });
        }
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Erreur lors de la communication avec Stripe'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={showFree} onOpenChange={closePricing}>
      <DialogContent>

        {showFree && !isCancellationValid && (
          <>
            <DialogHeader>
              <DialogTitle>
                Êtes-vous sur de vouloir résilier votre abonnement ?
              </DialogTitle>
              <DialogDescription>
                Vos avantages seront retirés immediatement.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={closePricing}
                className="md:mr-auto"
              >
                Ne pas résilier
              </Button>

              {!loading ? (
                <Button
                  variant="destructive"
                  disabled={loading || isCancellationValid}
                  onClick={(e) => handleSubmit(e)}
                >
                  Résilier
                </Button>
              ) : (
                <ButtonLoader variant="destructive" />
              )}
            </DialogFooter>
          </>
        )}

        {isCancellationValid && (
          <>
            <DialogHeader>
              <DialogTitle>
                Votre demande de résiliation a été validée
              </DialogTitle>
              <DialogDescription>
                Vos avantages sont entrain d'être retirés, veuillez
                patienter quelques secondes.
              </DialogDescription>
            </DialogHeader>

            <ul className="flex flex-col gap-2 pt-2 animate-pulse">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500"/>
                <p className="text-left">
                  Ajoutez jusqu'à{' '}
                  <span className="font-bold">5</span> URL
                  Privées
                </p>
              </li>
              <li className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500"/>
                <p className="text-left">
                  Changer l'interval de vérification des URL
                </p>
              </li>
            </ul>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}