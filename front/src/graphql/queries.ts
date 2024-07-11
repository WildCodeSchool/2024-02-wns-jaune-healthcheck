import { gql } from "@apollo/client";

export const GET_ALL_URLS = gql`
    query GetAllURls($searchText: String!) {
        urls(searchText: $searchText) {
            id
            name
            path
            createdAt
            histories {
                id
                response
                status_code
            }
        }
    }
`;

export const GET_ONE_URL = gql`
    query Url($urlId: String!) {
        url(id: $urlId) {
            histories {
                id
                response
                status_code
                created_at
            }
            id
            name
            path
        }
    }
`;

export const LOGOUT = gql`
    query Logout {
        logout
    }
`;

export const GET_ME = gql`
    query Me {
        me
    }
`;
