import { GET_HISTORY_WITH_RESPONSE } from "@/graphql/queries";

export const historyWithResponseMock = {
    request: {
        query: GET_HISTORY_WITH_RESPONSE,
        variables: {
            historyWithResponseUrlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            historyWithResponse: {
                response: "Success",
                id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                status_code: 200,
                content_type: "text/html",
            },
        },
    },
};
