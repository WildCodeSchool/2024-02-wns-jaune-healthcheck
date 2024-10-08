import { Toaster } from "@/components/ui/toaster";
import GuestLayout from "./layouts/GuestLayout";
import useAuthStore from "./stores/authStore";
import useSocketStore from "./stores/webSocketStore";
import UserLayout from "./layouts/UserLayout";
import { useEffect } from "react";
import { useMeLazyQuery } from "./generated/graphql-types";

function App() {
    const isLogged = useAuthStore((state) => state.isLogged);

    /* TODO : Voir pour ajouter un loader animé sur la première visite */
    const [meQuery] = useMeLazyQuery();
    const me = useAuthStore((state) => state.me);
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

    return (
        <>
            {isLogged ? <UserLayout /> : <GuestLayout />}
            <Toaster />
        </>
    );
}

export default App;
