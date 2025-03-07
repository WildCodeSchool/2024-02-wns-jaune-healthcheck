import { create } from "zustand";
import { UserData } from "../types/user";

interface AuthState {
    isLogged: boolean;
    user: UserData | Record<string, never>;
    login: (userData: string) => void;
    logout: () => void;
    me: (userData: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isLogged: localStorage.getItem("user") ? true : false,
    user: {},
    login: (userData: string) => {
        localStorage.setItem("user", userData);
        set({ user: JSON.parse(userData) });
        set({ isLogged: true });
    },
    logout: () => {
        localStorage.removeItem("user");
        set({ user: {} });
        set({ isLogged: false });
    },
    me: (userData: string) => {
        localStorage.setItem("user", userData);
        set({ user: JSON.parse(userData) });
        set({ isLogged: true });
    },
}));

export default useAuthStore;
