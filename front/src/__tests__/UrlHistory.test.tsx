import { describe, it, expect } from "vitest";
import UrlHistory from "../pages/UrlHistory";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ONE_URL } from "@/graphql/queries";

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
                                created_at: "2023-07-09",
                                status_code: 200,
                                response: "Success",
                            },
                            {
                                id: "82075add-02ed-4a2e-9127-1a0e70df268g",
                                created_at: "2023-07-08",
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
                <UrlHistory />
            </MockedProvider>,
        );
        expect(await screen.findByText("En attente...")).toBeInTheDocument();
        expect(
            await screen.findByText("Date : 09/07/2023 à 02:00:00"),
        ).toBeInTheDocument();
        expect(await screen.findByText("200")).toBeInTheDocument();
        expect(await screen.findByText("Success")).toBeInTheDocument();
        expect(
            await screen.findByText("Date : 08/07/2023 à 02:00:00"),
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
                <UrlHistory />
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
                <UrlHistory />
            </MockedProvider>,
        );
        expect(await screen.findByText("En attente...")).toBeInTheDocument();
        const historiesContainer = await screen.findByTestId(
            "histories-container",
        );
        expect(historiesContainer.children).toHaveLength(0);
    });
});
