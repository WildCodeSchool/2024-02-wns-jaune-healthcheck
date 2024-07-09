import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function App() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Toaster />
        </>
    );
}

export default App;
