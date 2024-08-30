import { useCheckFrequenciesQuery } from "@/generated/graphql-types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectCheckFrequencyProps = {
    onValueChange: (...event: string[]) => void;
    defaultValue: string | undefined;
};

const SelectCheckFrequency: React.FC<SelectCheckFrequencyProps> = ({
    onValueChange,
    defaultValue,
}) => {
    const { data, loading, error } = useCheckFrequenciesQuery();

    let selectItems: React.ReactNode;

    if (loading) {
        selectItems = <SelectItem value="loading">Chargement...</SelectItem>;
    }

    if (error) {
        selectItems = (
            <SelectItem value="error">Une erreur est survenue...</SelectItem>
        );
    }

    if (data) {
        selectItems = data.checkFrequencies.map((frequency) => (
            <SelectItem key={frequency.id} value={frequency.id}>
                {frequency.interval}
            </SelectItem>
        ));
    }

    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Personnalisez la fréquence..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>
                        Fréquence de vérification de l'url
                    </SelectLabel>
                    {selectItems}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectCheckFrequency;
