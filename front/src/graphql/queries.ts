import { gql } from "@apollo/client";

export const GET_ALL_URLS = gql`
    query GetAllURls(
        $currentPage: Float!
        $sortField: String!
        $searchText: String!
        $privateUrls: Boolean
    ) {
        urls(
            currentPage: $currentPage
            sortField: $sortField
            searchText: $searchText
            privateUrls: $privateUrls
        ) {
            urls {
                id
                name
                path
                createdAt
                histories {
                    id
                    response
                    status_code
                    created_at
                }
            }
            totalPages
            currentPage
            previousPage
            nextPage
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

export const GET_RECENT_PRIVATE_URLS = gql`
    query RecentPrivateUrls {
        recentPrivateUrls {
            id
            name
            path
            createdAt
            histories {
                id
                status_code
                created_at
            }
        }
    }
`;

export const GET_RECENT_PRIVATE_HISTORIES = gql`
    query RecentPrivateHistories {
        recentPrivateHistories {
            id
            status_code
            created_at
            url {
                name
                path
            }
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

export const GET_CHECK_FREQUENCIES = gql`
    query CheckFrequencies {
        checkFrequencies {
            id
            interval
        }
    }
`;
