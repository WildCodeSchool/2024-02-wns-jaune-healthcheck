import { Roles } from "@/constants/role.ts";

export type UserData = {
    id: string;
    username: string;
    email: string;
    role: Roles;
};
