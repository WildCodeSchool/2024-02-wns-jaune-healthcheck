import { Toaster } from "@/components/ui/toaster";
import useAuthStore from "./stores/authStore";
import useSocketStore from "./stores/webSocketStore";
import { useEffect } from "react";
import { useMeLazyQuery } from "./generated/graphql-types";
import { Roles } from "@/constants/role.ts";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Shield } from "lucide-react";
import AdminPanel from "./components/admin/AdminPanel";

function App({ children }: { children: React.ReactNode }) {
    const isLogged = useAuthStore((state) => state.isLogged);

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

    return (
        <div className="relative overflow-x-hidden">
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
            {children}
            <Toaster />
        </div>
    );
}

export default App;
