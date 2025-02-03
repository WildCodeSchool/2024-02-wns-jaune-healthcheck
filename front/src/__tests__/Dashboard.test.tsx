import Dashboard from "@/pages/Dashboard";
import { describe, it, expect, vi } from "vitest";
import {
    GET_RECENT_PRIVATE_HISTORIES,
    GET_RECENT_PRIVATE_URLS,
    GET_PRIVATE_URLS_BY_STATUS,
    GET_PRIVATE_HISTORIES_BY_STATUS,
    GET_PRIVATE_SUM_URLS,
} from "@/graphql/queries";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartesianGrid, PolarAngleAxis, PolarGrid } from "recharts";
import { Radar } from "lucide-react";

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver;

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    LineChart: () => <div>LineChart</div>,
    Line: () => <div>Line</div>,
    XAxis: () => <div>XAxis</div>,
    YAxis: () => <div>YAxis</div>,
    Tooltip: () => <div>Tooltip</div>,
    Legend: () => <div>Legend</div>,
    BarChart: () => <div>BarChart</div>,
    Bar: () => <div>Bar</div>,
    PieChart: () => <div>PieChart</div>,
    Pie: () => <div>Pie</div>,
    Cell: () => <div>Cell</div>,
    AreaChart: () => <div>AreaChart</div>, // Add this line
    CartesianGrid: () => <CartesianGrid />,
    Area: () => <div>Area</div>, // Add this line
    RadarChart: () => <div>RadarChart</div>,
    PolarAngleAxis: () => <PolarAngleAxis />,
    PolarGrid: () => <PolarGrid />,
    Radar: () => <Radar />,
}));

describe("Tests RecentUrls", () => {
    const mocks = [
        {
            request: {
                query: GET_RECENT_PRIVATE_URLS,
            },
            result: {
                data: {
                    recentPrivateUrls: [],
                },
            },
        },
        {
            request: {
                query: GET_RECENT_PRIVATE_HISTORIES,
            },
            result: {
                data: {
                    recentPrivateHistories: [],
                },
            },
        },
        {
            request: {
                query: GET_PRIVATE_URLS_BY_STATUS,
                variables: { timeFrame: "daily" },
            },
            result: {
                data: {
                    privatesUrlsByStatus: [],
                },
            },
        },
        {
            request: {
                query: GET_PRIVATE_HISTORIES_BY_STATUS,
            },
            result: {
                data: {
                    privateHistoriesByStatus: [
                        {
                            statusCode: 200,
                            countHtml: 0,
                            countJson: 0,
                            countUnknown: 0,
                        },
                        {
                            statusCode: 404,
                            countHtml: 5,
                            countJson: 2,
                            countUnknown: 1,
                        },
                    ],
                },
            },
        },
        {
            request: {
                query: GET_PRIVATE_SUM_URLS,
            },
            result: {
                data: {
                    privateSumUrls: 0,
                },
            },
        },
    ];

    it("should recentUrls is empty", async () => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Dashboard />
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(
            () => {
                expect(
                    screen.getByText(/Aucune URL disponible/i),
                ).toBeInTheDocument();
            },
            { timeout: 2000 },
        );
    });

    it("should recentHistories is empty", async () => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Dashboard />
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(
            () => {
                expect(
                    screen.getByText(/Aucune URL disponible/i),
                ).toBeInTheDocument();
            },
            { timeout: 2000 },
        );
    });
});
