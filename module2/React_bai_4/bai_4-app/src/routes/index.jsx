import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import ProductPage from '../pages/ProductPage'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home /> ,
        errorElement: <h1>Error 404</h1>
    },
    {
        path: "/contact",
        element: <Contact /> ,
        errorElement: <h1>Error 404</h1>
    },
        {
        path: "/productpage",
        element: <ProductPage /> ,
        errorElement: <h1>Error 404</h1>
    },
])