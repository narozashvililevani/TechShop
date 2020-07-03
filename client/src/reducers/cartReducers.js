import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../types/consts";


const cartReducer = (state = {cartItems: [] }, action) => {

    switch (action.type) {
        
        case CART_ADD_ITEM:
            // new cart item 
            const item = action.payload;   

            // existing same item
            const product = state.cartItems.find( i => i.product === item.product );  

            // if item exists
            if(product) {
                return { cartItems:
                    state.cartItems.map( i => i.product === product.product ? item : i) } 
            }
            return { cartItems: [...state.cartItems, item ] };      // add new item
        

        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter( i => i.product !== action.payload) }; 



        default:
            return state;
    }
}



export  {cartReducer};