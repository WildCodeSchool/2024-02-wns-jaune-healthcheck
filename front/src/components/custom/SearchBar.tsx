import * as React from "react";
import { Input } from "../ui/input";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [query, setQuery] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <Input
            type="text"
            placeholder="Rechercher..."
            value={query}
            onChange={handleInputChange}
            className="w-full max-w-md"
        />
    );
};

export default SearchBar;
