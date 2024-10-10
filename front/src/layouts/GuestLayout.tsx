import GuestHeader from "@/components/header/GuestHeader";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {

    return (
        <>
            <header className="flex h-16 items-center border-b-[1px]">
                <GuestHeader />
            </header>
            <main className="flex-1 space-y-4 p-8 pt-6">
                <Outlet />
            </main>
        </>
    );
}
