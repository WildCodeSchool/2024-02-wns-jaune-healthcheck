import GuestHeader from "@/components/header/GuestHeader";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GuestLayout() {
    const location = useLocation();
    const [isLanding, setIsLanding] = useState(false);

    useEffect(() => {
        setIsLanding(location.pathname === "/home");
    }, [location]);
    return (
        <div className={isLanding ? "bg-gradient-to-br from-white dark:from-black via-white/0 dark:via-black/0 to-primary/50 [background-position:66%]" : "bg-transparent"}>
            <header className="flex h-16 items-center px-4 xl:px-0">
                <GuestHeader />
            </header>
            <main
                className={`flex-1 space-y-4 p-8 pt-6`}
            >
                <Outlet />
            </main>
        </div>
    );
}
