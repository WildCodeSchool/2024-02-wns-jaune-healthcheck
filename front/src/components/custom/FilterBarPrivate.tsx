import * as React from "react";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface FilterBarProps {
    onSearch: (query: string) => void;
    onSortChange: (key: string) => void;
    onVisibilityChange: (visibility: string) => void;
    searchQuery: string;
    sortKey: string;
    visibilityFilter: "private" | "public" | "all";
}

const FilterBar: React.FC<FilterBarProps> = ({
    onSearch,
    onSortChange,
    onVisibilityChange,
    searchQuery,
    sortKey,
    visibilityFilter,
}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    const handleSortChange = (value: string) => {
        onSortChange(value);
    };

    return (
        <div className="flex max-md:flex-col justify-between items-center gap-4">
            <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full max-w-lg"
            />
            <div className="flex flex-row justify-end gap-4 flex-grow">
            <Select value={visibilityFilter} onValueChange={onVisibilityChange}>
                <SelectTrigger className="w-full max-w-[200px]">
                    <SelectValue placeholder="Visibilité" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tout voir</SelectItem>
                    <SelectItem value="private">Privé</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                </SelectContent>
            </Select>
            <Select value={sortKey} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full max-w-lg md:w-1/4">
                    <SelectValue placeholder="Choisir un tri" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name">Trier par nom</SelectItem>
                    <SelectItem value="status">
                        Trier par code de statut
                    </SelectItem>
                    <SelectItem value="createdAt">
                        Trier par date de création
                    </SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
    );
};

export default FilterBar;
