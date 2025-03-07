import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import Stripe from "stripe";
import MyContext from "../types/MyContext";
import { Roles, User } from "../entities/User";

@Resolver()
class SubscriptionResolver {
    private stripe: Stripe;
    private tierPriceId: string;
    private premiumPriceId: string;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
        this.tierPriceId = process.env.STRIPE_TIER_PRICE_ID || "";
        this.premiumPriceId = process.env.STRIPE_PREMIUM_PRICE_ID || "";
        if (!this.tierPriceId || !this.premiumPriceId) {
            throw new Error(
                "Stripe price ID is not configured in environment variables",
            );
        }
    }

    private getPriceId(key: string) {
        if (key === Roles.PREMIUM) {
            return this.premiumPriceId;
        } else if (key === Roles.TIER) {
            return this.tierPriceId;
        }

        return;
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
            throw new Error("User unauthenticated");
        }

        try {
            const setupIntent = await this.stripe.setupIntents.create({
                usage: "off_session",
                metadata: { userId: context.payload.id },
                payment_method_types: ["card"],
            });

            return setupIntent.client_secret!;
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.message === "User unauthenticated") {
                throw new Error("Utilisateur non authentifié.");
            } else {
                throw new Error(
                    "Erreur lors de la configuration de l'instance Stripe, veuillez réessayer.",
                );
            }
        }
    }

    @Mutation(() => String)
    async createSubscription(
        @Ctx() context: MyContext,
        @Arg("paymentMethodId") paymentMethodId: string,
        @Arg("priceKey", { nullable: false }) priceKey: string,
    ): Promise<string> {
        if (!context.payload) {
            throw new Error("User unauthenticated");
        }

        const userEmail = context.payload.email;
        const priceId = this.getPriceId(priceKey);

        try {
            const customer = await this.getOrCreateCustomer(
                userEmail,
                context.payload.id,
            );

            await this.stripe.paymentMethods.attach(paymentMethodId, {
                customer: customer.id,
            });

            await this.stripe.customers.update(customer.id, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });

            await this.stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: priceId }],
                payment_settings: {
                    payment_method_types: ["card"],
                    save_default_payment_method: "on_subscription",
                },
                expand: ["latest_invoice.payment_intent"],
            });

            const user = await User.findOneBy({ id: context.payload.id });
            if (!user) {
                throw new Error("User not found");
            }
            user.role = (priceKey as Roles.TIER) || Roles.PREMIUM;
            await user.save();

            return JSON.stringify({
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            });
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.message === "User unauthenticated") {
                throw new Error("Utilisateur non authentifié.");
            } else if (error.message === "User not found") {
                throw new Error("Utilisateur non authorisé.");
            } else {
                throw new Error(
                    "Erreur lors de la création de l'abonnement, veuillez réessayer.",
                );
            }
        }
    }

    @Mutation(() => String)
    async changeSubscriptionTier(
        @Ctx() context: MyContext,
        @Arg("newPriceKey", { nullable: false }) newPriceKey: string,
    ): Promise<string> {
        if (!context.payload) {
            throw new Error("User unauthenticated");
        }

        const priceId = this.getPriceId(newPriceKey);
        if (!priceId) {
            throw new Error("Invalid subscription tier");
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

            if (subscriptions.data.length === 0) {
                throw new Error("No active subscription found");
            }

            const currentSubscription = subscriptions.data[0];

            await this.stripe.subscriptions.update(currentSubscription.id, {
                items: [
                    {
                        id: currentSubscription.items.data[0].id,
                        price: priceId,
                    },
                ],
                proration_behavior: "always_invoice",
            });

            const user = await User.findOneBy({ id: context.payload.id });
            if (!user) {
                throw new Error("User not found");
            }
            user.role = (newPriceKey as Roles.TIER) || Roles.PREMIUM;
            await user.save();

            return JSON.stringify({
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            });
        } catch (error) {
            console.error(`[ERROR] : ${error}`);
            if (error.message === "User unauthenticated") {
                throw new Error("Utilisateur non authentifié.");
            } else if (error.message === "Invalid subscription tier") {
                throw new Error("Le palier demandé n'existe pas.");
            } else if (error.message === "No active subscription found") {
                throw new Error("Aucun abonnement actif n'a été trouvé.");
            } else if (error.message === "User not found") {
                throw new Error("Utilisateur non authorisé.");
            } else {
                throw new Error(
                    "Erreur lors de la modification de l'abonnement, veuillez réessayer.",
                );
            }
        }
    }

    @Mutation(() => String)
    async cancelSubscription(@Ctx() context: MyContext): Promise<string> {
        if (!context.payload) {
            throw new Error("User unauthenticated");
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
            console.error(`[ERROR] : ${error}`);
            if (error.message === "User unauthenticated") {
                throw new Error("Utilisateur non authentifié.");
            } else {
                throw new Error(
                    "Erreur lors de l'annulation de l'abonnement, veuillez réessayer.",
                );
            }
        }
    }
}

export default SubscriptionResolver;
