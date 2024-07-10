import { gql } from "@apollo/client";

export const CREATE_NEW_URL = gql`
    mutation AddUrl($urlData: UrlInput!) {
        addUrl(urlData: $urlData) {
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
