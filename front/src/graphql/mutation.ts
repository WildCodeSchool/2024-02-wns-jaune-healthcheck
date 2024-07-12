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

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const CREATE_NEW_PRIVATE_URL = gql`
    mutation AddUserUrl($urlData: UrlInput!, $isPrivate: Boolean!) {
        addUserUrl(urlData: $urlData, isPrivate: $isPrivate) {
            name
            path
        }
    }
`;
