import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Roles } from '@/constants/role.ts';
import { useMeLazyQuery } from "@/generated/graphql-types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserData } from "@/types/user";
import { useGetAllUsersLazyQuery } from "@/generated/graphql-types";
import { DataTable } from "@/components/admin/Datatables";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columns: ColumnDef<UserData>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(user.id)
                            }
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function AdminPanel() {
    const [meQuery] = useMeLazyQuery();
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [getAllUsersQuery] = useGetAllUsersLazyQuery();

    useEffect(() => {
        meQuery({
            onCompleted: (data) => {
                const userData = JSON.parse(data.me);
                if (userData.role === Roles.ADMIN) {
                    setIsAdmin(true);
                }
            },
        });
    }, [meQuery]);

    useEffect(() => {
        if (isAdmin) {
            getAllUsersQuery({
                onCompleted: (data) => {
                    const usersData = JSON.parse(data.getAllUsers);
                    setUsers(usersData);
                },
                onError: (error) => {
                    console.error(error);
                    throw new Error("Failed to fetch users");
                },
            });
        }
    }, [isAdmin, getAllUsersQuery]);

    const AdminContent = () => {
        return (
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Admin Panel</DialogTitle>
                    <DialogDescription>
                        This is the admin panel.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <Tabs defaultValue="users" className="w-full">
                    <TabsList>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="url">URL</TabsTrigger>
                    </TabsList>
                    <TabsContent value="users">
                        <DataTable columns={columns} data={users} />
                    </TabsContent>
                    <TabsContent value="url">Empty</TabsContent>
                </Tabs>
            </DialogContent>
        );
    };

    const UnauthorizedContent = () => {
        return (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Unauthorized</DialogTitle>
                    <DialogDescription>
                        You are not authorized to view this page.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        );
    };

    return isAdmin ? AdminContent() : UnauthorizedContent();
}
