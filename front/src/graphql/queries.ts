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
            private
            user {
                id
            }
        }
    }
`;

export const GET_ALL_HISTORIES = gql`
    query PaginatesHistories(
        $privateHistories: Boolean
        $currentPage: Float!
        $searchText: String
        $sortField: String
        $urlId: String
    ) {
        paginatesHistories(
            privateHistories: $privateHistories
            currentPage: $currentPage
            searchText: $searchText
            sortField: $sortField
            urlId: $urlId
        ) {
            currentPage
            nextPage
            previousPage
            totalPages
            histories {
                id
                created_at
                status_code
                url {
                    id
                    name
                    path
                }
            }
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

export const GET_NOTIFICATIONS = gql`
    query Notifications {
        notifications {
            id
            is_read
            created_at
            content
        }
    }
`;

export const GET_HISTORY_WITH_RESPONSE = gql`
    query HistoryWithResponse($historyWithResponseUrlId: String!) {
        historyWithResponse(urlId: $historyWithResponseUrlId) {
            response
            id
            status_code
            content_type
        }
    }
`;

export const GET_ALL_USERS = gql`
    query GetAllUsers {
        getAllUsers
    }
`;

export const GET_PRIVATE_HISTORIES_BY_STATUS = gql`
    query PrivateHistoriesByStatus {
        privateHistoriesByStatus {
            statusCode
            countHtml
            countJson
        }
    }
`;

export const GET_PRIVATE_URLS_BY_STATUS = gql`
    query PrivatesUrlsByStatus($timeFrame: String!) {
        privatesUrlsByStatus(timeFrame: $timeFrame) {
            dateTime
            offLine
            onLine
        }
    }
`;