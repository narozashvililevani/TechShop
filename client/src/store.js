import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducer';

// read browser cookie first
const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;    // authentication

const initialState = {cart: {cartItems}, userSignin: {userInfo} };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,

})

                                                // Redux DevTools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

                        // thunk = midlwre for  redux: allows async  action/operation
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk) ) );

export default store;