import { useState, useEffect } from "react";
import { CardStatus } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilterBar from "@/components/custom/FilterBarPrivate";
import { useGetAllURlsQuery } from "@/generated/graphql-types";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginateUrls } from "@/generated/graphql-types";
import CustomPagination from "@/components/custom/CustomPagination";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import FormUpdateUserUrlName from "@/components/user-urls/FormUpdateUserUrlName.tsx";
import { Dialog } from "@/components/ui/dialog.tsx";
import FormDeleteUserUrl from "@/components/user-urls/FormDeleteUserUrl.tsx";
import FormUpdateUserUrlFrequency from "@/components/user-urls/FormUpdateUserUrlFrequency.tsx";
import { Roles } from "@/constants/role.ts";
import useAuthStore from "@/stores/authStore.tsx";

type urlDialog = {
    name: boolean;
    frequency: boolean;
    delete: boolean;
};

type selectedItem = {
    id: string;
    urlName?: string;
    urlPath?: string;
};

const ListUserUrls: React.FC = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const [openDialog, setOpenDialog] = useState<urlDialog>({
        name: false,
        frequency: false,
        delete: false,
    });
    const [selectedItem, setSelectedItem] = useState<selectedItem | null>(null);

    /* FILTRE et PAGINATION */
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibility, setVisibility] = useState<"private" | "public" | "all">(
        "all",
    );
    const getPrivateUrlsValue = (visibility: string): boolean | undefined => {
        if (visibility === "all") {
            return undefined;
        }
        return visibility === "private";
    };

    const { loading, error, data } = useGetAllURlsQuery({
        variables: {
            searchText: searchParams?.get("searchUrl") || "",
            sortField: searchParams?.get("sortField") || "",
            currentPage: Number(searchParams?.get("currentPage")) || 1,
            privateUrls: getPrivateUrlsValue(visibility),
        },
        fetchPolicy: "cache-and-network",
    });

    const [PaginateUrls, setPaginateUrls] = useState<PaginateUrls>({
        urls: [],
        totalPages: 1,
        currentPage: 1,
        previousPage: 1,
        nextPage: 2,
    });
    const { totalPages, currentPage, previousPage, nextPage } = PaginateUrls;

    useEffect(() => {
        if (!data) {
            return;
        }
        setPaginateUrls(data.urls as PaginateUrls);
    }, [data]);

    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!page) {
            newSearchParams.delete("currentPage");
        } else {
            newSearchParams.set("currentPage", String(page));
        }
        setSearchParams(newSearchParams);
    };

    const handleSearch = (query: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!query) {
            newSearchParams.delete("searchUrl");
        } else {
            newSearchParams.delete("currentPage");
            newSearchParams.set("searchUrl", query);
        }
        setSearchParams(newSearchParams);
    };

    const handleSortChange = (field: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!field) {
            newSearchParams.delete("sortField");
        } else {
            newSearchParams.set("sortField", field);
        }
        setSearchParams(newSearchParams);
    };

    const pushToHistory = (itemId: string) => {
        navigate(`/user-url/${itemId}`);
    };

    if (loading && !PaginateUrls.urls.length) {
        return Array.from({ length: 10 }, (_, index) => {
            return (
                <div className="w-full mt-24" key={index}>
                    <Skeleton className="h-[40px] rounded-lg" />
                </div>
            );
        });
    }

    /* MUTATION DIALOG */
    const isPremium = user.role === Roles.PREMIUM;

    const handleUpdateName = (urlId: string, urlName: string) => {
        setSelectedItem({
            id: urlId,
            urlName,
        });
        setOpenDialog({ ...openDialog, name: true });
    };

    const handleUpdateCheckFrequency = (urlId: string, urlName: string) => {
        setSelectedItem({
            id: urlId,
            urlName,
        });
        setOpenDialog({ ...openDialog, frequency: true });
    };

    const handleDeleteUrl = (urlId: string, urlPath: string) => {
        setSelectedItem({
            id: urlId,
            urlPath,
        });
        setOpenDialog({ ...openDialog, delete: true });
    };

    const closeDialog = () => {
        setSelectedItem({
            id: "",
            urlName: "",
            urlPath: "",
        });
        setOpenDialog({
            name: false,
            frequency: false,
            delete: false,
        });
    };

    if (error) {
        return "Error";
    }
    return (
        <div className="h-fit">
            <section className="pb-4">
                <h1 className="font-semibold text-2xl mb-[1px]">
                    Liste des URLs
                </h1>
                <h2 className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Filtrez les comme bon vous semble.
                </h2>
            </section>
            <section className="flex flex-col gap-4">
                <FilterBar
                    onSearch={handleSearch}
                    onSortChange={handleSortChange}
                    searchQuery={searchParams.get("searchUrl") || ""}
                    sortKey={searchParams.get("sortField") || ""}
                    onVisibilityChange={(value) =>
                        setVisibility(value as "private" | "public" | "all")
                    }
                    visibilityFilter={visibility}
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Privée</TableHead>
                            <TableHead>Date d'ajout</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {PaginateUrls.urls && (
                        <TableBody>
                            {PaginateUrls.urls.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="hover:cursor-pointer"
                                >
                                    <TableCell
                                        onClick={() => pushToHistory(item.id)}
                                    >
                                        <CardStatus
                                            statusCode={
                                                item.histories[0].status_code
                                            }
                                        />
                                    </TableCell>
                                    <TableCell
                                        onClick={() => pushToHistory(item.id)}
                                        className="font-semibold"
                                    >
                                        {item.name}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => pushToHistory(item.id)}
                                    >
                                        {item.path}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => pushToHistory(item.id)}
                                    >
                                        {item.private ? "Oui" : "Non"}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => pushToHistory(item.id)}
                                    >
                                        <p className="text-muted-foreground italic first-letter:uppercase">
                                            {new Date(
                                                item.createdAt,
                                            ).toLocaleDateString()}{" "}
                                            {new Date(
                                                item.createdAt,
                                            ).toLocaleTimeString()}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <EllipsisVertical
                                                    size={16}
                                                    className="ml-auto"
                                                />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        handleUpdateName(
                                                            item.id,
                                                            item.name,
                                                        );
                                                    }}
                                                >
                                                    Changer le nom
                                                </DropdownMenuItem>
                                                {item.private && isPremium && (
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            handleUpdateCheckFrequency(
                                                                item.id,
                                                                item.name,
                                                            );
                                                        }}
                                                    >
                                                        Changer la fréquence
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        handleDeleteUrl(
                                                            item.id,
                                                            item.path,
                                                        );
                                                    }}
                                                    className="text-red-600 dark:text-rose-400"
                                                >
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {openDialog.name && selectedItem && (
                                            <Dialog
                                                open={openDialog.name}
                                                onOpenChange={(isOpen) =>
                                                    setOpenDialog({
                                                        ...openDialog,
                                                        name: isOpen,
                                                    })
                                                }
                                            >
                                                <FormUpdateUserUrlName
                                                    urlId={selectedItem.id}
                                                    currentName={
                                                        selectedItem.urlName as string
                                                    }
                                                    closeDialog={closeDialog}
                                                />
                                            </Dialog>
                                        )}

                                        {openDialog.frequency &&
                                            selectedItem && (
                                                <Dialog
                                                    open={openDialog.frequency}
                                                    onOpenChange={(isOpen) =>
                                                        setOpenDialog({
                                                            ...openDialog,
                                                            frequency: isOpen,
                                                        })
                                                    }
                                                >
                                                    <FormUpdateUserUrlFrequency
                                                        urlId={selectedItem.id}
                                                        currentName={
                                                            selectedItem.urlName as string
                                                        }
                                                        closeDialog={
                                                            closeDialog
                                                        }
                                                    />
                                                </Dialog>
                                            )}

                                        {openDialog.delete && selectedItem && (
                                            <Dialog
                                                open={openDialog.delete}
                                                onOpenChange={(isOpen) =>
                                                    setOpenDialog({
                                                        ...openDialog,
                                                        delete: isOpen,
                                                    })
                                                }
                                            >
                                                <FormDeleteUserUrl
                                                    urlId={selectedItem.id}
                                                    urlPath={
                                                        selectedItem.urlPath as string
                                                    }
                                                    closeDialog={closeDialog}
                                                />
                                            </Dialog>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                    {!loading && !PaginateUrls.urls.length && (
                        <TableFooter className="bg-transparent">
                            <TableCell
                                className="text-center text-sm font-normal text-muted-foreground italic"
                                colSpan={6}
                            >
                                Aucune URL disponible.
                            </TableCell>
                        </TableFooter>
                    )}
                </Table>
                {PaginateUrls.urls.length &&
                PaginateUrls.totalPages > 1 &&
                PaginateUrls.totalPages !== 0 ? (
                    <CustomPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        onPageChange={handlePageChange}
                    />
                ) : null}
            </section>
        </div>
    );
};

export default ListUserUrls;
