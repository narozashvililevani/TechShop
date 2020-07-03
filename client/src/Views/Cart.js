import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    const productId = props.match.params.id 
                                            //     ?qry=n     =>  n   : default = 1
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    
    const dispatch = useDispatch();

    // Get cartItems
    const cartItems = useSelector(state => state.cart.cartItems);
    
    // Remove from cart 
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    useEffect( () => {
        // based on url
        if(productId) {
            dispatch(addToCart(productId, qty ));
        }
       
      
    }, [dispatch, productId, qty]);

    return(
        <div className="cart">

            <div className="cart-list">
                <ul className="cart-list-container">
                    <li> 
                       <h3>Shopping Cart </h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ?

                        <div>cart is empty</div>
                        :
                        cartItems.map( item => 
                            <li key={item.product}>

                                <div className="cart-img">
                                    <img src={item.img} alt="product" />
                                </div>

                                <div className="cart-name" >
                                    <Link to={"/product/"+ item.product} >
                                        <div>{item.name}</div>
                                    </Link>

                                    <div>
                                        Qty:
                                        <select value={item.qty} onChange={e => dispatch(addToCart(item.product, e.target.value) ) } >
                                            <option valu="1" >1</option>
                                            <option valu="2" >2</option>
                                            <option valu="2" >3</option>
                                            <option valu="3" >4</option>
                                        </select>

                                        <button  onClick={() => removeFromCartHandler(item.product)}  className="remove">
                                            Remove from Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>  
                        )
                    }
                </ul>
            </div>

            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((acum, curV ) => acum + Number(curV.qty) , 0 ) }  items)
                    :
                    $ {cartItems.reduce((a, c ) => a + c.price * c.qty  , 0 ) }
                </h3>
                <button onClick={checkoutHandler} className="proceed" disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>
               
            </div>
            
        </div>
    )

}

export default Cart