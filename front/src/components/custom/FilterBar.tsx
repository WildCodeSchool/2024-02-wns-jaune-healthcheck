import * as React from "react";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface FilterBarProps {
    onSearch: (query: string) => void;
    onSortChange: (key: string) => void;
    searchQuery: string;
    sortKey: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
    onSearch,
    onSortChange,
    searchQuery,
    sortKey,
}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    const handleSortChange = (value: string) => {
        onSortChange(value);
    };

    return (
        <div className="flex max-md:flex-col justify-between items-center gap-4 mb-4">
            <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full max-w-lg"
            />
            <Select value={sortKey} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full max-w-lg md:w-1/4">
                    <SelectValue placeholder="Choisir un tri" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name">Trier par nom</SelectItem>
                    <SelectItem value="status_code">
                        Trier par code de statut
                    </SelectItem>
                    <SelectItem value="createdAt">
                        Trier par date de création
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default FilterBar;
