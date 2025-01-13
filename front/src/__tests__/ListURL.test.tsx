import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import URLList from "@/components/landing/ListUrl";
import { GET_ALL_URLS } from "@/graphql/queries";

const mockUrls = {
    urls: {
        urls: [
            {
                id: "1",
                name: "Test URL 1",
                path: "/test1",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history1",
                        response: "OK",
                        status_code: 200,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
            {
                id: "2",
                name: "Test URL 2",
                path: "/test2",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history2",
                        response: "Not Found",
                        status_code: 404,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
        ],
        totalPages: 2,
        currentPage: 1,
        previousPage: null,
        nextPage: 2,
    },
};

const mockEmptyUrls = {
    urls: {
        urls: [],
        totalPages: 1,
        currentPage: 1,
        previousPage: null,
        nextPage: null,
    },
};

const mockWithPagination = {
    urls: {
        urls: [
            {
                id: "17",
                name: "Test URL 17",
                path: "/test17",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history17",
                        response: "OK",
                        status_code: 200,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
        ],
        totalPages: 2,
        currentPage: 2,
        previousPage: 1,
        nextPage: null,
    },
};

const sortedUrls = {
    urls: {
        urls: [
            {
                id: "1",
                name: "Test URL 1",
                path: "/test1",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history1",
                        response: "OK",
                        status_code: 200,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
            {
                id: "2",
                name: "Test URL 2",
                path: "/test2",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history2",
                        response: "Not Found",
                        status_code: 404,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
        ],
        totalPages: 2,
        currentPage: 1,
        previousPage: null,
        nextPage: 2,
    },
};

const filteredMockUrls = {
    urls: {
        urls: [
            {
                id: "1",
                name: "Test URL 1",
                path: "/test1",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history1",
                        response: "OK",
                        status_code: 200,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
        ],
        totalPages: 1,
        currentPage: 1,
        previousPage: null,
        nextPage: null,
    },
};

const nextPageUrls = {
    urls: {
        urls: [
            {
                id: "3",
                name: "Test URL 3",
                path: "/test3",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history3",
                        response: "OK",
                        status_code: 200,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
            {
                id: "4",
                name: "Test URL 4",
                path: "/test4",
                private: false,
                createdAt: new Date().toISOString(),
                histories: [
                    {
                        id: "history4",
                        response: "Not Found",
                        status_code: 404,
                        created_at: new Date().toISOString(),
                    },
                ],
            },
        ],
        totalPages: 2,
        currentPage: 2,
        previousPage: 1,
        nextPage: null,
    },
};

describe("Unit tests URLList", () => {
    const defaultMock = {
        request: {
            query: GET_ALL_URLS,
            variables: {
                searchText: "",
                sortField: "",
                currentPage: 1,
                privateUrls: undefined,
            },
        },
        result: { data: mockUrls },
    };

    it("renders URLs", async () => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={[defaultMock]} addTypename={false}>
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );
        await waitFor(() => {
            expect(screen.getByText("Test URL 1")).toBeInTheDocument();
            expect(screen.getByText("Test URL 2")).toBeInTheDocument();
        });
    });

    it("displays correct status for each URL", async () => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={[defaultMock]} addTypename={false}>
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );
        await waitFor(() => {
            expect(screen.getByText("Statut 200")).toBeInTheDocument();
            expect(screen.getByText("Statut 404")).toBeInTheDocument();
        });
    });

    it("Should display error whith error response", async () => {
        const errorMock = {
            request: {
                query: GET_ALL_URLS,
                variables: { searchText: "", sortField: "", currentPage: 1 },
            },
            error: new Error("request error"),
        };
        render(
            <MemoryRouter>
                <MockedProvider mocks={[errorMock]} addTypename={false}>
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );
        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
        });
    });

    it("displays only filtered URL", async () => {
        const filteredMock = {
            request: {
                query: GET_ALL_URLS,
                variables: {
                    searchText: "Test URL 1",
                    sortField: "",
                    currentPage: 1,
                },
            },
            result: { data: filteredMockUrls },
        };

        render(
            <MemoryRouter>
                <MockedProvider
                    mocks={[defaultMock, filteredMock]}
                    addTypename={false}
                >
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => {
            expect(screen.getByText("Test URL 1")).toBeInTheDocument();
            expect(screen.getByText("Test URL 2")).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText("Rechercher..."), {
            target: { value: "Test URL 1" },
        });

        await waitFor(() => {
            expect(screen.getByText("Test URL 1")).toBeInTheDocument();
            expect(screen.queryByText("Test URL 2")).not.toBeInTheDocument();
        });
    });

    it("displays URL when sortField is selected", async () => {
        const sortedMock = {
            request: {
                query: GET_ALL_URLS,
                variables: {
                    searchText: "",
                    sortField: "name",
                    currentPage: 1,
                },
            },
            result: { data: sortedUrls },
        };
        render(
            <MemoryRouter>
                <MockedProvider
                    mocks={[defaultMock, sortedMock]}
                    addTypename={false}
                >
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => {
            expect(screen.getByText("Choisir un tri")).toBeInTheDocument();
            expect(screen.getByText("Test URL 1")).toBeInTheDocument();
            expect(screen.getByText("Test URL 2")).toBeInTheDocument();
        });

        window.HTMLElement.prototype.scrollIntoView = function () {}; // Fix for scrollIntoView error

        fireEvent.click(screen.getByRole("combobox"));

        fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });

        await waitFor(() => {
            expect(screen.getByText("Trier par nom")).toBeInTheDocument();
            expect(screen.getByText("Test URL 1")).toBeInTheDocument();
            expect(screen.getByText("Test URL 2")).toBeInTheDocument();
        });
    });

    it("displays Page 2 URL when next page is clicked", async () => {
        const paginateMock = {
            request: {
                query: GET_ALL_URLS,
                variables: { searchText: "", sortField: "", currentPage: 2 },
            },
            result: { data: nextPageUrls },
        };
        render(
            <MemoryRouter>
                <MockedProvider
                    mocks={[defaultMock, paginateMock]}
                    addTypename={false}
                >
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => {
            expect(screen.getByText("Test URL 1")).toBeInTheDocument();
            expect(screen.getByText("Test URL 2")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Suivant"));

        await waitFor(() => {
            expect(screen.getByText("Test URL 3")).toBeInTheDocument();
            expect(screen.getByText("Test URL 4")).toBeInTheDocument();
        });
    });

    it("should data is empty", async () => {
        const mock = {
            request: {
                query: GET_ALL_URLS,
                variables: { searchText: "", sortField: "", currentPage: 1 },
            },
            result: { data: mockEmptyUrls },
        };
        render(
            <MemoryRouter>
                <MockedProvider mocks={[mock]} addTypename={false}>
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );
        await waitFor(
            () => {
                expect(
                    screen.getByText(/Aucune URL trouvée/i),
                ).toBeInTheDocument();
            },
            { timeout: 2000 },
        );
    });

    it("should data with pagination", async () => {
        const mock = {
            request: {
                query: GET_ALL_URLS,
                variables: { searchText: "", sortField: "", currentPage: 1 },
            },
            result: { data: mockWithPagination },
        };
        render(
            <MemoryRouter>
                <MockedProvider mocks={[mock]} addTypename={false}>
                    <Routes>
                        <Route path="/" element={<URLList />} />
                    </Routes>
                </MockedProvider>
            </MemoryRouter>,
        );
        await waitFor(() => {
            expect(screen.getByText("Précédent")).toBeInTheDocument();
            expect(screen.getByText("Suivant")).toBeInTheDocument();
        });
    });
});
