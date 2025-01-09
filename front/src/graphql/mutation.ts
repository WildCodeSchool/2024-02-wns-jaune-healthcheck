import { gql } from "@apollo/client";

export const CREATE_NEW_URL = gql`
    mutation AddUrl(
        $urlData: UrlInput!
        $isPrivate: Boolean!
        $checkFrequencyId: String
    ) {
        addUrl(
            urlData: $urlData
            isPrivate: $isPrivate
            checkFrequencyId: $checkFrequencyId
        ) {
            name
            path
        }
    }
`;

export const CREATE_NEW_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password)
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const CHECK_URL = gql`
    mutation CheckUrl($id: String!) {
        checkUrl(id: $id) {
            name
            path
        }
    }
`;

export const READ_NOTIFICATION = gql`
    mutation ReadNotification($notificationId: String!) {
        readNotification(notificationId: $notificationId)
    }
`;

export const DELETE_NOTIFICATION = gql`
    mutation DeleteNotification($notificationId: String!) {
        deleteNotification(notificationId: $notificationId)
    }
`;

export const DELETE_ALL_NOTIFICATION = gql`
    mutation DeleteAllNotifications {
        deleteAllNotifications
    }
`;

export const CREATE_STRIPE_SETUP_INTENT = gql`
    mutation CreateStripeSetupIntent {
        createStripeSetupIntent
    }
`;

export const CREATE_SUBSCRIPTION = gql`
    mutation CreateSubscription($paymentMethodId: String!, $priceKey: String!) {
        createSubscription(
            paymentMethodId: $paymentMethodId
            priceKey: $priceKey
        )
    }
`;

export const CHANGE_SUBSCRIPTION_TIER = gql`
    mutation ChangeSubscriptionTier($newPriceKey: String!) {
        changeSubscriptionTier(
            newPriceKey: $newPriceKey
        )
    }
`;

export const CANCEL_SUBSCRIPTION = gql`
    mutation CancelSubscription {
        cancelSubscription
    }
`;
