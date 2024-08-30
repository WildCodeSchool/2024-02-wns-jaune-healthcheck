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
