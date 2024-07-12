import useAuthStore from "@/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const isLogged = useAuthStore((state) => state.isLogged);

    return isLogged ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
