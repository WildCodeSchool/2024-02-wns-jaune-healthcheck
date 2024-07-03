import App from "@/App";
import Landing from "@/pages/Landing";
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
    ],
  },
]);

export default router;
