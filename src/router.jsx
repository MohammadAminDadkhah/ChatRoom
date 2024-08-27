import {createBrowserRouter} from "react-router-dom";
import Login from "./Page/Login/Login.jsx";

export const router = createBrowserRouter([
    {
        element: <Login/>,
        path: '/'
    }
])