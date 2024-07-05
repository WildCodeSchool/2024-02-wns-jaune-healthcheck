import * as React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    List,
    ListItem,
    CardStatus,
} from "@/components/ui/card";
import SearchBar from "../components/custom/SearchBar";

const data = [
    {
        id: "e1755ee2-901e-4a7d-a813-946f1d561428",
        name: "Facebook",
        path: "https://facebook.com/",
        created_at: "2024-07-04T12:50:22Z",
        history: [
            {
                id: "f17fe86d-e8fc-4e44-8140-38da4cd0df63",
                created_at: "2024-07-04T12:50:22Z",
                status_code: 200,
                response: "Hello World !",
            },
        ],
    },
    {
        id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        name: "Twitter",
        path: "https://twitter.com/",
        created_at: "2024-07-05T10:30:00Z",
        history: [
            {
                id: "q1r2s3t4-u5v6-w7x8-y9z0-a1b2c3d4e5f6",
                created_at: "2024-07-05T10:30:00Z",
                status_code: 200,
                response: "Hello Twitter !",
            },
        ],
    },
    {
        id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        name: "Instagram",
        path: "https://instagram.com/",
        created_at: "2024-07-06T08:45:00Z",
        history: [
            {
                id: "7q8r9s0t-1u2v-3w4x-5y6z-7a8b9c0d1e2f",
                created_at: "2024-07-06T08:45:00Z",
                status_code: 200,
                response: "Hello Instagram !",
            },
        ],
    },
    {
        id: "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
        name: "LinkedIn",
        path: "https://linkedin.com/",
        created_at: "2024-07-07T14:20:00Z",
        history: [
            {
                id: "3q4r5s6t-7u8v-9w0x-1y2z-3a4b5c6d7e8f",
                created_at: "2024-07-07T14:20:00Z",
                status_code: 200,
                response: "Hello LinkedIn !",
            },
        ],
    },
    {
        id: "4a5b6c7d-8e9f-0g1h-2i3j-4k5l6m7n8o9p",
        name: "GitHub",
        path: "https://github.com/",
        created_at: "2024-07-08T16:55:00Z",
        history: [
            {
                id: "5q6r7s8t-9u0v-1w2x-3y4z-5a6b7c8d9e0f",
                created_at: "2024-07-08T16:55:00Z",
                status_code: 200,
                response: "Hello GitHub !",
            },
        ],
    },
];

export default function URLList() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState("");
    const itemsPerPage = 24;
    const totalItems = data.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SearchBar onSearch={handleSearch} />
            <div className="flex-grow">
                <List className="grid grid-cols-4 gap-4">
                    {data
                        .filter(
                            (item) =>
                                item.name
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                item.path
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                        )
                        .slice(startIndex, startIndex + itemsPerPage)
                        .map((item) => (
                            <ListItem
                                key={item.id}
                                className="flex justify-center"
                            >
                                <a
                                    href={"/"}
                                    rel="noopener noreferrer"
                                    className="w-full max-w-xs block"
                                >
                                    <Card className="w-full max-w-xs">
                                        <CardHeader>
                                            <CardStatus />
                                            <CardTitle>{item.name}</CardTitle>
                                            <CardDescription>
                                                {item.path}
                                            </CardDescription>
                                        </CardHeader>
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
                            currentPage === index + 1 ? "text-black" : ""
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}