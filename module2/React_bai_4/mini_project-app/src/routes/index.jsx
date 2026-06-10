import { Children } from "react";
import ClientLayout from "../layout/ClientLayout"
import AdminDashboard from "../pages/AdminDashboard"
import AdminProducts from "../pages/AdminProducts"
import AdminLayout from "../layout/AdminLayout"
import Home from "../pages/Home"
import ProductDetail from "../pages/ProductDetail"
import { createBrowserRouter } from "react-router-dom"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products/:id", element: <ProductDetail /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "products", element: <AdminProducts /> }
        ]
    },
    {
        path: "*", element: <h1>404 - Khong tim thay trang</h1>
    }
]);