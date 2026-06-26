import { createContext, useReducer } from "react";
import {cartReducer} from "./cartReducer.js";

export const CartContext = createContext({
    cartItems: [],
    wishlistItems: [],
    dispatch: () => {}
})

export const CartProvide = ({children}) => {
    const [state , dispatch] = useReducer(cartReducer, {
        cartItems: [],
        wishlistItems: [],
    });
    
    const totalItems = state?.cartItems?.reduce((total, item) => total + item.quatity || 1, 0) || 0;
    const totalPrice = state?.cartItems?.reduce((total, item) => total + ((item.quatity||1) * item.price, 0)) || 0;
    const isInWishlist = (id) => state.wishlistItems?.some(item => item.id === id);
    const toggleWishlist  = (item) => dispatch({type: "TOGGLE_WISHLIST", payload: item})

    return <CartContext.Provider value={{
        cartItems: state?.cartItems,
        wishlistItems: state?.wishlistItems,
        dispatch,
        totalItems,
        totalPrice,
        isInWishlist,
        toggleWishlist,
    }}
    >
        {children}
    </CartContext.Provider>
}