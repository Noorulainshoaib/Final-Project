export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            return { ...state, cart: [...state.cart, action.payload] };
        }
        case "REMOVE_FROM_CART": {
            const updatedCart = [...state.cart];
            updatedCart.splice(action.index, 1);
            return { ...state, cart: updatedCart };
        }
      
        default: {
            return state;
        }
    }
};