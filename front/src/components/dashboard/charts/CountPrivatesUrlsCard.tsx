import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "../../ui/skeleton";
import { usePrivateSumUrlsQuery } from "@/generated/graphql-types";
import clsx from "clsx";


const CountPrivatesUrlsCard: React.FC = () => {
    const { data, loading, error } = usePrivateSumUrlsQuery({
        fetchPolicy: "cache-and-network",
    });

    if (loading && !data) {
        return (
            <Skeleton className="w-full h-[400px] p-5" />
        );
    } 

    if (error) return <div>Erreur</div>;

    return (
        <Card
            className="flex flex-col justify-between h-fit w-full"
        >
            <CardHeader className="items-left pb-4">
                <CardTitle
                    className="text-lg"
                >
                    Vos services
                </CardTitle>
                <CardDescription className="text-left text-wrap">
                    Nombre de services privés surveillés 
                </CardDescription>
            </CardHeader>
            <CardContent
                className={clsx(
                    "flex items-center justify-center",
                    "text-[5em] font-bold  text-primary animate-pulse"
                )}
            >
               {data?.privateSumUrls}
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4 pb-10 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none text-center">
                    Total de {data?.privateSumUrls} services ajoutés
                </div>
            </CardFooter>
        </Card>
    );
}

export default CountPrivatesUrlsCard;