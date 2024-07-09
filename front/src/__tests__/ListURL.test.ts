import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import URLList from "@/components/landing/ListUrl";
import * as graphqlTypes from "@/generated/graphql-types";
import { vi, describe, it, expect, afterEach } from "vitest";

vi.mock("@/generated/graphql-types", async () => {
    const actual = await vi.importActual("@/generated/graphql-types");
    return {
        ...actual,
        useGetAllURlsQuery: vi.fn(),
    };
});

describe("URLList", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should render loading state", () => {
        vi.mocked(graphqlTypes.useGetAllURlsQuery).mockReturnValue({
            loading: true,
        } as any);
        render(React.createElement(URLList));
        expect(screen.getByText("Loading")).toBeInTheDocument();
    });

    it("should render error state", () => {
        vi.mocked(graphqlTypes.useGetAllURlsQuery).mockReturnValue({
            error: new Error("Error"),
        } as any);
        render(React.createElement(URLList));
        expect(screen.getByText("Error")).toBeInTheDocument();
    });

    it("should render URL list", () => {
        const mockData = {
            urls: [
                {
                    id: "1",
                    name: "Test URL 1",
                    path: "/test1",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 200 }],
                },
                {
                    id: "2",
                    name: "Test URL 2",
                    path: "/test2",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 200 }],
                },
            ],
        };
        vi.mocked(graphqlTypes.useGetAllURlsQuery).mockReturnValue({
            data: mockData,
            loading: false,
        } as any);
        render(React.createElement(URLList));
        expect(screen.getByText("Test URL 1")).toBeInTheDocument();
        expect(screen.getByText("Test URL 2")).toBeInTheDocument();
    });

    it("should handle search", async () => {
        const mockData = {
            urls: [
                {
                    id: "1",
                    name: "Test URL 1",
                    path: "/test1",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 200 }],
                },
                {
                    id: "2",
                    name: "Test URL 2",
                    path: "/test2",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 200 }],
                },
            ],
        };
        vi.mocked(graphqlTypes.useGetAllURlsQuery).mockReturnValue({
            data: mockData,
            loading: false,
        } as any);
        render(React.createElement(URLList));

        const searchInput = screen.getByRole("textbox");
        await fireEvent.change(searchInput, { target: { value: "Test URL 1" } });

        expect(screen.getByText("Test URL 1")).toBeInTheDocument();
        expect(screen.queryByText("Test URL 2")).not.toBeInTheDocument();
    });

    it("should handle pagination", async () => {
        const mockData = {
            urls: Array.from({ length: 48 }, (_, i) => ({
                id: `${i + 1}`,
                name: `Test URL ${i + 1}`,
                path: `/test${i + 1}`,
                createdAt: new Date(Date.now() - i * 60000).toISOString(),
                histories: [{ status_code: 200 }],
            })),
        };
        vi.mocked(graphqlTypes.useGetAllURlsQuery).mockReturnValue({
            data: mockData,
            loading: false,
        } as any);

        render(React.createElement(URLList));

        await screen.findByText("Test URL 1");
        expect(screen.getByText("Test URL 1")).toBeInTheDocument();
        expect(screen.getByText("Test URL 24")).toBeInTheDocument();
        expect(screen.queryByText("Test URL 25")).not.toBeInTheDocument();

        const nextPageButton = screen.getByText("2");
        await fireEvent.click(nextPageButton);

        await screen.findByText("Test URL 25");
        expect(screen.getByText("Test URL 25")).toBeInTheDocument();
        expect(screen.getByText("Test URL 48")).toBeInTheDocument();
        expect(screen.queryByText("Test URL 24")).not.toBeInTheDocument();
    });

    it("should display status when history exists and show empty string when it does not", async () => {
        const mockData = {
            urls: [
                {
                    id: "1",
                    name: "URL with History",
                    path: "/test1",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 200 }],
                },
                {
                    id: "2",
                    name: "URL without History",
                    path: "/test2",
                    createdAt: new Date().toISOString(),
                    histories: [],
                },
            ],
        };

        vi.mocked(graphqlTypes.useGetAllURlsQuery).mockReturnValue({
            data: mockData,
            loading: false,
        } as any);

        render(React.createElement(URLList));

        await screen.findByText("URL with History");
        expect(screen.getByText("Status 200")).toBeInTheDocument();

        await screen.findByText("URL without History");
        const cardWithoutHistory = screen.getByText('URL without History').closest('.w-full.max-w-xs');
        const statusTextElements = cardWithoutHistory?.querySelectorAll('p.text-sm');
        expect(statusTextElements?.length).toBeGreaterThanOrEqual(2);
        const statusTextElement = statusTextElements?.[1];


        if (statusTextElement) {
            expect(statusTextElement.textContent?.trim()).toBe("");
        } else {
            expect(statusTextElement).toBeInTheDocument();
        }
    });
});
