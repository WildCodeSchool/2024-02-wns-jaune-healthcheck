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
        await fireEvent.change(searchInput, {
            target: { value: "Test URL 1" },
        });

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

    it("should display correct status for different HTTP status codes", async () => {
        const mockData = {
            urls: [
                {
                    id: "1",
                    name: "URL with 200 status",
                    path: "/test1",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 200 }],
                },
                {
                    id: "2",
                    name: "URL with 300 status",
                    path: "/test2",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 300 }],
                },
                {
                    id: "3",
                    name: "URL with 400 status",
                    path: "/test3",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 400 }],
                },
                {
                    id: "4",
                    name: "URL with 500 status",
                    path: "/test4",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 500 }],
                },
                {
                    id: "5",
                    name: "URL with unknown status",
                    path: "/test5",
                    createdAt: new Date().toISOString(),
                    histories: [{ status_code: 999 }],
                },
                {
                    id: "6",
                    name: "URL with status null",
                    path: "/test6",
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

        const url200 = await screen.findByText("URL with 200 status");
        expect(url200).toBeInTheDocument();
        expect(screen.getByText("Status 200")).toBeInTheDocument();
        const statusIndicators = screen.getAllByTestId("status-indicator");
        expect(statusIndicators[0]).toHaveClass("bg-green-500");

        const url300 = await screen.findByText("URL with 300 status");
        expect(url300).toBeInTheDocument();
        expect(screen.getByText("Status 300")).toBeInTheDocument();
        expect(statusIndicators[1]).toHaveClass("bg-yellow-500");

        const url400 = await screen.findByText("URL with 400 status");
        expect(url400).toBeInTheDocument();
        expect(screen.getByText("Status 400")).toBeInTheDocument();
        expect(statusIndicators[2]).toHaveClass("bg-red-500");

        const url500 = await screen.findByText("URL with 500 status");
        expect(url500).toBeInTheDocument();
        expect(screen.getByText("Status 500")).toBeInTheDocument();
        expect(statusIndicators[3]).toHaveClass("bg-red-500");

        const url999 = await screen.findByText("URL with unknown status");
        expect(url999).toBeInTheDocument();
        expect(screen.getByText("Status 999")).toBeInTheDocument();
        expect(statusIndicators[4]).toHaveClass("bg-gray-500");

        const urlNull = await screen.findByText("URL with status null");
        expect(urlNull).toBeInTheDocument();
        expect(statusIndicators[5]).toHaveClass("bg-gray-500");
    });

    it("should handle sort change", async () => {
        const mockData = {
            urls: [
                {
                    id: "1",
                    name: "Test URL B",
                    path: "/testB",
                    createdAt: new Date(Date.now() - 10000).toISOString(), // Older
                    histories: [{ status_code: 200 }],
                },
                {
                    id: "2",
                    name: "Test URL A",
                    path: "/testA",
                    createdAt: new Date().toISOString(), // Newer
                    histories: [{ status_code: 200 }],
                },
            ],
        };
        vi.mocked(graphqlTypes.useGetAllURlsQuery).mockReturnValue({
            data: mockData,
            loading: false,
        } as any);
        render(React.createElement(URLList));

        const items = screen.getAllByText(/Test URL/i);
        expect(items[0]).toHaveTextContent("Test URL A");
        expect(items[1]).toHaveTextContent("Test URL B");

        const selectTrigger = screen.getByRole("combobox");
        await fireEvent.click(selectTrigger);
    });
});
