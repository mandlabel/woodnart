import React, { createContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types';
import cartReducer from './cartReducer'
// context
const init = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
}
export const cartContext = createContext({...init})
// provider
export const CartProvider = (props) => {

    const [state, dispatch] = useReducer(cartReducer, {...init});

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state])

    const addToCart = (product) => {
        dispatch({type: "ADD_TO_CART", payload: product});
    }
    const removeFromCart = (product) => {
        dispatch({type: "REMOVE_FROM_CART", payload: product});
    };

    return (
        <cartContext.Provider value={{
            cart: state.cart,
            addToCart, removeFromCart
        }}>
            {props.children}
        </cartContext.Provider>
    )
}
CartProvider.propTypes = {
    children: PropTypes.node,
}