import React, { createContext, useEffect, useReducer, useContext } from 'react';
import { reducer } from '../addtoCart/reducer';

const getCartData = () => {
  let cartData = localStorage.getItem('cart')
  if (cartData === null) {
    return [];
  } else {
    return JSON.parse(cartData);
  }
}

const initialData = {
  cart: getCartData()
}

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToCart = (item) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: item
    });
  }

  return (
    <CartContext.Provider value={{ state, dispatch, handleClearCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}