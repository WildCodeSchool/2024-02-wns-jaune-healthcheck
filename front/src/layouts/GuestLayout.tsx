import GuestHeader from "@/components/header/GuestHeader";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <>
            <header className="p-4">
                <GuestHeader />
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
}
