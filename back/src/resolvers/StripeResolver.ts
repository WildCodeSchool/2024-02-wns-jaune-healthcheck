import { Resolver, Mutation, Ctx } from "type-graphql";
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

    @Mutation(() => String)
    async createSubscription(@Ctx() context: MyContext): Promise<string> {
        if (!context.payload) {
            throw new Error("User is not authenticated");
        }

        const userEmail = context.payload.email;

        if (!userEmail) {
            throw new Error("User email is required to create a subscription");
        }

        try {
            const customers = await this.stripe.customers.list({
                email: userEmail,
                limit: 1,
            });
            let customer = customers.data[0];

            if (!customer) {
                customer = await this.stripe.customers.create({
                    email: userEmail,
                    metadata: { userId: context.payload.id },
                });
            }

            const subscription = await this.stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: this.priceId }],
                payment_behavior: "default_incomplete",
                expand: ["latest_invoice.payment_intent"],
            });

            let clientSecret = "";

            if (
                subscription.latest_invoice &&
                typeof subscription.latest_invoice !== "string" &&
                "payment_intent" in subscription.latest_invoice &&
                subscription.latest_invoice.payment_intent
            ) {
                const paymentIntent = subscription.latest_invoice
                    .payment_intent as Stripe.PaymentIntent;
                clientSecret = paymentIntent.client_secret || "";
            }

            const user = await User.findOneBy({ id: context.payload.id });
            if (!user) {
                throw new Error("User not found");
            }

            user.role = Roles.PREMIUM;
            await user.save();

            return clientSecret;
        } catch (error) {
            console.error("Stripe subscription error:", error);
            throw new Error("Failed to create subscription");
        }
    }
}
export default StripeResolver;
