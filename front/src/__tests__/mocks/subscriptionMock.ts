import { Roles } from "@/constants/role";
import {
    CREATE_SUBSCRIPTION,
    CHANGE_SUBSCRIPTION_TIER,
    CANCEL_SUBSCRIPTION,
    CREATE_STRIPE_SETUP_INTENT,
} from "@/graphql/mutation";

const successMocks = [
    // Setup Intent
    {
        request: {
            query: CREATE_STRIPE_SETUP_INTENT,
        },
        result: {
            data: {
                createStripeSetupIntent: "seti_mock_secret_123",
            },
        },
    },
    // Abonnement Tier réussi
    {
        request: {
            query: CREATE_SUBSCRIPTION,
            variables: {
                paymentMethodId: "pm_mock123",
                priceKey: Roles.TIER,
            },
        },
        result: {
            data: {
                createSubscription: JSON.stringify({
                    id: "user_123",
                    email: "test@example.com",
                    username: "testuser",
                    role: Roles.TIER,
                }),
            },
        },
    },
    // Abonnement Premium réussi
    {
        request: {
            query: CREATE_SUBSCRIPTION,
            variables: {
                paymentMethodId: "pm_mock123",
                priceKey: Roles.PREMIUM,
            },
        },
        result: {
            data: {
                createSubscription: JSON.stringify({
                    id: "user_123",
                    email: "test@example.com",
                    username: "testuser",
                    role: Roles.PREMIUM,
                }),
            },
        },
    },
    // Changement vers Premium réussi
    {
        request: {
            query: CHANGE_SUBSCRIPTION_TIER,
            variables: {
                newPriceKey: Roles.PREMIUM,
            },
        },
        result: {
            data: {
                changeSubscriptionTier: JSON.stringify({
                    id: "user_123",
                    email: "test@example.com",
                    username: "testuser",
                    role: Roles.PREMIUM,
                }),
            },
        },
    },
    // Changement vers Tier réussi
    {
        request: {
            query: CHANGE_SUBSCRIPTION_TIER,
            variables: {
                newPriceKey: Roles.TIER,
            },
        },
        result: {
            data: {
                changeSubscriptionTier: JSON.stringify({
                    id: "user_123",
                    email: "test@example.com",
                    username: "testuser",
                    role: Roles.TIER,
                }),
            },
        },
    },
    // Annulation réussie
    {
        request: {
            query: CANCEL_SUBSCRIPTION,
        },
        result: {
            data: {
                cancelSubscription: JSON.stringify({
                    id: "user_123",
                    email: "test@example.com",
                    username: "testuser",
                    role: Roles.FREE,
                }),
            },
        },
    },
];

export default successMocks;
