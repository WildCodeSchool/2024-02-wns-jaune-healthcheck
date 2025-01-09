import { useState, useEffect } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { 
    usePrivateHistoriesByStatusQuery,
    PrivateHistoriesByStatusQuery,
 } from "@/generated/graphql-types";
import { Skeleton } from "../ui/skeleton";
import useSocketStore from "@/stores/webSocketStore";


const chartConfig = {
    countJson: {
        label: "JSON",
        color: "hsl(var(--chart-1))",
    },
    countHtml: {
        label: "HTML",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


const HistoriesByStatusChart: React.FC = () => {
    const [chartData, setChartData] = useState<PrivateHistoriesByStatusQuery>();
    const { loading, error, refetch } = usePrivateHistoriesByStatusQuery({
        onCompleted: (data) => {
            setChartData(data);
        },
        fetchPolicy: "cache-and-network",
    });
    const messages = useSocketStore((state) => state.messages);

    useEffect(() => {
        refetch();
    }, [messages, refetch]);

    if (loading && !chartData) {
        return (
            <Skeleton className="w-full h-[400px] p-5" />
        );
    } 

    if (error) return <div>Erreur</div>;

    const sumFail = chartData?.privateHistoriesByStatus.reduce((acc, curr) => {
        const currJson = curr.statusCode !== 200 ? curr.countJson : 0;
        const currHtml = curr.statusCode !== 200 ? curr.countHtml : 0;
        return acc + currJson + currHtml
    }, 0);

    return (
        <Card>
            <CardHeader className="items-center pb-4">
                <CardTitle>Statuts de vos services</CardTitle>
                <CardDescription>
                    Historique des statuts de vos services par type de contenu
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart
                        data={chartData?.privateHistoriesByStatus}
                        margin={{
                            top: -40,
                            bottom: -10,
                        }}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <PolarAngleAxis dataKey="statusCode" />
                        <PolarGrid />
                        <Radar
                            dataKey="countJson" 
                            stroke={chartConfig.countJson.color} 
                            fill={chartConfig.countJson.color} 
                            fillOpacity={0.6}
                        />
                        <Radar 
                            dataKey="countHtml" 
                            stroke={chartConfig.countHtml.color} 
                            fill={chartConfig.countHtml.color} 
                            fillOpacity={0.6}
                        />
                        <ChartLegend className="mt-8" content={<ChartLegendContent />} />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Total de {sumFail} historique{sumFail && sumFail > 0 && "s"} de réponse HTTP en erreur
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Parmis les codes de statut HTTP présentés
                </div>
            </CardFooter>
        </Card>
    );
}

export default HistoriesByStatusChart;