import { GET_ONE_URL } from "@/graphql/queries";


export const urlMock = {
    delay: 30,
    request: {
        query: GET_ONE_URL,
        variables: {
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            url: {
                id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                name: "Test",
                path: "https://google.fr",
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        created_at: "2024-11-06T14:17:01.648Z",
                        status_code: 200,
                        response: "Success",
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        created_at: "2024-11-07T14:17:01.369Z",
                        status_code: 404,
                        response: "Not found",
                    },
                ],
                private: true,
                user: {
                    id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbb",
                }
            },
        },
        loading: true,
    },
};