
import { createBrowserRouter } from "react-router-dom";
import Login from "../fetures/auth/pages/Login";
import Register from "../fetures/auth/pages/Register";
import Protected from "../fetures/auth/components/Protected";
import Dashboard from "../fetures/chat/pages/Dashbord";



export const Router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: (
            <Protected>
                <Dashboard />
            </Protected>
        ),
    },
]);
