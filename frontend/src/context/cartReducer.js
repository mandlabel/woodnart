export default (state, action) =>
{
    switch(action.type) {
        case "ADD_TO_CART": // add to cart
            return { 
                ...state,
                cart: [action.payload, ...state.cart],
            };
        case "REMOVE_FROM_CART": // remove from cart
            return {
                ...state,
                cart: state.cart.filter(
                (product) => product !== action.payload
            ),
        };
        default:
            return state;  
    }
};