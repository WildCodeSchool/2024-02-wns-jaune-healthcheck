import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketState {
    socket: Socket | null;
    connect: () => void;
    disconnect: () => void;
    messages: string[];
    addMessage: (message: string) => void;
}

const useSocketStore = create<SocketState>((set) => ({
    socket: null,
    messages: [],
    connect: () => {
        const socket = io({
            path: import.meta.env.VITE_WS_URL,
        });
        socket.on("connect", () => {
            console.log("connected to socket.io server");
        });
        socket.on("disconnect", () => {
            console.log("disconnected from socket.io server");
        });
        socket.on("cron-job", (message: string) => {
            set((state) => ({
                messages: [...state.messages, message],
            }));
        });
        set({ socket });
    },
    disconnect: () => {
        const { socket } = useSocketStore.getState();
        socket?.disconnect();
        set({ socket: null });
    },
    addMessage: (message: string) => {
        set((state) => ({
            messages: [...state.messages, message],
        }));
    },
}));

export default useSocketStore;
