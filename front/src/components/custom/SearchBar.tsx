import * as React from "react";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onSortChange: (key: string) => void;
    searchQuery: string;
    sortKey: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
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
        <div className="flex justify-between items-center mb-4">
            <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-1/3"
            />
            <Select value={sortKey} onValueChange={handleSortChange}>
                <SelectTrigger className="w-1/3">
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

export default SearchBar;
