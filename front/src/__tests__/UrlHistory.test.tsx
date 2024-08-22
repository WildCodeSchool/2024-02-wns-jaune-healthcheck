import { describe, it, expect, vi } from "vitest";
import UrlHistory from "../pages/UrlHistory";
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import { GET_ONE_URL } from "@/graphql/queries";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CHECK_URL } from "@/graphql/mutation";
import { toast } from "@/components/ui/use-toast";

vi.mock("@/components/ui/use-toast", () => ({
    toast: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "3312231f-020b-47b1-9fd5-f3747e8bc782" }),
    };
});

describe("Tests UrlHistory", () => {
    it("Should display histories list and should display loading", async () => {
        const urlMock = {
            delay: 30,
            request: {
                query: GET_ONE_URL,
                variable: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    url: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        name: "Test URL",
                        path: "/test-path",
                        histories: [
                            {
                                id: "82075add-02ed-4a2e-9127-1a0e70df060d",
                                created_at: "2023-08-21T13:10:29.911Z",
                                status_code: 200,
                                response: "Success",
                            },
                            {
                                id: "82075add-02ed-4a2e-9127-1a0e70df268g",
                                created_at: "2024-08-21T13:10:29.911Z",
                                status_code: 404,
                                response: "Not Found",
                            },
                        ],
                    },
                },
                loading: true,
            },
        };
        render(
            <MockedProvider mocks={[urlMock]} addTypename={false}>
                <MemoryRouter>
                    <UrlHistory />
                </MemoryRouter>
            </MockedProvider>,
        );
        expect(await screen.findByText("En attente...")).toBeInTheDocument();
        expect(
            await screen.findByText("Date : 21/08/2023 à 15:10:29"),
        ).toBeInTheDocument();
        expect(await screen.findByText("200")).toBeInTheDocument();
        expect(await screen.findByText("Success")).toBeInTheDocument();
        expect(
            await screen.findByText("Date : 21/08/2024 à 15:10:29"),
        ).toBeInTheDocument();
        expect(await screen.findByText("404")).toBeInTheDocument();
        expect(await screen.findByText("Not Found")).toBeInTheDocument();
        const historiesContainer = await screen.findByTestId(
            "histories-container",
        );
        expect(historiesContainer.children).toHaveLength(2);
    });

    it("Should display an error", async () => {
        const urlMock = {
            delay: 30,
            request: {
                query: GET_ONE_URL,
                variable: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            error: new Error("request error"),
        };
        render(
            <MockedProvider mocks={[urlMock]} addTypename={false}>
                <MemoryRouter>
                    <UrlHistory />
                </MemoryRouter>
            </MockedProvider>,
        );

        expect(
            await screen.findByText("Erreur : request error"),
        ).toBeInTheDocument();
    });

    it("Should display without histories", async () => {
        const urlMock = {
            delay: 30,
            request: {
                query: GET_ONE_URL,
                variable: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    url: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        name: "Test URL",
                        path: "/test-path",
                        histories: [],
                    },
                },
                loading: true,
            },
        };
        render(
            <MockedProvider mocks={[urlMock]} addTypename={false}>
                <MemoryRouter>
                    <UrlHistory />
                </MemoryRouter>
            </MockedProvider>,
        );
        expect(await screen.findByText("En attente...")).toBeInTheDocument();
        const historiesContainer = await screen.findByTestId(
            "histories-container",
        );
        expect(historiesContainer.children).toHaveLength(0);
    });
    it("Should render the 'Lancer une analyse' button", async () => {
        const urlMock = {
            request: {
                query: GET_ONE_URL,
                variables: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    url: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        name: "Test URL",
                        path: "/test-path",
                        histories: [],
                    },
                },
            },
        };

        render(
            <MockedProvider mocks={[urlMock]} addTypename={false}>
                <UrlHistory />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("Lancer une analyse")).toBeInTheDocument();
        });
    });

    it("Should call checkUrl mutation when 'Lancer une analyse' button is clicked", async () => {
        const urlMock = {
            request: {
                query: GET_ONE_URL,
                variables: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    url: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        name: "Test URL",
                        path: "/test-path",
                        histories: [],
                    },
                },
            },
        };

        const checkUrlMock = {
            request: {
                query: CHECK_URL,
                variables: {
                    id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    checkUrl: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        lastCheckDate: new Date().toISOString(),
                    },
                },
            },
        };

        const refetchMock = {
            request: {
                query: GET_ONE_URL,
                variables: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    url: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        name: "Test URL",
                        path: "/test-path",
                        histories: [
                            {
                                id: "new-history-id",
                                response: "New check",
                                status_code: 200,
                                created_at: new Date().toISOString(),
                            },
                        ],
                    },
                },
            },
        };

        render(
            <MockedProvider
                mocks={[urlMock, checkUrlMock, refetchMock]}
                addTypename={false}
            >
                <UrlHistory />
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

        await waitFor(() => {
            expect(screen.getByText("New check")).toBeInTheDocument();
        });
    });

    it("Should show error toast when checkUrl mutation fails", async () => {
        const urlMock = {
            request: {
                query: GET_ONE_URL,
                variables: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    url: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        name: "Test URL",
                        path: "/test-path",
                        histories: [],
                    },
                },
            },
        };

        const checkUrlMock = {
            request: {
                query: CHECK_URL,
                variables: {
                    id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            error: new Error("An error occurred"),
        };

        render(
            <MockedProvider mocks={[urlMock, checkUrlMock]} addTypename={false}>
                <UrlHistory />
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
        const urlMock = {
            request: {
                query: GET_ONE_URL,
                variables: {
                    urlId: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    url: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        name: "Test URL",
                        path: "/test-path",
                        histories: [],
                    },
                },
            },
        };

        const checkUrlMock = {
            request: {
                query: CHECK_URL,
                variables: {
                    id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                },
            },
            result: {
                data: {
                    checkUrl: {
                        id: "3312231f-020b-47b1-9fd5-f3747e8bc782",
                        lastCheckDate: new Date().toISOString(),
                    },
                },
            },
        };

        render(
            <MockedProvider mocks={[urlMock, checkUrlMock]} addTypename={false}>
                <UrlHistory />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("Lancer une analyse")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Lancer une analyse"));

        await waitFor(() => {
            expect(screen.getByText("Analyse...")).toBeInTheDocument();
            expect(screen.getByText("Analyse...")).toBeDisabled();
        });
    });
});
