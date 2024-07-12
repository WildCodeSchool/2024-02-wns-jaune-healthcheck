import UserHeader from "@/components/header/UserHeader";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <>
            <header className="flex h-16 items-center px-6 border-b-[1px]">
                <UserHeader />
            </header>
            <main className="flex-1 space-y-4 p-8 pt-6">
                <Outlet />
            </main>
        </>
    );
}
