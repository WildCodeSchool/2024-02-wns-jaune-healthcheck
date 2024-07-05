import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    List,
    ListItem,
    CardStatus,
    CardContent,
} from "@/components/ui/card";
import SearchBar from "../custom/SearchBar";
import { useGetAllURlsQuery } from "@/generated/graphql-types";

export default function URLList() {
    const { loading, error, data } = useGetAllURlsQuery();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 24;
    let totalItems = 0;

    useEffect(() => {
        if (data) {
            totalItems = data.urls.length;
        } else {
            totalItems = 0;
        }
    }, [data]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    if (error) return "Error";
    return (
        <div className="flex flex-col gap-8">
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                "Loading"
            ) : (
                <>
                    <div className="flex-grow">
                        <List className="grid grid-cols-4 gap-4">
                            {data &&
                                data.urls
                                    .filter(
                                        (item) =>
                                            item.name
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase(),
                                                ) ||
                                            item.path
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase(),
                                                ),
                                    )
                                    .sort(
                                        (a, b) =>
                                            new Date(b.createdAt).getTime() -
                                            new Date(a.createdAt).getTime(),
                                    )
                                    .slice(
                                        startIndex,
                                        startIndex + itemsPerPage,
                                    )
                                    .map((item) => (
                                        <ListItem
                                            key={item.id}
                                            className="flex justify-center items-center"
                                        >
                                            <a
                                                href={`/url/${item.id}`}
                                                rel="noopener noreferrer"
                                                className="w-full max-w-xs block"
                                            >
                                                <Card className="w-full max-w-xs">
                                                    <CardHeader>
                                                        <CardTitle>
                                                            {item.name}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            {item.path}
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="flex">
                                                        <CardStatus />
                                                        <p className="text-sm">
                                                            {item.histories[0]
                                                                ? `Status ${item.histories[0].status_code}`
                                                                : ""}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </a>
                                        </ListItem>
                                    ))}
                        </List>
                    </div>
                    <div className="flex justify-center mt-4 mb-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 mx-1 text-black border border-black rounded ${
                                    currentPage === index + 1
                                        ? "text-black"
                                        : ""
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
