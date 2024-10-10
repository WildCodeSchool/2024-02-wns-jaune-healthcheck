import { Outlet } from "react-router-dom";
import clsx from "clsx";
import UserHeader from "@/components/header/UserHeader";
import SideBar from "@/components/nav/SideBar";


export default function UserLayout() {
    return (
        <>
            <UserHeader />
            <div 
                className="mx-1 sm:mx-2 lg:mx-6 xl:mx-40 2xl:mx-64"
            >
                <div 
                    className={clsx(
                        "grid grid-cols-[repeat(16,_minmax(0,_1fr))]",
                        "gap-0",
                        "xl:gap-8"
                    )}
                >
                    <div className="col-span-2 sm:col-span-1 xl:col-span-4">
                        <SideBar />
                    </div>
                    <main 
                        className={clsx(
                            "col-[3_/_span_16] sm:col-[2_/_span_16]",
                            "xl:col-[5_/_span_16]", 
                            "ms-0 sm:ms-2 md:ms-0",
                            "pb-10"
                        )}
                    >
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
