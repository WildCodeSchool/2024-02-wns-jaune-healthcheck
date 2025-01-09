export type SubscriptionProviderProps = {
    showTier: boolean;
    showPremium: boolean;
    closePricing: () => void;
};

export type CheckoutProviderProps = {
    showPremium: boolean;
    closePricing: () => void;
};

export type CancelProviderProps = {
    showFree: boolean;
    closePricing: () => void;
};

export type PricingStates = {
    free: boolean;
    tier: boolean;
    premium: boolean;
};
