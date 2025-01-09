export enum Roles {
    ADMIN = "admin",
    FREE = "free",
    TIER = "tier",
    PREMIUM = "premium",
}

export type UserData = {
    id: string;
    username: string;
    email: string;
    role: Roles;
};
