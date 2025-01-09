import Dashboard from "@/pages/Dashboard";
import { describe, it, expect } from "vitest";
import {
    GET_RECENT_PRIVATE_HISTORIES,
    GET_RECENT_PRIVATE_URLS,
} from "@/graphql/queries";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Tests RecentUrls", () => {
    it("sould recentUrls is empty", async () => {
        const mock = {
            request: {
                query: GET_RECENT_PRIVATE_URLS,
            },
            result: {
                data: {
                    recentPrivateUrls: [],
                },
            },
        };
        render(
            <MemoryRouter>
                <MockedProvider mocks={[mock]} addTypename={false}>
                    <Dashboard />
                </MockedProvider>
            </MemoryRouter>,
        );
        await waitFor(() => {
            expect(screen.getByText("Aucune URL")).toBeInTheDocument();
        });
    });

    it("sould recentHistories is empty", async () => {
        const mock = {
            request: {
                query: GET_RECENT_PRIVATE_HISTORIES,
            },
            result: {
                data: {
                    recentPrivateHistories: [],
                },
            },
        };
        render(
            <MemoryRouter>
                <MockedProvider mocks={[mock]} addTypename={false}>
                    <Dashboard />
                </MockedProvider>
            </MemoryRouter>,
        );
        await waitFor(() => {
            expect(screen.getByText("Aucun historique")).toBeInTheDocument();
        });
    });
});
