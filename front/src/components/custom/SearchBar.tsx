import * as React from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [query, setQuery] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-1/5 m-8"
            />
        </div>
    );
};

export default SearchBar;
