import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    usePrivatesUrlsByStatusQuery,
    PrivatesUrlsByStatusQuery,
} from "@/generated/graphql-types";
import { Skeleton } from "../../ui/skeleton";
import useSocketStore from "@/stores/webSocketStore";

const chartConfig = {
    onLine: {
        label: "En ligne",
        color: "hsl(var(--chart-1))",
    },
    offLine: {
        label: "Hors ligne",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const UrlsByStatusChart: React.FC = () => {
    const [timeRange, setTimeRange] = useState("daily");
    const [chartData, setChartData] = useState<PrivatesUrlsByStatusQuery>();
    const { data, loading, error, refetch } = usePrivatesUrlsByStatusQuery({
        variables: { timeFrame: timeRange },
        fetchPolicy: "cache-and-network",
    });
    const messages = useSocketStore((state) => state.messages);

    useEffect(() => {
        refetch();
    }, [messages, refetch]);

    useEffect(() => {
        if (!data) return;
        setChartData(data);
    }, [data, setChartData]);

    if (loading && !chartData) {
        return <Skeleton className="w-full h-[400px] p-5" />;
    }

    if (error) return <div>Erreur</div>;

    return (
        <Card className="h-full">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-left sm:text-left">
                    <CardTitle className="text-lg">
                        État de santé de vos services
                    </CardTitle>
                    <CardDescription>
                        Présentation périodique de l'état de santé de vos
                        services.
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Par heure" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="hourly" className="rounded-lg">
                            Par minute
                        </SelectItem>
                        <SelectItem value="daily" className="rounded-lg">
                            Par heure
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex-1 px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-[375px]" // ou ajustez cette valeur selon vos besoins
                >
                    <AreaChart data={chartData?.privatesUrlsByStatus}>
                        <defs>
                            <linearGradient
                                id="fillOnline"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-onLine)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-onLine)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillOffLine"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-offLine)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-offLine)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="dateTime"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                switch (timeRange) {
                                    case "daily":
                                        return `${
                                            new Date(value)
                                                .toLocaleDateString("fr-FR", {
                                                    hour: "2-digit",
                                                })
                                                .split(" ")[1]
                                        }h`;
                                    case "hourly":
                                        return new Date(value)
                                            .toLocaleDateString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            .split(" ")[1];
                                    default:
                                        return value;
                                }
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="offLine"
                            type="natural"
                            fill="url(#fillOffLine)"
                            stroke="var(--color-offLine)"
                            stackId="a"
                        />
                        <Area
                            dataKey="onLine"
                            type="natural"
                            fill="url(#fillOnline)"
                            stroke="var(--color-onLine)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default UrlsByStatusChart;
