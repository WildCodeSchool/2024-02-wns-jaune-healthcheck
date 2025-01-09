import GuestHeader from "@/components/header/GuestHeader";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GuestLayout() {
    const location = useLocation();
    const [isLanding, setIsLanding] = useState(false);

    useEffect(() => {
        setIsLanding(location.pathname === "/index");
    }, [location]);
    return (
        <>
            <header className="flex h-16 items-center px-4 xl:px-0">
                <GuestHeader />
            </header>
            <main
                className={`flex-1 space-y-4 p-8 pt-6 ${isLanding && "bg-gradient-to-br from-white via-white/0 to-primary/50 [background-position:66%]"}`}
            >
                <Outlet />
            </main>
        </>
    );
}
