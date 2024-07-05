import { gql } from "@apollo/client";

export const CREATE_NEW_URL = gql`
    mutation AddUrl($urlData: UrlInput!) {
        addUrl(urlData: $urlData) {
            name
            path
        }
    }
`;
