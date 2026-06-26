
export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existing = state.cartItems.find((item) => (item.id === action.payload.id));
            if (existing) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) => item.id === action.payload.id ? { ...item, quatity: item.quatity + 1 } : quatity),
                }
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
            }
        }
        case "REMOVE_FROM_CART": {

        }
        case "INCREASE_QUATITY": {
            return {
                ...state,
                cartItems: state.cartItems.map((item) => item.id === action.payload.id ? { ...item, quatity: item.quatity + 1 } : quatity),
            }
        }
        case "DECREASE_QUATITY": {
            return {
                ...state,
                cartItems: state.cartItems.map((item) => item.id === action.payload.id ? { ...item, quatity: item.quatity - 1 } : quatity),
            }
        }
        case "CLEAR_CART": {

        }
        case "TOGGLE_WISHLIST": {

        }
        default:
            return state;
    };


}