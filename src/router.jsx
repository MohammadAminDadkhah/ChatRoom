import {createBrowserRouter} from "react-router-dom";
import Login from "./Page/Login/Login.jsx";
import Layout from "./Layout.jsx";
import Register from "./Page/Register/Register.jsx";

export const router = createBrowserRouter([
    {
        element: <Login/>,
        path: '/'
    },
    {
        element: <Register/>,
        path: '/register'
    },
    {
        element: <Layout/>,
        path: '/chat'
    }
])