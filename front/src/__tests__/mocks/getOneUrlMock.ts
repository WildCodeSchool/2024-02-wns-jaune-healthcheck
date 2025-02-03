import { GET_ONE_URL } from "@/graphql/queries";

export const urlMock = {
    request: {
        query: GET_ONE_URL,
        variables: {
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            url: {
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        response: "Success",
                        status_code: 200,
                        created_at: "2024-11-06T14:17:01.648Z",
                        content_type: "text/html",
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        response: "Not found",
                        status_code: 404,
                        created_at: "2024-11-07T14:17:01.369Z",
                        content_type: "text/html",
                    },
                ],
                id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                name: "Test",
                path: "https://google.fr",
                private: false,
                user: null,
            },
        },
    },
};
