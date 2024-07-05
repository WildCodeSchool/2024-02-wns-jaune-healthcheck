import App from "@/App";
import URLList from "@/pages/List";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                index: true,
                element: <URLList />,
            },
        ],
    },
]);

export default router;
