import App from "@/App";
import Landing from "@/pages/Landing";
import UrlHistory from "@/pages/UrlHistory";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "@/pages/Dashboard";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                index: true,
                element: <Landing />,
            },
            {
                path: "/url/:id",
                element: <UrlHistory />,
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "/dashboard",
                        element: <Navigate to="/dashboard/overview" />,
                    },
                    {
                        path: "/dashboard/overview",
                        element: <Dashboard element="overview" />,
                    },
                    {
                        path: "/dashboard/urls",
                        element: <Dashboard element="urls" />,
                    },
                    {
                        path: "/dashboard/histories",
                        element: <Dashboard element="histories" />,
                    },
                    {
                        path: "/dashboard/subscribe",
                        element: <Dashboard element="subscribe" />,
                    },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
