export type SubscriptionProviderProps = {
    showCheckout: boolean;
    setShowCheckout: (value: boolean) => void;
    showCancel: boolean;
    setShowCancel: (value: boolean) => void;
};

export type CheckoutProviderProps = {
    showCheckout: boolean;
    setShowCheckout: (value: boolean) => void;
};

export type CancelProviderProps = {
    showCancel: boolean;
    setShowCancel: (value: boolean) => void;
};
