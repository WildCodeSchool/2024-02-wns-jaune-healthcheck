import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useLocation } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import useAuthStore from "./stores/authStore";
import useSocketStore from "./stores/webSocketStore";
import UserLayout from "./layouts/UserLayout.tsx";
import { useEffect } from "react";
import { useMeLazyQuery } from "./generated/graphql-types";
import { Roles } from "@/types/user";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Shield } from "lucide-react";
import AdminPanel from "./components/admin/AdminPanel";

function App() {
    const isLogged = useAuthStore((state) => state.isLogged);
    const navigate = useNavigate();
    const location = useLocation();

    /* TODO : Voir pour ajouter un loader animé sur la première visite */
    const [meQuery] = useMeLazyQuery();
    const me = useAuthStore((state) => state.me);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const connectSocket = useSocketStore((state) => state.connect);
    const disconnectSocket = useSocketStore((state) => state.disconnect);

    useEffect(() => {
        meQuery({
            onCompleted: (data) => {
                me(data.me);
            },
            onError() {
                logout();
            },
        });
    }, [meQuery, me, logout]);

    // Bind WebSocket
    useEffect(() => {
        if (isLogged) {
            connectSocket();
        } else {
            disconnectSocket();
        }
        return () => {
            disconnectSocket();
        };
    }, [connectSocket, disconnectSocket, isLogged]);

    useEffect(() => {
        if (!isLogged) {
            if (location.pathname.includes("/dashboard")) {
                navigate("/");
            }
        } else {
            if (location.pathname === "/") navigate("/dashboard");
        }
    }, [isLogged, navigate, location.pathname]);

    return (
        <div className="relative">
            {user.role === Roles.ADMIN && (
                <>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                size={"sm"}
                                className="fixed right-2 bottom-2"
                            >
                                <Shield />
                            </Button>
                        </DialogTrigger>
                        <AdminPanel />
                    </Dialog>
                </>
            )}
            {isLogged ? <UserLayout /> : <GuestLayout />}
            <Toaster />
        </div>
    );
}

export default App;
