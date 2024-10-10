import { Outlet } from "react-router-dom";
import clsx from "clsx";
import UserHeader from "@/components/header/UserHeader";
import SideBar from "@/components/nav/SideBar";


export default function UserLayout() {
    return (
        <>
            <UserHeader />
            <div 
                className="mx-1 sm:mx-2 lg:mx-6 xl:mx-20 2xl:mx-32"
            >
                <div 
                    className={clsx(
                        "grid grid-cols-[repeat(16,_minmax(0,_1fr))]",
                        "gap-0",
                        "xl:gap-8"
                    )}
                >
                    <div className="col-span-2 sm:col-span-1 xl:col-span-3">
                        <SideBar />
                    </div>
                    <main 
                        className={clsx(
                            "col-[3_/_span_16] sm:col-[2_/_span_16] xl:col-span-11", 
                            "ms-0 sm:ms-2 md:ms-0"
                        )}
                    >
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
