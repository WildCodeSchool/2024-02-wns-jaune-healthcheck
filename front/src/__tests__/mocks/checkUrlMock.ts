import { CHECK_URL } from "@/graphql/mutation";

export const checkUrlMock = {
    request: {
        query: CHECK_URL,
        variables: {
            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            checkUrl: {
                name: "Test",
                path: "https://google.fr",
                private: false,
            },
        },
    },
};

export const checkUrlErrorMock = {
    request: {
        query: CHECK_URL,
        variables: {
            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    error: new Error("An error occurred"),
};
