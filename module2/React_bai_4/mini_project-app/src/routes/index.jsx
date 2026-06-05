import { Children } from "react";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<ClientLayout />,
        Children: [
            {index: true, element: <Home />},
            {path: "product/:id", element: <ProductDetail />},
        ],
    },
    {
        path:"/admin",
        element:<AdminLayout />,
        Children: [
            {index: true, element: <Home />},
            {path: "product/:id", element: <ProductDetail />}
        ] 
    },
    {
        path: "*", element: <h1>404 - Khong tim thay trang</h1>
    }
]);