import App from "@/App";
import Landing from "@/pages/Landing";
import UrlHistory from "@/pages/UrlHistory";
import { createBrowserRouter } from "react-router-dom";
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
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
