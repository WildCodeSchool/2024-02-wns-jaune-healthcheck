import UserHeader from "@/components/header/UserHeader";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <>
            <header className="py-4 px-6 border-b-[1px]">
                <UserHeader />
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
}
