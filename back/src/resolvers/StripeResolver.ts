import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import Stripe from "stripe";
import MyContext from "../types/MyContext";
import { Roles, User } from "../entities/User";

@Resolver()
class StripeResolver {
    private stripe: Stripe;
    private priceId: string;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
        this.priceId = process.env.STRIPE_PREMIUM_PRICE_ID || "";
        if (!this.priceId) {
            throw new Error(
                "Stripe price ID is not configured in environment variables",
            );
        }
    }

    private async getOrCreateCustomer(
        email: string,
        userId: string,
    ): Promise<Stripe.Customer> {
        const customers = await this.stripe.customers.list({
            email: email,
            limit: 1,
        });

        if (customers.data.length > 0) {
            return customers.data[0];
        }

        return await this.stripe.customers.create({
            email: email,
            metadata: { userId: userId },
        });
    }

    @Mutation(() => String)
    async createStripeSetupIntent(@Ctx() context: MyContext): Promise<string> {
        if (!context.payload) {
            throw new Error("User is not authenticated");
        }

        try {
            const setupIntent = await this.stripe.setupIntents.create({
                usage: "off_session",
                metadata: { userId: context.payload.id },
                payment_method_types: ["card"],
            });

            return setupIntent.client_secret!;
        } catch (error) {
            console.error("Stripe setup intent error:", error);
            throw new Error("Failed to create setup intent");
        }
    }

    @Mutation(() => String)
    async createSubscription(
        @Ctx() context: MyContext,
        @Arg("paymentMethodId") paymentMethodId: string,
    ): Promise<string> {
        if (!context.payload) {
            throw new Error("User is not authenticated");
        }

        const userEmail = context.payload.email;
        if (!userEmail) {
            throw new Error("User email is required to create a subscription");
        }

        try {
            // Récupérer ou créer le customer
            let customer = await this.getOrCreateCustomer(
                userEmail,
                context.payload.id,
            );

            // Attacher le payment method au customer
            await this.stripe.paymentMethods.attach(paymentMethodId, {
                customer: customer.id,
            });

            // Définir comme méthode de paiement par défaut
            await this.stripe.customers.update(customer.id, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });

            // Créer l'abonnement
            await this.stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: this.priceId }],
                payment_settings: {
                    payment_method_types: ["card"],
                    save_default_payment_method: "on_subscription",
                },
                expand: ["latest_invoice.payment_intent"],
            });

            // Mettre à jour le rôle de l'utilisateur
            const user = await User.findOneBy({ id: context.payload.id });
            if (!user) {
                throw new Error("User not found");
            }
            user.role = Roles.PREMIUM;
            await user.save();

            return JSON.stringify({
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            });
        } catch (error) {
            console.error("Stripe subscription error:", error);
            throw new Error("Failed to create subscription");
        }
    }

    @Mutation(() => String)
    async cancelSubscription(@Ctx() context: MyContext): Promise<String> {
        if (!context.payload) {
            throw new Error("User is not authenticated");
        }

        try {
            const customer = await this.getOrCreateCustomer(
                context.payload.email,
                context.payload.id,
            );

            const subscriptions = await this.stripe.subscriptions.list({
                customer: customer.id,
                status: "active",
                limit: 1,
            });

            if (subscriptions.data.length > 0) {
                await this.stripe.subscriptions.cancel(
                    subscriptions.data[0].id,
                );

                const user = await User.findOneBy({ id: context.payload.id });
                if (user) {
                    user.role = Roles.FREE;
                    await user.save();

                    return JSON.stringify({
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                    });
                }
            }

            const user = await User.findOneBy({ id: context.payload.id });
            return JSON.stringify({
                id: user?.id,
                email: user?.email,
                username: user?.username,
                role: user?.role,
            });
        } catch (error) {
            console.error("Failed to cancel subscription:", error);
            throw new Error("Failed to cancel subscription");
        }
    }
}

export default StripeResolver;
