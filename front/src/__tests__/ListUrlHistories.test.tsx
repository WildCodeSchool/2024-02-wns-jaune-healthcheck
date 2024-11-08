import { describe, it, expect, vi } from "vitest";
import ListUrlHistories from "@/components/urlHistories/ListUrlHistories";
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
    refetchHistoriesMock } from "./mocks/getAllHistoriesMock";
import { checkUrlMock, checkUrlErrorMock } from "./mocks/checkUrlMock";

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
                mocks={[paginatesHistoriesMock, urlMock, historyWithResponseMock]} 
                addTypename={false}
            >
                <MemoryRouter>
                    <ListUrlHistories 
                        urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf"
                    />
                </MemoryRouter>
            </MockedProvider>,
        );
        expect(await screen.findByText("En attente...")).toBeInTheDocument();
        expect(
            await screen.findByText("06/11/2024 à 15:17:01"),
        ).toBeInTheDocument();
        expect(await screen.findByText("Statut 200")).toBeInTheDocument();
        expect(
            await screen.findByText("07/11/2024 à 15:17:01"),
        ).toBeInTheDocument();
        expect(await screen.findByText("Statut 404")).toBeInTheDocument();
        const historiesContainer = await screen.findByTestId(
            "histories-container",
        );
        expect(historiesContainer.children).toHaveLength(2);
    });

    it("Should display an error", async () => {

        render(
            <MockedProvider 
                mocks={[urlMock, paginatesHistoriesErrorMock, historyWithResponseMock]} 
                addTypename={false}
            >
                <MemoryRouter>
                    <ListUrlHistories 
                        urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf"
                    />
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
                mocks={[urlMock, paginatesHistoriesEmptyMock, historyWithResponseMock]} 
                addTypename={false}
            >
                <MemoryRouter>
                    <ListUrlHistories 
                        urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf"
                    />
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
                mocks={[paginatesHistoriesMock, urlMock, historyWithResponseMock]} 
                addTypename={false}
            >
                <ListUrlHistories 
                    urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf"
                />
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
                    historyWithResponseMock
                ]}
                addTypename={false}
            >
                <ListUrlHistories 
                    urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf"
                />
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
                    historyWithResponseMock
                ]} 
                addTypename={false}
            >
                <ListUrlHistories 
                    urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf"
                />
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

    it("Should show loading button while checking URL", async () => {

        render(
            <MockedProvider 
                mocks={[
                    urlMock, 
                    paginatesHistoriesMock, 
                    checkUrlMock,
                    refetchHistoriesMock, 
                    historyWithResponseMock
                ]} 
                addTypename={false}
            >
                <ListUrlHistories 
                    urlId="c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf"
                />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("Lancer une analyse")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Lancer une analyse"));

        await waitFor(() => {
            expect(screen.getByText("Chargement...")).toBeInTheDocument();
            expect(screen.getByText("Chargement...")).toBeDisabled();
        });
    });
});
