import { GET_ALL_HISTORIES } from "@/graphql/queries";

export const paginatesHistoriesMock = {
    delay: 30,
    request: {
        query: GET_ALL_HISTORIES,
        variables: {
            searchText: "",
            sortField: "",
            currentPage: 1,
            privateHistories: false, // Changé en false pour correspondre aux tests
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: 2,
                previousPage: 0,
                totalPages: 2,
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        created_at: "2024-11-06T14:17:01.648Z",
                        status_code: 200,
                        response: null, // Ajouté car utilisé dans le composant
                        url: {
                            name: "Test",
                            path: "https://google.fr"
                        }
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        created_at: "2024-11-07T14:17:01.369Z",
                        status_code: 404,
                        response: null, // Ajouté car utilisé dans le composant
                        url: {
                            name: "Test",
                            path: "https://google.fr"
                        }
                    },
                ],
            },
        },
    },
};

export const paginatesHistoriesEmptyMock = {
    ...paginatesHistoriesMock,
    result: {
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: null, // Changé car pas de pages suivantes quand vide
                previousPage: null, // Changé car pas de pages précédentes quand vide
                totalPages: 0, // Changé car pas de pages quand vide
                histories: [],
            },
        },
    },
};

export const paginatesHistoriesErrorMock = {
    request: {
        query: GET_ALL_HISTORIES,
        variables: {
            searchText: "",
            sortField: "",
            currentPage: 1,
            privateHistories: false,
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    error: new Error("request error"),
};

export const refetchHistoriesMock = {
    delay: 0,
    request: {
        query: GET_ALL_HISTORIES,
        variables: {
            searchText: "",
            sortField: "",
            currentPage: 1,
            privateHistories: false,
            urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
        },
    },
    result: {
        data: {
            paginatesHistories: {
                currentPage: 1,
                nextPage: 2,
                previousPage: 0,
                totalPages: 2,
                histories: [
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013962",
                        created_at: new Date().toISOString(),
                        status_code: 200,
                        response: null,
                        url: {
                            name: "Test",
                            path: "https://google.fr"
                        }
                    },
                    {
                        id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                        created_at: "2024-11-06T14:17:01.648Z",
                        status_code: 200,
                        response: null,
                        url: {
                            name: "Test",
                            path: "https://google.fr"
                        }
                    },
                    {
                        id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                        created_at: "2024-11-07T14:17:01.369Z",
                        status_code: 404,
                        response: null,
                        url: {
                            name: "Test",
                            path: "https://google.fr"
                        }
                    },
                ],
            },
        },
    },
};