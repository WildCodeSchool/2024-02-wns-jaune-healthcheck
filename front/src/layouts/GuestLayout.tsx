import GuestNavigation from "@/components/navigation/GuestNavigation";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <>
            <header className="p-4 border-b-[1px]">
                <GuestNavigation />
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
}
