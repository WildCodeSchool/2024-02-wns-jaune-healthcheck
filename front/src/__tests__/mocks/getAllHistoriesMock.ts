import { GET_ALL_HISTORIES } from "@/graphql/queries";
import { GraphQLError } from "graphql";

export const paginatesHistoriesMock = {
    request: {
        query: GET_ALL_HISTORIES,
        variables: {
            searchText: "",
            sortField: "",
            currentPage: 1,
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: 2,
                previousPage: 1,
                totalPages: 2,
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        created_at: "2024-11-06T14:17:01.648Z",
                        status_code: 200,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        created_at: "2024-11-07T14:17:01.369Z",
                        status_code: 404,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                ],
            },
        },
    },
    newData: () => ({
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: 2,
                previousPage: 1,
                totalPages: 2,
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        created_at: "2024-11-06T14:17:01.648Z",
                        status_code: 200,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        created_at: "2024-11-07T14:17:01.369Z",
                        status_code: 404,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                ],
            },
        },
    }),
};

export const paginatesHistoriesEmptyMock = {
    request: {
        query: GET_ALL_HISTORIES,
        variables: {
            searchText: "",
            sortField: "",
            currentPage: 1,
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: null,
                previousPage: null,
                totalPages: 0,
                histories: [],
            },
        },
    },
    newData: () => ({
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: null,
                previousPage: null,
                totalPages: 0,
                histories: [],
            },
        },
    }),
};

export const paginatesHistoriesErrorMock = {
    request: {
        query: GET_ALL_HISTORIES,
        variables: {
            searchText: "",
            sortField: "",
            currentPage: 1,
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        errors: [new GraphQLError("request error")],
    },
    newData: () => ({
        errors: [new GraphQLError("request error")],
    }),
};

export const refetchHistoriesMock = {
    request: {
        query: GET_ALL_HISTORIES,
        variables: {
            searchText: "",
            sortField: "",
            currentPage: 1,
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: 2,
                previousPage: 1,
                totalPages: 2,
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        created_at: "2024-11-06T14:17:01.648Z",
                        status_code: 200,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        created_at: "2024-11-07T14:17:01.369Z",
                        status_code: 404,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                    {
                        id: "3",
                        created_at: "2024-01-03T00:00:00Z",
                        status_code: 200,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                ],
            },
        },
    },
    newData: () => ({
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: 2,
                previousPage: 1,
                totalPages: 2,
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        created_at: "2024-11-06T14:17:01.648Z",
                        status_code: 200,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        created_at: "2024-11-07T14:17:01.369Z",
                        status_code: 404,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                    {
                        id: "3",
                        created_at: "2024-01-03T00:00:00Z",
                        status_code: 200,
                        content_type: "text/html",
                        url: {
                            id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                            name: "Test",
                            path: "https://google.fr",
                            private: false,
                        },
                    },
                ],
            },
        },
    }),
};
