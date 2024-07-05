import { gql } from "@apollo/client";

export const GET_ALL_URLS = gql`
    query GetAllURls {
        urls {
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
