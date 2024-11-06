import UserLayout from "@/layouts/UserLayout";
import GuestLayout from "@/layouts/GuestLayout";
import Landing from "@/pages/Landing";
import UrlHistory from "@/pages/UrlHistory";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { UserUrls } from "@/pages/UserUrls";
import { UserHistories } from "@/pages/UserHistories";

const routes = [
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/index" />,
            },
            {
                path: "/index",
                element: <Landing />,
            },
            {
                path: "/url/:id",
                element: <UrlHistory />,
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
                path: "/user-url/:id",
                element: <UrlHistory />,
            },
        ]
    }
];

const router = createBrowserRouter(routes);

export default router;
