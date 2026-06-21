import MainLayout from "../component/layout/MainLayout";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import { createBrowserRouter } from "react-router-dom"
import CheckoutPage from "../pages/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "product/:id",
                element: <ProductDetailPage />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "checkout",
                element: <CheckoutPage />
            },
        ],
    },
]);
