import { describe, it, expect, vi } from "vitest";
import ListUrlHistories from "@/components/url-histories/ListUrlHistories";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "@/components/ui/use-toast";
import { urlMock } from "./mocks/getOneUrlMock";
import { historyWithResponseMock } from "./mocks/getHistoryWithReponseMock";
import {
    paginatesHistoriesMock,
    paginatesHistoriesEmptyMock,
    paginatesHistoriesErrorMock,
    refetchHistoriesMock,
} from "./mocks/getAllHistoriesMock";
import { checkUrlMock, checkUrlErrorMock } from "./mocks/checkUrlMock";
import { GET_ALL_HISTORIES } from "@/graphql/queries";

vi.mock("@/components/ui/use-toast", () => ({
    toast: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" }),
        useSearchParams: () => {
            const searchParams = new URLSearchParams({
                searchUrl: "",
                sortField: "",
                currentPage: "1",
            });
            return [searchParams];
        },
    };
});

describe("Tests ListUrlHistories", () => {
    it("Should display histories list and should display loading", async () => {
        render(
            <MockedProvider
                mocks={[
                    paginatesHistoriesMock,
                    urlMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <MemoryRouter>
                    <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
                </MemoryRouter>
            </MockedProvider>,
        );

        expect(await screen.findByText("En attente...")).toBeInTheDocument();

        const historiesContainer = await screen.findByTestId(
            "histories-container",
        );
        expect(historiesContainer).toBeInTheDocument();

        await waitFor(() => {
            expect(historiesContainer.children.length).toBeGreaterThan(0);
        });

        const statusElements = screen.getAllByText(/Statut (200|404)/);
        expect(statusElements).toHaveLength(2);

        const dateElements = screen.getAllByText(
            /\d{1,2}\/\d{1,2}\/\d{4}\s+à\s+\d{1,2}:\d{2}:\d{2}(?:\s*(?:AM|PM)?)/i,
        );
        expect(dateElements).toHaveLength(2);
        expect(historiesContainer.children).toHaveLength(2);
    });

    it("Should display an error", async () => {
        render(
            <MockedProvider
                mocks={[
                    urlMock,
                    paginatesHistoriesErrorMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <MemoryRouter>
                    <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
                </MemoryRouter>
            </MockedProvider>,
        );

        expect(
            await screen.findByText("Erreur : request error"),
        ).toBeInTheDocument();
    });

    it("Should display without histories", async () => {
        render(
            <MockedProvider
                mocks={[
                    urlMock,
                    paginatesHistoriesEmptyMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <MemoryRouter>
                    <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
                </MemoryRouter>
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.queryByText("En attente...")).not.toBeInTheDocument();
        });

        const historiesContainer = screen.queryByTestId("histories-container");
        expect(historiesContainer).toBeInTheDocument();
    });

    it("Should render the 'Lancer une analyse' button", async () => {
        render(
            <MockedProvider
                mocks={[
                    paginatesHistoriesMock,
                    urlMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("Lancer une analyse")).toBeInTheDocument();
        });
    });

    it("Should call checkUrl mutation when 'Lancer une analyse' button is clicked", async () => {
        render(
            <MockedProvider
                mocks={[
                    urlMock,
                    paginatesHistoriesMock,
                    checkUrlMock,
                    refetchHistoriesMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("Lancer une analyse")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Lancer une analyse"));

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith({
                title: "L'URL a été vérifiée avec succès",
            });
        });
    });

    it("Should show error toast when checkUrl mutation fails", async () => {
        render(
            <MockedProvider
                mocks={[
                    urlMock,
                    paginatesHistoriesMock,
                    checkUrlErrorMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("Lancer une analyse")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Lancer une analyse"));

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith({
                title: "Error checking URL",
                description: "An error occurred while checking the URL.",
                variant: "destructive",
            });
        });
    });

    it("Should disable button while checking URL", async () => {
        const paginatesHistoriesRepeatedMock = {
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
                                url: {
                                    id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                                    name: "Test",
                                    path: "https://google.fr",
                                },
                            },
                            {
                                id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                                created_at: "2024-11-07T14:17:01.369Z",
                                status_code: 404,
                                url: {
                                    id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                                    name: "Test",
                                    path: "https://google.fr",
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
                                url: {
                                    id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                                    name: "Test",
                                    path: "https://google.fr",
                                },
                            },
                            {
                                id: "a7d602c1-8068-4f2b-baa8-d2fc9e2253d6",
                                created_at: "2024-11-07T14:17:01.369Z",
                                status_code: 404,
                                url: {
                                    id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                                    name: "Test",
                                    path: "https://google.fr",
                                },
                            },
                        ],
                    },
                },
            }),
        };

        render(
            <MockedProvider
                mocks={[
                    urlMock,
                    paginatesHistoriesRepeatedMock,
                    checkUrlMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
            </MockedProvider>,
        );

        const analyseButton = await screen.findByText("Lancer une analyse");
        expect(analyseButton).toBeInTheDocument();

        fireEvent.click(analyseButton);

        await waitFor(() => {
            const loader = screen.getByTestId("loading-button");
            expect(loader).toBeInTheDocument();
            expect(loader).toBeDisabled();
        });
    });

    it("should data is empty", async () => {
        const paginatesHistoriesRepeatedMock = {
            request: {
                query: GET_ALL_HISTORIES,
                variables: {
                    searchText: "",
                    sortField: "",
                    currentPage: 1,
                    privateHistories: true,
                    urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                },
            },
            result: {
                data: {
                    paginatesHistories: {
                        currentPage: 1,
                        nextPage: null,
                        previousPage: null,
                        totalPages: 1,
                        histories: [],
                    },
                },
            },
        };
        render(
            <MockedProvider
                mocks={[
                    urlMock,
                    paginatesHistoriesRepeatedMock,
                    checkUrlMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.getByText("Aucun historique")).toBeInTheDocument();
        });
    });

    it("should data with pagination", async () => {
        const paginatesHistoriesRepeatedMock = {
            request: {
                query: GET_ALL_HISTORIES,
                variables: {
                    searchText: "",
                    sortField: "",
                    currentPage: 1,
                    privateHistories: true,
                    urlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                },
            },
            result: {
                data: {
                    paginatesHistories: {
                        currentPage: 2,
                        nextPage: null,
                        previousPage: 1,
                        totalPages: 2,
                        histories: [
                            {
                                id: "98cd3ea2-e9c0-449a-bedb-d45b0b013961",
                                created_at: "2024-11-06T14:17:01.648Z",
                                status_code: 200,
                                url: {
                                    id: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
                                    name: "Test",
                                    path: "https://google.fr",
                                },
                            },
                        ],
                    },
                },
            },
        };
        render(
            <MockedProvider
                mocks={[
                    urlMock,
                    paginatesHistoriesRepeatedMock,
                    checkUrlMock,
                    historyWithResponseMock,
                ]}
                addTypename={false}
            >
                <ListUrlHistories urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf" />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.getByText("Précédent")).toBeInTheDocument();
            expect(screen.getByText("Suivant")).toBeInTheDocument();
        });
    });
});
