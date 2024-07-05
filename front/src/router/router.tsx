import App from "@/App";
import Landing from "@/pages/Landing";
import UrlHistory from "@/pages/UrlHistory";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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
        ],
    },
]);

export default router;
