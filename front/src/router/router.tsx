import UserLayout from "@/layouts/UserLayout";
import GuestLayout from "@/layouts/GuestLayout";
import Landing from "@/pages/Landing";
import UrlHistories from "@/pages/UrlHistories";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { UserUrls } from "@/pages/UserUrls";
import { UserHistories } from "@/pages/UserHistories";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";

const routes = [
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <Landing />,
            },
            {
                path: "/url/:id",
                element: <UrlHistories />,
            },
        ],
    },
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/urls",
                element: <UserUrls />,
            },
            {
                path: "/histories",
                element: <UserHistories />,
            },
            {
                path: "/history-url/:id",
                element: <UrlHistories />,
            },
            {
                path: "/user-url/:id",
                element: <UrlHistories />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

const router = createBrowserRouter(routes);

export default router;
