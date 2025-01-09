export type PricingStates = {
    free: boolean;
    tier: boolean;
    premium: boolean;
};

export type UpdateTierStates = {
    tier: boolean;
    premium: boolean;
};

export type StripeProviderProps = {
    showTier: boolean;
    showPremium: boolean;
    closePricing: () => void;
};

export type CheckoutFormProps = {
    showPremium: boolean;
    closePricing: () => void;
};

export type UpdateFormProps = {
    tier: boolean;
    premium: boolean;
    closeUpdateTier: () => void;
};

export type CancelFormProps = {
    showFree: boolean;
    closePricing: () => void;
};
