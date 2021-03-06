import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
     PRODUCT_DETAILS_FAIL, 
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_SAVE_REQUEST,
     PRODUCT_SAVE_SUCCESS,
     PRODUCT_SAVE_FAIL,
     PRODUCT_DELETE_REQUEST,
     PRODUCT_DELETE_FAIL,
     PRODUCT_DELETE_SUCCESS}from "../types/consts";
import Axios from "axios";

// Get all product
const listProducts = ( searchKeyword = '', sortOrder = '') => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_LIST_REQUEST } );

        const {data} = await Axios.get('/api/products?&searchKeyword=' +
            searchKeyword + '&sortOrder=' + sortOrder
        );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data } );

    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message } );
    }

};

// add / Update product to the db
const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product  } );
        const { userSignin: {userInfo}} = getState();

        // if its Update
        if(product._id) {
            const {data} = await Axios.put('/api/products/' + product._id, product, {
                headers: {
                    'Authorization': 'Bearer' + userInfo.token,
                }
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data } );

        }else {
            const {data} = await Axios.post('/api/products', product, {
                headers: {
                    'Authorization': 'Bearer' + userInfo.token,
                }
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data } );
        }

    } catch (err) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: err.message } );
        // who creating
        if(product._id) {
            alert('Your not authorised as Admin');
        }
        alert('Your not authorised!');
    }

};

// get product with id
const detailsProduct = (productId) => async (dispatch) => {
    try {
        
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId } );

        const {data} = await Axios.get('/api/products/' + productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data } );

    } catch (err) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message } );
    }
};

// Delete with id
const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const { userSignin: {userInfo}} = getState();
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId } );

        const {data} = await Axios.delete('/api/products/' + productId, {
            headers: {
                'Authorization': 'Bearer' + userInfo.token
            }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true } );

    } catch (err) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: err.message } );
        alert('Your not authorised as Admin');
    }
};

export  {listProducts, detailsProduct , saveProduct, deleteProduct};